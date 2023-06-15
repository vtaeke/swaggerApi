import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  addEmployee,
  fetchEmployees,
} from './actions/employeeActions';
import { Employee } from './types/employeeTyps';
import {
  Container,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import OneEmployee from './OneEmployee';

const App: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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

  const addEmployeeHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const employeeData = { ...newEmployee };
    dispatch(addEmployee(employeeData));
    setNewEmployee({
      firstName: '',
      lastName: '',
      birthday: '',
      height: '',
    });
  };

  const employees: Employee[] = useSelector(
    (state: any) => state.employee.data
  );
  const loading: boolean = useSelector((state: any) => state.employee.loading);
  const error: string | null = useSelector(
    (state: any) => state.employee.error
  );

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <div>
        <h1>Employee List</h1>
        <Button
          style={{ marginBottom: '15px' }}
          color='success'
          onClick={toggle}
        >
          Add new Employee
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <form onSubmit={addEmployeeHandler}>
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
              <Button
                style={{ marginTop: '15px' }}
                color='primary'
                type='submit'
              >
                Добавить сотрудника
              </Button>
            </form>
          </ModalBody>
        </Modal>
        {employees.map((employee: Employee) => (
          <Card style={{ width: '340px', marginBottom: '15px' }}>
            <OneEmployee employee={employee} />
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default App;
