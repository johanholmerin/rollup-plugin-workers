System.register([], function () {
  'use strict';
  return {
    execute: function () {

      registerPaint(
        'paint-worklet',
        class {
          paint(ctx, geometry, properties) {
            // ...
          }
        }
      );

    }
  };
});
