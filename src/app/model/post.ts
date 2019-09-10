import { formatDate } from '@angular/common';
//Class du modèle Post
export class Post {
  id: number;
  title: string;
  author: string;
	content: string;
	loveIts: number;
  created_at: string;
  photo: string;

	constructor(id: number, title: string, author: string, content: string, loveIts: number) {
    this.id=id;
    this.title=title;
    this.author=author;
		this.content=content;
		this.loveIts=loveIts;
		this.created_at=formatDate( new Date(),'dd/MM/yyyy HH:mm:ss', 'fr-FR')
	}
}
