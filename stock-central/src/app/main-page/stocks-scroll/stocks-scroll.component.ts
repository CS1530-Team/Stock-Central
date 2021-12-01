import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedService } from 'src/app/services/feed-service.service';
import { WatchlistServiceService } from 'src/app/services/watchlist-service.service';

@Component({
  selector: 'app-stocks-scroll',
  templateUrl: './stocks-scroll.component.html',
  styleUrls: ['./stocks-scroll.component.scss']
})
export class StocksScrollComponent implements OnInit {

  public newStockFollowed: Observable<string> = this.watchlistService.followStockEvent;

  tickerSymbols: any[] = [];

  constructor(private http: HttpClient, private watchlistService: WatchlistServiceService, private feedService: FeedService) { }

  ngOnInit(): void {
    this.newStockFollowed.subscribe( res => {
      if (res != '') {
        this.tickerSymbols.push({"ticker": res});
      }
    })
    let userID: any = sessionStorage.getItem('userID')
    this.feedService.setUserIDLocalStorage().subscribe((id: any) => {
      this.watchlistService.getWatchlistItems(id[0].user_id).subscribe((res: any) => {
        this.tickerSymbols = res;
      })
    })
  }

  getTicker(tickerSymbol: any) {
    return tickerSymbol.ticker;
  }

}
