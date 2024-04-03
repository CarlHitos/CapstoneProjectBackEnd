const mongoose = require('mongoose');
const moment = require('moment');
const User = require('../models/user.model');
const Service = require('../models/service.model');
const Customer = require('../models/customer.model');
const Appointment = require('../models/appointment.model');
const { creaPass } = require('../utils/auth');
const services = require('./services.json');
const users = require('./users.json');

// Seed users (barberos)
const seedUsers = async () => {
    try {
        await User.deleteMany();
        console.log('DB cleaned (users)');

        const usersWithHashedPasswords = users.map(user => ({
            ...user,
            password: creaPass(user.password)
        }));

        const usersDb = await User.insertMany(usersWithHashedPasswords);
        console.log(`Successful DB Seed with ${usersDb.length} users!`);
    } catch (error) {
        console.log('Error seeding users:', error);
    }
};

// Seed services
const seedServices = async () => {
    try {
        await Service.deleteMany();
        console.log('DB cleaned (services)');

        const servicesDb = await Service.insertMany(services);
        console.log(`Successful DB Seed with ${servicesDb.length} services!`);
    } catch (error) {
        console.log('Error seeding services:', error);
    }
};

// Seed customers
const seedCustomers = async () => {
    try {
        await Customer.deleteMany();
        console.log('DB cleaned (customers)');

        const customers = [];
        for (let i = 0; i < 10; i++) {
            customers.push({
                customerName: `Customer ${i+1}`,
                customerEmail: `customer${i+1}@example.com`,
                customerPhone: `123456789${i}`
            });
        }

        const customersDb = await Customer.insertMany(customers);
        console.log(`Successful DB Seed with ${customersDb.length} customers!`);
    } catch (error) {
        console.log('Error seeding customers:', error);
    }
};

// Seed appointments
const seedAppointments = async () => {
    try {
        await Appointment.deleteMany();
        console.log('DB cleaned (appointments)');

        const usersDb = await User.find({ role: 'user' }); 
        const servicesDb = await Service.find();
        const customersDb = await Customer.find();

        const appointments = [];
        for (let i = 0; i < 10; i++) {
            const user = getRandomElement(usersDb);
            const service = getRandomElement(servicesDb);
            const customer = getRandomElement(customersDb);
            let dateStart = generateRandomDate();
            const dateEnd = new Date(dateStart.getTime() + service.duration * 60000);

            const userData = user;
            const appointmentDay = dateStart.toLocaleDateString('en-US', { weekday: 'long' });
            if (!userData.schedule.days.includes(appointmentDay)) {
                continue; 
            }

            const appointmentTime = moment.utc(dateStart).format('HH:mm');
            const scheduleStart = userData.schedule.hours.start;
            const scheduleEnd = userData.schedule.hours.end;

            if (moment(appointmentTime, 'HH:mm').isBefore(moment(scheduleStart, 'HH:mm')) || moment(appointmentTime, 'HH:mm').isAfter(moment(scheduleEnd, 'HH:mm'))) {
                continue; 
            }

            // Comprobar overlap
            const appointmentOverlapQuery = {
                user: user._id,
                $or: [
                    { date: { $lt: dateEnd }, dateEnd: { $gt: dateStart } }, 
                    { date: dateStart, dateEnd: dateEnd } 
                ]
            };

            const existingAppointments = await Appointment.find(appointmentOverlapQuery);

            if (existingAppointments.some(existingAppointment => isOverlap(existingAppointment, { date: dateStart, dateEnd: dateEnd }))) {
                continue; 
            }

            appointments.push({
                user: user._id,
                service: service._id,
                customer: customer.customerEmail,
                date: dateStart,
                dateEnd: dateEnd,
                status: 'pending',
                notes: ''
            });
        }

        const appointmentsDb = await Appointment.insertMany(appointments);
        console.log(`Successful DB Seed with ${appointmentsDb.length} appointments!`);
    } catch (error) {
        console.log('Error seeding appointments:', error);
    }
};


const generateRandomDate = () => {
    const today = moment.utc(); 
    const maxFutureDate = moment.utc().add(1, 'month'); 


    const randomDate = moment.utc(today).add(Math.floor(Math.random() * maxFutureDate.diff(today, 'days')), 'days');
    const randomHour = Math.floor(Math.random() * (17 - 10)) + 10;
    const randomMinute = Math.floor(Math.random() * 2) * 30;

    randomDate.set({ hour: randomHour, minute: randomMinute, second: 0, millisecond: 0 });

    return randomDate.toDate();
};


const getRandomElement = array => array[Math.floor(Math.random() * array.length)];

// Connect to BD and seed
const seedDatabase = async () => {
    const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/CapstoneProjectBackEnd";

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        await seedUsers();
        await seedServices();
        await seedCustomers();
        await seedAppointments();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

seedDatabase();
