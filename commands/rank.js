const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const { join } = require('path');


exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const data = await client.db.get(`level-${message.guild.id}-${member.id}`);
    if(!data) return message.reply("That player doesn't have a rank yet.");

    const canvas = createCanvas(1000, 333);
    const ctx = canvas.getContext("2d");
    const background = await loadImage(join(__dirname, "..", "image", "f.jpg"));
    ctx.drawImage(background, 0,0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(180, 216, 770, 65);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeRect(180, 216, 770, 65);
    ctx.stroke();


    ctx.fillStyle = "#e67e22";
    ctx.globalAlpha = 0.6;
    ctx.fillRect(180, 216, ((100 / (data.level * 40)) * data.xp) * 7.7, 65);
    ctx.fill();
    ctx.globalAlpha = 1;


    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${data.xp} / ${data.level * 40} XP`, 600, 260);

    ctx.textAlign = "left";
    ctx.fillText(member.user.tag, 300, 120);

    ctx.font = "50px Arial";
    ctx.fillText("Level", 300, 180);
    ctx.fillText(data.level, 470, 180);

    ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    const avatar = await loadImage(member.user.displayAvatarURL({ format: "jpg" }));
    ctx.drawImage(avatar, 40, 40, 250, 250);

    const attachment = new MessageAttachment(canvas.toBuffer(), "rank.png");

    message.channel.send(`Rank card for ${member.user.tag}`, attachment);
}

exports.help = {
    name: "rank",
    aliases: ["r"],
    description: "displays a members rank"
}

exports.requirements = {
    clientPerms: [],
    userPerms: [],
    ownerOnly: false
}
