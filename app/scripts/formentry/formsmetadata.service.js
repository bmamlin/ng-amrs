/*
jshint -W098, -W026, -W003, -W068, -W004, -W033, -W030, -W117, -W116, -W069
*/
(function() {
    'use strict';

    angular
        .module('app.formentry')
        .factory('FormsMetaData', FormsMetaData);

    FormsMetaData.$inject = [];

    function FormsMetaData() {

        var forms = {};
        forms['form1'] = {
          name: 'test',
          uuid: '8d5b2be0-c2cc-11de-8d13-0010c6dffd0f',
          encounterType:'yyy'
        };

        forms['form2'] = {
          name: 'test',
          uuid: 'xxx',
          encounterType:'yyy'
        };

        forms['form3'] = {
          name: 'test',
          uuid: 'xxx',
          encounterType:'yyy'
        };

        var service = {
            getForm: getForm
        };

        return service;


        function getForm(uuid) {
          _.find(forms,function(form) {
            if (form.uuid === uuid) return form;
            else if (form.encounterType === uuid) return form;
            else if (form.name === uuid) return form;
          });
        }
    }
})();
