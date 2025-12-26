export const LOCALSTORAGE_KEY = 'odin-todolist';

export class Task {
    constructor(title, description, priority, dueDate, checked) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.checked = checked;
    }

    static fromJSON(json) {
        if (typeof json === 'string') json = JSON.parse(json);
        return new Task(json.title, json.description, json.priority, json.dueDate, json.checked);
    }

    toJSONObj() {
        return {
            title: this.title,
            description: this.description,
            priority: this.priority,
            dueDate: format(this.dueDate, 'yyyy-MM-dd'),
            checked: this.checked,
        }
    }
}

export class Project {
    constructor(title, uuid) {
        this.title = title;
        this.uuid = uuid;
        this.tasks = [];
    }

    static fromJSON(json) {
        if (typeof json === 'string') json = JSON.parse(json);
        const proj = new Project(json.title);
        proj.tasks = json.tasks.map(t => Task.fromJSON(t));
        return proj;
    }

    toJSONObj() {
        return {
            title: this.title,
            uuid: this.uuid,
            tasks: this.tasks.map(t => t.toJSONObj()),
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

    static fromJSON(json) {
        if (typeof json === 'string') json = JSON.parse(json);

        const projList = new ProjectList();
        projList.projects = json.projects.map(p => Project.fromJSON(p));
        return projList;
    }

    toJSONObj() {
        return {
            projects: this.projects.map(p => p.toJSONObj())
        };
    }

    addProject(p) {
        this.projects.push(p);
    }

    deleteProject(p) {
        this.projects = this.projects.filter(proj => proj !== p);
    }
}


export let selectedProject = null;
export let projectList = new ProjectList();

export function setSelectedProject(proj) {
    selectedProject = proj;
}

function saveData() {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(projectList.toJSONObj()));
}

function loadData() {
    const json = localStorage.getItem(LOCALSTORAGE_KEY);
    console.log(json);
    
    if (json == null) {
        projectList = new ProjectList();
        projectList.projects = [new Project('Daily')];
        return;
    }
    projectList = ProjectList.fromJSON(json);
}

function init() {
    loadData();
    window.addEventListener('beforeunload', saveData);
}

init();

