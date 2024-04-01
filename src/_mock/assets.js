import { faker } from '@faker-js/faker';

import { BasicStatus, PermissionType } from '#/enum';

/**
 * Organization data mock
 */
export const ORG_LIST = [
  {
    id: '1',
    name: 'East China Branch',
    status: 'enable',
    desc: faker.lorem.words(),
    order: 1,
    children: [
      { id: '1-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '1-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '1-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
  {
    id: '2',
    name: 'South China Branch',
    status: 'enable',
    desc: faker.lorem.words(),
    order: 2,
    children: [
      { id: '2-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '2-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '2-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
  {
    id: '3',
    name: 'Northwest Branch',
    status: 'enable',
    desc: faker.lorem.words(),
    order: 3,
    children: [
      { id: '3-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '3-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '3-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
];

/**
 * User permission mock
 */
const DASHBOARD_PERMISSION = {
  id: '9100714781927703',
  parentId: '',
  label: 'sys.menu.dashboard',
  name: 'Dashboard',
  icon: 'ic-analysis',
  type: PermissionType.CATALOGUE,
  route: 'dashboard',
  order: 1,
  children: [
    {
      id: '8426999229400979',
      parentId: '9100714781927703',
      label: 'sys.menu.workbench',
      name: 'Workbench',
      type: PermissionType.MENU,
      route: 'workbench',
      component: '/dashboard/workbench/index.tsx',
    },
    {
      id: '9710971640510357',
      parentId: '9100714781927703',
      label: 'sys.menu.analysis',
      name: 'Analysis',
      type: PermissionType.MENU,
      route: 'analysis',
      component: '/dashboard/analysis/index.tsx',
    },
  ],
};

const THU_PERMISSION = {
  id: '9100714781921111',
  parentId: '',
  label: 'ThuTo',
  name: 'Thu',
  icon: 'ic-analysis',
  type: PermissionType.CATALOGUE,
  route: 'demoo',
  order: 2,
  children: [
    {
      id: '8426999229400911',
      parentId: '9100714781921111',
      label: 'ThuNho',
      name: 'Thu',
      type: PermissionType.MENU,
      route: 'thu',
      component: '/demoo/thu.tsx',
    },
  ],
};

const STUDENT_PERMISSION = {
  id: '9100714781921112',
  parentId: '',
  label: 'Student Manager',
  name: 'Student',
  icon: 'ic-user',
  type: PermissionType.CATALOGUE,
  route: 'studentManager',
  order: 3,
  children: [
    {
      id: '8426999229400912',
      parentId: '9100714781921112',
      label: 'Students',
      name: 'Student',
      type: PermissionType.MENU,
      route: 'students',
      component: '/student_manager/students.tsx',
    },
    {
      id: '8426999229400913',
      parentId: '9100714781921112',
      label: 'Create Student',
      name: 'Student',
      type: PermissionType.MENU,
      route: 'createStudent',
      component: '/student_manager/create-student.tsx',
    },
  ],
};

const TEACHER_PERMISSION = {
  id: '9100714781921189',
  parentId: '',
  label: 'Teacher Manager',
  name: 'Teacher',
  icon: 'ic-user',
  type: PermissionType.CATALOGUE,
  route: 'teacherManager',
  order: 4,
  children: [
    {
      id: '8426999229412111',
      parentId: '9100714781921189',
      label: 'Teachers',
      name: 'Teacher',
      type: PermissionType.MENU,
      route: 'teachers',
      component: '/teacher_manager/teachers.tsx',
    },
  ],
};

export const PERMISSION_LIST = [
  DASHBOARD_PERMISSION,
  THU_PERMISSION,
  STUDENT_PERMISSION,
  TEACHER_PERMISSION,
];

/**
 * User role mock
 */
const ADMIN_ROLE = {
  id: '4281707933534332',
  name: 'Admin',
  label: 'admin',
  status: BasicStatus.ENABLE,
  order: 1,
  desc: 'Super Admin',
  permission: PERMISSION_LIST,
};
const TEST_ROLE = {
  id: '9931665660771476',
  name: 'Test',
  label: 'test',
  status: BasicStatus.ENABLE,
  order: 2,
  desc: 'test',
  permission: [DASHBOARD_PERMISSION],
};
export const ROLE_LIST = [ADMIN_ROLE, TEST_ROLE];

/**
 * User data mock
 */
export const DEFAULT_USER = {
  id: faker.string.uuid(),
  username: 'admin@gmail.com',
  email: faker.internet.email(),
  avatar: faker.image.avatarLegacy(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.recent(),
  password: 'demo1234',
  role: ADMIN_ROLE,
  permissions: ADMIN_ROLE.permission,
};
export const TEST_USER = {
  id: faker.string.uuid(),
  username: 'test@gmail.com',
  password: 'demo1234',
  email: faker.internet.email(),
  avatar: faker.image.avatarLegacy(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.recent(),
  role: TEST_ROLE,
  permissions: TEST_ROLE.permission,
};
export const USER_LIST = [DEFAULT_USER, TEST_USER];
