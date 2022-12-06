import { getAllRequest } from "@/actions";
import { Select } from "@/components/fields";
import { DefaultRequestProblemItem } from "@/constant";
import { RequestConfigStore, _5M1ERequestStore, _5M1ESettingStore } from "@/store";
import { ISelectProblemRequestForm } from "@/types/request-form.type";
import { _5M1ERequest, _5M1ERequestSelect } from "@/types/request.type";
import { Form, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FC, useEffect, useMemo } from "react";

interface IProps {
  title: string,
  visible: boolean
  onFinish?: (form: ISelectProblemRequestForm) => void,
  onCancel?: () => void
}
const SelectRequestProblemModal: FC<IProps> = ({ title, visible, onFinish, onCancel }: IProps) => {
  const [form] = useForm()
  const { requestList } = _5M1ERequestStore()
  const { transition, isRequestProblemFinished } = RequestConfigStore()

  const availableRequestProblemForChangePointList = useMemo(() => [
    ...requestList
      .filter(request => isRequestProblemFinished(transition?.[request.actionList[request.actionList.length - 1]?.transition_id]))
      .map<_5M1ERequestSelect>(request => ({
        request_id: request.request_id,
        request_no: request.request_problem_no ?? `Something went wrong, Ref: ${request.request_id}`
      })),
    DefaultRequestProblemItem
  ], [requestList, isRequestProblemFinished, transition])
  useEffect(() => {
    if (visible) {
      getAllRequest()
    }
  }, [visible])
  const handleOk = () => {
    onFinish?.({
      requestProblemId: form.getFieldValue('requestProblemId')
    })
  }
  const handleCancel = () => {
    onCancel?.()
  }
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered>
      <Form
        form={form}>
        <Form.Item
          label="Request Problem"
          name="requestProblemId"
          rules={[{ required: true, message: 'Please select request problem' }]}
          initialValue="-1">
          <Select
            items={availableRequestProblemForChangePointList}
            labelKey="request_no"
            valueKey="request_id"
            placeholder="Please select problem request" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SelectRequestProblemModal
export { SelectRequestProblemModal }
