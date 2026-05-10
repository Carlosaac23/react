import { eachDayOfInterval, format, startOfWeek, endOfWeek, isFuture } from 'date-fns';

import Button from './Button';

export default function HabitList() {
  const habits = [{ id: 1, name: 'Hi' }];

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
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
}

type HabitItemProps = {
  habit: { id: number; name: string };
};

function HabitItem({ habit }: HabitItemProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  return (
    <div className='flex flex-col gap-3 rounded bg-neutral-800 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <span className='font-medium'>{habit.name}</span>
          <span className='text-sm text-amber-400'>🔥 3</span>
        </div>
        <Button variant='ghost-destructive'>Delete</Button>
      </div>

      <div className='flex gap-1.5'>
        {visibleDates.map(date => (
          <Button key={date.toISOString()} disabled={isFuture(date)}>
            <span className='font-medium'>{format(date, 'EEE')}</span>
            <span>{format(date, 'd')}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
