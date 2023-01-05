import {
  Select,
  DebounceSelectFilterProduct,
  DebounceSelectFilterPart,
  DebounceSelectFilterLine,
  DebounceSelectFilterProcess,
  DebounceSelectFilterMachine,
} from "@/components/fields";
import { FilterRequestType, KPI_LIST } from "@/constant";
import { RequestFilterStore } from "@/store/request-filter.store";
import { IRequestFilterForm } from "@/types/request-form.type";
import { Button, Form, Input, Radio, Space, Divider } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FC, useEffect } from "react";

interface IProps {
  onFinish: (form: IRequestFilterForm) => void;
}

export const RequestFilter: FC<IProps> = ({ onFinish }: IProps) => {
  const { setSelectedRequestType, availableCategory, reset } =
    RequestFilterStore();
  const [form] = useForm<IRequestFilterForm>();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [form, reset, setSelectedRequestType]);

  return (
    <>
      <Form
        form={form}
        className="request-filter-form"
        initialValues={{
          requestType: FilterRequestType[0],
        }}
        onFinish={onFinish}
        onReset={reset}
      >
        <div className="grid gap-4 grid-cols-4">
          <Form.Item label="Category" name="category">
            <Select
              items={availableCategory()}
              placeholder={<div>Search by category</div>}
              allowClear
            />
          </Form.Item>
          <Form.Item label="KPI" name="kpi">
            <Select
              mode="tags"
              items={KPI_LIST}
              placeholder={<div>Search by KPI</div>}
              allowClear
            />
          </Form.Item>
          <Form.Item label="Product" name="product">
            <DebounceSelectFilterProduct
              placeholder="type to search product..."
              allowClear={true}
            />
          </Form.Item>
          <Form.Item label="Part" name="part">
            <DebounceSelectFilterPart
              placeholder="type to search part..."
              allowClear={true}
            />
          </Form.Item>
          <Form.Item label="Line" name="line">
            <DebounceSelectFilterLine
              placeholder="type to search line..."
              allowClear={true}
            />
          </Form.Item>
          <Form.Item label="Process" name="process">
            <DebounceSelectFilterProcess
              placeholder="type to search process..."
              allowClear={true}
            />
          </Form.Item>
          <Form.Item label="Machine" name="machine">
            <DebounceSelectFilterMachine
              placeholder="type to search machine..."
              allowClear={true}
            />
          </Form.Item>
          <Form.Item label="Informer" name="informer">
            <Input placeholder="Search by informer" />
          </Form.Item>
        </div>
        <div className="filter-gap" />
        <div className="grid gap-4 grid-cols-4">
          <Form.Item label="Type" name="requestType">
            <Radio.Group>
              <Space split={<Divider type="vertical" />}>
                {FilterRequestType.map((reqName, index) => (
                  <Radio.Button key={`request-${index}`} value={reqName}>
                    {reqName}
                  </Radio.Button>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
          <span />
          <span />
          <Form.Item>
            <Button className="mx-1" htmlType="reset">
              Clear filter
            </Button>
            <Button className="mx-1" type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};
