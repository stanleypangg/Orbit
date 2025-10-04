# Docker Deployment Guide

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Setup

1. **Create environment file** (required before building):
   ```bash
   cd backend
   
   # Create .env file
   cat > .env << EOF
   GEMINI_API_KEY=your_actual_api_key_here
   GEMINI_MODEL=gemini-1.5-pro
   EOF
   ```

2. **Run with Docker Compose** (recommended):
   ```bash
   docker-compose up --build
   ```
   
   The backend will be available at `http://localhost:8000`

3. **Or run with Docker directly**:
   ```bash
   # Build image
   docker build -t htv-backend .
   
   # Run container
   docker run -p 8000:8000 --env-file .env -v $(pwd):/app htv-backend
   ```

### Docker Compose Configuration

The `docker-compose.yml` includes:

- ✅ Hot reload enabled (volume mount)
- ✅ Environment variables loaded from `.env`
- ✅ Port 8000 exposed
- ✅ Automatic restart on file changes

### Production Deployment

For production, create a separate `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    env_file:
      - .env
    environment:
      - PYTHONUNBUFFERED=1
    command: ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
    restart: unless-stopped
```

Run with:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Useful Commands

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Rebuild after dependency changes
docker-compose up --build

# Run backend shell
docker-compose exec backend bash

# Check running containers
docker ps

# View container logs
docker logs <container_id>
```

### Health Check

```bash
# Check if backend is running
curl http://localhost:8000/health

# Check chat endpoint health
curl http://localhost:8000/api/chat/health
```

### Troubleshooting

**Issue: "ALTS creds ignored. Not running on GCP..." warning**
- This is a harmless gRPC warning from the Gemini SDK
- Already suppressed in `docker-compose.yml` with `GRPC_VERBOSITY=ERROR`
- If you still see it, rebuild: `docker-compose up --build`
- Safe to ignore—your app works fine!

**Issue: "GEMINI_API_KEY environment variable is required"**
- Ensure `.env` file exists in `backend/` directory
- Check that `docker-compose.yml` includes `env_file: - .env`
- Rebuild: `docker-compose up --build`

**Issue: Port 8000 already in use**
- Stop other services using port 8000
- Or change port mapping in `docker-compose.yml`:
  ```yaml
  ports:
    - "8001:8000"  # External:Internal
  ```

**Issue: Changes not reflecting**
- Ensure volume mount is correct: `.:/app`
- Check if hot reload is working in logs
- Try rebuilding: `docker-compose up --build`

**Issue: Dependencies not installed**
- Rebuild after `requirements.txt` changes
- Clear cache: `docker-compose build --no-cache`

### Multi-Service Setup

To run both frontend and backend with Docker:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    env_file:
      - ./backend/.env
    environment:
      - PYTHONUNBUFFERED=1
    
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on:
      - backend
```

### Environment Variables in Docker

**Method 1: .env file** (recommended)
```bash
# backend/.env
GEMINI_API_KEY=abc123
GEMINI_MODEL=gemini-1.5-pro
```

**Method 2: Command line**
```bash
docker run -e GEMINI_API_KEY=abc123 -e GEMINI_MODEL=gemini-1.5-pro htv-backend
```

**Method 3: Docker Compose**
```yaml
environment:
  - GEMINI_API_KEY=abc123
  - GEMINI_MODEL=gemini-1.5-pro
```

### Security Best Practices

1. **Never commit `.env` files** - already in `.gitignore`
2. **Use secrets in production**:
   ```yaml
   secrets:
     gemini_api_key:
       file: ./secrets/gemini_api_key.txt
   services:
     backend:
       secrets:
         - gemini_api_key
   ```
3. **Limit container resources**:
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '0.5'
         memory: 512M
   ```

### Performance Tips

1. **Use multi-stage builds** for smaller images
2. **Cache pip dependencies**:
   ```dockerfile
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   COPY . .  # Copy code after dependencies
   ```
3. **Use production ASGI server** in production
4. **Enable multiple workers** for better throughput

### CI/CD Integration

**GitHub Actions example:**
```yaml
- name: Build Docker image
  run: docker build -t htv-backend ./backend

- name: Run tests in container
  run: docker run htv-backend pytest

- name: Push to registry
  run: |
    docker tag htv-backend registry.example.com/htv-backend:${{ github.sha }}
    docker push registry.example.com/htv-backend:${{ github.sha }}
```

---

**Status**: ✅ Docker support configured and documented

The Dockerfile automatically picks up the new chatbot dependencies from `requirements.txt`, and environment variables are properly passed through docker-compose!

