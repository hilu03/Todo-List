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

export const projects = JSON.parse(localStorage.getItem("projects")) || [];

// const defaultProject = new Project("default");
// projects.push(defaultProject);
// const todo1 = new Todo("Wash dishes", "dajshd", "2024-08-27", "medium");
// const todo2 = new Todo("Play with cats", "hahahah", "2024-08-29", "high");
// defaultProject.addTodo(todo1);
// defaultProject.addTodo(todo2);

export function saveToStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}