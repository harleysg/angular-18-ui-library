import { TestBed, inject } from '@angular/core/testing';
import { DateFromToPipe } from './date-from-to.pipe';
import { DatePipe } from '@angular/common';

describe('DateFromToPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      providers: [DatePipe]
    })
  });

  it('create an instance', _injection(() => {
    const pipe = new DateFromToPipe();
    expect(pipe).toBeTruthy();
  }));

  describe('receive different year', () => {
    it('Should transform dates showing both years', _injection(() => {
      const from = '2019-12-23'
      const to = '2020/01/05'
      const pipe = new DateFromToPipe();
      expect(pipe.transform(from, to)).toEqual('Dec 23, 2019 - Jan 5, 2020');
    }));
  })

  describe('receive same year and different month', () => {
    it('Should transform dates showing both month', _injection(() => {
      const from = '2020-01-04'
      const to = '2020/02/05'
      const pipe = new DateFromToPipe();
      expect(pipe.transform(from, to)).toEqual('Jan 4 - Feb 5, 2020');
    }));
  })

  describe('receive same year and month', () => {
    it('Should transform dates showing both month', _injection(() => {
      const from = '2020-01-04'
      const to = '2020/01/05'
      const pipe = new DateFromToPipe();
      expect(pipe.transform(from, to)).toEqual('Jan 4 - 5, 2020');
    }));

    it('Should transform dates showing month long version', _injection(() => {
      const from = '2020-01-04'
      const to = '2020/01/05'
      const pipe = new DateFromToPipe();
      expect(pipe.transform(from, to, { month: 'MMMM' })).toEqual('January 4 - 5, 2020');
    }));
  })

  describe('receive valid date', () => {
    it('Should return empty string', _injection(() => {
      const from = '2020-01-04'
      const to = ''
      const pipe = new DateFromToPipe();
      expect(pipe.transform(from, to)).toEqual('');
    }));
  })

  function _injection(fn: () => unknown) {
    return inject([DatePipe], () => {
      TestBed.runInInjectionContext(fn)
    })
  }
});
