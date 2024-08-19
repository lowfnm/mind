import { Meta, StoryFn } from '@storybook/react';
import { RadioGroupProps, CustomRadioGroup } from './RadioGroup';


const meta: Meta<RadioGroupProps> = {
  title: 'atoms/Radio Group',
  component: CustomRadioGroup,
};

export default meta;

const Template: StoryFn<RadioGroupProps> = (args) => <CustomRadioGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'name',
  choices: ['choice1', 'choice2'],
  selectedValue: 'choice1',
  onChange: (value) => console.log(value),
};