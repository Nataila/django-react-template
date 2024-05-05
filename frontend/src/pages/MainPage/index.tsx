import { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { GetUserList } from "../../services/accounts";

const MainPage = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/signin')
  }

  const getData = async () => {
    const res = await GetUserList()
    console.log(res);
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div style={{padding: '10px 50px'}}>
      <div style={{ position: 'relative'}}>
        <div style={{float: 'right'}}>
          <span style={{display:'inline-block', marginLeft: 20}}>
            当前用户: {localStorage.getItem('name')||''}
          </span>
          <Button style={{ marginLeft: 20}} onClick={logout}>退出</Button>
        </div>
      </div>
    </div>
  )
}
export default MainPage;
