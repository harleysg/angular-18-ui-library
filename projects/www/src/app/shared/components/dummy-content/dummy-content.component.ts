import { Component, OnDestroy, OnInit } from '@angular/core'

@Component({
  selector: 'app-dummy-content',
  standalone: true,
  imports: [],
  templateUrl: './dummy-content.component.html'
})
export class DummyContentComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    console.log('👨‍🚀 ~ Dummy Content ~ ngOnInit')
  }
  ngOnDestroy() {
    console.log('👨‍🚀 ~ Dummy Content ~ ngOnDestroy')
  }
}
