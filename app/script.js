import {TaskManager} from "./TaskManager.js";
import {api} from "./taskAPI.js";

const taskManager = new TaskManager();
const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoList = document.querySelector("#todo-list");
const filterBtns = document.querySelectorAll(".filter-btn");

// Initialisation
async function init() {
    const savedTasks = await api.loadTasks();
    savedTasks.forEach(taskData => {
        taskManager.addTask(taskData.text);
        if (taskData.completed) {
            taskManager.toggleTask(taskData.id);
        }
    });
}

// Mise à jour de l'interface utilisateur
taskManager.addListener(() => {
    const filter = document.querySelector(".filter-btn.active")?.dataset.filter || "all";
    const tasks = taskManager.filterTasks(filter);

    todoList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `todo-item ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${task.id})">✓</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;
        todoList.appendChild(li);
    });

    api.saveTasks(taskManager.tasks);
});

// Ajouter une tâche
addBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (text) {
        taskManager.addTask(text);
        todoInput.value = '';
    }
});

// Gestion des filtres
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        btn.classList.add("active");
        taskManager.notify();
    });
});

// Supprimer une tâche
window.deleteTask = (id) => {
    taskManager.removeTask(id);
};

// Marquer une tâche comme complétée
window.toggleTask = (id) => {
    taskManager.toggleTask(id);
};

// Charger les tâches au démarrage
init();
