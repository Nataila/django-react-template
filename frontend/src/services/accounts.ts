import request from "../request"

export const RegisterReq = async (values) => {
  const res = await request.post('/accounts/register/', values)
  return res
}

export const LoginReq = async (values) => {
  const res = await request.post('/accounts/login/', values)
  return res
}

export const GetUserList = async () => {
  const res = await request.get('/accounts/users/')
  return res
}