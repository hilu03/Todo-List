import toggleDown from "../images/chevron-down.svg";
import toggleRight from "../images/chevron-right.svg";
import deleteIcon from "../images/delete.svg";
import editIcon from "../images/pencil-outline.svg";
import completeIcon from "../images/check-outline.svg";
import { projects } from "./project.js";
import { compareAsc } from "date-fns";


export function MainContentDOM() {
  const contentContainer = document.querySelector(".content-container");
  const updateDivContainer = document.querySelector(".update-task-container");

  const renderOneTask = (projectIndex, taskIndex) => {
    const project = projects[projectIndex];
    const task = project.todoList[taskIndex];
    const html = 
    `
      <div class="task-card ${task.priority}-task">
        <div class="complete ${task.complete? "completed": ""}" data-task-id="${taskIndex}" data-project-id="${projectIndex}"></div>
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
    return html;
  };

  const reloadContent = () => {
    const choosing = document.querySelector(".choose");
    if (choosing.classList.contains("all-task")) {
      displayAllTask();
    }
    else if (choosing.classList.contains("completed-tasks")) {
      displayCompletedTasks();
    }
    else if (choosing.classList.contains("today-task")) {
      getTodayTasks();
    }
    else if (choosing.classList.contains("overdue-task")) {
      getOverdueTasks();
    }
    else if (choosing.classList.contains("upcoming-task")) {
      getUpcomingTasks();
    }
    else if (choosing.classList.contains("project-name")) {
      const projectIndex = Number(choosing.dataset.projectId);
      displayTasksInProject(projectIndex);
    }
  };

  const completeTask = () => {
    const completeButtons = document.querySelectorAll(".complete");
    completeButtons.forEach(button => {
      button.addEventListener("click", () => {
        if (!anySidebarFormOpen() && !anyUpdateFormOpen()) {
          const taskIndex = Number(button.dataset.taskId);
          const projectIndex = Number(button.dataset.projectId);
          projects[projectIndex].todoList[taskIndex].completeTodo();
          reloadContent();
          button.classList.add("completed");
        }
      });
    });
  };

  const displayUnfinishedTasks = () => {
    let html = `<div class="task-container">`;
    projects.forEach((project, projectIndex) => {
      const taskList = project.todoList;
      taskList.filter(todo => !todo.complete).forEach((task) => {
        html += renderOneTask(projectIndex, taskList.indexOf(task));
      });
    });
    html += "</div>"
    contentContainer.innerHTML = html;
  };


  const expandTaskEvent = () => {
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

  const deleteTask = () => {
    const deleteContainers = document.querySelectorAll(".delete-container");
    deleteContainers.forEach(deleteContainer => {
      const deleteButton = deleteContainer.firstElementChild;
      deleteButton.addEventListener("click", () => {
        const isAddProjectFormOpen = document.querySelector(".add-project-container").classList.contains("display");
        const isAddTaskFormOpen = document.querySelector(".add-task-container").classList.contains("display");
        if (!isAddProjectFormOpen && !isAddTaskFormOpen && !anyUpdateFormOpen()) {
          const projectIndex = Number(deleteContainer.dataset.projectId);
          const taskIndex = Number(deleteContainer.dataset.taskId);
          projects[projectIndex].todoList.splice(taskIndex, 1);
          const choosingTab = document.querySelector(".choose");
          if (choosingTab.classList.contains("completed-tasks")) {
            displayCompletedTasks();
          }
          else {
            displayAllTask();  
          }
        }
      });
    });
  };

  const closeUpdateForm = () => {
    updateDivContainer.classList.remove("display");
  };

  const anyUpdateFormOpen = () => updateDivContainer.classList.contains("display");

  const updateTask = () => {
    const updateTaskForm = document.querySelector("#update-task-form");
    updateTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const projectIndex = Number(updateTaskForm.dataset.projectId);
      const taskIndex = Number(updateTaskForm.dataset.taskId);
      const title = document.querySelector("#update-task-title").value;
      const description = document.querySelector("#update-task-description").value;
      const dueDate = document.querySelector("#update-task-due").value;
      const priority = document.querySelector("#update-task-priority").value;
  
      projects[projectIndex].todoList[taskIndex].updateTodo(title, description, dueDate, priority);
      closeUpdateForm();
      reloadContent();
    });
  };

  const anySidebarFormOpen = () => {
    const isAddProjectFormOpen = document.querySelector(".add-project-container").classList.contains("display");
    const isAddTaskFormOpen = document.querySelector(".add-task-container").classList.contains("display");
    const isUpdateProjectFormOpen = document.querySelector(".update-project-container").classList.contains("display");
    return isAddProjectFormOpen && isAddTaskFormOpen && isUpdateProjectFormOpen;
  }

  const updateTaskForm = () => {
    const editContainers = document.querySelectorAll(".edit-container");
    editContainers.forEach(editContainer => {
      const editButton = editContainer.firstElementChild;
      editButton.addEventListener("click", () => {
        if (!anySidebarFormOpen() && !anyUpdateFormOpen()) {
          const projectIndex = Number(editContainer.dataset.projectId);
          const taskIndex = Number(editContainer.dataset.taskId);
          const task = projects[projectIndex].todoList[taskIndex];
          const html = 
          `
            <h2>Update your task</h2>
            <form action="#" id="update-task-form" data-task-id="${taskIndex}" data-project-id="${projectIndex}">
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
              <div class="update-task-project">
                <strong>Project: </strong>
                <span style="color: ${projects[projectIndex].color}">
                  #${projects[projectIndex].name}
                </span>
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
          updateDivContainer.innerHTML = html; 
          updateDivContainer.classList.add("display");
  
          const prioritySelect = document.querySelector("#update-task-priority");
          let oldPriority = task.priority;
          prioritySelect.value = oldPriority;
          prioritySelect.classList.add(`${oldPriority}-priority`);
  
          prioritySelect.addEventListener("change", () => {
            prioritySelect.classList.remove(`${oldPriority}-priority`);
            prioritySelect.classList.add(`${prioritySelect.value}-priority`);
            oldPriority = prioritySelect.value;
          });
                              
          const cancelButtons = document.querySelectorAll(".cancel-update-task-button");
          cancelButtons.forEach(button => {
            button.addEventListener("click", () => {
              closeUpdateForm();
            });
          });  

          updateTask();
        }
      });
    });
  };

  const displayAllTask = () => {
    displayUnfinishedTasks();
    expandTaskEvent();
    deleteTask();
    updateTaskForm();
    completeTask();
  };

  const displayTasksInProject = (projectIndex) => {
    const project = projects[projectIndex];
    let html = 
    `
      <h2 style="color: ${project.color}">#${project.name}</h2>
      <div class="task-container">
    `;
    project.todoList.forEach((task, taskIndex) => {
      html += renderOneTask(projectIndex, taskIndex);
    });
    html += "</div>";
    contentContainer.innerHTML = html;

    addCompleteIcon();
    expandTaskEvent();
    deleteTask();
    updateTaskForm();
  };

  const addCompleteIcon = () => {
    const completeDivs = document.querySelectorAll(".completed");
    const html = `<img src=${completeIcon}>`;
    completeDivs.forEach(div => {
      div.innerHTML = html;
    });
  };

  const displayCompletedTasks = () => {
    let html = `<div class="task-container">`;
    projects.forEach((project, projectIndex) => {
      const taskList = project.todoList;
      taskList.filter(todo => todo.complete).forEach((task) => {
        html += renderOneTask(projectIndex, taskList.indexOf(task));
      });
    });
    html += "</div>";
    contentContainer.innerHTML = html;
    
    addCompleteIcon();
    expandTaskEvent();
    deleteTask();
    updateTaskForm();
  };

  const compareDateWithToday = todo => {
    const dueDate = new Date(todo.dueDate).toDateString();
    return compareAsc(new Date().toDateString(), dueDate);
  };

  const getTodayTasks = () => {
    let html = `<div class="task-container">`;
    projects.forEach((project, projectIndex) => {
      const taskList = project.todoList;
      taskList.filter(todo => !todo.complete && compareDateWithToday(todo) === 0).forEach((task) => {
        html += renderOneTask(projectIndex, taskList.indexOf(task));
      });
    });
    html += "</div>";

    contentContainer.innerHTML = html;

    expandTaskEvent();
    deleteTask();
    updateTaskForm();
    completeTask();
  };

  const getOverdueTasks = () => {
    let html = `<div class="task-container">`;
    projects.forEach((project, projectIndex) => {
      const taskList = project.todoList;
      taskList.filter(todo => !todo.complete && compareDateWithToday(todo) === 1).forEach((task) => {
        html += renderOneTask(projectIndex, taskList.indexOf(task));
      });
    });
    html += "</div>";

    contentContainer.innerHTML = html;

    expandTaskEvent();
    deleteTask();
    updateTaskForm();
    completeTask();
  };

  const getUpcomingTasks = () => {
    let html = `<div class="task-container">`;
    projects.forEach((project, projectIndex) => {
      const taskList = project.todoList;
      taskList.filter(todo => !todo.complete && compareDateWithToday(todo) !== 1).forEach((task) => {
        html += renderOneTask(projectIndex, taskList.indexOf(task));
      });
    });
    html += "</div>";

    contentContainer.innerHTML = html;

    expandTaskEvent();
    deleteTask();
    updateTaskForm();
    completeTask();
  };

  return { displayAllTask, anyUpdateFormOpen, closeUpdateForm, displayTasksInProject,
           displayCompletedTasks, getTodayTasks, getOverdueTasks, getUpcomingTasks };
}