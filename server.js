const liveServer = require('live-server');
const openfinConfigBuilder = require('openfin-config-builder');
const openfinLauncher = require('openfin-launcher');
const path = require('path');

let target;
const configPath = path.resolve('public/app.json');
const serverParams = {
    root: path.resolve('public'),
    open: false,
    logLevel: 2,
    port: 8081
};

//Update our config and launch openfin.
function launchOpenFin() {
    openfinConfigBuilder.update({
        startup_app: {
            url: target + '/index.html',
            applicationIcon: target + '/favicon.ico',
            saveWindowState: true,
            defaultWidth: 800,
            maxWidth: 800,
            minWidth: 800,
            maxHeight: 500,
            defaultHeight: 500,
            minHeight: 500,
            defaultTop: 50,
            defaultLeft: 10,
        },
        runtime: {
            arguments: '--remote-debugging-port=9090 --v=1 --enable-logging --debug',
            version: 'community'
        },
        shortcut: {
            icon: target + '/favicon.ico'
        }
    }, configPath)
        .then(openfinLauncher.launchOpenFin({ configPath: configPath }))
        .catch(err => console.log(err));
}


//Start the server server and launch our app.
liveServer.start(serverParams).on('listening', () => {
    const { address, port } = liveServer.server.address();
    target = `http://localhost:${ port }`;
    launchOpenFin();
});
