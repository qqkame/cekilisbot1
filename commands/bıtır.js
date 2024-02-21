const ms = require('ms');

module.exports = {
    name: "çekiliş-bitir",
    description: 'Çekilişi Sonlandırır.',
    type: 1,
    options: [
        {
            name: 'çekiliş',
            description: 'Sonlanıcak çekilişinin Mesaj IDsini giriniz',
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
                content: '`'+ query + '` adında bir çekiliş bulamadım.',
                ephemeral: true
            });
        }
        if (giveaway.ended) {
            return interaction.reply({
                content: 'Bu çekiliş zaten sonlanmış.',
                ephemeral: true
            });
        }
        client.giveawaysManager.end(giveaway.messageId)
        .then(() => {
            interaction.reply('Çekiliş Sonlandırıldı!');
        })
        .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true
            });
        });

    }
};
