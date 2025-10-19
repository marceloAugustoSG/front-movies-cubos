import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Modal from './index';

vi.useFakeTimers();

describe('Modal Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    document.body.style.overflow = 'unset';
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.useFakeTimers();
  });

  it('não deve renderizar quando isOpen=false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Conteúdo do modal</div>
      </Modal>
    );
    
    expect(screen.queryByText('Conteúdo do modal')).not.toBeInTheDocument();
  });

  it('deve renderizar quando isOpen=true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Conteúdo do modal</div>
      </Modal>
    );
    
    expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument();
  });

  it('deve renderizar com título', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Título do Modal">
        <div>Conteúdo do modal</div>
      </Modal>
    );
    
    expect(screen.getByText('Título do Modal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /×/ })).toBeInTheDocument();
  });

  it('deve chamar onClose quando clicar no botão de fechar', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Título">
        <div>Conteúdo</div>
      </Modal>
    );
    
    const closeButton = screen.getByRole('button', { name: /×/ });
    fireEvent.click(closeButton);
    
    vi.advanceTimersByTime(300);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve bloquear scroll do body quando aberto', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Conteúdo</div>
      </Modal>
    );
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('deve restaurar scroll do body quando fechado', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Conteúdo</div>
      </Modal>
    );
    
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Conteúdo</div>
      </Modal>
    );
    
    expect(document.body.style.overflow).toBe('unset');
  });

  it('deve limpar overflow do body no cleanup', () => {
    const { unmount } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Conteúdo</div>
      </Modal>
    );
    
    unmount();
    
    expect(document.body.style.overflow).toBe('unset');
  });

  it('deve renderizar children corretamente', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div data-testid="modal-content">
          <h2>Título do conteúdo</h2>
          <p>Parágrafo de exemplo</p>
          <button>Botão dentro do modal</button>
        </div>
      </Modal>
    );
    
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByText('Título do conteúdo')).toBeInTheDocument();
    expect(screen.getByText('Parágrafo de exemplo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /botão dentro do modal/i })).toBeInTheDocument();
  });

  it('deve manter modal visível durante animação de fechamento', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Título">
        <div>Conteúdo</div>
      </Modal>
    );
    
    const closeButton = screen.getByRole('button', { name: /×/ });
    fireEvent.click(closeButton);
    
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
    
    vi.advanceTimersByTime(300);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar sem título quando title não é fornecido', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Conteúdo sem título</div>
      </Modal>
    );
    
    expect(screen.getByText('Conteúdo sem título')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /×/ })).not.toBeInTheDocument();
  });
});
