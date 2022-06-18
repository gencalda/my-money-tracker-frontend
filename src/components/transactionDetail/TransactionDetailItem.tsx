interface Props {
  label: string;
  value?: string;
  icon?: React.ReactNode;
}

const TransactionDetailItem: React.FC<Props> = ({
  icon,
  label = '',
  value = '',
}) => (
  <div className="flex gap-2 border-b last:border-b-0">
    <div className="self-start mt-1 mb-2">
      <div className="bg-primary text-color-with-primary-bg p-2 rounded-xl text-xl">
        {icon || null}
      </div>
    </div>
    <div className="flex flex-col mb-2">
      <div className="text-color-label font-medium text-sm tracking-wider">
        {label}
      </div>
      <div className="font-semibold text-color-no-primary-bg">{value}</div>
    </div>
  </div>
);

export default TransactionDetailItem;
