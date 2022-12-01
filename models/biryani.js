const mongoose = require("mongoose")
const biryaniSchema = mongoose.Schema({
    biryaniType: {
        type : String,
        maxLength: 10
    },
    biryaniFlavor: String,
    biryaniPrice: Number
})


module.exports = mongoose.model("Biryani",biryaniSchema)