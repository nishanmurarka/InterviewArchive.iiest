const express=require('express');
const router=express.Router();
const recipeController=require('../controllers/recipeController');

router.get('/',recipeController.homepage);

router.get('/project',recipeController.exploreAllRecipes);
router.get('/project/:id/view',recipeController.exploreRecipesView);
router.get('/project/:id/download',recipeController.exploreRecipesDownload);
router.get('/company',recipeController.exploreCategories);
router.get('/company/:id',recipeController.exploreCategoriesById);

router.post('/search',recipeController.searchRecipe);

router.get('/explore-latest',recipeController.exploreLatest);
router.get('/explore-random',recipeController.exploreRandom);

router.get('/submit',recipeController.submitRecipe);

router.get('/contact',recipeController.contact);
router.post('/contact',recipeController.contactOnPost);

router.get('/about',recipeController.about);

module.exports= router;