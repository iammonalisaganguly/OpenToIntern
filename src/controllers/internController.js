const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const {
  isValidString2,
  isValidMobileNum,
  isValidEmail,
} = require("../validators/validator");

/************************************Create Interns ************************************ */

const createintern = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let data = req.body;
    let { name, email, mobile, collegeName } = data;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Data not found in body" });
    }
    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    }
    if (!isValidString2(name)) {
      return res.status(400).send({ status: false, message: "Invalid name" });
    }
    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).send({ status: false, message: "Invalid Email" });
    }
    const internsEmail = await internModel.findOne({ email: email });
    if (internsEmail) {
      return res
        .status(400)
        .send({ status: false, message: "email must be unique" });
    }
    if (!mobile) {
      return res
        .status(400)
        .send({ status: false, message: "mobile is required" });
    }
    if (!isValidMobileNum(mobile)) {
      return res
        .status(400)
        .send({ status: false, msg: "Not a valid mobile number" });
    }
    const internsMobile = await internModel.findOne({ mobile: mobile });
    if (internsMobile) {
      return res
        .status(400)
        .send({ status: false, message: "mobile must be unique" });
    }

    if (!collegeName) {
      return res
        .status(400)
        .send({ status: false, message: "collegeName is required" });
    }
    const college = await collegeModel.findOne({
      name: collegeName,
      isDeleted: false,
    });
    if (!college) {
      return res
        .status(400)
        .send({ status: false, message: "college not found" });
    }

    const collegId = college._id;
    const interndata = await internModel.create({
      name: name,
      email: email,
      mobile: mobile,
      collegeId: collegId,
    });

    return res
      .status(201)
      .send({
        status: true,
        message: "Intern created successfully",
        data: interndata,
      });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/************************************get  Interns and college details *************************************/

const getInterns = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let name = req.query.collegeName;
    if (!name) {
      return res
        .status(400)
        .send({ status: false, message: "collegeName is required" });
    }
    let filteredData = await collegeModel.findOne({
      name: name,
      isDeleted: false,
    });
    if (!filteredData) {
      return res
        .status(404)
        .send({ status: false, message: "college not exists" });
    }
    const { fullName, _id, logoLink } = filteredData;

    const internData = await internModel
      .find({ collegeId: _id, isDeleted: false })
      .select({ _id: 1, name: 1, email: 1, mobile: 1 });

    return res.status(200).send({
      status: true,
      data: {
        name: name,
        fullName: fullName,
        logoLink: logoLink,
        interns: internData,
      },
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createintern, getInterns };
