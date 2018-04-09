const app = angular.module('petApp', ['ngRoute']);


app.controller('mainController', ['$http', function($http){

    this.currentPage = 'login';
    this.showHome = () => {
        this.currentPage = 'home';
    }
    this.showLogin = () => {
        this.currentPage = 'login';
    }
    this.showSignUp = () => {
        this.currentPage = 'signup';
    }

    this.showProfile = () => {
        this.currentPage = 'profile';
    }

    this.isEditing = false;

    this.toggleEdit = () => {
        this.isEditing = !this.isEditing;
    }
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

    this.getProfilePet = (id) =>{
        $http({
            method: 'GET',
            url: '/pet-a-gram/' + id
        }).then( (res) => {
            this.profilePet = res.data
            console.log(this.profilePet);
            console.log('SEE PROFILE');
        }, error => {
            console.error(error);
        }).catch(err => console.error('Catch ', err))
    }


    this.createPet = ()=> {
        $http({
            method: 'POST',
            url:'/pet-a-gram',
            data: this.formData
        }).then( (res)=> {
            console.log(res);
            this.formData = {};
            this.allPets.push(res.data);
            this.showLogin();
        }, error => {
            console.error(error)
        }).catch(err => console.error('Catch ', err));
    } // end createPet();

    this.editPet = ( id ) => {
        $http({
            method: 'PUT',
            url: '/pet-a-gram/' + id,
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
            this.getProfilePet();
            this.toggleEdit();
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
            this.showLogin();
            this.deleteSession();

        }, error => {
            console.error(error);
        }).catch(err => console.error('Catch ', err))
    }



    this.isAuthorized = false

    this.toggleAuthorized = () =>{
        this.isAuthorized = !this.isAuthorized;
    }
    this.createSession = () =>{
        $http({
            method: 'POST',
            url: '/sessions/login',
            data: {
                username: this.username,
                password: this.password
            }
        }).then( (res)=>{
            console.log('NEW SESSION CREATED!');
            this.loggedInUsername = res.data.username
            this.user = res.data
            this.petId = res.data._id
            this.toggleAuthorized()
            this.getProfilePet(this.petId);
            console.log(this.petId);
            console.log(this.isAuthorized);
        }, error => {
            console.error(error)
        }).catch(err => console.error('Catch ', err))
    } // end createSession()

    this.deleteSession = () =>{
        $http({
            method: 'DELETE',
            url: '/sessions/destroy-route'
        }).then( (res)=>{
            this.toggleAuthorized;
            this.loggedInUsername = false
            console.log(this.isAuthorized);
            console.log(res);
            console.log('LOGGED OUT');
        }, error => {
            console.error(error)
        }).catch(err => console.error('Catch ', err))
    } // end deleteSession();

    // this.checkAuth = () => {
    //     $http({
    //         method: 'GET',
    //         url: '/sessions/session'
    //     }).then( (res)=>{
    //         if(res.data.user) {
    //             this.user = res.data.user;
    //             console.log(this.user);
    //             this.logged = true;
    //             this.home = true;
    //         }
    //     })
    // }


    // empty array to store posts in
    this.allPosts = [];

    // empty object to add data from form submission into
    this.formDataPosts = {};

    this.createPost = (petId) => {
        this.formDataPosts.petId = petId
        console.log(this.formDataPosts);
        $http({
            method: 'POST',
            url: '/posts/',
            data: this.formDataPosts
        }).then( (res)=>{
            console.log(res);
            this.formDataPosts = {};

        })
    }

    this.deletePost = (id) => {
        console.log(id);
        $http({
            method: 'DELETE',
            url: '/posts/' + id
        }).then( (res)=>{
            console.log('DELETED POST');

        })
    }
    this.getPets(); // <---- Load immediately on page load.
    this.getProfilePet();
}])
// app.config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider){
//     $locationProvider.html5Mode({enabled:true});
//
//     $routeProvider.when('/home', {
//         templateUrl: '/views/home.html',
//         controller: 'mainController',
//         controllerAs: 'ctrl'
//     })
//
//     $routeProvider.when('/login', {
//         templateUrl: '/views/login.html',
//         controller: 'mainController',
//         controllerAs: 'ctrl'
//     })
//
//     $routeProvider.when('/signup', {
//         templateUrl: '/views/signup.html',
//         controller: 'mainController',
//         controllerAs: 'ctrl'
//     })
//
//     $routeProvider.when('/profile', {
//         templateUrl: '/views/profile.html',
//         controller: 'mainController',
//         controllerAs: 'ctrl'
//     })
//
//     $routeProvider.when('/welcome', {
//         templateUrl: '/views/welcome.html',
//         controller: 'mainController',
//         controllerAs: 'ctrl'
//     })
// }])
