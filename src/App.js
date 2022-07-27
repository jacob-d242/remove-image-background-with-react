import './App.css';
import { Button, Card, Col, Form, message } from 'antd';
import { useState } from 'react';
import ImageSelector from './components/ImageSelector';

import { uploadImage } from '../src/utility/api';

function App() {
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 18 },
    },
  };

  const onFailedSubmission = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values) => {
    if (image === null) {
      message.error('You need to upload an image first');
    } else {
      setIsUploading(true);
      uploadImage({
        file: image,
        successCallback: (data) => {
          setIsUploading(false);
          console.log(data);
          message.success('Image uploaded successfully.');
        },
      });
    }
  };

  return (
    <div style={{ margin: '1%' }}>
      <Card style={{ margin: 'auto', width: '50%' }}>
        <Form
          {...formItemLayout}
          onFinish={onFinish}
          onFinishFailed={onFailedSubmission}
          autoComplete="off"
        >
          <Col span={8} offset={9} style={{ marginBottom: '10px' }}>
            <ImageSelector setImage={setImage} />
          </Col>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isUploading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default App;
