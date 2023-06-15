import React from 'react';
import { Employee } from './types/employeeTyps';

type OneEmployeeProps = {
  employee: Employee;
};
export default function OneEmployee({ employee }: OneEmployeeProps) {
  return (
    <div key={employee.employeeId}>
      <p>Name: {employee.firstName}</p>
      <p>Last Name: {employee.lastName}</p>
      {/* <p>
      Birthday: {new Date(employee.birthday).getFullYear()}-
      {new Date(employee.birthday).getMonth() + 1}-
      {new Date(employee.birthday).getDate()}
    </p> */}
      <p>Birthday: {new Date(employee.birthday).toLocaleDateString()}</p>
      <p>Height: {employee.height}</p>
    </div>
  );
}
