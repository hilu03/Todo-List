import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import toggleDown from "./images/chevron-down.svg";
import toggleRight from "./images/chevron-right.svg";

const projects = [];

const defaultProject = new Project("default");
projects.push(defaultProject);

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

const openAddProjectForm = document.querySelector(".add-project");
const addProjectFormContainer = document.querySelector(".add-project-form");
openAddProjectForm.addEventListener("click", () => {
  addProjectFormContainer.classList.add("display");
});

const cancelButton = document.querySelector(".cancel-button");
cancelButton.addEventListener("click", () => {
  addProjectFormContainer.classList.remove("display");
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
