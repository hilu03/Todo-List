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