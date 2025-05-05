import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskSectionComponent from '../view/task-board-component.js';
import ClearBtnComponent from '../view/clear-btn-component.js';
import EmptyTaskComponent from '../view/empty-task-component.js';
import LoadingViewComponent from '../view/loading-view-component.js';
import {render} from '../framework/render.js';
import { Status } from '../const.js';

export default class TaskBoardPresenter {

    #boardContainer = null;
    #taskModel = null;
    #clearBtn = null;

    #taskBoardComponent = new TaskSectionComponent();
    #loadingComponent = new LoadingViewComponent();


    constructor({boardContainer, taskModel}) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;

        this.#taskModel.addObserver(this.#handleModelChange.bind(this));
    }

    get tasks() {
        return this.#taskModel.tasks;
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
        this.updateClearBtnState();
    }

    updateClearBtnState() {
        if (this.#clearBtn) {
            this.#clearBtn.toggleDisabled(!this.#taskModel.hasTrashTasks());
        }
    }

    #clearBoard() {
        this.#taskBoardComponent.element.innerHTML = '';
    }

    async init() {
        render(this.#loadingComponent, this.#boardContainer);
        await this.#taskModel.init();
        this.#boardContainer.innerHTML = '';
        this.#clearBoard();
        this.#renderBoard();
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
        const listComponent = new TasksListComponent({status: status, onTaskDrop: this.#handleTaskDrop.bind(this)});
        render(listComponent, this.#taskBoardComponent.element);

        const taskListElement = listComponent.element.querySelector('.tasks-list');
            
        const filteredTasks = this.tasks.filter(task => task.status === status);
            if (filteredTasks.length === 0) {
                this.#renderEmptyTask(taskListElement);
            } else {
                filteredTasks.forEach(task => this.#renderTask(task, taskListElement));
            }

        if (status === Status.TRASH) {
            this.#renderClearBtn();
        }
    }

    async #handleTaskDrop(taskId, newStatus, targetTaskId, insertPosition) {
        try {
            await this.#taskModel.updateTaskStatus(taskId, newStatus, targetTaskId, insertPosition);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи:', err);
        }
    }

    #renderClearBtn() {
        const clearBtnContainer = document.querySelector('.task-list-section-trash');
        const isTrashEmpty = !(this.#taskModel.hasTrashTasks());
        this.#clearBtn = new ClearBtnComponent(Status.TRASH, {onClick: this.#handleClearBtnClick, isDisabled: isTrashEmpty});
        render(this.#clearBtn, clearBtnContainer);
        this.updateClearBtnState();
    }

    async #handleTrash() {
        try {
            await this.#taskModel.clearTrash();
        } catch (err) {
            console.error('Ошибка при очистке корзины:', err);
        }
    }

    #handleClearBtnClick = () => {
        this.#handleTrash();
    }

    #renderEmptyTask(container) {
        render(new EmptyTaskComponent(), container);
    }

    async createTask() {
        const taskTitle = document.querySelector('.new-task').value.trim();
        if (!taskTitle) {
            return;
        } 
        try{
            await this.#taskModel.addTask(taskTitle);
            document.querySelector('.new-task').value = '';
        } catch (err) {
            console.error("Ошибка при создании задачи:", err);
        }
    }
}