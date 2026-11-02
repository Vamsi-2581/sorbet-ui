# 🌞 Contributing to Sorbet UI

Thank you for helping with Sorbet UI, a set of React components built on Material UI v7. Bug reports, tests, docs and new components are all welcome.

This document explains how to set up the repo, make a change and open a pull request.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)
- [Style Guide](#style-guide)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please read and adhere to our Code of Conduct:

- Be respectful of differing opinions, viewpoints, and experiences
- Give and gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the maintainers. All complaints will be reviewed and investigated.

---

## Getting Started

### Prerequisites

- **Node.js**: 22 (see `.nvmrc`)
- **pnpm**: the version pinned in `packageManager` (run `corepack enable` once and pnpm picks it up)
- **Git**

### Fork & Clone

```bash
# 1. Fork the repository on GitHub
# Visit: https://github.com/tahmidbintaslim/sorbet-ui/fork

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/sorbet-ui.git
cd sorbet-ui

# 3. Add upstream remote
git remote add upstream https://github.com/tahmidbintaslim/sorbet-ui.git

# 4. Keep your fork updated
git fetch upstream
```

---

## Development Setup

### Install Dependencies

```bash
pnpm install
```

### Build Packages

Workspace packages import each other from their `dist/` builds, so build them before running tests or Storybook:

```bash
pnpm build:packages   # tokens, theme, core, react (tsup)
pnpm build            # packages plus Storybook and the web demo
```

### Start Development

```bash
# Start Storybook only
pnpm storybook:dev

# Or Storybook and the web demo together
pnpm dev
```

Visit: **http://localhost:6006**

### Run Tests

```bash
# Unit tests in watch mode
pnpm test

# Unit tests once (what CI runs)
pnpm test:ci

# One file
pnpm vitest packages/react/src/Button.test.tsx

# Storybook tests: every story runs in headless Chromium
pnpm exec playwright install chromium   # first time only
pnpm test:storybook:ci
```

---

## Making Changes

### Create a Feature Branch

```bash
git checkout -b feat/your-feature-name

# Or for bug fixes:
git checkout -b fix/bug-description

# Or for documentation:
git checkout -b docs/what-you-improved
```

### Branch Naming Convention

- `feat/` — New feature
- `fix/` — Bug fix
- `docs/` — Documentation
- `style/` — Code style (formatting, missing semicolons, etc.)
- `refactor/` — Code refactoring without feature changes
- `perf/` — Performance improvements
- `test/` — Adding tests
- `chore/` — Maintenance, dependencies, tooling

### Make Your Changes

#### Adding a New Component

1. **Create component file**

   ```bash
   packages/react/src/MyComponent.tsx
   ```

2. **Create test file**

   ```bash
   packages/react/src/MyComponent.test.tsx
   ```

3. **Create story file**

   ```bash
   packages/react/src/MyComponent.stories.tsx
   ```

4. **Export in index**

   ```bash
   packages/react/src/index.ts
   ```

5. **Use Button as a template** — Follow the same pattern for consistency

#### Modifying Existing Code

1. Make your changes
2. Update related tests
3. Update TypeScript types if needed
4. Run tests: `pnpm test:ci`
5. Check Storybook: `pnpm storybook:dev`

#### Adding Tests

Every feature should have corresponding tests:

```typescript
// Use RTL for unit tests
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should render', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle click', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

#### Adding Stories

Create interactive stories in Storybook:

```typescript
// MyComponent.stories.tsx
import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'Atoms/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'solid',
    children: 'Click me',
  },
};

