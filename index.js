const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const config = require('./config.json');

const { handleErrors } = require('./Functions/antiCrash');
const { loadEvents } = require('./Functions/loadEvents');
const { loadCommands } = require('./Functions/loadCommands');

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
});

client.commands = new Collection();
client.events = new Collection();
client.setMaxListeners(0);

//Detección de mensajes
client.on('messageCreate', async (message) => {

    //SALUDO
    const saludos = ['hola', 'holita', 'holi'];
    for (i = 0; i < saludos.length; i++) {
        if (message.content.toLowerCase().includes(saludos[i])) {
            return message.reply({ content: `👋 Buenas ${message.author}, como estás?` })
            break
        }
    }

    //ELIMINACIÓN DE MALSONANTES
    const insultos = ['mierda', 'mierdas', 'mierdon', 'Mierda', 'Mierdas', 'Mierdon', 'capullo', 'capullos', 'capullas', 'capulla', 'Capullo', 'Capulla', 'Capullos', 'Capullas', 'jilipollas', 'Jilipollas', 'cabron', 'cabrón', 'cabrones', 'Cabron', 'Cabrón', 'Cabrones', 'puta', 'putas', 'puto', 'putos', 'Putas', 'Putos', 'Puta', 'Puto', 'zorra', 'zorras', 'Zorra', 'Zorras', 'polla', 'pollon', 'pollón', 'pollas', 'Polla', 'Pollon', 'Pollón', 'Pollas', 'cabronazo', 'Cabronazo', 'cabronazos', 'Cabronazos', 'cabrona', 'Cabrona', 'cabronas', 'Cabronas'];
    for (i = 0; i < insultos.length; i++) {
        if (message.content.toLowerCase().includes(insultos[i])) {
            message.channel.send({ content: `${message.author}, por favor no escribas ese tipo de groserías` })
            await message.delete()
            break
        }
    }
})

//Consola
client.login(config.token).then(async () => {
    handleErrors(client)
    await loadEvents(client)
    await loadCommands(client)
}).catch((err) => {
    console.log(err);
});