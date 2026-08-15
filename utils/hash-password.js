const bycrpt=require('bcrypt');

const hashPassword=async(password)=>{
    const salt=await bycrpt.genSalt(10);
    const hashedPassword=await bycrpt.hash(password,salt);
    return hashedPassword;
}

const verifyPassword=async(password,hashedPassword)=>{
    return await bycrpt.compare(password,hashedPassword);
}
module.exports={hashPassword,verifyPassword};