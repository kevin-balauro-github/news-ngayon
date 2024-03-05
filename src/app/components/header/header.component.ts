import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'News Ngayon';

  constructor(private router: Router, private route: ActivatedRoute) {}

  getNewsWithKeyword(keyword: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        keyword: keyword,
      },
    });
  }
}
