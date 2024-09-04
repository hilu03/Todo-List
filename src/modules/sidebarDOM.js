import toggleDown from "../images/chevron-down.svg";
import toggleRight from "../images/chevron-right.svg";
import deleteIcon from "../images/delete.svg";
import editIcon from "../images/pencil-outline.svg";
import { Project, projects } from "./project.js";
import { Todo } from "./todo.js";
import { MainContentDOM } from "./mainContentDOM.js";


export function sidebarDOM() {
  const toggleProject = document.querySelector(".toggle-project");
  const toggleIcon = document.querySelector(".toggle-project img");
  let toggleOpen = true;
  let isAddProjectFormOpen = false;
  let isAddTaskFormOpen = false;
  let isUpdatingProjectFormOpen = false;
  let choosing = "all-task";
  let projectIndexChoosingTab = -1;
  const contentDisplay = MainContentDOM();

  const viewTaskInProject = () => {
    const projectDivs = document.querySelectorAll(".project-name");
    projectDivs.forEach(project => {
      project.addEventListener("click", () => {
        if (!isAddTaskFormOpen && !isAddProjectFormOpen 
          && !contentDisplay.anyUpdateFormOpen()
          && !isUpdatingProjectFormOpen) 
        {
          const projectIndex = Number(project.dataset.projectId);
          contentDisplay.displayTasksInProject(projectIndex);
          document.querySelector(`.${choosing}`).classList.remove("choose");
          project.classList.add("choose");
          choosing = "project-name";
          projectIndexChoosingTab = projectIndex;
        }
      });
    });
  };

  const reloadContent = () => {
    if (choosing === "all-task") {
      contentDisplay.displayAllTask();
    }
    else if (choosing === "completed-tasks") {
      contentDisplay.displayCompletedTasks();
    }
    else if (choosing === "project-name" && projectIndexChoosingTab === projectIndex) {
      contentDisplay.displayAllTask();
      changeTabChoosing("all-task");
    }
    else if (choosing === "today-task") {
      contentDisplay.getTodayTasks();
      changeTabChoosing("today-task");
    }
    else if (choosing === "overdue-task") {
      contentDisplay.getOverdueTasks();
      changeTabChoosing("overdue-task");
    }
  };

  const deleteProjects = () => {
    const deleteProjectContainers = document.querySelectorAll(".delete-project-container");
    deleteProjectContainers.forEach(container => {
      const deleteButton = container.firstElementChild;
      deleteButton.addEventListener("click", () => {
        if (!isAddTaskFormOpen && !isAddProjectFormOpen 
          && !contentDisplay.anyUpdateFormOpen()
          && !isUpdatingProjectFormOpen) 
        {
          const projectIndex = Number(container.dataset.projectId);
          projects.splice(projectIndex, 1);
          viewAllProject();
          reloadContent();
        }
      });
    });  
  };

  const updateProjectFormContainer = document.querySelector(".update-project-container");
  const updateProjects = () => {
    const updateProjectContainers = document.querySelectorAll(".edit-project-container");
    updateProjectContainers.forEach(container => {
      const updateButton = container.firstElementChild;
      updateButton.addEventListener("click", () => {
        if (!isAddTaskFormOpen && !isAddProjectFormOpen 
          && !contentDisplay.anyUpdateFormOpen()
          && !isUpdatingProjectFormOpen) 
        {
          const projectIndex = Number(container.dataset.projectId);
          const project = projects[projectIndex];
          const html = 
          `
            <h2>Update your project</h2>
            <form action="#" id="update-project-form" data-project-id="${projectIndex}">
              <div class="input-update-project-name">
                <label for="update-project-name">Project Name:</label>
                <input type="text" name="update-project-name" id="update-project-name" placeholder="E.g: Summer workout" required minlength="5" value="${project.name}">
              </div>
              <div class="input-update-project-color">
                <label for="update-project-color">Color:</label>
                <input type="color" id="update-project-color" value="${project.color}">
              </div>
              <div class="update-project-button-container">
                <button class="update-project-button" type="submit">Update</button>
                <button class="cancel-update-project-button" type="button">Cancel</button>
              </div>  
            </form>
          `;
          updateProjectFormContainer.innerHTML = html;
          updateProjectFormContainer.classList.add("display");
          isUpdatingProjectFormOpen = true;

          updateProject();
          cancelUpdate();
        }
      });
    });
  };

  const closeUpdateProjectForm = () => {
    updateProjectFormContainer.classList.remove("display");
    isUpdatingProjectFormOpen = false;
  };

  const cancelUpdate = () => {
    const cancelUpdateButton = document.querySelector(".cancel-update-project-button");
    cancelUpdateButton.addEventListener("click", () => {
      closeUpdateProjectForm();
    });
  };

  const updateProject = () => {
    const updateProjetcForm = document.querySelector("#update-project-form");
    updateProjetcForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.querySelector("#update-project-name").value;
      const color = document.querySelector("#update-project-color").value;
      const projectIndex = Number(updateProjetcForm.dataset.projectId);
      projects[projectIndex].updateProject(name, color);
      closeUpdateProjectForm();
      viewAllProject();
      reloadContent();
    });
  };


  const viewAllProject = () => {
    const container = document.querySelector(".view-projects");
    container.innerHTML = "";
    projects.forEach((project, projectIndex) => {
      const html =
      `
        <div class="project-card">
          <div class="project-name" data-project-id="${projectIndex}" style="color: ${project.color}">
            #${project.name}
          </div>
          <div class="right-side">
            <div class="edit-project-container" data-project-id="${projectIndex}">
              <img src=${editIcon}>
            </div>
            <div class="delete-project-container" data-project-id="${projectIndex}">
              <img src=${deleteIcon}>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += html;
    });
    toggleOpen = true;
    toggleIcon.src = toggleDown;

    viewTaskInProject();
    updateProjects();
    deleteProjects();
  };

  const allTaskDiv = document.querySelector(".all-task");
  allTaskDiv.addEventListener("click", () => {
    if (!isAddTaskFormOpen && !isAddProjectFormOpen 
      && !contentDisplay.anyUpdateFormOpen()
      && !isUpdatingProjectFormOpen)
    {
      contentDisplay.displayAllTask();
      changeTabChoosing("all-task");
    }
  });

  const changeTabChoosing = (newTab) => {
    const choosingTab = document.querySelector(`.${choosing}`);
    if (choosingTab) {
      choosingTab.classList.remove("choose");
    }
    else {
      projectIndexChoosingTab = -1;
    }
    document.querySelector(`.${newTab}`).classList.add("choose");
    choosing = newTab;    
  };
  
  const completedTasks = document.querySelector(".completed-tasks");
  completedTasks.addEventListener("click", () => {
    if (!isAddTaskFormOpen && !isAddProjectFormOpen 
      && !contentDisplay.anyUpdateFormOpen()
      && !isUpdatingProjectFormOpen)
    {
      contentDisplay.displayCompletedTasks();
      changeTabChoosing("completed-tasks");
    }
  });

  const hideProject = () => {
    const container = document.querySelector(".view-projects");
    container.innerHTML = "";
  };

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
    if (!isAddTaskFormOpen && !isAddProjectFormOpen 
      && !contentDisplay.anyUpdateFormOpen()
      && !isUpdatingProjectFormOpen) 
    {
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
    projectSelect.style.color = projects[0].color;
  };
  
  const openAddTaskForm = document.querySelector(".add-task");
  const addTaskFormContainer = document.querySelector(".add-task-container");
  openAddTaskForm.addEventListener("click", () => {
    if (!isAddTaskFormOpen && !isAddProjectFormOpen 
      && !contentDisplay.anyUpdateFormOpen()
      && !isUpdatingProjectFormOpen) 
    {
      if (projects.length !== 0) {
        addTaskFormContainer.classList.add("display");
        isAddTaskFormOpen = true;
        displayAllProjectsToSelect();  
      }
      else {
        alert("Please create a project first!");
      }
    }
  });

  const closeAddTaskForm = () => {
    addTaskFormContainer.classList.remove("display");
    isAddTaskFormOpen = false;
  };

  const prioritySelect = document.querySelector("#task-priority");
  let oldPriority = "low";
  prioritySelect.classList.add(`${oldPriority}-priority`);
  prioritySelect.addEventListener("change", () => {
    prioritySelect.classList.remove(`${oldPriority}-priority`);
    prioritySelect.classList.add(`${prioritySelect.value}-priority`);
    oldPriority = prioritySelect.value;
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
    if (e.key === "Escape") {
      if (isAddProjectFormOpen) {
        closeAddProjectForm();
      }
      else if (isAddTaskFormOpen) {
        closeAddTaskForm();
      }
      else if (contentDisplay.anyUpdateFormOpen()) {
        contentDisplay.closeUpdateForm();
      }
      else if (isUpdatingProjectFormOpen) {
        closeUpdateProjectForm();
      }  
    }
  });

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
    contentDisplay.displayAllTask();
  });

  const displayDateInTodayIcon = () => {
    const todayIcon = document.querySelector(".today.icon-container");
    let date = new Date().getDate();
    if (date.length !== 2) {
      date = "0" + date;
    }
    const html = 
    `
      <div class="date">${date}</div>
    `;
    todayIcon.innerHTML += html;
  };
  displayDateInTodayIcon();

  const todayButton = document.querySelector(".today-task");
  todayButton.addEventListener("click", () => {
    contentDisplay.getTodayTasks();
    changeTabChoosing("today-task");
  });

  const overdueButton = document.querySelector(".overdue-task");
  overdueButton.addEventListener("click", () => {
    contentDisplay.getOverdueTasks();
    changeTabChoosing("overdue-task");
  });

  return { viewAllProject };
}