import "./styles/general.css";
import "./styles/sidebar.css";
import "./styles/createForm.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import toggleDown from "./images/chevron-down.svg";
import toggleRight from "./images/chevron-right.svg";

const projects = [];

const defaultProject = new Project("default");
projects.push(defaultProject);
const todo1 = new Todo("Wash dishes", "dajshd", new Date(), 2);
const todo2 = new Todo("Play with cats", "hahahah", new Date(), 1);
defaultProject.addTodo(todo1);
defaultProject.addTodo(todo2);


const toggleProject = document.querySelector(".toggle-project");
const toggleIcon = document.querySelector(".toggle-project img");
let toggleOpen = true;
viewAllProject();

toggleProject.addEventListener("click", () => {
  if (toggleOpen) {
    toggleIcon.src = toggleRight;
    hideProject();
    toggleOpen = false;
  }
  else {
    toggleIcon.src = toggleDown;
    viewAllProject();
    toggleOpen = true;
  }
});

let isAddProjectFormOpen = false;
const openAddProjectForm = document.querySelector(".add-project");
const addProjectFormContainer = document.querySelector(".add-project-container");
openAddProjectForm.addEventListener("click", () => {
  addProjectFormContainer.classList.add("display");
  isAddProjectFormOpen = true; 
});

const cancelProjectButton = document.querySelector(".cancel-project-button");
cancelProjectButton.addEventListener("click", () => {
  addProjectFormContainer.classList.remove("display");
  isAddProjectFormOpen = false;
});

const addProjectForm = document.querySelector("#add-project-form");
addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#project-name").value;
  const color = document.querySelector("#project-color").value;
  const project = new Project(name, color);
  projects.push(project);
  viewAllProject();
  addProjectFormContainer.classList.remove("display");
  isAddProjectFormOpen = false;
});

let isAddTaskFormOpen = false;
const openAddTaskForm = document.querySelector(".add-task");
const addTaskFormContainer = document.querySelector(".add-task-container");
openAddTaskForm.addEventListener("click", () => {
  addTaskFormContainer.classList.add("display");
  isAddTaskFormOpen = true;
});

const cancelTaskButton = document.querySelector(".cancel-task-button");
cancelTaskButton.addEventListener("click", () => {
  addTaskFormContainer.classList.remove("display");
  isAddTaskFormOpen = false;
});

window.addEventListener("keydown", (e) => {
  if (isAddProjectFormOpen && e.key === "Escape") {
    addProjectFormContainer.classList.remove("display");
    isAddProjectFormOpen = false;  
  }
  else if (isAddTaskFormOpen && e.key === "Escape") {
    addTaskFormContainer.classList.remove("display");
    isAddTaskFormOpen = false;  
  }
});

const prioritySelect = document.querySelector("#task-priority");
let oldChoice = "low";
prioritySelect.classList.add(`${oldChoice}-priority`);
prioritySelect.addEventListener("change", () => {
  prioritySelect.classList.remove(`${oldChoice}-priority`);
  prioritySelect.classList.add(`${prioritySelect.value}-priority`);
  oldChoice = prioritySelect.value;
});

function viewAllProject() {
  const container = document.querySelector(".view-projects");
  container.innerHTML = "";
  projects.forEach(project => {
    const html =
    `
      <div class="project-name"><span style="color: ${project.color}">#</span> ${project.name}</div>
    `;
    container.innerHTML += html;
  });
  toggleOpen = true;
  toggleIcon.src = toggleDown;
}

function hideProject() {
  const container = document.querySelector(".view-projects");
  container.innerHTML = "";
}