System.register([], (function () {
  'use strict';
  return {
    execute: (function () {

      self.addEventListener('install', event => {
        console.log(event);
      });

    })
  };
}));
