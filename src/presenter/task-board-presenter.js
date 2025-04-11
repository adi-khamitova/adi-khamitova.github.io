import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskSectionComponent from '../view/task-board-component.js';
import ClearBtnComponent from '../view/clear-btn-component.js';
import EmptyTaskComponent from '../view/empty-task-component.js';
import {render} from '../framework/render.js';
import { Status } from '../const.js';

export default class TaskBoardPresenter {
    // tasksListComponent = new TasksListComponent();

    #boardContainer = null;
    #taskModel = null;

    #taskBoardComponent = new TaskSectionComponent();

    #boardTasks = [];

    constructor({boardContainer, taskModel}) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
    }

    init() {
        this.#boardTasks = [...this.#taskModel.tasks];
        this.#renderBoard();

        // const clearBtnContainer = document.querySelector('.task-list-section-trash');

        // if (clearBtnContainer) {
        //     render(new ClearBtnComponent(), clearBtnContainer);
        // }
      }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({ task });
        render(taskComponent, container);
    }

    #renderBoard() {
        render(this.#taskBoardComponent, this.#boardContainer);

        Object.values(Status).forEach(status => this.#renderTasksList(status));
    }

    #renderTasksList(status) {
        const listComponent = new TasksListComponent({status});
        render(listComponent, this.#taskBoardComponent.element);

        const taskListElement = listComponent.element.querySelector('.tasks-list');
            
        const filteredTasks = this.#boardTasks.filter(task => task.status === status);
            if (filteredTasks.length === 0) {
                this.#renderEmptyTask(taskListElement);
            } else {
                filteredTasks.forEach(task => this.#renderTask(task, taskListElement));
            }

        if (status === Status.TRASH) {
            this.#renderClearBtn();
        }
    }

    #renderClearBtn() {
        const clearBtnContainer = document.querySelector('.task-list-section-trash');
        render(new ClearBtnComponent(), clearBtnContainer);
    }

    #renderEmptyTask(container) {
        render(new EmptyTaskComponent(), container);
    }
}