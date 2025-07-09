<template><div><h1 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference"><span>API Reference</span></a></h1>
<p>Complete reference for all No Budget API endpoints.</p>
<h2 id="base-url" tabindex="-1"><a class="header-anchor" href="#base-url"><span>Base URL</span></a></h2>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">https://your-worker.workers.dev</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Replace <code v-pre>your-worker</code> with your actual Cloudflare Worker subdomain.</p>
<h2 id="authentication" tabindex="-1"><a class="header-anchor" href="#authentication"><span>Authentication</span></a></h2>
<p>Currently, No Budget API does not require authentication. It's designed for personal use. For production deployments with multiple users, consider implementing:</p>
<ul>
<li>API key authentication</li>
<li>OAuth 2.0 integration</li>
<li>Custom middleware for access control</li>
</ul>
<h2 id="request-format" tabindex="-1"><a class="header-anchor" href="#request-format"><span>Request Format</span></a></h2>
<h3 id="content-type" tabindex="-1"><a class="header-anchor" href="#content-type"><span>Content Type</span></a></h3>
<p>All POST and PUT requests must include:</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">Content-Type: application/json</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="request-body" tabindex="-1"><a class="header-anchor" href="#request-body"><span>Request Body</span></a></h3>
<p>Request bodies should be valid JSON:</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"field"</span><span class="token operator">:</span> <span class="token string">"value"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="response-format" tabindex="-1"><a class="header-anchor" href="#response-format"><span>Response Format</span></a></h2>
<p>All API responses follow a consistent structure:</p>
<h3 id="success-response" tabindex="-1"><a class="header-anchor" href="#success-response"><span>Success Response</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"success"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// Response data</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="error-response" tabindex="-1"><a class="header-anchor" href="#error-response"><span>Error Response</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"error"</span><span class="token operator">:</span> <span class="token string">"Error Type"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Detailed error description"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="http-status-codes" tabindex="-1"><a class="header-anchor" href="#http-status-codes"><span>HTTP Status Codes</span></a></h2>
<table>
<thead>
<tr>
<th>Code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>200</td>
<td>Success</td>
</tr>
<tr>
<td>201</td>
<td>Created</td>
</tr>
<tr>
<td>400</td>
<td>Bad Request</td>
</tr>
<tr>
<td>404</td>
<td>Not Found</td>
</tr>
<tr>
<td>500</td>
<td>Internal Server Error</td>
</tr>
</tbody>
</table>
<h2 id="rate-limiting" tabindex="-1"><a class="header-anchor" href="#rate-limiting"><span>Rate Limiting</span></a></h2>
<p>Rate limiting is handled by Cloudflare:</p>
<ul>
<li><strong>Free tier</strong>: 100,000 requests per day</li>
<li><strong>Paid plans</strong>: Higher limits available</li>
</ul>
<h2 id="cors" tabindex="-1"><a class="header-anchor" href="#cors"><span>CORS</span></a></h2>
<p>All endpoints support CORS with:</p>
<ul>
<li><code v-pre>Access-Control-Allow-Origin: *</code></li>
<li><code v-pre>Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS</code></li>
<li><code v-pre>Access-Control-Allow-Headers: Content-Type, Authorization</code></li>
</ul>
<h2 id="data-types" tabindex="-1"><a class="header-anchor" href="#data-types"><span>Data Types</span></a></h2>
<h3 id="bill-object" tabindex="-1"><a class="header-anchor" href="#bill-object"><span>Bill Object</span></a></h3>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  uuid<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>           <span class="token comment">// Unique identifier (auto-generated)</span></span>
<span class="line">  description<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>    <span class="token comment">// Human-readable description</span></span>
<span class="line">  type<span class="token operator">:</span> <span class="token string">"receive"</span> <span class="token operator">|</span> <span class="token string">"pay"</span><span class="token punctuation">;</span> <span class="token comment">// Transaction type</span></span>
<span class="line">  <span class="token class-name">amount</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>         <span class="token comment">// Positive monetary value</span></span>
<span class="line">  time<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>          <span class="token comment">// ISO 8601 timestamp</span></span>
<span class="line">  tag<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>           <span class="token comment">// Custom tag</span></span>
<span class="line">  category<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>      <span class="token comment">// Category classification</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="money-values" tabindex="-1"><a class="header-anchor" href="#money-values"><span>Money Values</span></a></h3>
<ul>
<li>All amounts are positive numbers</li>
<li>No currency symbol required</li>
<li>Decimal precision supported (e.g., 4.50)</li>
</ul>
<h3 id="timestamps" tabindex="-1"><a class="header-anchor" href="#timestamps"><span>Timestamps</span></a></h3>
<ul>
<li>ISO 8601 format: <code v-pre>2025-07-09T10:30:00.000Z</code></li>
<li>UTC timezone</li>
<li>Auto-generated for new bills</li>
</ul>
<h2 id="endpoints-overview" tabindex="-1"><a class="header-anchor" href="#endpoints-overview"><span>Endpoints Overview</span></a></h2>
<table>
<thead>
<tr>
<th>Method</th>
<th>Endpoint</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td><code v-pre>/</code></td>
<td>API status</td>
</tr>
<tr>
<td>GET</td>
<td><code v-pre>/health</code></td>
<td>Health check</td>
</tr>
<tr>
<td>POST</td>
<td><code v-pre>/api/bills</code></td>
<td>Create bill</td>
</tr>
<tr>
<td>GET</td>
<td><code v-pre>/api/bills</code></td>
<td>List bills</td>
</tr>
<tr>
<td>GET</td>
<td><code v-pre>/api/bills/{uuid}</code></td>
<td>Get bill</td>
</tr>
<tr>
<td>PUT</td>
<td><code v-pre>/api/bills/{uuid}</code></td>
<td>Update bill</td>
</tr>
<tr>
<td>DELETE</td>
<td><code v-pre>/api/bills/{uuid}</code></td>
<td>Delete bill</td>
</tr>
<tr>
<td>GET</td>
<td><code v-pre>/api/stats</code></td>
<td>General statistics</td>
</tr>
<tr>
<td>GET</td>
<td><code v-pre>/api/stats/overview</code></td>
<td>Overview dashboard</td>
</tr>
<tr>
<td>GET</td>
<td><code v-pre>/api/stats/monthly</code></td>
<td>Monthly breakdown</td>
</tr>
<tr>
<td>GET</td>
<td><code v-pre>/api/stats/category</code></td>
<td>Category analysis</td>
</tr>
<tr>
<td>GET</td>
<td><code v-pre>/api/stats/trend</code></td>
<td>Trend analysis</td>
</tr>
<tr>
<td>GET</td>
<td><code v-pre>/api/tags</code></td>
<td>Get tags/categories</td>
</tr>
<tr>
<td>POST</td>
<td><code v-pre>/api/tags</code></td>
<td>Create custom tag</td>
</tr>
</tbody>
</table>
<h2 id="error-handling" tabindex="-1"><a class="header-anchor" href="#error-handling"><span>Error Handling</span></a></h2>
<h3 id="validation-errors" tabindex="-1"><a class="header-anchor" href="#validation-errors"><span>Validation Errors</span></a></h3>
<p>When request data is invalid:</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"error"</span><span class="token operator">:</span> <span class="token string">"Validation Error"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Amount must be a positive number"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="not-found-errors" tabindex="-1"><a class="header-anchor" href="#not-found-errors"><span>Not Found Errors</span></a></h3>
<p>When a resource doesn't exist:</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"error"</span><span class="token operator">:</span> <span class="token string">"Not Found"</span><span class="token punctuation">,</span> </span>
<span class="line">  <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"No bill found with UUID: 550e8400-e29b-41d4-a716-446655440000"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="server-errors" tabindex="-1"><a class="header-anchor" href="#server-errors"><span>Server Errors</span></a></h3>
<p>When an unexpected error occurs:</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"error"</span><span class="token operator">:</span> <span class="token string">"Internal Server Error"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"An unexpected error occurred"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pagination" tabindex="-1"><a class="header-anchor" href="#pagination"><span>Pagination</span></a></h2>
<p>List endpoints support pagination:</p>
<h3 id="query-parameters" tabindex="-1"><a class="header-anchor" href="#query-parameters"><span>Query Parameters</span></a></h3>
<ul>
<li><code v-pre>limit</code>: Number of results per page (default: 50, max: 100)</li>
<li><code v-pre>offset</code>: Number of results to skip (default: 0)</li>
</ul>
<h3 id="response-format-1" tabindex="-1"><a class="header-anchor" href="#response-format-1"><span>Response Format</span></a></h3>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code class="language-json"><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"success"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">"bills"</span><span class="token operator">:</span> <span class="token punctuation">[</span>...<span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"total"</span><span class="token operator">:</span> <span class="token number">150</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"offset"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token property">"limit"</span><span class="token operator">:</span> <span class="token number">50</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"timestamp"</span><span class="token operator">:</span> <span class="token string">"2025-07-09T10:30:00.000Z"</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="filtering" tabindex="-1"><a class="header-anchor" href="#filtering"><span>Filtering</span></a></h2>
<p>The <code v-pre>/api/bills</code> endpoint supports advanced filtering:</p>
<h3 id="query-parameters-1" tabindex="-1"><a class="header-anchor" href="#query-parameters-1"><span>Query Parameters</span></a></h3>
<ul>
<li><code v-pre>type</code>: Filter by &quot;receive&quot; or &quot;pay&quot;</li>
<li><code v-pre>tag</code>: Filter by tag</li>
<li><code v-pre>category</code>: Filter by category</li>
<li><code v-pre>start_date</code>: Start date (ISO format)</li>
<li><code v-pre>end_date</code>: End date (ISO format)</li>
<li><code v-pre>min_amount</code>: Minimum amount</li>
<li><code v-pre>max_amount</code>: Maximum amount</li>
</ul>
<h3 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line">GET /api/bills?type<span class="token operator">=</span>pay<span class="token operator">&amp;</span><span class="token assign-left variable">category</span><span class="token operator">=</span>dining<span class="token operator">&amp;</span><span class="token assign-left variable">start_date</span><span class="token operator">=</span><span class="token number">2025</span>-01-01<span class="token operator">&amp;</span><span class="token assign-left variable">limit</span><span class="token operator">=</span><span class="token number">20</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="field-validation" tabindex="-1"><a class="header-anchor" href="#field-validation"><span>Field Validation</span></a></h2>
<h3 id="required-fields-post-api-bills" tabindex="-1"><a class="header-anchor" href="#required-fields-post-api-bills"><span>Required Fields (POST /api/bills)</span></a></h3>
<ul>
<li><code v-pre>description</code>: 1-200 characters</li>
<li><code v-pre>type</code>: Must be &quot;receive&quot; or &quot;pay&quot;</li>
<li><code v-pre>amount</code>: Positive number</li>
</ul>
<h3 id="optional-fields" tabindex="-1"><a class="header-anchor" href="#optional-fields"><span>Optional Fields</span></a></h3>
<ul>
<li><code v-pre>tag</code>: 1-50 characters (default: &quot;general&quot;)</li>
<li><code v-pre>category</code>: 1-50 characters (default: &quot;other&quot;)</li>
</ul>
<h3 id="auto-generated-fields" tabindex="-1"><a class="header-anchor" href="#auto-generated-fields"><span>Auto-Generated Fields</span></a></h3>
<ul>
<li><code v-pre>uuid</code>: Automatically generated UUID v4</li>
<li><code v-pre>time</code>: Current timestamp in ISO format</li>
</ul>
<h2 id="best-practices" tabindex="-1"><a class="header-anchor" href="#best-practices"><span>Best Practices</span></a></h2>
<h3 id="request-guidelines" tabindex="-1"><a class="header-anchor" href="#request-guidelines"><span>Request Guidelines</span></a></h3>
<ol>
<li>Always include <code v-pre>Content-Type: application/json</code> for POST/PUT</li>
<li>Use meaningful descriptions for bills</li>
<li>Choose consistent tag and category names</li>
<li>Validate data on the client side before sending</li>
</ol>
<h3 id="performance-tips" tabindex="-1"><a class="header-anchor" href="#performance-tips"><span>Performance Tips</span></a></h3>
<ol>
<li>Use pagination for large result sets</li>
<li>Filter data server-side rather than client-side</li>
<li>Cache frequently accessed data</li>
<li>Use appropriate HTTP methods (GET for reading, POST for creating)</li>
</ol>
<h3 id="security-considerations" tabindex="-1"><a class="header-anchor" href="#security-considerations"><span>Security Considerations</span></a></h3>
<ol>
<li>Don't include sensitive information in bill descriptions</li>
<li>Validate all user input</li>
<li>Use HTTPS for all API calls</li>
<li>Consider implementing authentication for production use</li>
</ol>
<h2 id="sdk-and-libraries" tabindex="-1"><a class="header-anchor" href="#sdk-and-libraries"><span>SDK and Libraries</span></a></h2>
<p>Currently, no official SDKs are available, but the API is designed to be easily consumed by any HTTP client:</p>
<h3 id="javascript-node-js" tabindex="-1"><a class="header-anchor" href="#javascript-node-js"><span>JavaScript/Node.js</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line"><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'https://your-worker.workers.dev/api/bills'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'POST'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-property property">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'application/json'</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">'Coffee purchase'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'pay'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">4.50</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">'food'</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">category</span><span class="token operator">:</span> <span class="token string">'dining'</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="python" tabindex="-1"><a class="header-anchor" href="#python"><span>Python</span></a></h3>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre v-pre><code class="language-python"><span class="line"><span class="token keyword">import</span> requests</span>
<span class="line"></span>
<span class="line">response <span class="token operator">=</span> requests<span class="token punctuation">.</span>post<span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">'https://your-worker.workers.dev/api/bills'</span><span class="token punctuation">,</span></span>
<span class="line">    json<span class="token operator">=</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token string">'description'</span><span class="token punctuation">:</span> <span class="token string">'Coffee purchase'</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">'type'</span><span class="token punctuation">:</span> <span class="token string">'pay'</span><span class="token punctuation">,</span> </span>
<span class="line">        <span class="token string">'amount'</span><span class="token punctuation">:</span> <span class="token number">4.50</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">'tag'</span><span class="token punctuation">:</span> <span class="token string">'food'</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">'category'</span><span class="token punctuation">:</span> <span class="token string">'dining'</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">data <span class="token operator">=</span> response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="curl" tabindex="-1"><a class="header-anchor" href="#curl"><span>cURL</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code class="language-bash"><span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST https://your-worker.workers.dev/api/bills <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token punctuation">\</span></span>
<span class="line">  <span class="token parameter variable">-d</span> <span class="token string">'{</span>
<span class="line">    "description": "Coffee purchase",</span>
<span class="line">    "type": "pay",</span>
<span class="line">    "amount": 4.50,</span>
<span class="line">    "tag": "food", </span>
<span class="line">    "category": "dining"</span>
<span class="line">  }'</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="next-steps" tabindex="-1"><a class="header-anchor" href="#next-steps"><span>Next Steps</span></a></h2>
<ul>
<li><a href="/api/bills.html" target="_blank" rel="noopener noreferrer">Bills API</a> - Detailed bills endpoint documentation</li>
<li><a href="/api/statistics.html" target="_blank" rel="noopener noreferrer">Statistics API</a> - Analytics and reporting endpoints</li>
<li><a href="/examples/" target="_blank" rel="noopener noreferrer">Examples</a> - Practical usage examples</li>
</ul>
</div></template>


