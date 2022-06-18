import {
  FaGasPump,
  FaGraduationCap,
  FaHome,
  FaLaptopCode,
  FaParking,
  FaPumpSoap,
  FaRegBuilding,
  FaShoppingBag,
  FaTaxi,
  FaTools,
  FaWifi,
} from 'react-icons/fa';

const IconsFA: React.FC<{ iconName: string }> = ({ iconName }) => {
  switch (iconName) {
    case 'FaGraduationCap':
      return <FaGraduationCap />;
    case 'FaHome':
      return <FaHome />;
    case 'FaWifi':
      return <FaWifi />;
    case 'FaLaptopCode':
      return <FaLaptopCode />;
    case 'FaRegBuilding':
      return <FaRegBuilding />;
    case 'FaTools':
      return <FaTools />;
    case 'FaGasPump':
      return <FaGasPump />;
    case 'FaParking':
      return <FaParking />;
    case 'FaTaxi':
      return <FaTaxi />;
    case 'FaShoppingBag':
      return <FaShoppingBag />;
    case 'FaPumpSoap':
      return <FaPumpSoap />;
    default:
      return null;
  }
};

export default IconsFA;
