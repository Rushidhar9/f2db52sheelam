const mongoose = require("mongoose")
const biryaniSchema = mongoose.Schema({
    biryaniType: String,
    biryaniFlavor: String,
    biryaniPrice: Number
})
module.exports = mongoose.model("Biryani",biryaniSchema)