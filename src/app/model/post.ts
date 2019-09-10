export class Post {
  id: number;
  title: string;
  author: string;
	content: string;
	loveIts: number;
  created_at: Date;
  photo: string;

	constructor(id: number, title: string, author: string, content: string, loveIts: number) {
    this.id=id;
    this.title=title;
    this.author=author;
		this.content=content;
		this.loveIts=loveIts;
		this.created_at=new Date();
	}
}
