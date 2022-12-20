import { RequestConfigStore, _5M1ESettingStore } from "@/store";
import { _5M1EChangeRequest, _5M1ERequest } from "@/types/request.type";
import { Tag } from "antd";
import { ColumnType } from "antd/lib/table";
import moment from "moment";

export function RequestColumnList(): ColumnType<_5M1ERequest | _5M1EChangeRequest>[] {
  const {
    requestProcessDict,
    lineDict,
    listItemProblemList,
    listItemChangePointList,
    getUserJoinRolePositionByUUID,
  } = _5M1ESettingStore.getState();
  const { state, action } = RequestConfigStore.getState();
  return [
    {
      title: "Request No.",
      dataIndex: "request_no",
      key: "request_no",
      width: 200,
      ellipsis: true,
      fixed: "left",
      sorter: (a, b) => {
        const comparerA = a.request_problem_no ?? a.request_change_no ?? "";
        const comparerB = b.request_problem_no ?? b.request_change_no ?? "";
        return comparerA.localeCompare(comparerB);
      },
      render: (_, record) => (
        <div>{record.request_problem_no ?? record.request_change_no}</div>
      ),
    },
    {
      title: "Created",
      dataIndex: "req_created_at",
      key: "req_created_at",
      defaultSortOrder: "descend",
      fixed: "left",
      sorter: (a, b) => a.req_created_at.localeCompare(b.req_created_at),
      render: (_, record) => (
        <div>{moment(record.req_created_at).format("lll")}</div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      fixed: "left",
      sorter: (a, b) =>
        requestProcessDict?.[
          a.request_process_id
        ]?.request_process_name?.localeCompare(
          requestProcessDict?.[b.request_process_id]?.request_process_name
        ),
      render: (_, record) => (
        <div>
          <Tag>
            {
              requestProcessDict?.[record.request_process_id]
                ?.request_process_name
            }
          </Tag>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) =>
        a.request_data_value.category.localeCompare(
          b.request_data_value.category
        ),
      render: (_, record) => <div>{record.request_data_value.category}</div>,
    },
    {
      title: "KPI",
      dataIndex: "kpi",
      key: "kpi",
      render: (_, record) => <div>{record.request_data_value.kpi}</div>,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (_, record) => <div>{record?.request_data_value.productId}</div>,
    },
    {
      title: "Part",
      dataIndex: "part",
      key: "part",
      render: (_, record) => <div>{record?.request_data_value.partId}</div>,
    },
    {
      title: "Line",
      dataIndex: "line",
      key: "line",
      render: (_, record) => (
        <div>{lineDict?.[record.request_data_value.lineId]?.line_name}</div>
      ),
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      render: (_, record) => (
        <div>
          {
            [...listItemProblemList(), ...listItemChangePointList()].find(
              (item) => +item.list_item_id === +record.request_data_value.itemId
            )?.list_item_name
          }
        </div>
      ),
    },
    {
      title: "Informer",
      dataIndex: "informer",
      key: "informer",
      render: (_, record) => (
        <div>{getUserJoinRolePositionByUUID(record.user_uuid)?.firstname}</div>
      ),
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
      render: (_, record) => (
        <div>
          {
            getUserJoinRolePositionByUUID(
              record.actionList.find(
                (act) => action[act.action_id]?.name === "Approve request"
              )?.action_user_uuid ?? ""
            )?.firstname
          }
        </div>
      ),
    },
    {
      title: "Supporter",
      dataIndex: "supporter",
      key: "supporter",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      fixed: "right",
      render: (_, record) => (
        <div>
          <Tag>
            {
              state?.[
                record.actionList[record.actionList.length - 1].current_state_id
              ]?.name
            }
          </Tag>
        </div>
      ),
    },
  ];
}
