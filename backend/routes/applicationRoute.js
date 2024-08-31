const express = require("express")
const isAutenticated = require("../middleware/isAutenticated")
const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require("../controllers/applicationController")
const router = express.Router()

router.get("/apply/:id",isAutenticated,applyJob)
router.get('/get',isAutenticated,getAppliedJobs)
router.get("/getApplicant/:id",isAutenticated,getApplicants)
router.put('/update/:id',isAutenticated,updateStatus)






















module.exports = router