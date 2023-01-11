import { UserStore, _5M1ESettingStore } from "@/store";
import { RequestConfigStore } from "@/store/request-config.store";
import { _5M1ERequest, _5M1EChangeRequest } from "@/types/request.type";
import { Tag, Timeline, Tooltip } from "antd";
import { FC } from "react";

interface IProps {
  request: _5M1ERequest | _5M1EChangeRequest;
}

export const ActionHistory: FC<IProps> = ({ request }: IProps) => {
  const { user } = UserStore();
  const { transition, action, isShowActionNote } = RequestConfigStore();
  const { userJoinRolePositionDict } = _5M1ESettingStore();

  const getTransitionDescription = (description: string | undefined) => {
    let userDescription =
      user?.user_uuid === request.user_uuid ? "requester" : "appprover";
    return description?.replaceAll("<<requester>>", userDescription);
  };
  console.log("actionHistory", request.actionList)

  return (
    <>
      <Timeline mode="left">
        {request.actionList.map((hAction, index) => (
          <Timeline.Item
            key={`action-history-${index}`}
            label={
              <Tooltip
                title={
                  index === 0
                    ? "Drafting the request"
                    : getTransitionDescription(
                        action[hAction.action_id]?.description
                      )
                }
              >
                <Tag>
                  {index === 0 ? "Draft" : action[hAction.action_id]?.name}
                </Tag>
              </Tooltip>
            }
          >
            <span>
              {userJoinRolePositionDict[hAction.action_user_uuid]?.firstname}
            </span>
            {isShowActionNote(transition[hAction.transition_id]) ? (
              <p>
                <b>Reason:</b> <span>{hAction.note}</span><br/>
                <span>{hAction.action_created_at.substring(0,11)}</span>
              </p>
            ) : null}
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};
