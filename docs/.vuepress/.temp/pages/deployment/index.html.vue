<template><div><h1 id="deployment-guide" tabindex="-1"><a class="header-anchor" href="#deployment-guide"><span>Deployment Guide</span></a></h1>
<p>Complete guide for deploying No Budget API to Cloudflare Workers.</p>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>No Budget API is designed to run on Cloudflare Workers, providing:</p>
<ul>
<li>Global edge deployment</li>
<li>Automatic scaling</li>
<li>High availability</li>
<li>Built-in security</li>
<li>Free tier support</li>
</ul>
<h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites"><span>Prerequisites</span></a></h2>
<ul>
<li><a href="https://dash.cloudflare.com/sign-up" target="_blank" rel="noopener noreferrer">Cloudflare account</a></li>
<li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a> 18+</li>
<li><a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">Git</a></li>
<li>Project cloned and dependencies installed</li>
</ul>
<h2 id="quick-deployment" tabindex="-1"><a class="header-anchor" href="#quick-deployment"><span>Quick Deployment</span></a></h2>
<h3 id="_1-prepare-your-environment" tabindex="-1"><a class="header-anchor" href="#_1-prepare-your-environment"><span>1. Prepare Your Environment</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Clone the repository</span></span>
<span class="line"><span class="token function">git</span> clone https://github.com/your-username/no-budget.git</span>
<span class="line"><span class="token builtin class-name">cd</span> no-budget</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Install dependencies</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Login to Cloudflare</span></span>
<span class="line">npx wrangler login</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-configure-kv-namespace" tabindex="-1"><a class="header-anchor" href="#_2-configure-kv-namespace"><span>2. Configure KV Namespace</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Create production KV namespace</span></span>
<span class="line">npx wrangler kv:namespace create <span class="token string">"KV"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Note the output - you'll need the namespace ID</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Update <code v-pre>wrangler.jsonc</code> with your namespace ID:</p>
<div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre v-pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;no-budget-prod&quot;,</span>
<span class="line">  &quot;main&quot;: &quot;src/index.js&quot;,</span>
<span class="line">  &quot;compatibility_date&quot;: &quot;2025-07-08&quot;,</span>
<span class="line">  &quot;kv_namespaces&quot;: [</span>
<span class="line">    {</span>
<span class="line">      &quot;binding&quot;: &quot;KV&quot;,</span>
<span class="line">      &quot;id&quot;: &quot;your-namespace-id-here&quot;</span>
<span class="line">    }</span>
<span class="line">  ]</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-deploy" tabindex="-1"><a class="header-anchor" href="#_3-deploy"><span>3. Deploy</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> run deploy</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Your API will be available at:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">https://no-budget-prod.your-subdomain.workers.dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="environment-specific-deployment" tabindex="-1"><a class="header-anchor" href="#environment-specific-deployment"><span>Environment-Specific Deployment</span></a></h2>
<h3 id="development-environment" tabindex="-1"><a class="header-anchor" href="#development-environment"><span>Development Environment</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Create development namespace</span></span>
<span class="line">npx wrangler kv:namespace create <span class="token string">"KV"</span> <span class="token parameter variable">--env</span> dev</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Deploy to development</span></span>
<span class="line">npx wrangler deploy <span class="token parameter variable">--env</span> dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="staging-environment" tabindex="-1"><a class="header-anchor" href="#staging-environment"><span>Staging Environment</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Create staging namespace</span></span>
<span class="line">npx wrangler kv:namespace create <span class="token string">"KV"</span> <span class="token parameter variable">--env</span> staging</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Deploy to staging</span></span>
<span class="line">npx wrangler deploy <span class="token parameter variable">--env</span> staging</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="production-environment" tabindex="-1"><a class="header-anchor" href="#production-environment"><span>Production Environment</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Create production namespace</span></span>
<span class="line">npx wrangler kv:namespace create <span class="token string">"KV"</span> <span class="token parameter variable">--env</span> production</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Deploy to production</span></span>
<span class="line">npx wrangler deploy <span class="token parameter variable">--env</span> production</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="multi-environment-configuration" tabindex="-1"><a class="header-anchor" href="#multi-environment-configuration"><span>Multi-Environment Configuration</span></a></h2>
<p>Update <code v-pre>wrangler.jsonc</code> for multiple environments:</p>
<div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre v-pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;no-budget&quot;,</span>
<span class="line">  &quot;main&quot;: &quot;src/index.js&quot;,</span>
<span class="line">  &quot;compatibility_date&quot;: &quot;2025-07-08&quot;,</span>
<span class="line">  </span>
<span class="line">  &quot;env&quot;: {</span>
<span class="line">    &quot;dev&quot;: {</span>
<span class="line">      &quot;name&quot;: &quot;no-budget-dev&quot;,</span>
<span class="line">      &quot;kv_namespaces&quot;: [</span>
<span class="line">        {</span>
<span class="line">          &quot;binding&quot;: &quot;KV&quot;,</span>
<span class="line">          &quot;id&quot;: &quot;dev-namespace-id&quot;</span>
<span class="line">        }</span>
<span class="line">      ]</span>
<span class="line">    },</span>
<span class="line">    &quot;staging&quot;: {</span>
<span class="line">      &quot;name&quot;: &quot;no-budget-staging&quot;, </span>
<span class="line">      &quot;kv_namespaces&quot;: [</span>
<span class="line">        {</span>
<span class="line">          &quot;binding&quot;: &quot;KV&quot;,</span>
<span class="line">          &quot;id&quot;: &quot;staging-namespace-id&quot;</span>
<span class="line">        }</span>
<span class="line">      ]</span>
<span class="line">    },</span>
<span class="line">    &quot;production&quot;: {</span>
<span class="line">      &quot;name&quot;: &quot;no-budget-prod&quot;,</span>
<span class="line">      &quot;kv_namespaces&quot;: [</span>
<span class="line">        {</span>
<span class="line">          &quot;binding&quot;: &quot;KV&quot;,</span>
<span class="line">          &quot;id&quot;: &quot;production-namespace-id&quot;</span>
<span class="line">        }</span>
<span class="line">      ]</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="custom-domain-setup" tabindex="-1"><a class="header-anchor" href="#custom-domain-setup"><span>Custom Domain Setup</span></a></h2>
<h3 id="_1-add-domain-to-cloudflare" tabindex="-1"><a class="header-anchor" href="#_1-add-domain-to-cloudflare"><span>1. Add Domain to Cloudflare</span></a></h3>
<ol>
<li>Log into Cloudflare Dashboard</li>
<li>Add your domain to Cloudflare</li>
<li>Update nameservers at your domain registrar</li>
</ol>
<h3 id="_2-configure-worker-route" tabindex="-1"><a class="header-anchor" href="#_2-configure-worker-route"><span>2. Configure Worker Route</span></a></h3>
<p>Option A: Via Dashboard</p>
<ol>
<li>Go to Workers &amp; Pages</li>
<li>Select your worker</li>
<li>Go to Settings → Triggers</li>
<li>Add custom domain: <code v-pre>api.yourdomain.com</code></li>
</ol>
<p>Option B: Via Configuration</p>
<div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre v-pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;no-budget-prod&quot;,</span>
<span class="line">  &quot;main&quot;: &quot;src/index.js&quot;,</span>
<span class="line">  &quot;routes&quot;: [</span>
<span class="line">    {</span>
<span class="line">      &quot;pattern&quot;: &quot;api.yourdomain.com/*&quot;,</span>
<span class="line">      &quot;zone_name&quot;: &quot;yourdomain.com&quot;</span>
<span class="line">    }</span>
<span class="line">  ],</span>
<span class="line">  &quot;kv_namespaces&quot;: [</span>
<span class="line">    {</span>
<span class="line">      &quot;binding&quot;: &quot;KV&quot;,</span>
<span class="line">      &quot;id&quot;: &quot;your-namespace-id&quot;</span>
<span class="line">    }</span>
<span class="line">  ]</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-ssl-certificate" tabindex="-1"><a class="header-anchor" href="#_3-ssl-certificate"><span>3. SSL Certificate</span></a></h3>
<p>Cloudflare automatically provides SSL certificates for custom domains.</p>
<h2 id="ci-cd-with-github-actions" tabindex="-1"><a class="header-anchor" href="#ci-cd-with-github-actions"><span>CI/CD with GitHub Actions</span></a></h2>
<h3 id="_1-set-up-repository-secrets" tabindex="-1"><a class="header-anchor" href="#_1-set-up-repository-secrets"><span>1. Set Up Repository Secrets</span></a></h3>
<p>In your GitHub repository settings, add:</p>
<ul>
<li><code v-pre>CLOUDFLARE_API_TOKEN</code>: Your Cloudflare API token</li>
<li><code v-pre>CLOUDFLARE_ACCOUNT_ID</code>: Your Cloudflare account ID</li>
</ul>
<h3 id="_2-create-api-token" tabindex="-1"><a class="header-anchor" href="#_2-create-api-token"><span>2. Create API Token</span></a></h3>
<ol>
<li>Go to <a href="https://dash.cloudflare.com/profile/api-tokens" target="_blank" rel="noopener noreferrer">Cloudflare API Tokens</a></li>
<li>Create Custom Token with permissions:
<ul>
<li>Zone:Zone:Read</li>
<li>Zone:Zone Settings:Edit</li>
<li>Account:Cloudflare Workers:Edit</li>
</ul>
</li>
</ol>
<h3 id="_3-github-actions-workflow" tabindex="-1"><a class="header-anchor" href="#_3-github-actions-workflow"><span>3. GitHub Actions Workflow</span></a></h3>
<p>The project includes <code v-pre>.github/workflows/deploy.yml</code>:</p>
<div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml"><pre v-pre><code class="language-yaml"><span class="line"><span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to Cloudflare Workers</span>
<span class="line"></span>
<span class="line"><span class="token key atrule">on</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">push</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span></span>
<span class="line">  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token key atrule">jobs</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">deploy</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest</span>
<span class="line">    <span class="token key atrule">if</span><span class="token punctuation">:</span> github.ref == 'refs/heads/main'</span>
<span class="line">    <span class="token key atrule">steps</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v4</span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v4</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">'18'</span></span>
<span class="line">          <span class="token key atrule">cache</span><span class="token punctuation">:</span> <span class="token string">'npm'</span></span>
<span class="line">      </span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npm ci</span>
<span class="line">      </span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> cloudflare/wrangler<span class="token punctuation">-</span>action@v3</span>
<span class="line">        <span class="token key atrule">with</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">apiToken</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.CLOUDFLARE_API_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line">          <span class="token key atrule">accountId</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.CLOUDFLARE_ACCOUNT_ID <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="monitoring-and-logging" tabindex="-1"><a class="header-anchor" href="#monitoring-and-logging"><span>Monitoring and Logging</span></a></h2>
<h3 id="real-time-logs" tabindex="-1"><a class="header-anchor" href="#real-time-logs"><span>Real-time Logs</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># View live logs</span></span>
<span class="line">npx wrangler <span class="token function">tail</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># View logs for specific environment</span></span>
<span class="line">npx wrangler <span class="token function">tail</span> <span class="token parameter variable">--env</span> production</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cloudflare-analytics" tabindex="-1"><a class="header-anchor" href="#cloudflare-analytics"><span>Cloudflare Analytics</span></a></h3>
<ol>
<li>Go to Workers &amp; Pages in Cloudflare Dashboard</li>
<li>Select your worker</li>
<li>View Metrics tab for:
<ul>
<li>Request volume</li>
<li>Error rates</li>
<li>Response times</li>
<li>CPU usage</li>
</ul>
</li>
</ol>
<h3 id="custom-logging" tabindex="-1"><a class="header-anchor" href="#custom-logging"><span>Custom Logging</span></a></h3>
<p>Add custom logging to your worker:</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line"><span class="token comment">// In your worker code</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Custom log message'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> </span>
<span class="line">  <span class="token literal-property property">endpoint</span><span class="token operator">:</span> path<span class="token punctuation">,</span> </span>
<span class="line">  <span class="token literal-property property">method</span><span class="token operator">:</span> method<span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">timestamp</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toISOString</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="performance-optimization" tabindex="-1"><a class="header-anchor" href="#performance-optimization"><span>Performance Optimization</span></a></h2>
<h3 id="smart-placement" tabindex="-1"><a class="header-anchor" href="#smart-placement"><span>Smart Placement</span></a></h3>
<p>Enable Smart Placement for better performance:</p>
<div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre v-pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;no-budget&quot;,</span>
<span class="line">  &quot;placement&quot;: { &quot;mode&quot;: &quot;smart&quot; },</span>
<span class="line">  &quot;kv_namespaces&quot;: [...]</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cpu-limits" tabindex="-1"><a class="header-anchor" href="#cpu-limits"><span>CPU Limits</span></a></h3>
<p>Set appropriate CPU limits:</p>
<div class="language-jsonc line-numbers-mode" data-highlighter="prismjs" data-ext="jsonc"><pre v-pre><code class="language-jsonc"><span class="line">{</span>
<span class="line">  &quot;name&quot;: &quot;no-budget&quot;,</span>
<span class="line">  &quot;limits&quot;: {</span>
<span class="line">    &quot;cpu_ms&quot;: 50</span>
<span class="line">  },</span>
<span class="line">  &quot;kv_namespaces&quot;: [...]</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kv-performance" tabindex="-1"><a class="header-anchor" href="#kv-performance"><span>KV Performance</span></a></h3>
<ul>
<li>Use KV for data that doesn't change frequently</li>
<li>Implement caching strategies for frequently accessed data</li>
<li>Consider KV read performance (eventual consistency)</li>
</ul>
<h2 id="security-best-practices" tabindex="-1"><a class="header-anchor" href="#security-best-practices"><span>Security Best Practices</span></a></h2>
<h3 id="worker-security" tabindex="-1"><a class="header-anchor" href="#worker-security"><span>Worker Security</span></a></h3>
<ol>
<li><strong>Input Validation</strong>: Always validate request data</li>
<li><strong>Error Handling</strong>: Don't expose sensitive information in errors</li>
<li><strong>Rate Limiting</strong>: Use Cloudflare's built-in rate limiting</li>
<li><strong>CORS</strong>: Configure appropriate CORS headers</li>
</ol>
<h3 id="kv-security" tabindex="-1"><a class="header-anchor" href="#kv-security"><span>KV Security</span></a></h3>
<ol>
<li><strong>Data Isolation</strong>: Use different namespaces for different environments</li>
<li><strong>Access Control</strong>: Limit KV access to specific workers</li>
<li><strong>Data Encryption</strong>: Consider encrypting sensitive data before storing</li>
</ol>
<h3 id="network-security" tabindex="-1"><a class="header-anchor" href="#network-security"><span>Network Security</span></a></h3>
<ol>
<li><strong>HTTPS Only</strong>: Always use HTTPS for API calls</li>
<li><strong>Custom Domains</strong>: Use custom domains for production</li>
<li><strong>Access Logs</strong>: Monitor access patterns</li>
</ol>
<h2 id="backup-and-recovery" tabindex="-1"><a class="header-anchor" href="#backup-and-recovery"><span>Backup and Recovery</span></a></h2>
<h3 id="data-export" tabindex="-1"><a class="header-anchor" href="#data-export"><span>Data Export</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Export all bills data</span></span>
<span class="line">npx wrangler kv:key get <span class="token string">"bills"</span> --namespace-id<span class="token operator">=</span>your-namespace-id <span class="token operator">></span> backup.json</span>
<span class="line"></span>
<span class="line"><span class="token comment"># List all keys</span></span>
<span class="line">npx wrangler kv:key list --namespace-id<span class="token operator">=</span>your-namespace-id</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="data-import" tabindex="-1"><a class="header-anchor" href="#data-import"><span>Data Import</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Import bills data</span></span>
<span class="line">npx wrangler kv:key put <span class="token string">"bills"</span> <span class="token parameter variable">--path</span><span class="token operator">=</span>backup.json --namespace-id<span class="token operator">=</span>your-namespace-id</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="automated-backups" tabindex="-1"><a class="header-anchor" href="#automated-backups"><span>Automated Backups</span></a></h3>
<p>Consider setting up automated backups:</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># backup-script.sh</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">DATE</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y%m%d_%H%M%S<span class="token variable">)</span></span></span>
<span class="line"><span class="token assign-left variable">NAMESPACE_ID</span><span class="token operator">=</span><span class="token string">"your-namespace-id"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Export data</span></span>
<span class="line">npx wrangler kv:key get <span class="token string">"bills"</span> --namespace-id<span class="token operator">=</span><span class="token variable">$NAMESPACE_ID</span> <span class="token operator">></span> <span class="token string">"backup_<span class="token variable">$DATE</span>.json"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Upload to cloud storage (example with AWS S3)</span></span>
<span class="line">aws s3 <span class="token function">cp</span> <span class="token string">"backup_<span class="token variable">$DATE</span>.json"</span> s3://your-backup-bucket/</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting"><span>Troubleshooting</span></a></h2>
<h3 id="common-deployment-issues" tabindex="-1"><a class="header-anchor" href="#common-deployment-issues"><span>Common Deployment Issues</span></a></h3>
<p><strong>&quot;Namespace not found&quot;</strong></p>
<ul>
<li>Verify namespace ID in wrangler.jsonc</li>
<li>Ensure namespace exists in correct account</li>
<li>Check environment-specific configuration</li>
</ul>
<p><strong>&quot;Permission denied&quot;</strong></p>
<ul>
<li>Verify API token permissions</li>
<li>Check account ID is correct</li>
<li>Ensure Workers are enabled on your account</li>
</ul>
<p><strong>&quot;Deployment failed&quot;</strong></p>
<ul>
<li>Check wrangler.jsonc syntax</li>
<li>Verify all required fields are present</li>
<li>Review error logs with <code v-pre>npx wrangler tail</code></li>
</ul>
<h3 id="performance-issues" tabindex="-1"><a class="header-anchor" href="#performance-issues"><span>Performance Issues</span></a></h3>
<p><strong>High CPU usage</strong></p>
<ul>
<li>Review code for inefficient operations</li>
<li>Implement caching</li>
<li>Consider breaking down large operations</li>
</ul>
<p><strong>KV timeout errors</strong></p>
<ul>
<li>Implement retry logic</li>
<li>Check KV namespace configuration</li>
<li>Monitor KV usage limits</li>
</ul>
<h3 id="debugging-tips" tabindex="-1"><a class="header-anchor" href="#debugging-tips"><span>Debugging Tips</span></a></h3>
<ol>
<li><strong>Local Testing</strong>: Always test locally first with <code v-pre>npm run dev</code></li>
<li><strong>Staged Deployment</strong>: Use staging environment before production</li>
<li><strong>Monitoring</strong>: Set up alerts for error rates and response times</li>
<li><strong>Logging</strong>: Add comprehensive logging for debugging</li>
</ol>
<h2 id="scaling-considerations" tabindex="-1"><a class="header-anchor" href="#scaling-considerations"><span>Scaling Considerations</span></a></h2>
<h3 id="free-tier-limits" tabindex="-1"><a class="header-anchor" href="#free-tier-limits"><span>Free Tier Limits</span></a></h3>
<ul>
<li>100,000 requests per day</li>
<li>1,000 KV operations per day</li>
<li>10ms CPU time per request</li>
</ul>
<h3 id="paid-tier-benefits" tabindex="-1"><a class="header-anchor" href="#paid-tier-benefits"><span>Paid Tier Benefits</span></a></h3>
<ul>
<li>Higher request limits</li>
<li>More KV operations</li>
<li>Longer CPU time</li>
<li>Additional features (Smart Placement, etc.)</li>
</ul>
<h3 id="architecture-for-scale" tabindex="-1"><a class="header-anchor" href="#architecture-for-scale"><span>Architecture for Scale</span></a></h3>
<p>For high-traffic applications:</p>
<ol>
<li>Implement caching strategies</li>
<li>Use multiple KV namespaces for data partitioning</li>
<li>Consider external databases for complex queries</li>
<li>Implement rate limiting and authentication</li>
</ol>
<h2 id="next-steps" tabindex="-1"><a class="header-anchor" href="#next-steps"><span>Next Steps</span></a></h2>
<p>After deployment:</p>
<ol>
<li><a href="/deployment/monitoring.html" target="_blank" rel="noopener noreferrer">Monitor your application</a></li>
<li><a href="/deployment/custom-domain.html" target="_blank" rel="noopener noreferrer">Set up custom domain</a></li>
<li><a href="/deployment/environment-setup.html" target="_blank" rel="noopener noreferrer">Configure environment-specific settings</a></li>
<li><a href="#backup-and-recovery">Implement backup strategies</a></li>
</ol>
</div></template>


