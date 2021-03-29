const express = require('express');
const Item = require('../models/item')
const HttpError = require('../models/http-errors');
const Fawn = require('fawn');

const router = express.Router();


const getItems = async (req, res, next) => {
    let items;
 

    try {
        items = await Item.find({});
    } catch (err) {
        return next(new HttpError("Error fetching data:",err));
    }

    serializedData = items.map(item => {
        return {
            _id: item._id,
            service_name: item.service_name
        }
    })

    res.json({items: serializedData.map(item => item)})
}

const getItemById = async (req, res, next) => {
    const itemId = req.params.id;
   
    let item;

    try {
        item = await Item.findById(itemId);
    } catch (err){}

    res.status(200).json({item: item.toObject({ getters: true })});
}

const postItem = async (req, res, next) => {
    const {
       service_name
    } = req.body;

    const createdItem = new Item({
        service_name
    });

    try{
        createdItem.save();
    } catch(err) {}

    res.status(201).json({item: createdItem});
}

const patchItem = async (req, res, next) => {
    const {
        service_name
    } = req.body;

    const itemId = req.params.id;
    let item;

    try {
        item = await Item.findById(itemId);
    } catch (err){}

    item.service_name = service_name;

    try {
        await item.save();
    } catch(err) {}

    res.status(200).json({item: item.toObject({ getters: true })});
}

exports.getItems = getItems;
exports.patchItem = patchItem;
exports.postItem = postItem;
exports.getItemById = getItemById;