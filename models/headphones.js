const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/headphones", { useMongoClient: true });

const Schema = mongoose.Schema;

const headphonesSchema = new Schema({

    name: String,
    description: String,
    price: Number,
    picture : String

})

const Headphones = mongoose.model("headphones", headphonesSchema);

module.exports = Headphones;
