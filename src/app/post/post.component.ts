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
  editMode: boolean = false;

  selectedPost: Post | undefined;
  currentPostId: string | undefined = '';
  isLoading: boolean = false;
  currentUserId: number | undefined;

  constructor(private postService: PostService, private userService: UserAuthService) { }

  ngOnInit(): void {
    if (this.isUserLoggedIn) {
      this.currentUserId = this.userService.session.id;
    }
    this.isLoading = true;
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      console.log(posts)
      this.isLoading = false;
    });
  }

  get isUserLoggedIn(): boolean {
    return this.userService.getIsUserLoggedIn();
  }



  AddNewPost(newPost: Post) {
    if (!this.editMode) {
      this.postService.addPost(newPost).subscribe(() => {
        this.postService.getPosts().subscribe(posts => {
          this.posts = posts;
        })
      });
    } else {
      this.postService.updatePost(this.currentPostId, newPost).subscribe(() => {
        this.postService.getPosts().subscribe(posts => {
          this.posts = posts;
          this.editMode = false;
        })
      });
    }
  }

  DeletePost(id: string | undefined) {
    this.postService.deletePost(id).subscribe(() => {
      this.postService.getPosts().subscribe(posts => {
        this.posts = posts;
      })
    });
  }

  EditPost(key: string | undefined) {
    this.currentPostId = key
    this.editMode = true;
    this.selectedPost = this.posts.find((post) => { return post.key === key })
  }

  AuthorizedUser() {
    // this.userService.user.id = this.posts.id
  }
}
