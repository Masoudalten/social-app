import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatService } from '../../services/ChatService.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {

  @Input() chatId: string = '';
  showChat = false;
  selectedUser: any;
  currentChatId: string = '';

  messages: string[] = [];
  newMessage: string = '';
  chatPosition: number = 0;

  constructor(private chatService: ChatService) { }



  ngOnInit() {
    this.selectedUser = this.chatService.selectedUser;

    this.chatService.showChat.subscribe((status) => {
      this.showChat = status;
      this.currentChatId = this.chatId || '';
      this.chatPosition = this.chatService.getOpenChats().indexOf(this.currentChatId);
    });
  }


  getOpenChats(): string[] {
    this.showChat = true;
    return this.chatService.getOpenChats();
  }

  onCloseClick() {
    const index = this.chatService.getOpenChats().indexOf(this.currentChatId);

    if (index !== -1) {
      this.chatService.getOpenChats().splice(index, 1);
    }
    this.selectedUser = null;
    this.chatService.toggleChat();
  }


  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push(this.newMessage);
      this.newMessage = '';
    }
  }
}
