const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { EventImage } = require("../../db/models");
const router = express.Router();

module.exports = router;