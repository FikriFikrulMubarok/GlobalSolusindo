(function () {
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
        .factory('myTaskListDtService', myTaskListDtService);

    myTaskListDtService.$inject = ['DatatableService'];

    function myTaskListDtService(ds) {
        var self = this;
        var controller = {};

        self.init = function (ctrl) {
            controller = ctrl;
            var titleColumnIndex = 1;
            var dt = ds.init("#myTaskList", "myTaskList/search", {
                extendRequestData: {
                    pageIndex: 1,
                    pageSize: 10
                },
                order: [titleColumnIndex, "asc"],
                columns: [
                    {
                        "orderable": false,
                        "data": "checkIn_pk"
                    },
                    {
                        "data": "userName"
                    },
                    {
                        "data": "kategoriJabatanTitle"
                    },
                    {
                        "data": "sowName"
                    },
                    {
                        "data": "btsName"
                    },
                    {
                        "data": "btsAddress"
                    },
                    {
                        "data": "checkInTime",
                        "render": function (data) { return data ? moment(data).format("DD-MM-YYYY HH:MM") : "-"; }
                    },
                    {
                        "data": "waktuCheckOut",
                        "render": function (data) { return data ? moment(data).format("DD-MM-YYYY HH:MM") : "-"; }
                    },
                    {
                        "data": "fileSubmitted"
                    },
                    {
                        "data": "status"
                    },
                    {
                        "orderable": false,
                        "className": "text-center",
                        "render": function (data) {
                            return "<button id='view' rel='tooltip' title='Edit' data-placement='left' class='btn btn-warning'><i class='fas fa-pencil-alt'></i></button> ";
                        }
                    }
                ],
                exportButtons: {
                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    title: "MyTaskList"
                }
            });
            controller.datatable = dt;
            return dt;
        };

        return self;
    }

})();