const mongoose = require("mongoose")
const schema = mongoose.Schema


const car = new schema({

    name:String,
    pass:String




})

const Car =mongoose.model("Users",car)

module.exports = Car