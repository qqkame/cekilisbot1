const { MessageEmbed,MessageButton,MessageActionRow } = require('discord.js');

module.exports = {
    description: 'Yardım Menüsü',
    run: async (client, interaction) => {
        const embed = new MessageEmbed()
        .setTitle('ThexLivery Çekiliş Botu Yardım Menüsü')
        .addField('`/çekiliş-başlat`','Çekiliş Başlatır',true)
        .addField('`/çekiliş-bitir`','Var olan çekilişi bitirir',true)
        .addField('`/drop`','drop çekiliş başlatır',true)
        .addField('`/yenile`','Sonlanmış çekilişin kazananını yeniden belirler',true)
        .addField('`/durdur`','Devam eden çekilişi durdurur',true)
        .addField('`/devam`','Durmuş çekilişi başlatır',true)
        .setThumbnail(client.user.avatarURL());
        const buton = new MessageButton().setLabel('ThexLivery').setStyle('LINK').setURL('http://youtube.com/@ThexLivery');
        const row = new MessageActionRow().addComponents(buton)
       interaction.reply({
           embeds:[embed],
           components:[row],
       })
    }
};
