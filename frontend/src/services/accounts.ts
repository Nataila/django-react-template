import request from "../request"

export const RegisterReq = async (values) => {
  const res = await request.post('/register/', values)
  return res
}

export const LoginReq = async (values) => {
  const res = await request.post('/login/', values)
  return res
}

export const GetUserList = async () => {
  const res = await request.get('/users/')
  return res
}