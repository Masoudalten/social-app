import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/PostService.service';
import { UserAuthService } from '../../services/UserService.service';
import { Observable } from 'rxjs';
import { Post } from '../../interface/Post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]> = new Observable<Post[]>();
  //newPost: any = { nauthor: '', lauthor: '', content: '' };

  constructor(private postService: PostService, private userService: UserAuthService) { }

  ngOnInit() {
    this.posts$ = this.postService.getPosts();
  }

}