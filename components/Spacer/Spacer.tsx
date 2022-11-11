type SpacerProps = {
  size?: Spacing
  axis: 'horizontal' | 'vertical'
}

enum Spacing {
  '0rem',
  '0.25rem',
  '0.5rem',
  '0.75rem',
  '1rem',
  '1.25rem',
  '1.5rem',
  '1.75rem',
  '2rem',
}

export const Spacer = ({ size = 4, axis }: SpacerProps) => {
  const width = axis === 'vertical' ? 1 : Spacing[size]
  const height = axis === 'horizontal' ? 1 : Spacing[size]

  return (
    <span
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
      }}
    />
  )
}
