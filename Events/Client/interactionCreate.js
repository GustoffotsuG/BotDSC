const{Client, PermissionFlagsBits, EmbedBuilder, ChatImputCommandInteraction} = require ('discord.js')
const config = require('../../config.json')
const cooldown = new Set();

module.exports = {
    name:'interactionCreate',
    once:false,
    /**
     * 
     * @param {ChatImputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction,client){
        if(!interaction.guild || !interaction.channel) return;
        if(!interaction.isChatImputCommand) return;

        const command = client.commands.get(interaction.commanddName);
        const cooldowns = await command.Cooldown;
        if (command){
            if(!command) return interaction.reply({content:`Comando no valido`, ephemeral:true})
            if(command.Cooldown && cooldown.has(interaction.user.id)) return interaction.reply({content:`Este comando tiene un tiempo de espera. Tienes que esperar ${cooldowns / 1000} segundos para volver a usar`, ephemeral:true})
            cooldown.add(interaction.user.id);
        try{
            setTimeout(() =>{
                cooldown.delete(interaction.user.id)
            }, cooldowns);
            command.execute(interaction, client)
        }catch(error){
            return interaction.reply({content:`Ocurrió un error al tratar de realizar el comando`})
        }
        }
    }
};