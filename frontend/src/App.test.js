import { render, screen } from '@testing-library/react';
import NotFound from './components/errors/notFound';

test('renders learn react link', () => {
  render(<NotFound />);
  const linkElement = screen.getByText(/Whoopsie!/i);
  expect(linkElement).toBeInTheDocument();
});
