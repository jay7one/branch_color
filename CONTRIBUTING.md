# Contributing to Branch Color

Thank you for your interest in contributing to Branch Color! This document provides guidelines for contributing to the project.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jay7one/branch_color.git
   cd branch_color
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile the extension**
   ```bash
   npm run compile
   ```

## Development Workflow

1. **Watch mode for active development**
   ```bash
   npm run watch
   ```
   This will automatically recompile when you make changes.

2. **Run the extension**
   - Press `F5` in VS Code to open a new Extension Development Host window
   - The extension will be loaded and active in that window
   - Make changes, reload the window (`Ctrl+R` / `Cmd+R`), and test

3. **Lint your code**
   ```bash
   npm run lint
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## Making Changes

1. **Create a new branch** for your feature or bugfix
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following these guidelines:
   - Keep changes focused and atomic
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes** thoroughly:
   - Test with different branch names
   - Test pattern matching
   - Test configuration changes
   - Test on different operating systems if possible

4. **Commit your changes** with clear commit messages:
   ```bash
   git commit -m "Add feature: brief description"
   ```

## Code Style

- Use TypeScript for all code
- Follow the existing ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for exported functions
- Keep functions small and focused

## Testing

- Write tests for new features
- Ensure all existing tests pass
- Test edge cases and error conditions
- Test with different VS Code versions if possible

## Pull Request Process

1. Update the README.md if needed
2. Update the CHANGELOG.md with your changes
3. Ensure all tests pass and code is linted
4. Create a pull request with a clear description of changes
5. Link any related issues

## Reporting Issues

When reporting issues, please include:

- VS Code version
- Extension version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Console output (Help > Toggle Developer Tools > Console)

## Feature Requests

Feature requests are welcome! Please:

- Check existing issues first
- Clearly describe the feature and its use case
- Explain why it would be useful to users
- Provide examples if possible

## Questions?

Feel free to open an issue for questions or discussions about the extension.

Thank you for contributing! 🎉
