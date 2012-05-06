/*!
	tpl.js
	---------
	author: 	Mariz Melo (MM) 2012
	github:		https://github.com/jmarizgit/tpl.js
	site:		http://emoriz.com
*/
(function($){
	
	
	
	//DEBUG (ON/OFF)
	console.log = function() {} //comment to remove console messages
	
	
	
	//DEAL WITH SINGLE SELECTOR OBJECT
	$.fn.tpl = function($value, $where){
		
		//CACHING CALLER SELECTOR
		var $selector = $(this).selector; //get selector
		console.log($selector);
		
		//ACTIONS
		var $tpl = {
			insert : function($value){	//$where overlaps original variable
				
				switch($where){
					
					case 'append':
						$($selector).append($value); //append values
						break;
					case 'prepend':
						$($selector).prepend($value); //prepend values
						break;
					case 'replace':
						$($selector).replaceWith($value);
						break;
					default:
						$($selector).html($value); //remove previous values
						$where = 'html';
				}//switch

				//debug
				console.log($selector+' -> '+$value+', '+$where);
				console.log(""); //breakline
				
			}//insert
		}//$tpl
		
		
			 
		//LOGIC
		switch($value.constructor){
			
			case String:
				console.log("type String detected:");
				$tpl.insert($value);	//insert value inside selector
				break;
				
			case Array:
				console.log("type Array detected:");
				break;
				
			case Object:
				console.log("type Object detected:");
				
				$.each($value, function($key, $val){
				
					var $tag = $key; 	//retrieve tag element reference
					var $nodes = "";	//save all elements before insert
					
					switch($val.constructor){
					
						case Array:
							$.each(this, function($key, $val) {		   						
	   							//insert overlapping original $where variable
		   						$nodes += '<'+$tag+'>'+$val+'</'+$tag+'>'; 
							});//each
							break;
							
						case String:
							$nodes = '<'+$tag+'>'+$val+'</'+$tag+'>';
							break;
							
					}//switch
					
					if($nodes) $tpl.insert($nodes); //unique insert for all nodes
					
				});//each
				break;//case Object
		}//switch
	}//fn.tpl
})(jQuery);