const app = angular.module('petApp', []);


app.controller('MyController', ['$http', function($http){
    this.allPets = [];

    this.getPets = () => {
        $http({
            method:'GET',
            url:'/pet-a-gram'
        }).then((response) => {
            this.allPets = response.data
        })
    }
}])
