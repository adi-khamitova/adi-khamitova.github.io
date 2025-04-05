import { tasks } from '../mock/task.js'

export default class TaskModel {
    #boardtasks = tasks;

    getTasks() {
        return this.#boardtasks;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status);
    }
}

