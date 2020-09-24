var mongoose = require('mongoose')
module.exports= function(app){
/*
//Data is saving using get method
app.get('/getuser', function(req,res, next){
    var user = new User();
    user.name = "Vinay";
    user.age = 2622;
    //res.json(user);
    user.save(function(err){
        if(err) next(err);
        res.json(user);
    })
});
*/

var userSchema = new mongoose.Schema({
    name:String,
    age:Number
});
var User = mongoose.model('User',userSchema);

//-------------Finding the data---------------------------------------
        //---find by name---
    //app.get('/', function(req,res,next){
   // User.find({}, function(err, foundUser)                         //---will return all users
   //User.find({"name":"Vinay  Maurya"}, function(err, foundUser)
  
      //app.get('/:name', function(req, res, next){
    //User.findOne({name:req.params.name}, function(err,foundUser)       //--- to find any user by name
  
  /*
         //---find by Id
         app.get('/:id', function(req, res, next){
            User.findById({_id:req.params.id}, function(err,foundUser)       //--- to find any user by name
       {
            if(foundUser){
                res.json(foundUser);
            } else{
                res.json("user Doesn't exist");
            }
        })
    })
    */
    //-----ROuting----
    app.get('/jsonPage', function(req,res, next){
        res.json('jsonPage')
    })
    //------------------post method
    app.post('/user', function(req, res, next){
                    //this is short to write again again
        var user = new User({...req.body})
    
        //user.name = req.body.name;
        //user.age= req.body.name;
        console.log(user)
        user.save(function(err){
            if(err) console.log(err);
            res.json(user);
        })
        });
    
    app.get('/', function(req, res, next){
        res.render('./main/home')
    });
    
    app.get('/home', function(req, res, next){
        res.render('./main/home')
    });
    
    
    }