import { FC, useEffect } from "react";
import { Button, Checkbox, Form, Input, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { UploadFile } from "antd/lib/upload";
import {
  FileUpload,
  Select,
  DebounceSelectPart,
  DebounceSelectMachine,
  DebounceSelectProduct,
} from "../fields";
import { validateProblemAttachment } from "@/validators";
import { useForm } from "antd/lib/form/Form";
import { IRequestForm } from "@/types/request-form.type";
import { _5M1ESettingStore } from "@/store";
import { IRequestProblemFormState } from "@/store/interface/request-problem-form.interface";
import { IRequestChangePointFormState } from "@/store/interface/request-change-point-form.interface";

interface IProps {
  formStore: IRequestProblemFormState | IRequestChangePointFormState;
  onFinish?: (form: any) => void;
}

const _5M1EReportForm: FC<IProps> = ({ formStore, onFinish }: IProps) => {
  const {
    selectedCategory,
    selectedProductId,
    selectedProcessId,
    selectedItemId,
    selectedLineId,
    selectedItemDetailId,

    categoryList,
    kpiList,
    productList,
    availableLineList,
    availableCategoryItemList,
    availableItemDetailList,
    availableProcessList,
    availableMachineList,
    // availablePartList,

    setSelectedCategory,
    setSelectedItemId,
    setSelectedLineId,
    setSelectedProcessId,
    setSelectedProductId,
    setSelectedItemDetailId,

    reset,
  } = formStore;

  const [form] = useForm<IRequestForm>();
  const [attachmentList, setAttachmentList] = useState<UploadFile[]>([]);
  const [detailOtherInput, setDetailOtherInput] = useState<string>("");

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleInputChanged = (event: any) => {
    setDetailOtherInput(event.currentTarget.value);
  };
  const handleFormValuesChange = () => {
    const itemDetail = form.getFieldValue("detail");
    setSelectedItemDetailId(itemDetail?.item_detail_id ?? null);

    const category = form.getFieldValue("category");
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }

    const product = form.getFieldValue("product");
    if (product !== selectedProductId) {
      setSelectedProductId(product);
      form.setFieldValue("line", null);
      form.setFieldValue("process", null);
      form.setFieldValue("machine", null);
      form.setFieldValue("part", null);
    }

    const line = form.getFieldValue("line");
    if (line !== selectedLineId) {
      setSelectedLineId(line);
      form.setFieldValue("process", null);
      form.setFieldValue("machine", null);
      form.setFieldValue("part", null);
    }

    const process = form.getFieldValue("process");
    if (process !== selectedProcessId) {
      setSelectedProcessId(process);
      form.setFieldValue("machine", null);
      form.setFieldValue("part", null);
    }

    const item = form.getFieldValue("item");
    if (item !== selectedItemId) {
      setSelectedItemId(item?.list_item_id);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="form-5m1e-report"
      onChange={handleFormValuesChange}
      onReset={handleFormValuesChange}
      // onFinish={(v) =>
      //   onFinish?.({
      //     ...v,
      //     attachments: attachmentList,
      //     detail_other: detailOtherInput,
      //   })
      //TODO
      onFinish={(v) => console.log(v)}
    >
      {categoryList().length ? (
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select category" }]}
          required
        >
          <Radio.Group>
            {categoryList().map((cat, idx) => (
              <Radio.Button key={`category-${idx}`} value={cat}>
                {cat}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      ) : null}
      {availableCategoryItemList().length ? (
        <Form.Item
          label="List"
          name="item"
          rules={[{ required: true, message: "Please select list item" }]}
          required
        >
          <Radio.Group>
            {availableCategoryItemList().map((cat, idx) => (
              <Radio.Button key={`item-${idx}`} value={cat}>
                {cat.list_item_name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      ) : null}
      {availableItemDetailList().length ? (
        <Form.Item
          label="Detail"
          name="detail"
          rules={[{ required: true, message: "Please specify detail" }]}
          required
        >
          <Radio.Group>
            {availableItemDetailList().map((itemDetail, idx) => (
              <Radio key={`detail-${idx}`} value={itemDetail}>
                {itemDetail.item_detail_id === -1 ? (
                  <div className="flex items-center">
                    <div className="mr-2">{itemDetail.item_detail}</div>
                    {selectedItemDetailId === -1 ? (
                      <Input
                        placeholder="Detail..."
                        required
                        onChange={handleInputChanged}
                      />
                    ) : null}
                  </div>
                ) : (
                  itemDetail.item_detail
                )}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      ) : null}
      {selectedItemDetailId !== null ? (
        <>
          <div className="grid gap-4 grid-cols-2">
            <Form.Item
              label="KPI"
              name="kpi"
              rules={[{ required: true, message: "Please specify KPI" }]}
              required
            >
              <Checkbox.Group>
                {kpiList().map((cat, idx) => (
                  <Checkbox key={`kpi-${idx}`} value={cat}>
                    {cat}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label="Product"
              name="product"
              rules={[{ required: true, message: "Please select product" }]}
              required
            >
              <DebounceSelectProduct
                placeholder="type to search"
                allowClear={true}
                onChange={handleFormValuesChange}
              />
              {/* <Select
                items={productList()}
                valueKey="id"
                labelKey="full_name"
                onChange={handleFormValuesChange}
              /> */}
            </Form.Item>
            <Form.Item
              label="Line"
              name="line"
              rules={[{ required: true, message: "Please select line" }]}
              required
            >
              <Select
                items={availableLineList()}
                valueKey="id"
                labelKey="line_name"
                onChange={handleFormValuesChange}
              />
            </Form.Item>
            <Form.Item
              label="Process"
              name="process"
              rules={[{ required: true, message: "Please select process" }]}
              // required
            >
              <Select
                items={availableProcessList()}
                valueKey="id"
                labelKey="process_name"
                onChange={handleFormValuesChange}
              />
            </Form.Item>
          </div>
          <div className="grid gap-4 grid-cols-2">
            <Form.Item
              label="Machine"
              name="machine"
              rules={[{ required: true, message: "Please select machine" }]}
              // required
            >
              <DebounceSelectMachine
                placeholder="type to search"
                allowClear={true}
                onChange={handleFormValuesChange}
              />
              {/* <Select
                items={availableMachineList()}
                onChange={handleFormValuesChange}
              /> */}
            </Form.Item>
            <Form.Item
              label="Part"
              name="part"
              rules={[{ required: true, message: "Please select part" }]}
              // required
            >
              <DebounceSelectPart
                placeholder="type to search"
                allowClear={true}
                onChange={handleFormValuesChange}
              />
              {/* <Select
                items={availablePartList()}
                valueKey="id"
                labelKey="id"
                onChange={handleFormValuesChange}
              /> */}
            </Form.Item>
          </div>
          <Form.Item label="Attachment" name="attachments">
            <FileUpload
              listType="picture-card"
              fileList={attachmentList}
              onChange={setAttachmentList}
              validator={validateProblemAttachment}
            />
          </Form.Item>

          <Form.Item label="Note" name="note">
            <TextArea
              className="mx-4"
              style={{ height: 120, resize: "none" }}
              placeholder="Input note here..."
            />
          </Form.Item>

          <Form.Item>
            <div className="flex w-full justify-end mb-4">
              <Button className="mx-1" type="primary" htmlType="reset" danger>
                Reset
              </Button>
              <Button className="mx-1" type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </>
      ) : null}
    </Form>
  );
};

export default _5M1EReportForm;
export { _5M1EReportForm };
