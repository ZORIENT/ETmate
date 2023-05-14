import request from "@/utils/request";

// 根据用户id个性化推荐电影
export function userCfRecommendFilm(id) {
  return request({
    url: "/recommend/film/" + id,
    method: "get",
  });
}

// 根据用户id个性化推荐游戏
export function userCfRecommendGame(id) {
  return request({
    url: "/recommend/game/" + id,
    method: "get",
  });
}

// 根据用户id个性化推荐书籍
export function userCfRecommendBook(id) {
  return request({
    url: "/recommend/book/" + id,
    method: "get",
  });
}
