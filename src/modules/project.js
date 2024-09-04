import { Todo } from "./todo.js";

export class Project {
  todoList = [];

  constructor(name, color = "#000000") {
    this.name = name;
    this.color = color;
  }

  addTodo(todo) {
    this.todoList.push(todo);
  }

  updateProject(name, color) {
    this.name = name;
    this.color = color;
  }
};

export let projects = JSON.parse(localStorage.getItem("projects")) || [];

if (projects.length !== 0) {
  const p = [];
  projects.forEach((project, projectIndex) => {
    p.push(new Project(project.name, project.color));
    project.todoList.forEach(task => {
      p[projectIndex].todoList.push(new Todo(task.title, task.description, task.dueDate, task.priority));
    });
  });
  projects = p;
}

export function saveToStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}