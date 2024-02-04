var mongoose = require('mongoose')


 const UserContactSchema = new mongoose.Schema({
    AllContacts: {contacts:[]},
    id:String,
});
  
module.exports=mongoose.model('Contact',UserContactSchema);