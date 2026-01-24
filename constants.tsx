
import React from 'react';
import { LayoutDashboard, GraduationCap, PenTool } from 'lucide-react';

export const MULTIPLIERS = {
  none: 1.00,
  afro: 1.03,
  public: 1.10,
  both: 1.13
};

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Calculadora', icon: <LayoutDashboard size={20} /> },
  { id: 'redacao', label: 'Simulador Redação', icon: <PenTool size={20} /> },
  { id: 'guide', label: 'Guia do Candidato', icon: <GraduationCap size={20} /> },
];

export const COLORS = {
  primary: '#1a56db',
  accent_pink: '#f05179',
  dark: '#000000',
  white: '#ffffff',
  bg_gradient: 'linear-gradient(135deg, #1a56db 0%, #7e22ce 100%)'
};
