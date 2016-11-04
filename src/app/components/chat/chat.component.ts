import { Component, OnInit } from '@angular/core';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'hsr-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss']
})
export class ChatComponent implements OnInit {

  currentMessage: ChatMessage;

  chatMessages: FirebaseListObservable<any>;

  editingKey: number;

  constructor(private database: FirebaseDatabaseService, private auth: FirebaseAuthService) {
    this.chatMessages = database.getChatMessages();
  }

  ngOnInit() {
    this.currentMessage = {
      message: null
    };
  }

  isAuthor(author) {
    return author === this.auth.getCurrentUser().email;
  }

  sendMessage() {
    let now = Date.now();

    if (!this.editingKey) {
      this.currentMessage.author = this.auth.getCurrentUser().email;
      this.currentMessage.date = now;
      this.currentMessage.reverseDate = 0 - now;
      this.chatMessages.push(this.currentMessage);
    } else {
      this.database.getChatMessage(this.editingKey).update(this.currentMessage);
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
    this.database.getChatMessage(key).subscribe((message) => {
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
