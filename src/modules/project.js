import { Todo } from "./todo.js";

export class Project {
  todoList = [];

  constructor(name, color = "black") {
    this.name = name;
    this.color = color;
  }

  addTodo(todo) {
    this.todoList.push(todo);
  }
};

export const projects = [];

const defaultProject = new Project("default");
projects.push(defaultProject);
const todo1 = new Todo("Wash dishes", "dajshd", "2024-08-27", "medium");
const todo2 = new Todo("Play with cats", "hahahah", "2024-08-29", "high");
defaultProject.addTodo(todo1);
defaultProject.addTodo(todo2);