import { RiFirstAidKitFill } from 'react-icons/ri';

const IconsRI: React.FC<{ iconName: string }> = ({ iconName }) => {
  switch (iconName) {
    case 'RiFirstAidKitFill':
      return <RiFirstAidKitFill />;
    default:
      return null;
  }
};

export default IconsRI;
