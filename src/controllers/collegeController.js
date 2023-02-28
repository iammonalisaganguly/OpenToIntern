const collegeModel = require("../models/collegeModel");
let { isValidString1,isValidString2, isValidLogo } = require("../validators/validator");

/************************************Create College ************************************ */

const createCollege = async function (req, res) {
  try {
    let data = req.body;
    let { name, fullName, logoLink } = data;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Data not found in body" });
    }
    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    if (!isValidString1(name)) {
      return res.status(400).send({ status: false, message: "name is not valid" });
    }
    const find1 = await collegeModel.findOne({ name:name })
    if(find1)
    {return res.status(400).send({status:false, message:"name already exists"})}
    if (!fullName)
      return res
        .status(400)
        .send({ status: false, message: "fullName is required" });
    if (!isValidString2(fullName)) {
      return res
        .status(400)
        .send({ status: false, message: "fullName is not valid" });
    }
    if (!logoLink)
      return res
        .status(400)
        .send({ status: false, message: "logoLink is required" });
    if(!isValidLogo(logoLink)){
      return res
      .status(400)
      .send({status: false, message: "logo link is not valid"})
    }    

    const created = await collegeModel.create(data);
    return res.status(201).send({ status: true, message: "College created successfully",data: created });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.createCollege = createCollege;
