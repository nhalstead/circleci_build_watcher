const {app, BrowserWindow, Menu, Tray, nativeImage, dialog, screen, shell, Notification, ipcMain} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path')
const _ = require('lodash');
const Store = require('electron-store');
const store = new Store({
	defaults: {
		endpoints: []
	}
});
let mainWindow, tray;

// @link https://getstream.io/blog/takeaways-on-building-a-react-based-app-with-electron/

// IPC Events to Read from the Config File
ipcMain.on("get", (event, keyName) => {
	event.sender.send("config", store.get(keyName));
});

// IPC Event to open the config file
ipcMain.on("open", () => {
	console.log("Open", store.path);
	store.openInEditor();
});

/**
 * Only allow once instance to be open at a time
 */
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on('second-instance', (event, commandLine, workingDirectory) => {
	// A new instance was attempted to be opened.
	showApp();
});

/**
 * App entry point & auto update
 */
app.on('ready', () => {
	app.setAppUserModelId('nhalstead.circleciWatcher');

	createWindow();
	createTaskTray();
	createMenu();
});

function createWindow() {
	let primaryDisplay = screen.getPrimaryDisplay();
	const height = 300;
	const minHeight = 178;
	const width = 300;
	const gap = 32;

	mainWindow = new BrowserWindow({
		height,
		width,
		y: (primaryDisplay.size.height - height) - gap,
		x: (primaryDisplay.size.width - width) - gap,
		icon: path.join(__dirname, '../public/logo192.png'),
		show: false,
		frame: false,
		alwaysOnTop: true,
		webPreferences: {
			nodeIntegration: true,
			preload: __dirname + '/window-preload.js'
		}
	});

	mainWindow.setMenu(null);
	mainWindow.setTitle('CircleCI Build Watcher');

	mainWindow.loadURL(
		isDev
			? 'http://localhost:3933' // 'https://nhalstead.me/circle.test.html'
			: `file://${path.join(__dirname, '../build/index.html')}`,
	);

	if (isDev) {
		const {
			default: installExtension,
			REACT_DEVELOPER_TOOLS,
			REDUX_DEVTOOLS,
		} = require('electron-devtools-installer');

		installExtension(REACT_DEVELOPER_TOOLS)
			.then(name => {
				console.log(`Added Extension: ${name}`);
			})
			.catch(err => {
				console.log('An error occurred: ', err);
			});

		installExtension(REDUX_DEVTOOLS)
			.then(name => {
				console.log(`Added Extension: ${name}`);
			})
			.catch(err => {
				console.log('An error occurred: ', err);
			});
	}

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

	mainWindow.on('move', () => {
		mainWindow.setResizable(false);
	});

	mainWindow.on('moved', () => {
		setTimeout(() => {
			mainWindow.setResizable(true);
		}, 500);
	});

	mainWindow.on('resize', _.debounce(() => {
		let newHeight = mainWindow.getSize()[1];

		if(newHeight < minHeight) {
			newHeight = minHeight;
		}

		mainWindow.setSize(width, newHeight, true);
	}, 100));
}


/**
 * Tray specific functions
 */
function createTaskTray() {
	try {
		const trayIcon = nativeImage.createFromPath(path.join(__dirname, '../public/favicon.ico'));
		tray = new Tray(trayIcon);

		tray.setToolTip('CircleCI Build Watcher');
		tray.on('click', showApp);
		tray.on('double-click', showApp);

		const contextMenu = Menu.buildFromTemplate([
			{label: 'Reload App', click: () => {
				mainWindow.webContents.reload()
			}},
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

function createMenu () {
	const template = [
		{
			label: 'File',
			submenu: [{ role: 'about' }, { role: 'quit' }],
		},
		{
			label: 'View',
			submenu: [
				{ role: 'reload' },
				{ role: 'forcereload' },
				{ role: 'toggledevtools' },
			],
		},
		{
			role: 'help',
			submenu: [
				{
					click() {
						shell.openExternal(
							'https://github.com/nhalstead/circleci_build_watcher',
						);
					},
					label: 'File Issue on GitHub',
				},
				{
					click() {
						store.openInEditor();
					},
					label: 'Open Config File',
				},
			],
		},
	];

	Menu.setApplicationMenu(Menu.buildFromTemplate(template));
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