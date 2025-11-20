# Branch Color - Example Configurations

This file contains example configurations for the Branch Color extension.

## Basic Configuration

```json
{
  "branchColor.colors": {
    "main": "#007ACC",
    "master": "#007ACC",
    "develop": "#28a745",
    "staging": "#ffa500",
    "production": "#dc3545"
  },
  "branchColor.defaultColor": "#6c757d",
  "branchColor.usePatternMatching": true
}
```

## Advanced Configuration with Patterns

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
    "feature/*": "#6f42c1",
    "bugfix/*": "#fd7e14",
    "hotfix/*": "#dc3545",
    "release/*": "#20c997"
  },
  "branchColor.defaultColor": "#6c757d",
  "branchColor.usePatternMatching": true
}
```

## Team-Based Configuration

```json
{
  "branchColor.colors": {
    "main": "#0366d6",
    "develop": "#28a745",
    "staging": "#ffa500",
    "*/john": "#6f42c1",
    "*/jane": "#e83e8c",
    "feature/*": "#17a2b8",
    "bugfix/*": "#fd7e14"
  },
  "branchColor.defaultColor": "#6c757d",
  "branchColor.usePatternMatching": true
}
```

## Environment-Based Configuration

For teams working with multiple environments:

```json
{
  "branchColor.colors": {
    "production": "#dc3545",
    "prod": "#dc3545",
    "staging": "#ffa500",
    "uat": "#ffc107",
    "qa": "#20c997",
    "develop": "#28a745",
    "dev": "#28a745"
  },
  "branchColor.defaultColor": "#6c757d",
  "branchColor.usePatternMatching": false
}
```

## Monochrome Configuration

For users who prefer subtle differences:

```json
{
  "branchColor.colors": {
    "main": "#2c3e50",
    "master": "#2c3e50",
    "develop": "#34495e",
    "staging": "#7f8c8d",
    "production": "#1a1a1a"
  },
  "branchColor.defaultColor": "#95a5a6",
  "branchColor.usePatternMatching": true
}
```

## High Contrast Configuration

For better visibility:

```json
{
  "branchColor.colors": {
    "main": "#0000FF",
    "master": "#0000FF",
    "develop": "#00FF00",
    "staging": "#FFFF00",
    "production": "#FF0000",
    "feature/*": "#FF00FF"
  },
  "branchColor.defaultColor": "#808080",
  "branchColor.usePatternMatching": true
}
```

## Tips

1. **Color Selection**: Choose colors that are easily distinguishable
2. **Pattern Order**: More specific patterns should come before general ones
3. **Hex Colors**: Always use the `#RRGGBB` format
4. **Testing**: Test your colors by switching between branches
5. **Workspace vs User Settings**: Use workspace settings for team consistency
