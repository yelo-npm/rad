if (typeof module === 'object' && typeof define !== 'function') {
    var define =function(factory){module.exports = factory(require, exports, module);};
}

define(function (require, exports, module) {

	var lorem = require('lorem').ipsum;
	var moment = require('moment');
	var toStr = Object.prototype.toString;
	var isArr = function(arr){
		return toStr.call(arr) === '[object Array]';
	}

	var fake = {};

	fake.vars = {
		alphabet: 'abcdefghijklmnopqrstuvwxyz'.split('')
	,	character: 'abcdefghijklmnopqrstuvwxyz1234567890-=[];\\,./\'`<~!@#$%^&*()_+{}:"|<>?'.split('')
	,	months:'January February March April May June July August September October December'.split(' ')
	,	days:'Monday Tuesday Wednesday Thursday Friday Satruday Sunday'.split(' ')
	,	minImageSize:100
	,	maxImageSize:200
	,	formats:{
			'word':{
				reg:/(%w)(\d)?/g
			,	fn:function(matches,match1,match2){
					return lorem('w'+(match2?match2:1));
				}
			}
		,	'letter':{
				reg:/(%l)(\d)?/g
			,	fn:function(matches,match1,match2){
					return fake.letter(match2)
				}
			}
		,	'character':{
				reg:/(%c)(\d)?/g
			,	fn:function(matches,match1,match2){
					return fake.character(match2)
				}
			}
		,	'digit':{
				reg:/(%d)(\d)?/g
			,	fn:function(matches,match1,match2){
					if(!match2){match2=1;}
					return fake.digit(match2);
				}
			}
		,	'sentence':{
				reg:/(%s)(\d)?/g
			,	fn:function(matches,match1,match2){
					return fake.sentence(match2)
				}
			}
		,	'paragraph':{
				reg:/(%p)(\d)?/g
			,	fn:function(matches,match1,match2){
					return fake.paragraph(match2);
				}
			}
		,	'month':{
				reg:/(%m)(\d)?/g
			,	fn:function(matches,match1,match2){
					return fake.month(match2)
				}
			}
		,	'day':{
				reg:/(%D)(\d)?/g
			,	fn:function(matches,match1,match2){
					return fake.day(match2)
				}
			}
		}
	}

	fake.random = function(from,to){
		return Math.floor(Math.random()*(to-from+1)+from);
	}

	fake.chance = function(percent){
		if(!arguments.length){percent=10;}
		return percent >= fake.random(0,100);
	}

	fake.letter = function(min,max){
		var n = min && max ? fake.random(min,max) : min ? min : 1,res='';
		while(n){
			res+=fake.fromArray(fake.vars.alphabet)
			n--;
		}
		return res;
	}

	fake.character = function(min,max){
		var n = min && max ? fake.random(min,max) : min ? min : 1,res='';
		while(n){
			res+=fake.fromArray(fake.vars.character)
			n--;
		}
		return res;
	}

	fake.month = function(min,max){
		var n = min && max ? fake.random(min,max) : min ? min : 1,res=[];
		while(n){
			res.push(fake.fromArray(fake.vars.months));
			n--;
		}
		return res.join(' ');
	}

	fake.day = function(min,max){
		var n = min && max ? fake.random(min,max) : min ? min : 1,res=[];
		while(n){
			res.push(fake.fromArray(fake.vars.days));
			n--;
		}
		return res.join(' ');
	}

	fake.word = function(start,end){
		return end ? lorem('w'+fake.random(start,end)) : lorem('w'+start)
	}

	fake.paragraph = function(start,end){
		return end ? lorem('p'+fake.random(start,end)) : lorem('p'+start)
	}

	fake.sentence = function(start,end){
		return end ? lorem('s'+fake.random(start,end)) : lorem('s'+start)
	}

	fake.digit = function(start,end){
		var n = (start && end) ? fake.random(start,end) : start ? start : fake.random(0,9)
		,	res='';
		while(n){
			res+=fake.random(0,9);
			n--;
		}
		return res;
	}

	fake.number = function(min,max,padded){
		var n = fake.random(min,max);
		return fake.pad(n,padded);
	}

	fake.createArray = function(func,from,to,vars){
		var t = [], i = 0, l = random(min,max),fn;
		for(i;i<l;i++){
			fn = isArr(func) ? fake.fromArray(func) : func;
			t.push(fn(vars));
		}
		return t;
	}

	fake.fromArray = function(arr){
		return arr[fake.random(0,arr.length-1)];
	}

	fake.weighted = function(obj){
		var n, i = 0, res=[];
		for(n in obj){
			for(i=0;i<obj[n];i++){
				res.push(n);
			}
		}
		return fake.fromArray(res);
	}

	fake.date = function(start,end,format){
		if(!arguments.length){end = date(); start = new Date(1970,1,1);}
		else if(arguments.length<2){end = new Date();}
		start = moment(start).valueOf()
		end = moment(end).valueOf();
		var m = moment(fake.random(start,end));
		if(format){return moment.format(format);}
		return moment;
	}

	fake.random.boolean = function(){
		return fake.chance(50) ? true : false;
	}

	fake.pad = function(number,width){
		width -= number.toString().length;
		if(width>0){
			return new Array( width + (/\./.test(number) ? 2 : 1) ).join( '0' ) + number;
		}
		return number + "";
	}

	var proportional = function(dimension){
		return Math.floor(dimension * 1.6);
	}

	fake.image = function(width,height,max){
		var orientation = (!arguments.length) ? fake.fromArray(['portrait','landscape']) : false
		,	alt = lorem('w2');
		if(orientation || typeof width == 'string'){
			orientation = width.toLowerCase();
			if(orientation='portrait' || orientation=='p'){
				width = max ? fake.random(height,max) : height ? height : fake.random(fake.vars.minImageSize,fake.vars.maxImageSize);
				height = null;
			}
			else{
				height = max ? fake.random(height,max) : height ? height : fake.random(fake.vars.minImageSize,fake.vars.maxImageSize);
				width = null;
			}
		}
		if(width && !height){height = proportional(width);}
		else if(height && !width){width = proportional(height);}
		else if(!height && !width){
			height = fake.random(fake.vars.minImageSize,fake.vars.maxImageSize);
			width = proportional(height);
		}
		return {
			width:width
		,	height:height
		,	src:'http://placehold.it/'+width+'/'+height
		,	alt:alt
		,	html:'<img src="http://placehold.it/'+width+'/'+height+'" alt="'+alt+'" width="'+width+'" height="'+height+'"/>'
		}
	}

	fake.portrait = function(width,max){
		return fake.image('portrait',width,max);
	}

	fake.landscape = function(height){
		return fake.image('landscape',height,max);
	}

	fake.format = function(str){
		var f = fake.vars.formats;
		for(var n in f){
			str = str.replace(f[n].reg,f[n].fn);
		}
		return str;
	}

	fake.lorem = lorem;
	fake.moment = moment;

	return fake;
});