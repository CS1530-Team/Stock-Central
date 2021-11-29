import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StockDataService } from 'src/app/services/stock-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  
  @Output() closePopupEvent = new EventEmitter();
  @Input() input = '';

  companyName = '';
  latestPrice = '';
  changeAmt = 0
  changePercent: number = 0
  public change: number = 0;

  stockNewsImage1 = '';
  stockNewsHeadline1 = '';
  stockNewsURL1 = '';

  constructor(public authenticationService: AuthenticationService, private stockDataService: StockDataService) { }

  ngOnInit(): void {
    this.stockDataService.getStockBasicPriceInfo(this.input).subscribe((res: any) => {
      // console.log(res);
      this.companyName = res.companyName
      this.latestPrice = res.latestPrice
      this.changeAmt = Math.abs(res.change)
      this.changePercent = res.changePercent.toFixed(2)
      if (res.change > 0)
        this.change = 1;
      else if (res.change < 0)
        this.change = -1;
      else
        this.change = 0;
    })
    this.stockDataService.getStockNews(this.input).subscribe((res: any) => {
      console.log(res);
      this.stockNewsImage1 = res[0].image;
      this.stockNewsHeadline1 = res[0].headline;
      this.stockNewsURL1 = res[0].url;
    })
  }

  closePopup() {
    this.closePopupEvent.emit();
  }

}