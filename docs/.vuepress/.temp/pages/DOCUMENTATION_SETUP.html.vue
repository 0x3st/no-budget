<template><div><h1 id="no-budget-api-documentation-configuration" tabindex="-1"><a class="header-anchor" href="#no-budget-api-documentation-configuration"><span>No Budget API Documentation Configuration</span></a></h1>
<p>This file contains important configuration details for the VuePress documentation site.</p>
<h2 id="base-configuration" tabindex="-1"><a class="header-anchor" href="#base-configuration"><span>Base Configuration</span></a></h2>
<p>The documentation is configured with the following settings:</p>
<ul>
<li><strong>Base URL</strong>: <code v-pre>/no-budget/</code> (GitHub Pages subdirectory)</li>
<li><strong>Language</strong>: English (en-US)</li>
<li><strong>Theme</strong>: VuePress Default Theme</li>
<li><strong>Search</strong>: Enabled with search plugin</li>
</ul>
<h2 id="repository-settings" tabindex="-1"><a class="header-anchor" href="#repository-settings"><span>Repository Settings</span></a></h2>
<p>For proper deployment, make sure to:</p>
<ol>
<li>
<p><strong>Update base path</strong> in <code v-pre>docs/.vuepress/config.js</code>:</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line"><span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">'/your-repo-name/'</span><span class="token punctuation">,</span> <span class="token comment">// Replace with your actual repository name</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><strong>Update repository URL</strong> in the config:</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line"><span class="token literal-property property">repo</span><span class="token operator">:</span> <span class="token string">'your-username/your-repo-name'</span><span class="token punctuation">,</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><strong>Enable GitHub Pages</strong>:</p>
<ul>
<li>Go to repository Settings</li>
<li>Navigate to Pages section</li>
<li>Select &quot;Deploy from a branch&quot;</li>
<li>Choose <code v-pre>gh-pages</code> branch</li>
<li>Select <code v-pre>/ (root)</code> folder</li>
</ul>
</li>
</ol>
<h2 id="custom-domain-setup" tabindex="-1"><a class="header-anchor" href="#custom-domain-setup"><span>Custom Domain Setup</span></a></h2>
<p>To use a custom domain (e.g., <code v-pre>docs.yourdomain.com</code>):</p>
<ol>
<li>
<p><strong>Create CNAME file</strong>:</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token builtin class-name">echo</span> <span class="token string">"docs.yourdomain.com"</span> <span class="token operator">></span> docs/.vuepress/public/CNAME</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><strong>Update base configuration</strong>:</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line"><span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token comment">// Change from '/no-budget/' to '/'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><strong>Configure DNS</strong>:</p>
<ul>
<li>Add CNAME record: <code v-pre>docs</code> → <code v-pre>your-username.github.io</code></li>
<li>Or A records pointing to GitHub Pages IPs</li>
</ul>
</li>
</ol>
<h2 id="environment-specific-configuration" tabindex="-1"><a class="header-anchor" href="#environment-specific-configuration"><span>Environment-Specific Configuration</span></a></h2>
<p>For different deployment environments:</p>
<h3 id="development" tabindex="-1"><a class="header-anchor" href="#development"><span>Development</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> run docs:dev</span>
<span class="line"><span class="token comment"># Runs on http://localhost:8080</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="production-build" tabindex="-1"><a class="header-anchor" href="#production-build"><span>Production Build</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> run docs:build</span>
<span class="line"><span class="token comment"># Outputs to docs/.vuepress/dist/</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="github-pages-deployment" tabindex="-1"><a class="header-anchor" href="#github-pages-deployment"><span>GitHub Pages Deployment</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> run docs:deploy</span>
<span class="line"><span class="token comment"># Deploys to gh-pages branch</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="automatic-deployment" tabindex="-1"><a class="header-anchor" href="#automatic-deployment"><span>Automatic Deployment</span></a></h2>
<p>The project includes GitHub Actions workflow (<code v-pre>.github/workflows/docs.yml</code>) that:</p>
<ol>
<li>Triggers on pushes to <code v-pre>main</code> branch (docs/** path changes)</li>
<li>Builds the documentation</li>
<li>Deploys to <code v-pre>gh-pages</code> branch</li>
<li>Updates the live documentation site</li>
</ol>
<h2 id="content-organization" tabindex="-1"><a class="header-anchor" href="#content-organization"><span>Content Organization</span></a></h2>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">docs/</span>
<span class="line">├── .vuepress/</span>
<span class="line">│   ├── config.js        # Main configuration</span>
<span class="line">│   └── public/          # Static assets</span>
<span class="line">├── guide/               # User guides</span>
<span class="line">├── api/                 # API reference</span>
<span class="line">├── examples/            # Code examples</span>
<span class="line">├── deployment/          # Deployment guides</span>
<span class="line">└── README.md           # Homepage</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="customization-options" tabindex="-1"><a class="header-anchor" href="#customization-options"><span>Customization Options</span></a></h2>
<h3 id="theme-customization" tabindex="-1"><a class="header-anchor" href="#theme-customization"><span>Theme Customization</span></a></h3>
<ol>
<li><strong>Colors</strong>: Edit <code v-pre>.vuepress/styles/index.styl</code></li>
<li><strong>Layout</strong>: Override theme components in <code v-pre>.vuepress/components/</code></li>
<li><strong>Logo</strong>: Add logo to <code v-pre>.vuepress/public/</code> and reference in config</li>
</ol>
<h3 id="adding-plugins" tabindex="-1"><a class="header-anchor" href="#adding-plugins"><span>Adding Plugins</span></a></h3>
<p>Popular VuePress plugins to consider:</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line"><span class="token comment">// In config.js</span></span>
<span class="line"><span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token string">'@vuepress/plugin-google-analytics'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token string">'@vuepress/plugin-pwa'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token string">'@vuepress/plugin-medium-zoom'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token string">'@vuepress/plugin-back-to-top'</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="seo-optimization" tabindex="-1"><a class="header-anchor" href="#seo-optimization"><span>SEO Optimization</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line"><span class="token comment">// In config.js</span></span>
<span class="line"><span class="token literal-property property">head</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">  <span class="token punctuation">[</span><span class="token string">'meta'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'description'</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'No Budget API Documentation'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">[</span><span class="token string">'meta'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'keywords'</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'finance,api,cloudflare,workers'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">[</span><span class="token string">'meta'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">property</span><span class="token operator">:</span> <span class="token string">'og:title'</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'No Budget API'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">[</span><span class="token string">'meta'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">property</span><span class="token operator">:</span> <span class="token string">'og:description'</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'Complete finance API'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">[</span><span class="token string">'meta'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">property</span><span class="token operator">:</span> <span class="token string">'og:type'</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'website'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="maintenance" tabindex="-1"><a class="header-anchor" href="#maintenance"><span>Maintenance</span></a></h2>
<h3 id="regular-updates" tabindex="-1"><a class="header-anchor" href="#regular-updates"><span>Regular Updates</span></a></h3>
<ol>
<li><strong>Dependencies</strong>: Update VuePress and plugins monthly</li>
<li><strong>Content</strong>: Keep documentation in sync with API changes</li>
<li><strong>Links</strong>: Check for broken internal and external links</li>
<li><strong>Examples</strong>: Verify all code examples work</li>
</ol>
<h3 id="monitoring" tabindex="-1"><a class="header-anchor" href="#monitoring"><span>Monitoring</span></a></h3>
<ol>
<li><strong>Build Status</strong>: Monitor GitHub Actions for deployment failures</li>
<li><strong>Analytics</strong>: Set up Google Analytics for usage tracking</li>
<li><strong>User Feedback</strong>: Enable discussions or issue templates for feedback</li>
</ol>
<h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting"><span>Troubleshooting</span></a></h2>
<h3 id="common-issues" tabindex="-1"><a class="header-anchor" href="#common-issues"><span>Common Issues</span></a></h3>
<ol>
<li><strong>Base path errors</strong>: Ensure base path matches repository name</li>
<li><strong>404 on navigation</strong>: Check sidebar configuration in config.js</li>
<li><strong>Images not loading</strong>: Verify image paths are relative to markdown files</li>
<li><strong>Build failures</strong>: Check console output and dependency versions</li>
</ol>
<h3 id="local-development" tabindex="-1"><a class="header-anchor" href="#local-development"><span>Local Development</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Install dependencies</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Start development server</span></span>
<span class="line"><span class="token function">npm</span> run docs:dev</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Build for production</span></span>
<span class="line"><span class="token function">npm</span> run docs:build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Deploy to GitHub Pages</span></span>
<span class="line"><span class="token function">npm</span> run docs:deploy</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="getting-help" tabindex="-1"><a class="header-anchor" href="#getting-help"><span>Getting Help</span></a></h3>
<ul>
<li><a href="https://vuepress.vuejs.org/" target="_blank" rel="noopener noreferrer">VuePress Documentation</a></li>
<li><a href="https://docs.github.com/en/pages" target="_blank" rel="noopener noreferrer">GitHub Pages Guide</a></li>
<li><a href="https://github.com/your-username/no-budget/issues" target="_blank" rel="noopener noreferrer">Project Issues</a></li>
</ul>
</div></template>


