const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const app = express()
const dbConnect = require("./db/connection")
const userRoute = require("./routes/userRoute")
const companyRoute = require("./routes/companyRoute")
const applicationRoute = require("./routes/applicationRoute")
const jobRoute = require("./routes/jobRoute")
const PORT = process.env.PORT || 8081

// database connect function
dbConnect()


// middlewares
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// routes
app.use("/api/user",userRoute)
app.use("/api/company",companyRoute)
app.use("/api/job",jobRoute)
app.use("/api/application",applicationRoute)













// app listen
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})