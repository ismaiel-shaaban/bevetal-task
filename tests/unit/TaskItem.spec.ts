import { mount } from '@vue/test-utils';
import TaskItem from '@/components/TaskItem.vue';
import { mockStore } from './mockStore'; // Import the mock store

describe('TaskItem', () => {
  it('renders task details correctly', () => {
    const task = {
      id: 1,
      title: 'Test Task',
      description: 'This is a test task',
      status: 'todo',
      completed: false,
    };
    const wrapper = mount(TaskItem, {
      props: { taskItem: task },
      global: {
        plugins: [mockStore], // Provide the mock store
      },
    });

    expect(wrapper.find('h3').text()).toBe(task.title);
    expect(wrapper.find('p').text()).toBe(task.description);
    expect(wrapper.find('.actions').exists()).toBe(true);
  });

  it('emits edit event when edit button is clicked', async () => {
    const task = {
      id: 1,
      title: 'Test Task',
      description: 'This is a test task',
      status: 'todo',
      completed: false,
    };
    const wrapper = mount(TaskItem, {
      props: { taskItem: task },
      global: {
        plugins: [mockStore], // Provide the mock store
      },
    });

    await wrapper.find('button[aria-label="Edit"]').trigger('click'); // Target edit button by aria-label
    expect(wrapper.emitted('edit')).toHaveLength(1);
    expect(wrapper.emitted('edit')![0]).toEqual([task]);
  });

  // it('emits delete event when delete button is clicked', async () => {
  //   const task = {
  //     id: 1,
  //     title: 'Test Task',
  //     description: 'This is a test task',
  //     status: 'todo',
  //     completed: false,
  //   };
  //   const wrapper = mount(TaskItem, {
  //     props: { taskItem: task },
  //     global: {
  //       plugins: [mockStore], // Provide the mock store
  //     },
  //   });
  
  //   await wrapper.find('button[aria-label="Delete"]').trigger('click');
  //   console.log('Emitted events:', wrapper.emitted());
  //   expect(wrapper.emitted('delete')).toHaveLength(1);
  //   expect(wrapper.emitted('delete')![0]).toEqual([task]);
  // });
});
