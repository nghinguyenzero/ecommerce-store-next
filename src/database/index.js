// mongodb+srv://nghinguyenzero:123@abc0@cluster0.eojyuce.mongodb.net/
// import mongoose from 'mongoose'

// const configOptions = {
//     useNewUrlParser:  true,
//     useUnifiedTopology : true
// }

const url = 'mongodb+srv://nghinguyenzero:123@abc0@cluster0.eojyuce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const url1 = 'mongodb+srv://nghinguyenzero:123%40abc0c0@cluster0.eojyuce.mongodb.net/'
const url2 = 'mongodb+srv://nghinguyenzero:admin%401a2b3c@clusterzero.1pcv2up.mongodb.net/zero_store'
// mongodb+srv://nghinguyenzero:<password>@cluster0.eojyuce.mongodb.net/


// const connectToDB = async () => {
//     const connectionUrl =  url1
//     mongoose.connect(connectionUrl, configOptions).then(()=>console.log(`Ecommerce data connected successfully!`))
//     .catch(err => console.log(`Getting error from DB connection ${err.message}`))
// }

// export default connectToDB


import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl = url1

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Ecommerce database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectToDB;