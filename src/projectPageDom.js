import { Task } from './model.js';
import { format } from 'date-fns';
import { makeFirstLetterCaps } from './utils.js';

export const projectsList = document.querySelector('.project-list');
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

export function getSelectedProject() {
    return projectsList.querySelector('.selected');
}

function createEditTaskModal() {
    const editTaskModal = editTaskModalTemplate.cloneNode(true);
    const cancelButton = editTaskModal.querySelector('.cancel-add-task');
    const confirmButton = editTaskModal.querySelector('.confirm-add-task');

    cancelButton.addEventListener('click', () => editTaskModal.close());

    return [editTaskModal, confirmButton];
}

function createTaskCard(task) {
    const newTaskNode = taskCardTemplate.cloneNode(true);
    const checkBox = newTaskNode.querySelector('.task-checkbox');
    
    const taskCardDataNode = newTaskNode.querySelector('.task-data');
    const titleNode = taskCardDataNode.querySelector('.task-card-title');
    const priorityNode = taskCardDataNode.querySelector('.task-card-priority');
    const dueDateNode = taskCardDataNode.querySelector('.task-card-due-date');
    
    const expandButton = newTaskNode.children[2];
    const editButton = newTaskNode.children[3];
    const deleteButton = newTaskNode.children[4];

    const [editTaskModal, confirmButton] = createEditTaskModal();

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

    editButton.addEventListener('click', () => {
        const title = editTaskModal.children[1];
        const description = editTaskModal.children[3];
        const dueDate = editTaskModal.children[5];
        const priority = editTaskModal.children[7];

        title.value = task.title;
        description.value = task.description;
        dueDate.value = format(task.dueDate, 'yyyy-MM-dd');
        priority.value = task.priority;

        editTaskModal.showModal();
    })

    deleteButton.addEventListener('click', () => {
        newTaskNode.remove();
    });

    confirmButton.addEventListener('click', () => {
        const title = editTaskModal.children[1];
        const description = editTaskModal.children[3];
        const dueDate = editTaskModal.children[5];
        const priority = editTaskModal.children[7];

        task.title = title.value;
        task.description = description.value;
        task.dueDate = new Date(dueDate.value);
        task.priority = priority.value;

        titleNode.textContent = task.title;
        
        if (taskCardDataNode.children.length > 1) {
            taskCardDataNode.children[1].textContent = task.description;
        }

        priorityNode.textContent = makeFirstLetterCaps(task.priority);
        priorityNode.classList.remove('high', 'med', 'low');
        priorityNode.classList.add(task.priority);

        dueDateNode.textContent = `By: ${format(task.dueDate, 'yyyy-MM-dd')}`;

        editTaskModal.close();
    })

    newTaskNode.append(editTaskModal);

    return newTaskNode;
}  

function confirmAddTaskModalButtonFunc() {
    const title = addTaskModal.children[1].value;
    const description = addTaskModal.children[3].value;
    const dueDate = new Date(addTaskModal.children[5].value);
    const priority = addTaskModal.children[7].value;

    tasksList.append(createTaskCard(new Task(title, description, priority, dueDate, false)));
    addTaskModal.close();
}

function rerender(tasklist) {
    tasksList.innerHTML = '';
    const taskElems = tasklist.map(task => createTaskCard(task));
    tasksList.append(...taskElems);
}


const tasklist = [
    new Task(
        'task 1',
        'hello lorem ipsunm',
        'high',
        new Date(),
        false,
    ),
    new Task(
        'task 2',
        'hello lorem ipsunm tas 2',
        'high',
        new Date(),
        true,
    )
]
rerender(tasklist);