const express = require ("express");
const path = require("path");
const ws = require("ws");

const app = express();
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

const wsServer = new ws.Server({noServer: true});
const sockets = [];
wsServer.on("connection", (socket) => {
    sockets.push(socket);
    socket.on("message", (message) => {
        for (const socket of sockets) {
            socket.send("from server: " + message)
        }
    });
});

const server = app.listen(3000, () => {
    console.log(`started on port http://localhost:${server.address().port}`);
    server.on("upgrade", (reg, res, head) => {
        wsServer.handleUpgrade(reg, res, head, (socket) => {
            wsServer.emit("connection", socket, reg);
        })
    })
});

