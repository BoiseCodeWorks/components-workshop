(function(){
angular.module("MasterController").component("compTest", {
            bindings: {
                equals: '=',
                lessthan: '<',
                at: '@',
                and: '&',
                templateUrl: "other.html",
                controller: PieceOne,
                compNum: 87,
                compStr: "Yikes",
    compArr: ["s","m","r",2,"goldfish"]
}
    });
    })()