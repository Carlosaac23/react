import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import { useState } from 'react';

import HabitForm from '@/components/habit-form';
import HabitList from '@/components/habit-list';
import Header from '@/components/header';
import HabitProvider from '@/context/habit-provider';

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0);
  const week = addWeeks(new Date(), weekOffset);
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });

  return (
    <div className='mx-auto flex max-w-2xl flex-col gap-4 p-4'>
      <HabitProvider>
        <Header
          visibleDates={visibleDates}
          onPrev={() => setWeekOffset(o => o - 1)}
          onNext={() => setWeekOffset(o => o + 1)}
        />
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </HabitProvider>
    </div>
  );
}
