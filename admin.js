var admin = require("firebase-admin");

var serviceAccount = require("./adminkey/f1-list-firebase-adminsdk-pi4mz-cbb90ed70a.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;