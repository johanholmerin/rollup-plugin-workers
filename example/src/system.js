import 'systemjs/src/features/script-load.js';
import 'systemjs/src/features/worker-load.js';
import 'systemjs/src/features/basic-resolve.js';

/**
 * Automatically execute main module in Worker
 */
if (self.importScripts) {
  const systemRegister = System.register;
  System.register = function (deps, declare) {
    // Only intercept first call
    System.register = systemRegister;

    // Temporarily override System.instantiate to return module directly
    const systemInstantiate = System.instantiate;
    System.instantiate = function () {
      System.instantiate = systemInstantiate;
      return Promise.resolve([deps, declare]);
    };

    // Trigger SystemJS import
    // location.href is the path of the Worker main script
    this.import(location.href);
  };
}
