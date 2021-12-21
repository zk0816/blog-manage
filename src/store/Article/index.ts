import { makeAutoObservable } from 'mobx';
import type { Current } from '@/pages/articles/Article/enitiy';

export class ArticleStore {
  //控制发布框
  visible: boolean = false;

  //文章内容
  content: string = '';

  //文章其他内容
  current: Current = { title: '' };

  constructor() {
    // makeObservable 在mobx6 版本之后 比增加项
    makeAutoObservable(this);
  }

  setVisible = (props: boolean) => {
    this.visible = props;
  };

  setContent = (props: string) => {
    this.content = props;
  };

  setCurrent = (props: Current) => {
    this.current = props;
  };
}

export default new ArticleStore();
