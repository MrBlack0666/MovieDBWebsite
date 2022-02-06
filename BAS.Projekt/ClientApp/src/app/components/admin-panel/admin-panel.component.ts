import { Location } from '@angular/common';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public isLoading: boolean;
  public tabError: boolean;
  public currentTab: number;

  private tabNames: string[] = [ "movie", "genre", "personnel", "user", "rating"]

  constructor(private route: ActivatedRoute, private location: Location) { 
    this.tabError = false;
    this.isLoading = true;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let tab = params.get('tab');

      if(tab == null) {
        this.tabError = true;
      }
      else {
        let index = this.tabNames.findIndex(t => t === tab);

        if(index < 0) {
          this.tabError = true;
        }
        else {
          this.currentTab = index;
        }
      }
      this.isLoading = false;
    })
  }

  changeUrl(event) {
    this.location.go(`/admin/${this.tabNames[event.index]}`)
  }

}
