const express = require("express")
const router = express.Router()

const bookController = require('../controllers/linkscontrolles')

router.get("/:source", bookController.redirectToDestination)
router.post("/", bookController.createSource)

module.exports = router