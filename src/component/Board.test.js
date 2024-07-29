// Board.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Board } from './Square';

test('renders board with initial empty squares', () => {
  render(<Board />);
  const squares = screen.getAllByRole('button');
  squares.forEach(square => expect(square).toHaveTextContent(' '));
});

test('updates square value on click', () => {
  render(<Board />);
  const square = screen.getByText(' ');
  fireEvent.click(square);
  expect(screen.getByText('X')).toBeInTheDocument();
});

test('shows winner message when there is a winner', () => {
  render(<Board />);
  // Simulate moves to achieve a winning condition
  const squares = screen.getAllByRole('button');
  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[1]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[2]); // X
  expect(screen.getByText('Winner: X')).toBeInTheDocument();
});

test('shows draw message when the board is full with no winner', () => {
  render(<Board />);
  // Simulate moves to fill the board without a winner
  const squares = screen.getAllByRole('button');
  squares.forEach((square, index) => {
    fireEvent.click(square);
  });
  expect(screen.getByText("It's a draw!")).toBeInTheDocument();
});
