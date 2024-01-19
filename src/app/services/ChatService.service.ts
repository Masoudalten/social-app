import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private showChatSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private openChats: string[] = [];
    private maxOpenChats = 3;
    selectedUser: any;

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

    addChat(chatId: string) {
        if (this.openChats.length < this.maxOpenChats) {
            this.openChats.push(chatId);
        } else {
            this.toggleChat();
            this.openChats.shift();
            this.showChatSubject.next(false);
            this.openChats.push(chatId);
        }
    }

    isChatOpen(chatId: string): boolean {
        return this.openChats.includes(chatId);
    }

    getOpenChats(): string[] {
        return this.openChats;
    }
}
