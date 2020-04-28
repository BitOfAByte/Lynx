const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    if (args[0] && client.commands.has(args[0])) {
        const cmd = client.commands.get(args[0]);

        const embed = new MessageEmbed()
            .setAuthor(`${cmd.help.name} | Help`, client.user.displayAvatarURL())
            .setColor(0xffffff)
            .setDescription(`**Name:** ${cmd.help.name}\n**Description:** ${cmd.help.description}`);

        message.channel.send(embed);
    }
}

exports.help = {
    name: "help",
    aliases: ["h"],
    description: "View the commands of the bot"
}

exports.requirements = {
    clientPerms: [],
    userPerms: [],
    ownerOnly: false
}


module.exports.limits = {
    cooldown: 6e4
}
