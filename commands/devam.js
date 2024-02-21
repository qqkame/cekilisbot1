const ms = require('ms');

module.exports = {
    name: "çekiliş-devam",
    description: 'Çekilişe Devam Et',
    type: 1,
    options: [
        {
            name: 'çekiliş',
            description: 'Devam Edilecek çekilişin Ödülünü veya Mesaj IDsini giriniz',
            type: 'STRING',
            required: true
        }
    ],
    run: async (client, interaction) => {
        if(!interaction.member.permissions.has('MANAGE_MESSAGES') &&  !interaction.member.roles.cache.has(client.config.çekilişsorumlusu)){
            return interaction.reply({
                content: ':x: Çekiliş yapabilmen için MESAJLARI_YÖNET yetkisine sahip olmalısın.',
                ephemeral: true
            });
        }
        const query = interaction.options.getString('çekiliş');
        const giveaway = 
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
        if (!giveaway) {
            return interaction.reply({
                content: '`'+ query + '` Adında çekiliş bulamadım.',
                ephemeral: true
            });
        }
        if (!giveaway.pauseOptions.isPaused) {
            return interaction.reply({
                content: 'Bu çekiliş zaten devam ediyor.',
                ephemeral: true
            });
        }
        client.giveawaysManager.unpause(giveaway.messageId)
        .then(() => {
            interaction.reply('Çekiliş devam ediyor!');
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true
            });
        });
    }
};
