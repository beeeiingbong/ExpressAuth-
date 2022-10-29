const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const checkAuth = require("../middlewares/auth-middleware");

router.use("/changePassword", checkAuth);
router.use("/loggedUser", checkAuth);

//Public Routes
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userlogin);
router.post("/passwordReset", UserController.sendUserPasswordResetEmail);

//Protected Routes
router.post("/changePassword", UserController.chnageUserPassword);
router.use("/loggedUser", UserController.loggedUser);

module.exports = router;
