import { mount } from '@vue/test-utils';
import TaskForm from '@/components/TaskForm.vue';

describe('TaskForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(TaskForm);
    expect(wrapper.exists()).toBe(true);
  });

  it('initially renders with empty form fields', () => {
    const wrapper = mount(TaskForm);
    const titleInput = wrapper.find('input#title').element as HTMLInputElement;
    const descriptionInput = wrapper.find('textarea#description').element as HTMLTextAreaElement;
    const statusInput = wrapper.find('select#status').element as HTMLSelectElement;

    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
    expect(statusInput.value).toBe('todo');
  });

  it('emits a submit event with form data when the form is submitted', async () => {
    const wrapper = mount(TaskForm);
    const titleInput = wrapper.find('input#title').element as HTMLInputElement;
    const descriptionInput = wrapper.find('textarea#description').element as HTMLTextAreaElement;
    const statusInput = wrapper.find('select#status').element as HTMLSelectElement;
    const form = wrapper.find('form').element as HTMLFormElement;

    titleInput.value = 'Test Title';
    descriptionInput.value = 'Test Description';
    statusInput.value = 'in-progress';
    await form.dispatchEvent(new Event('submit'));

    expect(wrapper.emitted('submit')).toHaveLength(1);
    expect(wrapper.emitted('submit')![0]).toEqual([
      {
        id: expect.any(Number),
        title: 'Test Title',
        description: 'Test Description',
        status: 'in-progress',
        completed: false
      }
    ]);
  });

  // Add more test cases as needed
});
