import { Injectable } from '@angular/core';
import {Post} from '../models/Post';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  /*posts: Post[] = [
    new Post('Mon premier post', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aut autem beatae distinctio eligendi expedita, facere fuga illum ipsum labore perspiciatis, quia quis quod rerum saepe veniam vero vitae.', 0, new Date()),
    new Post('Mon deuxième post', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aut autem beatae distinctio eligendi expedita, facere fuga illum ipsum labore perspiciatis, quia quis quod rerum saepe veniam vero vitae.', -1, new Date()) ,
    new Post( 'Mon troisième post', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aut autem beatae distinctio eligendi expedita, facere fuga illum ipsum labore perspiciatis, quia quis quod rerum saepe veniam vero vitae.', 0, new Date()),
    new Post( 'Mon quatrième post', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aut autem beatae distinctio eligendi expedita, facere fuga illum ipsum labore perspiciatis, quia quis quod rerum saepe veniam vero vitae.', 1, new Date())
  ];*/

  posts: Post[];
  postsSubject = new Subject<Post[]>();

  constructor() {
    this.getPosts();
  }

  emitPostsSubject() {
    this.postsSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts).then();
    this.emitPostsSubject();
  }

  getPosts() {
      // return this.posts; // method 2

    // method 1 :
    return firebase.database().ref('/posts')
      .on('value', (data: DataSnapshot) => {
        this.posts = data.val() ? data.val() : [];
        this.emitPostsSubject();
      });
  }

  getPost(index: number) {
    // return this.posts[index]; // method 2

    // method 1 :
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + index).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
            this.emitPostsSubject();
          }, (err) => {
            reject(err);
          }
        );
      }
    );
  }

  lovePost(i: number) {
    const numLoveIts = this.posts[i].loveIts++;
    this.savePosts();
    return numLoveIts;
  }

  dontLovePost(i: number) {
    const numDontLoveIts = this.posts[i].loveIts--;
    this.savePosts();
    return numDontLoveIts;
  }

  addPost(post: Post) {
    firebase.database().ref('/posts/' + this.posts.length).set(post).then(); // method 1
    // firebase.database().ref().child('/posts/' + this.posts.length).set(post).then(); // method 1

    // this.posts.push(post); // method 2
    // this.savePosts();
  }

  updatePost(index: number, post: Post) {
    firebase.database().ref('/posts/' + index).update(post).then(); // method 1

    // this.posts.splice(index, 1, post); // method 2
    // this.savePosts();
  }

  deletePost(index: number) {
    //firebase.database().ref('/posts/' + index).remove().then();  // method 1

    this.posts.splice(index, 1); // method 2
     this.savePosts();
  }

  deleteAllPosts() {
    // firebase.database().ref('/posts/').remove().then();  // method 1

    this.posts.splice(0, this.posts.length); // method 2
    this.savePosts();
  }

}
