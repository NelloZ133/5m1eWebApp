import React, { FC, useState } from "react";
import { Select, Spin } from "antd";
import type { DebounceSelectProps } from "@/store/interface/debounce.interface";
import debounce from "lodash/debounce";
import {
  OptionValue,
  searchPart,
  searchMachine,
  searchProduct,
  searchUser,
  filterProduct,
  filterMachine,
  filterProcess,
  filterLine,
  filterPart,
} from "@/functions/searchData";

interface IDebounceProps {
  value?: any;
  placeholder?: string;
  allowClear?: boolean;
  onChange?: (value: any) => void;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({
  fetchOptions,
  debounceTimeout = 500,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  // const fetchRef = useRef(0);

  const loadOptions = (value: string) => {
    // fetchRef.current += 1;
    // const fetchId = fetchRef.current;
    setOptions([]);
    setFetching(true);

    fetchOptions(value).then((newOptions) => {
      // if (fetchId !== fetchRef.current) {
      //   return;
      // }
      setOptions(newOptions);
      setFetching(false);
    });
  };

  return (
    <Select
      // labelInValue
      filterOption={false}
      onSearch={debounce(loadOptions, debounceTimeout)}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

const DebounceSelectPart: FC<IDebounceProps> = ({
  value,
  placeholder,
  allowClear,
  onChange,
}: IDebounceProps) => {
  return (
    <DebounceSelect
      showSearch
      value={value}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      fetchOptions={searchPart}
    />
  );
};

const DebounceSelectMachine: FC<IDebounceProps> = ({
  value,
  placeholder,
  allowClear,
  onChange,
}: IDebounceProps) => {
  return (
    <DebounceSelect
      showSearch
      value={value}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      fetchOptions={searchMachine}
    />
  );
};

const DebounceSelectProduct: FC<IDebounceProps> = ({
  value,
  placeholder,
  allowClear,
  onChange,
}: IDebounceProps) => {
  return (
    <DebounceSelect
      showSearch
      value={value}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      fetchOptions={searchProduct}
    />
  );
};

const DebounceSelectUser: FC<IDebounceProps> = ({
  value,
  placeholder,
  allowClear,
  onChange,
}: IDebounceProps) => {
  return (
    <DebounceSelect
      showSearch
      value={value}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      fetchOptions={searchUser}
    />
  );
};

const DebounceSelectFilterProduct: FC<IDebounceProps> = ({
  value,
  placeholder,
  allowClear,
  onChange,
}: IDebounceProps) => {
  return (
    <DebounceSelect
      showSearch
      value={value}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      fetchOptions={filterProduct}
    />
  );
};

const DebounceSelectFilterPart: FC<IDebounceProps> = ({
  value,
  placeholder,
  allowClear,
  onChange,
}: IDebounceProps) => {
  return (
    <DebounceSelect
      showSearch
      value={value}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      fetchOptions={filterPart}
    />
  );
};

const DebounceSelectFilterLine: FC<IDebounceProps> = ({
  value,
  placeholder,
  allowClear,
  onChange,
}: IDebounceProps) => {
  return (
    <DebounceSelect
      showSearch
      value={value}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      fetchOptions={filterLine}
    />
  );
};

const DebounceSelectFilterProcess: FC<IDebounceProps> = ({
  value,
  placeholder,
  allowClear,
  onChange,
}: IDebounceProps) => {
  return (
    <DebounceSelect
      showSearch
      value={value}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      fetchOptions={filterProcess}
    />
  );
};

const DebounceSelectFilterMachine: FC<IDebounceProps> = ({
  value,
  placeholder,
  allowClear,
  onChange,
}: IDebounceProps) => {
  return (
    <DebounceSelect
      showSearch
      value={value}
      placeholder={placeholder}
      allowClear={allowClear}
      onChange={onChange}
      fetchOptions={filterMachine}
    />
  );
};

export default DebounceSelect;
export {
  DebounceSelectPart,
  DebounceSelectMachine,
  DebounceSelectProduct,
  DebounceSelectUser,
  DebounceSelectFilterProduct,
  DebounceSelectFilterPart,
  DebounceSelectFilterLine,
  DebounceSelectFilterProcess,
  DebounceSelectFilterMachine,
};
