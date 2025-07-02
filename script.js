// Load tasks from localStorage on page load
window.onload = () => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    document.getElementById("taskList").innerHTML = saved;
    // Re-attach event handlers
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
      checkbox.addEventListener("change", toggleTask);
    });
    document.querySelectorAll(".deleteBtn").forEach(btn => {
      btn.addEventListener("click", deleteTask);
    });
  }
};

function addTask() {
  const taskText = document.getElementById("taskInput").value.trim();
  const dueDate = document.getElementById("dueDate").value;

  if (taskText === "") {
    alert("Enter a task!");
    return;
  }

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", toggleTask);

  const span = document.createElement("span");
  span.textContent = taskText;

  const due = document.createElement("span");
  due.className = "due";
  due.textContent = dueDate ? `Due: ${dueDate}` : "";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "deleteBtn";
  deleteBtn.addEventListener("click", deleteTask);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(due);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
  saveTasks();

  // Reset input
  document.getElementById("taskInput").value = "";
  document.getElementById("dueDate").value = "";
}

function toggleTask(e) {
  const li = e.target.parentElement;
  li.classList.toggle("completed");
  saveTasks();
}

function deleteTask(e) {
  e.target.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const listHTML = document.getElementById("taskList").innerHTML;
  localStorage.setItem("tasks", listHTML);
}
