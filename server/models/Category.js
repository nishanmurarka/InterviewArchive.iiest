const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is requied'
    },
    image:{
        type: String,
        required: 'This field is requied'
    }
});

module.exports=mongoose.model('Category',categorySchema);