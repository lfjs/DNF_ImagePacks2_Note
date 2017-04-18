/**
 * Created by Administrator on 2017/4/17 0017.
 */

var app = angular.module('ngApp', []);

app.controller('ngCtrl', function($scope, $http) {
    $http({
        method: 'GET',
        url: 'test.json'
    }).then(function successCallback(response) {
        $scope.titles = response.data.ImagePacks2[0];
        $scope.names = response.data.ImagePacks2;
        $scope.names.splice(0,1)
    }, function errorCallback(response) {
        alert('error when loading!');// 请求失败执行代码
    });

});
