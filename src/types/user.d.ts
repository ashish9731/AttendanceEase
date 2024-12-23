interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'super_admin' | 'admin' | 'employee';
}