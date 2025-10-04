#!/bin/bash

# Production Deployment Script for AI Recycle-to-Market Generator
# Usage: ./deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_NAME="recycle-generator"

echo "🚀 Starting deployment for environment: $ENVIRONMENT"
echo "📁 Project directory: $SCRIPT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."

    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi

    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed"
        exit 1
    fi

    # Check environment file
    if [ ! -f ".env" ]; then
        print_warning ".env file not found"
        if [ -f ".env.${ENVIRONMENT}" ]; then
            print_status "Copying .env.${ENVIRONMENT} to .env"
            cp ".env.${ENVIRONMENT}" .env
        else
            print_error "No environment configuration found"
            exit 1
        fi
    fi

    print_success "Prerequisites check passed"
}

# Backup current deployment
backup_current() {
    print_status "Creating backup of current deployment..."

    BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"

    # Backup Redis data
    if docker ps | grep -q "${PROJECT_NAME}_redis"; then
        print_status "Backing up Redis data..."
        docker exec "${PROJECT_NAME}_redis" redis-cli BGSAVE
        docker cp "${PROJECT_NAME}_redis:/data/dump.rdb" "$BACKUP_DIR/"
    fi

    # Backup logs
    if [ -d "logs" ]; then
        print_status "Backing up logs..."
        cp -r logs "$BACKUP_DIR/"
    fi

    # Backup environment configuration
    if [ -f ".env" ]; then
        cp .env "$BACKUP_DIR/"
    fi

    print_success "Backup created in $BACKUP_DIR"
}

# Run tests
run_tests() {
    print_status "Running test suite..."

    # Check if test dependencies are available
    if [ -f "requirements.txt" ]; then
        pip install -r requirements.txt
    fi

    # Run the complete test suite
    if [ -f "run_all_tests.py" ]; then
        python run_all_tests.py
        if [ $? -ne 0 ]; then
            print_error "Tests failed. Deployment aborted."
            exit 1
        fi
    else
        print_warning "Test suite not found, skipping tests"
    fi

    print_success "All tests passed"
}

# Build images
build_images() {
    print_status "Building Docker images..."

    # Build production image
    docker build -f Dockerfile.prod -t "${PROJECT_NAME}:${ENVIRONMENT}" .

    # Tag as latest for this environment
    docker tag "${PROJECT_NAME}:${ENVIRONMENT}" "${PROJECT_NAME}:latest"

    print_success "Docker images built successfully"
}

# Deploy services
deploy_services() {
    print_status "Deploying services..."

    # Use production docker-compose file
    COMPOSE_FILE="docker-compose.prod.yml"

    if [ ! -f "$COMPOSE_FILE" ]; then
        print_error "Production docker-compose file not found: $COMPOSE_FILE"
        exit 1
    fi

    # Stop existing services gracefully
    print_status "Stopping existing services..."
    docker-compose -f "$COMPOSE_FILE" down --timeout 30

    # Start services
    print_status "Starting services..."
    docker-compose -f "$COMPOSE_FILE" up -d

    # Wait for services to be healthy
    print_status "Waiting for services to be healthy..."
    sleep 30

    # Check service health
    check_service_health
}

# Check service health
check_service_health() {
    print_status "Checking service health..."

    # Check API health
    for i in {1..30}; do
        if curl -f http://localhost:8000/health > /dev/null 2>&1; then
            print_success "API service is healthy"
            break
        fi
        if [ $i -eq 30 ]; then
            print_error "API service health check failed"
            show_logs
            exit 1
        fi
        sleep 2
    done

    # Check Redis
    if docker exec "${PROJECT_NAME}_redis" redis-cli ping > /dev/null 2>&1; then
        print_success "Redis service is healthy"
    else
        print_warning "Redis service health check failed"
    fi

    # Check Nginx
    if curl -f http://localhost:80 > /dev/null 2>&1; then
        print_success "Nginx service is healthy"
    else
        print_warning "Nginx service may not be configured correctly"
    fi
}

# Show service logs
show_logs() {
    print_status "Showing recent service logs..."
    docker-compose -f docker-compose.prod.yml logs --tail=50 api
}

