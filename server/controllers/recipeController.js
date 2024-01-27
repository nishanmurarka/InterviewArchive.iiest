require('../models/database'); // why do I need this here
const Category=require('../models/Category');
const Recipe=require('../models/Recipe');
const Contact=require('../models/Contact');
const path = require('path');
//Get / Homepage
exports.homepage=async(req, res)=>{
    
    
    const categories= await Category.find({})
    try {
        res.render('index',{title: 'Homepage', categories});
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
}

// Get /categories
exports.exploreCategories=async(req, res)=>{
    
    const limitnumber=20;
    const categories= await Category.find({}).limit(limitnumber);
    
    try {
        res.render('all-categories',{title: 'Categories', categories});
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
  }


  //Get /categories/id
  exports.exploreCategoriesById=async(req, res)=>{
    try {
        let categoryid=req.params.id;
        const categoryById=await Recipe.find({'category':categoryid});
        res.render('categories',{title:'Categories', categoryById,categoryid});
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
  }

  // Get /recipe/id
exports.exploreRecipesView=async(req, res)=>{
    
    try {
        let recipeId= req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.sendFile(path.join(__dirname,'../../public/pdfuploads',recipe.pdf));
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
  }
  exports.exploreRecipesDownload=async(req, res)=>{
    
    try {
        let recipeId= req.params.id;
        const recipe = await Recipe.findById(recipeId);
        const file = path.join(__dirname,'../../public/pdfuploads',recipe.pdf);
        res.download(file,recipe.pdf);
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
  }

  //Get /recipe
  exports.exploreAllRecipes=async(req, res)=>{
    
    try {
      // const del=await Recipe.find({}).sort({_id:-1}).limit(1);
      // await Recipe.deleteOne(del[0]);
      
        const recipeAll = await Recipe.find({});
        res.render('all',{title: 'All Products',recipeAll});
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
  }


  //Post/search
  exports.searchRecipe=async(req, res)=>{
    
    try {
        let searchterm=req.body.searchTerm;
        const company= await Category.find({$text:{$search: searchterm,$diacriticSensitive:true}});
        res.render('search',{title: 'Search',company});
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
  }

  //Get/Explore-latest
  exports.exploreLatest=async(req, res)=>{
    
    try {
        const limitnumber=20;
        const recipe= await Recipe.find({}).sort({_id:-1}).limit(limitnumber);
        res.render('explore-latest',{title: 'Product',recipe});
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
  }

  //Get/Explore-random
  exports.exploreRandom=async(req, res)=>{
    
    try {

        let count= await Recipe.find().countDocuments();
        let random=Math.floor(Math.random() * count);
        const recipe=await Recipe.findOne().skip(random).exec();
        
        res.render('explore-random',{title: 'Product',recipe});
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
}
    


 /**
   * POST /submit-recipe
   * Submit Recipe
  */
exports.submitRecipe = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    const categories= await Category.find({}).sort({ name: 1 })
    res.render('submit-recipe', { title: 'Submit', infoErrorsObj, infoSubmitObj, categories} );
  }
  
  exports.submitRecipeOnPost = async(req, res) => {
    try {
  
      const newRecipe = new Recipe({
        name: req.body.name,
        email: req.body.email,
        category: req.body.category,
        role: req.body.role,
        pdf: req.file.filename
      });
      
      await newRecipe.save();

      

      req.flash('infoSubmit', 'Your Interview exp. has been added.')
      res.redirect('/submit');
    } catch (error) {
      req.flash('infoErrors', error);
      res.redirect('/submit');
    }
  }
  

  exports.contact=async(req, res)=>{
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('contact', { title: 'Contact', infoErrorsObj, infoSubmitObj  } );
  }

exports.contactOnPost=async(req, res)=>{
  try {
    const newContact = new Contact({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      message: req.body.message
    });
    await newContact.save(); //why crashing if not used await
    
    req.flash('infoSubmit','Message sent. ')
    res.redirect('/contact');
  } catch (error) {
    req.flash('infoErrors', error);
    res.redirect('/contact');
  }
}

//Get/about
exports.about=async(req, res)=>{
    
  try {
      res.render('about',{title: 'About'});
  } catch (error) {
      res.status(500).send({message: error.message|| "Error Occured"});
  }
}
