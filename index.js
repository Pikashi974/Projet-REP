const { app } = require("electron");
const { NewWindow } = require("./src/js/main");

require("./src/js/database");
require("electron-reload")(__dirname);

app.allowRendererProcessReuse = true;
app.whenReady().then(NewWindow);