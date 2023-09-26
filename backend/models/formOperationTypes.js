import express from "express";
import mongoose from "mongoose";
const app = express();
const Schema = mongoose.Schema;

export const OperationTypesSchema = new Schema({
    burning: [String],
    craftingDefault: [String],
    craftingUpgraded: [String],
    salvage: [String],
    scrapping: [String],
    smelting: [String]
});

const formOperationTypes = mongoose.model("Types", OperationTypesSchema);
module.exports = formOperationTypes;