import Observable from '../framework/observable.js';
import { generateID } from '../utils.js';
import { UserAction, UpdateType } from '../const.js';

export default class TaskModel extends Observable {
    #boardtasks = [];
    #tasksApiService = null;

    constructor({tasksApiService}) {
        super();
        this.#tasksApiService = tasksApiService;
    }

    get tasks() {
        return this.#boardtasks;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status);
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardtasks = tasks;
        } catch(err) {
            this.#boardtasks = [];
        }
        this._notify(UpdateType.INIT);
    }

    async addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: generateID(),
        };
        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardtasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch (err) {
            console.error('Ошибка при добавлении задачи на сервер:', err);
            throw err;
        }
    }

    async clearTrash() {
        const trashTasks = this.#boardtasks.filter(task => task.status === "trash");
        try {
            await Promise.all(trashTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
            this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'trash');
            this._notify(UserAction.DELETE_TASK, { status: 'trash' });
        } catch (err) {
            console.error('Ошибка при удалении задач из корзины на сервере', err);
            throw err;
        }
    }

    hasTrashTasks() {
        return this.#boardtasks.some(task => task.status ==='trash');
    }

    async updateTaskStatus(taskId, newStatus, targetTaskId, insertPosition) {
        const taskIndex = this.#boardtasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return;
    
        const task = this.#boardtasks[taskIndex];
        const previousStatus = task.status;
        
        try {
            const updatedTask = { ...task, status: newStatus };
            this.#boardtasks.splice(taskIndex, 1);
            let newIndex = this.#boardtasks.length;
            if (targetTaskId) {
                const targetIndex = this.#boardtasks.findIndex(t => t.id === targetTaskId);
                if (targetIndex !== -1) {
                    newIndex = insertPosition === 'before' ? targetIndex : targetIndex + 1;
                }
            }
            this.#boardtasks.splice(newIndex, 0, updatedTask);
            const serverUpdatedTask = await this.#tasksApiService.updateTask(updatedTask);
            Object.assign(updatedTask, serverUpdatedTask);
            this._notify(UserAction.UPDATE_TASK, updatedTask);
        } catch (err) {
            this.#boardtasks.splice(taskIndex, 0, task);
            console.error('Ошибка при обновлении статуса задачи:', err);
            throw err;
        }
    }
}
