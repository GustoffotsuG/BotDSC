const { SlashCommandBuilder, EmbedBuilder, Client, ChannelType, chatImputcommandInteraction } = require('discord.js')
const welcomeSchema = require('../../Models/welcomeSchema')
module.exports = {
    Cooldown: false,
    data: new SlashCommandBuilder()
        .setName('sistema-bienvenida')
        .setDescription('Crea un sistema de bienvenida automáctico')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Elige el canal donde se mostrará el mensaje')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('Escribe el mensaje de bienvenida automática')
                .setMinLength(1)
                .setMaxLength(3000)
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('imagen')
                .setDescription('Agrega la imagen que saldrá en el mensaje embed')
                .setMinLength(1)
                .setRequired(true)
        ),
    /**
     * 
     * @param {chatImputcommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const canal = interaction.options.getChannel('canal');
        const mensaje = interaction.options.getString('mensaje').replace(/,/g, "\n");
        const imagen = interaction.option.getString('imagen');

        const welcomeData = await welcomeSchema.findOne({ guildId: interaction.guild.id });

        if (!welcomeData) {
            await welcomeSchema.create({
                guildId: interaction.guild.id,
                channelId: canal.id,
                message: mensaje,
                imagenUrl: imagen,
            })

            return interaction.reply({ content: 'Se creo correctamente el sistema de bienvenidas', ephemeral: true })
        } else {
            await welcomeSchema.findOneAndUpdate({
                guild: interaction.guild.id
            }, {
                guildId: interaction.guild.id,
                channelId: canal.id,
                message: mensaje,
                imagenUrl: imagen,
            })

            return interaction.reply({ content: 'Se actualizó correctamente el sistema de bienvenidas', ephemeral: true })
        }
    }
};