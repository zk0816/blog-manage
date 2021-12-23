import request from '@/utils/request';
import type { http } from '@/typing/http';
type Page<T> = http.PromisePageResp<T>;

/** 查询草稿*/
export function getDraft(params: any): Page<any[]> {
  return request.get(`/draft/list`, { params });
}

interface Params {
  id: number;
}

/** 删除草稿*/
export function deleteDraft(params: Params) {
  return request.post(`/draft/delete`, { ...params });
}
