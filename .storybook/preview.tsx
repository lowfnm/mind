import type { Preview } from '@storybook/react'

import { AppProvider } from '../src/context/global';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      return (
        <AppProvider>
          <Story {...context} />
        </AppProvider>
      );
    }
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;