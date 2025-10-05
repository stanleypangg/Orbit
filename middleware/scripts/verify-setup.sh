#!/bin/bash

set -e

echo "🔍 Verifying Middleware Setup..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
    echo -e "${GREEN}✓${NC} Node.js $(node -v) (>= 18.0.0)"
else
    echo -e "${RED}✗${NC} Node.js version must be >= 18.0.0 (current: $(node -v))"
    exit 1
fi

# Check npm
echo ""
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✓${NC} npm $(npm -v)"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check if dependencies are installed
echo ""
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${YELLOW}!${NC} Dependencies not installed, running npm install..."
    npm install
fi

# Check TypeScript compilation
echo ""
echo "🔨 Checking TypeScript compilation..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} TypeScript compiles successfully"
else
    echo -e "${RED}✗${NC} TypeScript compilation failed"
    npm run build
    exit 1
fi

# Run linter
echo ""
echo "🔍 Running linter..."
if npm run lint > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} No linting errors"
else
    echo -e "${YELLOW}!${NC} Linting warnings found (run 'npm run lint' to see details)"
fi

# Check Redis connectivity
echo ""
echo "🔴 Checking Redis connection..."
if command -v redis-cli &> /dev/null; then
    if redis-cli ping > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Redis is running and accessible"
    else
        echo -e "${YELLOW}!${NC} Redis not accessible (middleware will need Redis to run)"
    fi
else
    echo -e "${YELLOW}!${NC} redis-cli not found (cannot verify Redis status)"
fi

# Run tests
echo ""
echo "🧪 Running tests..."
if npm test > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} All tests passing"
else
    echo -e "${RED}✗${NC} Some tests failing (run 'npm test' for details)"
    exit 1
fi

# Check test coverage
echo ""
echo "📊 Checking test coverage..."
npm run test:coverage > /dev/null 2>&1
if [ -f "coverage/coverage-summary.json" ]; then
    COVERAGE=$(node -pe "JSON.parse(require('fs').readFileSync('coverage/coverage-summary.json')).total.lines.pct")
    if (( $(echo "$COVERAGE >= 80" | bc -l) )); then
        echo -e "${GREEN}✓${NC} Test coverage: ${COVERAGE}% (>= 80%)"
    else
        echo -e "${YELLOW}!${NC} Test coverage: ${COVERAGE}% (target: >= 80%)"
    fi
fi

# Check environment file
echo ""
echo "⚙️  Checking configuration..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
else
    echo -e "${YELLOW}!${NC} .env file not found (copy .env.example to .env)"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Middleware setup verified successfully!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next steps:"
echo "  1. Ensure .env is configured with correct values"
echo "  2. Start Redis: brew services start redis (macOS)"
echo "  3. Start backend API: cd backend && uvicorn main:app"
echo "  4. Start middleware: npm run dev"
echo ""
echo "🚀 Ready to develop!"
