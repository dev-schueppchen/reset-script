const Discord = require('discord.js');

const CONFIG = require('./conf.json');
const CMDCHAN = '533755217305403435';
const GUILDID = '533750114183807008'; // '307084334198816769';
const EXECUTOR = '221905671296253953';

const ROLES = [
    {
        name: "Founder",
        color: 0xFF9800,
        permissions: 0,
        hoist: false,
        mentionable: false,
    },
    {
        name: "Admin",
        color: 0x4FC3F7, 
        permissions: 8,
        hoist: true,
        mentionable: true,
    },
    {
        name: "Moderator",
        color: 0xE91E63,
        permissions: 1841307776,
        hoist: true,
        mentionable: true,
    },
    {
        name: "User-Bot",
        color: 0x476431, 
        permissions: 0,
        hoist: true,
        mentionable: false,
    },
    {
        name: "Bot",
        color: 0x4CAF50, 
        permissions: 0,
        hoist: true,
        mentionable: false,
    },
    {
        name: "Supporter",
        color: 0xCDDC39,
        permissions: 0,
        hoist: true,
        mentionable: false,
    }, 
    {
        name: "supp-js",
        color: null,
        permissions: 0,
        hoist: false,
        mentionable: true,
    },
    {
        name: "supp-java",
        color: null,
        permissions: 0,
        hoist: false,
        mentionable: true,
    },
    {
        name: "supp-python",
        color: null,
        permissions: 0,
        hoist: false,
        mentionable: true,
    },
    {
        name: "supp-go",
        color: null,
        permissions: 0,
        hoist: false,
        mentionable: true,
    },
    {
        name: "supp-cpp",
        color: null,
        permissions: 0,
        hoist: false,
        mentionable: true,
    },
    {
        name: "supp-webdev",
        color: null,
        permissions: 0,
        hoist: false,
        mentionable: true,
    },
    {
        name: "Notify",
        color: null,
        permissions: 0,
        hoist: false,
        mentionable: false,
    },
];

const CATEGORIES = [
    {
        name: "staff",
        type: "text",
        channels: [
            "admin",
            "mods",
            "staff-only",
            "join-log",
        ],
    },
    {
        name: "blackboard",
        type: "text",
        channels: [
            "dev-blackboard",
            "etc-blackboard",
            "modlog",
            "notifications",
            "community-git",
            "starboard",
            "suggestions",
            "hacktoberfest",
        ],
    },
    {
        name: "Software",
        type: "text",
        channels: [
            "devtalk",
            "desktops",
            "------------",
            "jvm-langs",
            "python",
            "c-cpp",
            "js",
            "go",
            "webdev",
            "rust",
            "etc",
            "code-reviews",
        ],
    },
    {
        name: "off-topic",
        type: "text",
        channels: [
            "general",
            "trash",
            "memes",
            "media",
            "hall-of-shame",
            "commands",
            "nsfw",
        ],
    },
    {
        name: "hardware",
        type: "text",
        channels: [
            "techtalk",
            "server",
            "netzwerke",
        ],
    },
    {
        name: "voice channels",
        type: "voice",
        channels: [
            "Staff",
            "Support",
            "Talk",
            "Private", // For 2 Persons
        ],
    }
];

var client = new Discord.Client();
var guild;

client.on('ready', () => {
    guild = client.guilds.get(GUILDID);
    console.log('ready');
});

client.on('message', (msg) => {
    if (msg.author.id != EXECUTOR)
        return;

    switch (msg.content) {
        case "setup-1":
            console.log('deleting channels and roles');
            guild.channels
                .filter((c) => c.id != CMDCHAN)
                .forEach((c) => c.delete()
                    .catch(console.log));
            guild.roles.forEach((r) => r.delete()
                .catch(console.log));
            break;
        case "setup-2":
            console.log('setting up new channels and roles');
            ROLES.forEach((r) => guild.createRole(r));
            CATEGORIES.forEach((category) => {
                guild.createChannel(category.name, 'category').then((cat) => {
                    category.channels.forEach((chan) => {
                        guild.createChannel(chan, category.type).then((chan) => {
                            chan.setParent(cat).catch(console.log);
                        }).catch(console.log);
                    });
                }).catch(console.log);
            });
            break;
    }
});

client.login(CONFIG.token);