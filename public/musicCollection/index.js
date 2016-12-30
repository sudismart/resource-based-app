'use strict';

angular
	.module('myApp.musicList', ['ui.router'])
	.config(['$stateProvider', function($stateProvider,tracks,Glist) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/musicCollection/index.html',
				controller: 'listCtrl as lCtrl',
				resolve: {
					list: ["tracks", function(tracks){
						return tracks.ListTracks({},function(data){
							return data;
						})
					}],
					Glist: ["Rgeners", function(Rgeners){
						return Rgeners.ListGenres({},function(data){
							return data.results;
						});
					}]
				}
			});
	}])
	.controller('listCtrl', listCtrl)
	.directive('trackCard',function(){
		return{
			restrict:"EA",
			replace:true,
			template:"<div class='track-card'>" +
						"<span  style='float:left'>{{track.title}}</span>" +
						"<span style='float:right' uib-rating ng-model='track.rating' max=5 read-only=true></span>"+
			         "</div>"
		}
	});

listCtrl.$inject = ["$http","$state", "$rootScope","list","tracks","Glist"];
function listCtrl($http,$state, $rootScope,list,tracks,Glist){
	var vm = this;
	vm.list = list;
	vm.genresList = Glist;
    vm.newTrack = {
		title:"",
		genres:[]
	};
	vm.getTrack = function(val){
		//return tracks.SearchTrack({title:val},function(data){
		//	console.log(data);
		//	vm.editTrackItem = item;
		//			vm.searchId = item.id;
		//			console.log(vm.searchId);
		//			return item.title;
		//	return data;
		//});
		return $http.get(' http://104.197.128.152:8000/v1/tracks?title='+val).then(function(response){
			return response.data.results.map(function(item){
				vm.editTrackItem = item;
				vm.searchId = item.id;
				return item.title;
			});
		});
	};
	vm.getByPage = function(val){
		if(val!="next"){
			vm.pageId= val;
		}else{
			vm.pageId += 1;
		}
		return $http.get(' http://104.197.128.152:8000/v1/tracks?page='+vm.pageId).then(function(res){
			vm.list= {};
			vm.list = res.data;
		});
	};

	vm.edit = function(val){
		var newVal ={
			id:'',
			rating:'',
			title:'',
			geners:[]
		};
		newVal.id = val.id;
		newVal.rating = val.rating;
		newVal.title = val.title;
		newVal.geners.push(val.id);
		return tracks.UpdateTrack({id:val.id},newVal,function(data){
			vm.editTrack = "";
			return data;
		});

	};

	vm.addTrack = function(val){
		val.genres = [];
		angular.forEach(vm.genreId,function(value,key){
			val.genres.push(parseInt(value));
		});
		return tracks.CreateTrack({title:val.title,rating:val.rating,genres:val.genres},function(data){
			vm.newTrack = "";
			return data;
		})
	};


}