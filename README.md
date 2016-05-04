Components-Workshop
===================
Angular allows us to create these great things called components. components are essentially small pieces of functionality our app needs that can be bundled up into individual pieces (aka Encapsulation). 

These components allow us to reuse code within our project, and throughout other projects. Creating your own components can be odd at first but with a bit of understanding and some angular magic they can be incredibly useful.

#The Anatomy of an Angular component - a reference.
```javascript
var app = angular.module('NAME-OF-APP', []);

//our component's name 'nameOfComponent' will be 
//parsed to show up as 'name-of-component' in our HTML.
app.component('nameOfComponent', {
	bindings: {
		passedValue: '<' //Bindings allow us to pass values from a parent scope into the child component
	},
	template: '<div><h1>Hello World</h1></div>', 
	  // the template can take raw HTML, or more commonly templateUrl: accepts a file path that leads to an HTML file.
	  //templateUrl: 'app/views/componentView.html',
	controller: function($scope) { 
		//We can create a controller in our component, We can also utilize lifecycle hooks 
	  	var vm = this;
	  	this.$onInit = function() {
		  vm.test = 'am I alive?!';
      		}
	},
	//Controller As syntax is supported by default the controller as value will be $ctrl
	controllerAs: '$ctrl'
	}

})
```

###Note:
Most of these attributes within the component example above are optional. For more information about components visit the documentation at: https://docs.angularjs.org/guide/component


###Walkthrough
If you dig through the angular documentation and as you become more familiar with components you will notice that angular is heavily dependent in its use of components. A few example components or directives that you use all the time even if you weren't aware of it are: 

+ ng-app
+ ng-view
+ ng-repeat
+ ng-click
+ ect...

####Step 1

We are now going to embrace the modularity of angular and create our first reusable module. This means that the custom component that you write here will be easy to reuse in all of your projects by simply injecting your module into your apps dependencies. To get started lets create a new and setup our angular module. 

<i>mycomponents.js</i>
```javascript
var app = angular.module('mycomponents', []);
```

You are familiar with creating controllers, factories, and services already and the markup for starting a component looks very similar however you will simply provide an object as the second argument instead of a function. 

```javascript
app.component('camelCase',{
//component stuff here...
});
```

####Dont get tripped up.
Despite looking just like a controller or a service there are a few things to be cautious of when working with components. The first is naming conventions. Remember that Javascript conventions say we should use `camelCase` while HTML conventions state that we should use `kabob-case`. Angular trying to keep with best practices holds true to these conventions so whatever you name your component here will later be called in your HTML using kabob-case

```html
<camel-case></camel-case>
```

Angular handles the conversion of your naming process itself so you don't have to worry about it, however if you didn't know it was happening you would have a very hard time debugging your code.  

###Step 2

####pending component
Now that we have created our basic setup lets focus on building a component that we can put on a <button></button> element that will show a loading gif while we wait for our data from an $http request. Lets create a new component on our app and lets give it the name 'pending'. We then will setup the basic anatomy of a component.

```javascript
controller: function(){
//Code Here
}
```

Notice a component is a really an object, and on this object we are adding some very specific keys that are specific to components, we just need to take advantage of them.

```html
<button class="btn btn-primary" ng-click="$ctrl.getData()"> Load Data </button>
```

#####A note about scope
When we talk about scope we are often refering to what block of code we are currently residing in and it is through scope that we have access to our variables and functions. What is important to understand when working with components is that the component uses an isolated scope so we know that our component can be modular and not dependent upon a function or variable inside of a parent scope. The component needs to hold all of its own functionality. This concept is not to be confused with being unable to use or take in functions or variables from another controller or parent scope and manipulate them. Think about ng-repeat="item in list" this is a component that is taking in a $scope.variable called list and iterating through each item in that array therefore it must have access to the controller where $scope.list is defined. 

Using scope appropriately and understanding how far down a scope tree you are can be confusing and difficult so it is okay to struggle with this concept. 

###Assignment

You are going to create a component that will show a loading icon while you are waiting on data from some service. The component should be able to load any url through its bindings. You will need to setup a service that can accept this url as well. 

When the Load Data button is clicked. You should go and get the next set of data from your url. The Star Wars Api is perfect for building this concept out. 

*Hints

+ Hide, disable, or change the text of the submit button
+ Show a spinning icon or gif while we wait for our data
+ Hide the spinner when our data returns
+ Reset the load button to its original condition
+ You may need to use $q and setup some promises
+ Inject $q into the component controller function
+ This will be difficult don't give up. Tackle one problem at a time.
+ Bonus: Can you get the data to load when you scroll to the bottom of the page? What things will you need to change?


###Step 3

####Notify component

Now that you have a super cool component that you can drop in anytime you need to make a call to a server lets make another component that will be just as reusable as the last. Make sure you look up Html5 Notifications. They are built into most modern browsers and can therefore be very helpful for notifying us when an event occurs. Think of DevQueue wouldn't it be nice if Mentors got a small notification whenever a student enters the Queue? With this component we should be able to accomplish that task fairly easily. 

Go ahead and setup a brand new component and lets call it 'notify'. The setup here will be alot like our pending component however the link function will be what changes. Follow the same process as before and then put this in as a freebie at the top of your link function. Although most modern browsers have built in notifications and they pretty much all function the same way they are not stored in the same location on the window so we are going to setup a simple or statement that will help make sure we are using the correct notification for each browser. Because it would be annoying for any site to give you popup notifications without your consent users have to grant permission to receive notifications. This permission is saved as a cookie so it will remember the setting each time you go to the site. Because it uses Cookies make sure you use something like http-server when testing. 


Copy and paste this code into your controllers $onInit function. This is a shim that should setup notifications on most common browsers.

```javascript
var Notification = window.Notification || window.mozNotification ||   window.webkitNotification;
  
//Before notifications will work you have to get permission
Notification.requestPermission(function (permission) {
	//console.log(permission);
});
```

Moving right along if you look console.log(Notification) you would see that in each of these browsers Notification is a constructor. Remember in Js constructors use an initial capital letter. This means that for each notification we will be creating an 'new Notification()' instance. This constructor is setup to take in two parameters a string for its title and then an object with the rest of its properties. (title, {body: '', icon: ''}). Practice getting these notifications to work first with some hard coded values, then think about what you have learned to pass in variables that are from your controller. 



```javascript
  this.show = function() {
	var instance = new Notification('Testing', { body: 'A simple test', icon: 'https://boisecodeworks.com/assets/img/logos/boisecodeworks-logo-lg.png' });
	//You can take advantage of the notification api
	//here are some of the hooks you can tie into
	instance.onclick = function () {
		// Something to do
	};
	
	instance.onerror = function () {
		// Something to do
	};
	
	instance.onshow = function () {
		// Something to do
	};
	
	instance.onclose = function () {
		// Something to do
	};
};
```

*Hints

+ Utilize bindings to make some dynamic {title: '<', body: '<', icon: '<'}
+ Remember to setup your Html with the correct naming conventions
+ Think of how you will need to fire the this.show() function
+ Again This will be difficult don't give up. Tackle one problem at a time. Use your resources.
