import request from "@/utils/request";

export function login(user) {
  return request({
    url: "/user/login",
    method: "post",
    data: user,
  });
}

export function selectById(id) {
  return request({
    url: "/user/" + id,
    method: "get",
  });
}

// 删除用户
// export function deleteByIds(ids){
//   return request({
//     url:"/user/"+ids,
//     method:"delete"
//   })
// }

// 修改用户信息
export function updateUser(user){
  return request({
    url:"/user",
    method:"put",
    data:user
  })
}


export function register(user) {
  return request({
    url: "/user/register",
    method: "post",
    data: user,
  });
}

export function selectByCondition(params){
  return request({
    url:"/user",
    method:"get",
    params
  })
}

// 封禁用户
export function banUser(id){
  return request({
    url:"/user/ban/"+id,
    method:"post"
  })
}

// 解封用户
export function disbanUser(id){
  return request({
    url:"/user/disban/"+id,
    method:"post"
  })
}