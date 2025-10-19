import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useToast } from './useToast';

const mockMathRandom = vi.spyOn(Math, 'random');

describe('useToast Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMathRandom.mockReturnValue(0.5);
  });

  afterEach(() => {
    mockMathRandom.mockRestore();
  });

  it('deve inicializar com array vazio de toasts', () => {
    const { result } = renderHook(() => useToast());
    
    expect(result.current.toasts).toEqual([]);
  });

  it('deve adicionar toast com addToast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.addToast('Mensagem de teste', 'success', 5000);
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toEqual({
      id: expect.any(String),
      message: 'Mensagem de teste',
      type: 'success',
      duration: 5000,
    });
  });

  it('deve usar valores padrão quando não especificados', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.addToast('Mensagem padrão');
    });
    
    expect(result.current.toasts[0]).toEqual({
      id: expect.any(String),
      message: 'Mensagem padrão',
      type: 'success',
      duration: 3000,
    });
  });

  it('deve remover toast com removeToast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.addToast('Toast 1');
      result.current.addToast('Toast 2');
    });
    
    expect(result.current.toasts).toHaveLength(2);
    
    const firstToastId = result.current.toasts[0].id;
    
    act(() => {
      result.current.removeToast(firstToastId);
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Toast 2');
  });

  it('deve adicionar toast de sucesso com showSuccess', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showSuccess('Sucesso!');
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toEqual({
      id: expect.any(String),
      message: 'Sucesso!',
      type: 'success',
      duration: 3000,
    });
  });

  it('deve adicionar toast de erro com showError', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showError('Erro!');
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toEqual({
      id: expect.any(String),
      message: 'Erro!',
      type: 'error',
      duration: 3000,
    });
  });

  it('deve adicionar toast de informação com showInfo', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showInfo('Informação!');
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toEqual({
      id: expect.any(String),
      message: 'Informação!',
      type: 'info',
      duration: 3000,
    });
  });

  it('deve permitir duração customizada nos métodos específicos', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showSuccess('Sucesso!', 5000);
      result.current.showError('Erro!', 2000);
      result.current.showInfo('Info!', 1000);
    });
    
    expect(result.current.toasts).toHaveLength(3);
    expect(result.current.toasts[0].duration).toBe(5000);
    expect(result.current.toasts[1].duration).toBe(2000);
    expect(result.current.toasts[2].duration).toBe(1000);
  });

  it('deve manter múltiplos toasts', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showSuccess('Sucesso 1');
      result.current.showError('Erro 1');
      result.current.showInfo('Info 1');
    });
    
    expect(result.current.toasts).toHaveLength(3);
    expect(result.current.toasts[0].type).toBe('success');
    expect(result.current.toasts[1].type).toBe('error');
    expect(result.current.toasts[2].type).toBe('info');
  });

  it('deve gerar IDs únicos para cada toast', () => {
    const { result } = renderHook(() => useToast());
    
    mockMathRandom
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.3);
    
    act(() => {
      result.current.addToast('Toast 1');
      result.current.addToast('Toast 2');
      result.current.addToast('Toast 3');
    });
    
    const ids = result.current.toasts.map(toast => toast.id);
    const uniqueIds = new Set(ids);
    
    expect(uniqueIds.size).toBe(3);
    expect(ids).toHaveLength(3);
  });

  it('deve não quebrar quando removeToast é chamado com ID inexistente', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.addToast('Toast 1');
    });
    
    expect(result.current.toasts).toHaveLength(1);
    
    act(() => {
      result.current.removeToast('id-inexistente');
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Toast 1');
  });

  it('deve manter referências estáveis das funções', () => {
    const { result, rerender } = renderHook(() => useToast());
    
    const firstRender = {
      addToast: result.current.addToast,
      removeToast: result.current.removeToast,
      showSuccess: result.current.showSuccess,
      showError: result.current.showError,
      showInfo: result.current.showInfo,
    };
    
    rerender();
    
    expect(result.current.addToast).toBe(firstRender.addToast);
    expect(result.current.removeToast).toBe(firstRender.removeToast);
    expect(result.current.showSuccess).toBe(firstRender.showSuccess);
    expect(result.current.showError).toBe(firstRender.showError);
    expect(result.current.showInfo).toBe(firstRender.showInfo);
  });
});
