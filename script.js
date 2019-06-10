
var app = angular.module('app', ['ngAnimate'])

app.controller('mainCtrl', function($scope) {
	$scope.boxes = [{
		name: 'About Me',
		image: 'https://source.unsplash.com/uAgLGG1WBd4/900x900',
		heading: 'Mattia (muh\u2022tee\u2022yuh)',
		content: 'Born in Central Italy, raised in the Southern US. A delightful mix of both, an Arnold Palmer but with Sweet Tea and Limonata.'
	},{
		name: 'Stockabily',
		image: 'images/iStock.gif',
		heading: 'This is Stockabily',
		link: 'https://istock-tropic.herokuapp.com/',
		linkText: 'Try it!',
		Text: 'Try it!',
		content: 'A lightweight app made to help you stay up-to-date on your investments. Search for your favorite stocks using its symbol. The page populates with the most recent closing and opening price and more. Click on the symbol button to generate a chart. Scroll down to find relevant news articles in the News Feed. A collaborative project, this app was built using HTML/CSS, AJAX, Axios, Google Firebase, Sequelize, Express.js, Express Handlebars.'
	},{
		name: 'Dragon Prince Battle Arena',
		image: 'images/battlearena.jpg',
		heading: 'The fate of the world rests in your mouse-clicks!',
		link: 'https://coombapace.github.io/DragonPrinceBattleArena/',
		linkText: 'Play the Game!',
		content: 'A click based, simplistic strategy game. Choose your enemies wisely. Oh, just be quick about it. Momma Dragon wants her egg back, and her patience is grows thin.'
	}, {
		name: 'Liri',
		image: 'images/liri.jpg',
		heading: 'Language Interpretation and Recognition Interface',
		content: 'Like Siri but with text. Liri will search OMDB and return information on your favorite shows and movies using the \'movie-this\' <your movie/show> command. Similarly, search Spotify for song info with \'spotify-this-song\', and find concerts from the Bands in Town API with \'concert-this\'. Finally, store commands in a text file and call them with \'do-what-it-says\'.'
	},{
		name: 'Voltron Trivia',
		image: 'images/voltron_screen.png',
		heading: 'Do You Even Voltron?',
		link: 'https://coombapace.github.io/TriviaGame/',
		linkText: 'Test your mettle!',
		content: 'Only real Voltron nerds need enter here. This trivia game gives the player 20 secs to answer questions. Built with jQuery & Momentjs.'
	}, {
		name: 'Node Store',
		image: 'images/bamazon.jpg',
		heading: 'Store Front & Mgmt System',
		content: 'A storefront that uses MySQL and runs on Node.js. Has Customer, Manager, and Supervisor interfaces for interacting with the store and its database.'
	}, {
		name: 'Good-bye Galaxy',
		image: 'images/gbg.png',
		heading: 'Scifi ',
		content: 'Webseries I helped bring to life as part of a moonlighting trio of animators.'
	}, {
		name: 'QB Inventory App',
		image: 'images/scanner.jpg',
		heading: 'Inventory Management Made Open Source',
		link: 'https://github.com/CoombaPace/qb-inv-scanner',
		linkText: '',
		content: 'A common pain point for businesses and organizations of all sizes is managing inventory. This app is meant to be a free to use inventory scanner that uses the user\'s phone camera (scanner gun\'s need not apply), and works with Quickbooks. Currently underdevelopment, check back soon and often.'
	}, ];

	$scope.selected = [];
	$scope.selectBox = function(item, position, heading) {
		$scope.selected = [{
			item: item,
			position: position,
			heading: heading
		}];
		$scope.$apply();
	}
	$scope.clearSelection = function() {
		$scope.selected = [];
	}
})

app.directive('box', function() {
	return {
		restrict: 'E',
		scope: {},
		bindToController: {
			onSelect: "=",
			item: "="
		},
		controllerAs: 'box',
		controller: function() {
			var box = this;

			box.goFullscreen = function(e) {
				box.onSelect(box.item, e.target.getBoundingClientRect())
			}
		},
		link: function(scope, element) {
			element.bind('click', scope.box.goFullscreen)
			element.css({
				'background-image': 'url(' + scope.box.item.image + ')'
			})
		}
	}
})

app.directive('bigBox', function($timeout) {
	return {
		restrict: 'AE',
		scope: {},
		bindToController: {
			position: "=",
			selected: "=",
			onSelect: "="
		},
		controllerAs: 'box',
		controller: function() {
			var box = this;
		},
		link: function(scope, element) {
			var css = {}
			for (var key in scope.box.position) {
				css[key] = scope.box.position[key] + 'px';
			}
			
			element.css(css);

			$timeout(function() {
				element.css({
					top: '50%',
					left: '10%'
				})
				element.addClass('image-out');
			}, 200)

			$timeout(function() {
				element.css({
					width: '80%',
					height: '100%'
				})
			}, 500)
			
			$timeout(function(){
				element.addClass('show');
			}, 800)
		}
	}
})

// function setupTypewriter(t) {
// 	var HTML = t.innerHTML;

// 	t.innerHTML = "";

// 	var cursorPosition = 0,
// 		tag = "",
// 		writingTag = false,
// 		tagOpen = false,
// 		typeSpeed = 100,
// 	tempTypeSpeed = 0;

// 	var type = function() {
	
// 		if (writingTag === true) {
// 			tag += HTML[cursorPosition];
// 		}

// 		if (HTML[cursorPosition] === "<") {
// 			tempTypeSpeed = 0;
// 			if (tagOpen) {
// 				tagOpen = false;
// 				writingTag = true;
// 			} else {
// 				tag = "";
// 				tagOpen = true;
// 				writingTag = true;
// 				tag += HTML[cursorPosition];
// 			}
// 		}
// 		if (!writingTag && tagOpen) {
// 			tag.innerHTML += HTML[cursorPosition];
// 		}
// 		if (!writingTag && !tagOpen) {
// 			if (HTML[cursorPosition] === " ") {
// 				tempTypeSpeed = 0;
// 			}
// 			else {
// 				tempTypeSpeed = (Math.random() * typeSpeed) + 50;
// 			}
// 			t.innerHTML += HTML[cursorPosition];
// 		}
// 		if (writingTag === true && HTML[cursorPosition] === ">") {
// 			tempTypeSpeed = (Math.random() * typeSpeed) + 50;
// 			writingTag = false;
// 			if (tagOpen) {
// 				var newSpan = document.createElement("span");
// 				t.appendChild(newSpan);
// 				newSpan.innerHTML = tag;
// 				tag = newSpan.firstChild;
// 			}
// 		}

// 		cursorPosition += 1;
// 		if (cursorPosition < HTML.length - 1) {
// 			setTimeout(type, tempTypeSpeed);
// 		}

// 	};

// 	return {
// 		type: type
// 	};
// }

// var typer = document.getElementById('typewriter');

// typewriter = setupTypewriter(typewriter);

// typewriter.type();
