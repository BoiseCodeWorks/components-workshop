(function () {
    angular.module("MasterController", [])
        .controller("PieceOne", function () {
            this.alpha = 3.14159,
                this.beta = "Benjamin",
                this.gamma = ["January", "Febuary", "March", "July", "August", "Wednesday", "2:30pm"],
                this.delta = {
                    i: 1,
                    me: 1.1,
                    you: "other",
                    they: ["lots", "of", "people"],
                    us: [2, 4, 6, 8, 10]
                }
        })
        .component("compTest", {
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