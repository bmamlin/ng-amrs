/*jshint -W003, -W026, -W117, -W098 */
(function() {
  'use strict';

  angular
        .module('app.openmrsRestServices')
        .service('OpenmrsSettings', OpenmrsSettings);

  OpenmrsSettings.$inject = [];

  function OpenmrsSettings() {
    var serviceDefinition;
    var restUrlBaseList = ['https://test1.ampath.or.ke:8443/amrs/ws/rest/v1/', 'https://etl1.ampath.or.ke:8443/amrs/ws/rest/v1/'];
    var restUrlBase = restUrlBaseList[0];

    serviceDefinition = {
          getCurrentRestUrlBase: getCurrentRestUrlBase,
          setCurrentRestUrlBase: setCurrentRestUrlBase,
          restUrlBase: restUrlBase
        };
    return serviceDefinition;

    function getCurrentRestUrlBase() {
          return restUrlBase;
        }

    function setCurrentRestUrlBase(url) {
          restUrlBase = url;
        }

  }
})();
