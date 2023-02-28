const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const internController = require("../controllers/internController");

/************************************Create College ************************************ */
router.post("/functionup/colleges", collegeController.createCollege);

/************************************Create Interns ************************************ */
router.post("/functionup/interns", internController.createintern);

/************************************get  Interns and college details ************************************ */
router.get("/functionup/collegeDetails", internController.getInterns);

/***************************** Path not match**************************************/
router.all("/*", async function (req, res) {
  return res.status(404).send({ status: false, message: "Page Not Found" });
});

module.exports = router;
