import request from '@/utils/request';

/** 登录接口 */
export function loginApi(params: any): any {
  return request.post(`/user/login`, { ...params });
}

/** 获取用户信息*/
export function userInfoApi(): any {
  return request.get(`/user/info`);
}
