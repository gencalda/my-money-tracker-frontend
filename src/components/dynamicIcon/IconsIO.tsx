import { IoMdGift, IoMdList } from 'react-icons/io';

const IconsIO: React.FC<{ iconName: string }> = ({ iconName }) => {
  switch (iconName) {
    case 'IoMdGift':
      return <IoMdGift />;
    case 'IoMdList':
      return <IoMdList />;
    default:
      return null;
  }
};

export default IconsIO;
