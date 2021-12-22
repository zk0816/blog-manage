export interface Current {
  id?: number;
  title: string;
  category?: Categorty;
  tag?: Tag[];
  thumb_url?: string;
  cover_url?: string;
  time?: number;
  content?: string;
}

export interface Categorty {
  categoryId?: number;
  categoryName?: string;
}

export interface Tag {
  tagId?: number;
  tagName?: string;
}
