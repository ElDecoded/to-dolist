const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks when page opens
window.onload = function() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => createTask(task.text, task.completed));
};

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  createTask(text, false);
  saveTasks();
  taskInput.value = "";
}

function createTask(text, completed) {
  const li = document.createElement("li");
  li.textContent = text;

  if (completed) li.classList.add("completed");

  li.addEventListener("click", function() {
    li.classList.toggle("completed");
    saveTasks();
  });

  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "✕";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    li.style.opacity = "0";
    li.style.transform = "translateX(50px)";
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 300);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
