import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../services/todoService";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [todos, setTodos] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    setUser(localStorage.getItem("loggedInUser"));
    fetchTodos();
  }, []);

  // GET TODOS
  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data.todos);
    } catch (err) {
      toast.error("Failed to load todos");
    }
  };

  // CREATE TODO
  const handleCreate = async () => {
    if (!form.title || !form.description) {
      return toast.error("All fields required");
    }

    try {
      await createTodo(form);

      toast.success("Todo created");

      setForm({ title: "", description: "" });

      fetchTodos();
    } catch (err) {
      toast.error("Create failed");
    }
  };

  // DELETE TODO
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      toast.success("Todo deleted");
      fetchTodos();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // OPEN EDIT MODE
  const handleEditClick = (todo) => {
    setEditMode(true);
    setSelectedTodo(todo);

    setForm({
      title: todo.title,
      description: todo.description,
    });
  };

  // UPDATE TODO
  const handleUpdate = async () => {
    try {
      await updateTodo(selectedTodo._id, form);

      toast.success("Todo updated");

      setEditMode(false);
      setSelectedTodo(null);
      setForm({ title: "", description: "" });

      fetchTodos();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // TOGGLE COMPLETE
  const handleToggle = async (todo) => {
    try {
      await updateTodo(todo._id, {
        completed: !todo.completed,
      });

      fetchTodos();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* NAVBAR */}
      <div className="navbar">
        <h2>Todo Manager</h2>

        <div className="nav-right">
          <span>Welcome {user}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="container">

        {/* CREATE / UPDATE FORM */}
        <div className="todo-form">

          <h3>
            {editMode ? "Update Todo" : "Create Todo"}
          </h3>

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <button
            onClick={
              editMode
                ? handleUpdate
                : handleCreate
            }
          >
            {editMode
              ? "Update Todo"
              : "Add Todo"}
          </button>

        </div>

        {/* TODO LIST */}
        <div className="todo-list">

          <h3>Your Todos</h3>

          {todos.length === 0 && (
            <p>No todos found</p>
          )}

          {todos.map((todo) => (
            <div
              key={todo._id}
              className="todo-card"
            >

              <div>
                <h4
                  style={{
                    textDecoration:
                      todo.completed
                        ? "line-through"
                        : "none",
                  }}
                >
                  {todo.title}
                </h4>

                <p>{todo.description}</p>
              </div>

              <div className="actions">

                <button
                  onClick={() =>
                    handleToggle(todo)
                  }
                >
                  {todo.completed
                    ? "Undo"
                    : "Done"}
                </button>

                <button
                  onClick={() =>
                    handleEditClick(todo)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(todo._id)
                  }
                  style={{
                    background: "red",
                  }}
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;