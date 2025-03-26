import HeaderComponent from "./view/header-component.js";
import AddTaskComponent from "./view/add-task-form-component.js";
import TaskSectionComponent from "./view/task-board-component.js";
import TasksListComponent from "./view/tasks-list-component.js";
import TaskComponent from "./view/task-component.js";
import {render, RenderPosition} from "./framework/render.js"

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const taskSectionContainer = document.querySelector('.taskboard');


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskComponent(), formContainer);
const taskBoardComponent = new TaskSectionComponent();
render(taskBoardComponent, taskSectionContainer);

const taskBoardElement = taskBoardComponent.getElement();

for (let i = 0; i < 4; i++) {
    const listComponent = new TasksListComponent();
    render(listComponent, taskBoardElement);

    const listElement = listComponent.getElement();

    for (let j = 0; j < 2; j++) {
        render(new TaskComponent(), listElement);
    }
}

