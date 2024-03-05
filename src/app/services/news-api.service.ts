import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;

  private categories: string[] = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ];

  constructor(private http: HttpClient) {}

  getNews(category: string, keyword: string): Observable<News> {
    const params = new HttpParams()
      .set('access_key', this.apiKey)
      .set('languages', 'en')
      .set('countries', 'ph')
      .set('categories', category)
      .set('keywords', keyword);
    return this.http.get<News>(`${this.apiUrl}?`, { params });
  }

  getCategoryList() {
    return this.categories;
  }
}
