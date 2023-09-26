import { Mongoose } from "mongoose";
import express from "express";
import formOperationTypes from '../models/formOperationTypes';

const saveOperationType = async (req, res) => {
    const operationTypes = new formOperationTypes({
        burning: req.body.burning,
        craftingDefault: req.body.craftingDefault,
        craftingUpgraded: req.body.craftingUpgraded,
        salvage: req.body.salvage,
        scrapping: req.body.scrapping,
        smelting: req.body.smelting
    });
    try {
        await operationTypes.save();
        console.log("Save Successful.");
        res.status(201).json(operationTypes);
    } catch (error) {
        console.log("Save Failed.");
        res.status(400).json({ message: error.message });
    }
};

export default saveOperationType;