import { createStore, Store } from 'vuex';
import { ActionContext } from 'vuex';
import { Task  } from '../types/types'; 
import { InjectionKey } from 'vue';
const loadTasksFromLocalStorage = (): Task[] => {
  const tasksJson = localStorage.getItem('tasks');
  return tasksJson ? JSON.parse(tasksJson) : [];
};
export interface State {
  tasks: Task[];
  draggedTaskIndex: number | null;
}
export const storeKey: InjectionKey<Store<State>> = Symbol('store');
const store = createStore<State>({
  state: {
    tasks: loadTasksFromLocalStorage(),
    draggedTaskIndex: null
  },
  mutations: {
    ADD_TASK(state, task: Task) {
      state.tasks.push(task);
    },
    DELETE_TASK(state, taskId: number) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    TOGGLE_STATUS(state, taskId: number) {
      const task = state.tasks.find(task => task.id == taskId);
      if (task) {
        task.completed = !task.completed; 
        task.status = 'done'; 
      }

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    EDIT_TASK(state, editedTask: Task) {
      const index = state.tasks.findIndex(task => task.id === editedTask.id);
      if (index !== -1) {
        state.tasks[index] = { ...editedTask };
      }
    },
    SET_DRAGGED_TASK_INDEX(state, index: number) { // Mutation to set the draggedTaskIndex
      state.draggedTaskIndex = index;
    },
    REARRANGE_TASKS(state, tasks: Task[]) { // Mutation to rearrange tasks based on dragged task
      state.tasks = tasks;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
  actions: {
    addTask(context: ActionContext<State, State>, task: Task) {
      context.commit('ADD_TASK', task);

    },
    deleteTask(context: ActionContext<State, State>, taskId: number) {
      context.commit('DELETE_TASK', taskId);
    },
    toggleStatus(context: ActionContext<State, State>, taskId: number) {
      context.commit('TOGGLE_STATUS', taskId);
    },
    editTask(context: ActionContext<State, State>, editedTask: Task) {
      context.commit('EDIT_TASK', editedTask);
    }

  },
  getters: {
    getAllTasks(state) {
      return state.tasks;
    },
 
  }
});

export default store;
