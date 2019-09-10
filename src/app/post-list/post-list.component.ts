import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from 'src/app/model/post';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

//  @Input() posts: Post[];
posts: Post[];
post: Post;
postsSubscription: Subscription;
nbPost: number;

  constructor(private route: ActivatedRoute, private postsService: PostsService, private router: Router) { }

  ngOnInit() {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        if(this.posts.length == 0)
        {
          this.postsService.initPosts();
        }
        this.nbPost=this.posts.length;
      }
    );

    this.postsService.emitPosts();
  }
  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
