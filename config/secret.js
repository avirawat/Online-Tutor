var mongoose = require('mongoose');
require('connect-mongo');

module.exports={
    database: mongoose.connect('mongodb+srv://vinuadmin:vinu123@cluster0-lxhhh.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },function(err){
        
        if(err){
            console.log(err +".....Error at this point.........");
        } else{
            console.log("....DB has been connected successfully....")
        }
      
    //.then(()=> console.log("mongo conneceted...."))
    //.catch(err=> console.log(err)),
       
    }), 
     secretKey : 'vinay12345'  ,
    facebook:{ 
            clientID: '224162112324753',
            clientSecret:'c3c4025e3a4b3e3befb7a6dcee879782',
            profileFeild:['email', 'displayName'],
            callbackURL:'http://localhost:1234/auth/facebook/callback',
            passReqToCallback: true,
    },
    port: 1234 
    
}; 
