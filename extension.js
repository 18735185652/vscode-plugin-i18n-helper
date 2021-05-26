const vscode = require('vscode');
const { Range, Position } = vscode;




const obj = {
    hello: '你好',
    world: '世界'
}

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);

    let saySample = vscode.commands.registerCommand('extension.saySample', () => {
        vscode.window.showInformationMessage('This is a new sample command!');
    });

    const hover = vscode.languages.registerHoverProvider(
        ["javascript", "javascriptreact"],
        {
            provideHover(document, position) {
                const { activeTextEditor } = vscode.window;
                if (!activeTextEditor)return;

                const { line, character } = position;
                const start = new Position(
                    line,
                    character - 50 < 0 ? 0 : character - 50
                );
                const end = new Position(line, character + 50);
                const biggerRange = new Range(start, end);
                const wordInRange = document.getText(biggerRange);
                let reg = /i18n\(['"](\w+)['"]\)/g
                let str = ''
                wordInRange.replace(reg, (...args) => {
                    console.log('args: ', args);
                    str = args[1]
                })
                if (str) {
                    console.log('str: ', str);

                    return new vscode.Hover(`${obj[str]}`);
                }
            }
        });


    context.subscriptions.push(hover, saySample);

}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}

