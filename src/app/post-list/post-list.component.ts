import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/model/post';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  post: Post;
  postsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private postsService: PostsService, private router: Router) { }

  ngOnInit() {
    //Souscrire à l'observable postSubscription
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        if (this.posts.length == 0) {
          //Si il n'existe aucun post la première fois on créé 3 premiers posts
          this.postsService.initPosts();
        }
      }
    );
    // On demande la liste des posts au service
    this.postsService.getPosts();
    this.postsService.emitPosts();
  }
  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
