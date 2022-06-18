import {
  GiConverseShoe,
  GiHeartNecklace,
  GiHearts,
  GiLipstick,
} from 'react-icons/gi';

const IconsGI: React.FC<{ iconName: string }> = ({ iconName }) => {
  switch (iconName) {
    case 'GiHearts':
      return <GiHearts />;
    case 'GiHeartNecklace':
      return <GiHeartNecklace />;
    case 'GiConverseShoe':
      return <GiConverseShoe />;
    case 'GiLipstick':
      return <GiLipstick />;
    default:
      return null;
  }
};

export default IconsGI;
