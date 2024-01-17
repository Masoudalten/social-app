import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../services/PostService.service';
import { UserAuthService } from '../services/UserService.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() posts: any[] = [];

  constructor(private postService: PostService, private userService: UserAuthService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  addNewPost(newPost: any) {
    this.postService.addPost(newPost);
  }
}
