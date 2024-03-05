import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';
import { News } from '../../models/news';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
})
export class NewsListComponent implements OnInit, OnDestroy {
  public news$!: Observable<News>;
  private keyword: string = '';
  private category: string = 'general';
  private categories: string[] = [];
  private keywordSub: Subscription | undefined;
  private categorySub: Subscription | undefined;

  constructor(
    private newsApiService: NewsApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories = this.newsApiService.getCategoryList();

    this.getCategory();
    this.getKeyword();
  }

  ngOnDestroy(): void {
    this.categorySub?.unsubscribe();
    this.keywordSub?.unsubscribe();
  }

  getCategory() {
    this.categorySub = this.activatedRoute.paramMap.subscribe((data) => {
      let newCategory = data.get('categories')!;

      if (this.category !== newCategory) {
        this.category = newCategory;

        let filteredCategory = this.categories.find((c) => c === this.category);

        filteredCategory
          ? this.getNews(this.category, this.keyword)
          : this.router.navigate(['/404']);
      }
    });
  }

  getKeyword() {
    this.keywordSub = this.activatedRoute.queryParamMap.subscribe((data) => {
      let newKeyword = data.get('keyword')!;
      if (newKeyword) {
        this.keyword = newKeyword;
      }
      this.getNews(this.category, this.keyword);
    });
  }

  getNews(category: string, keyword: string) {
    this.news$ = this.newsApiService.getNews(category, keyword);
  }
}
