const userNotesDB = require("../models/userNotes");
const userDB = require("../models/user");
const response = require("../middlewares/responseMiddleware");

const createNotes = async (req, res) => {
  const { title, content } = req.body;
  try {
    const userId = req.user._id;
    const findUser = await userDB.findById({ _id: userId });
    if (!findUser) {
      return response.notFoundError(res, "User not found");
    }
    const newNotes = await new userNotesDB({
      userId: `user-${userId}`,
      title: title,
      content: content,
    }).save();
    if (!newNotes) {
      return response.internalServerError(res, "Cannot save notes");
    }
    findUser.userNotes.push(newNotes._id);
    await findUser.save();

    response.successResponse(res, newNotes, "Successfully saved notes");
  } catch (error) {
    response.internalServerError(res, error.message || "Internal server error");
  }
};

const updateNotes = async (req, res) => {
  const { notesId } = req.params;
  try {
    if (!notesId || notesId === ":notesId") {
      return response.validationError(
        res,
        "Cannot update notes without proper parameters"
      );
    }
    const findNotes = await userNotesDB.findById({ _id: notesId });
    if (!findNotes) {
      return response.notFoundError(res, "Cannot find notes");
    }
    const newData = {
      ...(req.body.content && { content: req.body.content }),
    };
    const updatedNotes = await userNotesDB.findByIdAndUpdate(
      { _id: findNotes._id },
      newData,
      { new: true }
    );
    if (!updatedNotes) {
      return response.internalServerError(res, "Cannot update notes");
    }
    response.successResponse(res, updatedNotes, "Successfully update notes");
  } catch (error) {
    console.log(error);
    response.internalServerError(res, error.message || "Internal server error");
  }
};

const getSingleNotes = async (req, res) => {
  const { notesId } = req.params;
  try {
    const findNotes = await userNotesDB.findById({ _id: notesId });
    if (!findNotes) {
      return response.notFoundError(res, "Cannot find notes");
    }
    response.successResponse(res, findNotes, "Successfully find notes");
  } catch (error) {
    response.internalServerError(res, error.message || "Internal server error");
  }
};
const getAllNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const findNotes = await userNotesDB.find({ userId: `user-${userId}` });
    if (!findNotes) {
      return response.notFoundError(res, "Cannot find all notes");
    }
    response.successResponse(res, findNotes, "Successfully find all notes");
  } catch (error) {
    response.internalServerError(res, error.message || "Internal server error");
  }
};
const deleteNotes = async (req, res) => {
  const { notesId } = req.params;
  try {
    const findNotes = await userNotesDB.find({ _id: notesId });
    if (!findNotes) {
      return response.notFoundError(res, "Cannot find  notes");
    }
    const deletedNotes = await userNotesDB.findByIdAndDelete({
      _id: notesId,
    });
    if (!deletedNotes) {
      return response.internalServerError(res, "Cannot delete notes");
    }
    await userDB.findByIdAndUpdate(
      { _id:req.user._id },
      { $pull: { userNotes: deletedNotes._id } },
      { new: true }
    );
    response.successResponse(res, deletedNotes, "Successfully deleted notes");
  } catch (error) {
    response.internalServerError(res, error.message || "Internal server error");
  }
};

module.exports = {
  createNotes,
  updateNotes,
  getSingleNotes,
  getAllNotes,
  deleteNotes,
};
