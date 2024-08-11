import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Approval } from './approval';

// Mocking useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mocking localStorage
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn((key) => {
        switch (key) {
          case 'firstName':
            return 'John';
          case 'totalIncome':
            return '60000'; // Default value
          default:
            return null;
        }
      }),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  // Clear all instances and calls to the mock function
  mockNavigate.mockClear();
});

describe('Approval Component', () => {
  test('renders congratulatory message when income is 50000 or more', () => {
    render(
      <BrowserRouter>
        <Approval />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Congratulations John !/i)).toBeInTheDocument();
  });

  test('renders rejection message when income is less than 50000', () => {
    // Update the mock to return a lower income
    window.localStorage.getItem = jest.fn((key) => {
      switch (key) {
        case 'firstName':
          return 'John';
        case 'totalIncome':
          return '40000';
        default:
          return null;
      }
    });

    render(
      <BrowserRouter>
        <Approval />
      </BrowserRouter>
    );

    expect(screen.getByText(/Sorry John, You don't qualify for this credit card./i)).toBeInTheDocument();
  });

  test('navigates to /Form on button click', () => {
    render(
      <BrowserRouter>
        <Approval />
      </BrowserRouter>
    );

    const button = screen.getByText(/REAPPLY/i);
    userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/Form');
  });
});
