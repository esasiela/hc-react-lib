export interface NavItem {
  id: number;
  childOf: number;
  title: string;
  description: string;
  publicUrl: string;
  path: string;
  sortOrder: number;
}
