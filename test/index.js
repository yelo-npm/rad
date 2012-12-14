var expect = require('chai').expect
,	rad = require('../index')
;

var monthsArr = 'January February March April May June July August September October December'.split(' ');
var daysArr = 'Monday Tuesday Wednesday Thursday Friday Satruday Sunday'.split(' ');

var run = function(fn){
	var n=1000, res=[];
	while(n){
		res.push(fn());
		n--;
	}
	return res;
}

describe('RAD',function(){

	describe('#random',function(){
		it('should give a random number between the two given numbers',function(){
			var x=0,y=100,n=100,u;
			while(n){
				u = rad.random(x,y);
				expect(u).to.be.at.least(x).and.to.be.at.most(y);
				x++;y++;
				n--;
			}
		})
	})

	describe('#chance',function(){
		it('should be true roughly according to the passed percent',function(){
			var res = 0;
			run(function(){
				res+= rad.chance(30) ? 1: 0;
			});
			expect(res/10).to.be.closeTo(30,5);
			res = 0;
			run(function(){
				res+= rad.chance(10) ? 1: 0;
			});
			expect(res/10).to.be.closeTo(10,5);
			res = 0;
			run(function(){
				res+= rad.chance(1) ? 1: 0;
			});
			expect(res/10).to.be.closeTo(1,5);
		})
	})

	describe('basic types',function(){
		it('should return the types asked for, in the length asked for',function(){
			var letter = rad.letter(100);
			var character = rad.character(100);
			var digit = rad.digit(100);
			var months = rad.month(100);
			var days = rad.day(100);
			var words = rad.word(100);
			var sentences = rad.sentence(100);
			var paragraphs = rad.paragraph(100);

			expect(letter).to.match(/\w{100}/)
			expect(character).to.match(/.{100}/)
			expect(digit).to.match(/[0-9]{100}/)
			expect(months).to.match(new RegExp('['+monthsArr.join('|')+' ]{99}['+monthsArr.join('|')+']'))
			expect(days).to.match(new RegExp('['+daysArr.join('|')+' ]{99}['+daysArr.join('|')+']'))
			expect(words).to.match(/(\w*?\s){99}\w*$/)
			expect(sentences).to.match(/([\w\s].*?\.){100}/)
			expect(paragraphs.split('<p>')).to.have.length(101);
		})
	})

});