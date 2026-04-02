import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground border-transparent',
        secondary: 'bg-secondary text-secondary-foreground border-border',
        outline: 'border-border text-foreground',
        'primary-soft':
          'border-primary/18 bg-primary/8 text-primary',
        distributed:
          'border-[#6132fd]/18 bg-[#6132fd]/8 text-[#6132fd]/92',
        allocated:
          'border-[#0e7490]/18 bg-[#0e7490]/8 text-[#0f766e]',
        pending:
          'border-[#71717a]/18 bg-[#71717a]/8 text-[#52525b]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
