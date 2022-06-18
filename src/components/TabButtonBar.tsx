import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import DynamicIcon, { IconProps } from './dynamicIcon/DynamicIcon';

export interface ITabButton {
  url: string;
  icon: IconProps;
}

interface Props {
  tabButtonList: ITabButton[];
}

const TabButton = ({ tabButtonList }: Props) => {
  const location = useLocation();

  if (!tabButtonList) {
    return null;
  }

  return (
    <div className="w-full flex justify-evenly">
      {tabButtonList?.map(({ url, icon }) => (
        <Link
          key={url}
          to={url}
          className={classNames('text-xl px-4 pb-4 pt-3', {
            'text-primary': location?.pathname === url,
            'text-color-label': location?.pathname !== url,
          })}
        >
          <DynamicIcon iconLib={icon?.iconLib} iconName={icon?.iconName} />
        </Link>
      ))}
    </div>
  );
};

export default TabButton;
