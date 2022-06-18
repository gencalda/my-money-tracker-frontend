interface Props {
  onClickHandler?: () => void;
  icon?: React.ReactNode;
  fieldComponent?: React.ReactNode;
}

const TransactionFormItem: React.FC<Props> = ({
  onClickHandler,
  fieldComponent,
  icon,
}) => (
  <div className="flex last:border-b-0 my-1 last:pb-4">
    <div className="self-start mt-2.5 mr-2">
      <div className="bg-primary p-2 rounded-xl text-xl text-color-with-primary-bg">
        {icon || null}
      </div>
    </div>
    <div onClick={onClickHandler} className="flex flex-col grow justify-center">
      {fieldComponent}
    </div>
  </div>
);

export default TransactionFormItem;
