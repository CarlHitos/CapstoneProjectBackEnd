const Service = require('../models/service.model');
const services = require('../bin/services.json');

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
        await Service.deleteMany();
        console.log('DB cleaned');

        const modelAdaptedServices = services.map(
            ({
                name,
                price, 
                duration, 
                description 
            }) => {
                return {
                    name,
                    price,
                    duration,
                    description
                };
            }
        );

        const servicesDb = await Service.insertMany(modelAdaptedServices);
        console.log(`Successful DB Seed with services ${servicesDb}!`);
    } catch (error) {
        console.log('error', error);
    } finally {
        mongoose.connection.close();
    }
})();
