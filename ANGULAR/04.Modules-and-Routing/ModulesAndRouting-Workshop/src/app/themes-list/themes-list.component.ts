import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Theme } from '../types/theme';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.css']
})
export class ThemesListComponent implements OnInit {

  isLoading: boolean = true;
  themes: Theme[] = [];
  constructor(private api: ApiService){}


  ngOnInit(): void {
    this.api.getThemes().subscribe((themesData) => {
      this.themes = themesData;
      this.isLoading = false;
    })

  }

}
