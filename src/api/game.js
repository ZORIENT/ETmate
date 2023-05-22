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

// 根据id推荐相关游戏信息
export function getSimilarGames(id) {
  return request({
    url: "/game/similarGame/" + id,
    method: "get",
  });
}
