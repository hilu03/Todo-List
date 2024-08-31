import toggleDown from "../images/chevron-down.svg";
import toggleRight from "../images/chevron-right.svg";
import deleteIcon from "../images/delete.svg";
import completeIcon from "../images/check-outline.svg";
import editIcon from "../images/pencil-outline.svg";
import { projects } from "./project.js";
import { Todo } from "./todo.js";


export function MainContentDOM() {
  const contentContainer = document.querySelector(".content-container");
  const displayAllTask = () => {
    const displayTasks = () => {
      let html = "";
      projects.forEach((project, projectIndex) => {
        project.todoList.forEach((task, taskIndex) => {
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
    };

    displayTasks();

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

    const deleteContainers = document.querySelectorAll(".delete-container");
    deleteContainers.forEach(deleteContainer => {
      const deleteButton = deleteContainer.firstElementChild;
      deleteButton.addEventListener("click", () => {
        const projectIndex = Number(deleteContainer.dataset.projectId);
        const taskIndex = Number(deleteContainer.dataset.taskId);
        projects[projectIndex].todoList.splice(taskIndex, 1);
        displayAllTask();
      });
    });

    
  
  };

  return { displayAllTask };
}