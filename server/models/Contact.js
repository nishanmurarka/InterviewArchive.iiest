const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is requied'
    },
    mobile:{
        type: String,
        required: 'This field is requied'
    },
    email:{
        type: String,
        required: 'This field is requied'
    },
    message:{
        type: String,
        required: 'This field is requied'
    }

});

module.exports=mongoose.model('Contact',contactSchema);