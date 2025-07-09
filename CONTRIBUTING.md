# Contributing to No Budget API

Thank you for your interest in contributing to No Budget API! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Cloudflare account (for deployment)
- Basic knowledge of JavaScript and REST APIs

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/no-budget.git
   cd no-budget
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Cloudflare Workers**
   ```bash
   npx wrangler login
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style

- Use ES2022+ JavaScript features
- Follow consistent indentation (2 spaces)
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### API Design Principles

- Follow REST conventions
- Use consistent JSON response format
- Include proper HTTP status codes
- Provide clear error messages
- Support pagination for list endpoints
- Use ISO 8601 timestamps

### Testing

- Test all API endpoints manually
- Verify error handling
- Check edge cases
- Test with different data scenarios

## Submitting Changes

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, concise commit messages
   - Keep commits focused and atomic
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run dev
   # Test all affected endpoints
   ```

4. **Submit pull request**
   - Provide clear description of changes
   - Reference any related issues
   - Include examples if adding new features

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions or modifications
- `chore`: Maintenance tasks

Examples:
```
feat(api): add monthly statistics endpoint

fix(bills): handle missing category field gracefully

docs(readme): update API examples
```

## Feature Requests

When requesting new features:

1. Check existing issues first
2. Provide clear use case
3. Include example API calls
4. Consider backwards compatibility

## Bug Reports

When reporting bugs:

1. Use the issue template
2. Provide reproduction steps
3. Include error messages
4. Specify environment details

## API Documentation

When adding new endpoints:

1. Update README.md with examples
2. Include request/response schemas
3. Document query parameters
4. Add error scenarios

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release tag
4. Deploy to production

## Questions?

- Open an issue for questions
- Check existing documentation
- Review code examples

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
