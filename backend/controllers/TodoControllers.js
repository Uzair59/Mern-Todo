const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
      userId: req.user.id,
    });
    await newTodo.save();
    res
      .status(201)
      .json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.id,
      },
      req.body,
      { new: true },
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate("userId", "username email role");
    return res.status(200).json({ success: true, todos });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  getAllTodos,
};
