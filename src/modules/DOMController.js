import { MainContentDOM } from "./mainContentDOM.js";
import { sidebarDOM } from "./sidebarDOM.js";

export function DisplayController() {
  const contentDisplay = MainContentDOM();
  const sidebarDisplay = sidebarDOM();

  contentDisplay.displayAllTask();
  sidebarDisplay.viewAllProject();
  
}