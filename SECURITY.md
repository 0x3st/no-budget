# Security Policy

## Supported Versions

We actively support the following versions of No Budget API:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability in No Budget API, please report it to us responsibly.

### How to Report

1. **Issues**: You are welcomed to come up with an issue
2. **PR**: You could also fix the issue by yourself and submit a PR

### What to Include

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 24 hours
- **Initial Assessment**: Within 48 hours
- **Status Updates**: Every 72 hours until resolved
- **Fix Timeline**: Varies based on severity

### Security Considerations

#### Data Storage
- All data is stored in Cloudflare KV
- No sensitive financial data is logged
- UUIDs are used for bill identification

#### API Security
- Input validation on all endpoints
- Proper error handling without data exposure
- Rate limiting (handled by Cloudflare)

#### Authentication
Currently, the API is designed for personal use and does not include authentication. For production use with multiple users, consider:

- API key authentication
- OAuth 2.0 integration
- User-specific data isolation

### Best Practices for Users

1. **Deploy Securely**
   - Use environment variables for sensitive data
   - Restrict worker routes if needed
   - Monitor access logs

2. **Data Management**
   - Regularly backup your KV data
   - Be cautious with bill descriptions (avoid sensitive info)
   - Use HTTPS for all API calls

3. **Access Control**
   - Don't share your worker URL publicly
   - Consider adding custom authentication if needed
   - Monitor usage through Cloudflare dashboard

### Responsible Disclosure

We follow a responsible disclosure policy:

1. Report security issues privately first
2. Allow reasonable time for fixes
3. Coordinate public disclosure timing
4. Credit security researchers (if desired)

### Security Updates

Security updates will be:
- Released as patch versions (1.0.x)
- Documented in CHANGELOG.md
- Announced in release notes

Thank you for helping keep No Budget API secure!
