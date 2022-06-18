import classnames from 'classnames';
import { IOptions } from 'shared/types/commonTypes';
import CustomButton from './CustomButton';

interface Props {
  containerClassName?: string;
  tabList: IOptions[];
  onTabSelect: (selectedTab: IOptions) => void;
  selectedTabValue: string;
}

const TabSelector: React.FC<Props> = ({
  tabList,
  onTabSelect,
  containerClassName = '',
  selectedTabValue = '',
}) => {
  const onTabSelectHandler = (selectedTab: IOptions) => {
    onTabSelect?.(selectedTab);
  };

  const hasBorderLeft = (currentIndex: number) => {
    if (
      currentIndex === 0 ||
      selectedTabValue === tabList?.[currentIndex]?.value ||
      selectedTabValue === tabList?.[currentIndex - 1]?.value
    ) {
      return false;
    }

    return true;
  };

  return (
    <div className={containerClassName}>
      <ul className="flex justify-around w-full text-color-label">
        {tabList?.map(({ value, label }, index) => (
          <li
            key={value}
            className={classnames('w-full', {
              'border-l text-color-label': hasBorderLeft(index),
            })}
          >
            <CustomButton
              className={classnames('w-full py-2 font-semibold', {
                'rounded-lg bg-app-bg border-t border-solid border-secondary shadow-lg':
                  selectedTabValue === value,
              })}
              onClickHandler={() => onTabSelectHandler({ value, label })}
            >
              {label}
            </CustomButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabSelector;
