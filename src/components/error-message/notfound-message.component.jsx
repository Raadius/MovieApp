import { Alert, Space } from 'antd';

const NotFoundMessage = () => {
  return (
    <Space direction="vertical" style={{ width: '80%', marginLeft: '100px' }}>
      <Alert
        message="We can't find any results for your request. But we're sure there's gonna be some Netflix adaptation for...whatever it is..."
        type="error"
        showIcon
        className="error-message"
      />
    </Space>
  );
};

export default NotFoundMessage;
