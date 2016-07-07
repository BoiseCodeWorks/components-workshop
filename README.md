Components-Workshop
===================
Angular allows us to create these great things called components. Components are essentially small pieces of functional code that can include both logic and view elements; and also provide means to control how data gets into and out of the component. Encapsulation allows us to keep the data within our components secure, and also provides a means for us to include a component in a larger project with creating issues.

These components allow us to reuse code within a single project, and also include that code within other projects. Creating your own components can be a little tricky at first, but with a bit of understanding and some angular magic you will see that they can be incredibly useful.

#The Anatomy of an Angular component - a reference.
```javascript
var app = angular.module('NAME-OF-APP', []);

// ***IMPORTANT***
//our component's name 'nameOfComponent' will be 
//parsed to show up as 'name-of-component' in our HTML.
app.component('nameOfComponent', {
	bindings: {
		passedValue: '<' //Bindings allow us to pass values from a parent scope into the child component
	},
	template: '<div><h1>Hello World</h1></div>', 
	  // the template can take raw HTML (as we see in the example above), or more commonly 
	  //templateUrl: accepts a file path that leads to an HTML file (see commented code below for syntax).
	  //templateUrl: 'app/views/componentView.html',
	controller: function($scope) { 
		//We can create a controller in our component to provide functionality, 
		//We can also utilize lifecycle hooks as in the example below.
	  	var vm = this;
	  	this.$onInit = function() {
		  vm.test = 'am I alive?!';
      		}
	},
	//Controller As syntax is also supported, although by default the Controller As value will be '$ctrl'
	controllerAs: '$ctrl'
	}

})
```

###Note:
Most of these attributes within the component example above are optional. For more information about components visit the documentation at: https://docs.angularjs.org/guide/component


###Walkthrough
When you dig through the Angular documentation, and as you become more familiar with components in general you will notice that Angular is heavily dependent upon them. To illustrate this, here are just a few examples of components or directives that you probably use all the time: 

+ ng-app
+ ng-view
+ ng-repeat
+ ng-click
+ (trust me ... there's lots more!)

####Step 1

We are now going to embrace the modular nature of Angular and create our first reusable module. This means that the custom component that you'll write here will be easy to reuse in all of your projects. This is done by simply injecting your module as a dependency into your current app. Let's get started by creating a new angular module! 

<i>mycomponents.js</i>
```javascript
var app = angular.module('mycomponents', []);
```

You are familiar with creating controllers, factories, and services already and the syntax for starting a component looks very similar. The main difference being that you will provide an *object* as the second argument instead of a function. 

```javascript
app.component('camelCase',{
//component stuff here...
});
```

####Dont get tripped up.
Despite looking very much like a controller or a service there are a few things to be cautious of when working with components. The first is naming conventions. Remember that Javascript conventions say we should use `camelCase` while HTML conventions state that we should use `kabob-case`. Angular, in trying to keep with best practices, conforms to these conventions. So whatever you name your component here, will later be called in your HTML using kabob-case!

```html
<camel-case></camel-case>
```

Angular takes care of converting your names from `camelCase` to `kabob-case` automatically, so you don't have to worry about it. However, if you didn't know it was happening you would have a **very** hard time debugging your code.  

###Step 2

####Creating our 'pending' component
Now that we have created our basic setup, let's focus on building a component that we can put on a <button></button> element that will show a loading gif while we wait for our data from an $http request. Let's create a new component in our app and give it the name 'pending'. We will then setup the basic anatomy of our component.

```javascript
controller: function(){
//Code Here
}
```

Remember that a component is a really an object. Within this object we are adding some keys that are quite specific to components, and we'll need to take advantage of them.

```html
<button class="btn btn-primary" ng-click="$ctrl.getData()"> Load Data </button>
<!-- ... do you remember what I said about $ctrl? -->
```

#####A side note about scope
When we talk about `scope` we are often refering to the block of code we are currently in, and it is only within that scope that we have access to our variables and functions. What is important to understand when working with components, is that the component uses an *isolated* scope. This allows us to know that our component is modular and not dependent upon a function or variable within a parent scope. The component needs to hold **all** of its own functionality. This is not to be confused with being unable to use or take in functions or variables from another controller, or a parent scope and manipulate them. Think about ng-repeat="item in list". This is a component that is taking in a $scope.variable called 'list' and is iterating through each item in that array, therefore it *must* have access to the controller where $scope.list is defined. 

Using scope appropriately, and understanding how many steps down a scope tree you currently are can be confusing and difficult, so it is understandable if you struggle a bit with this concept. 

###Assignment

You are going to create a component that will show a loading icon while you are waiting on data from some service. The component should be able to load any url through its `bindings`. You will need to setup a service that can accept this url as well. 

When the Load Data button is clicked, you should go and get the next set of data from your url. The Star Wars API is perfect for building this concept out. 

*Hints

+ Hide, disable, or change the text of the submit button.
+ Show a spinning icon or gif while we wait for our data.
+ Hide the spinner when our data returns.
+ Reset the load button to its original condition.
+ You may need to use $q and setup some promises.
+ Inject $q into the component controller function.
+ Tackle one problem at a time! This will be difficult, so manage one piece at a time and don't give up. 
+ **Bonus:** Can you get the data to load when you scroll to the bottom of the page? What things will you need to change?

###Step 3

####Notify component

Now that you have a super cool component that you can drop in anytime you need to make a call to a server, lets make another component that will be just as reusable as the last. Make sure you look up HTML5 Notifications. They are built into most modern browsers, and can therefore be very helpful for notifying us when an event occurs. Think of DevQueue ... wouldn't it be nice if Mentors got a small notification whenever a student enters the Queue? With this component we should be able to accomplish that task fairly easily. 

Go ahead and setup a brand new component and lets call it 'notify'. The setup here will be a lot like our 'pending' component, however the link function will be different. Follow the same process as before and then put your notification in at the top of your link function. Although most modern browsers have built-in notifications, and they all pretty much function the same way, they are not stored in the same location on the window. So, we are going to have to setup a simple 'or' statement that will help make sure we are using the correct notification for each browser. Because it would be annoying for any site to give you popup notifications without your consent, users have to grant permission to receive notifications. This permission is saved as a cookie so your browser will remember the setting each time you go to the site. Because it uses Cookies, make sure you use something like http-server when testing.

Copy and paste this code into your controller's $onInit function. This is a *shim* that should setup notifications on most common browsers.

```javascript
var Notification = window.Notification || window.mozNotification || window.webkitNotification;
  
//Before notifications will work you have to get permission
Notification.requestPermission(function (permission) {
	//console.log(permission);
});
```

Moving right along ... if you look at console.log(Notification) you would see that in each of these browsers, Notification is a constructor. Remember that in JS, constructors use an initial capital letter. This means that for each notification, we will be creating a 'new Notification()' instance. This constructor is setup to take in two parameters: a string for its title, and then an object with the rest of its properties (title, {body: '', icon: ''}). Practice getting these notifications to work first with some hard coded values, then think about what you have learned about passing in variables that are from your controller. 

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

+ Utilize bindings to make some of the above dynamic {title: '<', body: '<', icon: '<'}
+ Remember to setup your HTML with the correct naming conventions.
+ Think of how you will need to fire the 'this.show()' function.
+ Again, this will be difficult so don't give up. Tackle one problem at a time. Use your resources.
