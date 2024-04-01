import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const TeacherManager = lazy(() => import(`@/pages/teacher_manager/teachers`));

const teacherManager: AppRouteObject = {
  order: 4,
  path: 'teacher_manager',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'Teacher Manager',
    icon: <SvgIcon icon="ic-user" className="ant-menu-item-icon" size="24" />,
    key: '/teacher_manager',
  },
  children: [
    {
      index: true,
      element: <Navigate to="teacher_manager" replace />,
    },
    {
      path: 'teachers',
      element: <TeacherManager />,
      meta: { label: 'Teachers', key: '/teacher_manager/teachers' },
    },
  ],
};

export default teacherManager;
