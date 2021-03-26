const express = require('express');
const Contact = require('../models/contact')
const HttpError = require('../models/http-errors');
const Fawn = require('fawn');

const router = express.Router();


const getContacts = async (req, res, next) => {
    let contacts;
 

    try {
        contacts = await Contact.find({});
    } catch (err) {
        return next(new HttpError("Error fetching data"));
    }

    console.log(contacts);

    serializedData = contacts.map(contact => {
        return {
            id: contact._id,
            telefon: contact.telefon
        }
    })

    res.json({contacts: serializedData.map(contact => contact)})
}

const getContactById = async (req, res, next) => {
    const contactId = req.params.id;
    console.log(contactId);
    let contact;

    try {
        contact = await Contact.findById(contactId);
    } catch (err){}

    res.status(200).json({contact: contact.toObject({ getters: true })});
}

const postContact = async (req, res, next) => {
    const {
       telefon
    } = req.body;

    const createdContact = new Contact({
        telefon
    });

    try{
        createdContact.save();
    } catch(err) {}

    res.status(201).json({service: createdContact});
}

const patchContact = async (req, res, next) => {
    const {
        telefon
    } = req.body;

    const contactId = req.params.id;
    console.log(contactId);
    let contact;

    try {
        contact = await Contact.findById(contactId);
    } catch (err){}

    contact.telefon = telefon;

    try {
        await contact.save();
    } catch(err) {}

    res.status(200).json({contact: contact.toObject({ getters: true })});
}

exports.getContacts = getContacts;
exports.patchContact = patchContact;
exports.postContact = postContact;
exports.getContactById = getContactById;