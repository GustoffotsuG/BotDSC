const {model, Schema} = require('mongoose')

const welcomeSchema = new Schema({
    guildId: {type:String, requires:true},
    channelId: {type:String, requires:true},
    message: {type:String, requires:true},
    imagenUrl: {type:String, requires:true}
})

module.exports = model('bienvenidas', welcomeSchema)