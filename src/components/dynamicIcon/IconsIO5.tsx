import { IoGameControllerOutline, IoShirtSharp } from 'react-icons/io5';

const IconsIO5: React.FC<{ iconName: string }> = ({ iconName }) => {
  switch (iconName) {
    case 'IoGameControllerOutline':
      return <IoGameControllerOutline />;
    case 'IoShirtSharp':
      return <IoShirtSharp />;
    default:
      return null;
  }
};

export default IconsIO5;
