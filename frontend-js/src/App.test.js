import { render, screen } from '@testing-library/react';
import App from './App';

test('renders developer name', () => {
  render(<App />);
  const nameElements = screen.getAllByText(/Mehtab Khan/i);
  expect(nameElements.length).toBeGreaterThan(0);
});

test('renders version badge', () => {
  render(<App />);
  const versionElements = screen.getAllByText(/Version/i);
  expect(versionElements.length).toBeGreaterThan(0);
});

test('renders about me section', () => {
  render(<App />);
  const aboutElements = screen.getAllByText(/Air University Islamabad/i);
  expect(aboutElements.length).toBeGreaterThan(0);
});
