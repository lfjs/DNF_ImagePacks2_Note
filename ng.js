/**
 * Created by Administrator on 2017/4/17 0017.
 */

var app = angular.module('ngApp', []);


app.directive('resize', function ($window) {        //响应窗口变化
    return function ($scope, element) {
        var w = angular.element($window);
        var toolsA = document.getElementsByClassName('nav_top');
        var toolsB = document.getElementsByClassName('nav_left');
        var innerTable = document.getElementById('active_table');
        var outerTable = document.getElementById('wtable');
        $scope.getWindowDimensions = function () {
            return {
                'h1': w[0].innerHeight,
                'toolsA': toolsA[0].offsetHeight,
                'innerWidth': innerTable.offsetWidth,
                'outerWidth': outerTable.offsetWidth,
                'toolsB': toolsB[0].offsetHeight
            };
        };
        $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
            $scope.wTableStyle ={
                "height" : newValue.h1 - newValue.toolsA - newValue.toolsB + 'px'
            };
            $scope.hideWeak(newValue.outerWidth-newValue.innerWidth-15);
        }, true);
        w.bind('resize', function () {
            $scope.$apply();
        });
    }
});

app.controller('ngCtrl', function($scope, $http) {
    $scope.reload = function(){
        $http({
            method: 'GET',
            //url: 'test.json'
            url: 'ImagePacks2.json'                                         //加载位置
        }).then(function successCallback(response) {
            $scope.titles = [];
            $scope.titles = response.data.ImagePacks2[0];
            $scope.names = response.data.ImagePacks2;
            $scope.fltList($scope.titles,$scope.names);
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
        temp[Arr[0][$scope.fltNum]] = 1;//排除标题
        angular.forEach(Arr,function(x){    //职业去重后压入筛选列表
            if(x[$scope.fltNum]!=='' && !temp[x[$scope.fltNum]]){
                $scope.flt.push(x[$scope.fltNum]);
                temp[x[$scope.fltNum]] = 1
            }
        });
    };

    $scope.fltStatus = true;           //筛选菜单初始状态
    $scope.fltToggle = function(text){
        if(text == $scope.fltKey){
            $scope.fltStatus = !$scope.fltStatus;
        }
    };

    $scope.fltAction = function(targ){      //筛选的展示与隐藏
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
        $scope.fltStatus = !$scope.fltStatus;
    };

    $scope.hideWeakStack = {
        '时间戳':'sj',
        '体积':1,
        '日期':1,
        '序号':1
    };

    $scope.hideWeak = function(space) {
        var ipTable = document.getElementById('active_table').tBodies[0].rows;
        var ipTableH = document.getElementById('active_table').tHead.rows;
        if(space > 0){
            console.log('white space!'+space);
        }else{
            console.log('white space!'+space);
            console.log('数据将被缩略！');
            //console.log($scope.hideWeakStack);
            angular.forEach(ipTableH[0].cells,function(x){      //弱势列位置信息录入
                if($scope.hideWeakStack[x.innerText]){
                    $scope.hideWeakStack[x.innerText]=x.cellIndex;
                    //console.log($scope.hideWeakStack);
                }
            });
            for(i in $scope.hideWeakStack){             //依照信息隐藏弱势列
                console.log(i + ': '+ $scope.hideWeakStack[i]);
                if($scope.hideWeakStack[i] !=='_'){
                    if($scope.hideWeakStack[i] == 'sj'){
                        angular.forEach(ipTableH,function(x){
                            x.cells[4].className += ' ng-hide';
                        });
                        angular.forEach(ipTable,function(x){
                            x.cells[4].className += ' ng-hide';
                        });
                        $scope.hideWeakStack[i]='_';
                        break;
                    }else{
                        angular.forEach(ipTableH,function(x){
                            x.cells[$scope.hideWeakStack[i]].className += ' ng-hide';
                        });
                        angular.forEach(ipTable,function(x){
                            x.cells[$scope.hideWeakStack[i]].className += ' ng-hide';
                        });
                        $scope.hideWeakStack[i]='_';
                        console.log('hidingIndex: '+ i);
                        break;
                    }

                }

            }
        }
    };



    });
