import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const TeacherManager = lazy(() => import(`@/pages/teacher_manager/teachers`));
const CreateTeacher = lazy(() => import(`@/pages/student_manager/create-student`));

const teacherManager: AppRouteObject = {
  order: 3,
  path: 'teacher-manager',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'Teacher Manager',
    icon: <SvgIcon icon="ic-user" className="ant-menu-item-icon" size="24" />,
    key: '/teacher-manager',
  },
  children: [
    {
      index: true,
      element: <Navigate to="teacher-manager" replace />,
    },
    {
      path: 'teachers',
      element: <TeacherManager />,
      meta: { label: 'Teachers', key: '/teacher-manager/teachers' },
    },
    {
      path: 'createTeacher',
      element: <CreateTeacher />,
      meta: { label: 'Create teacher', key: '/teacher-manager/create-teacher' },
    },
  ],
};

export default teacherManager;
