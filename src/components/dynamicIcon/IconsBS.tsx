import { BsGraphUp } from 'react-icons/bs';

const IconsBS: React.FC<{ iconName: string }> = ({ iconName }) => {
  switch (iconName) {
    case 'BsGraphUp':
      return <BsGraphUp />;
    default:
      return null;
  }
};

export default IconsBS;
