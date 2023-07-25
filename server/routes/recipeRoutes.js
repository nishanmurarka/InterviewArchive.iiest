const express=require('express');
const router=express.Router();
const recipeController=require('../controllers/recipeController');


router.get('/',recipeController.homepage);

router.get('/project',recipeController.exploreAllRecipes);
router.get('/project/:id',recipeController.exploreRecipes);

router.get('/categories',recipeController.exploreCategories);
router.get('/categories/:id',recipeController.exploreCategoriesById);

router.post('/search',recipeController.searchRecipe);

router.get('/explore-latest',recipeController.exploreLatest);
router.get('/explore-random',recipeController.exploreRandom);

router.get('/submit-project',recipeController.submitRecipe);
router.post('/submit-project',recipeController.submitRecipeOnPost);

router.get('/contact',recipeController.contact);
router.post('/contact',recipeController.contactOnPost);

router.get('/about',recipeController.about);

module.exports= router;