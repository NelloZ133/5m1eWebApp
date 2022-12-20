export interface ILoginResponse extends User {}

export type User = {
  user_uuid: string;
  user_id: string;
  firstname: string;
  lastname: string;
  email: string;
  position_id: number;
  section_id: number;
  concern_line: number[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
  access_token: string;
  refresh_token: string;
  token_type: string;
};
