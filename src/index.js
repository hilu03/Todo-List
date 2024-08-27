import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import toggleDown from "./images/chevron-down.svg";
import toggleRight from "./images/chevron-right.svg";

const projects = [];

const defaultProject = new Project("default");
projects.push(defaultProject);

viewAllProject();
const toggleProject = document.querySelector(".toggle-project");
const toggleIcon = document.querySelector(".toggle-project img");
let toggleOpen = true;

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

function viewAllProject() {
  const container = document.querySelector(".view-projects");
  projects.forEach(project => {
    const html =
    `
      <div class="project-name"><span>#</span> ${project.name}</div>
    `;
    container.innerHTML += html;
    const projectColor = document.querySelector(`.project-name span:last-child`);
    projectColor.style.color = project.color;
  });
}

function hideProject() {
  const container = document.querySelector(".view-projects");
  container.innerHTML = "";
}
