// Square.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Square } from './Square';

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