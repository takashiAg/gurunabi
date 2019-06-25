const {app, BrowserWindow} = require('electron');

let mainWindow = null;
app.on('ready', () => {
    // mainWindowを作成（windowの大きさや、Kioskモードにするかどうかなどもここで定義できる）
    mainWindow = new BrowserWindow({width: 1200, height: 700});
    // Electronに表示するhtmlを絶対パスで指定（相対パスだと動かない）
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // ChromiumのDevツールを開く
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});

