export class Task {
    constructor(title, description, priority, dueDate, checked) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.checked = checked;
    }
}

export class Project {
    constructor(title, uuid) {
        this.title = title;
        this.uuid = uuid;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(task) {
        this.tasks = this.tasks.filter(t => t.uuid !== task.uuid);
    }

    editTask(task) {
        const t = this.tasks.findIndex(t => t.uuid === task.uuid);
        this.tasks[t] = task;
    }
}

export class ProjectList {
    constructor() {
        this.projects = [];
        this.selectedProject = null;
    }
}

