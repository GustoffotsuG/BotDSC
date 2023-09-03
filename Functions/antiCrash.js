const { WebhookClient, EmbedBuilder } = require('discord.js');
const config = require('../config.json')
module.exports = {
  handleErrors: (client) => {
    const webhookClient = new WebhookClient({ url: config.webHookErrorUrl });

    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);

      const embed = new EmbedBuilder()
        .setTitle('Uncaught Exception')
        .setDescription(`\`\`\`${err.stack || err}\`\`\``)
        .setColor('Red');

      webhookClient.send({ embeds: [embed] });

      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);

      const embed = new EmbedBuilder()
        .setTitle('Unhandled Rejection')
        .setDescription(`Promise: \`\`\`${promise}\`\`\`\nReason: \`\`\`${reason}\`\`\``)
        .setColor('Red');

      webhookClient.send({ embeds: [embed] });
    });

    process.on('warning', (warning) => {

      const embed = new EmbedBuilder()
        .setTitle('Warning')
        .setDescription(`\`\`\`${warning.stack || warning}\`\`\``)
        .setColor('Yellow');

      webhookClient.send({ embeds: [embed] });
    });

    client.on('rateLimit', (rateLimitInfo) => {
      console.warn('Rate Limit:', rateLimitInfo);

      const embed = new EmbedBuilder()
        .setTitle('Rate Limit')
        .setDescription(`\`\`\`${JSON.stringify(rateLimitInfo)}\`\`\``)
        .setColor('Yellow');

      webhookClient.send({ embeds: [embed] });
    });

    client.on('error', (error) => {
      console.error('Discord.js Error:', error);

      const embed = new EmbedBuilder()
        .setTitle('Discord.js Error')
        .setDescription(`\`\`\`${error.stack || error}\`\`\``)
        .setColor('Red');

      webhookClient.send({ embeds: [embed] });
    });
  },
};