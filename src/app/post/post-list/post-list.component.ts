import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/PostService.service';
import { UserAuthService } from '../../services/UserService.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts$: Observable<any[]> = new Observable<any[]>();;
  newPost: any = { nauthor: '', lauthor: '', content: '' };

  constructor(private postService: PostService, private userService: UserAuthService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }

}