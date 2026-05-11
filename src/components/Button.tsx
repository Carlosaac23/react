import type { ComponentProps } from 'react';

import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'ghost-destructive';

type ButtonProps = {
  variant?: Variant;
} & ComponentProps<'button'>;

export default function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        getVariantStyles(variant),
        'rounded-lg px-2 py-1 transition-colors duration-250 ease-out disabled:cursor-not-allowed disabled:opacity-30',
        className
      )}
    />
  );
}

function getVariantStyles(variant: Variant) {
  switch (variant) {
    case 'primary':
      return 'bg-violet-600 hover:bg-violet-500';
    case 'secondary':
      return 'bg-neutral-700 hover:bg-neutral-600 text-neutral-400';
    case 'ghost-destructive':
      return 'hover:bg-red-800 text-red-800 hover:text-red-200';
    default:
      throw new Error(`Invalid variant: ${variant satisfies never}`);
  }
}
