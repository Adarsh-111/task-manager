import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

import API from "./services/api";
import TaskModal from "./components/TaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleDone = async (id) => {
    await API.patch(`/tasks/${id}/done`);
    fetchTasks();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Task Manager</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 5 }}>
        {tasks.length === 0 ? (
          <Typography align="center" variant="h5">
            No tasks found!
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task._id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>
                      {new Date(task.deadline).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={task.status}
                        color={task.status === "DONE" ? "success" : "warning"}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDone(task._id)}>
                        <DoneIcon color="success" />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          setEditTask(task);
                          setOpen(true);
                        }}
                      >
                        <EditIcon color="primary" />
                      </IconButton>

                      <IconButton onClick={() => handleDelete(task._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
          }}
          onClick={() => {
            setEditTask(null);
            setOpen(true);
          }}
        >
          <AddIcon />
        </Fab>

        <TaskModal
          open={open}
          setOpen={setOpen}
          fetchTasks={fetchTasks}
          editTask={editTask}
        />
      </Container>
    </>
  );
}

export default App;
