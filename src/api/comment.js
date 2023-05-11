import request from "@/utils/request"

// 条件分页查询评论信息
export function selectCommentByCondition(params){
    return request({
        url:"/comment",
        method:"get",
        params
    })
}

// 添加评论
export function insertComment(comment){
    return request({
        url:"/comment",
        method:"post",
        data:comment
    })
}

// 修改评论
export function updateComment(comment){
    return request({
        url:"/comment",
        method:"put",
        data:comment
    })
}

// 删除评论，批量删除时传入id数组
export function deleteById(id){
    return request({
        url:"/comment/"+id,
        method:"delete",
    })
}

// 获取对应电影、游戏、书籍的详细评分信息
export function getRates(params){
    return request({
        url:"/rate",
        method:"get",
        params
    })
}