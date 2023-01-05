import { FC, useState } from "react";
import { Table } from "antd";
import { RequestColumnList } from "./column";
import { _5M1ERequest, _5M1EChangeRequest } from "@/types/request.type";
import { RequestDetailPanel } from "./request-detail-panel";
import { _5M1ESettingStore } from "@/store";

interface IProps {
  data: _5M1ERequest[] | _5M1EChangeRequest[];
}

export const RequestTable: FC<IProps> = ({ data }: IProps) => {
  const [activeRowKeys, setActiveRowKeys] = useState<string[]>([]);

  return (
    <>
      <Table
        rowKey="request_id"
        columns={RequestColumnList()}
        dataSource={data}
        expandable={{
          expandedRowRender: (record, index, indent, expanded) =>
            expanded ? <RequestDetailPanel request={record} /> : null,
          expandRowByClick: true,
          expandedRowKeys: activeRowKeys,
          onExpand(expanded, record) {
            if (expanded) {
              setActiveRowKeys([record.request_id]);
            } else {
              setActiveRowKeys([]);
            }
          },
        }}
        scroll={{
          y: 570,
          x: true,
        }}
      ></Table>
    </>
  );
};
