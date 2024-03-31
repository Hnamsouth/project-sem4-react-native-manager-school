import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const Thu = lazy(() => import(`@/pages/demoo/thu`));

const thuRoute: AppRouteObject = {
  order: 2,
  path: 'demoo',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'ThuTo',
    icon: <SvgIcon icon="ic-analysis" className="ant-menu-item-icon" size="24" />,
    key: '/demoo',
  },
  children: [
    {
      index: true,
      element: <Navigate to="thu" replace />,
    },
    {
      path: 'thu',
      element: <Thu />,
      meta: { label: 'ThuNho', key: '/demoo/thu' },
    },
  ],
};

export default thuRoute;
