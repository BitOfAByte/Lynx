const discord = require('discord.js');

exports.run = (client, message) => {
    
    const msg = client.snipes.get(message.channel.id);
    if (!msg) return message.reply("No deleted messages");

    const embed = new discord.MessageEmbed()
        .setAuthor(`Deleted by ${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(msg.content);

    if(msg.image) embed.setImage(msg.image);
    
    message.channel.send(embed);
}

exports.help = {
    name: "snipe",
    aliases: ["sn"],
    description: "snipes a deleted message"
}

exports.requirements = {
    clientPerms: [],
    userPerms: [],
    ownerOnly: false
}

exports.limits = {
    ratelimit: 2,
    cooldown: 1e4
}