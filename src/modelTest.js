import { Task, Project, ProjectList } from './model.js';
// remove init() from model.js first

const t = new Task('hello', 'hello', 'high', new Date(), false);
//console.log(Task.fromJSON(JSON.stringify(t.toJSONObj())));

const p = new Project('p1');
p.tasks.push(t);
//console.log(Project.fromJSON(JSON.stringify(p.toJSONObj())));

const pl = new ProjectList();
pl.projects.push(p);
//console.dir(JSON.parse(JSON.stringify(pl.toJSONObj())), {depth: null});
console.dir(ProjectList.fromJSON(JSON.stringify(pl.toJSONObj())), {depth: null});