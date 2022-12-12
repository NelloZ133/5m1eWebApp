import { FC } from "react";
import { Select as AntSelect } from "antd";

interface IProps {
  items: any[];
  mode?: "multiple" | "tags";
  value?: any;
  valueKey?: string;
  labelKey?: string;
  placeholder?: React.ReactNode;
  allowClear?: boolean;
  onChange?: (value: any) => void;
}

const Select: FC<IProps> = ({
  value,
  valueKey,
  labelKey,
  items,
  placeholder,
  allowClear,
  mode,
  onChange,
}: IProps) => {
  const getItemValue = (item: string | any) => {
    if (valueKey) {
      return item[valueKey];
    }
    return item;
  };
  const getItemLabel = (item: string | any) => {
    if (labelKey) {
      return item[labelKey];
    }
    return item;
  };

  return (
    <AntSelect
      mode={mode}
      value={value}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
    >
      {items.map((item, index) => (
        <AntSelect.Option value={getItemValue(item)} key={`select-${index}`}>
          {getItemLabel(item)}
        </AntSelect.Option>
      ))}
    </AntSelect>
  );
};

export default Select;
export { Select };
