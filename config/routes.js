const express = require("express")
const router = express()
const userController = require("../app/controllers/userControllers")
const contactController = require("../app/controllers/contactController")
const authenticateUser = require("../app/middlewares/authentication")

router.get("/register", userController.list)
router.post("/register", userController.create)
router.put("/register/:id", userController.update)
router.delete("/register/:id", userController.destroy)
router.post("/login", userController.login)


router.get("/contact", authenticateUser, contactController.list)
router.put("/contact/:id", authenticateUser, contactController.update)
router.post("/contact", authenticateUser, contactController.create)
router.get("/contact/:id", authenticateUser, contactController.show)
router.delete("/contact/:id", authenticateUser, contactController.destroy)

module.exports = router