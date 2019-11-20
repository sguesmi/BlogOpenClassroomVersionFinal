export class Post {

  public title: string;
  public content: string;
  public loveIts = 0;
  public createdAt;

  constructor(title: string, content: string, loveIts?: number, createdAt?: string) {
    this.title = title;
    this.content = content;
    this.loveIts = loveIts;
    this.createdAt = createdAt;
  }

}
