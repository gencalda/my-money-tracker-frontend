interface Props {
  label: string;
  className?: string;
}

const Badge: React.FC<Props> = ({ label, className = '' }) => (
  <div className={className || 'rounded flex'}>
    <div className="bg-secondary grow-0 px-2 py-[0.20rem] text-[0.7rem] font-semibold text-color-label tracking-wide">
      {label}
    </div>
  </div>
);

export default Badge;
