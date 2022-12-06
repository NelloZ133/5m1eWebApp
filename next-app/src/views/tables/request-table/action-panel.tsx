import { getAllRequest, updateRequestForm } from "@/actions";
import { RequestProblemIdParamName } from "@/constant";
import { _5M1ESettingStore } from "@/store";
import { LayoutStore } from "@/store/layout.store";
import { RequestConfigStore } from "@/store/request-config.store";
import { RequestTransition } from "@/types/request-config.type";
import { _5M1ERequest } from "@/types/request.type";
import { Button, message } from "antd";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { ActionModal } from "./action-modal";

interface IProps {
  request: _5M1ERequest
}
export const ActionPanel: FC<IProps> = ({ request }: IProps) => {
  const {
    action,
    transition,
    getFilteredTransitionByCurrentStateId,
    shouldPromptModal,
    isRequestProblemFinished,
    isShowSelectConfirmation,
    isShowActionNote,
    isShowMailingList,
    isShowSelectSupporter
  } = RequestConfigStore()
  const { canDoActionByGivenTransition } = _5M1ESettingStore()
  const [actionName, setActionName] = useState<string>('')
  const [actionModal, setActionModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedTransition, setSelectedTransition] = useState<RequestTransition | null>(null)

  const router = useRouter()

  const handleActionModalFinish = async (form: any) => {
    setIsLoading(true)
    const transitionId = selectedTransition?.id

    if (transitionId === undefined) {
      message.error(`Not found transition with name: ${selectedTransition?.description}`)
      return setIsLoading(false)
    }
    try {
      await updateRequestForm(
        `${transitionId}`,
        request,
        form.mailList ?? [],
        form.actionNote ?? '',
        form.supporterList ?? [],
        form.confirmationList ?? []
      )
      await getAllRequest()
      setActionModal(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClickAction = async (transition: RequestTransition) => {
    setSelectedTransition(transition)
    if (shouldPromptModal(transition)) {
      setActionName(action[transition.action_id].name)
      setActionModal(true)
    } else {
      setIsLoading(true)
      const transitionId = transition?.id

      if (transitionId === undefined) {
        message.error(`Not found transition with name: ${transition.description}`)
        return setIsLoading(false)
      }
      try {
        await updateRequestForm(
          `${transitionId}`,
          request,
          [],
          '',
          [],
          []
        )
        await getAllRequest()
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSubmitChangePoint = () => {
    router.push({
      pathname: '/5m1e/report/change-point',
      query: {
        [RequestProblemIdParamName]: request.request_id
      }
    })
  }

  return <>
    <ActionModal
      title={actionName}
      isLoading={isLoading}
      visible={actionModal}
      showSelectConfirmation={selectedTransition ? isShowSelectConfirmation(selectedTransition) : false }
      showEmailSelect={selectedTransition ? isShowMailingList(selectedTransition) : false}
      showActionInput={selectedTransition ? isShowActionNote(selectedTransition) : false}
      showSelectSupporter={selectedTransition ? isShowSelectSupporter(selectedTransition) : false}
      onFinish={handleActionModalFinish}
      onCancel={() => setActionModal(false)}/>
    {
      getFilteredTransitionByCurrentStateId(+request.actionList[request.actionList.length - 1].current_state_id)
        .filter((transition) => canDoActionByGivenTransition(request, transition))
        .map((transition, index) => (
          <Button key={`action-btn-${index}`} onClick={() => handleClickAction(transition)}>
            {action[transition.action_id].name}
          </Button>
        ))
    }
    {
      isRequestProblemFinished(transition?.[request.actionList[request.actionList.length - 1].transition_id]) ? <Button onClick={handleSubmitChangePoint}>
        Submit Change Point
      </Button> : null
    }
  </>
}