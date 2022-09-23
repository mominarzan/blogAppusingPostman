const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  id:{
    type: Number
  }

})


module.exports = mongoose.model('Article', articleSchema)