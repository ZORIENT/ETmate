import request from "@/utils/request";

// 分页查询公告信息
export function selectAllBulletin(params) {
  return request({
    url: "/bulletin",
    method: "get",
    params,
  });
}

// 根据id查询公告信息
export function selectBulletinById(id) {
  return request({
    url: "/bulletin/" + id,
    method: "get",
  });
}

// 根据id批量删除公告
export function deleteBulletinByIds(ids) {
  return request({
    url: "/bulletin/" + ids,
    method: "delete",
  });
}

// 添加公告
export function insertBulletin(bulletin) {
  return request({
    url: "/bulletin",
    method: "post",
    data: bulletin,
  });
}

// 修改公告信息
export function updateBulletin(bulletin) {
  return request({
    url: "/bulletin",
    method: "put",
    data: bulletin,
  });
}
