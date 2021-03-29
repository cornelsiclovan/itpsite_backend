const express = require('express');
const Program = require('../models/program')
const HttpError = require('../models/http-errors');
const Fawn = require('fawn');

const router = express.Router();

const getPrograms = async (req, res, next) => {
    let programs;
 

    try {
        programs = await Program.find({});
    } catch (err) {
        return next(new HttpError("Error fetching data:",err));
    }

    console.log(programs);

    serializedData = programs.map(program => {
        return {
            _id: program._id,
            tip_program: program.tip_program,
            inchidere: program.inchidere,
            deschidere: program.deschidere
        }
    })

    res.json({programs: serializedData.map(program => program)})
}

const getProgramById = async (req, res, next) => {
    const programId = req.params.id;

    let program;

    try {
        program = await Program.findById(programId);
    } catch (err){}

    res.status(200).json({program: program.toObject({ getters: true })});
}

const postProgram = async (req, res, next) => {
    const {
       tip_program,
       inchidere,
       deschidere
    } = req.body;

    const createdProgram = new Program({
        tip_program,
        inchidere,
        deschidere
    });

    try{
        createdProgram.save();
    } catch(err) {}

    res.status(201).json({program: createdProgram});
}

const patchProgram = async (req, res, next) => {
    const {
        tip_program,
        inchidere,
        deschidere
    } = req.body;

    const programId = req.params.id;

    let program;

    try {
        program = await Program.findById(programId);
    } catch (err){}

    program.tip_program = tip_program;
    program.inchidere = inchidere;
    program.deschidere = deschidere;

    try {
        await program.save();
    } catch(err) {}

    res.status(200).json({program: program.toObject({ getters: true })});
}

exports.getPrograms = getPrograms;
exports.patchProgram = patchProgram;
exports.postProgram = postProgram;
exports.getProgramById = getProgramById;