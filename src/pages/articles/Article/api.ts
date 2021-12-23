import request from '@/utils/request';
import type { Categorty, Tag, Current } from './enitiy';
import type { http } from '@/typing/http';

type P<T> = http.PromiseResp<T>;
type Page<T> = http.PromisePageResp<T>;

export interface Params {
  artid?: number;
  title: string;
  content?: string;
  categoryId: number;
  tagId: number;
  thumb_url?: string; //文章链接
  cover_url?: string; //文章封面
}

/** 新建/修改文章 */
export function createArticle(params: Params) {
  return request.post(`/article/add`, { ...params });
}

/** 查询文章*/
export function getArticle(params: any): Page<Current[]> {
  return request.get(`/article/list`, { params });
}

/** 修改文章*/
export function updateArticle(params: Params) {
  return request.post(`/article/update`, { ...params });
}

export interface DeleteParams {
  artid: number;
}

/** 删除文章*/
export function deleteArticle(params: DeleteParams) {
  return request.post(`/article/delete`, { params });
}

/** 查询分类*/
export function getCategory(): P<Categorty[]> {
  return request.get(`/category/list`);
}

/** 查询标签*/
export function getTag(): P<Tag[]> {
  return request.get(`/tag/list`);
}

/** 实时保存草稿箱*/
export function saveDraft(params: any) {
  return request.post(`/draft/save`, { ...params });
}
