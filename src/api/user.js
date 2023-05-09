import request from "@/utils/request";

export function login(user){
    return request({
        url:"/user/login",
        method:"post",
        data:user
    })
}

export function selectById(id){
    return request({
        url:"/user/"+id,
        method:"get"
    })
}

export function register(user){
    return request({
        url:"/user/register",
        method:"post",
        data:user
    })
}

export function updateUser(user){
    return request({
        url:"user",
        method:"put",
        data:user
    })
}