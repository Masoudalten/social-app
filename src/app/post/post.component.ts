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

  constructor(private postService: PostService, private userService: UserAuthService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  AddNewPost(newPost: Post) {
    if (!this.editMode) {
      this.postService.addPost(newPost).subscribe(() => {
        this.postService.getPosts().subscribe(posts => {
          this.posts = posts;
        })
      });
      //this.editMode = false;
    } else {
      this.postService.updatePost(this.currentPostId, newPost).subscribe(() => {
        this.postService.getPosts().subscribe(posts => {
          this.posts = posts;
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

  EditPost(id: string | undefined) {
    this.currentPostId = id
    this.editMode = true;
    this.selectedPost = this.posts.find((post) => { return post.id === id })

  }

}
