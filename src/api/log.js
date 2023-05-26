import request from "@/utils/request";

// 条件分页查询系统日志
export function selectByCondition(params){
	return request({
		url:"/log",
		method:"get",
		params
	})
}

// 批量删除系统日志
export function deleteByIds(ids){
	return request({
		url:"/log/"+ids,
		method:"delete"
	})
}