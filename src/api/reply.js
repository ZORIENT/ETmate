import request from "@/utils/request";

export function getReply(id){
    return request({
        url: "/reply/" + id,
        method: "get",
    })
}

export function replyToMine(id){
    return request({
        url: "/bulletin/reply/" + id,
        method: "get",
    })
}