const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('acertijo')
    .setDescription('👂 Resuelve un acertijo'),
    async execute(interaction) {

    // Los acertijos: 
    const arcetijos = {
          acertijo1: {
            pregunta: 'Soy alto cuando soy joven y bajo cuando soy viejo. ¿Qué soy?',
            respuesta: 'Una vela',
          },
          acertijo2: {
            pregunta: '¿Qué animal camina en cuatro patas por la mañana, en dos al mediodía y en tres por la tarde?',
            respuesta: 'El ser humano',
          },
          acertijo3: {
            pregunta: 'Tiene 88 teclas y no puede tocar ninguna canción. ¿Qué es?',
            respuesta: 'Un piano',
          },
          acertijo4: {
            pregunta: 'Blanco por dentro, verde por fuera. Si quieres que te lo diga, espera.',
            respuesta: 'La pera',
          },
          acertijo5: {
            pregunta: 'Sin alas vuelo, sin ojos veo, sin boca hablo. ¿Qué soy?',
            respuesta: 'El viento',
          },
          acertijo6: {
            pregunta: 'Tengo ciudades, pero no tengo casas. Tengo montañas, pero no tengo árboles. Tengo ríos, pero no tengo agua. ¿Qué soy?',
            respuesta: 'Un mapa',
          },
          acertijo7: {
            pregunta: 'Siempre se rompe al nombrarlo. ¿Qué es?',
            respuesta: 'El silencio',
          },
          acertijo8: {
            pregunta: 'Soy el principio de todo, el fin de todo y estoy presente en cada momento. ¿Qué soy?',
            respuesta: 'La letra "E"',
          },
          acertijo9: {
            pregunta: 'Si me nombras, me rompes. ¿Qué soy?',
            respuesta: 'El secreto',
          },
           acertijo10: {
            pregunta: 'Tengo llaves pero no cierro puertas, tengo espacio pero no tengo habitaciones. ¿Qué soy?',
            respuesta: 'Un teclado',
           acertijo11: {
            pregunta: 'Un hombre va al campo y solo lleva algo que no necesita. ¿Qué lleva?',
            respuesta: 'Ruido',
          },
          acertijo12: {
            pregunta: 'Si me nombras, desaparezco. ¿Qué soy?',
            respuesta: 'El silencio',
          },
          acertijo13: {
            pregunta: '¿Qué se puede encender y apagar pero no se puede tocar?',
            respuesta: 'El interruptor de la luz',
          },
          acertijo14: {
            pregunta: 'Tengo ciudades, pero no tengo casas. Tengo ríos, pero no tengo agua. ¿Qué soy?',
            respuesta: 'Un mapa',
          },
          acertijo15: {
            pregunta: 'Cuando más caliente está, más fresco se pone. ¿Qué es?',
            respuesta: 'El café',
          },
          acertijo16: {
            pregunta: 'Tiene hojas pero no es un árbol, tiene páginas pero no es un libro. ¿Qué es?',
            respuesta: 'Un calendario',
          },
          acertijo17: {
            pregunta: 'Cuanto más seca, más agua da. ¿Qué es?',
            respuesta: 'Una toalla',
          },
          acertijo18: {
            pregunta: 'Si me das de comer, viviré, pero si me das de beber, moriré. ¿Qué soy?',
            respuesta: 'El fuego',
          },
          acertijo19: {
            pregunta: 'Tiene dientes pero no puede morder. ¿Qué es?',
            respuesta: 'Un peine',
          },
          acertijo20: {
            pregunta: 'Siempre va de arriba hacia abajo, pero nunca se mueve. ¿Qué es?',
            respuesta: 'La lluvia',
          },
    },
}
        const arcertijo = Object.keys(arcetijos);
        const acertijosR = arcertijo[Math.floor(Math.random() * arcertijo.length)];
    
        const randomA = arcetijos[acertijosR].pregunta;
        const randomR = arcetijos[acertijosR].respuesta;

        
        const embed = new EmbedBuilder()
        .setTitle(' - Aqui tienes un acertijo!')
        .addFields(
         { name: '📗 - Acertijo:', value: `${randomA}`},
        )
        .setThumbnail(interaction.user.avatarURL({ dynamic: true}))
        .setColor('Random')
        .setTimestamp();

        const nt = new EmbedBuilder()
        .setTitle('Has perdido!')
        .setDescription(`Parece que fallaste! la respuesta era: **${randomR}**`)
        .setColor('Red')
        .setThumbnail(interaction.user.avatarURL({ dynamic: true}))
        .setTimestamp();

        const win = new EmbedBuilder()
        .setTitle('Has ganado!')
        .setDescription(`Felicidades! has ganado, la palabra era: **${randomR}**`)
        .setColor('Random')
        .setThumbnail(interaction.user.avatarURL({ dynamic: true}))
        .setTimestamp();

        await interaction.reply({embeds: [embed]});

        const filter = (response) => response.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter, max: 1 });

        collector.on('collect', (message) => {
          if (message.content.toLowerCase() === randomR.toLowerCase()) {
            interaction.channel.send({embeds: [win]});
          } else {
            interaction.channel.send({embeds: [nt]});
          }
    });

}
}