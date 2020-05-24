const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
    mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.set('useFindAndModify', false);
    mongoose.connection.on('open',() => {
        console.log("mongoDb bağlandı.");
    });
    mongoose.connection.on('error', (err) => {
        console.log("mongoDb bağlanma hatası");
    })

    mongoose.Promise = global.Promise;
}
