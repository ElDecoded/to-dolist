const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const progressText = document.getElementById("progressText");
const darkToggle = document.getElementById("darkToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.onclick = addTask;

taskInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text: text, completed: false });
  taskInput.value = "";
  saveAndRender();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");
    if (task.completed) checkbox.classList.add("checked");

    checkbox.onclick = function() {
      tasks[index].completed = !tasks[index].completed;
      saveAndRender();
    };

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function() {
      tasks.splice(index, 1);
      saveAndRender();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const completed = tasks.filter(t => t.completed).length;
  progressText.textContent = `${completed} / ${tasks.length} Completed`;
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

darkToggle.onclick = function() {
  document.body.classList.toggle("dark");
};
