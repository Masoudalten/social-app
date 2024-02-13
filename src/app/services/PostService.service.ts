import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Post } from '../interface/Post';

@Injectable({
    providedIn: 'root',
})


export class PostService {
    // posts: any[] = [
    //     {
    //         nauthor: 'John',
    //         lauthor: 'Doe',
    //         content: 'Share a carousel post of your favorite products with a brief description of each. You can also include a call-to-action (CTA) to encourage your followers to visit your website or make a purchase. For example, “Swipe left to see our top picks for the season! Click the link in our bio to shop now.”'
    //     },
    //     {
    //         nauthor: 'Max',
    //         lauthor: 'Smith',
    //         content: 'Share a video post of your team working on a project or preparing for an event. You can also add a caption that provides context and insight into your brands culture. For example, “We asre working hard to bring you the best experience at our upcoming event! Stay tuned for more updates."'
    //     },

    // ];


    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        // return of(this.posts);
        return this.http.get<{ [key: string]: Post }>('https://socialapp-22255-default-rtdb.firebaseio.com/posts.json')
            .pipe(map((response) => {
                let posts = [];
                for (let key in response) {
                    if (response.hasOwnProperty(key))
                        posts.push({ ...response[key], key: key })
                }
                return posts;
            }));
    }

    addPost(newPost: Post): Observable<any> {
        // this.posts.push(newPost);
        return this.http.post<{ name: string; }>('https://socialapp-22255-default-rtdb.firebaseio.com/posts.json', newPost);
    }

    deletePost(id: string | undefined): Observable<any> {
        return this.http.delete('https://socialapp-22255-default-rtdb.firebaseio.com/posts/' + id + '.json');
    }

    updatePost(id: string | undefined, data: Post) {
        return this.http.put('https://socialapp-22255-default-rtdb.firebaseio.com/posts/' + id + '.json', data);
    }

}