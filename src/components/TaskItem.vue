<template>
  <div class="task-item card-1 card" draggable="true" @dragstart="handleDragStart" @dragover="handleDragOver" @drop="handleDrop">
    <h3>{{ taskItem?.title }}</h3>
    <p>{{ taskItem?.description }}</p>
    <p>Status: {{ taskItem?.status }}</p>
    <div class="actions">
      <button @click="editTask" aria-label="Edit">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" width="20">
          <path fill="white"
            d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
        </svg>
      </button>
      <button @click="deleteTask(taskItem)" aria-label="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="20" viewBox="0 0 448 512">
          <path
            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </button>
      <div v-if="taskItem?.status !== 'done'" @click="toggleStatus(taskItem)">
        <button>

          <svg xmlns="http://www.w3.org/2000/svg"
          fill="white" width="22"
            viewBox="0 0 448 512">
            <path
              d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" />
          </svg>
        </button>
      </div>
    </div>
  </div>

</template>



<script lang="ts">
import { defineComponent } from 'vue';
import { Task as TaskType } from '../types/types';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  props: {
    taskItem: Object as () => TaskType
  },
  setup(props, { emit }) {
    const store = useStore<State>();
    const deleteTask = (task: TaskType | undefined) => {
      console.log('Delete task function called with task:', task);
      
      if (task) {
        store.dispatch('deleteTask', task.id);
      } else {
        console.error('Task is undefined');
      }
    }
    const toggleStatus = (task: TaskType | undefined) => {
      if (task) {
        console.log(task);

        store.dispatch('toggleStatus', task.id);
      } else {
        console.error('Task is undefined');
      }
    }
    const editTask = () => {
      emit('edit', props.taskItem);
    }
    const handleDragStart = (event: DragEvent) => {
      const target = event.target as HTMLElement;
      target.classList.add('dragging');
      const index = Array.from(target.parentNode!.children).indexOf(target);
      store.commit('SET_DRAGGED_TASK_INDEX', index);
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDrop = (event: DragEvent) => {
      console.log('llllllllllllll');
      
      const target = event.target as HTMLElement;
      const draggedTaskIndex = store.state.draggedTaskIndex;
      if (draggedTaskIndex !== null) {
        const droppedTaskIndex = Array.from(target.parentNode!.children).indexOf(target);
        store.commit('REARRANGE_TASKS', rearrangeTasks(store.state.tasks, draggedTaskIndex, droppedTaskIndex));
        target.classList.remove('dragging');
      }
    };

    const rearrangeTasks = (tasks: TaskType[], fromIndex: number, toIndex: number) => {
      const result = [...tasks];
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    };

    return {
      deleteTask,
      toggleStatus,
      editTask,
      handleDragStart,
      handleDragOver,
      handleDrop
    };
  },

});
</script>


<style lang="scss" scoped>
.task-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  width: 250px;
  margin: 10px;
  overflow: hidden;
}

.actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  div {
    margin-top: 15px;
    width: 100%;
  }
}

button {
  margin-right: 5px;
}




.card {
  margin: 20px;
  padding: 20px;
  width: 250px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.5s;
  word-break: break-word;
  color: white;

  button {
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: white;
  }

}



.card__link,
.card__exit,
.card__icon {
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
}

.card__link::after {
  position: absolute;
  top: 25px;
  left: 0;
  content: "";
  width: 0%;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: all 0.5s;
}

.card__link:hover::after {
  width: 100%;
}

.card__exit {
  grid-row: 1/2;
  justify-self: end;
}

.card__icon {
  grid-row: 2/3;
  font-size: 30px;
}

.card__title {
  grid-row: 3/4;
  font-weight: 400;
  color: #ffffff;
}

.card__desc {
  grid-row: 3/4;
  font-weight: 400;
  color: #ffffff;
}

.card__apply {
  grid-row: 4/5;
  align-self: center;
}

/* CARD BACKGROUNDS */

.card-1 {
  background: radial-gradient(#007b8654,#151f31);
}



/* RESPONSIVE */

@media (max-width: 1600px) {
  .cards {
    justify-content: center;
  }
}
</style>@/types/types
