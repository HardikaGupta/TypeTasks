// model.ts
// TypeTasks - Part 1 Model Implementation

// 1. TaskStatus Literal Union
type TaskStatus = "todo" | "in-progress" | "done";

// 2. Task Interface
interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

// 3. addTask Operation
// Derives the next ID dynamically from the existing array to prevent duplicate IDs
function addTask(tasks: Task[], title: string): Task[] {
  const maxId = tasks.reduce((max, t) => (t.id > max ? t.id : max), 0);
  const newTask: Task = {
    id: maxId + 1,
    title,
    status: "todo",
  };
  return [...tasks, newTask];
}

// 4. completeTask Operation
function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}

// 5. filterByStatus Operation
function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

// 6. Custom Operations (Required for Originality)
function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}

function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => {
    if (t.id !== id) return t;
    const nextStatus: Record<TaskStatus, TaskStatus> = {
      "todo": "in-progress",
      "in-progress": "done",
      "done": "done",
    };
    return { ...t, status: nextStatus[t.status] };
  });
}