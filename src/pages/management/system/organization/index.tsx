import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

import orgService from '@/api/services/orgService';
import ProTag from '@/theme/antd/components/tag';

import { Organization } from '#/entity';

type SearchFormFieldType = Pick<Organization, 'name' | 'status'>;

export default function OrganizationPage() {
  const [searchForm] = Form.useForm();
  const [organizationModalPros, setOrganizationModalProps] = useState<OrganizationModalProps>({
    formValue: {
      id: '',
      name: '',
      status: 'enable',
    },
    title: 'New',
    show: false,
    onOk: () => {
      setOrganizationModalProps((prev) => ({ ...prev, show: false }));
    },
    onCancel: () => {
      setOrganizationModalProps((prev) => ({ ...prev, show: false }));
    },
  });

  const columns: ColumnsType<Organization> = [
    { title: 'Môn', dataIndex: 'name', width: 300 },
    { title: 'Điểm', dataIndex: 'order', align: 'center', width: 60 },
    {
      title: 'Xếp Loại',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: (status) => (
        <ProTag color={status === 'enable' ? 'success' : 'error'}>{status}</ProTag>
      ),
    },
    { title: 'Nhận xét', dataIndex: 'desc', align: 'center', width: 300 },
  ];

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<Organization> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const { data } = useQuery({
    queryKey: ['orgs'],
    queryFn: orgService.getOrgList,
  });

  const onSearchFormReset = () => {
    searchForm.resetFields();
  };

  interface dataSource {
    id: number;
    name: string;
    email: string;
  }
  function exportToExcel(data: dataSource[], fileName: string): void {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'dataSource');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={6}>
              <Form.Item<SearchFormFieldType> label="Môn" name="name" className="!mb-0">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} lg={6}>
              <Form.Item<SearchFormFieldType> label="Điểm" name="status" className="!mb-0">
                <Select>
                  <Select.Option value="enable">
                    <ProTag color="success">Enable</ProTag>
                  </Select.Option>
                  <Select.Option value="disable">
                    <ProTag color="error">Disable</ProTag>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} lg={12}>
              <div className="flex justify-end">
                <Button onClick={onSearchFormReset}>Reset</Button>
                <Button type="primary" className="ml-4">
                  Search
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title="Thông tin"
        extra={
          <Button onClick={() => exportToExcel(data || [], 'users')} type="primary">
            Export
          </Button>
        }
      >
        <Table
          rowKey="id"
          size="small"
          scroll={{ x: 'max-content' }}
          pagination={false}
          columns={columns}
          dataSource={data}
          rowSelection={{ ...rowSelection }}
        />
      </Card>

      {/* <Card title="Organization Chart">
        <OrganizationChart organizations={data} />
      </Card> */}

      <OrganizationModal {...organizationModalPros} />
    </Space>
  );
}

type OrganizationModalProps = {
  formValue: Organization;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};

function OrganizationModal({ title, show, formValue, onOk, onCancel }: OrganizationModalProps) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue, form]);
  return (
    <Modal title={title} open={show} onOk={onOk} onCancel={onCancel}>
      <Form
        initialValues={formValue}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
      >
        <Form.Item<Organization> label="Name" name="name" required>
          <Input />
        </Form.Item>
        <Form.Item<Organization> label="Order" name="order" required>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item<Organization> label="Status" name="status" required>
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value="enable"> Giỏi </Radio>
            <Radio value="disable"> Học Lại </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item<Organization> label="Desc" name="desc">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
