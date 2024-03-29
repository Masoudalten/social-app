import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserAuthService } from './services/UserService.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDialogComponent } from './profile/edit-dialog/edit-dialog.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { AddPostComponent } from './post/add-post/add-post.component';
import { PostService } from './services/PostService.service';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { SearchComponent } from './chat/search/search.component';
import { ChatService } from './services/ChatService.service';
import { ChatBoxComponent } from './chat/chat-box/chat-box.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    HeaderComponent,
    EditDialogComponent,
    ProfileViewComponent,
    PostComponent,
    PostListComponent,
    AddPostComponent,
    ChatComponent,
    SearchComponent,
    ChatBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    HttpClientModule,

  ],
  providers: [UserAuthService,
    PostService,
    ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
