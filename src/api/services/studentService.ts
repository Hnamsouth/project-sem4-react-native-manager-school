import apiClient from '../apiClient';

import { Student } from '#/entity';

export interface CreateStudentReq {
  id: string;
  gender: boolean;
  firstName: string;
  lastName: string;
  birthday: number;
  address: string;
  status: number;
  studentCode: string;
}

export type UpdateStudentReq = Partial<CreateStudentReq>;

export enum StudentApi {
  GetAll = '/students',
  Create = '/students',
  Update = '/students',
  Delete = '/students',
}

const getAllStudents = () => {
  return apiClient.get<Student[]>({ url: StudentApi.GetAll });
};

const createStudent = (data: CreateStudentReq) => {
  return apiClient.post<Student>({ url: StudentApi.Create, data });
};

const updateStudent = (id: string, data: UpdateStudentReq) => {
  return apiClient.put<Student>({ url: `${StudentApi.Update}/${id}`, data });
};

const deleteStudent = (id: string) => {
  return apiClient.delete<void>({ url: `${StudentApi.Delete}/${id}` });
};

const studentService = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};

export default studentService;
