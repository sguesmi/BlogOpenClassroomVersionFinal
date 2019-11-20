import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Post} from '../models/Post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  editForm: FormGroup;
  id: number = +this.route.snapshot.params.id;

  public lastPost;
  public lastTitle: string;
  public lastContent: string;
  public lastLoveIts: number;
  public lastCreatedAt: Date;

  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();

    // Affichage de l'id récupérer depuis l'url.
    // console.log('l\'id égal à : ' + this.id + ' est de type : ' + typeof(this.id));
  }

  initForm() {
    this.postService.getPost(this.id).then(
      (post: Post) => {
        this.lastPost = post;
        this.lastTitle = post.title;
        this.lastContent = post.content;
        this.lastLoveIts = post.loveIts;
        this.lastCreatedAt = post.createdAt;
      }
    );

    this.editForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        content: ['', Validators.required]
      }
    );
  }

  onEditPostForm() {
    const title = this.editForm.controls.title.value;
    // const title = this.editForm.get('title').value;
    const content = this.editForm.get('content').value;
    const post = new Post(title, content, this.lastLoveIts, (new Date()).toString());
    if (confirm('Voulez-vous enregistrer les modifications de ce post ?')) {
      this.postService.updatePost(this.id, post);
      this.router.navigate(['/posts']);
    }
  }

  onResetPostForm() {
    this.editForm.reset();
  }

  onBack() {
    this.router.navigate(['/posts']);
  }
}
