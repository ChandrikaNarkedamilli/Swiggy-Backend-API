const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName :{
    type : String
  },
  price:{
    type:String
  },
  category:{
    type:[{
      type: String,
      enum : ['Veg', 'Non-Veg']
    }]
  },
  image:{
    type : String
  },
  bestSeller :{
    type: String
  },
  description :{
    type: String
  },
  firm : [{
    type : mongoose.Schema.Types.ObjectId,
    ref :'Firm'
  }]
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product