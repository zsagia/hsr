import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { HsrAuthService } from '../../services/firebase-auth.service';
import { HsrDatabaseService } from '../../services/firebase-database.service';

@Component({
  selector: 'hsr-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss']
})
export class ChatComponent implements OnInit {

  currentMessage: ChatMessage;

  chatMessages: FirebaseListObservable<any>;

  editingKey: number;

  constructor(private hsrDatabaseService: HsrDatabaseService, private hsrAuthService: HsrAuthService) {
    this.chatMessages = hsrDatabaseService.getChatMessages();
  }

  ngOnInit() {
    this.currentMessage = {
      message: null
    };
  }

  isAuthor(author) {
    return author === this.hsrAuthService.email;
  }

  sendMessage() {
    const now = Date.now();

    if (!this.editingKey) {
      this.currentMessage.author = this.hsrAuthService.email;
      this.currentMessage.date = now;
      this.currentMessage.reverseDate = 0 - now;
      this.chatMessages.push(this.currentMessage);
    } else {
      this.hsrDatabaseService.getChatMessage(this.editingKey).update(this.currentMessage);
    }
    this.currentMessage = {message: null};
    this.editingKey = null;
    // TODO: scroll with jquery
    window.scrollTo(0, 99999);
  }

  deleteMessage(key) {
    this.chatMessages.remove(key);
    this.currentMessage = {message: null};
    this.editingKey = null;
  }

  editMessage(key) {
    this.hsrDatabaseService.getChatMessage(key).subscribe((message) => {
      this.editingKey = message.$key;
      this.currentMessage.message = message.message;
    });
  }

}

export interface ChatMessage {
  message: string;
  author?: string;
  date?: number;
  reverseDate?: number;
  $key?: number;
}
