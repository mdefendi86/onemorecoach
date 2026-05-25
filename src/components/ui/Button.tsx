import Link from 'next/link'

/*
  Button — three variants matching the legacy button styles.
  REBUILD_PLAN.md §8. Replaces legacy `.btn-primary`, `.btn-ghost`,
  `.btn-nav-cta`.

  - Renders as <Link> when `href` is internal, <a> when external,
    <button> otherwise.
  - No inline style="…" anywhere — Tailwind utilities only.
*/

type ButtonVariant = 'primary' | 'ghost' | 'nav-cta'
type ButtonSize = 'md' | 'lg'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = BaseProps & {
  href?: never
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

type ButtonAsLink = BaseProps & {
  href: string
  /** External links open in a new tab with rel safety. */
  external?: boolean
  'aria-label'?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-[color:var(--color-bg)] border-2 border-accent hover:opacity-90 transition-opacity',
  ghost:
    'bg-transparent text-[color:var(--color-text)] border-2 border-white/35 hover:border-accent hover:text-accent transition-colors',
  'nav-cta':
    'bg-accent text-[color:var(--color-bg)] hover:opacity-90 transition-opacity rounded-[var(--radius)]',
}

const sizeClass: Record<ButtonSize, string> = {
  md: 'px-[22px] py-[10px] text-[0.95rem]',
  lg: 'px-[30px] py-[14px] text-[1.1rem]',
}

function buildClass(variant: ButtonVariant, size: ButtonSize, extra: string) {
  const base =
    'inline-flex items-center justify-center font-display tracking-[0.06em] leading-none cursor-pointer text-center rounded-[var(--radius)] active:scale-[0.97] transition-transform'
  return `${base} ${sizeClass[size]} ${variantClass[variant]} ${extra}`.trim()
}

function isLink(p: ButtonProps): p is ButtonAsLink {
  return typeof p.href === 'string'
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'primary'
  const size = props.size ?? 'lg'
  const className = buildClass(variant, size, props.className ?? '')

  if (isLink(props)) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          aria-label={props['aria-label']}
          onClick={props.onClick}
        >
          {props.children}
        </a>
      )
    }
    return (
      <Link
        href={props.href}
        className={className}
        aria-label={props['aria-label']}
        onClick={props.onClick}
      >
        {props.children}
      </Link>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={className}
    >
      {props.children}
    </button>
  )
}
