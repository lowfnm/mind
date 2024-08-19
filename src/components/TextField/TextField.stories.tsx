import { Meta, StoryFn } from '@storybook/react';
import { CustomTextField, CustomTextFieldProps } from './TextField';


const meta: Meta<CustomTextFieldProps> = {
  title: 'atoms/Text field',
  component: CustomTextField,
};

export default meta;

const Template: StoryFn<CustomTextFieldProps> = (args) => <CustomTextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  value: 'Value',
  onChange: (value) => console.log(value),
};