# Contributing to S-Console

Thank you for your interest in contributing to S-Console! This document provides guidelines and instructions for contributors to ensure a smooth collaboration process.

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Git** for version control
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/s-console.git
   cd s-console
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   This will start a local development server where you can test your changes.

4. **Build the project**
   ```bash
   npm run build
   ```

## 📋 Project Structure

```
s-console/
├── src/
│   ├── sconsole.ts          # Main library class
│   ├── index.ts             # Library entry point
│   ├── dev/                 # Development files
│   │   ├── index.html       # Development HTML
│   │   └── main.ts          # Development JavaScript
│   └── types/
│       └── core.ts          # TypeScript type definitions
├── dist/                    # Built files (auto-generated)
├── public/                  # Static assets
├── package.json             # Project configuration
├── tsconfig.json            # TypeScript configuration
├── uno.config.ts            # UnoCSS configuration
├── vite.config.ts           # Vite build configuration
└── README.md                # Project documentation
```

## 🎯 How to Contribute

### 1. Choose What to Work On

Check the [TODO section in README.md](./README.md#todo---roadmap--improvements) for available tasks, or:
- Browse [open issues](https://github.com/gusdeyw/s-console/issues)
- Look for issues labeled `good first issue` or `help wanted`
- Propose new features by opening an issue first

### 2. Create a Branch

```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 3. Make Your Changes

- Write clean, readable code following our coding standards
- Add comments for complex logic
- Update documentation if needed
- Test your changes thoroughly

### 4. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add command history navigation with up/down arrows"
```

#### Commit Message Guidelines

Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes  
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Reference any related issues
- Screenshots/GIFs for UI changes
- Testing instructions

## 🎨 Code Style & Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` types when possible
- Use meaningful variable and function names
- Follow existing code patterns

### Code Formatting

```typescript
// ✅ Good - descriptive names, proper typing
interface CommandOptions {
    description?: string;
    validation?: (input: string) => boolean;
    aliases?: string[];
}

public addCommand(name: string, callback: CommandCallback, options?: CommandOptions): void {
    // Implementation
}

// ❌ Avoid - unclear names, no typing
function add(n: any, c: any): any {
    // Implementation
}
```

### CSS/Styling Guidelines

- Use UnoCSS utility classes with `:uno:` prefix
- Keep styles consistent with existing theme
- Make styles responsive where applicable
- Use CSS custom properties for theme values

```html
<!-- ✅ Good - UnoCSS utilities -->
<div class=":uno: flex items-center justify-between p-4 bg-gray-800 rounded-lg">

<!-- ❌ Avoid - inline styles -->
<div style="display: flex; padding: 16px;">
```

## 🧪 Testing Guidelines

### Manual Testing

Before submitting your PR, test:
- Basic console functionality (input, output, commands)
- Your specific changes work as expected
- No regression in existing features
- Different browser compatibility (Chrome, Firefox, Safari)
- Mobile responsiveness

### Testing Checklist

- [ ] Console initializes properly
- [ ] Built-in commands work (`help`, `clear`)
- [ ] Custom commands can be added and executed
- [ ] Input handling works correctly
- [ ] Styling applies properly
- [ ] No console errors in browser dev tools
- [ ] Works with different container configurations

## 📝 Documentation

When contributing:

### Code Documentation
- Add JSDoc comments for public methods
- Document complex algorithms or business logic
- Update type definitions when changing interfaces

```typescript
/**
 * Adds a custom command to the console
 * @param name - The command name (must be unique)
 * @param callback - Function to execute when command is called
 * @param options - Optional configuration for the command
 * @example
 * ```typescript
 * console.addCommand('time', () => {
 *   console.appendToConsole(new Date().toString());
 * });
 * ```
 */
public addCommand(name: string, callback: CommandCallback, options?: CommandOptions): void {
    // Implementation
}
```

### README Updates
- Update examples if you change the API
- Add new features to the feature list
- Update installation instructions if needed

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Console error messages (if any)
- Code sample that demonstrates the issue

## 💡 Feature Requests

Before proposing new features:
- Check if it already exists in the TODO list
- Search existing issues to avoid duplicates
- Provide clear use case and benefits
- Consider backward compatibility

## 🔍 Code Review Process

### What We Look For
- Code follows project standards
- Changes are well-tested
- Documentation is updated
- No breaking changes (unless discussed)
- Performance considerations

### Review Timeline
- Initial review within 48-72 hours
- Follow-up reviews within 24 hours
- Maintainers will provide constructive feedback
- Address feedback promptly for faster merge

## 🚦 Release Process

1. **Development** → `main` branch
2. **Testing** → Automated and manual testing
3. **Documentation** → Update changelogs and docs
4. **Release** → Tagged releases with semantic versioning

## 🏷️ Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR** version for breaking changes
- **MINOR** version for new features
- **PATCH** version for bug fixes

## 📞 Getting Help

If you need help:
- Check existing [issues](https://github.com/gusdeyw/s-console/issues)
- Start a [discussion](https://github.com/gusdeyw/s-console/discussions)
- Ask in your PR if you're stuck on something specific

## 🎉 Recognition

Contributors are recognized through:
- GitHub contributors list
- Changelog acknowledgments
- Special mentions for significant contributions

## ⚖️ License

By contributing to S-Console, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

**Happy coding! 🚀**

Thank you for helping make S-Console better for everyone!