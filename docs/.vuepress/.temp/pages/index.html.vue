<template><div><h2 id="quick-example" tabindex="-1"><a class="header-anchor" href="#quick-example"><span>Quick Example</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Create a new bill</span></span>
<span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST https://your-worker.workers.dev/api/bills <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">    "description": "Coffee purchase",</span>
<span class="line">    "type": "pay",</span>
<span class="line">    "amount": 4.50,</span>
<span class="line">    "tag": "food",</span>
<span class="line">    "category": "dining"</span>
<span class="line">  }'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"success"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"uuid"</span><span class="token operator">:</span> <span class="token string">"550e8400-e29b-41d4-a716-446655440000"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"Coffee purchase"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"pay"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token number">4.50</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"time"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">"food"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"category"</span><span class="token operator">:</span> <span class="token string">"dining"</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="features-overview" tabindex="-1"><a class="header-anchor" href="#features-overview"><span>Features Overview</span></a></h2>
<h3 id="💰-financial-management" tabindex="-1"><a class="header-anchor" href="#💰-financial-management"><span>💰 Financial Management</span></a></h3>
<ul>
<li>Create, read, update, and delete bills/transactions</li>
<li>Support for both income and expenses</li>
<li>Flexible categorization with tags and categories</li>
<li>Advanced filtering by date, amount, type, and more</li>
</ul>
<h3 id="📈-analytics-insights" tabindex="-1"><a class="header-anchor" href="#📈-analytics-insights"><span>📈 Analytics &amp; Insights</span></a></h3>
<ul>
<li>Monthly and yearly financial summaries</li>
<li>Category-wise spending analysis</li>
<li>Trend analysis over configurable time periods</li>
<li>Overview dashboard with key metrics</li>
</ul>
<h3 id="🌍-global-performance" tabindex="-1"><a class="header-anchor" href="#🌍-global-performance"><span>🌍 Global Performance</span></a></h3>
<ul>
<li>Deployed on Cloudflare's global edge network</li>
<li>Sub-millisecond response times worldwide</li>
<li>Automatic scaling and high availability</li>
<li>Built-in DDoS protection and security</li>
</ul>
<h3 id="🛠️-developer-friendly" tabindex="-1"><a class="header-anchor" href="#🛠️-developer-friendly"><span>🛠️ Developer Friendly</span></a></h3>
<ul>
<li>RESTful API design with consistent responses</li>
<li>Comprehensive error handling and validation</li>
<li>Detailed documentation with examples</li>
<li>Easy deployment with Wrangler CLI</li>
</ul>
<h2 id="why-choose-no-budget-api" tabindex="-1"><a class="header-anchor" href="#why-choose-no-budget-api"><span>Why Choose No Budget API?</span></a></h2>
<ul>
<li><strong>Lightweight</strong>: No external dependencies, pure JavaScript</li>
<li><strong>Scalable</strong>: Serverless architecture that scales automatically</li>
<li><strong>Secure</strong>: Built on Cloudflare's security-first platform</li>
<li><strong>Fast</strong>: Global edge deployment for optimal performance</li>
<li><strong>Simple</strong>: Clear API design with comprehensive documentation</li>
<li><strong>Free</strong>: Deploy on Cloudflare Workers free tier</li>
</ul>
<h2 id="get-started-in-minutes" tabindex="-1"><a class="header-anchor" href="#get-started-in-minutes"><span>Get Started in Minutes</span></a></h2>
<ol>
<li>
<p><strong>Clone the repository</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">git</span> clone https://github.com/your-username/no-budget.git</span>
<span class="line"><span class="token builtin class-name">cd</span> no-budget</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Install dependencies</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><strong>Configure Cloudflare Workers</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line">npx wrangler login</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><strong>Deploy</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">npm</span> run deploy</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ol>
<p>That's it! Your personal finance API is now running globally on Cloudflare's edge network.</p>
<h2 id="community" tabindex="-1"><a class="header-anchor" href="#community"><span>Community</span></a></h2>
<ul>
<li>📋 <a href="https://github.com/your-username/no-budget/issues" target="_blank" rel="noopener noreferrer">Report Issues</a></li>
<li>💡 <a href="https://github.com/your-username/no-budget/issues/new?template=feature_request.md" target="_blank" rel="noopener noreferrer">Request Features</a></li>
<li>🤝 <a href="/guide/contributing.html" target="_blank" rel="noopener noreferrer">Contributing Guide</a></li>
<li>🔒 <a href="/guide/security.html" target="_blank" rel="noopener noreferrer">Security Policy</a></li>
</ul>
</div></template>


