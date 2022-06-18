import { CgSmartHomeRefrigerator } from 'react-icons/cg';

const IconsCG: React.FC<{ iconName: string }> = ({ iconName }) => {
  switch (iconName) {
    case 'CgSmartHomeRefrigerator':
      return <CgSmartHomeRefrigerator />;
    default:
      return null;
  }
};

export default IconsCG;
