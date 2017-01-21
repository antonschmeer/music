$(document).ready(function(){

	$('.song').on('click', function(){

		var song = $(this);
		var song_loc = $(this).attr('data-song');
		
		$('#audio-player').empty().html('<audio id="audio-current" controls><source src="' + song_loc + '"type="audio/mpeg">Your browser does not support the audio element.</audio>');
		
		myAudio = document.getElementById('audio-current');
		myAudio.play();

		$('.song').removeClass('song-selected');
		$(this).addClass('song-selected');

		myAudio.addEventListener("ended", function(){
		    song_ended(song);
		});
	});

	function song_ended(song) {		
		var next_song = song.next('.song');
		if(next_song[0]) {
			next_song.click();		  
		}
		else {
			// myAudio.currentTime = 0;
			return;
		}
	};

	function isPlaying(playerId) {
	    var player = document.getElementById(playerId);
	    return !player.paused && !player.ended && 0 < player.currentTime;	    
	};

	document.body.onkeydown = function(e){
	    if(e.keyCode == 32){
			e.preventDefault();
			if($('#audio-current').length){
		        if(isPlaying('audio-current')){	  
		        	document.getElementById('audio-current').pause();
		        }
		        else {
		        	document.getElementById('audio-current').play();
		        }				
			}
	    }
	};
	
	var name_spin = function(){

		var word = "ДЙX0NБЦCH7Ы3";
		var wordLength = word.length;
		var scrambled = "";

		for (var i = 0; i < wordLength; i++) {
		    var charIndex = Math.floor(Math.random() * word.length);
		    scrambled += word.charAt(charIndex);
		    word = word.substr(0, charIndex) + word.substr(charIndex + 1);
		}

		$('.my-name').text(scrambled);

	};

	spinAlt = 0;
	var stop_name_spin = function() {
		if(spinAlt === 0){
			$('.my-name').empty().css({'font-family':'"Times New Roman", Times, serif', 'font-size':'.95em'}).text('АНТОН СЦХМЕЕР');
			spinAlt += 1;
		}
		else if(spinAlt === 1){
			$('.my-name').empty().css({'font-family':'"TIActuBeta-Regular_web"', 'font-size':'1em'}).text('ANTON SCHMEER');
			spinAlt -= 1;
		}	    
	};

	$('.main-listing').scroll(function(){
		name_spin();
		// console.log('scrolling');
	});

	$('.main-listing').scroll(function() {
	    clearTimeout($.data(this, 'scrollTimer'));
	    $.data(this, 'scrollTimer', setTimeout(function() {
	        stop_name_spin();
	        // console.log("Haven't scrolled in 200ms");
	    }, 200));
	});

	// eliminate the 300ms click delay on mobile browsers https://github.com/ftlabs/fastclick
	$(function() {
	    FastClick.attach(document.body);
	});

	// scroll reveal https://github.com/jlmakes/scrollreveal
	window.sr = ScrollReveal();
	sr.reveal('.main-listing p', {
		container: '.main-listing', 
		reset: true,
		mobile: true,
		easing: 'ease-in-out',
		scale: 1, 
		duration: 1600,
		delay: 0,
		distance: '0px'
	});
});
