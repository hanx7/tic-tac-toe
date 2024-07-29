// App.test.js
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders the title of the game', () => {
  render(<App />);
  const titleElement = screen.getByText(/Welcome to tic-tac-toe game!/i);
  expect(titleElement).toBeInTheDocument();
});
