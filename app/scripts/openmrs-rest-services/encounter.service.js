/*
jshint -W026, -W116, -W098, -W003, -W068, -W004, -W033, -W030, -W117
*/
(function() {
  'use strict';

  angular
    .module('app.openmrsRestServices')
          .factory('EncounterResService', EncounterResService);

  EncounterResService.$inject = ['Restangular'];

  function EncounterResService(Restangular) {
    var service = {
      getEncounterByUuid: getEncounterByUuid,
      saveEncounter: saveEncounter,
      getPatientEncounters: getPatientEncounters
    }

    return service;

    function getEncounterByUuid(params, successCallback, errorCallback) {
      var objParams = {};
      if(angular.isDefined(params) && typeof params === 'string'){
        var encounterUuid = params;
        objParams = {'encounter': encounterUuid, 'v':'default'}
      } else {
        objParams = {
          'encounter': params.uuid,
          'v': params.rep || 'full'
        }
      }
      Restangular.one('encounter',objParams.encounter).get({v:objParams.v}).then(function(data) {
        _successCallbackHandler(successCallback, data);
      },
      function(error) {
        console.log('An error occured while attempting to fetch encounter ' +
                    'with uuid ' + uuid);
        if (typeof errorCallback === 'function') errorCallback(error);
      });
    }

    function saveEncounter(encounter, successCallback, errorCallback) {
      Restangular.service('encounter').post(encounter).then(function(success) {
        console.log('Encounter saved successfully');
        if (typeof successCallback === 'function') successCallback(success);
      },
      function(error) {
        console.log('Error saving encounter');
        if (typeof errorCallback === 'function') errorCallback(error);
      });
    }

    function getPatientEncounters(params, successCallback, errorCallback) {
      var objParams = {};
      if(angular.isDefined(params) && typeof params === 'string'){
        var patientUuid = params;
        objParams = {'patient': patientUuid, 'v':'default'}
      } else {
        objParams = {
          'patient': params.patientUuid,
          'v': params.rep || 'default'
        }
      }

      Restangular.one('encounter').get(objParams).then(function(data) {
        if(angular.isDefined(data.results)) data = data.results;
        _successCallbackHandler(successCallback, data);
      },
      function(error) {
        console.log('An error occured while attempting to fetch encounter ' +
                    'with uuid ' + uuid);
        if (typeof errorCallback === 'function') errorCallback(error);
      });
    }

    function _successCallbackHandler(successCallback, data) {
      if (typeof successCallback !== 'function') {
        console.log('Error: You need a callback function to process' +
        ' results');
        return;
      }

      successCallback(data);
    }
  }
})();
