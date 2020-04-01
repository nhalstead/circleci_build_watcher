const {app, BrowserWindow, Menu, Tray, nativeImage, dialog, screen, shell} = require('electron');
const {autoUpdater} = require("electron-updater");
let mainWindow, tray;

/*
 * Only allow once instance to be open at a time
 */
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on('second-instance', (event, commandLine, workingDirectory) => {
	// A new instance was attempted to be opened.
	showApp();
});

/*
 * App entry point & auto update
 */
app.on('ready', () => {
	app.setAppUserModelId('nhalstead.circleciWatcher');
	autoUpdater.checkForUpdates();
});

autoUpdater.on('update-available', () => {
	dialog.showMessageBox({
		type: 'info',
		title: 'Found Updates',
		message: 'Found updates, app installing updates and restarting automatically'
	});
});

autoUpdater.on('update-downloaded', () => {
	autoUpdater.quitAndInstall();
});

autoUpdater.on('update-not-available', () => {
	app_launch();
});

autoUpdater.on('error', () => {
	app_launch();
});

/*
 * App Window Creation Methods
 */
function app_launch() {
	createWindow();
	createTaskTray();
}

function createWindow() {
	let primaryDisplay = screen.getPrimaryDisplay();
	const height = 300;
	const width = 300;
	const gap = 32;

	mainWindow = new BrowserWindow({
		height,
		width,
		y: (primaryDisplay.size.height - height) - gap,
		x: (primaryDisplay.size.width - width) - gap,
		icon: 'src/assets/icon.png',
		show: false,
		frame: false,
		alwaysOnTop: true
	});

	mainWindow.setMenu(null);
	mainWindow.setTitle('CircleCI Build Watcher');
	mainWindow.loadURL('https://nhalstead.me/circle.test.html');

	mainWindow.on('close', function (event) {
		if (process.platform === 'win32') {
			event.preventDefault();
			mainWindow.hide();
		}
	});

	mainWindow.webContents.once('did-finish-load', () => {
		mainWindow.show();
	});

	// Force the new windows to open in the default browser.
	mainWindow.webContents.on('new-window', function(event, url){
		event.preventDefault();
		shell.openExternal(url);
	});
}


/*
 * Tray specific functions
 */
function createTaskTray() {
	try {
		const trayIcon = nativeImage.createFromPath('src/assets/icon.ico');
		tray = new Tray(trayIcon);

		tray.setToolTip('CircleCI Build Watcher');
		tray.on('click', showApp);
		tray.on('double-click', showApp);

		const contextMenu = Menu.buildFromTemplate([
			{label: 'Reload App', click: reloadApp},
			{type: 'separator'},
			{label: 'Show', click: showApp},
			{label: 'Exit', click: exitApp}
		]);
		tray.setContextMenu(contextMenu);
	} catch (e) {
		// Failed to create Tray Icon
		console.log('Failed to Create Icon', e);
	}
}

function reloadApp() {
	mainWindow.webContents.reload();
}

function showApp() {
	mainWindow.show();
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();
	}
}

function exitApp() {
	mainWindow.close();
	app.exit();
}

app.on('activate', function () {
	if (mainWindow === null) createWindow()
});