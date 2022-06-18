import DynamicIcon from '../dynamicIcon/DynamicIcon';

interface Props {
  id: string;
  iconLib: string;
  iconName: string;
  label: string;
}

const CategoryIcon: React.FC<Props> = ({ id, label, iconLib, iconName }) => (
  <div className="flex items-center" key={id}>
    <div className="my-2 ml-4 mr-3 text-lg text-primary">
      <DynamicIcon iconLib={iconLib} iconName={iconName} />
    </div>
    <div className="mt-1">{label}</div>
  </div>
);

export default CategoryIcon;
