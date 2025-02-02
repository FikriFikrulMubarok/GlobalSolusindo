﻿(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name app.controller:userEntryCtrl
     * @description
     * # dashboardCtrl
     * Controller of the app
     */

    angular
        .module('global-solusindo')
        .controller('SOWInfoCtrl', SOWInfoCtrl);

    SOWInfoCtrl.$inject = ['$scope', '$stateParams', '$state', 'SOWInfoBindingService', 'HttpService', 'costDtService', 'costShowModalService', 'costDeleteService', 'sowMapService'];

    function SOWInfoCtrl($scope, sParam, $state, bindingService, http, costDtService, costShowModalService, costDeleteService, map) {
        var self = this;
        self.stateParam = sParam;

        bindingService.init(self).then(function (res) {
            costDtService.init(self);
            costShowModalService.init(self);
            costDeleteService.init(self);
            try {
                map.init(self);

            } catch (e) {

            }
        });

        return self;
    }
})();