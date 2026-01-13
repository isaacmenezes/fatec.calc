
import React from 'react';
import { LayoutDashboard, GraduationCap } from 'lucide-react';

export const MULTIPLIERS = {
  none: 1.00,
  afro: 1.03,
  public: 1.10,
  both: 1.13
};

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Calculadora', icon: <LayoutDashboard size={20} /> },
  { id: 'guide', label: 'Guia do Candidato', icon: <GraduationCap size={20} /> },
];

export const COLORS = {
  primary: '#1a1a1a',
  secondary: '#f8f7f4',
  accent_pink: '#ffcad4',
  accent_yellow: '#f9e2af',
  accent_green: '#a6e3a1',
  accent_blue: '#89b4fa',
  accent_purple: '#cba6f7',
};
