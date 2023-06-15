export interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  birthday: string;
  height: string;
}

export interface EmployeeState {
  loading: boolean;
  data: Employee[];
  error: string | null;
}
