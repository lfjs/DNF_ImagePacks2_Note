/**
 * Created by Administrator on 2017/4/17 0017.
 */

var app = angular.module('ngApp', []);

app.controller('ngCtrl', function($scope, $http) {
    $scope.reload = function(){
        $http({
            method: 'GET',
            //url: 'test.json'
            url: 'ImagePacks2.json'             //加载位置
        }).then(function successCallback(response) {
            $scope.titles = response.data.ImagePacks2[0];
            $scope.names = response.data.ImagePacks2;
            $scope.names.splice(0,1);
            $scope.fltList($scope.titles,$scope.names);
            $scope.fltShowKey = '';
            $scope.fltShowInput = '';
        }, function errorCallback(response) {
            alert('error when loading!');// 请求失败执行代码
        });
    };
    $scope.reload();

    $scope.fltKey ='职业/类别';         //筛选位置

    $scope.fltNum = 0;                  //定位分类所在列

    $scope.fltList = function(idx,Arr){
        $scope.flt = [];
        var temp = {};
        angular.forEach(idx,function(x,i){  //获取职业分类的列数
            if(x==$scope.fltKey) $scope.fltNum = --i
        });
        angular.forEach(Arr,function(x){    //职业去重后压入筛选列表
            if(x[$scope.fltNum]!=='' && !temp[x[$scope.fltNum]]){
                $scope.flt.push(x[$scope.fltNum]);
                temp[x[$scope.fltNum]] = 1
            }
        });
    };

    $scope.fltStatus = !true;           //筛选菜单初始状态
    $scope.fltToggle = function(text){
        if(text == $scope.fltKey){
            $scope.fltStatus = !$scope.fltStatus;
        }
    };

    $scope.fltAction = function(targ){
        $scope.ipTable = document.getElementById('active_table').tBodies[0].rows;

        angular.forEach($scope.ipTable,function(x){
            if(targ && x.cells[$scope.fltNum+1].textContent !== targ){
                if(x.className.indexOf('ng-hide')+1 == 0){
                    x.className += ' ng-hide';
                }
            }else{
                if(x.className.indexOf('ng-hide')+1){
                    x.className = x.className.replace(/ng-hide/, "");
                }
            }
        });
        //console.log([$scope.aaa = document.getElementById('active_table').tBodies[0].rows[0].cells[$scope.fltNum+1]]);

    }

});
