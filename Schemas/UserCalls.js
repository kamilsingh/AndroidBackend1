var mongoose = require('mongoose')


 const UserCallSchema = new mongoose.Schema({
  AllCalls:{calls:[]},
  id:String,
});
 
  module.exports=mongoose.model('Call',UserCallSchema);