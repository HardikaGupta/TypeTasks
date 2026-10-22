// model.ts
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export function addTask(tasks: Task[], title: string): Task[] {
  const maxId = tasks.reduce((max, t) => (t.id > max ? t.id : max), 0);
  return [...tasks, { id: maxId + 1, title, status: "todo" }];
}

export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}

export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

export function advanceTask(tasks: Task[], id: number): Task[] {
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

export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}