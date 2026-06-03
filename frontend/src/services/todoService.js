import API from "../api/axios";

// GET TODOS
export const getTodos = async () => {
  return await API.get("/todos/getTodo", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

// CREATE TODO
export const createTodo = async (data) => {
  return await API.post("/todos/create", data, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

// UPDATE TODO
export const updateTodo = async (id, data) => {
  return await API.put(`/todos/update/${id}`, data, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

// DELETE TODO
export const deleteTodo = async (id) => {
  return await API.delete(`/todos/delete/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};