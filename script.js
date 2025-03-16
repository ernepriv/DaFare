function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (taskText === "") return;
  
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" onchange="toggleTask(this)">
      <span>${taskText}</span>
      <button onclick="deleteTask(this)">Elimina</button>
    `;
    document.getElementById("taskList").appendChild(li);
    input.value = "";
    saveTasks();
  }
  
  function toggleTask(checkbox) {
    const task = checkbox.nextElementSibling;
    task.style.textDecoration = checkbox.checked ? "line-through" : "none";
    saveTasks();
  }
  
  function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
  }
  
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
      const text = li.querySelector("span").textContent;
      const completed = li.querySelector("input").checked;
      tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(this)">
        <span style="text-decoration: ${task.completed ? "line-through" : "none"}">${task.text}</span>
        <button onclick="deleteTask(this)">Elimina</button>
      `;
      document.getElementById("taskList").appendChild(li);
    });
  }
  
  window.onload = loadTasks;