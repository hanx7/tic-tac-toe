// Square.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Board, Square} from '../component/Square';

test('render square with correct values', ()=>{
  render(<Square value="X" onClick={() => {}} />);
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('X');
});

test('calls onClick handler when clicked', () => {
  const handleClick = jest.fn();
  render(<Square value="O" onClick={handleClick} />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('renders board with initial empty squares', () => {
  const { container } = render(<Board />);

  // Get all button elements with the role of "button"
  const squares = container.querySelectorAll('.square');

  // Assert that each square initially does not contain any text
  squares.forEach(square => {
    expect(square.textContent).toBe(' '); // Checks that the content of the square is a space
  });
});

test('updates square value on click', () => {
  render(<Board />);

  // Find the first square element
  const square = screen.getAllByRole('button')[0]; // Select the first button

  // Click the square
  fireEvent.click(square);

  // Assert that the square's value changes to 'X'
  expect(screen.getByText('X')).toBeInTheDocument();
});

test('shows winner message when there is a winner', () => {
  // Simulate moves to achieve a winning condition
  const {container} = render(<Board />);
  const squares = container.getElementsByClassName('square');
  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[1]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[2]); // X

  expect(screen.getByText('Winner: X')).toBeInTheDocument();
});

test('shows draw message when the board is full with no winner', () => {
  // Simulate moves to fill the board without a winner
  const {container} = render(<Board />);
  const squares = container.getElementsByClassName('square');
  fireEvent.click(squares[0]);
  fireEvent.click(squares[1]);
  fireEvent.click(squares[2]);
  fireEvent.click(squares[3]);
  fireEvent.click(squares[4]);
  fireEvent.click(squares[6]);
  fireEvent.click(squares[5]);
  fireEvent.click(squares[8]);
  fireEvent.click(squares[7]);
  expect(screen.getByText("It's a draw!")).toBeInTheDocument();
});