import toggleDown from "../images/chevron-down.svg";
import toggleRight from "../images/chevron-right.svg";
import deleteIcon from "../images/delete.svg";
import completeIcon from "../images/check-outline.svg";
import editIcon from "../images/pencil-outline.svg";
import { projects, getAllProjectChoices } from "./project.js";
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

    const editContainers = document.querySelectorAll(".edit-container");
    editContainers.forEach(editContainer => {
      const editButton = editContainer.firstElementChild;
      editButton.addEventListener("click", () => {
        const projectIndex = Number(editContainer.dataset.projectId);
        const taskIndex = Number(editContainer.dataset.taskId);
        const task = projects[projectIndex].todoList[taskIndex];
        const html = 
        `
          <h2>Update your task</h2>
          <form action="#" id="update-task-form">
            <div class="input-update-task-title">
              <label for="update-task-title">Title:</label>
              <input type="text" name="update-task-title" id="update-task-title" required minlength="3" placeholder="E.g: Warm up" value="${task.title}">
            </div>
            <div class="input-update-task-description">
              <label for="update-task-description">Description:</label>
              <textarea name="update-task-description" id="update-task-description" rows="5">${task.description}</textarea>
            </div>
            <div class="input-update-task-due">
              <label for="update-task-due">Due date:</label>
              <input type="date" id="update-task-due" required value="${task.dueDate}">
            </div>
            <div class="input-update-task-project">
              <label for="update-task-project">Project:</label>
              <select id="update-task-project">
                ${getAllProjectChoices()}
              </select>
            </div>
            <div class="input-update-task-priority">
              <label for="update-task-priority">Priority:</label>
              <select id="update-task-priority">
                <option value="high" class="high-priority">High</option>
                <option value="medium" class="medium-priority">Medium</option>
                <option value="low" class="low-priority">Low</option>
              </select>
            </div>
            <div class="update-task-button-container">
              <button class="update-task-button" type="submit">Update</button>
              <button class="cancel-update-task-button" type="button">Cancel</button>
            </div>  
          </form>
        `;
        const container = document.querySelector(".update-task-container");
        container.innerHTML = html; 
        container.classList.add("display");

        const prioritySelect = document.querySelector("#update-task-priority");
        let oldPriority = task.priority;
        prioritySelect.value = oldPriority;
        prioritySelect.classList.add(`${oldPriority}-priority`);

        prioritySelect.addEventListener("change", () => {
          prioritySelect.classList.remove(`${oldPriority}-priority`);
          prioritySelect.classList.add(`${prioritySelect.value}-priority`);
          oldPriority = prioritySelect.value;
        });
        
        const projectSelect = document.querySelector("#update-task-project");
        document.querySelector(`#update-task-project option[value="${projectIndex}"]`).selected = "selected";
        projectSelect.style.color = projects[projectIndex].color;
        
        projectSelect.addEventListener("change", () => {
          const index = Number(projectSelect.value);
          const color = projects[index].color;
          projectSelect.style.color = color;
        });       
      });
    });
  
  };

  return { displayAllTask };
}