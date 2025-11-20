# Changelog

All notable changes to the "branch-color" extension will be documented in this file.

## [0.0.1] - Initial Release

### Added
- Automatic status bar color changes based on Git branch
- Configurable color mappings for specific branches
- Pattern matching support for branch names (e.g., `feature/*`, `bugfix/*`)
- Default color for unmatched branches
- Auto-updates when switching branches
- File system watcher to detect Git changes
- Configuration change listener to update colors dynamically
- Comprehensive documentation and examples

### Features
- **Branch Detection**: Uses simple-git library for reliable Git operations
- **Color Customization**: Full control over branch-to-color mappings
- **Pattern Matching**: Supports glob-like patterns with wildcards
- **Real-time Updates**: Automatically updates when you switch branches
- **Workspace-scoped**: Colors are applied per workspace

### Configuration Options
- `branchColor.colors`: Map of branch names/patterns to hex colors
- `branchColor.defaultColor`: Default color for unmatched branches  
- `branchColor.usePatternMatching`: Enable/disable pattern matching

### Default Color Scheme
- Production/Master branches: Blue (`#007ACC`)
- Development branches: Green (`#28a745`)
- Staging branches: Orange (`#ffa500`)
- Production branches: Red (`#dc3545`)
- Other branches: Gray (`#6c757d`)
