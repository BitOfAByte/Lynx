const { token, prefix } = require("./config");
const { Client, Collection } = require("discord.js");
const { VultrexDB } = require('vultrex.db');

const client = new Client({
    disableMentions: "everyone"
});

const db = new VultrexDB({
    provider: "sqlite",
    table: "main",
    fileName: "main"
});

db.connect().then(async () => {
    client.prefix = prefix;
    client.db = db;
    client.commands = new Collection();
    client.aliases = new Collection();

    client.limits = new Map();
    client.snipes = new Map();
    client.blacklist = db.get("blacklist", []);


    require("./structures/command").run(client);
    require("./structures/events").run(client);

    client.login(token);
})