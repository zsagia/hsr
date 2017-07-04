import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { HsrAuthService } from '../../shared/services/hsr-auth.service';
import { HsrDatabaseService } from '../../shared/services/hsr-database.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'hsr-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentMessage: ChatMessage;
  chatMessages: FirebaseListObservable<any>;

  constructor(private hsrDatabaseService: HsrDatabaseService, public hsrAuthService: HsrAuthService) {
    this.chatMessages = hsrDatabaseService.getChatMessages();
  }

  ngOnInit() {
    this.currentMessage = {
      message: null
    };
  }

  sendMessage(message: ChatMessage) {
    const now = Date.now();

    if (!message.$key) {
      this.currentMessage.author = this.hsrAuthService.stateSnapshot.email;
      this.currentMessage.date = now;
      this.currentMessage.reverseDate = 0 - now;
      this.chatMessages.push(this.currentMessage);
    } else {
      const remoteMessage: FirebaseObjectObservable<ChatMessage> = this.hsrDatabaseService.getChatMessage(message.$key)
      delete(message.$key);
      remoteMessage.update(message);
    }
    this.resetMessage();
  }

  deleteMessage(key) {
    this.chatMessages.remove(key);
    this.resetMessage();
  }

  resetMessage() {
    this.currentMessage = {message: null};
  }

  editMessage(key) {
    this.subscription = this.hsrDatabaseService.getChatMessage(key).subscribe((message) => {
      this.currentMessage = message;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

export interface ChatMessage {
  message: string;
  author?: string;
  date?: number;
  reverseDate?: number;
  $key?: number;
}
