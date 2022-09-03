import { Form,  Button, Upload, InputNumber, Modal ,message} from 'antd';
import {BorderOuterOutlined, UploadOutlined, UpCircleOutlined} from '@ant-design/icons';
import { submit } from "./api";
import {useForm} from "antd/es/form/Form";

const SubmitForm = () => {


   async function onFinish(value: any) {
    let user: string = value.username.toString();
    let content: string = await value.content.fileList[0].originFileObj.text();
    let avatar: string = value.avatar.fileList?.[0]
      ? Buffer.from(await value.avatar.fileList[0].originFileObj.arrayBuffer()).toString('base64')
      : '';

    if(avatar.length > 114514)
    {
      Modal.info({
        title: "Fail",
        content: <p>图像太大了，请不要再端上来了！</p>,
        width: 600,
        centered: true,
      });
      return;
    }

    message.info("submitted, please wait");
    submit({ user, content, avatar }).then(async () => {
      message.success('Successfully submitted！');
      window.opener.location.reload(); 
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.info("Something wrong.Please refresh.");
    window.opener.location.reload(); 
  };  

 
  const [form] = useForm();



  return (
    <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16, }} initialValues={{remember: true,}} onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form = {form}>

      <Form.Item
        label="id"
        name="username"
        rules={[
          {
            required: true,
            type: 'number',
          },
        ]}
      >
        <InputNumber style={{width: 350, height: 100}}/>
      </Form.Item>

      <Form.Item name="content"
        rules={[{ required: true }]}>
        <Upload maxCount = {1} beforeUpload = {() => false}>
          <Button style={{fontSize: 20,  fontWeight: 'Times New Roman'}}>upload result.txt here...</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >

        <Form.Item valuePropName="fileList" name="avatar" getValueFromEvent={e => e.fileList} >
          <Upload  maxCount = {1} listType="picture-card" beforeUpload={() => false} >
            <Button style={{fontSize: 20,  fontWeight: 'Times New Roman'}}>Upload Avatar here...</Button>
          </Upload>
        </Form.Item>

        
      </Form.Item>

      <Button style={{fontSize: 30,  fontWeight: 'Times New Roman'}} type="primary" htmlType="submit"
      onClick={() => {setTimeout(function(){window.location.reload()},1000);}}>
          Submit!
        </Button>
    </Form>
  );
};



export default SubmitForm;


