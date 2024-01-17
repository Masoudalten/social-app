import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {
  @Input() showChat = false;
  @Output() toggleChat = new EventEmitter<void>();

  messages: string[] = [];
  newMessage: string = '';

  onCloseClick() {
    this.toggleChat.emit();
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push(this.newMessage);
      this.newMessage = '';
    }
  }
}
