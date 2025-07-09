# No Budget API Documentation Configuration

This file contains important configuration details for the VuePress documentation site.

## Base Configuration

The documentation is configured with the following settings:

- **Base URL**: `/no-budget/` (GitHub Pages subdirectory)
- **Language**: English (en-US)
- **Theme**: VuePress Default Theme
- **Search**: Enabled with search plugin

## Repository Settings

For proper deployment, make sure to:

1. **Update base path** in `docs/.vuepress/config.js`:
   ```javascript
   base: '/your-repo-name/', // Replace with your actual repository name
   ```

2. **Update repository URL** in the config:
   ```javascript
   repo: 'your-username/your-repo-name',
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch
   - Select `/ (root)` folder

## Custom Domain Setup

To use a custom domain (e.g., `docs.yourdomain.com`):

1. **Create CNAME file**:
   ```bash
   echo "docs.yourdomain.com" > docs/.vuepress/public/CNAME
   ```

2. **Update base configuration**:
   ```javascript
   base: '/', // Change from '/no-budget/' to '/'
   ```

3. **Configure DNS**:
   - Add CNAME record: `docs` → `your-username.github.io`
   - Or A records pointing to GitHub Pages IPs

## Environment-Specific Configuration

For different deployment environments:

### Development
```bash
npm run docs:dev
# Runs on http://localhost:8080
```

### Production Build
```bash
npm run docs:build
# Outputs to docs/.vuepress/dist/
```

### GitHub Pages Deployment
```bash
npm run docs:deploy
# Deploys to gh-pages branch
```

## Automatic Deployment

The project includes GitHub Actions workflow (`.github/workflows/docs.yml`) that:

1. Triggers on pushes to `main` branch (docs/** path changes)
2. Builds the documentation
3. Deploys to `gh-pages` branch
4. Updates the live documentation site

## Content Organization

```
docs/
├── .vuepress/
│   ├── config.js        # Main configuration
│   └── public/          # Static assets
├── guide/               # User guides
├── api/                 # API reference
├── examples/            # Code examples
├── deployment/          # Deployment guides
└── README.md           # Homepage
```

## Customization Options

### Theme Customization

1. **Colors**: Edit `.vuepress/styles/index.styl`
2. **Layout**: Override theme components in `.vuepress/components/`
3. **Logo**: Add logo to `.vuepress/public/` and reference in config

### Adding Plugins

Popular VuePress plugins to consider:

```javascript
// In config.js
plugins: [
  '@vuepress/plugin-google-analytics',
  '@vuepress/plugin-pwa',
  '@vuepress/plugin-medium-zoom',
  '@vuepress/plugin-back-to-top'
]
```

### SEO Optimization

```javascript
// In config.js
head: [
  ['meta', { name: 'description', content: 'No Budget API Documentation' }],
  ['meta', { name: 'keywords', content: 'finance,api,cloudflare,workers' }],
  ['meta', { property: 'og:title', content: 'No Budget API' }],
  ['meta', { property: 'og:description', content: 'Complete finance API' }],
  ['meta', { property: 'og:type', content: 'website' }]
]
```

## Maintenance

### Regular Updates

1. **Dependencies**: Update VuePress and plugins monthly
2. **Content**: Keep documentation in sync with API changes
3. **Links**: Check for broken internal and external links
4. **Examples**: Verify all code examples work

### Monitoring

1. **Build Status**: Monitor GitHub Actions for deployment failures
2. **Analytics**: Set up Google Analytics for usage tracking
3. **User Feedback**: Enable discussions or issue templates for feedback

## Troubleshooting

### Common Issues

1. **Base path errors**: Ensure base path matches repository name
2. **404 on navigation**: Check sidebar configuration in config.js
3. **Images not loading**: Verify image paths are relative to markdown files
4. **Build failures**: Check console output and dependency versions

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build for production
npm run docs:build

# Deploy to GitHub Pages
npm run docs:deploy
```

### Getting Help

- [VuePress Documentation](https://vuepress.vuejs.org/)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [Project Issues](https://github.com/your-username/no-budget/issues)
