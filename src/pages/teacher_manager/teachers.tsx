import { Button, Col, Row, Select, Form, Input, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { Link } from 'react-router-dom';

const options = [
  { value: '1A1', label: '1A1' },
  { value: '1A2', label: '1A2' },
  { value: '1A3', label: '1A3' },
];

const renderSTT = (text: string, record: unknown, index: number) => <span>{index + 1}</span>;

export default function Teacher() {
  return (
    <div>
      <Row style={{ marginBottom: '20px' }}>
        <Col span={6}>
          <Form.Item
            label="Giới tính"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Chức vụ"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Dạy môn"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Phòng ban"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Trạng thái làm việc"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
          </Form.Item>
        </Col>

        {/* Tìm kiếm theo tên */}
        <Col span={6}>
          <Form.Item
            label="Tên"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Input type="text" placeholder="Điền tên giáo viên" style={{ width: '80%' }} />
          </Form.Item>
        </Col>
        {/* Tìm kiếm theo mã */}
        <Col span={6}>
          <Form.Item
            label="Số hiệu cán bộ"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Input type="text" placeholder="Điền số hiệu" style={{ width: '80%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginBottom: '15px' }}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Form.Item
            label=" "
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px', paddingRight: '56px' }}
          >
            <div>
              <Button type="primary" style={{ width: '20%' }}>
                Tìm kiếm
              </Button>
              <Link to="/create-student">
                <Button type="default" style={{ width: '20%', marginLeft: '25px' }}>
                  Thêm
                </Button>
              </Link>
            </div>
          </Form.Item>
        </Col>
      </Row>
      <Table
        style={{
          border: '1px solid #ddd',
          borderRadius: '5px',
          overflow: 'hidden',
          maxHeight: 380,
        }}
        bordered
        size="middle"
        virtual
        scroll={{ y: 380 }}
      >
        <Column
          title="STT"
          render={renderSTT}
          width={50}
          align="center"
          className="custom-column"
        />
        <Column title="Số hiệu cán bộ" width={120} align="center" className="custom-column" />
        <Column title="Họ và tên" width={200} align="center" className="custom-column" />
        <Column title="Giới tính" width={90} align="center" className="custom-column" />
        <Column title="Ngày sinh" align="center" className="custom-column" />
        <Column title="Dân tộc" align="center" className="custom-column" />
        <Column title="Phòng ban" align="center" className="custom-column" />
      </Table>
    </div>
  );
}
