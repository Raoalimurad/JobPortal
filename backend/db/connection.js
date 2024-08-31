const mongoose = require("mongoose")
const dbUrl = process.env.MONGO_URL 

const dbConnect = async ()=>{
    try {
        await mongoose.connect(dbUrl)
        console.log(`database connected successfully`)
    } catch (error) {
        console.log(error)
    }
}
module.exports = dbConnect