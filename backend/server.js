const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recordRoutes = require("./routes/record")
const equipmentRoutes = require("./routes/equipment")
const locationRoutes = require('./routes/location')

const app = express();

app.use(cors());
app.use(express.json());
//app.use(require("./routes/record"));

app.use("/", recordRoutes)
app.use("/equipment", equipmentRoutes)
app.use('/locations', locationRoutes)

const port = 5000;
mongoose.connect(`mongodb://localhost/employees-data`)
    .then((r) => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        })
        console.log(`Connected to DB: ${r.connection.name}`);
    })
    .catch((error) => {
        console.log(error);
    })