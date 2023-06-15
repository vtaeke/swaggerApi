import React, { useState } from 'react';
import { Employee } from './types/employeeTyps';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { deleteEmployee, updateEmployee } from './actions/employeeActions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type OneEmployeeProps = {
  employee: Employee;
};

export default function OneEmployee({ employee }: OneEmployeeProps) {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const delEmployeeHandler = (employeeId: number) => {
    dispatch(deleteEmployee(employeeId));
  };

  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    height: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateEmployeeHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateEmployee(newEmployee));
    setNewEmployee({
      firstName: '',
      lastName: '',
      birthday: '',
      height: '',
    });
  };

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
      <Button
        color='danger'
        style={{ margin: '0 5px 5px' }}
        onClick={() => delEmployeeHandler(employee.employeeId)}
      >
        Delete
      </Button>
      <Button
        onClick={toggle}
        color='warning'
        style={{ margin: '0 5px 5px' }}
        // onClick={() => updateEmployeeHandler(employee)}
      >
        Update
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <form onSubmit={updateEmployeeHandler}>
            <form>
              <input
                type='text'
                name='firstName'
                value={newEmployee.firstName}
                onChange={inputChangeHandler}
                placeholder='First Name'
              />
              <input
                type='text'
                name='lastName'
                value={newEmployee.lastName}
                onChange={inputChangeHandler}
                placeholder='Last Name'
              />
              <input
                type='text'
                name='birthday'
                value={newEmployee.birthday}
                onChange={inputChangeHandler}
                placeholder='Birthday'
              />
              <input
                type='number'
                name='height'
                value={newEmployee.height}
                onChange={inputChangeHandler}
                placeholder='Height'
              />
            </form>
            <Button style={{ marginTop: '15px' }} color='primary' type='submit'>
              Update Info
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
