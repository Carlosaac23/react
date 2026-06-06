import { format, isToday } from 'date-fns';

import Button from '@/components/button';
import { useHabits } from '@/context/use-habits';

type HeaderProps = {
  visibleDates: Date[];
  onPrev: () => void;
  onNext: () => void;
};

export default function Header({ visibleDates, onPrev, onNext }: HeaderProps) {
  const { habits } = useHabits();
  const doneToday = habits.filter(habit => habit.completions.some(c => isToday(c))).length;
  const dateRange = `${format(visibleDates[0], 'MMM d')} - ${format(visibleDates.at(-1)!, 'MMM d')}`;

  return (
    <header className='flex items-center justify-between'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-3xl font-bold'>Habit Tracker</h1>
        <span className='text-sm text-neutral-400'>
          {doneToday} / {habits.length} done today
        </span>
      </div>

      <div className='flex flex-col items-end gap-1'>
        <span className='text-sm text-neutral-400'>{dateRange}</span>
        <div className='flex items-center gap-3'>
          <Button type='button' onClick={onPrev}>
            Prev
          </Button>
          <Button
            type='button'
            onClick={onNext}
            disabled={visibleDates.some(date => isToday(date))}
          >
            Next
          </Button>
        </div>
      </div>
    </header>
  );
}
