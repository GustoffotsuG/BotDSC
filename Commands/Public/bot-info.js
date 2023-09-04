const { ChatInputCommandInteraction, SlashCommandBuilder, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-info')
        .setDescription(' Mira mi informacion'),
    async execute(interaction, client) {

        const invitacion = `https://discord.com/oauth2/authorize?client_id=1109957189638037534&scope=bot&permissions=1048`;

        const ram = process.memoryUsage();
        const botavatar = client.user.displayAvatarURL({ size: 1024 });

        const embed = new EmbedBuilder()
            .setTitle(`<:4765discordinfowhitetheme:1115100065141358602> - Informacion de ${client.user.username}`)
            .setThumbnail(botavatar)
            .setTimestamp()
            .addFields({
                name: '<:8299hibadge:1115100068970778734> - Creacion:',
                value: `<t:${Math.floor(client.user.createdAt.getTime() / 1000)}:d>`,
                inline: false,
            })
            .addFields({
                name: '<:9315discriminatorbadge:1115100070325538836> - Id',
                value: `\`\`\`${client.user.id}\`\`\``,
                inline: false,
            })
            .addFields({
                name: '<:1763botdeveloperbadge:1115100061655896158> - Servidores:',
                value: `\`\`\`${client.guilds.cache.size}\`\`\``,
                inline: false,
            })
            .addFields({
                name: '⚫ - Ping:',
                value: `\`\`\`${client.ws.ping}\`\`\``,
                inline: false,
            })
            .addFields({
                name: '<:ram1:1115100071709638728> - RAM:',
                value: `\`\`\`${Math.round(ram.heapUsed / 1024 / 1024)}MB\`\`\``,
                inline: false,
            })

        const botoninvitacion = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setURL(invitacion)
                .setLabel("Invitación")
                .setStyle(ButtonStyle.Link)
        );
        await interaction.reply({ embeds: [embed], components: [botoninvitacion], ephemeral: true });
    }
}