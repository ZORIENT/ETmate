import request from "@/utils/request"

export function selectById(id){
    return request({
        url:'/film/'+id,
        method:'get'
    })
}

export function selectByCondition(params){
    return request({
        url:"/film?",
        method:"get",
        params
    })
}