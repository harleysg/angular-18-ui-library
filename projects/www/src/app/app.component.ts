import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'www';
  platformId = inject(PLATFORM_ID)

  ngOnInit(): void {
    const isBrowser = isPlatformBrowser(this.platformId)
    console.log("🚀 ~ AppComponent ~ ngOnInit ~ isBrowser:", isBrowser);
  }
}
