<template><div><h1 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started"><span>Getting Started</span></a></h1>
<p>Welcome to No Budget API! This guide will help you get up and running with your personal finance API in just a few minutes.</p>
<h2 id="what-is-no-budget-api" tabindex="-1"><a class="header-anchor" href="#what-is-no-budget-api"><span>What is No Budget API?</span></a></h2>
<p>No Budget API is a comprehensive personal finance management system built as a REST API on Cloudflare Workers. It provides:</p>
<ul>
<li>Complete CRUD operations for financial transactions (bills)</li>
<li>Rich statistics and analytics</li>
<li>Flexible categorization and tagging</li>
<li>Advanced filtering and search capabilities</li>
<li>Global edge deployment for maximum performance</li>
</ul>
<h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites"><span>Prerequisites</span></a></h2>
<p>Before you begin, make sure you have:</p>
<ul>
<li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a> 18 or higher</li>
<li>A <a href="https://dash.cloudflare.com/sign-up" target="_blank" rel="noopener noreferrer">Cloudflare account</a> (free tier works great)</li>
<li>Basic knowledge of REST APIs and HTTP requests</li>
</ul>
<h2 id="architecture-overview" tabindex="-1"><a class="header-anchor" href="#architecture-overview"><span>Architecture Overview</span></a></h2>
<div class="language-mermaid line-numbers-mode" data-highlighter="prismjs" data-ext="mermaid"><pre v-pre><code class="language-mermaid"><span class="line"><span class="token keyword">graph</span> TB</span>
<span class="line">    A<span class="token text string">[Client Application]</span> <span class="token arrow operator">--></span> B<span class="token text string">[Cloudflare Edge]</span></span>
<span class="line">    B <span class="token arrow operator">--></span> C<span class="token text string">[No Budget API Worker]</span></span>
<span class="line">    C <span class="token arrow operator">--></span> D<span class="token text string">[Cloudflare KV Storage]</span></span>
<span class="line">    </span>
<span class="line">    E<span class="token text string">[Global Users]</span> <span class="token arrow operator">--></span> B</span>
<span class="line">    F<span class="token text string">[Analytics Dashboard]</span> <span class="token arrow operator">--></span> B</span>
<span class="line">    G<span class="token text string">[Mobile App]</span> <span class="token arrow operator">--></span> B</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The API is deployed as a Cloudflare Worker, which runs your code at edge locations around the world for optimal performance. Data is stored in Cloudflare KV, a globally distributed key-value store.</p>
<h2 id="core-concepts" tabindex="-1"><a class="header-anchor" href="#core-concepts"><span>Core Concepts</span></a></h2>
<h3 id="bills-transactions" tabindex="-1"><a class="header-anchor" href="#bills-transactions"><span>Bills (Transactions)</span></a></h3>
<p>The primary entity in the system. Each bill represents a financial transaction with:</p>
<ul>
<li><strong>UUID</strong>: Unique identifier</li>
<li><strong>Description</strong>: Human-readable description</li>
<li><strong>Type</strong>: Either &quot;receive&quot; (income) or &quot;pay&quot; (expense)</li>
<li><strong>Amount</strong>: Monetary value (always positive)</li>
<li><strong>Time</strong>: ISO timestamp</li>
<li><strong>Tag</strong>: Custom organizational tag</li>
<li><strong>Category</strong>: Predefined category</li>
</ul>
<h3 id="statistics" tabindex="-1"><a class="header-anchor" href="#statistics"><span>Statistics</span></a></h3>
<p>The API provides comprehensive analytics:</p>
<ul>
<li><strong>Overview</strong>: Current month vs all-time summaries</li>
<li><strong>Monthly</strong>: Month-by-month breakdowns</li>
<li><strong>Category</strong>: Spending analysis by category</li>
<li><strong>Trend</strong>: Time-based trend analysis</li>
</ul>
<h3 id="tags-categories" tabindex="-1"><a class="header-anchor" href="#tags-categories"><span>Tags &amp; Categories</span></a></h3>
<p>Flexible organization system:</p>
<ul>
<li><strong>Tags</strong>: Custom labels you create</li>
<li><strong>Categories</strong>: Predefined or custom categories</li>
<li>Both can be used for filtering and analytics</li>
</ul>
<h2 id="data-flow" tabindex="-1"><a class="header-anchor" href="#data-flow"><span>Data Flow</span></a></h2>
<ol>
<li><strong>Create</strong>: POST new bills via API</li>
<li><strong>Store</strong>: Data saved to Cloudflare KV</li>
<li><strong>Process</strong>: Statistics calculated in real-time</li>
<li><strong>Retrieve</strong>: GET bills with filtering options</li>
<li><strong>Analyze</strong>: Rich analytics and reporting</li>
</ol>
<h2 id="api-design-principles" tabindex="-1"><a class="header-anchor" href="#api-design-principles"><span>API Design Principles</span></a></h2>
<ul>
<li><strong>RESTful</strong>: Standard HTTP methods and status codes</li>
<li><strong>Consistent</strong>: Uniform response format across all endpoints</li>
<li><strong>Documented</strong>: Every endpoint thoroughly documented with examples</li>
<li><strong>Validated</strong>: Input validation with clear error messages</li>
<li><strong>Paginated</strong>: Large result sets properly paginated</li>
</ul>
<h2 id="response-format" tabindex="-1"><a class="header-anchor" href="#response-format"><span>Response Format</span></a></h2>
<p>All API responses follow this consistent structure:</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"success"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Response data here</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Error responses:</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"error"</span><span class="token operator">:</span> <span class="token string">"Error type"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Detailed error message"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="next-steps" tabindex="-1"><a class="header-anchor" href="#next-steps"><span>Next Steps</span></a></h2>
<p>Now that you understand the basics, let's get the API installed and running:</p>
<ol>
<li><a href="/guide/installation.html" target="_blank" rel="noopener noreferrer">Installation</a> - Set up the development environment</li>
<li><a href="/guide/quick-start.html" target="_blank" rel="noopener noreferrer">Quick Start</a> - Deploy your first instance</li>
<li><a href="/guide/configuration.html" target="_blank" rel="noopener noreferrer">Configuration</a> - Customize the setup</li>
</ol>
<h2 id="need-help" tabindex="-1"><a class="header-anchor" href="#need-help"><span>Need Help?</span></a></h2>
<ul>
<li>Check the <a href="/api/" target="_blank" rel="noopener noreferrer">API Reference</a> for detailed endpoint documentation</li>
<li>Browse <a href="/examples/" target="_blank" rel="noopener noreferrer">Examples</a> for common use cases</li>
<li>Visit our <a href="https://github.com/your-username/no-budget" target="_blank" rel="noopener noreferrer">GitHub repository</a> for issues and discussions</li>
</ul>
</div></template>


