import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Post} from '../models/Post';
import {getLocaleDateFormat} from '@angular/common';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  newForm: FormGroup;
  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.newForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        content: ['', Validators.required]
      }
    );
  }

  onSavePost() {
    const title = this.newForm.controls.title.value;
    const content = this.newForm.get('content').value;
    const loveIts = 0;
    const createdAt = (new Date()).toString();
    const newpost = new Post(title, content, loveIts, createdAt);

    if (confirm('Voulez-vous vraiment ajouter ce nouveau post ? \n ' + title)) {
      this.postService.addPost(newpost);
      this.router.navigate(['/posts']);
    }
  }

  onResetPostForm() {
    this.newForm.reset();
  }

  onBack() {
    this.router.navigate(['/posts']);
  }
}
