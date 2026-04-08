const URL_DB = 'mongodb+srv://nghinguyenzero:admin%401a2b3c@clusterzero.1pcv2up.mongodb.net/ecommerce_store'

import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl = URL_DB
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Ecommerce database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectToDB;