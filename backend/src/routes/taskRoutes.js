const express = require("express");
const multer = require("multer");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markAsDone,
} = require("../controllers/taskController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getTasks);
router.post("/", upload.single("linkedFile"), createTask);
router.put("/:id", upload.single("linkedFile"), updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/done", markAsDone);

module.exports = router;
