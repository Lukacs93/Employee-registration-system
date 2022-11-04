const express = require("express");
const mongoose = require("mongoose");
const Equipment = require("../models/equipmentModel");

const equipmentRoutes = express.Router()

equipmentRoutes.get("/all", async (req, res) => {
    const equipments = await Equipment.find({});

    res.status(200).json(equipments);
});

equipmentRoutes.post("/add", (req, res) => {
    const {name, type, amount} = req.body

    const addEquipment = Equipment.create({name, type, amount})

    res.status(200).json(addEquipment)
})

equipmentRoutes.patch("/update/:id", async (req, res) => {
    const {name, type, amount} = req.body;
    try {
        const updateEquipment = await Equipment.updateOne({_id: req.params.id}, {name, type, amount})
        res.status(200).json(updateEquipment)
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }

})

equipmentRoutes.delete("/:id", async (req, res) => {
    const deleteEquipment = await Equipment.deleteOne({_id: req.params.id})
    res.status(200).json(deleteEquipment)
})

module.exports = equipmentRoutes