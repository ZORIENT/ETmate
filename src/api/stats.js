import request from "@/utils/request";

export function getStats(){
	return request({
		url:"/stats",
		method:"get"
	})
}

export function getFilmStats(){
	return request({
		url:"/stats/film",
		method:"get"
	})
}

export function getGameStats(){
	return request({
		url:"/stats/game",
		method:"get"
	})
}

export function getBookStats(){
	return request({
		url:"/stats/book",
		method:"get"
	})
}