import { Route, UrlSegment } from '@angular/router';
import { DemoPageComponent } from './demo.page.component';
import { demoResolver } from './demo.resolver';

export const DemoRouting: Route[] = [{
  path: '',
  children: [
    {
      matcher: (url) => {
        const posParams: Record<string, any> = {}

        url.forEach(({ path }) => {
          if (path.match(/^@\w+$/gm)) {
            posParams['user'] = new UrlSegment(path.slice(1), {})
          } else if (path.match(/^(\d{1,4})+$/gm)) {
            posParams['id'] = new UrlSegment(path, {})
          } else if (path.match(/^(D[MWDF]|W[W])/gm)) {
            posParams['category'] = new UrlSegment(path, {})
          }
        })

        return {
          consumed: url,
          posParams
        }
      },
      component: DemoPageComponent,
      resolve: {
        data: demoResolver
      },
    },
  ]
}];
