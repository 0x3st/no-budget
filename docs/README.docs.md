# Documentation

This directory contains the complete documentation for No Budget API, built with VuePress.

## Structure

```
docs/
├── .vuepress/
│   └── config.js         # VuePress configuration
├── guide/
│   ├── README.md         # Getting started guide
│   ├── installation.md  # Installation instructions
│   ├── quick-start.md    # Quick start tutorial
│   └── ...              # Other guide pages
├── api/
│   ├── README.md         # API overview
│   ├── bills.md          # Bills API reference
│   ├── statistics.md     # Statistics API reference
│   └── ...              # Other API pages
├── examples/
│   ├── README.md         # Examples overview
│   └── ...              # Example pages
├── deployment/
│   ├── README.md         # Deployment guide
│   └── ...              # Deployment pages
└── README.md             # Documentation homepage
```

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev
```

The documentation will be available at `http://localhost:8080`

### Building

```bash
# Build for production
npm run docs:build
```

Built files will be in `docs/.vuepress/dist/`

## Deployment

### GitHub Pages

The documentation is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

Manual deployment:
```bash
# Build and deploy to gh-pages branch
npm run docs:deploy
```

### Custom Domain

To use a custom domain for documentation:

1. Add your domain to `docs/.vuepress/public/CNAME`
2. Configure DNS to point to GitHub Pages
3. Enable custom domain in repository settings

## Writing Documentation

### Markdown Features

VuePress supports:
- Standard Markdown
- Vue.js components
- Code syntax highlighting
- Custom containers
- Math expressions (with plugins)

### Code Examples

Use fenced code blocks with language specification:

````markdown
```javascript
const api = new BudgetAPI('https://your-worker.workers.dev');
```
````

### API Documentation

Follow this format for API endpoints:

```markdown
### Endpoint Name

Brief description.

**METHOD** `/api/endpoint`

#### Request Body
...

#### Response
...

#### Example
...
```

### Navigation

Update `.vuepress/config.js` to add new pages to navigation:

```javascript
sidebar: {
  '/guide/': [
    {
      text: 'Section Name',
      children: [
        '/guide/new-page.md'
      ]
    }
  ]
}
```

## Contributing to Documentation

### Adding New Pages

1. Create markdown file in appropriate directory
2. Add to sidebar configuration
3. Update navigation if needed
4. Test locally with `npm run docs:dev`

### Style Guide

- Use clear, concise language
- Include practical examples
- Maintain consistent formatting
- Keep code examples up to date

### Review Process

1. Create pull request with documentation changes
2. Documentation builds automatically in PR
3. Review for accuracy and clarity
4. Merge to deploy to production

## Maintenance

### Updating Dependencies

```bash
# Update VuePress and plugins
npm update
```

### Broken Links

Regularly check for broken internal and external links.

### Content Updates

Keep documentation in sync with API changes:
- Update examples when API changes
- Verify all code samples work
- Update screenshots if UI changes

## Customization

### Theming

The documentation uses the default VuePress theme. To customize:

1. Create custom theme components in `.vuepress/components/`
2. Override default styles in `.vuepress/styles/index.styl`
3. Modify configuration in `.vuepress/config.js`

### Plugins

Add plugins in `.vuepress/config.js`:

```javascript
plugins: [
  // Plugin configuration
]
```

Available plugins:
- Search
- Google Analytics
- PWA
- Medium Zoom
- Copy Code

## Performance

### Optimization

- Optimize images before adding
- Use appropriate image formats
- Minimize custom CSS
- Lazy load heavy components

### SEO

- Use descriptive titles and descriptions
- Include meta tags
- Create sitemap
- Implement structured data

## Support

For documentation issues:
- Open GitHub issue
- Check VuePress documentation
- Review existing examples
