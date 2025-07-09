<template><div><h1 id="bills-api" tabindex="-1"><a class="header-anchor" href="#bills-api"><span>Bills API</span></a></h1>
<p>Complete reference for bills management endpoints.</p>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>The Bills API provides full CRUD (Create, Read, Update, Delete) operations for managing financial transactions. Each bill represents either income (&quot;receive&quot;) or expense (&quot;pay&quot;) with detailed metadata.</p>
<h2 id="bill-object-schema" tabindex="-1"><a class="header-anchor" href="#bill-object-schema"><span>Bill Object Schema</span></a></h2>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">interface</span> <span class="token class-name">Bill</span> <span class="token punctuation">{</span></span>
<span class="line">  uuid<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>           <span class="token comment">// Unique identifier (auto-generated)</span></span>
<span class="line">  description<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>    <span class="token comment">// Human-readable description (1-200 chars)</span></span>
<span class="line">  type<span class="token operator">:</span> <span class="token string">"receive"</span> <span class="token operator">|</span> <span class="token string">"pay"</span><span class="token punctuation">;</span> <span class="token comment">// Transaction type</span></span>
<span class="line">  <span class="token class-name">amount</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>         <span class="token comment">// Positive monetary value</span></span>
<span class="line">  time<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>          <span class="token comment">// ISO 8601 timestamp (auto-generated)</span></span>
<span class="line">  tag<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>           <span class="token comment">// Custom tag (1-50 chars)</span></span>
<span class="line">  category<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>      <span class="token comment">// Category classification (1-50 chars)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="endpoints" tabindex="-1"><a class="header-anchor" href="#endpoints"><span>Endpoints</span></a></h2>
<h3 id="create-bill" tabindex="-1"><a class="header-anchor" href="#create-bill"><span>Create Bill</span></a></h3>
<p>Create a new financial transaction.</p>
<p><strong>POST</strong> <code v-pre>/api/bills</code></p>
<h4 id="request-body" tabindex="-1"><a class="header-anchor" href="#request-body"><span>Request Body</span></a></h4>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"Coffee purchase"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"pay"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token number">4.50</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">"food"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"category"</span><span class="token operator">:</span> <span class="token string">"dining"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Required</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>description</td>
<td>string</td>
<td>Yes</td>
<td>Bill description (1-200 characters)</td>
</tr>
<tr>
<td>type</td>
<td>string</td>
<td>Yes</td>
<td>Either &quot;receive&quot; or &quot;pay&quot;</td>
</tr>
<tr>
<td>amount</td>
<td>number</td>
<td>Yes</td>
<td>Positive monetary amount</td>
</tr>
<tr>
<td>tag</td>
<td>string</td>
<td>No</td>
<td>Custom tag (default: &quot;general&quot;)</td>
</tr>
<tr>
<td>category</td>
<td>string</td>
<td>No</td>
<td>Category (default: &quot;other&quot;)</td>
</tr>
</tbody>
</table>
<h4 id="response" tabindex="-1"><a class="header-anchor" href="#response"><span>Response</span></a></h4>
<p><strong>Status: 201 Created</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST https://your-worker.workers.dev/api/bills <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">    "description": "Grocery shopping",</span>
<span class="line">    "type": "pay", </span>
<span class="line">    "amount": 85.50,</span>
<span class="line">    "tag": "food",</span>
<span class="line">    "category": "groceries"</span>
<span class="line">  }'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="get-all-bills" tabindex="-1"><a class="header-anchor" href="#get-all-bills"><span>Get All Bills</span></a></h3>
<p>Retrieve bills with optional filtering and pagination.</p>
<p><strong>GET</strong> <code v-pre>/api/bills</code></p>
<h4 id="query-parameters" tabindex="-1"><a class="header-anchor" href="#query-parameters"><span>Query Parameters</span></a></h4>
<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>type</td>
<td>string</td>
<td>Filter by &quot;receive&quot; or &quot;pay&quot;</td>
<td><code v-pre>type=pay</code></td>
</tr>
<tr>
<td>tag</td>
<td>string</td>
<td>Filter by tag</td>
<td><code v-pre>tag=food</code></td>
</tr>
<tr>
<td>category</td>
<td>string</td>
<td>Filter by category</td>
<td><code v-pre>category=dining</code></td>
</tr>
<tr>
<td>start_date</td>
<td>string</td>
<td>Start date (ISO format)</td>
<td><code v-pre>start_date=2025-01-01</code></td>
</tr>
<tr>
<td>end_date</td>
<td>string</td>
<td>End date (ISO format)</td>
<td><code v-pre>end_date=2025-12-31</code></td>
</tr>
<tr>
<td>min_amount</td>
<td>number</td>
<td>Minimum amount</td>
<td><code v-pre>min_amount=10.00</code></td>
</tr>
<tr>
<td>max_amount</td>
<td>number</td>
<td>Maximum amount</td>
<td><code v-pre>max_amount=100.00</code></td>
</tr>
<tr>
<td>limit</td>
<td>number</td>
<td>Results per page (max 100)</td>
<td><code v-pre>limit=20</code></td>
</tr>
<tr>
<td>offset</td>
<td>number</td>
<td>Results to skip</td>
<td><code v-pre>offset=40</code></td>
</tr>
</tbody>
</table>
<h4 id="response-1" tabindex="-1"><a class="header-anchor" href="#response-1"><span>Response</span></a></h4>
<p><strong>Status: 200 OK</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"success"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"bills"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"uuid"</span><span class="token operator">:</span> <span class="token string">"550e8400-e29b-41d4-a716-446655440000"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"Coffee purchase"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"pay"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token number">4.50</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"time"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">"food"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token property">"category"</span><span class="token operator">:</span> <span class="token string">"dining"</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"total"</span><span class="token operator">:</span> <span class="token number">150</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"offset"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"limit"</span><span class="token operator">:</span> <span class="token number">50</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:35:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="examples" tabindex="-1"><a class="header-anchor" href="#examples"><span>Examples</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token comment"># Get all bills</span></span>
<span class="line"><span class="token function">curl</span> https://your-worker.workers.dev/api/bills</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Get expenses only</span></span>
<span class="line"><span class="token function">curl</span> <span class="token string">"https://your-worker.workers.dev/api/bills?type=pay"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Get bills from last month</span></span>
<span class="line"><span class="token function">curl</span> <span class="token string">"https://your-worker.workers.dev/api/bills?start_date=2025-06-01&amp;end_date=2025-06-30"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Get dining expenses over $20</span></span>
<span class="line"><span class="token function">curl</span> <span class="token string">"https://your-worker.workers.dev/api/bills?type=pay&amp;category=dining&amp;min_amount=20"</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Pagination</span></span>
<span class="line"><span class="token function">curl</span> <span class="token string">"https://your-worker.workers.dev/api/bills?limit=10&amp;offset=20"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="get-single-bill" tabindex="-1"><a class="header-anchor" href="#get-single-bill"><span>Get Single Bill</span></a></h3>
<p>Retrieve a specific bill by UUID.</p>
<p><strong>GET</strong> <code v-pre>/api/bills/{uuid}</code></p>
<h4 id="path-parameters" tabindex="-1"><a class="header-anchor" href="#path-parameters"><span>Path Parameters</span></a></h4>
<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>uuid</td>
<td>string</td>
<td>Bill UUID</td>
</tr>
</tbody>
</table>
<h4 id="response-2" tabindex="-1"><a class="header-anchor" href="#response-2"><span>Response</span></a></h4>
<p><strong>Status: 200 OK</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
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
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:50:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1"><span>Example</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">curl</span> https://your-worker.workers.dev/api/bills/550e8400-e29b-41d4-a716-446655440000</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="update-bill" tabindex="-1"><a class="header-anchor" href="#update-bill"><span>Update Bill</span></a></h3>
<p>Update an existing bill. All fields except UUID and time can be modified.</p>
<p><strong>PUT</strong> <code v-pre>/api/bills/{uuid}</code></p>
<h4 id="path-parameters-1" tabindex="-1"><a class="header-anchor" href="#path-parameters-1"><span>Path Parameters</span></a></h4>
<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>uuid</td>
<td>string</td>
<td>Bill UUID</td>
</tr>
</tbody>
</table>
<h4 id="request-body-1" tabindex="-1"><a class="header-anchor" href="#request-body-1"><span>Request Body</span></a></h4>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"Updated description"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"pay"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token number">5.00</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">"food"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"category"</span><span class="token operator">:</span> <span class="token string">"dining"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>All fields are optional. Only provided fields will be updated.</p>
<h4 id="response-3" tabindex="-1"><a class="header-anchor" href="#response-3"><span>Response</span></a></h4>
<p><strong>Status: 200 OK</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"success"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"uuid"</span><span class="token operator">:</span> <span class="token string">"550e8400-e29b-41d4-a716-446655440000"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"Updated description"</span><span class="token punctuation">,</span> </span>
<span class="line">    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"pay"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token number">5.00</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"time"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"tag"</span><span class="token operator">:</span> <span class="token string">"food"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"category"</span><span class="token operator">:</span> <span class="token string">"dining"</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:40:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example-2" tabindex="-1"><a class="header-anchor" href="#example-2"><span>Example</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> PUT https://your-worker.workers.dev/api/bills/550e8400-e29b-41d4-a716-446655440000 <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">    "description": "Updated grocery shopping",</span>
<span class="line">    "amount": 92.75</span>
<span class="line">  }'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="delete-bill" tabindex="-1"><a class="header-anchor" href="#delete-bill"><span>Delete Bill</span></a></h3>
<p>Permanently delete a bill.</p>
<p><strong>DELETE</strong> <code v-pre>/api/bills/{uuid}</code></p>
<h4 id="path-parameters-2" tabindex="-1"><a class="header-anchor" href="#path-parameters-2"><span>Path Parameters</span></a></h4>
<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>uuid</td>
<td>string</td>
<td>Bill UUID</td>
</tr>
</tbody>
</table>
<h4 id="response-4" tabindex="-1"><a class="header-anchor" href="#response-4"><span>Response</span></a></h4>
<p><strong>Status: 200 OK</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"success"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Bill deleted successfully"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"uuid"</span><span class="token operator">:</span> <span class="token string">"550e8400-e29b-41d4-a716-446655440000"</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:55:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="example-3" tabindex="-1"><a class="header-anchor" href="#example-3"><span>Example</span></a></h4>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> DELETE https://your-worker.workers.dev/api/bills/550e8400-e29b-41d4-a716-446655440000</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="error-responses" tabindex="-1"><a class="header-anchor" href="#error-responses"><span>Error Responses</span></a></h2>
<h3 id="validation-errors" tabindex="-1"><a class="header-anchor" href="#validation-errors"><span>Validation Errors</span></a></h3>
<p><strong>Status: 400 Bad Request</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"error"</span><span class="token operator">:</span> <span class="token string">"Validation Error"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Amount must be a positive number"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T11:00:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Common validation errors:</p>
<ul>
<li>Missing required fields</li>
<li>Invalid amount (negative or non-numeric)</li>
<li>Invalid type (not &quot;receive&quot; or &quot;pay&quot;)</li>
<li>Description too long (&gt;200 characters)</li>
<li>Tag/category too long (&gt;50 characters)</li>
</ul>
<h3 id="not-found-errors" tabindex="-1"><a class="header-anchor" href="#not-found-errors"><span>Not Found Errors</span></a></h3>
<p><strong>Status: 404 Not Found</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"error"</span><span class="token operator">:</span> <span class="token string">"Not Found"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"No bill found with UUID: 550e8400-e29b-41d4-a716-446655440999"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T11:00:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="server-errors" tabindex="-1"><a class="header-anchor" href="#server-errors"><span>Server Errors</span></a></h3>
<p><strong>Status: 500 Internal Server Error</strong></p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"error"</span><span class="token operator">:</span> <span class="token string">"Internal Server Error"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"An unexpected error occurred"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T11:00:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="best-practices" tabindex="-1"><a class="header-anchor" href="#best-practices"><span>Best Practices</span></a></h2>
<h3 id="creating-bills" tabindex="-1"><a class="header-anchor" href="#creating-bills"><span>Creating Bills</span></a></h3>
<ol>
<li><strong>Use descriptive descriptions</strong>: Make it easy to identify transactions later</li>
<li><strong>Choose consistent tags and categories</strong>: This improves analytics and filtering</li>
<li><strong>Validate amounts</strong>: Ensure positive numbers only</li>
<li><strong>Use appropriate types</strong>: &quot;receive&quot; for income, &quot;pay&quot; for expenses</li>
</ol>
<h3 id="updating-bills" tabindex="-1"><a class="header-anchor" href="#updating-bills"><span>Updating Bills</span></a></h3>
<ol>
<li><strong>Only update necessary fields</strong>: Partial updates are supported</li>
<li><strong>Preserve historical accuracy</strong>: Consider if updates change financial history</li>
<li><strong>Use meaningful descriptions</strong>: Keep descriptions current and accurate</li>
</ol>
<h3 id="querying-bills" tabindex="-1"><a class="header-anchor" href="#querying-bills"><span>Querying Bills</span></a></h3>
<ol>
<li><strong>Use appropriate pagination</strong>: Don't request more data than needed</li>
<li><strong>Filter server-side</strong>: Use query parameters instead of client-side filtering</li>
<li><strong>Cache results</strong>: Store frequently accessed data locally</li>
<li><strong>Handle errors gracefully</strong>: Always check response status</li>
</ol>
<h3 id="performance-tips" tabindex="-1"><a class="header-anchor" href="#performance-tips"><span>Performance Tips</span></a></h3>
<ol>
<li><strong>Limit result sets</strong>: Use <code v-pre>limit</code> parameter for large datasets</li>
<li><strong>Use date ranges</strong>: Filter by date to reduce response size</li>
<li><strong>Batch operations</strong>: Group multiple changes when possible</li>
<li><strong>Monitor usage</strong>: Keep track of API usage patterns</li>
</ol>
<h2 id="sdk-examples" tabindex="-1"><a class="header-anchor" href="#sdk-examples"><span>SDK Examples</span></a></h2>
<h3 id="javascript-typescript" tabindex="-1"><a class="header-anchor" href="#javascript-typescript"><span>JavaScript/TypeScript</span></a></h3>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">interface</span> <span class="token class-name">CreateBillRequest</span> <span class="token punctuation">{</span></span>
<span class="line">  description<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span></span>
<span class="line">  type<span class="token operator">:</span> <span class="token string">'receive'</span> <span class="token operator">|</span> <span class="token string">'pay'</span><span class="token punctuation">;</span></span>
<span class="line">  amount<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span></span>
<span class="line">  tag<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span></span>
<span class="line">  category<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">BillsAPI</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> baseUrl<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">async</span> <span class="token function">createBill</span><span class="token punctuation">(</span>bill<span class="token operator">:</span> CreateBillRequest<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>Bill<span class="token operator">></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/api/bills</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">      method<span class="token operator">:</span> <span class="token string">'POST'</span><span class="token punctuation">,</span></span>
<span class="line">      headers<span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'application/json'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      body<span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>bill<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>data<span class="token punctuation">.</span>success<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> data<span class="token punctuation">.</span>data<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">async</span> <span class="token function">getBills</span><span class="token punctuation">(</span>filters<span class="token operator">?</span><span class="token operator">:</span> BillFilters<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>BillsResponse<span class="token operator">></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> params <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>filters<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>filters<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">[</span>key<span class="token punctuation">,</span> value<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> params<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token function">String</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/api/bills?</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>params<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>data<span class="token punctuation">.</span>success<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> data<span class="token punctuation">.</span>data<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="python" tabindex="-1"><a class="header-anchor" href="#python"><span>Python</span></a></h3>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre v-pre><code class="language-python"><span class="line"><span class="token keyword">import</span> requests</span>
<span class="line"><span class="token keyword">from</span> typing <span class="token keyword">import</span> Optional<span class="token punctuation">,</span> Dict<span class="token punctuation">,</span> Any</span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">BillsAPI</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> base_url<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">        self<span class="token punctuation">.</span>base_url <span class="token operator">=</span> base_url</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">create_bill</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> description<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> bill_type<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> amount<span class="token punctuation">:</span> <span class="token builtin">float</span><span class="token punctuation">,</span> </span>
<span class="line">                   tag<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> category<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> Dict<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">,</span> Any<span class="token punctuation">]</span><span class="token punctuation">:</span></span>
<span class="line">        bill_data <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token string">'description'</span><span class="token punctuation">:</span> description<span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">'type'</span><span class="token punctuation">:</span> bill_type<span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">'amount'</span><span class="token punctuation">:</span> amount</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        </span>
<span class="line">        <span class="token keyword">if</span> tag<span class="token punctuation">:</span></span>
<span class="line">            bill_data<span class="token punctuation">[</span><span class="token string">'tag'</span><span class="token punctuation">]</span> <span class="token operator">=</span> tag</span>
<span class="line">        <span class="token keyword">if</span> category<span class="token punctuation">:</span></span>
<span class="line">            bill_data<span class="token punctuation">[</span><span class="token string">'category'</span><span class="token punctuation">]</span> <span class="token operator">=</span> category</span>
<span class="line"></span>
<span class="line">        response <span class="token operator">=</span> requests<span class="token punctuation">.</span>post<span class="token punctuation">(</span></span>
<span class="line">            <span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>base_url<span class="token punctuation">}</span></span><span class="token string">/api/bills"</span></span><span class="token punctuation">,</span></span>
<span class="line">            json<span class="token operator">=</span>bill_data</span>
<span class="line">        <span class="token punctuation">)</span></span>
<span class="line">        </span>
<span class="line">        data <span class="token operator">=</span> response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token keyword">not</span> data<span class="token punctuation">[</span><span class="token string">'success'</span><span class="token punctuation">]</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token keyword">raise</span> Exception<span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token string">'message'</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">        </span>
<span class="line">        <span class="token keyword">return</span> data<span class="token punctuation">[</span><span class="token string">'data'</span><span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">def</span> <span class="token function">get_bills</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">**</span>filters<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> Dict<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">,</span> Any<span class="token punctuation">]</span><span class="token punctuation">:</span></span>
<span class="line">        response <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span></span>
<span class="line">            <span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>base_url<span class="token punctuation">}</span></span><span class="token string">/api/bills"</span></span><span class="token punctuation">,</span></span>
<span class="line">            params<span class="token operator">=</span>filters</span>
<span class="line">        <span class="token punctuation">)</span></span>
<span class="line">        </span>
<span class="line">        data <span class="token operator">=</span> response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token keyword">not</span> data<span class="token punctuation">[</span><span class="token string">'success'</span><span class="token punctuation">]</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token keyword">raise</span> Exception<span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token string">'message'</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">        </span>
<span class="line">        <span class="token keyword">return</span> data<span class="token punctuation">[</span><span class="token string">'data'</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


