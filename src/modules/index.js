import { combineReducers } from "redux";
import EmployeeReducer from "./EmployeeModule";
import SubjectReducer from "./SubjectModule";
import CertiReducer from "./CertiModule";
import SubjectInfoReducer from "./LectureModule";
import AttendanceReducer from './AttendanceModule';
import StudentReducer from "./StudentModule";
import ScheduleReducer from "./ScheduleModule";
import BoardReducer from "./BoardModule";
import MessageReducer from "./MessageModule";
import NotificationReducer from "./NofiticationModule";


/* 여러 모듈을 combine 시키기 */
const rootReducer = combineReducers({
  SubjectReducer, CertiReducer, EmployeeReducer, StudentReducer, ScheduleReducer, AttendanceReducer,
  SubjectInfoReducer, BoardReducer, MessageReducer, NotificationReducer
});

export default rootReducer;




