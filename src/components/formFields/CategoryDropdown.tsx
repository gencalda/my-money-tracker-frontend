import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ICategory } from 'shared/constants/categories';
import { formFieldWithIconStyle } from 'shared/constants/style';
import { getStringValue } from 'shared/helpers/common';
import DynamicIcon from '../dynamicIcon/DynamicIcon';

export interface ICategoryChangeEvent {
  target: {
    name: string;
    value: ICategory | null;
  };
}

interface ICategoryDropdownProps {
  categoryList: ICategory[];
  label: string;
  value?: ICategory | null;
  name: string;
  onChange: (event: ICategoryChangeEvent) => void;
  errorMessage?: string;
}

interface ICategoryIconProps {
  id: string;
  iconLib: string;
  iconName: string;
  label: string;
}

const CategoryIcon: React.FC<ICategoryIconProps> = ({
  id,
  label,
  iconLib,
  iconName,
}) => (
  <div className="flex items-center" key={id}>
    <div className="my-2 ml-4 mr-3 text-lg text-primary">
      <DynamicIcon iconLib={iconLib} iconName={iconName} />
    </div>
    <div className="mt-1">{label}</div>
  </div>
);

const CategoryDropdown: React.FC<ICategoryDropdownProps> = ({
  errorMessage,
  categoryList = [],
  label = '',
  value = null,
  name = '',
  onChange,
}) => {
  const onChangeHandler = (updatedValue: ICategory | null) => {
    onChange?.({ target: { name, value: updatedValue } });
  };

  return (
    <Autocomplete
      value={value}
      options={categoryList}
      onChange={(event, dropdownValue: ICategory | null) =>
        onChangeHandler(dropdownValue)
      }
      renderOption={(props, option) => (
        <li {...props} className="flex">
          <CategoryIcon
            {...props}
            key={option.uuid}
            id={option.uuid}
            label={option.label}
            iconLib={option.iconLib}
            iconName={option.iconName}
          />
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          className="border-0"
          sx={formFieldWithIconStyle(Boolean(errorMessage))}
          helperText={getStringValue(errorMessage)}
        />
      )}
    />
  );
};

export default CategoryDropdown;
