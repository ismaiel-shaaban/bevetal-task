import { mount } from '@vue/test-utils';
import TaskForm from '@/components/TaskForm.vue';
import { mockStore } from './mockStore'; 

describe('TaskForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(TaskForm, {
      global: {
        provide: {
          store: mockStore, 
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('initially renders with empty form fields', () => {
    const wrapper = mount(TaskForm, {
      global: {
        provide: {
          store: mockStore, 
        },
      },
    });
    const titleInput = wrapper.find('input#title').element as HTMLInputElement;
    const descriptionInput = wrapper.find('textarea#description').element as HTMLTextAreaElement;
    const statusInput = wrapper.find('select#status').element as HTMLSelectElement;

    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
    expect(statusInput.value).toBe('todo');
  });

  it('emits a submit event with form data when the form is submitted', async () => {
    const wrapper = mount(TaskForm, {
      global: {
        provide: {
          store: mockStore, 
        },
      },
    });
    const titleInput = wrapper.find('input#title').element as HTMLInputElement;
    const descriptionInput = wrapper.find('textarea#description').element as HTMLTextAreaElement;
    const statusInput = wrapper.find('select#status').element as HTMLSelectElement;

    titleInput.value = 'Test Title';
    descriptionInput.value = 'Test Description';
    statusInput.value = 'in-progress';
    await wrapper.find('button[aria-label="formTask"]').trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
   
  });

  
});
