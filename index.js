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
    const insultos = ['mierda', 'mierdas', 'mierdon', 'capullo', 'capullos', 'capullas', 'capulla', 'jilipollas', 'cabron', 'cabrón', 'cabrones', 'puta', 'putas', 'puto', 'putos', 'zorra', 'zorras', 'polla', 'pollon', 'pollón', 'pollas', 'cabronazo', 'cabronazos', 'cabrona', 'cabronas', 'jilipolleces', 'jilipollez', 'coño', 'coños', 'cojon', 'cojón', 'cojones', 'joder', 'joderia', 'jodería'];
    for (i = 0; i < insultos.length; i++) {
        if (message.content.toLowerCase().includes(insultos[i])) {
            message.channel.send({ content: `${message.author}, por favor no escribas ese tipo de groserías` })
            await message.delete()
            break
        }
    }

    //MENSAJE TROL XD
    if (message.content.includes('vaya bot')) {
        message.reply('¿Qué decis de mi? Porque siempre habláis a mi espalda ehh😡😡')
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