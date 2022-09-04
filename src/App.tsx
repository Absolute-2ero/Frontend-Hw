import React from 'react';
import { Layout} from 'antd';
import LeaderBoard from './LeaderBoard';
import SubmitForm from './submit';
import './App.css'

const App: React.FC = () => {
  return <Layout>
         <header className="header-container">
         <Layout.Header>
           <div className="web-title">
		AI 赛道(x) LeaderBoard
	   </div>
         </Layout.Header>
         </header>
         <header className="header-container">
         <Layout.Content ><LeaderBoard/>   </Layout.Content>
         </header>
         <header className="header-container">
  	 <Layout.Footer> <SubmitForm/> </Layout.Footer>
  	 </header>
	 </Layout>
};



export default App;
