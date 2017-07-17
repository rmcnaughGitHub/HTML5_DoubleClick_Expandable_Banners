'use strict'

var run = window.run || {};

run = {

	time: 1.8,
	replayTime: 0,
	root: window,
	imgContainer : document.getElementById('imgContainer'),
	text1: document.getElementById('text1'),
	cta: document.getElementById('cta'),
	whiteBlock: document.getElementById('whiteBlock'),
	openPanel: document.getElementById('openPanel'),

	imgContainer_exp: document.getElementById('imgContainer_exp'),
	img1_exp: document.getElementById('img1_exp'),
	text1_exp: document.getElementById('text1_exp'),
	cta_exp: document.getElementById('cta_exp'),
	logo_exp: document.getElementById('logo_exp'),
	whiteBlock_exp: document.getElementById('whiteBlock_exp'),
	closePanel: document.getElementById('closePanel'),

	ctaOver : document.getElementById('ctaOver'),
	ctaOver_exp : document.getElementById('ctaOver_exp'),

	init: function(){
		//check for doubleclick
		if (!Enabler.isInitialized()) {
			  Enabler.addEventListener(
			    studio.events.StudioEvent.INIT,
			    enablerInitialized);
			} else {
			   enablerInitialized();
		}
		function enablerInitialized() {
		  // Enabler initialized.
		  // In App ads are rendered offscreen so animation should wait for
		  // the visible event. These are simulated with delays in the local
		  // environment.
		  if (!Enabler.isVisible()) {
		    Enabler.addEventListener(
		      studio.events.StudioEvent.VISIBLE,
		      adVisible);
		  } else {
		     adVisible();
		  }
		}
		function adVisible() {
			// Ad visible, start ad/animation.
			run.loadSpriteSheet([
				'../images/spriteSheet.png',
				'../images/img1.jpg'
				]).done(function(images){
					run.animation();
			});
		}
		
	},

	//PRELOAD SPRITESHEETS | IMAGES
	loadSpriteSheet: function(arr){
	    var newimages = [], loadedimages = 0
	    var postaction = function(){}
	    var arr = (typeof arr!="object")? [arr] : arr
	    function imageloadpost(){
	        loadedimages++
	        if (loadedimages == arr.length){
	            postaction(newimages) //call postaction and pass in newimages array as parameter
	        }
	    }
	    for (var i=0; i<arr.length; i++){
	        newimages[i] = new Image()
	        newimages[i].src = arr[i]
	        newimages[i].onload = function(){
	            imageloadpost()
	        }
	        newimages[i].onerror = function(){
	            imageloadpost()
	        }
	        //console.log('image == ',arr[i]);
	    }
	    return { //return blank object with done() method
	        done:function(f){
	            postaction = f || postaction //remember user defined callback functions to be called when images load
	        }
	    }

	},


	//BANNER CLICK FUNCTION
	addListeners: function(){
		Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, run.openPanelStartHandler);
		Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, run.openPanelFinishHandler);
	    Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, run.closePanelStartHandler);
	    Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH,  run.closePanelFinishHandler);  
	    //open panel
		openPanel.addEventListener('click', run.openPanelEvent, true);
		openPanel.addEventListener('mouseover', run.openRollOver, true);
		openPanel.addEventListener('mouseout', run.openRollOut, true);
		//close panel
		closePanel.addEventListener('click', run.closePanelEvent, true); 
		closePanel.addEventListener('mouseover', run.closeRollOver, true);
		closePanel.addEventListener('mouseout', run.closeRollOut, true); 
	},

	//OpenPanel
	openPanelEvent: function (){
		Enabler.requestExpand();
		openPanelContainer.style.display = 'none';
		closePanel.style.display = 'block';

		if( run.replayTime == 1){
			run.resetAniTwo();
		}else{
			run.aniTwo();
		}
		
	},
	openRollOver: function (){
		ctaOver.style.display = 'block';	
	},
	openRollOut: function (){
		ctaOver.style.display = 'none';	
	},

	//ClosePanel
	closePanelEvent: function (){
		Enabler.requestCollapse();
		Enabler.exit('HTML5_Background_Clickthrough');
		openPanelContainer.style.display = 'block';
		closePanel.style.display = 'none';
		run.resetAniOne();
	},
	closeRollOver: function (){
		ctaOver_exp.style.display = 'block';	
	},
	closeRollOut: function (){
		ctaOver_exp.style.display = 'none';	
	},

	//ENABLER EVENTS
	openPanelStartHandler: function(){
		Enabler.finishExpand();
	},

	openPanelFinishHandler: function(){
		Enabler.startTimer("Full Screen duration")
	},

	closePanelStartHandler: function(){
		Enabler.finishCollapse();
	},

	closePanelFinishHandler: function() {
		//-- Stop timer if there's any --//
		Enabler.stopTimer("Full Screen duration");
	},


	//ANIMATION FUNCTIONS
	aniOne: function(){
		TweenLite.to(text1, run.time - 1.5, {delay: 0, top: 0, ease:Circ.easeOut});
		TweenLite.to(cta, run.time, {delay: run.time - 0.5, opacity: 1, ease:Power4.easeOut});
		TweenLite.to(run.root,0, {delay:run.time - 0.5, onComplete: function(){
			ctaOver.style.top = '28px';
		}});
		//
		//console.log('aniOne');
	},

	resetAniOne: function(){
		ctaOver.style.top = '-100px';
		TweenLite.set(text1, {top: 90});
		TweenLite.set(cta, {opacity: 0});
		TweenLite.to(run.root, 0, {delay: run.time * 0.5, onComplete: function(){
			run.aniOne();
		}});
	},

	aniTwo: function(){
		run.replayTime = 1;//allow replay after first time//top: -502, left: -352,
		TweenLite.to(closePanel, run.time * .5, {width: 725, height: 268, ease:Circ.easeOut, onComplete: function(){
			TweenLite.to(img1_exp, run.time * 3, {delay: 0, scale:.39, x: -298, y: -45, transformOrigin: "50% 50%", force3D: true, rotationZ:0.01, ease:Power3.easeInOut});
			TweenLite.to(whiteBlock_exp, run.time * 2, {delay: run.time - 1.2, left: 245, ease:Power3.easeInOut});
			TweenLite.to(logo_exp, run.time * 2, {delay: run.time - 1.2, left: 0, ease:Power3.easeInOut});
			TweenLite.to(text1_exp, run.time - 1.2, {delay: run.time * 1.9, top: 0, opacity: 1, ease:Circ.easeOut});
			TweenLite.to(cta_exp, run.time * 1.5, {delay: run.time * 2.5, opacity: 1, ease:Power4.easeOut});
			TweenLite.to(run.root,0, {delay:run.time  * 2.0, onComplete: function(){
				ctaOver_exp.style.top = '183px';
			}});
		}});
		//
		//console.log('aniTwo');
	},

	resetAniTwo: function(){
		run.replayTime = 0;
		ctaOver_exp.style.top = '-100px';
		TweenLite.set(img1_exp, {scale:1, top: -470, left: -42, x:0, y:0, transformOrigin: "50% 50%"});
		TweenLite.set(whiteBlock_exp, {left: 728, });
		TweenLite.set(text1_exp, {top: 270});
		TweenLite.set(logo_exp, {left: 270});
		TweenLite.set(cta_exp, {opacity: 0});
		TweenLite.set(closePanel, {width: 725, height: 0});
		TweenLite.to(run.root, 0, {delay: 0, onComplete: function(){
			run.aniTwo();
		}});
	},


	//MAIN ANIMATION
	animation: function(){
		//Listeners
		run.addListeners();
		//First animation
		run.aniOne();	
	}
	
};

document.addEventListener('DOMContentLoaded', function(){
	//console.log('WORKING NOW');
	run.init();
});