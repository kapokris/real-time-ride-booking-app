const mongoose = require("mongoose");
console.log("DB_CONNECT:", process.env.DB_CONNECT);

function connectToDb() {
    console.log("connectToDb function called");
  mongoose.connect(
    process.env.DB_CONNECT).then(()=>{
        console.log("connected to DB")
    }).catch(err=>console.log(err));
}

module.exports = connectToDb;
