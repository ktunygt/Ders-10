const express = require("express");
const router = express.Router();

const isAuth = require("../middlewares/auth-control");
const isAdmin = require("../middlewares/admin-control");
const testEndpointAccess = require("../middlewares/test-endpoint-access");

const serverCheck = require("./home/serverCheck");
const login = require("./auth/login");
const register = require("./auth/register");
const authControl = require("./authControl");
const testEmail = require("./home/testEmail");
const testEmailChild = require("./home/testEmailChild");
const taskCreate = require("./task/create");
const getTasks = require("./task/get");

router.get("/", serverCheck);
router.post("/login", login);
router.post("/register", register);
router.get("/authControl", testEndpointAccess, isAuth, authControl);
router.get("/testEmail", isAdmin, testEmail);
router.get("/testEmailChild", isAdmin, testEmailChild);
router.post("/taskCreate", isAuth, taskCreate);
router.get("/getTasks", isAuth, getTasks);

module.exports = router;
