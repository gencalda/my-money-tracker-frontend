import { BiMoviePlay, BiReceipt } from 'react-icons/bi';

const IconsBI: React.FC<{ iconName: string }> = ({ iconName }) => {
  switch (iconName) {
    case 'BiReceipt':
      return <BiReceipt />;
    case 'BiMoviePlay':
      return <BiMoviePlay />;
    default:
      return null;
  }
};

export default IconsBI;
