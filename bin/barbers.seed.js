const Barber = require('../models/barber.model');
const barbers = require('../bin/barbers.json');

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
        await Barber.deleteMany();
        console.log('DB cleaned');

        const modelAdaptedBarbers = barbers.map(
            ({
                name,
                email,
                phone,
                schedule 
            }) => {
                return {
                    name,
                    email,
                    phone,
                    schedule 
                };
            }
        );

        const barbersDb = await Barber.insertMany(modelAdaptedBarbers);
        console.log(`Successful DB Seed with services ${barbersDb}!`);
    } catch (error) {
        console.log('error', error);
    } finally {
        mongoose.connection.close();
    }
})();
