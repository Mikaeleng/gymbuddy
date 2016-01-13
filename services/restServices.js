	/**
 * sidebarEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

gymbuddy.factory("restApi", ['$http', "$log", function($http, $log) {
	var serviceBase = 'services/servercalls/'

	var obj = {};

	obj.insertSet = function(excercise){
		return $http.post(serviceBase + 'insertSet', excercise).then(function (results) {
			return results;
		});
	}











	obj.getWeights = function(){
		return $http.get(serviceBase + 'weights');

	}
	obj.getWeight = function(weightID){
		return $http.get(serviceBase + 'weight?id=' + weightID);
	}

	obj.insertWeight = function (weightID) {
		return $http.post(serviceBase + 'insertWeight', weightID).then(function (results) {
			return results;
		});
	};

	obj.updateWeight = function (weightID,weight) {
		return $http.post(serviceBase + 'updateWeight', {weight:weight, id:weightID}).then(function (status) {
			return status.data;
		});
	};

	obj.deleteWeight = function (weightID) {
		return $http.delete(serviceBase + 'deleteWeight?id=' + weightID).then(function (status) {
			return status.data;
		});
	};

	obj.getEatables = function(){
		return $http.get(serviceBase + 'eatables');
	}

	obj.getEatable = function(eatableID){
		return $http.get(serviceBase + 'eatable?id=' + eatableID);
	}

	obj.insertEatable = function (eatableID) {
		return $http.post(serviceBase + 'insertEatable', eatableID).then(function (results) {
			return results;
		});
	};
	obj.updateEatable = function (eatableID,eatable) {
		return $http.post(serviceBase + 'updateEatable', {eatable:eatable, id:eatable.ID}).then(function (status) {
			return status.data;
		});
	};

	obj.deleteEatable = function (eatableID) {
		return $http.delete(serviceBase + 'deleteEatable?id=' + eatableID).then(function (status) {
			return status.data;
		});
	};

	obj.getNavigation = function(){
		return $http.get(serviceBase + 'navigation');
	}

	return obj;
}]);