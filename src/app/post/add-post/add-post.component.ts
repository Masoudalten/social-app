import { Component, Output, EventEmitter } from '@angular/core';
import { UserAuthService } from '../../services/UserService.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  @Output() newPostEvent = new EventEmitter<any>();
  newPost: any = { content: '' };

  constructor(private userService: UserAuthService) {}


  submitNewPost() {
    if (this.newPost.content) {
      const { name: authorName, lastname: authorLastName } = this.userService.session;
      const newPost = { nauthor: authorName, lauthor: authorLastName, content: this.newPost.content };

      this.newPostEvent.emit(newPost);

      this.newPost.content = '';
    }
  }
}