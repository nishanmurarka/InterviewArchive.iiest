require('../models/database'); // why do I need this here
const Category=require('../models/Category');
const Recipe=require('../models/Recipe');
const Contact=require('../models/Contact');

//Get / Homepage
exports.homepage=async(req, res)=>{
    
    const limitnumber=5; // so as to display the only 5 cats on top
    const categories= await Category.find({}).limit(limitnumber);
    const lat=await Recipe.find({}).sort({_id: -1}).limit(limitnumber);
    const Webdev=await Recipe.find({'category':'WEB DEV'}).limit(limitnumber);
    const food={lat, Webdev};
    try {
        res.render('index',{title: 'Cooking Blog - Homepage', categories, food});
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
}

// Get /categories
exports.exploreCategories=async(req, res)=>{
    
    const limitnumber=20;
    const categories= await Category.find({}).limit(limitnumber);
    
    try {
        res.render('categories',{title: 'Cooking Blog - Categories', categories});
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
  }


  //Get /categories/id
  exports.exploreCategoriesById=async(req, res)=>{
    try {
        let categoryid=req.params.id;
        const categoryById=await Recipe.find({'category':categoryid});
        res.render('categories',{title:'Cooking Blog- Categories', categoryById,categoryid});
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
  }

  // Get /recipe/id
exports.exploreRecipes=async(req, res)=>{
    
    try {
        let recipeId= req.params.id;
        
        const recipe = await Recipe.findById(recipeId);
        res.render('recipe',{title: 'Cooking Blog - Recipe',recipe});
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
        res.render('all',{title: 'Cooking Blog - All Recipes',recipeAll});
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
  }


  //Post/search
  exports.searchRecipe=async(req, res)=>{
    
    try {
        let searchterm=req.body.searchTerm;
        const recipe= await Recipe.find({$text:{$search: searchterm,$diacriticSensitive:true}});
        res.render('search',{title: 'Cooking Blog - Search',recipe});
    } catch (error) {
        res.status(500).send({message: error.message|| "Error Occured"});
    }
    
    
  }

  //Get/Explore-latest
  exports.exploreLatest=async(req, res)=>{
    
    try {
        const limitnumber=20;
        const recipe= await Recipe.find({}).sort({_id:-1}).limit(limitnumber);
        res.render('explore-latest',{title: 'Cooking Blog - Recipe',recipe});
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
        
        res.render('explore-random',{title: 'Cooking Blog - Recipe',recipe});
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
    res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
  }
  
exports.contact=async(req, res)=>{
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('contact', { title: 'Cooking Blog - Contact', infoErrorsObj, infoSubmitObj  } );
  }

  exports.submitRecipeOnPost = async(req, res) => {
    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }
  
      const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: newImageName
      });
      
      await newRecipe.save();
  
      req.flash('infoSubmit', 'Recipe has been added.')
      res.redirect('/submit-recipe');
    } catch (error) {
      req.flash('infoErrors', error);
      res.redirect('/submit-recipe');
    }
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
      res.render('about',{title: 'Cooking Blog - About'});
  } catch (error) {
      res.status(500).send({message: error.message|| "Error Occured"});
  }
}
