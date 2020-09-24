var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
     email:{
         type:String, unique:true, lowercase:true
     },
     facebook:String,
     tokens:Array,
     role: String,
     profile:{
         name:{ type:String, default:''},
         picture:{ type:String, default:""}
     },

     courseTeach:[{
         course:{type:Schema.Types.ObjectId, ref:'Course'}
     }],

     courseTaken:[{
         course: {type:Schema.Types.ObjectId, ref: 'Course'}
     }],
});

module.exports = mongoose.model('user',UserSchema);