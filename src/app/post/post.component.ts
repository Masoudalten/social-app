import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../services/PostService.service';
import { UserAuthService } from '../services/UserService.service';
import { Post } from '../interface/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() posts: Post[] = [];

  constructor(private postService: PostService, private userService: UserAuthService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  addNewPost(newPost: Post) {
    this.postService.addPost(newPost).subscribe(() => {
      this.postService.getPosts().subscribe(posts => {
        this.posts = posts;
      })
    });
  }
}
