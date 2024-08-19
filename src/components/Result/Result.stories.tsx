import { Meta, StoryFn } from '@storybook/react';
import { ResultBlock } from './Result';


const meta: Meta = {
  title: 'atoms/Result',
  component: ResultBlock,
};

export default meta;

const Template: StoryFn = (args) => <ResultBlock{...args} />;

export const Default = Template.bind({});
Default.args = {};