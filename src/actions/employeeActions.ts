import { Dispatch } from 'redux';
import axios from 'axios';

export const FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';
export const ADD_EMPLOYEE = ' ADD_EMPLOYEE';
export const DELETE_EMPLOYEE = ' DELETE_EMPLOYEE';
export const UPDATE_EMPLOYEE = ' UPDATE_EMPLOYEE';

export const fetchEmployees = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: FETCH_EMPLOYEES_REQUEST });

    axios
      .get('https://reactapi.bsite.net/api/Employee')
      .then((response) => {
        dispatch({
          type: FETCH_EMPLOYEES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_EMPLOYEES_FAILURE,
          payload: error.message,
        });
      });
  };
};

export const addEmployee = (employeeData: any) => {
  return {
    type: ADD_EMPLOYEE,
    payload: employeeData,
  };
};

export const deleteEmployee = (employeeId: number) => {
  return {
    type: DELETE_EMPLOYEE,
    payload: employeeId,
  };
};

export const updateEmployee = (employeeData: any) => {
  return {
    type: UPDATE_EMPLOYEE,
    payload: employeeData,
  };
};

// export const updateEmployee = (employeeData: Employee) => {
//   return (dispatch: Dispatch) => {
//     dispatch({ type: FETCH_EMPLOYEES_REQUEST });

//     axios
//       .put(`https://reactapi.bsite.net/api/Employee/${employeeData.employeeId}`, employeeData)
//       .then((response) => {
//         dispatch({ type: UPDATE_EMPLOYEE, payload: response.data });
//       })
//       .catch((error) => {
//         dispatch({ type: FETCH_EMPLOYEES_FAILURE, payload: error.message });
//       });
//   };
// };
