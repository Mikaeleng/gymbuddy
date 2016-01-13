/**
 * Created by mikaelen on 01/06/15.
 */
'use strict';

angular.module('frameworkDirectives', [])
    .directive('mainMenu', function(){

        return {
            restrict: 'E',
            templateUrl: 'navigation/mainMenu.html',
            replace: true,
            controller: function($scope, $element, $log, $http, buildNavigation, restApi){
               /* $scope.initEvent = initEvent.getData('http://127.0.0.1:8080/gymbuddy/assets/json/main_navigation');
                $scope.initEvent.then(function(event){
                        $scope.navElements = event;
                },
                    function(status){
                    $log.warn(status);
                });*/


                restApi.getNavigation().then(function(event){
                        // defines the retrived main navigation:
                        $scope.navElements = event.data;
                        // build navigation:
                        buildNavigation.initBuild($scope.navElements,0);
                    })
                    .catch(function(response) {
                        console.error('Tell notification framework that something went wrong: ->', response.status, response.data);
                    })
                    .finally(function() {
                        console.log("Tell notification framework you are finished", response.status);
                    });

                $scope.menuClick = {};
                $scope.menuClick.toggle = function(item, event) {
                    //$log.info($(event.currentTarget).parent().children('ul').children());
                    if($(event.currentTarget).parent().hasClass('opened')){
                        $(event.currentTarget).parent().addClass('closed').removeClass('opened');
                        $(event.currentTarget).text('-');
                        $(event.currentTarget).parent().children('ul').children('li').addClass('ng-show').removeClass('ng-hide');
                    }else if($(event.currentTarget).parent().hasClass('closed')){
                        $(event.currentTarget).parent().addClass('opened').removeClass('closed');
                        $(event.currentTarget).parent().find('span').text('+');
                        $(event.currentTarget).parent().children('ul').find('li').addClass('ng-hide').removeClass('ng-show');
                    }

                };
            },
            link: function (scope, el, attrs) {
               // scope.label = attrs.menuTitle;
            }
        }

    }
).directive('topMenu', function(){

        return {
            restrict: 'E',
            templateUrl: 'navigation/topMenu.html',
            replace: true,
            controller: function($scope, $element, $log, sidebarMenuEvent){

                sidebarMenuEvent.init();

                $scope.toggleMainMenu = function(event){

                }
            },
            link: function (scope, el, attrs) {

            }
        };
    }).directive('footer', function(){

        return {
            restrict: 'E',
            templateUrl: 'navigation/footer.html',
            replace: true,
            controller: function($scope, $element, $log){

                $scope.backButton = function(event){

                }
            },
            link: function (scope, el, attrs) {
                //console.log(el);
                $(el).find('.back-button').on('click', function(){
                    window.history.back();
                })
            }
        };
    });
