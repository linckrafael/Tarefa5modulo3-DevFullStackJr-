const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
let editTodoId = null;

const todos = JSON.parse(localStorage.getItem("todos")) || [];
if (todos.length) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = input.value.trim();

  if (editTodoId) {
    updateTodo(editTodoId, todoText);
  } else {
    addTodoToList({ text: todoText });
  }

  input.value = "";
  editTodoId = null;
});

function addTodo(todo) {
  const todoEl = document.createElement("li");
  todoEl.innerText = todo.text;
  todoEl.classList.add(
    "list-group-item",
    "list-group-item-action",
    "list-group-item-secondary"
  );

  const successButton = document.createElement("button");
  successButton.innerText = "Sucesso";
  successButton.classList.add(
    "btn",
    "btn-outline-success",
    "btn-sm",
    "d-grid",
    "gap-2",
    "mx-auto"
  );
  successButton.addEventListener("click", () => {
    successTodo(todo.id);
  });

  const editButton = document.createElement("button");
  editButton.innerText = "Editar";
  editButton.classList.add(
    "btn",
    "btn-outline-secondary",
    "btn-sm",
    "d-grid",
    "gap-2",
    "mx-auto"
  );
  editButton.addEventListener("click", () => {
    input.value = todo.text;
    editTodoId = todo.id;
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Deletar";
  deleteButton.classList.add(
    "btn",
    "btn-outline-danger",
    "btn-sm",
    "d-grid",
    "gap-2",
    "mx-auto"
  );
  deleteButton.addEventListener("click", () => {
    deleteTodo(todo.id);
  });

  todoEl.appendChild(successButton);
  todoEl.appendChild(editButton);
  todoEl.appendChild(deleteButton);
  todosUL.appendChild(todoEl);
}

function successTodo(id) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos[todoIndex].text = "concluido";
  updateLS();
  renderTodos();
}

function updateTodo(id, text) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos[todoIndex].text = text;
  updateLS();
  renderTodos();
}

function deleteTodo(id) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos.splice(todoIndex, 1);
  updateLS();
  renderTodos();
}

function renderTodos() {
  todosUL.innerHTML = "";
  todos.forEach((todo) => addTodo(todo));
}

function updateLS() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToList(todo) {
  const newTodo = {
    id: Date.now(),
    text: todo.text,
    completed: false,
  };
  todos.push(newTodo);
  updateLS();
  addTodo(newTodo);
}
