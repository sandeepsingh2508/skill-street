const {
  createNotes,
  updateNotes,
  getSingleNotes,
  getAllNotes,
  deleteNotes,
} = require("../controllers/userNotes");

const { isAuthorized } = require("../middlewares/auth");

const router = require("express").Router();
router.post("/create", isAuthorized, createNotes);
router.put("/update/:notesId", isAuthorized, updateNotes);
router.get("/getsinglenotes/:notesId", isAuthorized, getSingleNotes);
router.get("/getallnotes", isAuthorized, getAllNotes);
router.delete("/delete/:notesId", isAuthorized, deleteNotes);

module.exports = router;
