const express = require('express');
const Location = require('../models/locationModel')

const locationRoutes = express.Router();

locationRoutes.get('/', async (req, res) => {
    const locations = await Location.find({});
    console.log(locations)
    res.status(200).json(locations);
})

module.exports = locationRoutes;