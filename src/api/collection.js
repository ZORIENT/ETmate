import request from "@/utils/request"

// 条件查询电影收藏
export function selectCollectionByCondition(params){
    return request({
        url:"/collection",
        method:"get",
        params
    })
}

// 添加收藏
export function insertCollection(data){
    return request({
        url:"/collection",
        method:"post",
        data:data
    })
}

// 取消收藏
export function deleteCollection(id){
    return request({
        url:"/collection/"+id,
        method:"delete",
    })
}