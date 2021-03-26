const express = require("express");

const router = express.Router();

const jsonDataController = require("../controllers/jsonData-controller");

// @route   POST /
// @desc    Access the jsonData-controller
// @access  Public
router.post("/", jsonDataController.getJsonData);

module.exports = router;
