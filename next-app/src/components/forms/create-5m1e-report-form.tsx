import { FC, useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  DatePicker,
  // TimePicker,
  Space,
} from "antd";
// import type { DatePickerProps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { UploadFile } from "antd/lib/upload";
import {
  FileUpload,
  Select,
  DebounceSelectPart,
  DebounceSelectMachine,
  DebounceSelectProduct,
  DebounceSelectUser,
} from "../fields";
import { validateProblemAttachment } from "@/validators";
import { useForm } from "antd/lib/form/Form";
import { IRequestForm, IChangeRequestForm } from "@/types/request-form.type";
import { _5M1ESettingStore } from "@/store";
import { IRequestProblemFormState } from "@/store/interface/request-problem-form.interface";
import { IRequestChangePointFormState } from "@/store/interface/request-change-point-form.interface";

interface IProps {
  formStore: IRequestProblemFormState | IRequestChangePointFormState;
  onFinish: (form: any) => void;
  formType: string;
}

const _5M1EReportForm: FC<IProps> = ({
  formStore,
  onFinish,
  formType,
}: IProps) => {
  const {
    selectedCategory,
    selectedProductId,
    selectedProcessId,
    selectedItemId,
    selectedLineId,
    selectedItemDetailId,

    categoryList,
    kpiList,
    availableLineList,
    availableCategoryItemList,
    availableItemDetailList,
    availableProcessList,

    setSelectedCategory,
    setSelectedItemId,
    setSelectedLineId,
    setSelectedProcessId,
    setSelectedProductId,
    setSelectedItemDetailId,

    reset,
  } = formStore;

  const [form] = useForm<IRequestForm>();
  const [formC] = useForm<IChangeRequestForm>();
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

  const handleFormValuesProblem = () => {
    const itemDetail = form.getFieldValue("detail");
    setSelectedItemDetailId(itemDetail ?? null);

    const category = form.getFieldValue("category");
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      form.setFieldValue("detail", null);
      form.setFieldValue("item", null);
    }

    const item = form.getFieldValue("item");
    if (item !== selectedItemId) {
      setSelectedItemId(item);
      form.setFieldValue("detail", null)
    }

    const line = form.getFieldValue("line");
    if (line !== selectedLineId) {
      setSelectedLineId(line);
      form.setFieldValue("process", null);
      form.setFieldValue("product", null);
      form.setFieldValue("machine", null);
      form.setFieldValue("part", null);
    }

    const process = form.getFieldValue("process");
    if (process !== selectedProcessId) {
      setSelectedProcessId(process);
      form.setFieldValue("product", null);
      form.setFieldValue("machine", null);
      form.setFieldValue("part", null);
    }

    const product = form.getFieldValue("product");
    if (product !== selectedProductId) {
      setSelectedProductId(product);
      form.setFieldValue("part", null);
    }
  };

  const handleFormValuesChange = () => {
    const itemDetail = formC.getFieldValue("detail");
    setSelectedItemDetailId(itemDetail ?? null);

    const category = formC.getFieldValue("category");
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      form.setFieldValue("detail", null);
      form.setFieldValue("item", null);
    }

    const line = formC.getFieldValue("line");
    if (line !== selectedLineId) {
      setSelectedLineId(line);
      form.setFieldValue("process", null);
      form.setFieldValue("product", null);
      form.setFieldValue("machine", null);
      form.setFieldValue("part", null);
    }

    const process = formC.getFieldValue("process");
    if (process !== selectedProcessId) {
      setSelectedProcessId(process);
      form.setFieldValue("product", null);
      form.setFieldValue("machine", null);
      form.setFieldValue("part", null);
    }

    const product = formC.getFieldValue("product");
    if (product !== selectedProductId) {
      setSelectedProductId(product);
      form.setFieldValue("part", null);
    }
    const item = formC.getFieldValue("item");
    if (item !== selectedItemId) {
      setSelectedItemId(item);
    }
  };

  useEffect(() => {
    setSelectedItemId(null)
    setSelectedItemDetailId(null);
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedItemDetailId(null);
  }, [selectedItemId]);

  if (formType === "change") {
    return (
      <Form
        form={formC}
        layout="vertical"
        className="form-5m1e-report"
        scrollToFirstError
        onChange={handleFormValuesChange}
        onReset={handleFormValuesChange}
        onFinish={(v) => {
          console.log(v);
          onFinish({
            ...v,
            attachments: attachmentList,
            detail_other: detailOtherInput,
          });
        }}
      >
        {categoryList().length && (
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
        )}
        {selectedCategory === "No change" ? (
          <>
            <div className="grid gap-6 grid-cols-2">
              <Form.Item
                label="Line"
                name="line"
                rules={[{ required: true, message: "Please select line" }]}
                required
              >
                <Select
                  items={availableLineList()}
                  placeholder="select line..."
                  valueKey="id"
                  labelKey="line_name"
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
              <Space />
            </div>
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
        ) : availableCategoryItemList().length ? (
          <Form.Item
            label="List"
            name="item"
            rules={[{ required: true, message: "Please select list item" }]}
            required
          >
            <Radio.Group>
              {availableCategoryItemList().map((list_item, idx) => (
                <Radio.Button
                  key={`item-${idx}`}
                  value={list_item.list_item_id}
                >
                  {list_item.list_item_name}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        ) : null} {/* if not return default as null, it's will return 0. I don't know why but it's occur just like that */}
        {(availableItemDetailList().length > 1 || selectedItemId === 41) && (
          <Form.Item
            label="Detail"
            name="detail"
            rules={[{ required: true, message: "Please specify detail" }]}
            required
          >
            <Radio.Group>
              {availableItemDetailList().map((itemDetail, idx) => (
                <Radio key={`detail-${idx}`} value={itemDetail.item_detail_id}>
                  {itemDetail.item_detail_id === -1 ? (
                    <div className="flex items-center">
                      <div className="mr-2">{itemDetail.item_detail}</div>
                      {selectedItemDetailId === -1 && (
                        <Input
                          placeholder="Detail..."
                          required
                          onChange={handleInputChanged}
                        />
                      )}
                    </div>
                  ) : (
                    itemDetail.item_detail
                  )}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        )}
        {selectedItemDetailId !== null && (
          <>
            <div className="w-full">
              <Form.Item label="More detail" name="full_detail">
                <TextArea
                  className="mx-4"
                  style={{ height: 120, resize: "none" }}
                  placeholder="Input more detail here..."
                />
              </Form.Item>
            </div>
            <div className="grid gap-6 grid-cols-3">
              <Form.Item
                label="Who"
                name="act_person"
                rules={[
                  { required: true, message: "Please identify who's doing" },
                ]}
                required
              >
                <DebounceSelectUser
                  placeholder="type to search"
                  allowClear={true}
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
              <Form.Item
                label="When"
                name="act_time"
                rules={[
                  { required: true, message: "Please identify when it occurs" },
                ]}
                required
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
              <Form.Item
                label="Action Result"
                name="act_result"
                rules={[
                  {
                    required: true,
                    message: "Please select the action result",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="ok">OK</Radio>
                  <Radio value="ng">NG</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="grid gap-12 grid-cols-2">
              <Form.Item
                label="Responsible Person"
                name="resp_person"
                rules={[
                  {
                    required: true,
                    message: "Please identify in-charge person",
                  },
                ]}
                required
              >
                <DebounceSelectUser
                  placeholder="type to search"
                  allowClear={true}
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
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
            </div>
            <div className="grid gap-6 grid-cols-2">
              <Form.Item
                label="Line"
                name="line"
                rules={[{ required: true, message: "Please select line" }]}
                required
              >
                <Select
                  items={availableLineList()}
                  placeholder="select line..."
                  valueKey="id"
                  labelKey="line_name"
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
              <Form.Item label="Process" name="process">
                <Select
                  items={availableProcessList()}
                  placeholder="will be shown after select line"
                  valueKey="id"
                  labelKey="process_name"
                  onChange={handleFormValuesChange}
                  allowClear={true}
                />
              </Form.Item>
            </div>
            <div className="grid gap-4 grid-cols-2">
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
              </Form.Item>
              <Form.Item label="Machine" name="machine">
                <DebounceSelectMachine
                  placeholder="type to search"
                  allowClear={true}
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
              <Form.Item label="Part" name="part">
                <DebounceSelectPart
                  placeholder="type to search"
                  allowClear={true}
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
              <Form.Item label="Attachment" name="attachments">
                <FileUpload
                  listType="picture-card"
                  fileList={attachmentList}
                  onChange={setAttachmentList}
                  validator={validateProblemAttachment}
                />
              </Form.Item>
            </div>
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
        )}
      </Form>
    );
  } else {
    return (
      <Form
        form={form}
        layout="vertical"
        className="form-5m1e-report"
        scrollToFirstError
        onChange={handleFormValuesProblem}
        onReset={handleFormValuesProblem}
        onFinish={(v) => {
          console.log(v);
          onFinish({
            ...v,
            attachments: attachmentList,
            detail_other: detailOtherInput,
          });
        }}
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
        {selectedCategory === "No change" ? (
          <>
            <div className="grid gap-6 grid-cols-2">
              <Form.Item
                label="Line"
                name="line"
                rules={[{ required: true, message: "Please select line" }]}
                required
              >
                <Select
                  items={availableLineList()}
                  placeholder="select line..."
                  valueKey="id"
                  labelKey="line_name"
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
              <Space />
            </div>
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
        ) : availableCategoryItemList().length ? (
          <Form.Item
            label="List"
            name="item"
            rules={[{ required: true, message: "Please select list item" }]}
            required
          >
            <Radio.Group>
              {availableCategoryItemList().map((list_item, idx) => (
                <Radio.Button
                  key={`item-${idx}`}
                  value={list_item.list_item_id}
                >
                  {list_item.list_item_name}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        ) : null}
        {availableItemDetailList().length > 1 || selectedItemId !== null ? (
          <Form.Item
            label="Detail"
            name="detail"
            rules={[{ required: true, message: "Please specify detail" }]}
            required
          >
            <Radio.Group>
              {availableItemDetailList().map((itemDetail, idx) => (
                <Radio key={`detail-${idx}`} value={itemDetail.item_detail_id}>
                  {itemDetail.item_detail_id === -1 ? (
                    <div className="flex items-center">
                      <div className="mr-2">{itemDetail.item_detail}</div>
                      {selectedItemDetailId === -1 && (
                        <Input
                          placeholder="Detail..."
                          required
                          onChange={handleInputChanged}
                        />
                      )}
                    </div>
                  ) : (
                    itemDetail.item_detail
                  )}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        ) : null}
        {selectedItemDetailId !== null && (
          <>
            <div className="w-full">
              <Form.Item label="More detail" name="full_detail">
                <TextArea
                  className="mx-4"
                  style={{ height: 120, resize: "none" }}
                  placeholder="Input more detail here..."
                />
              </Form.Item>
            </div>
            <div className="grid gap-6 grid-cols-3">
              <Form.Item
                label="Who"
                name="act_person"
                rules={[
                  { required: true, message: "Please identify who's doing" },
                ]}
                required
              >
                <DebounceSelectUser
                  placeholder="type to search"
                  allowClear={true}
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
              <Form.Item
                label="When"
                name="act_time"
                rules={[
                  { required: true, message: "Please identify when it occurs" },
                ]}
                required
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
              <Form.Item
                label="Action Result"
                name="act_result"
                rules={[
                  {
                    required: true,
                    message: "Please select the action result",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="ok">OK</Radio>
                  <Radio value="ng">NG</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="grid gap-12 grid-cols-2">
              <Form.Item
                label="Responsible Person"
                name="resp_person"
                rules={[
                  {
                    required: true,
                    message: "Please identify in-charge person",
                  },
                ]}
                required
              >
                <DebounceSelectUser
                  placeholder="type to search"
                  allowClear={true}
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
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
            </div>
            <div className="grid gap-6 grid-cols-2">
              <Form.Item
                label="Line"
                name="line"
                rules={[{ required: true, message: "Please select line" }]}
                required
              >
                <Select
                  items={availableLineList()}
                  placeholder="select line..."
                  valueKey="id"
                  labelKey="line_name"
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
              <Form.Item label="Process" name="process">
                <Select
                  items={availableProcessList()}
                  placeholder="will be shown after select line"
                  valueKey="id"
                  labelKey="process_name"
                  onChange={handleFormValuesChange}
                  allowClear={true}
                />
              </Form.Item>
            </div>
            <div className="grid gap-4 grid-cols-2">
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
              </Form.Item>
              <Form.Item label="Machine" name="machine">
                <DebounceSelectMachine
                  placeholder="type to search"
                  allowClear={true}
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
              <Form.Item label="Part" name="part">
                <DebounceSelectPart
                  placeholder="type to search"
                  allowClear={true}
                  onChange={handleFormValuesChange}
                />
              </Form.Item>
              <Form.Item label="Attachment" name="attachments">
                <FileUpload
                  listType="picture-card"
                  fileList={attachmentList}
                  onChange={setAttachmentList}
                  validator={validateProblemAttachment}
                />
              </Form.Item>
            </div>
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
        )}
      </Form>
    );
  }
};

export default _5M1EReportForm;
export { _5M1EReportForm };
