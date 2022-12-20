import { Select } from "@/components/fields";
import { _5M1ESettingStore } from "@/store";
import { Form, Input, Modal, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FC, useEffect } from "react";

interface IProps {
  title: string;
  isLoading?: boolean;
  showEmailSelect: boolean;
  showActionInput: boolean;
  showSelectSupporter: boolean;
  showSelectConfirmation: boolean;
  visible: boolean;
  onFinish?: (form: any) => void;
  onCancel?: () => void;
}
export const ActionModal: FC<IProps> = ({
  title,
  isLoading,
  showSelectSupporter,
  showEmailSelect,
  showActionInput,
  showSelectConfirmation,
  visible,
  onFinish,
  onCancel,
}: IProps) => {
  const [form] = useForm();
  const { availableEmailForSubmitList, availableSupporterList } =
    _5M1ESettingStore();

  const handleOk = () => {
    onFinish?.({
      mailList: form.getFieldValue("mailList"),
      actionNote: form.getFieldValue("actionNote"),
      supporterList: form.getFieldValue("supporterList"),
      confirmationList: form.getFieldValue("confirmationList"),
    });
  };
  const handleCancel = () => {
    onCancel?.();
  };

  useEffect(() => {
    if (visible && showActionInput) {
      form.setFieldValue("actionNote", "-");
    }

    if (!visible) {
      form.resetFields([
        "mailList",
        "actionNote",
        "supporterList",
        "confirmationList",
      ]);
    }
  }, [visible, form, showActionInput]);

  return (
    <>
      <Modal
        title={title}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Spin spinning={isLoading ?? false}>
          <Form form={form}>
            {showEmailSelect ? (
              <Form.Item
                label="Mailing List"
                name="mailList"
                rules={[
                  { required: true, message: "Please select notify people" },
                ]}
              >
                <Select
                  items={availableEmailForSubmitList()}
                  labelKey="email"
                  valueKey="email"
                  mode="multiple"
                  placeholder="Please select notify people"
                />
              </Form.Item>
            ) : null}
            {showActionInput ? (
              <Form.Item
                label="Action Note"
                name="actionNote"
                rules={[
                  { required: true, message: "Please input action note" },
                ]}
              >
                <Input placeholder="Action Note..." />
              </Form.Item>
            ) : null}
            {showSelectSupporter ? (
              <Form.Item
                label="Supporter"
                name="supporterList"
                rules={[{ required: true, message: "Please select supporter" }]}
              >
                <Select
                  items={availableSupporterList()}
                  labelKey="email"
                  valueKey="email"
                  mode="multiple"
                  placeholder="Please select supporter"
                />
              </Form.Item>
            ) : null}
            {showSelectConfirmation ? (
              <Form.Item
                label="Confirmation"
                name="confirmationList"
                rules={[
                  { required: true, message: "Please select confirmation" },
                ]}
              >
                <Select
                  items={availableSupporterList()}
                  labelKey="email"
                  valueKey="email"
                  mode="multiple"
                  placeholder="Please select confirmation"
                />
              </Form.Item>
            ) : null}
          </Form>
        </Spin>
      </Modal>
    </>
  );
};
