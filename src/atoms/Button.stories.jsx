import React from 'react';

import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const BtnTest = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BtnTest.args = {
  primary: true,
  label: 'Button',
};

