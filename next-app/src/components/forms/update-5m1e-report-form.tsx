import { IRequestForm, IChangeRequestForm } from "@/types/request-form.type";
import {
  Checkbox,
  Form,
  Input,
  Radio,
  DatePicker,
  UploadFile,
  Divider,
} from "antd";
import { FC, useEffect, useState } from "react";
import moment from "moment";
import {
  FileUpload,
  Select,
  DebounceSelectPart,
  DebounceSelectMachine,
  DebounceSelectProduct,
  DebounceSelectUser,
} from "../fields";
import { _5M1ESettingStore } from "@/store";
import { useForm } from "antd/lib/form/Form";
import { validateProblemAttachment } from "@/validators";
import TextArea from "antd/lib/input/TextArea";
import { _5M1ERequest, _5M1EChangeRequest } from "@/types/request.type";
import {
  DefaultItemDetail,
  DefaultListItem,
  FileUploadedKey,
  ItemDetailOther,
} from "@/constant";
import environment from "@/util/environment";
import { IRequestChangePointFormState } from "@/store/interface/request-change-point-form.interface";
import { IRequestProblemFormState } from "@/store/interface/request-problem-form.interface";
import { is5M1ERequest, is5M1EChangeRequest } from "@/functions";

interface IProps {
  formStore: IRequestProblemFormState | IRequestChangePointFormState;
  children?: React.ReactNode;
  request: _5M1ERequest | _5M1EChangeRequest;
  isEditing?: boolean;
  onFinish: (form: any) => void;
  onReset?: () => void;
}

