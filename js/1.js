var tasks = [];

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value;

  if (taskText !== "") {
    tasks.push({
      text: taskText,
      done: false
    });

    taskInput.value = "";
    renderTasks();
    saveTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  saveTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
  saveTasks();

  // Добавляем зачеркивание для span
  var taskText = document.querySelectorAll("li span")[index];
  if (tasks[index].done) {
    taskText.style.textDecoration = "line-through";
  } else {
    taskText.style.textDecoration = "none";
  }
}

function deleteAllTasks() {
  tasks = [];
  renderTasks();
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    var listItem = document.createElement("li");

    if (task.done) {
      listItem.classList.add("task-done");
    }

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener(
      "change",
      (function(index) {
        return function() {
          toggleDone(index);
        };
      })(i)
    );

    var taskText = document.createElement("span");
    taskText.innerHTML = task.text;

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Удалить";
    deleteButton.addEventListener(
      "click",
      (function(index) {
        return function() {
          deleteTask(index);
        };
      })(i)
    );

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  }
}

window.onload = function() {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
  }
};
