exports.run = async (client, message, args) => {
    const args2 = message.content.split(' ').slice(1);
    const amount = args2.join(' ');

    if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!');
    if (isNaN(amount)) return message.reply('The amount parameter isn`t a number!');

    if (amount > 100) return message.reply('You can`t delete more than 100 messages at once!');
    if (amount < 1) return message.reply('You have to delete at least 1 message!');

    await message.channel.messages.fetch({
        limit: amount
    }).then(messages => {
        message.channel.bulkDelete(messages)
    });
}


exports.help = {
    name: "clear",
    aliases: ["c"],
    description: "Deletes x number of messages"
}

exports.requirements = {
    clientPerms: [],
    userPerms: ["MANAGE_MESSAGES"],
    ownerOnly: false
}