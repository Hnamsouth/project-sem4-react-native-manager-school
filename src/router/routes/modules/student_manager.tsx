import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const StudentManager = lazy(() => import(`@/pages/student_manager/students`));
const CreateStudent = lazy(() => import(`@/pages/student_manager/create-student`));

const studentManager: AppRouteObject = {
  order: 3,
  path: 'student_manager',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'Student Manager',
    icon: <SvgIcon icon="ic-user" className="ant-menu-item-icon" size="24" />,
    key: '/student_manager',
  },
  children: [
    {
      index: true,
      element: <Navigate to="student_manager" replace />,
    },
    {
      path: 'students',
      element: <StudentManager />,
      meta: { label: 'Students', key: '/student_manager/students' },
    },
    {
      path: 'createStudent',
      element: <CreateStudent />,
      meta: { label: 'Create student', key: '/student_manager/create-student' },
    },
  ],
};

export default studentManager;
