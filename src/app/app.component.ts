import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { TITLE_SUFFIX, HOMEPAGE_TITLE } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(
    private readonly titleService: Title,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .filter((ev) => ev instanceof NavigationEnd)
      .subscribe((ev) => {
        window.scroll(0, 0);
        this.updateTitle();
      });
  }

  updateTitle() {
    const route = this.activatedRoute.snapshot.firstChild;
    if (!route) {
      return undefined;
    }
    const childRoute = route.firstChild;
    const { data: { title } } = childRoute;
    const pageTitle = title ? title : HOMEPAGE_TITLE;

    this.titleService.setTitle(pageTitle + TITLE_SUFFIX);
  }
}