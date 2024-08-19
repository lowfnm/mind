import { Meta, StoryFn } from '@storybook/react';
import { ProgressBar, ProgressBarProps } from './ProgressBar';


const meta: Meta<ProgressBarProps> = {
  title: 'atoms/Progress Bar',
  component: ProgressBar,
};

export default meta;

const Template: StoryFn<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  steps: 5,
  filledProgress: 3,
};