export const Interactive: Story = {
  args: {
    variant: 'solid',
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};
```

---

## Commit Guidelines

### Conventional Commits

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` — A new feature
- `fix` — A bug fix
- `docs` — Documentation only changes
- `style` — Changes that do not affect the meaning of the code
- `refactor` — A code change that neither fixes a bug nor adds a feature
- `perf` — A code change that improves performance
- `test` — Adding missing tests
- `chore` — Changes to build process, dependencies, tooling, etc.

### Examples

```bash
git commit -m "feat(button): add loading state"
git commit -m "fix(checkbox): correct disabled styling"
git commit -m "docs: update component API guide"
git commit -m "test(select): add dropdown interaction tests"
```

### Writing Good Commit Messages

- Use imperative mood ("add feature" not "added feature")
- Don't capitalize first letter
- No period (.) at the end
- Limit subject to 50 characters
- Reference issues when applicable: "fixes #123"

---

## Pull Request Process

### Before Submitting

1. **Sync with main**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**

   ```bash
   pnpm test:ci
   ```

3. **Check TypeScript**

   ```bash
   pnpm type-check
   ```

4. **Lint code**

   ```bash
   pnpm lint
   ```

5. **Build packages**
   ```bash
   pnpm build
   ```

### Creating a Pull Request

1. **Push to your fork**

   ```bash
   git push origin feat/your-feature-name
   ```

2. **Create PR on GitHub**
   - Provide a clear title
   - Reference related issues: "Fixes #123"
   - Describe your changes in detail
   - Include screenshots/GIFs if UI changes

3. **PR Template**

   ```markdown
   ## Description

   Brief description of changes.

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation
   - [ ] Refactoring

   ## Related Issues

   Fixes #123

   ## Changes Made

   - Change 1
   - Change 2
   - Change 3

   ## Testing

   - [ ] Unit tests pass
   - [ ] Interaction tests pass
   - [ ] No console errors
   - [ ] Verified in Storybook

   ## Screenshots (if applicable)

   <!-- Add screenshots of UI changes -->
   ```

### Review Process

- At least one maintainer review required
- All checks must pass (tests, linting, build)
- Discussions will happen inline
- Squash and merge to main

### After Merge

Your changes ship in the next release. The maintainer versions the packages with Changesets and publishes them to npm by creating a GitHub release; a merge or push never publishes on its own.

---

## Reporting Bugs

### Before Reporting

- Check if issue already exists
- Update to latest version
- Check documentation
- Search closed issues

### Report a Bug

[Create bug report →](https://github.com/tahmidbintaslim/sorbet-ui/issues/new?template=bug_report.md)

**Include:**

- Clear, descriptive title
- Detailed description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, browser, versions)
- Code example or CodeSandbox
- Screenshots/GIFs if applicable

---

## Requesting Features

### Before Requesting

- Check if feature already requested
- Review roadmap
- Verify it aligns with project goals

### Request a Feature

[Open a feature request →](https://github.com/tahmidbintaslim/sorbet-ui/issues/new?template=feature_request.md)

**Describe:**

- What problem it solves
- How it should work
- Example usage
- Why it's important
- Alternatives considered

---

## Style Guide

### TypeScript

- Use strict mode
- Always provide types
- Avoid `any` type
- Use interfaces for props
- Export types that are used externally

```typescript
// Good
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'soft' | 'outlined';
  loading?: boolean;
}

// Avoid
interface ButtonProps {
  [key: string]: any;
}
```

### React

- Use functional components
- Use `forwardRef` for component refs
- Add `displayName`
- Use proper TypeScript props
- Prop spreading should be explicit

```typescript
// Good
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', ...rest }, ref) => (
    <MuiButton ref={ref} {...rest} />
  )
);
Button.displayName = 'Button';

// Avoid
export function Button(props: any) {
  return <button {...props} />;
}
```

### Colors

- Take variant colors from `colorScaleForMode(color, theme.palette.mode === 'dark')` in `@sorbet-ui/tokens`. Do not read `colors.<name>.main`, `.dark` or `.contrastText` directly: those are the light-theme shades, which are too dark to read on dark surfaces.
- Add a case to `packages/react/src/dark-mode.test.tsx` when a component reads `main` or `dark` in a new place.

### Testing

- Write meaningful test descriptions
- Test behavior, not implementation
- Use semantic queries (getByRole, getByLabelText)
- Cover happy path and edge cases

```typescript
// Good
it('should disable button when loading prop is true', () => {
  render(<Button loading>Submit</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
});

// Avoid
it('should work', () => {
  // ...
});
```

### Stories

- One story per key state
- Use meaningful story names
- Include play functions for interactions
- Document props with argTypes

```typescript
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  play: async ({ canvas }) => {
    expect(canvas.getByRole('button')).toBeDisabled();
  },
};
```

### Naming

- Components: PascalCase (`Button`, `TextField`)
- Files: PascalCase matching component (`Button.tsx`)
- Variables/functions: camelCase (`buttonClick`, `handleChange`)
- Constants: UPPER_SNAKE_CASE (`MAX_LENGTH`, `DEFAULT_SIZE`)

---

## Resources

- **[Storybook Docs](https://storybook.js.org/docs)** — Component documentation
- **[React Docs](https://react.dev)** — React patterns
- **[TypeScript Docs](https://www.typescriptlang.org/docs)** — Type definitions
- **[MUI Docs](https://mui.com)** — Material-UI reference
- **[Testing Library](https://testing-library.com)** — Testing patterns

---

## Questions?

- **[GitHub Issues](https://github.com/tahmidbintaslim/sorbet-ui/issues)**: questions, bugs and ideas
- **Security problems**: see [SECURITY.md](SECURITY.md) (private reporting, not issues)

---

## License

By contributing to Sorbet UI, you agree that your contributions will be licensed under its MIT License.

---

<div align="center">

**Thank you for contributing to Sorbet UI! 🌞**

Every contribution makes Sorbet UI better for everyone.

</div>
