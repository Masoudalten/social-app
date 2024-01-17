import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})


export class PostService {
    posts: any[] = [
        {
            nauthor: 'John',
            lauthor: 'Doe',
            content: 'Share a carousel post of your favorite products with a brief description of each. You can also include a call-to-action (CTA) to encourage your followers to visit your website or make a purchase. For example, “Swipe left to see our top picks for the season! Click the link in our bio to shop now.”'
        },
        {
            nauthor: 'Max',
            lauthor: 'Smith',
            content: 'Share a video post of your team working on a project or preparing for an event. You can also add a caption that provides context and insight into your brands culture. For example, “We asre working hard to bring you the best experience at our upcoming event! Stay tuned for more updates."'
        },
        {
            nauthor: 'Max',
            lauthor: 'Smith',
            content: 'Share a video post of your team working on a project or preparing for an event. You can also add a caption that provides context and insight into your brands culture. For example, “We asre working hard to bring you the best experience at our upcoming event! Stay tuned for more updates."'
        },
        {
            nauthor: 'Max',
            lauthor: 'Smith',
            content: 'Share a video post of your team working on a project or preparing for an event. You can also add a caption that provides context and insight into your brands culture. For example, “We asre working hard to bring you the best experience at our upcoming event! Stay tuned for more updates."'
        },
        {
            nauthor: 'Max',
            lauthor: 'Smith',
            content: 'Share a video post of your team working on a project or preparing for an event. You can also add a caption that provides context and insight into your brands culture. For example, “We asre working hard to bring you the best experience at our upcoming event! Stay tuned for more updates."'
        },
        {
            nauthor: 'Max',
            lauthor: 'Smith',
            content: 'Share a video post of your team working on a project or preparing for an event. You can also add a caption that provides context and insight into your brands culture. For example, “We asre working hard to bring you the best experience at our upcoming event! Stay tuned for more updates."'
        },
        {
            nauthor: 'Max',
            lauthor: 'Smith',
            content: 'Share a video post of your team working on a project or preparing for an event. You can also add a caption that provides context and insight into your brands culture. For example, “We asre working hard to bring you the best experience at our upcoming event! Stay tuned for more updates."'
        },
        {
            nauthor: 'Max',
            lauthor: 'Smith',
            content: 'Share a video post of your team working on a project or preparing for an event. You can also add a caption that provides context and insight into your brands culture. For example, “We asre working hard to bring you the best experience at our upcoming event! Stay tuned for more updates."'
        },
        {
            nauthor: 'Max',
            lauthor: 'Smith',
            content: 'Share a video post of your team working on a project or preparing for an event. You can also add a caption that provides context and insight into your brands culture. For example, “We asre working hard to bring you the best experience at our upcoming event! Stay tuned for more updates."'
        }
        
    ];

    getPosts(): Observable<any[]> {
        return of(this.posts);
    }

    addPost(newPost: any): void {
        this.posts.push(newPost);
    }


}