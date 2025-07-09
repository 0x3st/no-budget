<template><div><h1 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h1>
<p>This guide walks you through installing and setting up No Budget API for development and deployment.</p>
<h2 id="system-requirements" tabindex="-1"><a class="header-anchor" href="#system-requirements"><span>System Requirements</span></a></h2>
<ul>
<li><strong>Node.js</strong> 18.0.0 or higher</li>
<li><strong>npm</strong> 8.0.0 or higher (comes with Node.js)</li>
<li><strong>Git</strong> for version control</li>
<li><strong>Cloudflare account</strong> (free tier sufficient)</li>
</ul>
<h2 id="quick-installation" tabindex="-1"><a class="header-anchor" href="#quick-installation"><span>Quick Installation</span></a></h2>
<h3 id="_1-clone-the-repository" tabindex="-1"><a class="header-anchor" href="#_1-clone-the-repository"><span>1. Clone the Repository</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">git</span> clone https://github.com/your-username/no-budget.git</span>
<span class="line"><span class="token builtin class-name">cd</span> no-budget</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-install-dependencies" tabindex="-1"><a class="header-anchor" href="#_2-install-dependencies"><span>2. Install Dependencies</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>This installs:</p>
<ul>
<li><strong>Wrangler CLI</strong> - Cloudflare Workers development tool</li>
<li>All necessary development dependencies</li>
</ul>
<h3 id="_3-verify-installation" tabindex="-1"><a class="header-anchor" href="#_3-verify-installation"><span>3. Verify Installation</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Check Node.js version</span></span>
<span class="line"><span class="token function">node</span> <span class="token parameter variable">--version</span></span>
<span class="line"><span class="token comment"># Should output v18.0.0 or higher</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check npm version</span></span>
<span class="line"><span class="token function">npm</span> <span class="token parameter variable">--version</span></span>
<span class="line"><span class="token comment"># Should output 8.0.0 or higher</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Check Wrangler installation</span></span>
<span class="line">npx wrangler <span class="token parameter variable">--version</span></span>
<span class="line"><span class="token comment"># Should output the Wrangler version</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cloudflare-setup" tabindex="-1"><a class="header-anchor" href="#cloudflare-setup"><span>Cloudflare Setup</span></a></h2>
<h3 id="_1-create-cloudflare-account" tabindex="-1"><a class="header-anchor" href="#_1-create-cloudflare-account"><span>1. Create Cloudflare Account</span></a></h3>
<p>If you don't have one already:</p>
<ol>
<li>Go to <a href="https://dash.cloudflare.com/sign-up" target="_blank" rel="noopener noreferrer">Cloudflare</a></li>
<li>Sign up for a free account</li>
<li>Verify your email address</li>
</ol>
<h3 id="_2-login-with-wrangler" tabindex="-1"><a class="header-anchor" href="#_2-login-with-wrangler"><span>2. Login with Wrangler</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line">npx wrangler login</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>This will:</p>
<ol>
<li>Open your browser</li>
<li>Prompt you to authorize Wrangler</li>
<li>Save your authentication token locally</li>
</ol>
<h3 id="_3-verify-authentication" tabindex="-1"><a class="header-anchor" href="#_3-verify-authentication"><span>3. Verify Authentication</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line">npx wrangler <span class="token function">whoami</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Should display your Cloudflare account email.</p>
<h2 id="kv-namespace-setup" tabindex="-1"><a class="header-anchor" href="#kv-namespace-setup"><span>KV Namespace Setup</span></a></h2>
<p>The API requires a Cloudflare KV namespace for data storage.</p>
<h3 id="_1-create-kv-namespace" tabindex="-1"><a class="header-anchor" href="#_1-create-kv-namespace"><span>1. Create KV Namespace</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line">npx wrangler kv:namespace create <span class="token string">"KV"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>This command will output something like:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">🌀 Creating namespace with title "no-budget-KV"</span>
<span class="line">✨ Success! Created KV namespace for you!</span>
<span class="line">Add the following to your wrangler.toml file:</span>
<span class="line"></span>
<span class="line">kv_namespaces = [</span>
<span class="line">  { binding = "KV", id = "your-namespace-id-here" }</span>
<span class="line">]</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-update-configuration" tabindex="-1"><a class="header-anchor" href="#_2-update-configuration"><span>2. Update Configuration</span></a></h3>
<p>Copy the namespace ID and update <code v-pre>wrangler.jsonc</code>:</p>
<div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre v-pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;no-budget&quot;,</span>
<span class="line">  &quot;main&quot;: &quot;src/index.js&quot;,</span>
<span class="line">  &quot;compatibility_date&quot;: &quot;2025-07-08&quot;,</span>
<span class="line">  &quot;kv_namespaces&quot;: [</span>
<span class="line">    {</span>
<span class="line">      &quot;binding&quot;: &quot;KV&quot;,</span>
<span class="line">      &quot;id&quot;: &quot;your-namespace-id-here&quot;  // Replace with your actual ID</span>
<span class="line">    }</span>
<span class="line">  ]</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-create-preview-namespace-optional" tabindex="-1"><a class="header-anchor" href="#_3-create-preview-namespace-optional"><span>3. Create Preview Namespace (Optional)</span></a></h3>
<p>For local development with real KV storage:</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line">npx wrangler kv:namespace create <span class="token string">"KV"</span> <span class="token parameter variable">--preview</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Add the preview ID to your configuration:</p>
<div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre v-pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;kv_namespaces&quot;: [</span>
<span class="line">    {</span>
<span class="line">      &quot;binding&quot;: &quot;KV&quot;,</span>
<span class="line">      &quot;id&quot;: &quot;production-namespace-id&quot;,</span>
<span class="line">      &quot;preview_id&quot;: &quot;preview-namespace-id&quot;</span>
<span class="line">    }</span>
<span class="line">  ]</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="development-environment" tabindex="-1"><a class="header-anchor" href="#development-environment"><span>Development Environment</span></a></h2>
<h3 id="_1-start-development-server" tabindex="-1"><a class="header-anchor" href="#_1-start-development-server"><span>1. Start Development Server</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> run dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>This starts a local server at <code v-pre>http://localhost:8787</code></p>
<h3 id="_2-test-the-api" tabindex="-1"><a class="header-anchor" href="#_2-test-the-api"><span>2. Test the API</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Health check</span></span>
<span class="line"><span class="token function">curl</span> http://localhost:8787/health</span>
<span class="line"></span>
<span class="line"><span class="token comment"># API status</span></span>
<span class="line"><span class="token function">curl</span> http://localhost:8787/</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Expected response:</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"success"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"No Budget API"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"active"</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="project-structure" tabindex="-1"><a class="header-anchor" href="#project-structure"><span>Project Structure</span></a></h2>
<p>After installation, your project structure should look like:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">no-budget/</span>
<span class="line">├── src/</span>
<span class="line">│   └── index.js          # Main API code</span>
<span class="line">├── docs/                 # Documentation (VuePress)</span>
<span class="line">├── examples/             # Configuration examples</span>
<span class="line">├── .github/              # GitHub templates and workflows</span>
<span class="line">├── package.json          # Dependencies and scripts</span>
<span class="line">├── wrangler.jsonc        # Cloudflare Workers config</span>
<span class="line">├── README.md            # Project overview</span>
<span class="line">└── ...                  # Other documentation files</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="environment-scripts" tabindex="-1"><a class="header-anchor" href="#environment-scripts"><span>Environment Scripts</span></a></h2>
<p>The project includes several npm scripts:</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Development</span></span>
<span class="line"><span class="token function">npm</span> run dev              <span class="token comment"># Start local development server</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Deployment</span></span>
<span class="line"><span class="token function">npm</span> run deploy           <span class="token comment"># Deploy to Cloudflare Workers</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Documentation</span></span>
<span class="line"><span class="token function">npm</span> run docs:dev         <span class="token comment"># Start documentation server</span></span>
<span class="line"><span class="token function">npm</span> run docs:build       <span class="token comment"># Build documentation for production</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Maintenance</span></span>
<span class="line"><span class="token function">npm</span> run <span class="token builtin class-name">test</span>             <span class="token comment"># Run tests (placeholder)</span></span>
<span class="line"><span class="token function">npm</span> run lint             <span class="token comment"># Code linting (placeholder)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting"><span>Troubleshooting</span></a></h2>
<h3 id="common-issues" tabindex="-1"><a class="header-anchor" href="#common-issues"><span>Common Issues</span></a></h3>
<h4 id="wrangler-command-not-found" tabindex="-1"><a class="header-anchor" href="#wrangler-command-not-found"><span>&quot;wrangler: command not found&quot;</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Install Wrangler globally (optional)</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> wrangler</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Or use npx (recommended)</span></span>
<span class="line">npx wrangler <span class="token parameter variable">--version</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="failed-to-authenticate" tabindex="-1"><a class="header-anchor" href="#failed-to-authenticate"><span>&quot;Failed to authenticate&quot;</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Re-authenticate with Cloudflare</span></span>
<span class="line">npx wrangler <span class="token builtin class-name">logout</span></span>
<span class="line">npx wrangler login</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="kv-namespace-not-found" tabindex="-1"><a class="header-anchor" href="#kv-namespace-not-found"><span>&quot;KV namespace not found&quot;</span></a></h4>
<ul>
<li>Verify the namespace ID in <code v-pre>wrangler.jsonc</code></li>
<li>Ensure the namespace exists in your Cloudflare account</li>
<li>Check that you're using the correct account</li>
</ul>
<h4 id="permission-denied" tabindex="-1"><a class="header-anchor" href="#permission-denied"><span>&quot;Permission denied&quot;</span></a></h4>
<ul>
<li>Verify your Cloudflare account has Workers enabled</li>
<li>Check that your API token has the correct permissions</li>
</ul>
<h3 id="getting-help" tabindex="-1"><a class="header-anchor" href="#getting-help"><span>Getting Help</span></a></h3>
<p>If you encounter issues:</p>
<ol>
<li>Check the <a href="/deployment/" target="_blank" rel="noopener noreferrer">Deployment Guide</a> for detailed setup instructions</li>
<li>Review <a href="https://developers.cloudflare.com/workers/" target="_blank" rel="noopener noreferrer">Cloudflare Workers documentation</a></li>
<li>Open an issue on <a href="https://github.com/your-username/no-budget/issues" target="_blank" rel="noopener noreferrer">GitHub</a></li>
</ol>
<h2 id="next-steps" tabindex="-1"><a class="header-anchor" href="#next-steps"><span>Next Steps</span></a></h2>
<p>Now that you have the API installed:</p>
<ol>
<li><a href="/guide/quick-start.html" target="_blank" rel="noopener noreferrer">Quick Start Guide</a> - Create your first bills</li>
<li><a href="/guide/configuration.html" target="_blank" rel="noopener noreferrer">Configuration</a> - Customize your setup</li>
<li><a href="/api/" target="_blank" rel="noopener noreferrer">API Reference</a> - Explore all available endpoints</li>
</ol>
<h2 id="development-tips" tabindex="-1"><a class="header-anchor" href="#development-tips"><span>Development Tips</span></a></h2>
<ul>
<li>Use <code v-pre>npx wrangler tail</code> to view live logs during development</li>
<li>The local dev server supports hot reloading</li>
<li>KV data persists between development sessions</li>
<li>Use <code v-pre>npx wrangler kv:key list --namespace-id=YOUR_ID</code> to inspect stored data</li>
</ul>
</div></template>


