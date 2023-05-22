import request from "@/utils/request";

// 根据id查询电影信息
export function selectById(id) {
  return request({
    url: "/film/" + id,
    method: "get",
  });
}

// 条件分页查询电影信息
export function selectByCondition(params) {
  return request({
    url: "/film",
    method: "get",
    params,
  });
}

// 添加电影信息
export function insertFilm(data) {
  return request({
    url: "/film",
    method: "post",
    data,
  });
}

// 更新电影信息
export function updateFilm(data) {
  return request({
    url: "/film",
    method: "put",
    data,
  });
}

// 根据ids删除电影信息
export function deleteByIds(ids){
  return request({
    url:"/film/"+ids,
    method:"delete"
  })
}

// 根据id推荐相关电影信息
export function getSimilarFilms(id) {
  return request({
    url: "/film/similarFilm/" + id,
    method: "get",
  });
}
