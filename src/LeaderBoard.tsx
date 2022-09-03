import { getLeaderBoard, LeaderBoardData, getHistory, UserHistory, vote } from "./api";
import {UserOutlined, LikeOutlined} from "@ant-design/icons";
import { Avatar, Table, Modal, Space, Button } from "antd";
import Column from "antd/lib/table/Column";
import { useState, useEffect } from "react";
import type { ColumnsType } from 'antd/es/table';

function getAvatar(data?: string) {
  const notFound = <Avatar size="small" icon={<UserOutlined />} />;
  return data ? <Avatar src={`data:image/png;base64,${data}`} /> : notFound;
}

function HistoryBoard(props: any) 
{    
    if(typeof props.history === "number")
    {
      return <h1> No record found </h1>
    }
    return <Table pagination={{ pageSize: 20 }} dataSource={props.history}>
      <Column title="total" dataIndex='score' key='score' render={(score: number) => score} />
      <Column title="time" dataIndex="time" key='time' render={(t: number) => new Date(t * 1000).toUTCString()} />
      <Column title="sub_sky" dataIndex="subs" key='sky' render={(subs: number[]) => subs[0]} />
      <Column title="sub_mountain" dataIndex="subs" key='mountain' render={(subs: number[]) => subs[1]} />
      <Column title="sub_water" dataIndex="subs" key='water' render={(subs: number[]) => subs[2]} />
    </Table>
}

function getAllHis(history : UserHistory[] | number) { 
    Modal.info({
    title: "history",
    content: <HistoryBoard history={history} />,
    width: 600,
    centered: true,
    onOk() {
      console.log('OK');
    }
  })
}

const LeaderBoard: React.FC = () => {


  const update = () => {
    getLeaderBoard().then(data => setData(data)).catch(() => console.error("something wrong"))
  }

  const [data, setData] = useState<LeaderBoardData[]>(() =>{
    update(); return [];
  });

  

  useEffect(()=>{
    const auto_get = setInterval(()=>update(),20000);
    return () => clearInterval(auto_get);
  })

  const columns: ColumnsType<LeaderBoardData> = [
    {
      title: 'ID',
      key: 'user',
      render: user => {
        const avatar = getAvatar(user.avatar);
        return <Button type="text"
          onClick={() => { getHistory(user.user).then((history: UserHistory[]) => { getAllHis(history); }).catch(()=>{getAllHis(1)}) }}
        >
          {avatar}
          {user.user}
        </Button>
      },
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Last Submit',
      dataIndex: 'time',
      key: 'time',
      render: time => new Date(time * 1000).toUTCString(),
    },
    {
      title: 'Average',
      dataIndex: 'subs',
      key: 'subs',
      render: subs => parseFloat(((subs[0] + subs[1] + subs[2]) / 3).toFixed(0)),
    },
    {
      title: 'Mountain',
      dataIndex: 'subs',
      key: 'subs',
      render: subs => subs[0],
    },
    {
      title: 'Sky',
      dataIndex: 'subs',
      key: 'subs',
      render: subs => subs[1],
    },
    {
      title: 'Water',
      dataIndex: 'subs',
      key: 'subs',
      render: subs => subs[2],
    },
    {
      title: 'Vote',
      key: 'votes',
      render: user => {
        if (typeof user.votes === "undefined") return <></>;
        return <Button size="small" icon={<LikeOutlined />} onClick={() => {
          ++user.votes;
          setData([...(data as [])]);
          vote(user.user);
          
        }}>
          <Space /> {user.votes}
        </Button>;
      }
    }
  ]

  
  update();
  

  return <div>
    <Table style={{border:100}} dataSource={data} pagination={false} columns={columns}>
    </Table>
  </div>

};

export default LeaderBoard; 
