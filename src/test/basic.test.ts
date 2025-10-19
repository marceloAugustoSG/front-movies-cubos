import { describe, it, expect } from 'vitest';

describe('Configuração de Testes', () => {
  it('deve executar teste básico', () => {
    expect(1 + 1).toBe(2);
  });

  it('deve ter acesso às funções globais do Vitest', () => {
    expect(typeof describe).toBe('function');
    expect(typeof it).toBe('function');
    expect(typeof expect).toBe('function');
  });
});