# Setup SSL certificates
setup_ssl() {
    print_status "Setting up SSL certificates..."

    SSL_DIR="ssl"
    mkdir -p "$SSL_DIR"

    if [ ! -f "$SSL_DIR/fullchain.pem" ] || [ ! -f "$SSL_DIR/privkey.pem" ]; then
        print_warning "SSL certificates not found"
        print_status "You need to provide SSL certificates in the ssl/ directory:"
        print_status "  - ssl/fullchain.pem"
        print_status "  - ssl/privkey.pem"
        print_status "For Let's Encrypt certificates, you can use certbot"
    else
        print_success "SSL certificates found"
    fi
}

# Setup monitoring
setup_monitoring() {
    print_status "Setting up monitoring..."

    # Create monitoring directories
    mkdir -p monitoring/grafana/provisioning/{datasources,dashboards}

    # Create Grafana datasource configuration
    cat > monitoring/grafana/provisioning/datasources/prometheus.yml << EOF
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
EOF

    # Create dashboard provisioning configuration
    cat > monitoring/grafana/provisioning/dashboards/default.yml << EOF
apiVersion: 1
providers:
  - name: 'default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    options:
      path: /var/lib/grafana/dashboards
EOF

    print_success "Monitoring setup completed"
}

# Post-deployment tasks
post_deployment() {
    print_status "Running post-deployment tasks..."

    # Wait for all services to be stable
    sleep 10

    # Run database migrations if needed
    # docker-compose -f docker-compose.prod.yml exec api alembic upgrade head

    # Warm up the application
    print_status "Warming up application..."
    curl -s http://localhost:8000/health > /dev/null

    # Show deployment summary
    show_deployment_summary
}

# Show deployment summary
show_deployment_summary() {
    echo ""
    echo "=========================================="
    echo "🎉 DEPLOYMENT COMPLETED SUCCESSFULLY"
    echo "=========================================="
    echo ""
    echo "Services:"
    echo "  🌐 API:        http://localhost:8000"
    echo "  📊 Grafana:    http://localhost:3000"
    echo "  📈 Prometheus: http://localhost:9090"
    echo "  🔗 Nginx:      http://localhost:80"
    echo ""
    echo "Health checks:"
    curl -s http://localhost:8000/health && echo "  ✅ API: Healthy" || echo "  ❌ API: Unhealthy"
    echo ""
    echo "Useful commands:"
    echo "  docker-compose -f docker-compose.prod.yml logs -f api"
    echo "  docker-compose -f docker-compose.prod.yml ps"
    echo "  docker-compose -f docker-compose.prod.yml down"
    echo ""
}

# Rollback function
rollback() {
    print_error "Deployment failed. Starting rollback..."

    # Stop failed deployment
    docker-compose -f docker-compose.prod.yml down

    # Restore from latest backup
    LATEST_BACKUP=$(ls -t backups/ | head -n1)
    if [ -n "$LATEST_BACKUP" ]; then
        print_status "Restoring from backup: $LATEST_BACKUP"
        # Restore Redis data if available
        if [ -f "backups/$LATEST_BACKUP/dump.rdb" ]; then
            docker run -d --name temp_redis_restore redis:7-alpine
            docker cp "backups/$LATEST_BACKUP/dump.rdb" temp_redis_restore:/data/
            docker stop temp_redis_restore
        fi
    fi

    print_error "Rollback completed. Please check the issues and try again."
}

# Main deployment flow
main() {
    cd "$SCRIPT_DIR"

    # Trap errors and rollback
    trap rollback ERR

    echo "🤖 AI Recycle-to-Market Generator Deployment"
    echo "Environment: $ENVIRONMENT"
    echo "Timestamp: $(date)"
    echo ""

    check_prerequisites
    backup_current
    run_tests
    build_images
    setup_ssl
    setup_monitoring
    deploy_services
    post_deployment

    print_success "Deployment completed successfully!"
}

# Handle command line arguments
case "${1:-}" in
    "production"|"staging"|"")
        main
        ;;
    "rollback")
        rollback
        ;;
    "health")
        check_service_health
        ;;
    "logs")
        show_logs
        ;;
    *)
        echo "Usage: $0 [production|staging|rollback|health|logs]"
        exit 1
        ;;
esac