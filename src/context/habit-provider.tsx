import { isSameDay } from 'date-fns';
import { createContext, type ReactNode } from 'react';

import { useLocalStorage } from '@/hooks/use-local-storage';
export type Habit = { id: string; name: string; completions: Date[] };

type Context = {
  habits: Habit[];
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
};

type HabitProviderProps = {
  children: ReactNode;
};

export const HabitContext = createContext<Context | null>(null);

export default function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useLocalStorage<Habit[]>('Habits', []);

  function addHabit(name: string) {
    setHabits(current => [...current, { id: crypto.randomUUID(), name, completions: [] }]);
  }

  function deleteHabit(id: string) {
    setHabits(current => current.filter(habit => habit.id !== id));
  }

  function toggleHabit(id: string, date: Date) {
    setHabits(current =>
      current.map(habit => {
        if (habit.id !== id) return habit;

        const alreadyDone = habit.completions.some(c => isSameDay(c, date));
        const completions = alreadyDone
          ? habit.completions.filter(c => !isSameDay(c, date))
          : [...habit.completions, date];

        return { ...habit, completions };
      })
    );
  }

  return (
    <HabitContext value={{ habits, addHabit, deleteHabit, toggleHabit }}>{children}</HabitContext>
  );
}
