//cda=Calendar Demo App
var cda = angular.module('calendarDemoApp', []);

// your controller and directive code go here
cda.directive("calendar", function(){
  return {
    restrict: 'A',
    templateUrl: 'calendar_template.html',
    replace:true,
    link: function(scope, element, attrs){
      scope.months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var year_range = 20;
      var current_date = new Date();
      var truthArr = [];
      var true_values = [];
      scope.selectedMonthNum = current_date.getMonth();
      scope.selectedMonth = scope.months[scope.selectedMonthNum];
      scope.selectedYear = current_date.getFullYear();
      scope.weekRange = _.range(7);
      scope.years=[];
      

      //Getting 20 years before and after selected year in the dropdown options.
      for(var i = scope.selectedYear - year_range; i < scope.selectedYear + year_range + 1; i++){
        scope.years.push(i);
      }

      //Watch for month or year to change
      scope.$watchGroup(["selectedYear", "selectedMonth"], function(newValues, oldValues, scope){
        //Converting the month name to its corresponding nuber
        scope.selectedMonthNum = scope.months.indexOf(scope.selectedMonth);
        scope.range = CalendarRange.getMonthlyRange(createDateObject(scope.selectedYear, scope.selectedMonthNum));
        scope.monthRange = getMonthRange(scope.range);
        initiateTruthArray(truthArr, scope.monthRange.length);
        getDaysNotInMonth(scope.range);
        
        console.log(truthArr);
        scope.tableHeightUnits = _.range(Math.round(scope.monthRange.length/scope.weekRange.length));
        
      });

      //Scope Methods
      scope.isOutside = function(index){
        return truthArr[index];
      };

      //Helper Methods
      //This is still a work in progress
      function getDaysNotInMonth(dateRange){
        var outsideDates = tempMonthRange1  = [];
        var tempMonthRange2 = [];
        var monthRange = getMonthRange(dateRange);
        angular.copy(monthRange, tempMonthRange1);
        angular.copy(tempMonthRange1, tempMonthRange2);
        var length = monthRange.length;
        var startIndex = monthRange.indexOf(dateRange.start.getDate());
        var endIndex = monthRange.indexOf(dateRange.end.getDate(), startIndex);
        for(var i = 0; i < startIndex; i++ ){
          truthArr[i] = true;
        }

        for(var j = length - 1; j > endIndex; j-- ){
          truthArr[j] = true;
        }
      }

      function createDateObject(year, month){
        return new Date(year,month,1,0,0,0,0);
      }

      function getMonthRange(dateRange){
        var monthRange = []
        var length = dateRange.days.length;
        for(var i=0; i<length ; i++){
          monthRange.push(dateRange.days[i]['day']);
        }

        return monthRange;
      }

      function initiateTruthArray(truthArr, monthLength){
        for(var i =0; i<monthLength; i++){
          truthArr[i] = false;
        }
      }

    } 
  }
});


//How do I get access to variables in the scope of the directives link function.
cda.controller("TableController", function($scope ){
  //console.log($scope.monthRange);
});