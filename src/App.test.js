import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

test('renders/presents page title', () => {
  render(<App />);
  const title = screen.getByText("TypeRace");
  expect(title).toBeInTheDocument();
});

test('renders/presents the Snippet heading', async () => {
    render(<App />);
    const snippet = screen.getByText('"Snippet"');
    expect(snippet).toBeInTheDocument();
  });

test('renders/presents our 3 expected buttons', () => {
    render(<App />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toEqual(3);
})

test('shows director options after clicking on director button', async () => {
    render(<App />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[2]);
    await waitFor(() => {
        screen.getByText("Isao Takahata");
    })
    const directorSnippets = screen.getAllByText('Isao Takahata');
    expect(directorSnippets.length).toEqual(1);
})