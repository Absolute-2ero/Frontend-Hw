import React from 'react';
import { Layout, Space } from 'antd';
import LeaderBoard from './LeaderBoard';
import SubmitForm from './submit'

const App: React.FC = () => {
  return <Layout>
         <Layout.Header  style={{color: 'black',
            fontSize: 48,  fontWeight: 'bold'}}>
           <Space>
             AI 赛道(x) Leaderboard
           </Space>
         </Layout.Header>
         <Layout.Content> <LeaderBoard/> </Layout.Content>
  	 <Layout.Footer> <SubmitForm/> </Layout.Footer>
	 </Layout>
};



export default App;
