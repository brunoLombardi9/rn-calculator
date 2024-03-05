import Main from './src/Main';
import ThemeProvider from './src/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
};


