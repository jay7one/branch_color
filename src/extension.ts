import * as vscode from 'vscode';
import * as simpleGit from 'simple-git';

let updateTimeout: NodeJS.Timeout | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let originalColorCustomizations: Record<string, any> | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Branch Color extension is now active');

    // Store original color customizations for restoration on deactivate
    originalColorCustomizations = vscode.workspace.getConfiguration().get('workbench.colorCustomizations');

    // Initial update
    updateStatusBarColor();

    // Watch for git HEAD changes (branch switches)
    const gitWatcher = vscode.workspace.createFileSystemWatcher('**/.git/HEAD');
    gitWatcher.onDidChange(() => debouncedUpdate());
    gitWatcher.onDidCreate(() => debouncedUpdate());
    gitWatcher.onDidDelete(() => debouncedUpdate());

    // Watch for configuration changes
    vscode.workspace.onDidChangeConfiguration((e: vscode.ConfigurationChangeEvent) => {
        if (e.affectsConfiguration('branchColor')) {
            debouncedUpdate();
        }
    });

    // Watch for workspace folder changes
    vscode.workspace.onDidChangeWorkspaceFolders(() => debouncedUpdate());

    context.subscriptions.push(gitWatcher);
}

export function deactivate() {
    // Restore original color customizations
    if (originalColorCustomizations !== undefined) {
        vscode.workspace.getConfiguration().update(
            'workbench.colorCustomizations',
            originalColorCustomizations,
            vscode.ConfigurationTarget.Workspace
        );
    }

    // Clear any pending updates
    if (updateTimeout) {
        clearTimeout(updateTimeout);
    }
}

function debouncedUpdate() {
    if (updateTimeout) {
        clearTimeout(updateTimeout);
    }
    updateTimeout = setTimeout(() => {
        updateStatusBarColor();
    }, 300);
}

async function updateStatusBarColor() {
    try {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            console.log('No workspace folder found');
            return;
        }

        const workspacePath = workspaceFolder.uri.fsPath;
        const git = simpleGit.simpleGit(workspacePath);

        // Check if it's a git repository
        const isRepo = await git.checkIsRepo();
        if (!isRepo) {
            console.log('Not a git repository');
            return;
        }

        // Get current branch
        const branch = await git.branchLocal();
        const currentBranch = branch.current;

        if (!currentBranch) {
            console.log('No current branch');
            return;
        }

        console.log(`Current branch: ${currentBranch}`);

        // Get configuration
        const config = vscode.workspace.getConfiguration('branchColor');
        const colors: Record<string, string> = config.get('colors') || {};
        const defaultColor: string = config.get('defaultColor') || '#6c757d';
        const usePatternMatching: boolean = config.get('usePatternMatching') || true;

        // Determine the color for the current branch
        let color = defaultColor;

        // First, check for exact match
        if (colors[currentBranch]) {
            color = colors[currentBranch];
        } else if (usePatternMatching) {
            // Check for pattern matching
            for (const [pattern, patternColor] of Object.entries(colors)) {
                if (matchBranchPattern(currentBranch, pattern)) {
                    color = patternColor;
                    break;
                }
            }
        }

        console.log(`Setting status bar color to: ${color}`);

        // Apply the color to the status bar while preserving other customizations
        const existingCustomizations = vscode.workspace.getConfiguration().get('workbench.colorCustomizations') || {};
        // eslint-disable-next-line @typescript-eslint/naming-convention
        await vscode.workspace.getConfiguration().update(
            'workbench.colorCustomizations',
            {
                ...existingCustomizations,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'statusBar.background': color,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'statusBar.noFolderBackground': color,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'statusBar.debuggingBackground': color
            },
            vscode.ConfigurationTarget.Workspace
        );

    } catch (error) {
        console.error('Error updating status bar color:', error);
        vscode.window.showErrorMessage(`Branch Color: Failed to update status bar color - ${error}`);
        return;
    }
}

function matchBranchPattern(branchName: string, pattern: string): boolean {
    if (!pattern.includes('*') && !pattern.includes('?')) {
        return false; // Not a pattern
    }

    // Convert glob-like pattern to regex
    const regexPattern = pattern
        .replace(/[.+^${}()|[\]\\]/g, '\\$&') // Escape special regex chars
        .replace(/\*/g, '.*') // * matches any characters
        .replace(/\?/g, '.'); // ? matches single character

    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(branchName);
}
