import jwtDecode from "jwt-decode";

const TokenKey = 'etmate_token'

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey,token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

export function getUserId(){
  let token=getToken();
  return jwtDecode(token).id;
}