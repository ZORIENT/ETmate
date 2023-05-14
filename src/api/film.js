import request from "@/utils/request"

// 根据id查询电影信息
export function selectById(id){
    return request({
        url:'/film/'+id,
        method:'get'
    })
}

// 条件分页查询电影信息
export function selectByCondition(params){
    return request({
        url:"/film",
        method:"get",
        params
    })
}

// 根据id推荐相关电影信息
export function getSimilarFilms(id){
    return request({
        url:"/film/similarFilm/"+id,
        method:"get"
    })
}