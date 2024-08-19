import { Meta, StoryFn } from '@storybook/react';
import  { BooleanGroupProps, BooleanGroup } from './BooleanGroup';


const meta: Meta<BooleanGroupProps> = {
  title: 'atoms/Boolean Group',
  component: BooleanGroup,
};

export default meta;

const Template: StoryFn<BooleanGroupProps> = (args) => <BooleanGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'name',
  selectedValue: 'Yes',
  onChange: (value) => console.log(value),
};