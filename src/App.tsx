import React, { useState } from 'react';
import { Form, Input, message, Modal } from 'antd';
import { ApiURL, setApiURL } from './api';
import './index.css';

import { LeaderBoard } from './LeaderBoard';
import { Submit } from './submit';

function App() {
  const [visible, setVisible] = useState(true);
  const [api, setApi] = useState<string>();
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div>
      <header className="header-container">
        <p className="web-title">SAST 2022 PyTorch Homework Leaderboard</p>
      </header>
      <Modal title="Configure API address..." onOk={() => {api && setApiURL(api);
          	message.info(`Current API: ${ApiURL}`);
          	setConfirmed(true);
          	setVisible(false);
        	}
        } visible={visible} >
        <Form>
          <Form.Item label="API address">
            <Input placeholder={ApiURL} value={api} onChange={e => setApi(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
      <div className="content">
        <Submit />
        <LeaderBoard confirmed={confirmed} />
      </div>
    </div>
  );
}

export default App;
