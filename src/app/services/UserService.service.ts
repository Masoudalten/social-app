import { Injectable } from "@angular/core"
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserAuthService {
    users: any[] = [
        {
            id: 1,
            name: 'Mario',
            lastname: 'Rossi',
            email: 'mario.rossi@mail.com',
            username: 'm.rossi',
            image: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
        },
        {
            id: 2,
            name: 'Marco',
            lastname: 'Ricci',
            email: 'marco.ricci@mail.com',
            username: 'm.ricci',
            image: 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg'
        },
        {
            id: 3,
            name: 'Alessia',
            lastname: 'Moretti',
            email: 'alessia.moretti@mail.com',
            username: 'a.moretti',
            image: 'assets/a.moretti.webp'
        },
        {
            id: 4,
            name: 'Giulia',
            lastname: 'Conti',
            email: 'giulia.conti@mail.com',
            username: 'g.conti',
            image: 'https://play-lh.googleusercontent.com/LqgSQHWNv9Dc7DS_J3BgYfZviCti_RBgQNDUHqFWqMLkdhbBxXOQy7cacNXCz5mSMqQ'
        },
        {
            id: 5,
            name: 'Luca',
            lastname: 'Bianchi',
            email: 'luca.bianchi@mail.com',
            username: 'l.bianchi',
            image: 'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg'
        },
        {
            id: 6,
            name: 'Sara',
            lastname: 'Gallo',
            email: 'sara.gallo@mail.com',
            username: 's.gallo',
            image: 'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp'
        },
        {
            id: 7,
            name: 'Davide',
            lastname: 'Ferrari',
            email: 'davide.ferrari@mail.com',
            username: 'd.ferrari',
            image: 'https://www.elitesingles.co.uk/wp-content/uploads/sites/59/2019/11/2b_en_articleslide_sm2-350x264.jpg'
        },
        {
            id: 8,
            name: 'Elena',
            lastname: 'Barbieri',
            email: 'elena.barbieri@mail.com',
            username: 'e.barbieri',
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3cv7Qpgv8kERJvDuTcedfAiHvUA4qOHIdKRMg5lY4yL8r8Hhqax00kx0NAFB8de-g4J4UwWJ2L4PvxjsswQQDDwABTovM8dLo7f9PoxKdx7FVI0eWDjzjsI373u8ck9cTfKwQMJCB2uD4eVaYNnba6tO2zfalNYbQlECQNodmI2GaaiUZv_dIglAA/s16000-rw/%E0%A6%95%E0%A6%BF%E0%A6%89%E0%A6%9F%20%E0%A6%AE%E0%A7%87%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%A6%E0%A7%87%E0%A6%B0%20%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A7%8B%E0%A6%AB%E0%A6%BE%E0%A6%87%E0%A6%B2%20%E0%A6%AA%E0%A6%BF%E0%A6%95%20-%20%E0%A6%AE%E0%A7%87%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%A6%E0%A7%87%E0%A6%B0%20%E0%A6%AA%E0%A6%BF%E0%A6%95%E0%A6%9A%E0%A6%BE%E0%A6%B0%20%E0%A7%A8%E0%A7%A6%E0%A7%A8%E0%A7%A9%20-%20%E0%A6%AE%E0%A7%87%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%A6%E0%A7%87%E0%A6%B0%20%E0%A6%AB%E0%A6%9F%E0%A7%8B%20%E0%A6%A1%E0%A6%BF%E0%A6%9C%E0%A6%BE%E0%A6%87%E0%A6%A8%20-%20meye%20pic%20-%20NeotericIT.com%20(1).jpg'
        },
        {
            id: 9,
            name: 'Roberto',
            lastname: 'Rinaldi',
            email: 'roberto.rinaldi@mail.com',
            username: 'r.rinaldi',
            image: 'https://fotoup.net/uploads/84/64/846468cdec8cac6cf1babb9dc9c565edb4e.jpg'
        },
        {
            id: 10,
            name: 'Giorgio',
            lastname: 'Martini',
            email: 'giorgio.martini@mail.com',
            username: 'g.martini',
            image: 'https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg'
        }
    ];
    


    private isUserLoggedIn: boolean = false;

    session: any;
    user: any;


    constructor(private router: Router) {
        const storedSession = localStorage.getItem('session');
        this.session = storedSession ? JSON.parse(storedSession) : null;
        this.isUserLoggedIn = this.session !== null;
    }
    login(username: string) {
        let user = this.users.find((u) => u.username === username)
        if (user) {
            this.session = user;
            localStorage.setItem('session', JSON.stringify(this.session))
        }
        this.isUserLoggedIn = true;
        return user;

    }

    logout() {
        this.session = undefined;
        localStorage.removeItem('session');
        this.router.navigateByUrl('/');
        this.isUserLoggedIn = false;
    }

    public getUser(id: number): Observable<any> {
        let user = this.users.find((u) => u.id === id);
        return of(user);
    }


    updateUser(updatedUser: any): void {
        const index = this.users.findIndex(user => user.id === updatedUser.id);

        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...updatedUser };
            if (this.session && this.session.id === updatedUser.id) {
                this.session = { ...this.session, ...updatedUser };
                localStorage.setItem('session', JSON.stringify(this.session));
            }
        }
    }

    getIsUserLoggedIn(): boolean {
        return this.isUserLoggedIn;
    }


    currentUser(): boolean {
        if (this.isUserLoggedIn &&  this.user.id === this.session.id) {
            console.log('User is the current user');
            return true;
        }

        console.log('User is not the current user');
        return false;
    }


}
