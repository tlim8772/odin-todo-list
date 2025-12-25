const projectsList = document.querySelector('.project-list');
const openAddProjectDialogButton = document.querySelector('.sidebar-header > button');
const addProjectModal = document.querySelector('.add-project-dialog');
const cancelAddProjectButton = document.querySelector('.cancel-add-project');
const confirmAddProjectButton = document.querySelector('.confirm-add-project');

openAddProjectDialogButton.addEventListener('click', () => addProjectModal.showModal());
cancelAddProjectButton.addEventListener('click', () => addProjectModal.close())
