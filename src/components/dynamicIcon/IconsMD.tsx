import {
  MdAdd,
  MdAirplanemodeActive,
  MdDeliveryDining,
  MdDirectionsCar,
  MdFastfood,
  MdLocalGroceryStore,
  MdOutlineHealthAndSafety,
  MdOutlinePhoneIphone,
  MdPhone,
  MdRestaurant,
  MdSearch,
} from 'react-icons/md';

const IconsMD: React.FC<{ iconName: string }> = ({ iconName }) => {
  switch (iconName) {
    case 'MdFastfood':
      return <MdFastfood />;
    case 'MdDirectionsCar':
      return <MdDirectionsCar />;
    case 'MdAirplanemodeActive':
      return <MdAirplanemodeActive />;
    case 'MdPhone':
      return <MdPhone />;
    case 'MdDeliveryDining':
      return <MdDeliveryDining />;
    case 'MdOutlineHealthAndSafety':
      return <MdOutlineHealthAndSafety />;
    case 'MdLocalGroceryStore':
      return <MdLocalGroceryStore />;
    case 'MdRestaurant':
      return <MdRestaurant />;
    case 'MdOutlinePhoneIphone':
      return <MdOutlinePhoneIphone />;
    case 'MdAdd':
      return <MdAdd />;
    case 'MdSearch':
      return <MdSearch />;
    default:
      return null;
  }
};

export default IconsMD;
