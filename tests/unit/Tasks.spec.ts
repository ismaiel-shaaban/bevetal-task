// Tasks.spec.ts

import { mount } from '@vue/test-utils';
import Tasks from '@/views/Tasks.vue';
import TaskForm from '@/components/TaskForm.vue';
import TaskItem from '@/components/TaskItem.vue';

describe('Tasks', () => {
    it('renders TaskForm and TaskItem components', () => {
        const wrapper = mount(Tasks);
        expect(wrapper.findComponent(TaskForm).exists()).toBe(true);
        expect(wrapper.findComponent(TaskItem).exists()).toBe(true);
      });
    
      it('passes correct props to TaskForm component', () => {
        const wrapper = mount(Tasks);
        const taskFormProps = wrapper.findComponent(TaskForm).props();
    
        // Ensure the form title and submit button text are correct
        expect(taskFormProps.formTitle).toBe('Add New Task');
        expect(taskFormProps.submitButtonText).toBe('Add Task');
    
        // Ensure the task prop is null
        expect(taskFormProps.task).toBeNull();
      });
    
      it('emits correct events when editing a task', async () => {
        const wrapper = mount(Tasks);
        const taskItem = wrapper.findComponent(TaskItem);
    
        // Simulate clicking on the edit button of the task item
        await taskItem.trigger('edit');
    
        // Assert that the appropriate event was emitted
        expect(wrapper.emitted('edit-task')).toHaveLength(1);
      });
    
      // Add more integration test cases as needed
});
