const express = require('express');
const expresslayouts=require('express-ejs-layouts');
const session=require('express-session');
const cookieParser=require('cookie-parser');
// const fileUpload=require('express-fileupload');
const flash=require('connect-flash');
const multer = require('multer');
const path=require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./')+'/public/pdfuploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
const app=express();
app.set('view engine', 'ejs');
const port=process.env.PORT || 3000;
require('dotenv').config();

app.use(express.urlencoded({extended: true}));
app.use(express.static('public')); //doubt
app.use(expresslayouts);
const recipeController=require('./server/controllers/recipeController');
app.use(cookieParser('CookingBlogSecure')); //DOubt
app.use(session({                           //
    secret: 'CookingBlogSecretSession',     //
    saveUninitialized:true,                 //
    resave:true                             //
}));
app.use(flash());
// app.use(fileUpload());

app.set('layout', './layouts/main');

app.post('/submit',upload.single('pdfFile'),recipeController.submitRecipeOnPost);
const routes=require('./server/routes/recipeRoutes'); //Doubt
app.use('/',routes);

app.listen(port,()=> console.log(`Listening to port ${port}`));
