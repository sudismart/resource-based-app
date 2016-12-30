'use strict';

angular
    .module('myApp.geners', ['ui.router'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('geners', {
                url: '/geners',
                templateUrl: '/geners/index.html',
                controller: 'genersCtrl as GCtrl',
                resolve: {
                    Glist: ["Rgeners", function(Rgeners){
                        return Rgeners.ListGenres({},function(data){
                            return data;

                        });
                    }]
                }
            });
    }])
    .controller('genersCtrl', genersCtrl);

genersCtrl.$inject = ["Glist","Rgeners"];
function genersCtrl(Glist,Rgeners){
    var vm = this;
    vm.genersList = Glist;

    vm.addGener = function(){
        return Rgeners.CreateGenre({name:vm.newGener},function(data){
            vm.newGener = "";
            return data;
        })
    };

    vm.openEditModal = function(val){
        vm.editGenerItem = val;
        vm.editGener = vm.editGenerItem.name;

    };


    vm.edit = function(val){

        return Rgeners.UpdateGenre({id:val.id},{name:vm.editGener},function(data){
            vm.editGener = "";
            return data;
        });


    };

}