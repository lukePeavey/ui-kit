import { IThemeInterface } from '../../src/types';

type TSections = 'header' | 'sidebar' | 'main' | 'footer';

export const light: Partial<IThemeInterface<TSections>> = {
  colors: {
    lightest: '#f9f9f9',
    lighter: 'rgb(233, 239, 244)',
    error: 'red',
  },

  components: {
    button: {
      bg: 'rgb(160, 159, 165)',
      fg: 'white',
      border: 'rgb(160, 159, 165)',
    },
  },

  sections: {
    header: {
      colors: {
        bg: 'rgb(245, 247, 249)',
        border: 'rgb(233, 239, 244)',
      },
      components: {
        button: {
          bg: 'white',
          fg: '#888',
          border: 'rgb(218, 218, 220)',
        },
      },
    },

    sidebar: {
      colors: {
        bg: 'rgb(245, 247, 249)',
        fg: 'black',
        border: 'rgb(233, 239, 244)',
      },
    },

    main: {
      colors: {
        bg: 'white',
        fg: 'black',
      },
    },

    footer: {
      colors: {
        bg: 'rgb(245, 247, 249)',
        border: 'rgb(233, 239, 244)',
      },
    },
  },
};
