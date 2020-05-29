const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    //The ID is generated automatically by mongoose.
    //Use dropDups to ensure dropping duplicate records in your schemas
    categoryName: {type: String, unique: true, required: true, dropDups: true},
    categoryImage: {type: String},
    summary: {type: String, default:""},
});

let CategoryModel = mongoose.model('category', categorySchema, 'category');


// we need a function here to validate the JWT token

module.exports = CategoryModel;
