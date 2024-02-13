import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interface/User';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private showChatSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private openChats: number[] = [];
    private maxOpenChats = 3;
    selectedUser: User | undefined;

    get showChat(): Observable<boolean> {
        return this.showChatSubject.asObservable();
    }

    toggleChat() {
        const currentValue = this.showChatSubject.value;
        this.showChatSubject.next(!currentValue);
    }

    closeAllChats() {
        this.openChats = [];
        this.showChatSubject.next(false);
    }

    addChat(chatId: number) {
        if (this.openChats.length < this.maxOpenChats) {
            this.openChats.push(chatId);
        } else {
            this.toggleChat();
            this.openChats.shift();
            this.showChatSubject.next(false);
            this.openChats.push(chatId);
        }
    }

    isChatOpen(chatId: number): boolean {
        return this.openChats.includes(chatId);
    }

    getOpenChats(): number[] {
        //console.log("open chant requested")
        return this.openChats;
    }
}
