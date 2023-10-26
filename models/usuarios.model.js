
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    user_name: String,
    name_complete: String,
    identification: String
});

var User = mongoose.model('User', UserSchema)
module.exports =  { User } 

