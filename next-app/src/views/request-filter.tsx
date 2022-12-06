import { Select } from "@/components/fields";
import { FilterRequestType, KPI_LIST } from "@/constant";
import { RequestFilterStore } from "@/store/request-filter.store";
import { IRequestFilterForm } from "@/types/request-form.type";
import { Button, Form, Input, Radio } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FC, useEffect } from "react";

interface IProps {
  onFinish: (form: IRequestFilterForm) => void
}

export const RequestFilter: FC<IProps> = ({ onFinish }: IProps) => {
  const {
    setSelectedRequestType,
    availableCategory,
    reset,
  } = RequestFilterStore()
  const [form] = useForm<IRequestFilterForm>()

  useEffect(() => {
    return () => {
      reset()
    }
  }, [form, reset, setSelectedRequestType])

  return <>
    <Form
      form={form}
      className="request-filter-form"
      initialValues={{
        requestType: FilterRequestType[0] 
      }}
      onFinish={onFinish}
      onReset={reset}>
      <div className="grid gap-4 grid-cols-4">
        <Form.Item
          label="Type"
          name="requestType">
          <Radio.Group>
            {FilterRequestType.map((reqName, index) => (
              <Radio.Button key={`request-${index}`} value={reqName}>
                {reqName}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Category"
          name="category">
          <Select
            items={availableCategory()}
            placeholder={<div>Search by category</div>}
            allowClear/>
        </Form.Item>
        <Form.Item
          label="KPI"
          name="kpi">
          <Select
            mode="tags"
            items={KPI_LIST}
            placeholder={<div>Search by KPI</div>}
            allowClear/>
        </Form.Item>
        <Form.Item
          label="Topic"
          name="topic">
          <Input
            placeholder="Search by topic" />
        </Form.Item>
        <Form.Item
          label="Part"
          name="part">
          <Input
            placeholder="Search by part" />
        </Form.Item>
        <Form.Item
          label="Line"
          name="line">
          <Input
            placeholder="Search by line" />
        </Form.Item>
        <Form.Item
          label="Informer"
          name="informer">
          <Input
            placeholder="Search by informer" />
        </Form.Item>
        <Form.Item
          label="Manager"
          name="manager">
          <Input
            placeholder="Search by manager" />
        </Form.Item>
      </div>
      <Form.Item>
        <div className="flex justify-end">
          <Button className="mx-1" htmlType="reset">
            Clear filter
          </Button>
          <Button className="mx-1" type="primary" htmlType="submit">
            Search
          </Button>
        </div>
      </Form.Item>
    </Form>
  </>
}