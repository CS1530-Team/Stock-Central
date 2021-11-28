import { Component, OnInit } from '@angular/core';
import { FeedService } from '../services/feed.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private feedService: FeedService) { }



  ngOnInit(): void {
    this.feedService.setUserIDLocalStorage()
  }

}
