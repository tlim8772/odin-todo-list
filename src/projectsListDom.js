const projectsList = document.querySelector('.project-list');
const openAddProjectDialogButton = document.querySelector('.sidebar-header > button');
const addProjectModal = document.querySelector('.add-project-dialog');
const cancelAddProjectButton = document.querySelector('.cancel-add-project');
const confirmAddProjectButton = document.querySelector('.confirm-add-project');

const projectNodeTemplate = projectsList.children[0].cloneNode(true);
const editProjectModalTemplate = addProjectModal.cloneNode(true);

openAddProjectDialogButton.addEventListener('click', () => addProjectModal.showModal());
cancelAddProjectButton.addEventListener('click', () => addProjectModal.close())
confirmAddProjectButton.addEventListener('click', () => confirmAddProjectButtonFunc());

function clearSelectedProject() {
    const selectedProjects = projectsList.querySelectorAll('.selected');
    selectedProjects.forEach(elem => elem.classList.remove('selected'));
}

function createEditProjectModal() {
    const editProjectModal = editProjectModalTemplate.cloneNode(true);
    const cancelButton = editProjectModal.querySelector('.cancel-add-project');
    const confirmButton = editProjectModal.querySelector('.confirm-add-project');
    cancelButton.addEventListener('click', () => editProjectModal.close());

    return [editProjectModal, confirmButton];

}

function createProjectElem(title) {
    const newProjectNode = projectNodeTemplate.cloneNode(true);
    const editButton = newProjectNode.children[2];
    const deleteButton = newProjectNode.children[3];
    const [editProjectModal, confirmButton] = createEditProjectModal(title);

    newProjectNode.querySelector('.project-title').textContent = title;
    
    newProjectNode.addEventListener('click', (e) => {
        if (e.target !== newProjectNode) return;
        clearSelectedProject();
        newProjectNode.classList.add('selected');
    })
    
    editButton.addEventListener('click', () => {
        editProjectModal.children[1].value =  newProjectNode.querySelector('.project-title').textContent;
        editProjectModal.showModal();
    })
    
    deleteButton.addEventListener('click', () => newProjectNode.remove());
    
    confirmButton.addEventListener('click', () => {
        newProjectNode.querySelector('.project-title').textContent = editProjectModal.children[1].value;
        editProjectModal.close();
    });

    newProjectNode.append(editProjectModal);
    
    return newProjectNode;
}

function confirmAddProjectButtonFunc() {
    const title = addProjectModal.children[1].value;
    addProjectModal.children[1].value = '';
    projectsList.append(createProjectElem(title));
    addProjectModal.close();
}

function initProjectList() {
    projectsList.innerHTML = '';
    
    const DUMMY_PROJECTS = ['Daily', 'Weekly', 'Monthly'];
    const projectNodes = DUMMY_PROJECTS.map(title => createProjectElem(title));

    projectsList.append(...projectNodes);
    projectNodes[0].click();
}

initProjectList();