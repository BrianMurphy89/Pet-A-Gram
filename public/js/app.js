const app = angular.module('petApp', []);


app.controller('mainController', ['$http', function($http){

    // empty array to store pets in
    this.allPets = [];

    // empty object to add data from form submission into
    this.formData = {};

    this.indexOfEditFormToShow = null;

    this.getPets = () => {
        $http({
            method:'GET',
            url:'/pet-a-gram'
        }).then((response) => {
            this.allPets = response.data
        }, error => {
            console.error(error);
        }).catch(err => console.error('Catch ', err))
    } // end getPets();

    this.createPet = ()=> {
        $http({
            method: 'POST',
            url:'/pet-a-gram',
            data: this.formData
        }).then( (res)=> {
            console.log(res);
            this.formData = {};
            this.allPets.push(res.data);
        }, error => {
            console.error(error)
        }).catch(err => console.error('Catch ', err));
    } // end createPet();

    this.editPet = ( pet ) => {
        $http({
            method: 'PUT',
            url: '/pet-a-gram/' + pet._id,
            data: {
                name: this.editedName,
                species: this.editedSpecies,
                profileImg: this.editedProfileImg,
                description: this.editedDescription
            }
        }).then( (res)=> {
            console.log(res.data);
            this.indexOfEditFormToShow = null;
            this.getPets();
        }, erorr => {
            console.error(error)
        }).catch(err => console.error('Catch '. err));
    } // end editPet();

    this.deletePet = ( id ) => {
        $http({
            method: 'DELETE',
            url: '/pet-a-gram/' + id
        }).then( (res)=>{
            const removeByIndex = this.allPets.findIndex(pet => pet._id === id);
            this.allPets.splice(removeByIndex, 1);
        }, error => {
            console.error(error);
        }).catch(err => console.error('Catch ', err))
    }
    this.getPets(); // <---- Load immediately on page load.
}]) // end mainController
