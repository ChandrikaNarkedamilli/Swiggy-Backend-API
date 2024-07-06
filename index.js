const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const vendorRoutes = require('./routes/vendorRoutes')
const bodyParser = require('body-parser')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const cors = require('cors');
const path = require('path')

const app = express()


const PORT = process.env.PORT || 4000

dotEnv.config()
// app.use(cors())
// app.use(cors({
//   origin: 'http://localhost:5173', // your frontend URL
//   credentials: true
// }));

const allowedOrigins = [
  'http://localhost:5173',
  'https://swiggy-vendor-dashboard.vercel.app'
];

// Configure CORS to allow requests from allowed origins
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB Connection Establised Successfully!"))
  .catch((error)=>console.log(error))

app.use(bodyParser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm', firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))

app.listen(PORT, ()=>{
  console.log(`Server started running at ${PORT}`)
})

app.use('/',(req,res)=>{
  res.send("<h1>Welcome to Swiggy App</h1>")
})