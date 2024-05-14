<template>
  <div>
    <!-- Button to trigger modal -->
    <button class="add-task" @click="handleShoeModal">Add New Task</button>

    <!-- TaskForm component as a modal -->
    <div class="task-form-parent" v-show="showModal" @click.self="handleBackgroundClick">

      <TaskForm class="task-form" @submit="submitTask" :formTitle="isNewTask ? 'Add New Task' : 'Edit Task'"
        :submitButtonText="isNewTask ? 'Add Task' : 'Update Task'" :task="task" :editableTask="formData" />
    </div>

    <div class="tasksParent">
      <TaskItem v-for="taskItem in tasks" :key="taskItem.id" :taskItem="taskItem" @edit="handleEditTask" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { State } from '@/store';
import { Task } from '../types/types'; // Import Task interface
import TaskItem from '@/components/TaskItem.vue';
import TaskForm from '@/components/TaskForm.vue';
function generateRandomId(): number {
  return Math.floor(Math.random() * 1000000);
}
export default defineComponent({
  components: {
    TaskItem,
    TaskForm,
  },
  props: {
    task: Object as () => Task,
  },
  setup(props) {
    const store = useStore<State>();
    const tasks = computed<Task[]>(() => store.getters.getAllTasks);
    const formData = ref<Task>({
      ...(props.task ? JSON.parse(JSON.stringify(props.task)) : {
        id: 0,
        title: '',
        description: '',
        status: 'todo',
        completed: false,
      })
    });
    const isNewTask = ref<boolean>(!props.task);
    const showModal = ref<boolean>(false);
    const saveTasksToLocalStorage = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks.value));
    };
    const handleShoeModal = () => {
      formData.value = {
        id: generateRandomId(),
        title: '',
        description: '',
        status: 'todo',
        completed: false,
      };
      isNewTask.value = true;
      showModal.value = true;

    };
    const submitTask = (task: Task) => {
      isNewTask.value = true;
      showModal.value = false;
      saveTasksToLocalStorage();
    };

    const handleEditTask = (task: Task) => {
      isNewTask.value = false;
      formData.value = { ...task };
      showModal.value = true;
    };
    const handleBackgroundClick = (event: MouseEvent) => {
      const form = document.querySelector('.task-form');
      if (form && !form.contains(event.target as Node)) {
        showModal.value = false;
      }
    };

    return { tasks, submitTask, isNewTask, formData, handleEditTask, showModal, handleBackgroundClick, handleShoeModal };
  },
});
</script>

<style>
.tasksParent {
  display: flex;

  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
}

.task-form-parent {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: #2c3e50;
}

.task-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #3d5976;
  padding: 20px;
  
  color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  @media screen and (max-width:800px) {
    width: 85%;

}
}
.add-task{
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: #000;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  
}
</style>
