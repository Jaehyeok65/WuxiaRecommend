import React from 'react';
import { action } from '@storybook/addon-actions';
import WuxiaHead from './WuxiaHead';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Head',
  component: WuxiaHead,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <WuxiaHead {...args} />;


export const HeadTest = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HeadTest.args = {
};



