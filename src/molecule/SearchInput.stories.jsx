import React from 'react';
import { SearchInput } from './SearchInput';
import { action } from '@storybook/addon-actions';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/SearchInput',
  component: SearchInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <SearchInput {...args} />;


export const SearchInputTest = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SearchInputTest.args = {
  label: 'Button',
  name : '하이',
  values : '안녕하세요',
  toggle : true,
  onchange : action('onChange'),
  setToggle : action('setToggle'),
};



