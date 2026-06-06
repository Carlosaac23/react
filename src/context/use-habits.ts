import { useContext } from 'react';

import { HabitContext } from '@/context/habit-provider';

export function useHabits() {
  const habitContext = useContext(HabitContext);
  if (!habitContext) throw new Error('useHabits must be used within a HabitProvider');

  return habitContext;
}
