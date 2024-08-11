import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form } from './Form';

describe('Form Component', () => {
  test('renders form fields correctly', () => {
    render(
      <Router>
        <Form />
      </Router>
    );

    // Check if all form fields are rendered
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Zip Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Social Security Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Total Income/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Source of Income/i)).toBeInTheDocument();
  });

  test('displays validation errors on submit with empty required fields', () => {
    render(
      <Router>
        <Form />
      </Router>
    );

    fireEvent.click(screen.getByText(/Submit/i));

    // Check if validation errors are displayed
    expect(screen.getByText(/First Name required/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name required/i)).toBeInTheDocument();
    expect(screen.getByText(/Social Security Number required/i)).toBeInTheDocument();
    expect(screen.getByText(/Street address required/i)).toBeInTheDocument();
    expect(screen.getByText(/State required/i)).toBeInTheDocument();
    expect(screen.getByText(/Zip Code required/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Income required/i)).toBeInTheDocument();
  });

  test('does not display validation errors if required fields are filled', () => {
    render(
      <Router>
        <Form />
      </Router>
    );

    // Fill required fields
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Social Security Number/i), { target: { value: '123-45-6789' } });
    fireEvent.change(screen.getByLabelText(/Street Address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/State/i), { target: { value: 'CA' } });
    fireEvent.change(screen.getByLabelText(/Zip Code/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/Total Income/i), { target: { value: '50000' } });

    fireEvent.click(screen.getByText(/Submit/i));

    // Check that validation errors are not displayed
    expect(screen.queryByText(/First Name required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Last Name required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Social Security Number required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Street address required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/State required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Zip Code required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Total Income required/i)).not.toBeInTheDocument();
  });
});
