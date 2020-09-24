const express = require('express');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const morgan = require('morgan');
const ejs = require('ejs');
const engine = require('ejs-mate')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

//------------
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//importing secret.js
var secret= require('./config/secret')

var db = secret.database;
    console.log(db +'.......db is here')
/*
mongoose.connect('mongodb+srv://vinuadmin:vinu123@cluster0-lxhhh.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },function(err){
    if(err){
        console.log(err);
    } else{
        console.log("....DB has been connected successfully....")
    }
})
*/
app.use(express.static(__dirname + '/public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));  
app.use(cookieParser()); 
app.use(session({
    
    resave : true,
    saveUninitialized: true,
     secret: secret.secretKey,
    //store: new MongoStore({url: secret.database, autoReconnect: true}),
   
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
})


require('./routes/main')(app);
require('./routes/user')(app);
require('./routes/teacher')(app); 
 //------------------------------

app.listen(secret.port,  function(err){
    if(err){
        console.log(err);
    } else{
        console.log('....Successfully running on'+ " " + secret.port);
    }
});