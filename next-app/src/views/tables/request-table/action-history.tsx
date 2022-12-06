import { UserStore, _5M1ESettingStore } from "@/store"
import { RequestConfigStore } from "@/store/request-config.store"
import { _5M1ERequest } from "@/types/request.type"
import { Tag, Timeline } from "antd"
import { FC } from "react"

interface IProps {
  request: _5M1ERequest
}

export const ActionHistory: FC<IProps> = ({ request }: IProps) => {
  const { user } = UserStore()
  const { transition, action, isShowActionNote } = RequestConfigStore()
  const { userJoinRolePositionDict } = _5M1ESettingStore()

  const getTransitionDescription = (description: string | undefined) => {
    let userDescription = user?.user_uuid === request.user_uuid ? 'requester' : 'appprover'
    return description?.replaceAll('<<requester>>', userDescription)
  }

  return <>
    <Timeline mode="alternate">
      { request.actionList.map((hAction, index) => (
        <Timeline.Item
          key={`action-history-${index}`}
          label={userJoinRolePositionDict[hAction.action_user_uuid]?.firstname}>
          <Tag>{index === 0 ? 'Draft' : action[hAction.action_id]?.name}</Tag>
          <div>{index === 0 ? 'Drafting the request' : getTransitionDescription(action[hAction.action_id]?.description)}</div>
          { isShowActionNote(transition[hAction.transition_id]) ? <div><b>Reason:</b> { hAction.note }</div> : null }
        </Timeline.Item>
      )) }
    </Timeline>
  </>
}