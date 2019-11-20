import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../models/Post';
import {PostService} from '../services/post.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  postList: Post[];
  postsSubscription: Subscription;

  constructor( private postService: PostService,
               private router: Router) { }

  ngOnInit() {
    this.postsSubscription = this.postService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.postList = posts;
      }
    );
    this.postService.getPosts();
    this.postService.emitPostsSubject();
  }

  onLoveIt(i: number) {
    let numLoveIts = this.postService.lovePost(i);
    // console.log(++numLoveIts);
    return numLoveIts;
  }

  onDontLoveIt(i: number) {
    let numDontLoveIts = this.postService.dontLovePost(i);
    // console.log(--numDontLoveIts);
    return numDontLoveIts;
  }

  onEdit(i: number) {
    if (confirm('Voulez-vous vraiment modifier ce post ? \n ' + this.postList[i].title)) {
      this.router.navigate(['edit-post', i]);
    }
  }

  onDelete(i: number) {
    if (confirm('Voulez-vous vraiment supprimer ce post ? \n ' + this.postList[i].title)) {
      this.postService.deletePost(i);
    } else {
      this.router.navigate(['/posts']);
    }
  }

  onDeleteAllPosts() {
    if (confirm('Voulez-vous vraiment supprimer tous les ' + this.postService.posts.length + ' posts ?')) {
      this.postService.deleteAllPosts();
    }
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
