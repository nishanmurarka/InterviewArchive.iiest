const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This field is requied'
    },
    
    email:{
        type: String,
        required: 'This field is requied'
    },
    
    category:{
        type: String,
        required: 'This field is requied'
    },
    pdf: {
        type: String,
        required: 'This field is requied'
    }

});
recipeSchema.index({name:'text'});

module.exports=mongoose.model('Recipe',recipeSchema);