const Update5M1EReportForm: FC<IProps> = ({
  formStore,
  children,
  request,
  isEditing,
  onFinish,
  onReset,
}: IProps) => {
  const { getProblemListItemByName, getChangePointListItemByName } =
    _5M1ESettingStore();
  const {
    selectedCategory,
    selectedProduct,
    selectedProcessId,
    selectedItem,
    selectedLineId,
    selectedItemDetail,

    categoryList,
    kpiList,
    availableLineList,
    availableCategoryItemList,
    availableItemDetailList,
    availableProcessList,

    setSelectedCategory,
    setSelectedItem,
    setSelectedLineId,
    setSelectedProcessId,
    setSelectedProduct,
    setSelectedItemDetail,

    reset,
  } = formStore;

  const searchListItem = (selectedItem: string) => {
    const listItem = getProblemListItemByName(selectedItem);
    listItem === DefaultListItem
      ? getChangePointListItemByName(selectedItem)
      : listItem;
    return listItem;
  };

  const [form] = useForm<IRequestForm>();
  const [formC] = useForm<IChangeRequestForm>();
  const [attachmentList, setAttachmentList] = useState<UploadFile[]>([]);
  const [detailOtherInput, setDetailOtherInput] = useState<string>("");

  useEffect(() => {
    setSelectedItem(searchListItem(request.request_data_value.item));
    setRequestToForm();
    return () => {
      reset();
    };
  }, [reset]);

  useEffect(() => {
    if (isEditing) {
      setRequestToForm();
    }
  }, [isEditing]);
  const request_r: _5M1ERequest | _5M1EChangeRequest = request;
  const setRequestToForm = () => {
    if (is5M1ERequest(request)) {
      const reportProblemForm: IRequestForm = {
        category: request.request_data_value.category,
        kpi: request.request_data_value.kpi,
        note: request.request_data_value.note,
        machine: request.request_data_value.machine,
        attachments: [],
        attachmentUrlList: request.request_data_value.attachmentList,
        detail: request.request_data_value.detail
          ? request.request_data_value.detail ?? DefaultItemDetail.item_detail
          : ItemDetailOther.item_detail,
        detail_other: request.request_data_value.detailOther,
        full_detail: request.request_data_value.fullDetail,
        part: request.request_data_value.partNo,
        item:
          getProblemListItemByName(request.request_data_value.item) ??
          DefaultListItem,
        line: +request.request_data_value.lineId,
        process: +request.request_data_value.processId,
        product: request.request_data_value.product,
      };

      setDetailOtherInput(request.request_data_value.detailOther);
      setSelectedCategory(reportProblemForm.category);
      setSelectedItem(reportProblemForm.item);
      setSelectedItemDetail(reportProblemForm.detail);
      setSelectedLineId(reportProblemForm.line);
      setSelectedProduct(reportProblemForm.product);
      setAttachmentList(
        request.request_data_value.attachmentList.map<UploadFile>(
          (attachment, index) => {
            const isUrl = attachment.startsWith("http");
            return {
              uid: `${FileUploadedKey}-${index}`,
              name: attachment,
              status: "done",
              url: isUrl ? attachment : `${environment.API_URL}${attachment}`,
            };
          }
        )
      );
      Object.entries(reportProblemForm).forEach((entries) => {
        const [key, value] = entries;
        form.setFieldValue(key, value);
      });
    } else if (is5M1EChangeRequest(request_r)) {
      const reportChangeForm: IChangeRequestForm = {
        category: request_r.request_data_value.category,
        kpi: request_r.request_data_value.kpi,
        note: request_r.request_data_value.note,
        machine: request_r.request_data_value.machine,
        attachments: [],
        attachmentUrlList: request_r.request_data_value.attachmentList,
        detail: request_r.request_data_value.detail
          ? request_r.request_data_value.detail ?? DefaultItemDetail.item_detail
          : ItemDetailOther.item_detail,
        detail_other: request_r.request_data_value.detailOther,
        full_detail: request_r.request_data_value.fullDetail,
        act_person: request_r.request_data_value.actPerson,
        part: request_r.request_data_value.partNo,
        act_time: moment(request_r.request_data_value.actTime, "D/MM/Y, HH:mm"),
        act_result: request_r.request_data_value.actResult,
        resp_person: request_r.request_data_value.respPerson,
        item:
          getChangePointListItemByName(request_r.request_data_value.item) ??
          DefaultListItem,
        line: +request_r.request_data_value.lineId,
        process: +request_r.request_data_value.processId,
        product: request_r.request_data_value.product,
      };

      setDetailOtherInput(request_r.request_data_value.detailOther);
      setSelectedCategory(reportChangeForm.category);
      setSelectedItem(reportChangeForm.item);
      setSelectedItemDetail(reportChangeForm.detail);
      setSelectedLineId(reportChangeForm.line);
      setSelectedProduct(reportChangeForm.product);
      setAttachmentList(
        request_r.request_data_value.attachmentList.map<UploadFile>(
          (attachment, index) => {
            const isUrl = attachment.startsWith("http");
            return {
              uid: `${FileUploadedKey}-${index}`,
              name: attachment,
              status: "done",
              url: isUrl ? attachment : `${environment.API_URL}${attachment}`,
            };
          }
        )
      );

      Object.entries(reportChangeForm).forEach((entries) => {
        const [key, value] = entries;
        formC.setFieldValue(key, value);
      });
    }
  };

  const handleInputChanged = (event: any) => {
    form.setFieldValue("detail_other", event.currentTarget.value);
    formC.setFieldValue("detail_other", event.currentTarget.value);
  };
  const handleFormReset = () => {
    setRequestToForm();
    onReset?.();
  };

  const handleFormValuesProblem = () => {
    const itemDetail = form.getFieldValue("detail");
    setSelectedItemDetail(itemDetail ?? null);

    const category = form.getFieldValue("category");
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      form.setFieldValue("detail", null);
      form.setFieldValue("item", null);
    }

    const item = form.getFieldValue("item");
    if (item !== selectedItem) {
      setSelectedItem(item);
      form.setFieldValue("detail", null);
      form.setFieldValue("line", null);
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
    if (product !== selectedProduct) {
      setSelectedProduct(product);
      form.setFieldValue("part", null);
    }
  };

  const handleFormValuesChange = () => {
    const itemDetail = formC.getFieldValue("detail");
    setSelectedItemDetail(itemDetail ?? null);

    const category = formC.getFieldValue("category");
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      formC.setFieldValue("detail", null);
      formC.setFieldValue("item", null);
    }

    const item = formC.getFieldValue("item");
    if (item !== selectedItem) {
      setSelectedItem(item);
      formC.setFieldValue("detail", null);
      formC.setFieldValue("line", null);
    }

    const line = formC.getFieldValue("line");
    if (line !== selectedLineId) {
      setSelectedLineId(line);
      formC.setFieldValue("process", null);
      formC.setFieldValue("product", null);
      formC.setFieldValue("machine", null);
      formC.setFieldValue("part", null);
    }

    const process = formC.getFieldValue("process");
    if (process !== selectedProcessId) {
      setSelectedProcessId(process);
      formC.setFieldValue("product", null);
      formC.setFieldValue("machine", null);
      formC.setFieldValue("part", null);
    }

    const product = formC.getFieldValue("product");
    if (product !== selectedProduct) {
      setSelectedProduct(product);
      formC.setFieldValue("part", null);
    }
  };
  /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    CAUTION DO NOT USE "useEffect" to reset any selectedValue in this file!!!
    DUE TO IT WILL CAUSE SOME VALUE TO NOT SHOW CORRECTLY
    useEffect(() => {
      setSelectedItem(null);
      setSelectedItemDetail(null);
    }, [selectedCategory]);

    useEffect(() => {
      setSelectedItemDetail(null);
    }, [selectedItem]);
  */

  if (request.request_data_value.category === "No change") {
    return (
      <Form
        form={formC}
        disabled={!isEditing}
        scrollToFirstError
        onChange={handleFormValuesChange}
        onReset={handleFormReset}
        onFinish={(v) => {
          // console.log(v);
          onFinish({
            ...v,
          });
        }}
      >
        {children}
        <div>
          <span className="report report-header">No change</span>
          <Divider type="vertical" />
          <span className="report report-request-no">
            <b>Request No.:</b> {request.request_change_no}
          </span>
        </div>
        <Divider />
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
        </div>
        <Form.Item label="Note" name="note">
          <TextArea
            className="mx-4"
            style={{ height: 120, resize: "none" }}
            placeholder="Input note here..."
          />
        </Form.Item>
      </Form>
    );
  }

  if (is5M1EChangeRequest(request)) {
    return (
      <Form
        form={formC}
        disabled={!isEditing}
        scrollToFirstError
        onChange={handleFormValuesChange}
        onReset={handleFormReset}
        onFinish={(v) => {
          // console.log(v);
          onFinish({
            ...v,
            attachments: attachmentList,
            detail_other: detailOtherInput,
          });
        }}
      >
        {children}
        <div>
          <span className="report report-header">Change Report</span>
          <Divider type="vertical" />
          <span className="report report-request-no">
            <b>Request No.:</b> {request.request_change_no}
          </span>
        </div>
        <Divider />
        <div className="grid gap-4 grid-cols-4">
          {categoryList().length ? (
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select category" }]}
              required
            >
              <Radio.Group>
                {categoryList()
                  .filter((cat) => cat !== "No change")
                  .map((cat, idx) => (
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
                {availableCategoryItemList().map((list_item, idx) => (
                  <Radio.Button key={`item-${idx}`} value={list_item}>
                    {list_item.list_item_name}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : null}
          {availableItemDetailList().length && (
            <Form.Item
              label="Detail"
              name="detail"
              rules={[{ required: true, message: "Please specify detail" }]}
              required
            >
              <Radio.Group>
                {availableItemDetailList().map((itemDetail, idx) => (
                  <Radio key={`detail-${idx}`} value={itemDetail.item_detail}>
                    {itemDetail.item_detail === "Other" ? (
                      <div className="flex items-center">
                        <div className="mr-2">{itemDetail.item_detail}</div>
                        {selectedItemDetail === "Other" && (
                          <Input
                            placeholder="Detail..."
                            defaultValue={
                              request.request_data_value.detailOther
                            }
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
          <Form.Item label="More detail" name="full_detail">
            <TextArea
              className="mx-4"
              style={{ height: 120, resize: "none" }}
              // placeholder="Input more detail here..."
            />
          </Form.Item>
          <Form.Item
            label="Who"
            name="act_person"
            rules={[{ required: true, message: "Please identify who's doing" }]}
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
            <DatePicker showTime={{ format: "HH:mm" }} format="D/MM/Y HH:mm" />
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
              {kpiList().map((kpi, idx) => (
                <Checkbox key={`kpi-${idx}`} value={kpi}>
                  {kpi}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
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
              // placeholder="will be shown after select line"
              valueKey="id"
              labelKey="process_name"
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item
            label="Product"
            name="product"
            rules={[{ required: true, message: "Please select product" }]}
            required
          >
            <DebounceSelectProduct
              // placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item label="Machine" name="machine">
            <DebounceSelectMachine
              // placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesChange}
            />
          </Form.Item>
          <Form.Item label="Part" name="part">
            <DebounceSelectPart
              // placeholder="type to search"
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
          <Form.Item label="Note" name="note">
            <TextArea
              className="mx-4"
              style={{ height: 120, resize: "none" }}
              // placeholder="Input note here..."
            />
          </Form.Item>
        </div>
      </Form>
    );
  } else {
    return (
      <Form
        form={form}
        disabled={!isEditing}
        scrollToFirstError
        onChange={handleFormValuesProblem}
        onReset={handleFormReset}
        onFinish={(v) => {
          // console.log(v);
          onFinish?.({
            ...v,
            attachments: attachmentList,
            detail_other: detailOtherInput,
          });
        }}
      >
        {children}
        <div>
          <span className="report report-header">Problem Report</span>
          <Divider type="vertical" />
          <span className="report report-request-no">
            <b>Request No.:</b> {request.request_problem_no}
          </span>
        </div>
        <Divider />
        <div className="grid gap-4 grid-cols-4">
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
                {availableCategoryItemList().map((list_item, idx) => (
                  <Radio.Button key={`item-${idx}`} value={list_item}>
                    {list_item.list_item_name}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : null}
          {availableItemDetailList().length && (
            <Form.Item
              label="Detail"
              name="detail"
              rules={[{ required: true, message: "Please specify detail" }]}
              required
            >
              <Radio.Group>
                {availableItemDetailList().map((itemDetail, idx) => (
                  <Radio key={`detail-${idx}`} value={itemDetail.item_detail}>
                    {itemDetail.item_detail === "Other" ? (
                      <div className="flex items-center">
                        <div className="mr-2">{itemDetail.item_detail}</div>
                        {selectedItemDetail === "Other" && (
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
          <Form.Item label="More detail" name="full_detail">
            <TextArea
              className="mx-4"
              style={{ height: 120, resize: "none" }}
              // placeholder="Input more detail here..."
            />
          </Form.Item>

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
              onChange={handleFormValuesProblem}
            />
          </Form.Item>
          <Form.Item label="Process" name="process">
            <Select
              items={availableProcessList()}
              // placeholder="will be shown after select line"
              valueKey="id"
              labelKey="process_name"
              onChange={handleFormValuesProblem}
            />
          </Form.Item>
          <Form.Item
            label="Product"
            name="product"
            rules={[{ required: true, message: "Please select product" }]}
            required
          >
            <DebounceSelectProduct
              // placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesProblem}
            />
          </Form.Item>
          <Form.Item label="Machine" name="machine">
            <DebounceSelectMachine
              // placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesProblem}
            />
          </Form.Item>
          <Form.Item label="Part" name="part">
            <DebounceSelectPart
              // placeholder="type to search"
              allowClear={true}
              onChange={handleFormValuesProblem}
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
          <Form.Item label="Note" name="note">
            <TextArea
              className="mx-4"
              style={{ height: 120, resize: "none" }}
              // placeholder="Input note here..."
            />
          </Form.Item>
        </div>
      </Form>
    );
  }
};

export default Update5M1EReportForm;
export { Update5M1EReportForm };
