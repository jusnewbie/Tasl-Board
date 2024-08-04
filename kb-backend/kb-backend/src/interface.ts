export interface JwtPayload {
  user_id: number;
  login_time: number;
  iat: number;
  exp: number;
}

export interface ProjectData {
  subject: string;
  creator: string;
  create_date: string;
  start_date: string;
  end_date: string;
  description: string;
  type: number;
  task_id: number;
}