import request from "@/utils/request";

// 根据id查询游戏信息
export function search(params) {
  return request({
    url: "/search",
    method: "get",
    params,
  });
}
