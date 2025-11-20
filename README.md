# Branch Color

A VS Code extension that automatically changes the status bar color based on your current Git branch. Perfect for visual differentiation between production, staging, development, and feature branches.

## Features

- 🎨 Automatically sets status bar color based on Git branch
- ⚙️ Configurable color mappings for specific branches
- 🔍 Support for pattern matching (e.g., `feature/*`)
- 🎯 Default color for unmatched branches
- 🔄 Automatic updates when switching branches

## Installation

1. Install from VS Code Marketplace (coming soon)
2. Or build from source:
   ```bash
   npm install
   npm run compile
   ```

## Configuration

Configure branch colors in your VS Code settings (`settings.json`):

```json
{
  "branchColor.colors": {
    "main": "#007ACC",
    "master": "#007ACC",
    "develop": "#28a745",
    "dev": "#28a745",
    "staging": "#ffa500",
    "production": "#dc3545",
    "prod": "#dc3545",
    "feature/*": "#6f42c1"
  },
  "branchColor.defaultColor": "#6c757d",
  "branchColor.usePatternMatching": true
}
```

### Settings

- **`branchColor.colors`**: Map of branch names/patterns to colors (hex format)
- **`branchColor.defaultColor`**: Default color for unmatched branches
- **`branchColor.usePatternMatching`**: Enable/disable pattern matching (e.g., `feature/*`)

## Usage

Once installed, the extension activates automatically:

1. Open a folder containing a Git repository
2. The status bar color will change based on your current branch
3. Switch branches - the color updates automatically
4. Customize colors in settings to match your workflow

## Color Examples

- **Production/Master**: Red (`#dc3545`) - High alert for production changes
- **Staging**: Orange (`#ffa500`) - Caution for staging environment
- **Development**: Green (`#28a745`) - Safe development work
- **Feature branches**: Purple (`#6f42c1`) - Feature development
- **Default**: Gray (`#6c757d`) - Other branches

## Development

To contribute or modify:

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch mode for development
npm run watch

# Run linter
npm run lint

# Run tests
npm test
```

## License

See [LICENSE](LICENSE) file for details.
