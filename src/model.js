export class Task {
    constructor(uuid, title, description, priority, dueDate, checked) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.checked = checked;
    }
}

export class TaskList {
    constructor() {
        this.tasks = [];
    }
}

export class Project {
    constructor(uuid, title) {
        this.uuid = uuid;
        this.title = title;
    }
}

export class ProjectList {
    constructor() {
        this.projects = [];
        this.selectedProject = null;
    }
}