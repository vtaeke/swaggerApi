import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from '../actions/employeeActions';
import { Employee } from '../types/employeeTyps';

interface EmployeeState {
  loading: boolean;
  data: any[];
  error: string | null;
}

const initialState: EmployeeState = {
  loading: false,
  data: [],
  error: null,
};

// Редьюсер
const employeeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_EMPLOYEES_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_EMPLOYEES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_EMPLOYEE:
      return { ...state, data: [...state.data, action.payload] };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        data: state.data.filter(
          (employee: Employee) => employee.employeeId !== action.payload
        ),
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        data: state.data.map((employee: Employee) =>
          employee.employeeId === action.payload.employeeId
            ? action.payload
            : employee
        ),
      };
    default:
      return state;
  }
};

export default employeeReducer;
