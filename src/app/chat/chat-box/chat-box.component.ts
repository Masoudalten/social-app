import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChatService } from '../../services/ChatService.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {

  @Input() chatId: number = 0;
  showChat = false;
  selectedUser: any;
  currentChatId: number = 0;
  chatPosition: number = 0;
  
  messages: string[] = [];
  newMessage: string = '';


  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.selectedUser = this.chatService.selectedUser;

    this.chatService.showChat.subscribe((status) => {
      this.showChat = status;
      this.currentChatId = this.chatId || 0;
      this.chatPosition = this.chatService.getOpenChats().indexOf(this.currentChatId);
    });
  }


  getOpenChats(): number[] {
    this.showChat = true;
    return this.chatService.getOpenChats();
  }

  onCloseClick() {
    const index = this.chatPosition;

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
