const express  = require("express")
const router = new express.Router()
const {registration, login, logout,updateProfile} = require("../controllers/userController")
const upload = require("../middleware/multer")
const isAutenticated = require("../middleware/isAutenticated")



router.post("/registration",upload.single("photo"),registration)
router.post("/login",login)
router.post("/logout",logout)
router.put('/update/:id',upload.single("file"),isAutenticated ,updateProfile)

module.exports = router