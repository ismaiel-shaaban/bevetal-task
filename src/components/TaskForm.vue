<template>
    <div class="task-form">
        <h2>{{ formTitle }}</h2>
        <form @submit.prevent="handleSubmit" class="form-parent">
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="formData.title" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="formData.description" required></textarea>
            </div>
            <div class="form-group">
                <label for="status">Status:</label>
                <select id="status" v-model="formData.status" required>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <div class="btn-container">

                <button  aria-label="formTask" type="submit">{{ submitButtonText }}</button>
                <!-- <button type="button">close</button> -->
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { Task } from '../types/types';
import { useStore } from 'vuex';
import { State } from '@/store';

function generateRandomId(): number {
    return Math.floor(Math.random() * 1000000);
}

export default defineComponent({
    props: {
        formTitle: String,
        submitButtonText: String,
        task: Object as () => Task | null,
        editableTask: Object as () => Task | null
    },
    setup(props) {
        const store = useStore<State>();
        const tasks = computed<Task[]>(() => store.getters.getAllTasks);

        const formData = ref<Task>({
            id: generateRandomId(),
            title: '',
            description: '',
            status: 'todo',
            completed: false,
        });

        // Watch for changes in the editableTask prop and update formData accordingly
        watch(() => props.editableTask, (newValue) => {
            if (newValue) {
                formData.value = { ...newValue };
            }
        });

      
        const handleSubmit = () => {
            // Ensure tasks has a valid value before accessing it
            const existingTask = tasks.value.find((t) => t.id === formData.value.id);
            if (existingTask) {
                store.dispatch('editTask', formData.value)
                    .then(() => {
                        formData.value = {
                            id: generateRandomId(),
                            title: '',
                            description: '',
                            status: 'todo',
                            completed: false,
                        };
                    });
            } else {
                store.dispatch('addTask', formData.value)
                    .then(() => {
                        formData.value = {
                            id: generateRandomId(),
                            title: '',
                            description: '',
                            status: 'todo',
                            completed: false,
                        };
                    });
            }
        };

        return { formData, handleSubmit };
    }
});
</script>



<style lang="scss" scoped>
.form-parent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
    text-align: start;

    @media screen and (max-width:800px) {
        width: 100%;

    }

}

.task-form {
    margin-top: 20px;
}

.task-form h2 {
    margin-bottom: 10px;
}

.form-group {
    padding: 20px;
    margin-bottom: 15px;

    width: 100%;


}

label {
    display: block;
}

input,
textarea,
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

button {
    padding: 8px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

}

button:hover {
    background-color: #0056b3;
}
</style>
