# Contributing to ShopHub

Thank you for your interest in contributing to ShopHub! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs
- Use GitHub Issues to report bugs
- Include detailed steps to reproduce
- Provide screenshots if applicable
- Mention your environment (OS, browser, versions)

### Suggesting Features
- Open a GitHub Issue with the "enhancement" label
- Describe the feature and its benefits
- Provide examples or mockups if possible

### Code Contributions

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/shophub.git
   cd shophub
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow the existing code style
   - Write clear commit messages
   - Add tests for new features
   - Update documentation

4. **Test Your Changes**
   ```bash
   # Frontend
   npm run lint
   npm run test
   
   # Backend
   cd backend
   mvn test
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to GitHub and create a PR
   - Describe your changes
   - Link related issues
   - Wait for review

## Code Style

### Frontend (TypeScript/React)
- Use TypeScript for type safety
- Follow ESLint rules
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable names

### Backend (Java/Spring Boot)
- Follow Java naming conventions
- Use Spring Boot best practices
- Write unit tests for services
- Document complex logic
- Handle exceptions properly

## Commit Message Format

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Example:
```
feat(cart): add quantity update functionality

- Added increment/decrement buttons
- Updated cart total calculation
- Added loading states

Closes #123
```

## Questions?

Feel free to ask questions in:
- GitHub Discussions
- Discord community
- Email: dev@shophub.com

Thank you for contributing! 🎉
