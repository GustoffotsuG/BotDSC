const {SlashCommandBuilder, EmbedBuilder, Client, chatImputcommandInteraction} = require('discord.js')
const ms = require ('ms')
module.exports = {
    Cooldown: ms('5s'),
    data: new SlashCommandBuilder()
    .setName('comandos')
    .setDescription('Aquí apareceran todos los comandos'),
    /**
     * 
     * @param {chatImputcommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        return interaction.reply({content:`Hola ${interaction.user} de momento este es el único comando, aún sigue en desarrollo`})
    }
}