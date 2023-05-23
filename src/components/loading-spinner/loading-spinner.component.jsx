import { Spin } from 'antd';
import './loading-spinner.styles.scss';
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <span>Waiting for data...</span>
      <br></br>
      <span>Just a moment...</span>
      <br></br>
      <div className="spinner">
        <Spin size="large" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
