import request from '@/utils/request';
import type { http } from '@/typing/http';
import type { Categorty, Tag } from '@/pages/articles/Article/enitiy';

type P<T> = http.PromiseResp<T>;

/** 查询分类*/
export function getCategory(): P<Categorty[]> {
  return request.get(`/category/list`);
}

/** 新建分类*/
export function createCategory(params: Categorty): P<Categorty[]> {
  return request.post(`/category/add`, { ...params });
}

/** 删除分类*/
export function deleteCategory(params: Categorty): P<Categorty[]> {
  return request.post(`/category/delete`, { ...params });
}

/** 查询标签*/
export function getTag(): P<Tag[]> {
  return request.get(`/tag/list`);
}

/** 新建标签*/
export function createTag(params: Tag): P<Tag[]> {
  return request.post(`/tag/add`, { ...params });
}

/** 删除标签*/
export function deleteTag(params: Tag): P<Tag[]> {
  return request.post(`/tag/delete`, { ...params });
}
