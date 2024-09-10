import { ChartConfig } from "@/components/ui/chart";

export const CHART_CONFIG = {
  visitors: {
    label: 'Visitors',
  },
  Amethyst: {
    label: 'Amethyst',
    color: 'hsl(var(--chart-1))',
  },
  Azure: {
    label: 'Azure',
    color: 'hsl(var(--chart-2))',
  },
  Cyan: {
    label: 'Cyan',
    color: 'hsl(var(--chart-3))',
  },
  DarkPurple: {
    label: 'DarkPurple',
    color: 'hsl(var(--chart-4))',
  },
  Electrician: {
    label: 'Electrician',
    color: 'hsl(var(--chart-5))',
  },
  Idingo: {
    label: 'Idingo',
    color: 'hsl(var(--chart-6))',
  },
  Amber: {
    label: 'Amber',
    color: 'hsl(var(--chart-7))',
  },
  DarkOrange: {
    label: 'DarkOrange',
    color: 'hsl(var(--chart-8))',
  },
  Brown: {
    label: 'Brown',
    color: 'hsl(var(--chart-9))',
  },
  Pink: {
    label: 'Pink',
    color: 'hsl(var(--chart-10))',
  },
  LightGreen: {
    label: 'LightGreen',
    color: 'hsl(var(--chart-11))',
  },
} satisfies ChartConfig

export const COLOR_CHART = (i: number) => {
  const colors = [
    'var(--color-Amethyst)',
    'var(--color-Azure)',
    'var(--color-Cyan)',
    'var(--color-Electrician)',
    'var(--color-DarkPurple)',
    'var(--color-Idingo)',
    'var(--color-Amber)',
    'var(--color-DarkOrange)',
    'var(--color-Brown)',
    'var(--color-Pink)',
    'var(--color-LightGreen)',
  ]
  return colors[i] || 'var(--color-Electrician)'
}