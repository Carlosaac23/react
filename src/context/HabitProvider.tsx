import { createContext, type ReactNode } from 'react';

export type Habit = { id: string; name: string; completions: Date[] };

type Context = {
  habits: Habit[];
};

type HabitProviderProps = {
  children: ReactNode;
};

const HabitContext = createContext<Context | null>(null);

export default function HabitProvider({ children }: HabitProviderProps) {
  return <HabitContext value={{ name: 'Carlos' }}>{children}</HabitContext>;
}
