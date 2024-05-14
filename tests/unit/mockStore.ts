// mockStore.ts

import { createStore } from 'vuex';
import { Task } from '../../src/types/types';

// Function to load tasks from localStorage
const loadTasksFromLocalStorage = (): Task[] => {
  const tasksJson = localStorage.getItem('tasks');
  return tasksJson ? JSON.parse(tasksJson) : [];
};

// Define the initial state
const initialState = {
  tasks: loadTasksFromLocalStorage(),
  draggedTaskIndex: null,
};

// Mock mutations
const mutations = {
  ADD_TASK: jest.fn(),
  DELETE_TASK: jest.fn(),
  TOGGLE_STATUS: jest.fn(),
  EDIT_TASK: jest.fn(),
  SET_DRAGGED_TASK_INDEX: jest.fn(),
  REARRANGE_TASKS: jest.fn(),
};

// Mock actions
const actions = {
  addTask: jest.fn(),
  deleteTask: jest.fn(),
  toggleStatus: jest.fn(),
  editTask: jest.fn(),
};

// Mock getters
const getters = {
  getAllTasks: jest.fn(),
};

// Create the mock store
export const mockStore = createStore({
  state: initialState,
  mutations,
  actions,
  getters,
});

export default mockStore;
