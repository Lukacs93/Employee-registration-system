const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const employeeSchema = new Schema({
    firstName: String,
    lastName: String,
    middleName: String,
    position: String,
    level: String,
    equipment: [],
    location: []
    //equipment:{ type: [Schema.Types.ObjectId], ref: 'Equipment' }
});

module.exports = mongoose.model("Employee", employeeSchema);