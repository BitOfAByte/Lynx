const discord = require('discord.js');

module.exports.run = async(client, message, args) => {
    const muteUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const muteRole = message.guild.roles.cache.find(r => r.name === 'muted');

    if(message.mentions.users.size < 1) return message.reply("You must provide a user to mute!");

    muteUser.roles.remove(muteRole);

    const b = new discord.MessageEmbed()
        .setAuthor(`${muteUser.user.tag}`)
        .addFields({
            name: `Unmuted member`,
            value: `${muteUser.user.tag}`,
            inline: true
        }, {
            name: "Unmuted by:",
            value: `${message.author.tag}`,
            inline: true
        },)
        .setThumbnail(muteUser.user.displayAvatarURL())
        .setColor("#008b8b");

        message.channel.send(b);

}

exports.help = {
    name: "unmute",
    aliases: [],
    description: "unmutes a member"
}

exports.requirements = {
    clientPerms: [],
    userPerms: ["MANAGE_ROLES", "MUTE_MEMBERS"],
    ownerOnly: false
}