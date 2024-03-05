import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  public categories: string[] = [];
  constructor(private newsApiService: NewsApiService) {}

  ngOnInit(): void {
    this.categories = this.newsApiService.getCategoryList();
  }
}
