import request from "@/utils/request";

export function upload(image) {
  return request({
    url: "/upload",
    method: "post",
    data: image,
  });
}
