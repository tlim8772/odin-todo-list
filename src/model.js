export class Task {
    constructor(title, description, priority, dueDate, checked) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.checked = checked;
    }

    toJSONObj() {
        return this;
    }
}

export class Project {
    constructor(title, uuid) {
        this.title = title;
        this.uuid = uuid;
        this.tasks = [];
    }

    toJSONObj() {
        return {
            title: this.title,
            uuid: this.uuid,
            tasks: this.tasks,
        }
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
    }

    toJSONObj() {
        return this.projects.map(p => p.toJSONObj());
    }

    addProject(p) {
        this.projects.push(p);
        console.log(this);
    }

    deleteProject(p) {
        this.projects = this.projects.filter(proj => proj !== p);
        console.log(this);
    }
}

export let selectedProject = null;
export let projectList = new ProjectList();

export function getSelectedProject() {
    return projectsList.querySelector('.selected');
}

export function setSelectedProject(proj) {
    selectedProject = proj;
}


