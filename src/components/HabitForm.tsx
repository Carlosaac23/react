import type { SubmitEvent } from 'react';

import { useState } from 'react';

import Button from './Button';

type HabitFormProps = {
  addHabit: (name: string) => void;
};

export default function HabitForm({ addHabit }: HabitFormProps) {
  const [name, setName] = useState('');

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (name.trim() === '') return;
    setName('');
    addHabit(name);
  }

  return (
    <form className='flex gap-2' onSubmit={handleSubmit}>
      <input
        className='flex-1 rounded-lg bg-neutral-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500'
        type='text'
        placeholder='New habit...'
        name=''
        id=''
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Button className='px-4 py-2 font-medium' disabled={name.trim() === ''} type='submit'>
        Add Habit
      </Button>
    </form>
  );
}
