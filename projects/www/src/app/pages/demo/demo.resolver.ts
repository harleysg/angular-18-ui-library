import { ResolveFn } from '@angular/router';

export const demoResolver: ResolveFn<Record<string, any>> = (route) => {
  return {
    ...route.params
  };
};
