import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from './index';

describe('Input Component', () => {
  it('deve renderizar o input corretamente', () => {
    render(<Input placeholder="Digite aqui" />);
    
    const input = screen.getByPlaceholderText('Digite aqui');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('deve renderizar com diferentes tipos', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" placeholder="Senha" />);
    expect(screen.getByPlaceholderText('Senha')).toHaveAttribute('type', 'password');

    rerender(<Input type="search" placeholder="Buscar" />);
    expect(screen.getByPlaceholderText('Buscar')).toHaveAttribute('type', 'search');
  });

  it('deve renderizar com variante search', () => {
    render(<Input variant="search" placeholder="Buscar filmes" />);
    
    const input = screen.getByPlaceholderText('Buscar filmes');
    expect(input).toBeInTheDocument();
  });

  it('deve renderizar com ícone', () => {
    const icon = <span data-testid="search-icon">🔍</span>;
    render(<Input icon={icon} placeholder="Com ícone" />);
    
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('deve chamar onChange quando o valor muda', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Teste" />);
    
    const input = screen.getByPlaceholderText('Teste');
    fireEvent.change(input, { target: { value: 'novo valor' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'novo valor' })
    }));
  });

  it('deve renderizar com valor controlado', () => {
    render(<Input value="valor inicial" onChange={vi.fn()} />);
    
    const input = screen.getByDisplayValue('valor inicial');
    expect(input).toBeInTheDocument();
  });

  it('deve estar desabilitado quando disabled=true', () => {
    render(<Input disabled placeholder="Desabilitado" />);
    
    const input = screen.getByPlaceholderText('Desabilitado');
    expect(input).toBeDisabled();
  });

  it('deve ser obrigatório quando required=true', () => {
    render(<Input required placeholder="Obrigatório" />);
    
    const input = screen.getByPlaceholderText('Obrigatório');
    expect(input).toBeRequired();
  });

  it('deve renderizar com name e id', () => {
    render(<Input name="username" id="user-input" placeholder="Usuário" />);
    
    const input = screen.getByPlaceholderText('Usuário');
    expect(input).toHaveAttribute('name', 'username');
    expect(input).toHaveAttribute('id', 'user-input');
  });

  it('deve renderizar com inputMode', () => {
    render(<Input inputMode="numeric" placeholder="Números" />);
    
    const input = screen.getByPlaceholderText('Números');
    expect(input).toHaveAttribute('inputMode', 'numeric');
  });

  it('deve renderizar com pattern', () => {
    render(<Input pattern="[0-9]*" placeholder="Apenas números" />);
    
    const input = screen.getByPlaceholderText('Apenas números');
    expect(input).toHaveAttribute('pattern', '[0-9]*');
  });

  it('deve renderizar com min e max', () => {
    render(<Input type="number" min="0" max="100" placeholder="Idade" />);
    
    const input = screen.getByPlaceholderText('Idade');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
  });

  it('deve aplicar props adicionais', () => {
    render(<Input data-testid="custom-input" aria-label="Input customizado" />);
    
    const input = screen.getByTestId('custom-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-label', 'Input customizado');
  });

  it('deve manter foco quando clicado', () => {
    render(<Input placeholder="Teste foco" />);
    
    const input = screen.getByPlaceholderText('Teste foco');
    input.focus();
    
    expect(input).toHaveFocus();
  });
});
