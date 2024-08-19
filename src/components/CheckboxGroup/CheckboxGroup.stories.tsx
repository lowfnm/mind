import { Meta, StoryFn } from '@storybook/react';
import { CheckboxGroup, CheckboxGroupComponentProps } from './CheckboxGroup';


const meta: Meta<CheckboxGroupComponentProps> = {
  title: 'atoms/Checkbox Group',
  component: CheckboxGroup,
};

export default meta;

const Template: StoryFn<CheckboxGroupComponentProps> = (args) => <CheckboxGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'name',
  choices: ['choice1', 'choice2'],
  selectedChoices: ['choice1'],
  onChange: (name, choice, checked) => console.log(name, choice, checked),
};