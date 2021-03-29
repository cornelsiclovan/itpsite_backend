const express = require('express');
const Service = require('../models/service')
const HttpError = require('../models/http-errors');
const Fawn = require('fawn');
const mongoose = require('mongoose');

const router = express.Router();


const getServices = async (req, res, next) => {
    let services;
 

    try {
        services = await Service.find({});
    } catch (err) {
        return next(new HttpError("Error fetching data:",err));
    }

    console.log(services);

    serializedData = services.map(service => {
        return {
            _id: service._id,
            name: service.name,
            price: service.price,
            currency: service.currency,
            image: service.image
        }
    })

    res.json({services: serializedData.map(service => service)})
}

const getServiceById = async (req, res, next) => {
    const serviceId = req.params.id;
    
    let service;

    try {
        service = await Service.findById(serviceId);
    } catch (err){}

    res.status(200).json({service: service.toObject({ getters: true })});
}

const postService = async (req, res, next) => {
    const {
       name,
       price,
       currency,
       image
    } = req.body;

    const createdService = new Service({
        name,
        price, 
        currency,
        image
    });

    try{
        createdService.save();
    } catch(err) {}

    res.status(201).json({service: createdService});
}

const patchService = async (req, res, next) => {
    const {
        name,
        price,
        currency,
        image
    } = req.body;

    const serviceId = req.params.id;

    let service;

    try {
        service = await Service.findById(serviceId);
    } catch (err){}

    service.name = name;
    service.price = price;
    service.currency = currency;
    service.image = image;

    try {
        await service.save();
    } catch(err) {}

    res.status(200).json({service: service.toObject({ getters: true })});
}

exports.getServices = getServices;
exports.patchService = patchService;
exports.postService = postService;
exports.getServiceById = getServiceById;