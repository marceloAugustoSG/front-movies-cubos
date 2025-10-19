import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './index';

describe('Button Component', () => {
  it('deve renderizar o botão com texto', () => {
    render(<Button>Clique aqui</Button>);
    
    const button = screen.getByRole('button', { name: /clique aqui/i });
    expect(button).toBeInTheDocument();
  });

  it('deve renderizar com variante primary por padrão', () => {
    render(<Button>Botão Primary</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('deve renderizar com diferentes variantes', () => {
    const { rerender } = render(<Button variant="secondary">Botão Secondary</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Button variant="logout">Logout</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Button variant="login">Login</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('deve renderizar com diferentes tamanhos', () => {
    const { rerender } = render(<Button size="small">Pequeno</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Button size="medium">Médio</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Button size="large">Grande</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('deve chamar onClick quando clicado', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clique aqui</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar onClick quando desabilitado', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Botão Desabilitado</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('deve estar desabilitado quando disabled=true', () => {
    render(<Button disabled>Botão Desabilitado</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('deve renderizar com tipo submit', () => {
    render(<Button type="submit">Enviar</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('deve renderizar com tipo reset', () => {
    render(<Button type="reset">Resetar</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'reset');
  });

  it('deve renderizar como link quando as prop to é fornecida', () => {
    render(<Button as="a" to="/home">Ir para Home</Button>);
    
    const link = screen.getByText('Ir para Home');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('to', '/home');
  });

  it('deve renderizar como link com href', () => {
    render(<Button as="a" href="https://example.com">Link Externo</Button>);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('deve renderizar children corretamente', () => {
    render(
      <Button>
        <span>Ícone</span>
        <span>Texto</span>
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Ícone');
    expect(button).toHaveTextContent('Texto');
  });

  it('deve aplicar props adicionais', () => {
    render(<Button data-testid="custom-button" aria-label="Botão customizado">Custom</Button>);
    
    const button = screen.getByTestId('custom-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Botão customizado');
  });
});
