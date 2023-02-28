const mongoose = require("mongoose");
const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true, required: true },

    mobile: 
    { type: String, required: true, unique: true },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "college",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("intern", internSchema)