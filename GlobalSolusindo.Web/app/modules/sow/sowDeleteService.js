﻿(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name app.service:dashboardService
     * @description
     * # dashboardService
     * Service of the app
     */

    angular
        .module('global-solusindo')
        .factory('sowDeleteService', sow);

    sow.$inject = ['HttpService', 'uiService'];

    function sow(http, ui) {
        var self = this;
        var controller;

        function deleteRecords(ids) {
            return http.delete('sow', ids).then(function (response) {
                var res = response;
                if (res.success) {
                    controller.datatable.draw();
                    ui.alert.success(res.message, 'popup');
                } else {
                    ui.alert.error(res.message);
                }
            });
        }

        self.delete = function (data) {
            var ids = [data.sow_pk];
            ui.alert.confirm("Are you sure want to delete sow '" + data.sowName + "'?", function () {
                return deleteRecords(ids);
            });
        };

        self.deleteMultiple = function (selectedRecords) {
            var ids = [];

            if (selectedRecords) {
                for (var i = 0; i < selectedRecords.length; i++) {
                    ids.push(selectedRecords[i].sow_pk);
                }
            }

            ui.alert.confirm("Are you sure want to delete " + ids.length + " selected data?", function () {
                return deleteRecords(ids);
            });
        };

        self.init = function (ctrl) {
            controller = ctrl;

            //Row delete button event
            $('#sow tbody').on('click', '#delete', function () {
                var selectedRecord = controller.datatable.row($(this).parents('tr')).data();
                self.delete(selectedRecord);
            });

            //Toolbar delete button event
            angular.element('#deleteButton').on('click', function () {
                var selectedRows = controller.datatable.rows('.selected').data();
                var rowsAreSelected = selectedRows.length > 0;
                if (!rowsAreSelected) {
                    ui.alert.error('Please select the record you want to delete.');
                    return;
                }

                var selectedRecords = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    selectedRecords.push(selectedRows[i]);
                }
                self.deleteMultiple(selectedRecords);
            });
        };

        return self;
    }

})();