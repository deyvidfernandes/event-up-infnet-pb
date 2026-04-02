import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SideMenu } from './SideMenu';
import { BrowserRouter } from 'react-router';
import * as mockStorage from '@/lib/util/mockLocalStorage';
import { MenuGroup } from './types';

// Mock do usuário logado
vi.mock('@/lib/util/mockLocalStorage', () => ({
  getLoggedUser: vi.fn(),
}));

const mockMenuGroups: MenuGroup[] = [
  {
    title: "Administração",
    allowed: "all",
    links: [{ label: "Painel de Controle", icon: "fa-chart", path: "/dashboard" }]
  }
];

describe('SideMenu Hover UX', () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Habilita o controle do tempo
    window.innerWidth = 1024; // Garante modo Desktop
    (mockStorage.getLoggedUser as any).mockReturnValue({ accountType: 'organizador' });
  });

  afterEach(() => {
    vi.useRealTimers(); // Limpa os timers após cada teste
  });

  it('deve expandir o menu e mostrar os textos após 500ms de hover', () => {
    render(
      <BrowserRouter>
        <SideMenu menuGroups={mockMenuGroups} />
      </BrowserRouter>
    );

    const sidebar = screen.getByRole('navigation');
    const linkText = screen.getByText('Painel de Controle');

    expect(sidebar.className).not.toContain('expanded');

    fireEvent.mouseEnter(sidebar);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(sidebar.className).not.toContain('expanded');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(sidebar.className).toContain('expanded');
    expect(linkText).toBeVisible();
    
    expect(screen.getByText('Administração')).toBeInTheDocument();
  });

  it('deve cancelar a expansão se o mouse sair antes dos 500ms', () => {
    render(
      <BrowserRouter>
        <SideMenu menuGroups={mockMenuGroups} />
      </BrowserRouter>
    );

    const sidebar = screen.getByRole('navigation');

    fireEvent.mouseEnter(sidebar);
    
    act(() => {
      vi.advanceTimersByTime(300);
    });
    fireEvent.mouseLeave(sidebar);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(sidebar.className).not.toContain('expanded');
  });
});