const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chistes')
        .setDescription('😂 Ríete'),
    async execute(interaction, client) {

        const dados = [
            "¿Cómo se dice pañuelo en japonés? Saka-moko.",
            "¿Cómo se dice disparo en árabe? Ahí-va-la-bala.",
            "¿Qué le dice un gusano a otro gusano? Voy a dar una vuelta a la manzana.",
            "Si se muere una pulga, ¿a dónde va? Al pulgatorio.",
            "¿Cómo se llama el primo de Bruce Lee? Broco Lee.",
            "Sí los zombies se deshacen con el paso del tiempo ¿zombiodegradables?",
            "¿Cómo se queda un mago después de comer? Magordito.",
            "Esto es un hombre que entra en un bar de pinchos y... ay, ay, ay, ay.",
            "—A mí me gustaría vivir en una isla desierta.\n —A mí también.\n—¡Joder! ¡Ya empezamos a llenarla!",
            "¿De dónde vienen los hámster? De Hamsterdam.",
            "Una familia ocupó un terreno en Hawaii. Ahora a ver quién la desaloha.",
            "¿Por qué no se puede discutir con un DJ? Porque siempre cambia de tema.",
            "—¡Me acaba de picar una serpiente!\n—¿Cobra?\n—No, gratis.",
            "—Si yo digo fui rica, es tiempo pasado, pero si digo soy hermosa, ¿qué es?\n—Exceso de imaginación.",
            "—¿Por qué Bob Esponja no va al gimnasio?\n—Porque ya está cuadrado.",
        ];

        const dadosR = dados[Math.floor(Math.random() * dados.length)];

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username} pidió un chiste`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .addFields(
                { name: '😂 - Chiste:', value: `\`\`\`${dadosR}\`\`\`` },
            )
            .setColor('Random')
            .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })
    }
}