var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema(
  {
    title: String,
    description: String,
    published: Boolean,
    imagen: String
  },
  {
    timestamps: true
  }
);

var Casos = mongoose.model('casos_exitoso', UserSchema)
module.exports =  { Casos } 