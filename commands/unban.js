const {
    MessageEmbed
} = require('discord.js');

module.exports.run = async (client, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!user) return message.channel.send("You must provide a user to unban!")

    guild.user.unban();

    message.channel.send(`Unbanned ${use.user.tag}`);
}


exports.help = {
    name: "unban",
    aliases: ["ub"],
    description: "unbans a member from the guild"
}

exports.requirements = {
    clientPerms: [],
    userPerms: ["BAN_MEMBERS", "ADMINISTRATOR"],
    ownerOnly: false
}