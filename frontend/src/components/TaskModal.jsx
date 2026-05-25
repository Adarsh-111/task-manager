import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import API from "../services/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  padding: 20,
};

const TaskModal = ({ open, setOpen, fetchTasks, editTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setDeadline(editTask.deadline.split("T")[0]);
    }
  }, [editTask]);

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("deadline", deadline);

    if (file) {
      formData.append("linkedFile", file);
    }

    if (editTask) {
      await API.put(`/tasks/${editTask._id}`, formData);
    } else {
      await API.post("/tasks", formData);
    }

    fetchTasks();
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Typography variant="h6" marginBottom={2}>
          {editTask ? "Edit Task" : "Add Task"}
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button variant="contained" onClick={handleSubmit}>
            {editTask ? "Update" : "Save"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default TaskModal;
