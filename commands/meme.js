const discord = require('discord.js');
const randomPuppy = require('random-puppy');

exports.run = async (client, message) => {
    let reddit = [
        "meme",
        "animemes",
        "MemesOfAnime",
        "animememes",
        "AnimeFunny",
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "MemeEconomy",
        "techsupportanimals",
        "meirl",
        "me_irl",
        "2meirl4meirl",
        "AdviceAnimals"
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    randomPuppy(subreddit).then(async url => {
        await message.channel.send({
            files: [{
                attachment: url,
                name: 'meme.png'
            }]
        })
    })
}

exports.help = {
    name: "meme",
    aliases: ["m"],
    description: "sends memes"
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