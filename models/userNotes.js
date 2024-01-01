const mongoose = require("mongoose");
const notesSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please fill title field"],
      maxLength: [20, "Title cannot exceed 30 charecter"],
      minLength: [2, "Title should have more than 2 charecter"]
    },
    content: {
      type: String,
      required: [true, "Please fill content field"],
      maxLength: [500, "Content cannot exceed 500 charecter"],
      minLength: [5, "Content should have more than 5 charecter"],
    },
  },
  {
    timestamps: true,
  }
);
const notesModel = mongoose.model("UserNote", notesSchema);
module.exports = notesModel;
