"use strict";

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const models = {};
const schemaOptions = {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    },
    toObject: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    // minimize: false
};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return file !== basename &&
               file.slice(-3) === ".js";
    })
    .forEach(file => {
        const schema = require(path.join(__dirname, file));
        for (let option in schemaOptions) {
            schema.set(option, schemaOptions[option]);
        }
        const modelName = (f => f.charAt(0).toUpperCase() + f.substr(1))(file.split(".")[0]);
        models[modelName] = mongoose.model(modelName, schema);
    });

module.exports = models;