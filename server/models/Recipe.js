const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is requied'
    },
    description:{
        type: String,
        required: 'This field is requied'
    },
    email:{
        type: String,
        required: 'This field is requied'
    },
    ingredients:{
        type: Array,
        required: 'This field is requied'
    },
    category:{
        type: String,
        enum: ['Thai', 'American','Chinese','Mexican','Indian', 'Spanish'],
        required: 'This field is requied'
    },
    image:{
        type: String,
        required: 'This field is requied'
    }

});
recipeSchema.index({name:'text', description:'text'});

module.exports=mongoose.model('Recipe',recipeSchema);