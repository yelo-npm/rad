RAD
====

Prototyping utilities

RAD is a little utility to quickly build prototypes without worrying about having content.
It contains a set of functions that output random strings and numbers

## Installation

	var rad = require('rad')
	//node
	define(['rad/index'],function(rad){})
	//require.js

## Basic Functions

### Random

	rad.random(min,max)

returns a whole number between min and max

	rand.chance([percent=10])

produces a boolean that is true 'percent' times out of 100. Defaults to 10
(which means using rand.chance() yields 'true' one time out of ten)

	rand.boolean()

is a shortcut to rand.chance(50)

	rand.fromArray(array)

returns a random item from an array

### Data

	rad.letter() //returns 'a' or 'b' or 'c'...
	rad.character() //returns the above, but also '%', '$', etc
	rad.word() //returns, for example, 'lorem'
	rad.sentence() //returns, for example, 'lorem ipsum dolores amet'
	rad.paragraph //returns an html-formated paragraph
	rad.month() //returns 'January', 'February'
	rad.day() //returns 'Monday', 'Tuesday'
	rad.digit() //returns 0,1,2,3

All these functions take the same signature:

	fn(number)
	//or
	fn(min,max)

for example, 

	rad.letter(1)

could produce 'a'

	rad.letter(2,4)

could produce 'gof' (a string of letters between 2 and 4)

	rad.number([min[,max[,padded]]])

is the only one who has a third parameter; that parameter allows you to pad the number with zeros

## Advanced Datatypes

### Date

	rad.date([startDate,[endDate],[format]])

returns a date between start date and end date
  If you don't specify an end date, end defaults to now;
  If you don't specify anything at all, it will select random date between unix epoch (1/1/1970) and now.
  (If you are looking to create a specific date, use the moment() object that is exposed, see below)
  If you specify both dates, you can specify a format. To know how to use format, follow the moment.js doc here: http://momentjs.com/docs/#/displaying/format/

### Image

  	rad.image()
  	//or
 	rad.image('portrait',[width,[max]])
 	//or
 	rad.image('landscape',[height,[max]])
 	//or
 	rad.image(width)
 	//or
 	rad.image(0,height)
 	//or
 	rad.image(width,height)

 will produce an image object (using placeholder.it). If you specify an orientation ('portrait' or 'landscape') and a max value, then the dimensions get randomized up to max.
   if you specify only one dimension (either because you're specifying the orientation or just setting one dimension), the remaining dimension will always be calculated according to golden ratio (1.6180) then floored.
   The returned object is as follow:

 	image = {
 			width:width
		,	height:height
		,	src:'http://placehold.it/'+width+'/'+height
		,	alt:'random two words'
		,	html:'<img src="http://placehold.it/'+width+'/'+height+'" alt="'+alt+'" width="'+width+'" height="'+height+'"/>'
 	}

note: you can use 'p' and 'l' instead of 'portrait' and 'landscape'

two shortcuts for orientation exist:

	rad.portrait([width,[max]])
	rad.landscape([height,[max]])

## Format

	rad.format()

formats a string. Available keys are:
	
	%w word
	%l letter
	%c character
	%d digit
	%s sentence
	%p paragraph
	%m month
	%D day

each key can take an optional number; '%s3' would produce three sentences. Example:

	rad.format('On %D %d2 of %m, user %w said:"%s"')
	//On Thursday 63 of May, user aliquip said:"Accusamus eu assumenda et distinctio officia nisi in."

	rad.format('"%c" and "%c" are each 1 character long, whereas "%l4" is four characters long')
	//"q" and "3" are each 1 character long, whereas "gdrn" is four characters long

## Utilities

### Weighted random

	rand.weighted(obj)

returns a random key from an object that has weight. Given the object:

	{
		cats:8
	,	dog:2
	}

'cats' has 4 times as much chances to be selected. Your weights don't have to add up to ten or a hundred or anything

### Array of random items

	rand.createArray(function|array of functions,from,to[,vars])

creates an array of random size between 'from' and 'to' and fills it with the results of 'function'
  if you pass in an array of functions, it will select one randomly on each pass
  the 'vars', if provided, are passed to the functions

## Exposed Properties

### Options

you can change the alphabet, the months name's, etc, on the

	rad.vars

object. Check the source.

### Helpers
	
RAD exposes it's two helpers

	rad.moment()

returns a moment.js object. Learn to use it at http://momentjs.com/docs

	rad.lorem()

is a shortcut to the lorem.ipsum() found in https://github.com/shyiko/lorem/

# Tests

Since it's all random, there is always a slight margin in which tests might fail, so try running them again