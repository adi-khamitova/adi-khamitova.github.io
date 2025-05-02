import TasksListComponent from '../view/tasks-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskSectionComponent from '../view/task-board-component.js';
import ClearBtnComponent from '../view/clear-btn-component.js';
import EmptyTaskComponent from '../view/empty-task-component.js';
import {render} from '../framework/render.js';
import { Status } from '../const.js';

export default class TaskBoardPresenter {

    #boardContainer = null;
    #taskModel = null;
    #clearBtn = null;

    #taskBoardComponent = new TaskSectionComponent();


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
            const isTrashEmpty = this.#taskModel.isTrashEmpty();
            this.#clearBtn.toggleDisabled(isTrashEmpty);
        }
    }

    #clearBoard() {
        this.#taskBoardComponent.element.innerHTML = '';
    }

    init() {
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

    #handleTaskDrop(taskId, newStatus, targetTaskId, insertPosition) {
        this.#taskModel.updateTaskStatus(taskId, newStatus, targetTaskId, insertPosition);
    }

    #renderClearBtn() {
        const clearBtnContainer = document.querySelector('.task-list-section-trash');
        const isTrashEmpty = this.#taskModel.isTrashEmpty();

        this.#clearBtn = new ClearBtnComponent(Status.TRASH, {onClick: this.#handleClearBtnClick, isDisabled: isTrashEmpty});
        render(this.#clearBtn, clearBtnContainer);
        this.updateClearBtnState();
    }

    #handleClearBtnClick = () => {
        this.clearTrash();
    }

    clearTrash() {
        this.#taskModel.clearTrash();
    }

    #renderEmptyTask(container) {
        render(new EmptyTaskComponent(), container);
    }

    createTask() {
        const taskTitle = document.querySelector('.new-task').value.trim();
        if (!taskTitle) {
          return;
        } 
        this.#taskModel.addTask(taskTitle);
    
        document.querySelector('.new-task').value = '';
      }
}