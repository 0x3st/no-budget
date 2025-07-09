#!/bin/bash

# No Budget API Documentation Deployment Script
# This script builds and deploys documentation to GitHub Pages

set -e

echo "🚀 Starting documentation deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if docs directory exists
if [ ! -d "docs" ]; then
    print_error "docs directory not found."
    exit 1
fi

print_status "Checking dependencies..."

# Check if VuePress is installed
if ! npm list vuepress > /dev/null 2>&1; then
    print_warning "VuePress not found. Installing dependencies..."
    npm install
fi

print_status "Building documentation..."

# Build documentation
if npm run docs:build; then
    print_status "Documentation built successfully!"
else
    print_error "Documentation build failed!"
    exit 1
fi

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
    print_status "gh-pages branch exists"
else
    print_warning "Creating gh-pages branch..."
    git checkout --orphan gh-pages
    git rm -rf .
    echo "# GitHub Pages" > README.md
    git add README.md
    git commit -m "Initial gh-pages commit"
    git checkout main
fi

print_status "Deploying to GitHub Pages..."

# Deploy to gh-pages
if npm run docs:deploy; then
    print_status "Documentation deployed successfully!"
    echo ""
    echo "📖 Your documentation will be available at:"
    echo "   https://your-username.github.io/no-budget/"
    echo ""
    echo "🔧 To customize the URL, update the base config in docs/.vuepress/config.js"
    echo "🌍 To use a custom domain, add a CNAME file to docs/.vuepress/public/"
else
    print_error "Documentation deployment failed!"
    exit 1
fi

print_status "Deployment complete!"

echo ""
echo "📋 Next steps:"
echo "1. Go to your repository settings"
echo "2. Enable GitHub Pages from the gh-pages branch"
echo "3. Optionally set up a custom domain"
echo "4. Share your documentation URL with users"
