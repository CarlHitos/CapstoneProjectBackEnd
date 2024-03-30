const { Types } = require('mongoose');
const Service = require('../models/service.model');

const getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (err) {
        next(err);
    }
};

const createService = async (req, res, next) => {
    try {
        const { name, price, duration, description } = req.body;
        await Service.create({ name, price, duration, description });
        res.sendStatus(201)
    } catch (error) {
        next(error);
    }
};

const editService = async (req, res, next) => {
    try {
        const { service_id } = req.params;

        if (!Types.ObjectId.isValid(service_id)) {
            return res.status(400).json({ message: 'Invalid service id' });
        }

        const { name, price, duration, description } = req.body;

        const updatedService = await Service.findByIdAndUpdate(
            service_id,
            { name, price, duration, description },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(updatedService);
    } catch (err) {
        next(err);
    }
};

const deleteService = async (req, res, next) => {
    try {
        const { service_id } = req.params;

        if (!Types.ObjectId.isValid(service_id)) {
            return res.status(400).json({ message: 'Invalid service id' });
        }

        const deletedService = await Service.findByIdAndDelete(service_id);

        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllServices,
    createService,
    editService,
    deleteService
};
