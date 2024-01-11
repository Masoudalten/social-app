import { Injectable } from "@angular/core"
import { Router } from "@angular/router";

export class UserAuthService {
    users: any[] = [
        {
            id: 1,
            name: 'Mario',
            lastname: 'Rossi',
            email: 'mario.rossi@mail.com',
            username: 'm.rossi',
            image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
            id: 2,
            name: 'Marco',
            lastname: 'Ricci',
            email: 'marco.ricci@mail.com',
            username: 'm.ricci',
            image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        {
            id: 3,
            name: 'Alessia',
            lastname: 'Moretti',
            email: 'alessia.moretti@mail.com',
            username: 'a.moretti',
            image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

        }
    ];

    session: any;
    constructor() { }
    login(username: string) {
        let user = this.users.find((u) => u.username === username)
        if (user) {
            this.session = user;
            localStorage.setItem('session', JSON.stringify(this.session))
        }

        return user;
    }

    // logout() {
    //     this.session = undefined;
    //     localStorage.removeItem('session');
    //     this.router.navigateByUrl('/')
    // }

    public getUser(id: number) {
        let user = this.users.find((u) => u.id === id);
        return user;
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

}
