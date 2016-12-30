'use strict';

angular
	.module('myApp', [
		'myApp.musicList',
		'myApp.geners',
		'ui.router',
		'ui.bootstrap',
		'ngResource'
	])
	.config(['$urlRouterProvider', '$stateProvider','$locationProvider', '$httpProvider',
		function($urlRouterProvider,$stateProvider,$locationProvider, $httpProvider) {
			$urlRouterProvider.otherwise('/');
			$locationProvider.html5Mode({
        		enabled: true,
        		requireBase: false
        	});
        }
    ])
    .factory('Rgeners', function($resource) {
               return $resource('http://104.197.128.152:8000/v1/genres/:id',
                                    {id: "@id"},
                                    {
                                      ListGenres: { method: "GET", params: {} },
                                      GetGenre: { method: "GET", params: { id: 0 } },
                                      CreateGenre: { method: "POST", params: {} },
                                      UpdateGenre: { method: "POST", params: {  id: '@id' } }
                                    });
        })
    .factory('tracks', function($resource) {
               return $resource('http://104.197.128.152:8000/v1/tracks/:id',
                                    {id: "@id"},
                                    {
                                      ListTracks: { method: "GET", params: {} },
                                      GetTrack: { method: "GET", params: { id: 0 } },
                                      SearchTrack: { method: "GET", params: { id: 0 } },
                                      CreateTrack: { method: "POST", params: {} },
                                      UpdateTrack: { method: "POST", params: {  id: 0 } }
                                    });
        })

	.filter('ellipsis', function() {
		return function(input, limit) {
			if(!limit) limit = 6;
			if(!input) return input;
			input = input.toString();
			if(input.length <= limit)
				return input;
			return input.slice(0, (limit - 3)) + '...';
		}
	})
;