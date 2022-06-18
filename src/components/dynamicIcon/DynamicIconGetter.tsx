import { IconProps } from './DynamicIcon';
import IconsAI from './IconsAI';
import IconsBI from './IconsBI';
import IconsBS from './IconsBS';
import IconsCG from './IconsCG';
import IconsFA from './IconsFA';
import IconsGI from './IconsGI';
import IconsIO from './IconsIO';
import IconsIO5 from './IconsIO5';
import IconsMD from './IconsMD';
import IconsRI from './IconsRI';

const DynamicIconGetter: React.FC<IconProps> = ({ iconName, iconLib }) => {
  switch (iconLib) {
    case 'react-icons/md':
      return <IconsMD iconName={iconName} />;
    case 'react-icons/fa':
      return <IconsFA iconName={iconName} />;
    case 'react-icons/gi':
      return <IconsGI iconName={iconName} />;
    case 'react-icons/io5':
      return <IconsIO5 iconName={iconName} />;
    case 'react-icons/bi':
      return <IconsBI iconName={iconName} />;
    case 'react-icons/io':
      return <IconsIO iconName={iconName} />;
    case 'react-icons/ri':
      return <IconsRI iconName={iconName} />;
    case 'react-icons/bs':
      return <IconsBS iconName={iconName} />;
    case 'react-icons/ai':
      return <IconsAI iconName={iconName} />;
    case 'react-icons/cg':
      return <IconsCG iconName={iconName} />;
    default:
      return <></>;
  }
};

export default DynamicIconGetter;
