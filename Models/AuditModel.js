const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
    UserID: { 
        type: String, 
        required: true 
    },
    UserEmail: {
         type: String,
          required: true 
        },
    Action: { 
        type: String, 
        required: true },
    Page: {
         type: String, 
         required: true 
        },
    Browser: {
         type: String, 
         required: true 
        },
    OS: { 
        type: String, 
        required: true 
    },
    timestamp:{
        type:Date
    }


  });

  const Audit = mongoose.model('Audit', auditSchema);

  module.exports = Audit;
  