const {ipcRenderer} = window.electron;

export const configStore = {
	// Returns a promise for the data
	get: (key) => {
		ipcRenderer.send("get", key);
		return new Promise((resolve, reject) => {
			ipcRenderer.once("config",(event, data) => {
				resolve(data);
			});
		});
	},

	open: (key, value) => {
		ipcRenderer.send("open");
	},

	set: (key, value) => {
		ipcRenderer.send("set", {key, value});
	}
};