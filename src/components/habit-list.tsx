import { format, isFuture, isSameDay, subDays } from 'date-fns';

import type { Habit } from '@/context/habit-provider';

import Button from '@/components/button';
import { useHabits } from '@/context/use-habits';

type HabitListProps = {
  visibleDates: Date[];
};

export default function HabitList({ visibleDates }: HabitListProps) {
  const { habits } = useHabits();

  if (habits.length === 0) {
    return (
      <p className='py-12 text-center text-neutral-400'>
        No habits yet. Add one above to get started!
      </p>
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit} visibleDates={visibleDates} />
      ))}
    </div>
  );
}

type HabitItemProps = {
  habit: Habit;
  visibleDates: Date[];
};

function HabitItem({ habit, visibleDates }: HabitItemProps) {
  const { deleteHabit, toggleHabit } = useHabits();
  const streak = getStreak(habit.completions);

  return (
    <div className='flex flex-col gap-3 rounded-lg bg-neutral-800 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <span className='font-medium'>{habit.name}</span>
          {streak !== 0 && <span className='text-sm text-amber-400'>🔥 {streak}</span>}
        </div>
        <Button
          className='text-sm'
          variant='ghost-destructive'
          onClick={() => deleteHabit(habit.id)}
        >
          Delete
        </Button>
      </div>

      <div className='flex gap-1.5'>
        {visibleDates.map(date => (
          <Button
            className='flex flex-1 flex-col items-center gap-0.5 text-xs'
            key={date.toISOString()}
            disabled={isFuture(date)}
            onClick={() => toggleHabit(habit.id, date)}
            variant={habit.completions.some(d => isSameDay(date, d)) ? 'primary' : 'secondary'}
          >
            <span className='font-medium'>{format(date, 'EEE')}</span>
            <span>{format(date, 'd')}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

function getStreak(completions: Date[]) {
  let streak = 0;
  let date = new Date();

  while (completions.some(c => isSameDay(c, date))) {
    streak++;
    date = subDays(date, 1);
  }

  return streak;
}
