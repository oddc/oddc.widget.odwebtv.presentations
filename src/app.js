(function () {
    'use strict';

    angular.module('oddc.widget.odwebtv.presentations', ['widgetbuilder'])
        .config(function stateConfig($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('index', {
                    url: '/',
                    template: '<presentation-list />',
                    data: {
                        cssClassNames : 'index'
                    }
                })
                .state('error', {
                    url: '/error',
                    template: '<error />',
                    data: {
                        cssClassNames : 'error'
                    }
                });

            $urlRouterProvider.otherwise('/');
        })
        .service('configuration', ['widgetbuilderConfiguration', function(widgetbuilderConfiguration) {
            switch(widgetbuilderConfiguration.ENV) {
                case 'PROD' :
                    this.url = 'http://www.odweb.tv/admin/oam.htm?service=openpres&data=###pr_id###';
                    break;
                default:
                    this.url = 'http://dev.odweb.tv/admin/oam.htm?service=openpres&data=###pr_id###';
                    break;
            }
        }]);
})();