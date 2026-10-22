import { Task, TaskStatus, addTask, filterByStatus, advanceTask, deleteTask } from "./model.js";

let tasks: Task[] = [];
let currentFilter: "all" | TaskStatus = "all";

const titleInput = document.getElementById("title") as HTMLInputElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const listEl = document.getElementById("list") as HTMLUListElement;
const filterChips = document.querySelectorAll(".chip");

function render(): void {
  listEl.innerHTML = "";

  const visibleTasks = currentFilter === "all" 
    ? tasks 
    : filterByStatus(tasks, currentFilter);

  visibleTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";
    li.innerHTML = `
      <span>${task.title}</span>
      <div>
        <span class="badge ${task.status}">${task.status}</span>
        <span class="actions">
          <button class="btn-advance" data-id="${task.id}">Advance →</button>
          <button class="btn-delete" data-id="${task.id}">✕</button>
        </span>
      </div>
    `;
    listEl.appendChild(li);
  });
}

addBtn.onclick = () => {
  const title = titleInput.value.trim();
  if (!title) return;
  tasks = addTask(tasks, title);
  titleInput.value = "";
  render();
};

listEl.onclick = (e) => {
  const target = e.target as HTMLElement;
  const id = Number(target.getAttribute("data-id"));
  if (!id) return;

  if (target.classList.contains("btn-advance")) {
    tasks = advanceTask(tasks, id);
    render();
  } else if (target.classList.contains("btn-delete")) {
    tasks = deleteTask(tasks, id);
    render();
  }
};

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    currentFilter = (chip.getAttribute("data-status") as "all" | TaskStatus);
    render();
  });
});

render();