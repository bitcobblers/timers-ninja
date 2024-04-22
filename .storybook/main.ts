import { StorybookConfig } from "storybook-framework-qwik";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials", 
  ],

  framework: {
    name: "storybook-framework-qwik",
  },

  core: {
    renderer: "storybook-framework-qwik",
  },

  stories: [
    // ...rootMain.stories,
    "../src/docs/**/*.mdx",
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  viteFinal: async (config: any) => {
    return config;
  },

  docs: {
    autodocs: true
  }
};

export default config;
