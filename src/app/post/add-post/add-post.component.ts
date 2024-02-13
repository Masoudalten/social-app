import { Component, Output, EventEmitter, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { UserAuthService } from '../../services/UserService.service';
import { PostService } from '../../services/PostService.service';
import { Post } from '../../interface/Post';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnChanges {
  @Input() isEditMode: boolean = false;
  @Input() selectedPost!: Post | undefined;
  @Output() newPostEvent = new EventEmitter<any>;
  @ViewChild('postForm') postForm!: NgForm;
  newPost: any = { content: '' };

  constructor(private userService: UserAuthService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPost'] && this.selectedPost !== undefined) {
      this.patchFormWithSelectedPost();
    }
  }

  get isUserLoggedIn(): boolean {
    return this.userService.getIsUserLoggedIn();
  }

  patchFormWithSelectedPost() {
    this.postForm.form.patchValue({
      content: this.selectedPost?.content
    });
  }

  submitNewPost() {
    if (this.newPost.content) {
      const { name: authorName, lastname: authorLastName, id: userId } = this.userService.session;
      const newPost = { nauthor: authorName, lauthor: authorLastName, id: userId, content: this.newPost.content };

      this.newPostEvent.emit(newPost);

      this.newPost.content = '';
    }
  }
 }
