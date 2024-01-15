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
