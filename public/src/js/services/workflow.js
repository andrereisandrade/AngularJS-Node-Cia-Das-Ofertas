'use strict';

/**
* @ngdoc service
* @name nmsTemplatecliWebApp.workflow
* @description
* # workflow
* Service in the nmsTemplatecliWebApp.
*/
angular.module('ciaDasOfertaWebApp')
.factory('WorkflowService', [function () {
    var service = {};

    service.changeTab = function(nextTab, currentTab, tabs, form, company) {
        var indexOfCurrentTab = tabs.indexOf(currentTab);
        var indexOfTab = tabs.indexOf(nextTab);

        if (indexOfCurrentTab > indexOfTab) {
            currentTab = nextTab;
        } else if (indexOfCurrentTab == indexOfTab-1) {
            if(currentTab.validateFormMethod(form, company)){
                currentTab = nextTab;
            }
        }
        return currentTab;
    };

    return service;
}]);
