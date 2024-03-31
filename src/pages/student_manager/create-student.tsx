import { UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Radio, Upload, Space } from 'antd';

export default function CreateStudent() {
  return (
    <div>
      <Form
        name="wrap"
        labelCol={{ flex: '110px' }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Họ:"
          name="lastname"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tên:"
          name="firstname"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày sinh:"
          name="Dob"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Giới tính:"
          name="gender"
          rules={[{ required: true, message: 'Please select!' }]}
        >
          <Radio.Group>
            <Radio value="male">Nam</Radio>
            <Radio value="female">Nữ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Địa chỉ:"
          name="address"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
        </Form.Item>

        <Form.Item
          label="Ảnh đại diện:"
          name="avatar"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload name="avatar" listType="picture">
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item label=" ">
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="default" htmlType="button">
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
