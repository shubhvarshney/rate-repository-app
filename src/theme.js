import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textAppBar: '#ffffff',
    backgroundAppBar: '#24292e',
    primary: '#0366d6',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;