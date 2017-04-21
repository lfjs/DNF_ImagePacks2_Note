/**
 * Created by Administrator on 2017/4/17 0017.
 */

var app = angular.module('ngApp', []);

app.controller('ngCtrl', function($scope, $http) {
    $scope.reload = function(){
        $http({
            method: 'GET',
            url: 'test.json'
        }).then(function successCallback(response) {
            $scope.titles = response.data.ImagePacks2[0];
            $scope.names = response.data.ImagePacks2;
            $scope.names.splice(0,1);
            $scope.fltList($scope.titles,$scope.names);
        }, function errorCallback(response) {
            alert('error when loading!');// 请求失败执行代码
        });
    };
    $scope.reload();

    $scope.fltKey ='职业/类别';         //筛选位置

    $scope.fltList = function(idx,Arr){
        $scope.flt = [];
        var num = 0;
        var temp = {};
        angular.forEach(idx,function(x,i){  //获取职业分类的列数
            if(x==$scope.fltKey) num = --i
        });
        angular.forEach(Arr,function(x){    //职业去重后压入筛选列表
            if(!temp[x[num]]){
                $scope.flt.push(x[num]);
                temp[x[num]] = 1
            }
        });
    };

    $scope.fltStatus = true;
    $scope.fltToggle = function(text,$event){
        if(text == $scope.fltKey){
            $scope.fltStatus = !$scope.fltStatus;
        }
    };

    $scope.fltHide = false;
    $scope.fltItem = function(item){
        console.log(item+' '+$scope.fltHide);
        $scope.titles[4]=item;
    };

});
