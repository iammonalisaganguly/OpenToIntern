const { default: mongoose } = require("mongoose");


/*****************************String Validation**************************************/
const isValidString1 = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  if (! /^[a-z][a-z ]+[a-z]$/.test(value)) return false;
  return true;
};


const isValidString2 = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};
/*****************************Mobile Number Validation**************************************/
const isValidMobileNum = function (value) {
  if (!/^[0-9]\d{9}$/.test(value.trim())) {
    return false;
  }
  return true;
};

/*****************************Email Validation**************************************/

const isValidEmail = function (emailId) {
  let emailRegex =/^[a-z0-9_]{2,}@[a-z]{3,}.[com]{3}$/;
  if (emailRegex.test(emailId)) {
    return true;
  } else {
    return false;
  }
};
/*******************************Logo Validation********************************************/
const isValidLogo = (logoLink) => {
  const nameRegex = /^(http[s]?:\/\/.*\.(?:png|jpeg))$/;
return nameRegex.test(logoLink);
};


module.exports = {
  isValidString1,
  isValidString2,
  isValidMobileNum,
  isValidEmail,
  isValidLogo,
};
