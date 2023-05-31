const sftpClient = require('ssh2-sftp-client');
const { FTP } = require("./config.json");


const ConnectFTP = async (onClientConnecCallback, onFailerCallback) => {
    let client = new sftpClient();
    try {
        await client.connect(FTP)
        await onClientConnecCallback(client);
    }
    catch(err) {
        onFailerCallback != null ? onFailerCallback(err) : console.log(err);
    }
}

module.exports = {
    ConnectFTP
}

