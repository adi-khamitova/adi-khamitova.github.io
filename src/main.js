import HeaderComponent from "./view/header-component.js";
import AddTaskComponent from "./view/add-task-form-component.js";
import {render, RenderPosition} from "./framework/render.js"
import TaskBoardPresenter from "./presenter/task-board-presenter.js";
import TaskModel from "./model/task-model.js";

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const boardContainer = document.querySelector('.taskboard');

const taskModel = new TaskModel();
const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: boardContainer,
    taskModel,
});

const addTaskComponent = new AddTaskComponent({
    onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(addTaskComponent, formContainer);


taskBoardPresenter.init();