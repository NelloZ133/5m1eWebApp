import { RequestConfigStore, _5M1ESettingStore } from "@/store";
import { _5M1EChangeRequest, _5M1ERequest } from "@/types/request.type";
import { Tag } from "antd";
import { ColumnType } from "antd/lib/table";
import moment from "moment";

export function RequestColumnList(): ColumnType<
  _5M1ERequest | _5M1EChangeRequest
>[] {
  const { requestProcessDict, lineDict, getUserJoinRolePositionByUUID } =
    _5M1ESettingStore.getState();
  const { state, action } = RequestConfigStore.getState();
  return [
    {
      title: "Request No.",
      dataIndex: "request_no",
      key: "request_no",
      fixed: "left",
      ellipsis: true, //use to show full detail when hovered
      sorter: (a, b) => {
        const comparerA = a.request_problem_no ?? a.request_change_no ?? "";
        const comparerB = b.request_problem_no ?? b.request_change_no ?? "";
        return comparerA.localeCompare(comparerB);
      },
      render: (_, record) => (
        <div className="col-default col-request-no">
          {record.request_problem_no
            ? record.request_problem_no.replace("EPD-5M1E-", "")
            : record.request_change_no?.replace("EPD-5M1E-", "")}
        </div>
      ),
    },
    {
      title: "Created",
      dataIndex: "req_created_at",
      key: "req_created_at",
      defaultSortOrder: "descend",
      fixed: "left",
      ellipsis: true,
      sorter: (a, b) => a.req_created_at.localeCompare(b.req_created_at),
      render: (_, record) => (
        <div className="col-default col-created">
          {moment(record.req_created_at).format("D-MMM-Y, HH:mm")}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      ellipsis: true,
      fixed: "left",
      sorter: (a, b) =>
        requestProcessDict?.[
          a.request_process_id
        ]?.request_process_name?.localeCompare(
          requestProcessDict?.[b.request_process_id]?.request_process_name
        ),
      render: (_, record) => (
        <div className="col-default col-type">
          <Tag>
            {requestProcessDict?.[
              record.request_process_id
            ]?.request_process_name
              .replace("5M1E ", "")
              .replace(" Report", "")}
          </Tag>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ellipsis: true,
      sorter: (a, b) =>
        a.request_data_value.category.localeCompare(
          b.request_data_value.category
        ),
      render: (_, record) => (
        <div className="col-default col-category">
          <Tag>{record.request_data_value.category}</Tag>
        </div>
      ),
    },
    {
      title: "KPI",
      dataIndex: "kpi",
      key: "kpi",
      render: (_, record) => (
        <div className="col-default col-kpi">
          <Tag>{record.request_data_value.kpi}</Tag>
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      ellipsis: true,
      render: (_, record) => (
        <div className="col-default col-product">
          {record?.request_data_value.product}
        </div>
      ),
    },
    {
      title: "Part",
      dataIndex: "part",
      key: "part",
      ellipsis: true,
      render: (_, record) => (
        <div className="col-default col-part">
          {record?.request_data_value.partNo}
        </div>
      ),
    },
    {
      title: "Line",
      dataIndex: "line",
      key: "line",
      ellipsis: true,
      render: (_, record) => (
        <div className="col-default col-line">
          {lineDict?.[record.request_data_value.lineId]?.line_name}
        </div>
      ),
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      ellipsis: true,
      render: (_, record) => (
        <div className="col-default col-topic">
          {record.request_data_value.item}
        </div>
      ),
    },
    {
      title: "Machine",
      dataIndex: "machine",
      key: "machine",
      ellipsis: true,
      render: (_, record) => (
        <div className="col-default col-machine">
          {record.request_data_value.machine}
        </div>
      ),
    },
    {
      title: "Informer",
      dataIndex: "informer",
      key: "informer",
      ellipsis: true,
      render: (_, record) => (
        <div className="col-default col-informer">
          {getUserJoinRolePositionByUUID(record.user_uuid)?.firstname}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      fixed: "right",
      ellipsis: true,
      render: (_, record) => (
        <div className="col-default col-status">
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
