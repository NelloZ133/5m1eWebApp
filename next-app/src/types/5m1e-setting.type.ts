export interface I5M1EReportSettingResponse {
  request_processes: Record<number, RequestProcess>;
  item_details: Record<number, ItemDetailWrapper>;
  lines: Record<number, Line>;
  list_items_changepoint: Record<string, ListItemWrapper>;
  list_items_problem: Record<string, ListItemWrapper>;
  processes: Record<number, Process>;
  processes_machines: Record<number, ProcessMachine>;
  products: Record<number, Product>;
}

export interface I5M1ESystemSettingResponse {
  positions: Record<string, Position>;
  users_join_roles_positions: Record<string, UserJoinRolePosition>;
}

export type RequestProcess = {
  id?: number;
  request_process_name: string;
  request_process_short_name: string;
  request_process_tag_name: string;
};

export type Line = {
  id?: number;
  line_name: string;
  section_id: number;
  work_center_code: string;
};

export type ItemDetail = {
  item_detail: string;
  item_detail_id: number;
  list_item_id: number;
};

export type ItemDetailWrapper = {
  data: ItemDetail[];
};

export type ListItem = {
  list_item_id: number;
  list_item_name: string;
  category: string;
  request_process_id: number;
};

export type ListItemWrapper = {
  data: ListItem[];
};

export type Machine = {
  machine_maker: string;
  machine_model: string;
  machine_name: string;
  machine_type: string;
};

export type Part = {
  id?: string;
  part_name: string;
  product_id: number;
};

export type Process = {
  id?: number;
  line_id: number;
  process_name: string;
  process_type_id: number;
};

export type ProcessMachine = {
  machine_no: string;
  process_id: number;
};

export type Product = {
  id?: number;
  full_name: string;
  short_name: string;
};

export type Position = {
  id?: number;
  position_full_name: string;
  position_group: string;
  position_level: number;
  position_name: string;
};

export type UserJoinRolePosition = {
  id?: string;
  app_line_id: string;
  concern_line: number[];
  email: string;
  firstname: string;
  is_active: string;
  lastname: string;
  position_full_name: string;
  position_group: string;
  position_id: number;
  position_level: number;
  position_name: string;
  section_id: number;
  user_id: string;
};
