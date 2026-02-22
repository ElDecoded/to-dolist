const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const progressCount = document.getElementById("progressCount");
const addBtn = document.getElementById("addBtn");
const darkToggle = document.getElementById("darkToggle");

addBtn.onclick = addTask;

taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

window.onload = function() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => createTask(task.text, task.completed));

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }

  updateProgress();
};

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  createTask(text, false);
  saveTasks();
  updateProgress();
  taskInput.value = "";
}

function createTask(text, completed) {
  const li = document.createElement("li");

  const checkbox = document.createElement("div");
  checkbox.classList.add("checkbox");
  if (completed) checkbox.classList.add("checked");

  const span = document.createElement("span");
  span.textContent = text;
  span.classList.add("task-text");
  if (completed) span.classList.add("completed");

  checkbox.onclick = function() {
    checkbox.classList.toggle("checked");
    span.classList.toggle("completed");
    saveTasks();
    updateProgress();
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.querySelector(".checkbox").classList.contains("checked")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateProgress() {
  const tasks = document.querySelectorAll("#taskList li");
  const completed = document.querySelectorAll(".checkbox.checked");

  progressCount.textContent = `${completed.length} / ${tasks.length} Completed`;
}

darkToggle.onclick = function() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
};
