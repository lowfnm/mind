import { Meta, StoryFn } from '@storybook/react';
import { CustomCardProps, CustomCard } from './Card';


const meta: Meta<CustomCardProps> = {
  title: 'atoms/Card',
  component: CustomCard,
};

export default meta;

const Template: StoryFn<CustomCardProps> = (args) => <CustomCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'title',
  description: ['description'],
  totalPages: 1,
  handleSubmit: () => console.log('submit'),
};