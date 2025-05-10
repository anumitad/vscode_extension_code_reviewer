// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const provider = new MySidebarViewProvider(context);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('myView', provider)
	);

	outputChannel = vscode.window.createOutputChannel('My Python Output');

	const disposable = vscode.commands.registerCommand('cr.review', function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("No active editor - open a file to review.");
			return;
		}


		const selection = editor.selection;
		const code = editor.document.getText();
		const language = editor.document.languageId; 


		const { spawn } = require('child_process');
		const path = require('path');

		const scriptPath = path.join(__dirname, 'script.py');

		const pythonProcess = spawn('python3', [scriptPath, code, language]);

		outputChannel.appendLine(`Running Code Reviwer`);
		outputChannel.appendLine("-".repeat(80));
		outputChannel.show();

		pythonProcess.stdout.on('data', (data) => {
			outputChannel.appendLine(`Output: ${data}`);
			outputChannel.appendLine("-".repeat(80));
			outputChannel.appendLine("Code Review Complete");
			// console.log(`stdout: ${data}`);
		});

		pythonProcess.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
		});

		pythonProcess.on('close', (code) => {
			console.log(`child process exited with code ${code}`);
		});

	});

	context.subscriptions.push(disposable);
}

class MySidebarViewProvider {
	constructor(context) {
	  this._context = context;
	}
  
	resolveWebviewView(webviewView, context, token) {
		webviewView.webview.options = {
			enableScripts: true
	  	};
  
	  	webviewView.webview.html = this._getHtmlForWebview();

  
		webviewView.webview.onDidReceiveMessage((message) => {
			if (message.command === 'run_review') {
			vscode.commands.executeCommand('cr.review');
			}
		});
	}

	
  
	_getHtmlForWebview() {
	  return `
		<!DOCTYPE html>
		<html>
			<head>
			<style>
				button {
				padding: 10px 20px;
				font-size: 16px;
				border-radius: 12px; 
				border: none;
				background-color: #7303fc;  
				color: white;
				cursor: pointer;
				transition: background-color 0.3s ease;
				}
				
				button:hover {
				background-color: #a55cff;  
				}
			</style>
			</head>
			<body>
				<button onclick="vscode.postMessage({ command: 'run_review' })">
				Review code
				</button>
				<script>
				const vscode = acquireVsCodeApi();
				</script>
			</body>
		</html>
	  `;
	}
  }



function deactivate() {}

module.exports = {
	activate,
	deactivate
}
