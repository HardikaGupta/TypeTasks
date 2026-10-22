export function addTask(tasks, title) {
    const maxId = tasks.reduce((max, t) => (t.id > max ? t.id : max), 0);
    return [...tasks, { id: maxId + 1, title, status: "todo" }];
}
export function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
export function advanceTask(tasks, id) {
    return tasks.map((t) => {
        if (t.id !== id)
            return t;
        const nextStatus = {
            "todo": "in-progress",
            "in-progress": "done",
            "done": "done",
        };
        return { ...t, status: nextStatus[t.status] };
    });
}
export function deleteTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
}
