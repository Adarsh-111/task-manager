const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
    linkedFile: req.file ? req.file.filename : "",
  });

  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.json({
    message: "Task deleted",
  });
};

exports.markAsDone = async (req, res) => {
  const task = await Task.findById(req.params.id);

  task.status = "DONE";

  await task.save();

  res.json(task);
};
