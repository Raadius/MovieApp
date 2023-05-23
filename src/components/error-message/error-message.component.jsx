import { Alert, Space } from 'antd';

const ErrorMessage = () => {
  return (
    <Space direction="vertical" style={{ width: '51%', marginLeft: '380px' }}>
      <Alert
        message="We can't find any results for your request. But we're sure there's gonna be some Netflix adaptation for...whatever it is..."
        type="error"
        showIcon
        className="error-message"
      />
    </Space>
  );
};

export default ErrorMessage;
