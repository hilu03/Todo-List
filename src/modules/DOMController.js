import toggleDown from "../images/chevron-down.svg";
import toggleRight from "../images/chevron-right.svg";
import deleteIcon from "../images/delete.svg";
import completeIcon from "../images/check-outline.svg";
import editIcon from "../images/pencil-outline.svg";
import { Project, projects } from "./project.js";
import { Todo } from "./todo.js";

export function DisplayController() {
  const toggleProject = document.querySelector(".toggle-project");
  const toggleIcon = document.querySelector(".toggle-project img");
  let toggleOpen = true;
  let isAddProjectFormOpen = false;
  let isAddTaskFormOpen = false;

  const viewAllProject = () => {
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
  };
  
  const hideProject = () => {
    const container = document.querySelector(".view-projects");
    container.innerHTML = "";
  };

  viewAllProject();
  
  toggleProject.addEventListener("click", () => {
    if (!isAddTaskFormOpen && !isAddProjectFormOpen) {
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
    }
  });
  
  const openAddProjectForm = document.querySelector(".add-project");
  const addProjectFormContainer = document.querySelector(".add-project-container");
  openAddProjectForm.addEventListener("click", () => {
    if (!isAddTaskFormOpen && !isAddProjectFormOpen) {
      addProjectFormContainer.classList.add("display");
      isAddProjectFormOpen = true;   
    }
  });

  const closeAddProjectForm = () => {
    addProjectFormContainer.classList.remove("display");
    isAddProjectFormOpen = false;
  };
  
  const cancelProjectButton = document.querySelector(".cancel-project-button");
  cancelProjectButton.addEventListener("click", () => {
    closeAddProjectForm();
  });
  
  const addProjectForm = document.querySelector("#add-project-form");
  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#project-name").value;
    const color = document.querySelector("#project-color").value;
    const project = new Project(name, color);
    projects.push(project);
    viewAllProject();
    closeAddProjectForm();
  });

  const projectSelect = document.querySelector("#task-project");
  const displayAllProjectsToSelect = () => {
    let html = "";
    projects.forEach((project, index) => {
      html +=
      `
        <option value="${index}" style="color: ${project.color}"># ${project.name}</option>
      `;
    });
    projectSelect.innerHTML = html;
  };
  
  const openAddTaskForm = document.querySelector(".add-task");
  const addTaskFormContainer = document.querySelector(".add-task-container");
  openAddTaskForm.addEventListener("click", () => {
    if (!isAddTaskFormOpen && !isAddProjectFormOpen) {
      addTaskFormContainer.classList.add("display");
      isAddTaskFormOpen = true;
      displayAllProjectsToSelect();
    }
  });

  const closeAddTaskForm = () => {
    addTaskFormContainer.classList.remove("display");
    isAddTaskFormOpen = false;
  };

  const prioritySelect = document.querySelector("#task-priority");
  let oldChoice = "low";
  prioritySelect.classList.add(`${oldChoice}-priority`);
  prioritySelect.addEventListener("change", () => {
    prioritySelect.classList.remove(`${oldChoice}-priority`);
    prioritySelect.classList.add(`${prioritySelect.value}-priority`);
    oldChoice = prioritySelect.value;
  });

  projectSelect.addEventListener("change", () => {
    const index = Number(projectSelect.value);
    const color = projects[index].color;
    projectSelect.style.color = color;
  }); 
  
  const cancelTaskButton = document.querySelector(".cancel-task-button");
  cancelTaskButton.addEventListener("click", () => {
    closeAddTaskForm();
  });
  
  window.addEventListener("keydown", (e) => {
    if (isAddProjectFormOpen && e.key === "Escape") {
      closeAddProjectForm();
    }
    else if (isAddTaskFormOpen && e.key === "Escape") {
      closeAddTaskForm();
    }
  });

  const contentContainer = document.querySelector(".content-container");
  const displayAllTask = () => {
    let html = "";
    projects.forEach((project, projectIndex) => {
      project.todoList.forEach((task, taskIndex) => {
        console.log(taskIndex);
        html += 
        `
          <div class="task-card ${task.priority}-task">
            <div class="complete" data-task-id="${taskIndex}" data-project-id="${projectIndex}"></div>
            <div class="middle">
              <div class="title">${task.title}</div>
              <div class="due">${task.dueDate}</div>
              <div class="project">
                <span style="color: ${project.color}">#</span> ${project.name}
              </div> 
              <div class="description" data-task-id="${taskIndex}" data-project-id="${projectIndex}"></div>
            </div>
            <div class="right">
              <div class="more" data-task-id="${taskIndex}" data-project-id="${projectIndex}" data-toggle="less">
                <img src=${toggleRight}>
              </div>
              <div class="edit-container" data-task-id="${taskIndex}" data-project-id="${projectIndex}">
                <img src=${editIcon}>
              </div>
              <div class="delete-container" data-task-id="${taskIndex}" data-project-id="${projectIndex}">
                <img src=${deleteIcon}>
              </div>
            </div>
          </div>
        `;
      });
    });

    contentContainer.innerHTML = html;

    const expandTaskButtons = document.querySelectorAll(".more");
    expandTaskButtons.forEach(button => {
      button.addEventListener("click", () => {
        const projectIndex = Number(button.dataset.projectId);
        const taskIndex = Number(button.dataset.taskId);
        const description = document.querySelector(`.description[data-task-id="${taskIndex}"][data-project-id="${projectIndex}"]`);
        const icon = button.firstElementChild;
        const editButton = button.nextElementSibling;
        const deleteButton = editButton.nextElementSibling;
        if (button.dataset.toggle === "less") {
          description.textContent = projects[projectIndex].todoList[taskIndex].description;
          icon.src = toggleDown;
          button.dataset.toggle = "more"; 
          editButton.classList.add("display");
          deleteButton.classList.add("display");
        }
        else {
          description.textContent = "";
          icon.src = toggleRight;
          button.dataset.toggle = "less";
          editButton.classList.remove("display");
          deleteButton.classList.remove("display");
        }
      });
    });

  };

  displayAllTask();

  
  const addTaskForm = document.querySelector("#add-task-form");
  addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#task-title").value;
    const description = document.querySelector("#task-description").value;
    const due = document.querySelector("#task-due").value;
    const projectIndex = Number(document.querySelector("#task-project").value);
    const priority = document.querySelector("#task-priority").value;
    const task = new Todo(title, description, due, priority);
    projects[projectIndex].todoList.push(task);
    closeAddTaskForm();
    displayAllTask();
  });

}