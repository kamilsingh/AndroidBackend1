var mongoose = require('mongoose')



 const UserMessageSchema = new mongoose.Schema({
    AllMessages: {messages:[]},
    id:String,
});
  
  module.exports=mongoose.model('Message',UserMessageSchema);