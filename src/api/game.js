import request from "@/utils/request";

// 根据id查询游戏信息
export function selectById(id) {
  return request({
    url: "/game/" + id,
    method: "get",
  });
}

// 条件分页查询游戏详情
export function selectByCondition(params) {
  return request({
    url: "/game",
    method: "get",
    params,
  });
}

// 根据id删除游戏信息
export function deleteByIds(ids){
  return request({
    url:"/game/"+ids,
    method:"delete"
  })
}

// 添加游戏
export function insertGame(data){
  return request({
    url:"/game",
    method:"post",
    data
  })
}

// 根据id推荐相关游戏信息
export function getSimilarGames(id) {
  return request({
    url: "/game/similarGame/" + id,
    method: "get",
  });
}

// 更新游戏信息
export function updateGame(data){
  return request({
    url:"/game",
    method:"put",
    data
  })
}
