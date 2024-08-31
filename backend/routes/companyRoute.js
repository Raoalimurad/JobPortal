const express = require("express")
const { registrationCompany, getCompany, getCompanyById, updateCompany } = require("../controllers/companyController")
const isAutenticated = require("../middleware/isAutenticated")
const upload = require("../middleware/multer")
const router = express.Router()



router.post('/registration',isAutenticated,registrationCompany)
router.get('/getCompany',isAutenticated,getCompany)
router.get("/getCompany/:id",isAutenticated,getCompanyById)
router.put("/update/:id",upload.single("logo"),isAutenticated,updateCompany)




module.exports = router