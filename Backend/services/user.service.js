const userModel = require("../models/user.model");

module.exports.registerUser = async({
    firstname,lastname,email,password
})=>{
    if(!firstname || !email || !password) {
        throw new Error("Please provide all required fields");
    }
    const user = userModel.create({
        fullName: {
            firstname,
            lastname
        },
        email,
        password,
      
    });
    return user;
}