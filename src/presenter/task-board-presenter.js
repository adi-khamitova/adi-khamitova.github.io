import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskSectionComponent from '../view/task-board-component.js';
import ClearBtnComponent from '../view/clear-btn-component.js';
import {render} from '../framework/render.js';
import { Status } from '../const.js';

export default class TaskBoardPresenter {
    taskBoardComponent = new TaskSectionComponent();
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
        this.#boardTasks = [...this.#taskModel.getTasks()];
        render(this.#taskBoardComponent, this.#boardContainer);

        Object.values(Status).forEach(status => {
            const listComponent = new TasksListComponent({status});
            render(listComponent, this.#taskBoardComponent.getElement());

            const titleTasks = this.#boardTasks.filter(task => task.status === status);

            titleTasks.forEach(task => {
                const taskComponent = new TaskComponent({task});
                render(taskComponent, listComponent.getElement().querySelector('.tasks-list'));
            });
        });

        const clearBtnContainer = document.querySelector('.task-list-section-trash');

        if (clearBtnContainer) {
            render(new ClearBtnComponent(), clearBtnContainer);
        }
    }
}