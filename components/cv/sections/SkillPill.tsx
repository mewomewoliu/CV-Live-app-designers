interface SkillPillProps {
  label: string
  variant?: 'outlined' | 'filled' | 'dark-outlined'
  size?: 'sm' | 'xs'
}

export function SkillPill({ label, variant = 'outlined', size = 'xs' }: SkillPillProps) {
  const sizeStyle = size === 'xs'
    ? { fontSize: '0.62rem', padding: '0.2rem 0.6rem' }
    : { fontSize: '0.7rem', padding: '0.25rem 0.75rem' }

  const variantStyle =
    variant === 'filled'
      ? { background: '#18181b', color: '#fff', border: '1px solid #18181b' }
      : variant === 'dark-outlined'
      ? { background: 'transparent', color: '#71717a', border: '1px solid #27272a' }
      : { background: 'transparent', color: '#52525b', border: '1px solid #d4d4d8' }

  return (
    <span
      style={{
        ...sizeStyle,
        ...variantStyle,
        borderRadius: '99px',
        display: 'inline-block',
        lineHeight: 1.5,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}
