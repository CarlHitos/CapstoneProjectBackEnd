const User = require('../models/user.model');
const { creaPass } = require('../utils/auth');
const users = require('./users.json');

(async () => {
    const mongoose = require('mongoose');

    const MONGO_URI =
        process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/CapstoneProjectBackEnd";

    mongoose
        .connect(MONGO_URI)
        .then((x) => {
            const dbName = x.connections[0].name;
            console.log(`Connected to Mongo! Database name: "${dbName}"`);
        })
        .catch((err) => {
            console.error('Error connecting to mongo: ', err);
        });

        try {
            await User.deleteMany();
            console.log('DB cleaned');

            const usersWithHashedPasswords = users.map(user => ({
                ...user,
                password: creaPass(user.password)
            }));
    
            const usersDb = await User.insertMany(usersWithHashedPasswords);
            console.log(`Successful DB Seed with ${usersDb.length} users!`);
        } catch (error) {
            console.log('error', error);
        } finally {
            mongoose.connection.close();
        }
})();
