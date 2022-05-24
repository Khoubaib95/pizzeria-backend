export enum userRole {
  ADMIN = 'admin',
  CHIEFEDITOR = 'chiefeditor',
  EDITOR = 'editor',
  USER = 'user',
}
export interface User {
  username: string;
  name: string;
  password: string;
  phone?: string;
  city?: string;
  roles?: [userRole];
}
