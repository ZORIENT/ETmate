import request from "@/utils/request";

// 根据id查询书籍信息
export function selectById(id) {
  return request({
    url: "/book/" + id,
    method: "get",
  });
}

// 条件分页查询书籍信息
export function selectByCondition(params) {
  return request({
    url: "/book",
    method: "get",
    params,
  });
}

// 根据id推荐相关电影信息
export function getSimilarBooks(id) {
  return request({
    url: "/book/similarBook/" + id,
    method: "get",
  });
}
