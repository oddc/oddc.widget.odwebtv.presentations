(function () {
    'use strict';

    angular.module('oddc.widget.odwebtv.presentations')
        .component('presentationList', {
            templateUrl: 'src/components/presentationList.component/presentationList.component.html',
            controller: presentationListController,
            controllerAs: 'presentationListController'
        });

    presentationListController.$inject = ['presentationService', 'authenticationService', '$window', '$state', 'configuration'];

    function presentationListController(presentationService, authenticationService, $window, $state, configuration) {
        var self = this;

        self.presentationList = [];
        self.loading = true;

        self.$onInit = function() {
            authenticationService.getToken()
                .then(function(token) {
                    return presentationService.loadPresentationList(token);
                })
                .then(function(response){
                    if (!response) {
                        $state.go('error');
                    } else {
                        self.presentationList = response;
                        self.selectedPresentation = String(response[0].pr_id);
                        self.loading = false;
                    }
                }, function(){
                    $state.go('error');
                });
        };

        self.openPresentation = function(pr_id) {
            $window.open(configuration.url.replace('###pr_id###', pr_id), '_blank');
        };

    }

})();