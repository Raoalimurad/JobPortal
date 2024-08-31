const express = require('express')
const { jobRegister, getAllJobs, getJobById, adminJobs, updateJob } = require('../controllers/jobController')
const isAutenticated = require("../middleware/isAutenticated")
const router = express.Router()

router.post("/registration",isAutenticated,jobRegister)
router.get("/getJobs",isAutenticated,getAllJobs)
router.get("/getJobs/:id",isAutenticated,getJobById)
router.get('/adminjobs',isAutenticated,adminJobs)
router.put('/update/:id',isAutenticated,updateJob)

module.exports = router