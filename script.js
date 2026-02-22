const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoalBtn");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const goalSelect = document.getElementById("goalSelect");
const goalsContainer = document.getElementById("goalsContainer");
const darkToggle = document.getElementById("darkToggle");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

renderGoals();

addGoalBtn.onclick = function() {
  const text = goalInput.value.trim();
  if (!text) return;

  goals.push({ title: text, tasks: [] });
  goalInput.value = "";
  saveAndRender();
};

addTaskBtn.onclick = function() {
  const text = taskInput.value.trim();
  const goalIndex = goalSelect.value;

  if (!text || goalIndex === "") return;

  goals[goalIndex].tasks.push({ text, completed: false });
  taskInput.value = "";
  saveAndRender();
};

function renderGoals() {
  goalsContainer.innerHTML = "";
  goalSelect.innerHTML = "<option value=''>Select Goal</option>";

  goals.forEach((goal, index) => {
    goalSelect.innerHTML += `<option value="${index}">${goal.title}</option>`;

    const goalDiv = document.createElement("div");
    goalDiv.classList.add("goal");

    const completedCount = goal.tasks.filter(t => t.completed).length;

    goalDiv.innerHTML = `
      <div class="goal-title">${goal.title}</div>
      <div class="progress">${completedCount} / ${goal.tasks.length} Completed</div>
    `;

    goal.tasks.forEach((task, taskIndex) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      const checkbox = document.createElement("div");
      checkbox.classList.add("checkbox");
      if (task.completed) checkbox.classList.add("checked");

      const span = document.createElement("span");
      span.textContent = task.text;
      span.classList.add("task-text");
      if (task.completed) span.classList.add("completed");

      checkbox.onclick = function() {
        goals[index].tasks[taskIndex].completed = 
          !goals[index].tasks[taskIndex].completed;
        saveAndRender();
      };

      const deleteBtn = document.createElement("span");
      deleteBtn.textContent = "✕";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = function() {
        goals[index].tasks.splice(taskIndex, 1);
        saveAndRender();
      };

      taskDiv.appendChild(checkbox);
      taskDiv.appendChild(span);
      taskDiv.appendChild(deleteBtn);

      goalDiv.appendChild(taskDiv);
    });

    goalsContainer.appendChild(goalDiv);
  });
}

function saveAndRender() {
  localStorage.setItem("goals", JSON.stringify(goals));
  renderGoals();
}

darkToggle.onclick = function() {
  document.body.classList.toggle("dark");
};
