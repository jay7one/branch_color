import * as vscode from 'vscode';
import * as simpleGit from 'simple-git';

export function activate(context: vscode.ExtensionContext) {
    console.log('Branch Color extension is now active');

    // Initial update
    updateStatusBarColor();

    // Watch for git changes
    const gitWatcher = vscode.workspace.createFileSystemWatcher('**/.git/**');
    gitWatcher.onDidChange(() => updateStatusBarColor());
    gitWatcher.onDidCreate(() => updateStatusBarColor());
    gitWatcher.onDidDelete(() => updateStatusBarColor());

    // Watch for configuration changes
    vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('branchColor')) {
            updateStatusBarColor();
        }
    });

    // Watch for workspace folder changes
    vscode.workspace.onDidChangeWorkspaceFolders(() => updateStatusBarColor());

    context.subscriptions.push(gitWatcher);
}

export function deactivate() {
    // Cleanup if needed
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

        // Apply the color to the status bar
        // eslint-disable-next-line @typescript-eslint/naming-convention
        await vscode.workspace.getConfiguration().update(
            'workbench.colorCustomizations',
            {
                'statusBar.background': color,
                'statusBar.noFolderBackground': color,
                'statusBar.debuggingBackground': color
            },
            vscode.ConfigurationTarget.Workspace
        );

    } catch (error) {
        console.error('Error updating status bar color:', error);
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
