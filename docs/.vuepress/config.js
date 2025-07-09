import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  lang: 'en-US',
  title: 'No Budget API',
  description: 'Complete personal finance API built on Cloudflare Workers',
  
  base: '/no-budget/',
  
  head: [
    ['link', { rel: 'icon', href: '/no-budget/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  theme: defaultTheme({
    repo: 'your-username/no-budget',
    
    navbar: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'API Reference',
        link: '/api/',
      },
      {
        text: 'Examples',
        link: '/examples/',
      },
      {
        text: 'Deployment',
        link: '/deployment/',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/your-username/no-budget'
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          children: [
            '/guide/README.md',
            '/guide/installation.md',
            '/guide/quick-start.md',
            '/guide/configuration.md',
          ],
        },
        {
          text: 'Core Concepts',
          children: [
            '/guide/bills.md',
            '/guide/statistics.md',
            '/guide/tags-categories.md',
            '/guide/filtering.md',
          ],
        },
        {
          text: 'Advanced',
          children: [
            '/guide/error-handling.md',
            '/guide/performance.md',
            '/guide/security.md',
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          children: [
            '/api/README.md',
            '/api/authentication.md',
            '/api/bills.md',
            '/api/statistics.md',
            '/api/tags.md',
            '/api/errors.md',
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          children: [
            '/examples/README.md',
            '/examples/basic-usage.md',
            '/examples/advanced-filtering.md',
            '/examples/statistics-dashboard.md',
            '/examples/integration.md',
          ],
        },
      ],
      '/deployment/': [
        {
          text: 'Deployment',
          children: [
            '/deployment/README.md',
            '/deployment/cloudflare-workers.md',
            '/deployment/custom-domain.md',
            '/deployment/environment-setup.md',
            '/deployment/monitoring.md',
          ],
        },
      ],
    },

    editLink: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: true,
    lastUpdatedText: 'Last Updated',

    contributors: true,
    contributorsText: 'Contributors',
  }),

  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
      },
    }),
  ],
})
