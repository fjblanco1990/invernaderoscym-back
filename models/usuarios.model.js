
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
        user_name: String,
        name_complete: String,
        identification: String,
        email: String,
        edad: Number,
        direccion:String,
        hijos: [
            {     
                nombre: String,
                edad: Number,
                genero: String,
                hobbies: [{
                    description: String
                }]
            }
        ],
        idCaso: String
    }
);



var User = mongoose.model('User', UserSchema)
module.exports =  { User } 

