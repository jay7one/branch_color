# Installation Guide

This guide explains how to install and use the Branch Color extension.

## Option 1: Install from Marketplace (Coming Soon)

Once published, you can install directly from the VS Code Marketplace:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Branch Color"
4. Click "Install"

## Option 2: Install from VSIX File

To install the pre-packaged extension:

1. Download the `branch-color-0.0.1.vsix` file
2. Open VS Code
3. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
4. Click the "..." menu at the top of the Extensions panel
5. Select "Install from VSIX..."
6. Navigate to the downloaded .vsix file and select it
7. Reload VS Code when prompted

## Option 3: Build from Source

To build and install from source:

```bash
# Clone the repository
git clone https://github.com/jay7one/branch_color.git
cd branch_color

# Install dependencies
npm install

# Compile the extension
npm run compile

# Package the extension
npm run package

# Install the generated .vsix file
code --install-extension branch-color-0.0.1.vsix
```

## First-Time Setup

After installation:

1. **Open a Git repository** in VS Code
2. The extension will activate automatically
3. The status bar color will change based on your current branch

## Configuration

Configure the extension by adding settings to your `settings.json`:

### User Settings (Global)

Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac), type "Preferences: Open User Settings (JSON)", and add:

```json
{
  "branchColor.colors": {
    "main": "#007ACC",
    "master": "#007ACC",
    "develop": "#28a745",
    "staging": "#ffa500",
    "production": "#dc3545",
    "feature/*": "#6f42c1"
  },
  "branchColor.defaultColor": "#6c757d",
  "branchColor.usePatternMatching": true
}
```

### Workspace Settings (Project-Specific)

For project-specific settings, create or edit `.vscode/settings.json` in your project:

```json
{
  "branchColor.colors": {
    "main": "#007ACC",
    "develop": "#28a745",
    "staging": "#ffa500"
  }
}
```

## Verification

To verify the extension is working:

1. Open the Output panel (View > Output)
2. Select "Branch Color" from the dropdown
3. You should see messages about the current branch and color being set
4. Switch branches and observe the status bar color change

## Troubleshooting

### Extension Not Activating

- Ensure you have a Git repository open
- Check the Output panel for error messages
- Try reloading VS Code (Ctrl+R / Cmd+R)

### Colors Not Changing

- Verify your configuration in settings.json
- Check that branch names match your configuration
- Ensure `branchColor.usePatternMatching` is `true` if using patterns

### Conflicts with Other Extensions

- Other extensions that customize the status bar may conflict
- Check `workbench.colorCustomizations` in your settings
- Try disabling other theme/color extensions temporarily

## Uninstalling

To uninstall:

1. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
2. Find "Branch Color" in the list
3. Click "Uninstall"
4. Reload VS Code

Your status bar will return to the default color.

## Getting Help

- Check the [README](README.md) for features and examples
- See [EXAMPLES.md](EXAMPLES.md) for configuration examples
- Report issues on [GitHub](https://github.com/jay7one/branch_color/issues)

Enjoy using Branch Color! 🎨
