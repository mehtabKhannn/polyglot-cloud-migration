import { render, screen } from '@testing-library/react';
import App from './App';

test('renders developer name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Mehtab Khan/i);
  expect(nameElement).toBeInTheDocument();
});

test('renders version badge', () => {
  render(<App />);
  const versionElement = screen.getByText(/Version/i);
  expect(versionElement).toBeInTheDocument();
});

test('renders about me section', () => {
  render(<App />);
  const aboutElement = screen.getByText(/Air University Islamabad/i);
  expect(aboutElement).toBeInTheDocument();
});
