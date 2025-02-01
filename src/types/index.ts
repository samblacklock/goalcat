export interface Goal {
  id: string;
  name: string;
  target: number;
  color: string;
  count: number;
  created_at: string;
}

export interface Event {
  id: string;
  created_at: string;
  description: string;
}
