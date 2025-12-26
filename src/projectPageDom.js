import { Task } from './model.js';
import { format } from 'date-fns';

export const projectPageTitle = document.querySelector('.project-page-header > div:first-child');
const tasksList = document.querySelector('.task-list');
const addTaskButton = document.querySelector('.add-task-button');
const addTaskModal = document.querySelector('.add-task-dialog');
const cancelAddTaskModalButton = document.querySelector('.cancel-add-task');
const confirmAddTaskModalButton = document.querySelector('.confirm-add-task');

const taskCardTemplate = document.querySelector('.task-card').cloneNode(true);
const editTaskModalTemplate = addTaskModal.cloneNode(true);

addTaskButton.addEventListener('click', () => addTaskModal.showModal());
cancelAddTaskModalButton.addEventListener('click', () => addTaskModal.close());
confirmAddTaskModalButton.addEventListener('click', confirmAddTaskModalButtonFunc);

function createTaskCard(task) {
    function makeFirstLetterCaps(s) {
        return s[0].toUpperCase() + s.slice(1).toLowerCase();
    }
    
    const newTaskNode = taskCardTemplate.cloneNode(true);
    const checkBox = newTaskNode.querySelector('.task-checkbox');
    
    const taskCardDataNode = newTaskNode.querySelector('.task-data');
    const titleNode = taskCardDataNode.querySelector('.task-card-title');
    const priorityNode = taskCardDataNode.querySelector('.task-card-priority');
    const dueDateNode = taskCardDataNode.querySelector('.task-card-due-date');
    
    const expandButton = newTaskNode.children[2];
    const editButton = newTaskNode.children[3];
    const deleteButton = newTaskNode.children[4];

    newTaskNode.dataset.uuid = task.uuid;
    
    checkBox.checked = task.checked;
    
    titleNode.textContent = task.title;
    
    priorityNode.textContent = makeFirstLetterCaps(task.priority);
    priorityNode.classList.remove('high', 'med', 'low');
    priorityNode.classList.add(task.priority);

    dueDateNode.textContent = `By: ${format(task.dueDate, 'yyyy-MM-dd')}`;

    expandButton.addEventListener('click', () => {
        if (taskCardDataNode.children.length > 1) {
            taskCardDataNode.children[1].remove();
        } else {
            const div = document.createElement('div');
            div.textContent = task.description;
            taskCardDataNode.append(div);
        }
    })

    deleteButton.addEventListener('click', () => {
        newTaskNode.remove();
    });

    return newTaskNode;
}  

function confirmAddTaskModalButtonFunc() {
    const title = addTaskModal.children[1].value;
    const description = addTaskModal.children[3].value;
    const dueDate = new Date(addTaskModal.children[5].value);
    const priority = addTaskModal.children[7].value;

    //console.log(title, description, dueDate, priority);
    tasksList.append(createTaskCard(new Task('uuid', title, description, priority, dueDate, false)));
    addTaskModal.close();
}

tasksList.append(createTaskCard(new Task(
    crypto.randomUUID(), 
    'Task 1', 
    'Hello Loremipsum thsi is some random text', 
    'high', 
    new Date(), 
    true)));