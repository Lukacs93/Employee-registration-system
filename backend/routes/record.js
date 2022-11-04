const express = require("express");
const mongoose = require("mongoose");
const Employee = require("../models/employeeModel");
const Equipment = require("../models/equipmentModel");

const recordRoutes = express.Router();

recordRoutes.get("/record", async (req, res) => {
    //const findAllEmployees = await Employee.find({}).populate('equipment')
    const findAllEmployees = await Employee.find({})

    res.status(200).json(findAllEmployees);
    console.log(findAllEmployees)
});

recordRoutes.get("/record/:id", async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `That is not a valid ID: ${id}`});
    }

    const findEmployeeById = await Employee.find({ _id: id }).populate('equipment');

    if (!findEmployeeById) {
        return res.status(404).json({error: `There is no employee with ID: ${id}`});
    }

    res.status(200).json(findEmployeeById);
});

recordRoutes.post("/record/add", async (req, res) => {
    const {firstName, lastName, middleName, position, level, equipment} = req.body;

    try {
        const createNewRecord = await Employee.create({firstName, lastName, middleName, position, level, equipment});
        res.status(200).json(createNewRecord);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

recordRoutes.post("/update/:id", async (req, res) => {
    const id = req.params.id;
    const {firstName, lastName, middleName, position, level} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `That is not a valid ID: ${id}`});
    }

    const updateEmployee = await Employee.updateOne({_id: id}, {firstName, lastName, middleName, position, level})

    if (!updateEmployee) {
        return res.status(404).json({error: `There is no employee with ID: ${id}`});
    }
    console.log(updateEmployee)
    res.status(200).json(updateEmployee);

    // Employee.updateOne(myquery, newvalues, function (err, response) {
    //     if (err) throw err;
    //     console.log("1 document updated");
    //     res.json(response);
    //   });
});

recordRoutes.delete("/:id", async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `That is not a valid ID: ${id}`});
    }

    const deleteEmployee = await Employee.deleteOne({_id: id});

    if (!deleteEmployee) {
        return res.status(404).json({error: `There is no employee with ID: ${id}`});
    }

    res.status(200).json(deleteEmployee);
});

recordRoutes.get("/filter", async (req, res) => {
   let { position, level, all} = req.query

   if (position) {
        const filterByPosition = await Employee.find({position: position})
        res.status(200).json(filterByPosition)

   } else if (level) {
        const filterByLevel = await Employee.find({level: level})
        res.status(200).json(filterByLevel)

   } else if (all === "true") {
        res.status(200).json(await Employee.find({}))

   } else if (Object.keys(req.body).length === 0) {
        res.status(200).json(await Employee.find({}))
}

   
})

module.exports = recordRoutes;