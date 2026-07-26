export default function SectionHeading({ eyebrow, title, align = 'left', className = '' }) {
  return (
    <div className={`mb-8 ${align === 'center' ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className="text-accent-dark font-semibold uppercase tracking-wider text-xs mb-2">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary-dark">{title}</h2>
      )}
    </div>
  );
}
