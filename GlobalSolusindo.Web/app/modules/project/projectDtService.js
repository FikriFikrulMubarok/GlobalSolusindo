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
        .factory('projectDtService', project);

    project.$inject = ['DatatableService'];

    function project(ds) {
        var self = this;
        var controller = {};

        self.init = function (ctrl) {
            controller = ctrl;

            var titleColumnIndex = 1;
            var dt = ds.init("#project", "project/search", {
                extendRequestData: {
                    pageIndex: 1,
                    pageSize: 10
                },
                order: [titleColumnIndex, "asc"],
                columns: [
                    {
                        "orderable": false,
                        "data": "project_pk"
                    },
                    {
                        "data": "operatorTitle"
                    },
                    {
                        "data": "vendorTitle"
                    },
                    {
                        "data": "deliveryAreaTitle"
                    },
                    {
                        "orderable": false,
                        "className": "text-center",
                        "render": function (data) {
                            return "<button id='show' rel='tooltip' title='Detail' data-placement='left' class='btn btn-success'><i class='fa fa-info'></i></button> " +
                                "<button id='view' rel='tooltip' title='Edit' data-placement='left' class='btn btn-warning'><i class='fas fa-pencil-alt'></i></button> " +
                                "<button id='delete' rel='tooltip' title='Delete' data-placement='left' class='btn btn-danger'><i class='fa fa-trash-alt'></i></button>"
                        }
                    }
                ],
                exportButtons: {
                    columns: [1, 2, 3],
                    title: "Project"
                }
            });
            controller.datatable = dt;
            return dt;
        };
        return self;
    }

})();