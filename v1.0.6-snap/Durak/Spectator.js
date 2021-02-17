// -- (function(scope){
// -- 'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.bw.az === region.bT.az)
	{
		return 'on line ' + region.bw.az;
	}
	return 'on lines ' + region.bw.az + ' through ' + region.bT.az;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.dQ,
		impl.eI,
		impl.eu,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


/*
function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}

*/

/*
function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}

*/

/*
function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}

*/

/*
function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}

*/



// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		ac: func(record.ac),
		bx: record.bx,
		bp: record.bp
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.ac;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.bx;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.bp) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.dQ,
		impl.eI,
		impl.eu,
		function(sendToApp, initialModel) {
			var view = impl.eN;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.dQ,
		impl.eI,
		impl.eu,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.bv && impl.bv(sendToApp)
			var view = impl.eN;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.da);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.ey) && (_VirtualDom_doc.title = title = doc.ey);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.ed;
	var onUrlRequest = impl.ee;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		bv: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.cI === next.cI
							&& curr.b0 === next.b0
							&& curr.cF.a === next.cF.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		dQ: function(flags)
		{
			return A3(impl.dQ, flags, _Browser_getUrl(), key);
		},
		eN: impl.eN,
		eI: impl.eI,
		eu: impl.eu
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { dM: 'hidden', de: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { dM: 'mozHidden', de: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { dM: 'msHidden', de: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { dM: 'webkitHidden', de: 'webkitvisibilitychange' }
		: { dM: 'hidden', de: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		cQ: _Browser_getScene(),
		c$: {
			bE: _Browser_window.pageXOffset,
			bF: _Browser_window.pageYOffset,
			c1: _Browser_doc.documentElement.clientWidth,
			b$: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		c1: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		b$: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			cQ: {
				c1: node.scrollWidth,
				b$: node.scrollHeight
			},
			c$: {
				bE: node.scrollLeft,
				bF: node.scrollTop,
				c1: node.clientWidth,
				b$: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			cQ: _Browser_getScene(),
			c$: {
				bE: x,
				bF: y,
				c1: _Browser_doc.documentElement.clientWidth,
				b$: _Browser_doc.documentElement.clientHeight
			},
			dv: {
				bE: x + rect.left,
				bF: y + rect.top,
				c1: rect.width,
				b$: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


var _WebGL_guid = 0;

function _WebGL_listEach(fn, list) {
  for (; list.b; list = list.b) {
    fn(list.a);
  }
}

function _WebGL_listLength(list) {
  var length = 0;
  for (; list.b; list = list.b) {
    length++;
  }
  return length;
}

var _WebGL_rAF = typeof requestAnimationFrame !== 'undefined' ?
  requestAnimationFrame :
  function (cb) { setTimeout(cb, 1000 / 60); };

// eslint-disable-next-line no-unused-vars
var _WebGL_entity = F5(function (settings, vert, frag, mesh, uniforms) {
  return {
    $: 0,
    a: settings,
    b: vert,
    c: frag,
    d: mesh,
    e: uniforms
  };
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableBlend = F2(function (cache, setting) {
  var blend = cache.blend;
  blend.toggle = cache.toggle;

  if (!blend.enabled) {
    cache.gl.enable(cache.gl.BLEND);
    blend.enabled = true;
  }

  // a   b   c   d   e   f   g h i j
  // eq1 f11 f12 eq2 f21 f22 r g b a
  if (blend.a !== setting.a || blend.d !== setting.d) {
    cache.gl.blendEquationSeparate(setting.a, setting.d);
    blend.a = setting.a;
    blend.d = setting.d;
  }
  if (blend.b !== setting.b || blend.c !== setting.c || blend.e !== setting.e || blend.f !== setting.f) {
    cache.gl.blendFuncSeparate(setting.b, setting.c, setting.e, setting.f);
    blend.b = setting.b;
    blend.c = setting.c;
    blend.e = setting.e;
    blend.f = setting.f;
  }
  if (blend.g !== setting.g || blend.h !== setting.h || blend.i !== setting.i || blend.j !== setting.j) {
    cache.gl.blendColor(setting.g, setting.h, setting.i, setting.j);
    blend.g = setting.g;
    blend.h = setting.h;
    blend.i = setting.i;
    blend.j = setting.j;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepthTest = F2(function (cache, setting) {
  var depthTest = cache.depthTest;
  depthTest.toggle = cache.toggle;

  if (!depthTest.enabled) {
    cache.gl.enable(cache.gl.DEPTH_TEST);
    depthTest.enabled = true;
  }

  // a    b    c    d
  // func mask near far
  if (depthTest.a !== setting.a) {
    cache.gl.depthFunc(setting.a);
    depthTest.a = setting.a;
  }
  if (depthTest.b !== setting.b) {
    cache.gl.depthMask(setting.b);
    depthTest.b = setting.b;
  }
  if (depthTest.c !== setting.c || depthTest.d !== setting.d) {
    cache.gl.depthRange(setting.c, setting.d);
    depthTest.c = setting.c;
    depthTest.d = setting.d;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencilTest = F2(function (cache, setting) {
  var stencilTest = cache.stencilTest;
  stencilTest.toggle = cache.toggle;

  if (!stencilTest.enabled) {
    cache.gl.enable(cache.gl.STENCIL_TEST);
    stencilTest.enabled = true;
  }

  // a   b    c         d     e     f      g      h     i     j      k
  // ref mask writeMask test1 fail1 zfail1 zpass1 test2 fail2 zfail2 zpass2
  if (stencilTest.d !== setting.d || stencilTest.a !== setting.a || stencilTest.b !== setting.b) {
    cache.gl.stencilFuncSeparate(cache.gl.FRONT, setting.d, setting.a, setting.b);
    stencilTest.d = setting.d;
    // a and b are set in the cache.gl.BACK diffing because they should be the same
  }
  if (stencilTest.e !== setting.e || stencilTest.f !== setting.f || stencilTest.g !== setting.g) {
    cache.gl.stencilOpSeparate(cache.gl.FRONT, setting.e, setting.f, setting.g);
    stencilTest.e = setting.e;
    stencilTest.f = setting.f;
    stencilTest.g = setting.g;
  }
  if (stencilTest.c !== setting.c) {
    cache.gl.stencilMask(setting.c);
    stencilTest.c = setting.c;
  }
  if (stencilTest.h !== setting.h || stencilTest.a !== setting.a || stencilTest.b !== setting.b) {
    cache.gl.stencilFuncSeparate(cache.gl.BACK, setting.h, setting.a, setting.b);
    stencilTest.h = setting.h;
    stencilTest.a = setting.a;
    stencilTest.b = setting.b;
  }
  if (stencilTest.i !== setting.i || stencilTest.j !== setting.j || stencilTest.k !== setting.k) {
    cache.gl.stencilOpSeparate(cache.gl.BACK, setting.i, setting.j, setting.k);
    stencilTest.i = setting.i;
    stencilTest.j = setting.j;
    stencilTest.k = setting.k;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableScissor = F2(function (cache, setting) {
  var scissor = cache.scissor;
  scissor.toggle = cache.toggle;

  if (!scissor.enabled) {
    cache.gl.enable(cache.gl.SCISSOR_TEST);
    scissor.enabled = true;
  }

  if (scissor.a !== setting.a || scissor.b !== setting.b || scissor.c !== setting.c || scissor.d !== setting.d) {
    cache.gl.scissor(setting.a, setting.b, setting.c, setting.d);
    scissor.a = setting.a;
    scissor.b = setting.b;
    scissor.c = setting.c;
    scissor.d = setting.d;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableColorMask = F2(function (cache, setting) {
  var colorMask = cache.colorMask;
  colorMask.toggle = cache.toggle;
  colorMask.enabled = true;

  if (colorMask.a !== setting.a || colorMask.b !== setting.b || colorMask.c !== setting.c || colorMask.d !== setting.d) {
    cache.gl.colorMask(setting.a, setting.b, setting.c, setting.d);
    colorMask.a = setting.a;
    colorMask.b = setting.b;
    colorMask.c = setting.c;
    colorMask.d = setting.d;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableCullFace = F2(function (cache, setting) {
  var cullFace = cache.cullFace;
  cullFace.toggle = cache.toggle;

  if (!cullFace.enabled) {
    cache.gl.enable(cache.gl.CULL_FACE);
    cullFace.enabled = true;
  }

  if (cullFace.a !== setting.a) {
    cache.gl.cullFace(setting.a);
    cullFace.a = setting.a;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePolygonOffset = F2(function (cache, setting) {
  var polygonOffset = cache.polygonOffset;
  polygonOffset.toggle = cache.toggle;

  if (!polygonOffset.enabled) {
    cache.gl.enable(cache.gl.POLYGON_OFFSET_FILL);
    polygonOffset.enabled = true;
  }

  if (polygonOffset.a !== setting.a || polygonOffset.b !== setting.b) {
    cache.gl.polygonOffset(setting.a, setting.b);
    polygonOffset.a = setting.a;
    polygonOffset.b = setting.b;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleCoverage = F2(function (cache, setting) {
  var sampleCoverage = cache.sampleCoverage;
  sampleCoverage.toggle = cache.toggle;

  if (!sampleCoverage.enabled) {
    cache.gl.enable(cache.gl.SAMPLE_COVERAGE);
    sampleCoverage.enabled = true;
  }

  if (sampleCoverage.a !== setting.a || sampleCoverage.b !== setting.b) {
    cache.gl.sampleCoverage(setting.a, setting.b);
    sampleCoverage.a = setting.a;
    sampleCoverage.b = setting.b;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleAlphaToCoverage = function (cache) {
  var sampleAlphaToCoverage = cache.sampleAlphaToCoverage;
  sampleAlphaToCoverage.toggle = cache.toggle;

  if (!sampleAlphaToCoverage.enabled) {
    cache.gl.enable(cache.gl.SAMPLE_ALPHA_TO_COVERAGE);
    sampleAlphaToCoverage.enabled = true;
  }
};

var _WebGL_disableBlend = function (cache) {
  if (cache.blend.enabled) {
    cache.gl.disable(cache.gl.BLEND);
    cache.blend.enabled = false;
  }
};

var _WebGL_disableDepthTest = function (cache) {
  if (cache.depthTest.enabled) {
    cache.gl.disable(cache.gl.DEPTH_TEST);
    cache.depthTest.enabled = false;
  }
};

var _WebGL_disableStencilTest = function (cache) {
  if (cache.stencilTest.enabled) {
    cache.gl.disable(cache.gl.STENCIL_TEST);
    cache.stencilTest.enabled = false;
  }
};

var _WebGL_disableScissor = function (cache) {
  if (cache.scissor.enabled) {
    cache.gl.disable(cache.gl.SCISSOR_TEST);
    cache.scissor.enabled = false;
  }
};

var _WebGL_disableColorMask = function (cache) {
  var colorMask = cache.colorMask;
  if (!colorMask.a || !colorMask.b || !colorMask.c || !colorMask.d) {
    cache.gl.colorMask(true, true, true, true);
    colorMask.a = true;
    colorMask.b = true;
    colorMask.c = true;
    colorMask.d = true;
  }
};

var _WebGL_disableCullFace = function (cache) {
  cache.gl.disable(cache.gl.CULL_FACE);
};

var _WebGL_disablePolygonOffset = function (cache) {
  cache.gl.disable(cache.gl.POLYGON_OFFSET_FILL);
};

var _WebGL_disableSampleCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_COVERAGE);
};

var _WebGL_disableSampleAlphaToCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_ALPHA_TO_COVERAGE);
};

var _WebGL_settings = ['blend', 'depthTest', 'stencilTest', 'scissor', 'colorMask', 'cullFace', 'polygonOffset', 'sampleCoverage', 'sampleAlphaToCoverage'];
var _WebGL_disableFunctions = [_WebGL_disableBlend, _WebGL_disableDepthTest, _WebGL_disableStencilTest, _WebGL_disableScissor, _WebGL_disableColorMask, _WebGL_disableCullFace, _WebGL_disablePolygonOffset, _WebGL_disableSampleCoverage, _WebGL_disableSampleAlphaToCoverage];

function _WebGL_doCompile(gl, src, type) {
  var shader = gl.createShader(type);
  // Enable OES_standard_derivatives extension
  gl.shaderSource(shader, '#extension GL_OES_standard_derivatives : enable\n' + src);
  gl.compileShader(shader);
  return shader;
}

function _WebGL_doLink(gl, vshader, fshader) {
  var program = gl.createProgram();

  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw ('Link failed: ' + gl.getProgramInfoLog(program) +
      '\nvs info-log: ' + gl.getShaderInfoLog(vshader) +
      '\nfs info-log: ' + gl.getShaderInfoLog(fshader));
  }

  return program;
}

function _WebGL_getAttributeInfo(gl, type) {
  switch (type) {
    case gl.FLOAT:
      return { size: 1, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC2:
      return { size: 2, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC3:
      return { size: 3, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC4:
      return { size: 4, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_MAT4:
      return { size: 4, arraySize: 4, type: Float32Array, baseType: gl.FLOAT };
    case gl.INT:
      return { size: 1, arraySize: 1, type: Int32Array, baseType: gl.INT };
  }
}

/**
 *  Form the buffer for a given attribute.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {WebGLActiveInfo} attribute the attribute to bind to.
 *         We use its name to grab the record by name and also to know
 *         how many elements we need to grab.
 *  @param {Mesh} mesh The mesh coming in from Elm.
 *  @param {Object} attributes The mapping between the attribute names and Elm fields
 *  @return {WebGLBuffer}
 */
function _WebGL_doBindAttribute(gl, attribute, mesh, attributes) {
  // The length of the number of vertices that
  // complete one 'thing' based on the drawing mode.
  // ie, 2 for Lines, 3 for Triangles, etc.
  var elemSize = mesh.a.bS;

  var idxKeys = [];
  for (var i = 0; i < elemSize; i++) {
    idxKeys.push(String.fromCharCode(97 + i));
  }

  function dataFill(data, cnt, fillOffset, elem, key) {
    var i;
    if (elemSize === 1) {
      for (i = 0; i < cnt; i++) {
        data[fillOffset++] = cnt === 1 ? elem[key] : elem[key][i];
      }
    } else {
      idxKeys.forEach(function (idx) {
        for (i = 0; i < cnt; i++) {
          data[fillOffset++] = cnt === 1 ? elem[idx][key] : elem[idx][key][i];
        }
      });
    }
  }

  var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);

  if (attributeInfo === undefined) {
    throw new Error('No info available for: ' + attribute.type);
  }

  var dataIdx = 0;
  var dataOffset = attributeInfo.size * attributeInfo.arraySize * elemSize;
  var array = new attributeInfo.type(_WebGL_listLength(mesh.b) * dataOffset);

  _WebGL_listEach(function (elem) {
    dataFill(array, attributeInfo.size * attributeInfo.arraySize, dataIdx, elem, attributes[attribute.name] || attribute.name);
    dataIdx += dataOffset;
  }, mesh.b);

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
  return buffer;
}

/**
 *  This sets up the binding caching buffers.
 *
 *  We don't actually bind any buffers now except for the indices buffer.
 *  The problem with filling the buffers here is that it is possible to
 *  have a buffer shared between two webgl shaders;
 *  which could have different active attributes. If we bind it here against
 *  a particular program, we might not bind them all. That final bind is now
 *  done right before drawing.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {Mesh} mesh a mesh object from Elm
 *  @return {Object} buffer - an object with the following properties
 *  @return {Number} buffer.numIndices
 *  @return {WebGLBuffer|null} buffer.indexBuffer - optional index buffer
 *  @return {Object} buffer.buffers - will be used to buffer attributes
 */
function _WebGL_doBindSetup(gl, mesh) {
  if (mesh.a.b5 > 0) {
    var indexBuffer = gl.createBuffer();
    var indices = _WebGL_makeIndexedBuffer(mesh.c, mesh.a.b5);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return {
      numIndices: indices.length,
      indexBuffer: indexBuffer,
      buffers: {}
    };
  } else {
    return {
      numIndices: mesh.a.bS * _WebGL_listLength(mesh.b),
      indexBuffer: null,
      buffers: {}
    };
  }
}

/**
 *  Create an indices array and fill it from indices
 *  based on the size of the index
 *
 *  @param {List} indicesList the list of indices
 *  @param {Number} indexSize the size of the index
 *  @return {Uint16Array} indices
 */
function _WebGL_makeIndexedBuffer(indicesList, indexSize) {
  var indices = new Uint16Array(_WebGL_listLength(indicesList) * indexSize);
  var fillOffset = 0;
  var i;
  _WebGL_listEach(function (elem) {
    if (indexSize === 1) {
      indices[fillOffset++] = elem;
    } else {
      for (i = 0; i < indexSize; i++) {
        indices[fillOffset++] = elem[String.fromCharCode(97 + i)];
      }
    }
  }, indicesList);
  return indices;
}

function _WebGL_getProgID(vertID, fragID) {
  return vertID + '#' + fragID;
}

var _WebGL_drawGL = F2(function (model, domNode) {
  var cache = model.f;
  var gl = cache.gl;

  if (!gl) {
    return domNode;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  if (!cache.depthTest.b) {
    gl.depthMask(true);
    cache.depthTest.b = true;
  }
  if (cache.stencilTest.c !== cache.STENCIL_WRITEMASK) {
    gl.stencilMask(cache.STENCIL_WRITEMASK);
    cache.stencilTest.c = cache.STENCIL_WRITEMASK;
  }
  _WebGL_disableScissor(cache);
  _WebGL_disableColorMask(cache);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

  function drawEntity(entity) {
    if (!entity.d.b.b) {
      return; // Empty list
    }

    var progid;
    var program;
    var i;

    if (entity.b.id && entity.c.id) {
      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      program = cache.programs[progid];
    }

    if (!program) {

      var vshader;
      if (entity.b.id) {
        vshader = cache.shaders[entity.b.id];
      } else {
        entity.b.id = _WebGL_guid++;
      }

      if (!vshader) {
        vshader = _WebGL_doCompile(gl, entity.b.src, gl.VERTEX_SHADER);
        cache.shaders[entity.b.id] = vshader;
      }

      var fshader;
      if (entity.c.id) {
        fshader = cache.shaders[entity.c.id];
      } else {
        entity.c.id = _WebGL_guid++;
      }

      if (!fshader) {
        fshader = _WebGL_doCompile(gl, entity.c.src, gl.FRAGMENT_SHADER);
        cache.shaders[entity.c.id] = fshader;
      }

      var glProgram = _WebGL_doLink(gl, vshader, fshader);

      program = {
        glProgram: glProgram,
        attributes: Object.assign({}, entity.b.attributes, entity.c.attributes),
        currentUniforms: {},
        activeAttributes: [],
        activeAttributeLocations: []
      };

      program.uniformSetters = _WebGL_createUniformSetters(
        gl,
        model,
        program,
        Object.assign({}, entity.b.uniforms, entity.c.uniforms)
      );

      var numActiveAttributes = gl.getProgramParameter(glProgram, gl.ACTIVE_ATTRIBUTES);
      for (i = 0; i < numActiveAttributes; i++) {
        var attribute = gl.getActiveAttrib(glProgram, i);
        var attribLocation = gl.getAttribLocation(glProgram, attribute.name);
        program.activeAttributes.push(attribute);
        program.activeAttributeLocations.push(attribLocation);
      }

      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      cache.programs[progid] = program;
    }

    if (cache.lastProgId !== progid) {
      gl.useProgram(program.glProgram);
      cache.lastProgId = progid;
    }

    _WebGL_setUniforms(program.uniformSetters, entity.e);

    var buffer = cache.buffers.get(entity.d);

    if (!buffer) {
      buffer = _WebGL_doBindSetup(gl, entity.d);
      cache.buffers.set(entity.d, buffer);
    }

    for (i = 0; i < program.activeAttributes.length; i++) {
      attribute = program.activeAttributes[i];
      attribLocation = program.activeAttributeLocations[i];

      if (buffer.buffers[attribute.name] === undefined) {
        buffer.buffers[attribute.name] = _WebGL_doBindAttribute(gl, attribute, entity.d, program.attributes);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffers[attribute.name]);

      var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);
      if (attributeInfo.arraySize === 1) {
        gl.enableVertexAttribArray(attribLocation);
        gl.vertexAttribPointer(attribLocation, attributeInfo.size, attributeInfo.baseType, false, 0, 0);
      } else {
        // Point to four vec4 in case of mat4
        var offset = attributeInfo.size * 4; // float32 takes 4 bytes
        var stride = offset * attributeInfo.arraySize;
        for (var m = 0; m < attributeInfo.arraySize; m++) {
          gl.enableVertexAttribArray(attribLocation + m);
          gl.vertexAttribPointer(attribLocation + m, attributeInfo.size, attributeInfo.baseType, false, stride, offset * m);
        }
      }
    }

    // Apply all the new settings
    cache.toggle = !cache.toggle;
    _WebGL_listEach($elm_explorations$webgl$WebGL$Internal$enableSetting(cache), entity.a);
    // Disable the settings that were applied in the previous draw call
    for (i = 0; i < _WebGL_settings.length; i++) {
      var setting = cache[_WebGL_settings[i]];
      if (setting.toggle !== cache.toggle && setting.enabled) {
        _WebGL_disableFunctions[i](cache);
        setting.enabled = false;
        setting.toggle = cache.toggle;
      }
    }

    if (buffer.indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indexBuffer);
      gl.drawElements(entity.d.a.cu, buffer.numIndices, gl.UNSIGNED_SHORT, 0);
    } else {
      gl.drawArrays(entity.d.a.cu, 0, buffer.numIndices);
    }
  }

  _WebGL_listEach(drawEntity, model.g);
  return domNode;
});

function _WebGL_createUniformSetters(gl, model, program, uniformsMap) {
  var glProgram = program.glProgram;
  var currentUniforms = program.currentUniforms;
  var textureCounter = 0;
  var cache = model.f;
  function createUniformSetter(glProgram, uniform) {
    var uniformName = uniform.name;
    var uniformLocation = gl.getUniformLocation(glProgram, uniformName);
    switch (uniform.type) {
      case gl.INT:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform1i(uniformLocation, value);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform1f(uniformLocation, value);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_VEC2:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform2f(uniformLocation, value[0], value[1]);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_VEC3:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform3f(uniformLocation, value[0], value[1], value[2]);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_VEC4:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform4f(uniformLocation, value[0], value[1], value[2], value[3]);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_MAT4:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniformMatrix4fv(uniformLocation, false, new Float32Array(value));
            currentUniforms[uniformName] = value;
          }
        };
      case gl.SAMPLER_2D:
        var currentTexture = textureCounter++;
        return function (texture) {
          gl.activeTexture(gl.TEXTURE0 + currentTexture);
          var tex = cache.textures.get(texture);
          if (!tex) {
            tex = texture.dl(gl);
            cache.textures.set(texture, tex);
          }
          gl.bindTexture(gl.TEXTURE_2D, tex);
          if (currentUniforms[uniformName] !== texture) {
            gl.uniform1i(uniformLocation, currentTexture);
            currentUniforms[uniformName] = texture;
          }
        };
      case gl.BOOL:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform1i(uniformLocation, value);
            currentUniforms[uniformName] = value;
          }
        };
      default:
        return function () { };
    }
  }

  var uniformSetters = {};
  var numUniforms = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORMS);
  for (var i = 0; i < numUniforms; i++) {
    var uniform = gl.getActiveUniform(glProgram, i);
    uniformSetters[uniformsMap[uniform.name] || uniform.name] = createUniformSetter(glProgram, uniform);
  }

  return uniformSetters;
}

function _WebGL_setUniforms(setters, values) {
  Object.keys(values).forEach(function (name) {
    var setter = setters[name];
    if (setter) {
      setter(values[name]);
    }
  });
}

// VIRTUAL-DOM WIDGET

// eslint-disable-next-line no-unused-vars
var _WebGL_toHtml = F3(function (options, factList, entities) {
  return _VirtualDom_custom(
    factList,
    {
      g: entities,
      f: {},
      h: options
    },
    _WebGL_render,
    _WebGL_diff
  );
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAlpha = F2(function (options, option) {
  options.contextAttributes.alpha = true;
  options.contextAttributes.premultipliedAlpha = option.a;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepth = F2(function (options, option) {
  options.contextAttributes.depth = true;
  options.sceneSettings.push(function (gl) {
    gl.clearDepth(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencil = F2(function (options, option) {
  options.contextAttributes.stencil = true;
  options.sceneSettings.push(function (gl) {
    gl.clearStencil(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAntialias = F2(function (options, option) {
  options.contextAttributes.antialias = true;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableClearColor = F2(function (options, option) {
  options.sceneSettings.push(function (gl) {
    gl.clearColor(option.a, option.b, option.c, option.d);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePreserveDrawingBuffer = F2(function (options, option) {
  options.contextAttributes.preserveDrawingBuffer = true;
});

/**
 *  Creates canvas and schedules initial _WebGL_drawGL
 *  @param {Object} model
 *  @param {Object} model.f that may contain the following properties:
           gl, shaders, programs, buffers, textures
 *  @param {List<Option>} model.h list of options coming from Elm
 *  @param {List<Entity>} model.g list of entities coming from Elm
 *  @return {HTMLElement} <canvas> if WebGL is supported, otherwise a <div>
 */
function _WebGL_render(model) {
  var options = {
    contextAttributes: {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    },
    sceneSettings: []
  };

  _WebGL_listEach(function (option) {
    return A2($elm_explorations$webgl$WebGL$Internal$enableOption, options, option);
  }, model.h);

  var canvas = _VirtualDom_doc.createElement('canvas');
  var gl = canvas.getContext && (
    canvas.getContext('webgl', options.contextAttributes) ||
    canvas.getContext('experimental-webgl', options.contextAttributes)
  );

  if (gl && typeof WeakMap !== 'undefined') {
    options.sceneSettings.forEach(function (sceneSetting) {
      sceneSetting(gl);
    });

    // Activate OES_standard_derivatives extension
    gl.getExtension('OES_standard_derivatives');

    model.f.gl = gl;

    // Cache the current settings in order to diff them to avoid redundant calls
    // https://emscripten.org/docs/optimizing/Optimizing-WebGL.html#avoid-redundant-calls
    model.f.toggle = false; // used to diff the settings from the previous and current draw calls
    model.f.blend = { enabled: false, toggle: false };
    model.f.depthTest = { enabled: false, toggle: false };
    model.f.stencilTest = { enabled: false, toggle: false };
    model.f.scissor = { enabled: false, toggle: false };
    model.f.colorMask = { enabled: false, toggle: false };
    model.f.cullFace = { enabled: false, toggle: false };
    model.f.polygonOffset = { enabled: false, toggle: false };
    model.f.sampleCoverage = { enabled: false, toggle: false };
    model.f.sampleAlphaToCoverage = { enabled: false, toggle: false };

    model.f.shaders = [];
    model.f.programs = {};
    model.f.lastProgId = null;
    model.f.buffers = new WeakMap();
    model.f.textures = new WeakMap();
    // Memorize the initial stencil write mask, because
    // browsers may have different number of stencil bits
    model.f.STENCIL_WRITEMASK = gl.getParameter(gl.STENCIL_WRITEMASK);

    // Render for the first time.
    // This has to be done in animation frame,
    // because the canvas is not in the DOM yet
    _WebGL_rAF(function () {
      return A2(_WebGL_drawGL, model, canvas);
    });

  } else {
    canvas = _VirtualDom_doc.createElement('div');
    canvas.innerHTML = '<a href="https://get.webgl.org/">Enable WebGL</a> to see this content!';
  }

  return canvas;
}

function _WebGL_diff(oldModel, newModel) {
  newModel.f = oldModel.f;
  return _WebGL_drawGL(newModel);
}


// eslint-disable-next-line no-unused-vars
var _Texture_load = F6(function (magnify, mininify, horizontalWrap, verticalWrap, flipY, url) {
  var isMipmap = mininify !== 9728 && mininify !== 9729;
  return _Scheduler_binding(function (callback) {
    var img = new Image();
    function createTexture(gl) {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magnify);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mininify);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, horizontalWrap);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, verticalWrap);
      if (isMipmap) {
        gl.generateMipmap(gl.TEXTURE_2D);
      }
      gl.bindTexture(gl.TEXTURE_2D, null);
      return texture;
    }
    img.onload = function () {
      var width = img.width;
      var height = img.height;
      var widthPowerOfTwo = (width & (width - 1)) === 0;
      var heightPowerOfTwo = (height & (height - 1)) === 0;
      var isSizeValid = (widthPowerOfTwo && heightPowerOfTwo) || (
        !isMipmap
        && horizontalWrap === 33071 // clamp to edge
        && verticalWrap === 33071
      );
      if (isSizeValid) {
        callback(_Scheduler_succeed({
          $: 0,
          dl: createTexture,
          a: width,
          b: height
        }));
      } else {
        callback(_Scheduler_fail(A2(
          $elm_explorations$webgl$WebGL$Texture$SizeError,
          width,
          height
        )));
      }
    };
    img.onerror = function () {
      callback(_Scheduler_fail($elm_explorations$webgl$WebGL$Texture$LoadError));
    };
    if (url.slice(0, 5) !== 'data:') {
      img.crossOrigin = 'Anonymous';
    }
    img.src = url;
  });
});

// eslint-disable-next-line no-unused-vars
var _Texture_size = function (texture) {
  return _Utils_Tuple2(texture.a, texture.b);
};


// BYTES

function _Bytes_width(bytes)
{
	return bytes.byteLength;
}

var _Bytes_getHostEndianness = F2(function(le, be)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(new Uint8Array(new Uint32Array([1]))[0] === 1 ? le : be));
	});
});


// ENCODERS

function _Bytes_encode(encoder)
{
	var mutableBytes = new DataView(new ArrayBuffer($elm$bytes$Bytes$Encode$getWidth(encoder)));
	$elm$bytes$Bytes$Encode$write(encoder)(mutableBytes)(0);
	return mutableBytes;
}


// SIGNED INTEGERS

var _Bytes_write_i8  = F3(function(mb, i, n) { mb.setInt8(i, n); return i + 1; });
var _Bytes_write_i16 = F4(function(mb, i, n, isLE) { mb.setInt16(i, n, isLE); return i + 2; });
var _Bytes_write_i32 = F4(function(mb, i, n, isLE) { mb.setInt32(i, n, isLE); return i + 4; });


// UNSIGNED INTEGERS

var _Bytes_write_u8  = F3(function(mb, i, n) { mb.setUint8(i, n); return i + 1 ;});
var _Bytes_write_u16 = F4(function(mb, i, n, isLE) { mb.setUint16(i, n, isLE); return i + 2; });
var _Bytes_write_u32 = F4(function(mb, i, n, isLE) { mb.setUint32(i, n, isLE); return i + 4; });


// FLOATS

var _Bytes_write_f32 = F4(function(mb, i, n, isLE) { mb.setFloat32(i, n, isLE); return i + 4; });
var _Bytes_write_f64 = F4(function(mb, i, n, isLE) { mb.setFloat64(i, n, isLE); return i + 8; });


// BYTES

var _Bytes_write_bytes = F3(function(mb, offset, bytes)
{
	for (var i = 0, len = bytes.byteLength, limit = len - 4; i <= limit; i += 4)
	{
		mb.setUint32(offset + i, bytes.getUint32(i));
	}
	for (; i < len; i++)
	{
		mb.setUint8(offset + i, bytes.getUint8(i));
	}
	return offset + len;
});


// STRINGS

function _Bytes_getStringWidth(string)
{
	for (var width = 0, i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		width +=
			(code < 0x80) ? 1 :
			(code < 0x800) ? 2 :
			(code < 0xD800 || 0xDBFF < code) ? 3 : (i++, 4);
	}
	return width;
}

var _Bytes_write_string = F3(function(mb, offset, string)
{
	for (var i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		offset +=
			(code < 0x80)
				? (mb.setUint8(offset, code)
				, 1
				)
				:
			(code < 0x800)
				? (mb.setUint16(offset, 0xC080 /* 0b1100000010000000 */
					| (code >>> 6 & 0x1F /* 0b00011111 */) << 8
					| code & 0x3F /* 0b00111111 */)
				, 2
				)
				:
			(code < 0xD800 || 0xDBFF < code)
				? (mb.setUint16(offset, 0xE080 /* 0b1110000010000000 */
					| (code >>> 12 & 0xF /* 0b00001111 */) << 8
					| code >>> 6 & 0x3F /* 0b00111111 */)
				, mb.setUint8(offset + 2, 0x80 /* 0b10000000 */
					| code & 0x3F /* 0b00111111 */)
				, 3
				)
				:
			(code = (code - 0xD800) * 0x400 + string.charCodeAt(++i) - 0xDC00 + 0x10000
			, mb.setUint32(offset, 0xF0808080 /* 0b11110000100000001000000010000000 */
				| (code >>> 18 & 0x7 /* 0b00000111 */) << 24
				| (code >>> 12 & 0x3F /* 0b00111111 */) << 16
				| (code >>> 6 & 0x3F /* 0b00111111 */) << 8
				| code & 0x3F /* 0b00111111 */)
			, 4
			);
	}
	return offset;
});


// DECODER

var _Bytes_decode = F2(function(decoder, bytes)
{
	try {
		return $elm$core$Maybe$Just(A2(decoder, bytes, 0).b);
	} catch(e) {
		return $elm$core$Maybe$Nothing;
	}
});

var _Bytes_read_i8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getInt8(offset)); });
var _Bytes_read_i16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getInt16(offset, isLE)); });
var _Bytes_read_i32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getInt32(offset, isLE)); });
var _Bytes_read_u8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getUint8(offset)); });
var _Bytes_read_u16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getUint16(offset, isLE)); });
var _Bytes_read_u32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getUint32(offset, isLE)); });
var _Bytes_read_f32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getFloat32(offset, isLE)); });
var _Bytes_read_f64 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 8, bytes.getFloat64(offset, isLE)); });

var _Bytes_read_bytes = F3(function(len, bytes, offset)
{
	return _Utils_Tuple2(offset + len, new DataView(bytes.buffer, bytes.byteOffset + offset, len));
});

var _Bytes_read_string = F3(function(len, bytes, offset)
{
	var string = '';
	var end = offset + len;
	for (; offset < end;)
	{
		var byte = bytes.getUint8(offset++);
		string +=
			(byte < 128)
				? String.fromCharCode(byte)
				:
			((byte & 0xE0 /* 0b11100000 */) === 0xC0 /* 0b11000000 */)
				? String.fromCharCode((byte & 0x1F /* 0b00011111 */) << 6 | bytes.getUint8(offset++) & 0x3F /* 0b00111111 */)
				:
			((byte & 0xF0 /* 0b11110000 */) === 0xE0 /* 0b11100000 */)
				? String.fromCharCode(
					(byte & 0xF /* 0b00001111 */) << 12
					| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
					| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
				)
				:
				(byte =
					((byte & 0x7 /* 0b00000111 */) << 18
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 12
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
						| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
					) - 0x10000
				, String.fromCharCode(Math.floor(byte / 0x400) + 0xD800, byte % 0x400 + 0xDC00)
				);
	}
	return _Utils_Tuple2(offset, string);
});

var _Bytes_decodeFailure = F2(function() { throw 0; });



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});


/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 * Copyright (c) 2013 John Mayer
 * Copyright (c) 2018 Andrey Kuzmin
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Vector2

var _MJS_v2 = F2(function(x, y) {
    return new Float64Array([x, y]);
});

var _MJS_v2getX = function(a) {
    return a[0];
};

var _MJS_v2getY = function(a) {
    return a[1];
};

var _MJS_v2setX = F2(function(x, a) {
    return new Float64Array([x, a[1]]);
});

var _MJS_v2setY = F2(function(y, a) {
    return new Float64Array([a[0], y]);
});

var _MJS_v2toRecord = function(a) {
    return { bE: a[0], bF: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.bE, r.bF]);
};

var _MJS_v2add = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    return r;
});

var _MJS_v2sub = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    return r;
});

var _MJS_v2negate = function(a) {
    var r = new Float64Array(2);
    r[0] = -a[0];
    r[1] = -a[1];
    return r;
};

var _MJS_v2direction = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    var im = 1.0 / _MJS_v2lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    return r;
});

function _MJS_v2lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}
var _MJS_v2length = _MJS_v2lengthLocal;

var _MJS_v2lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1];
};

var _MJS_v2distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
});

var _MJS_v2distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return dx * dx + dy * dy;
});

var _MJS_v2normalize = function(a) {
    var r = new Float64Array(2);
    var im = 1.0 / _MJS_v2lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    return r;
};

var _MJS_v2scale = F2(function(k, a) {
    var r = new Float64Array(2);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    return r;
});

var _MJS_v2dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
});

// Vector3

var _MJS_v3temp1Local = new Float64Array(3);
var _MJS_v3temp2Local = new Float64Array(3);
var _MJS_v3temp3Local = new Float64Array(3);

var _MJS_v3 = F3(function(x, y, z) {
    return new Float64Array([x, y, z]);
});

var _MJS_v3getX = function(a) {
    return a[0];
};

var _MJS_v3getY = function(a) {
    return a[1];
};

var _MJS_v3getZ = function(a) {
    return a[2];
};

var _MJS_v3setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2]]);
});

var _MJS_v3setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2]]);
});

var _MJS_v3setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z]);
});

var _MJS_v3toRecord = function(a) {
    return { bE: a[0], bF: a[1], a3: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.bE, r.bF, r.a3]);
};

var _MJS_v3add = F2(function(a, b) {
    var r = new Float64Array(3);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    return r;
});

function _MJS_v3subLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    return r;
}
var _MJS_v3sub = F2(_MJS_v3subLocal);

var _MJS_v3negate = function(a) {
    var r = new Float64Array(3);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    return r;
};

function _MJS_v3directionLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    return _MJS_v3normalizeLocal(_MJS_v3subLocal(a, b, r), r);
}
var _MJS_v3direction = F2(_MJS_v3directionLocal);

function _MJS_v3lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
var _MJS_v3length = _MJS_v3lengthLocal;

var _MJS_v3lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
};

var _MJS_v3distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
});

var _MJS_v3distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
});

function _MJS_v3normalizeLocal(a, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    var im = 1.0 / _MJS_v3lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    return r;
}
var _MJS_v3normalize = _MJS_v3normalizeLocal;

var _MJS_v3scale = F2(function(k, a) {
    return new Float64Array([a[0] * k, a[1] * k, a[2] * k]);
});

var _MJS_v3dotLocal = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
var _MJS_v3dot = F2(_MJS_v3dotLocal);

function _MJS_v3crossLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[1] * b[2] - a[2] * b[1];
    r[1] = a[2] * b[0] - a[0] * b[2];
    r[2] = a[0] * b[1] - a[1] * b[0];
    return r;
}
var _MJS_v3cross = F2(_MJS_v3crossLocal);

var _MJS_v3mul4x4 = F2(function(m, v) {
    var w;
    var tmp = _MJS_v3temp1Local;
    var r = new Float64Array(3);

    tmp[0] = m[3];
    tmp[1] = m[7];
    tmp[2] = m[11];
    w = _MJS_v3dotLocal(v, tmp) + m[15];
    tmp[0] = m[0];
    tmp[1] = m[4];
    tmp[2] = m[8];
    r[0] = (_MJS_v3dotLocal(v, tmp) + m[12]) / w;
    tmp[0] = m[1];
    tmp[1] = m[5];
    tmp[2] = m[9];
    r[1] = (_MJS_v3dotLocal(v, tmp) + m[13]) / w;
    tmp[0] = m[2];
    tmp[1] = m[6];
    tmp[2] = m[10];
    r[2] = (_MJS_v3dotLocal(v, tmp) + m[14]) / w;
    return r;
});

// Vector4

var _MJS_v4 = F4(function(x, y, z, w) {
    return new Float64Array([x, y, z, w]);
});

var _MJS_v4getX = function(a) {
    return a[0];
};

var _MJS_v4getY = function(a) {
    return a[1];
};

var _MJS_v4getZ = function(a) {
    return a[2];
};

var _MJS_v4getW = function(a) {
    return a[3];
};

var _MJS_v4setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2], a[3]]);
});

var _MJS_v4setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2], a[3]]);
});

var _MJS_v4setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z, a[3]]);
});

var _MJS_v4setW = F2(function(w, a) {
    return new Float64Array([a[0], a[1], a[2], w]);
});

var _MJS_v4toRecord = function(a) {
    return { bE: a[0], bF: a[1], a3: a[2], c0: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.bE, r.bF, r.a3, r.c0]);
};

var _MJS_v4add = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    r[3] = a[3] + b[3];
    return r;
});

var _MJS_v4sub = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    return r;
});

var _MJS_v4negate = function(a) {
    var r = new Float64Array(4);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    r[3] = -a[3];
    return r;
};

var _MJS_v4direction = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    var im = 1.0 / _MJS_v4lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    r[2] = r[2] * im;
    r[3] = r[3] * im;
    return r;
});

function _MJS_v4lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
}
var _MJS_v4length = _MJS_v4lengthLocal;

var _MJS_v4lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
};

var _MJS_v4distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
});

var _MJS_v4distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return dx * dx + dy * dy + dz * dz + dw * dw;
});

var _MJS_v4normalize = function(a) {
    var r = new Float64Array(4);
    var im = 1.0 / _MJS_v4lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    r[3] = a[3] * im;
    return r;
};

var _MJS_v4scale = F2(function(k, a) {
    var r = new Float64Array(4);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    r[3] = a[3] * k;
    return r;
});

var _MJS_v4dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
});

// Matrix4

var _MJS_m4x4temp1Local = new Float64Array(16);
var _MJS_m4x4temp2Local = new Float64Array(16);

var _MJS_m4x4identity = new Float64Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var _MJS_m4x4fromRecord = function(r) {
    var m = new Float64Array(16);
    m[0] = r.cc;
    m[1] = r.cg;
    m[2] = r.ck;
    m[3] = r.co;
    m[4] = r.cd;
    m[5] = r.ch;
    m[6] = r.cl;
    m[7] = r.cp;
    m[8] = r.ce;
    m[9] = r.ci;
    m[10] = r.cm;
    m[11] = r.cq;
    m[12] = r.cf;
    m[13] = r.cj;
    m[14] = r.cn;
    m[15] = r.cr;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        cc: m[0], cg: m[1], ck: m[2], co: m[3],
        cd: m[4], ch: m[5], cl: m[6], cp: m[7],
        ce: m[8], ci: m[9], cm: m[10], cq: m[11],
        cf: m[12], cj: m[13], cn: m[14], cr: m[15]
    };
};

var _MJS_m4x4inverse = function(m) {
    var r = new Float64Array(16);

    r[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] +
        m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
    r[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] -
        m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
    r[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] +
        m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
    r[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] -
        m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
    r[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] -
        m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
    r[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] +
        m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
    r[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] -
        m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
    r[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] +
        m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
    r[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] +
        m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
    r[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] -
        m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
    r[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] +
        m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
    r[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] -
        m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
    r[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] -
        m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
    r[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] +
        m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
    r[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] -
        m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
    r[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] +
        m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

    var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];

    if (det === 0) {
        return $elm$core$Maybe$Nothing;
    }

    det = 1.0 / det;

    for (var i = 0; i < 16; i = i + 1) {
        r[i] = r[i] * det;
    }

    return $elm$core$Maybe$Just(r);
};

var _MJS_m4x4inverseOrthonormal = function(m) {
    var r = _MJS_m4x4transposeLocal(m);
    var t = [m[12], m[13], m[14]];
    r[3] = r[7] = r[11] = 0;
    r[12] = -_MJS_v3dotLocal([r[0], r[4], r[8]], t);
    r[13] = -_MJS_v3dotLocal([r[1], r[5], r[9]], t);
    r[14] = -_MJS_v3dotLocal([r[2], r[6], r[10]], t);
    return r;
};

function _MJS_m4x4makeFrustumLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 * znear / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 * znear / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = (right + left) / (right - left);
    r[9] = (top + bottom) / (top - bottom);
    r[10] = -(zfar + znear) / (zfar - znear);
    r[11] = -1;
    r[12] = 0;
    r[13] = 0;
    r[14] = -2 * zfar * znear / (zfar - znear);
    r[15] = 0;

    return r;
}
var _MJS_m4x4makeFrustum = F6(_MJS_m4x4makeFrustumLocal);

var _MJS_m4x4makePerspective = F4(function(fovy, aspect, znear, zfar) {
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return _MJS_m4x4makeFrustumLocal(xmin, xmax, ymin, ymax, znear, zfar);
});

function _MJS_m4x4makeOrthoLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = -2 / (zfar - znear);
    r[11] = 0;
    r[12] = -(right + left) / (right - left);
    r[13] = -(top + bottom) / (top - bottom);
    r[14] = -(zfar + znear) / (zfar - znear);
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeOrtho = F6(_MJS_m4x4makeOrthoLocal);

var _MJS_m4x4makeOrtho2D = F4(function(left, right, bottom, top) {
    return _MJS_m4x4makeOrthoLocal(left, right, bottom, top, -1, 1);
});

function _MJS_m4x4mulLocal(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a41 = a[3];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a42 = a[7];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a43 = a[11];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];
    var a44 = a[15];
    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b41 = b[3];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b42 = b[7];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b43 = b[11];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];
    var b44 = b[15];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return r;
}
var _MJS_m4x4mul = F2(_MJS_m4x4mulLocal);

var _MJS_m4x4mulAffine = F2(function(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];

    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31;
    r[3] = 0;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32;
    r[7] = 0;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33;
    r[11] = 0;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    r[15] = 1;

    return r;
});

var _MJS_m4x4makeRotate = F2(function(angle, axis) {
    var r = new Float64Array(16);
    axis = _MJS_v3normalizeLocal(axis, _MJS_v3temp1Local);
    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);

    r[0] = x * x * c1 + c;
    r[1] = y * x * c1 + z * s;
    r[2] = z * x * c1 - y * s;
    r[3] = 0;
    r[4] = x * y * c1 - z * s;
    r[5] = y * y * c1 + c;
    r[6] = y * z * c1 + x * s;
    r[7] = 0;
    r[8] = x * z * c1 + y * s;
    r[9] = y * z * c1 - x * s;
    r[10] = z * z * c1 + c;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});

var _MJS_m4x4rotate = F3(function(angle, axis, m) {
    var r = new Float64Array(16);
    var im = 1.0 / _MJS_v3lengthLocal(axis);
    var x = axis[0] * im;
    var y = axis[1] * im;
    var z = axis[2] * im;
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);
    var xs = x * s;
    var ys = y * s;
    var zs = z * s;
    var xyc1 = x * y * c1;
    var xzc1 = x * z * c1;
    var yzc1 = y * z * c1;
    var t11 = x * x * c1 + c;
    var t21 = xyc1 + zs;
    var t31 = xzc1 - ys;
    var t12 = xyc1 - zs;
    var t22 = y * y * c1 + c;
    var t32 = yzc1 + xs;
    var t13 = xzc1 + ys;
    var t23 = yzc1 - xs;
    var t33 = z * z * c1 + c;
    var m11 = m[0], m21 = m[1], m31 = m[2], m41 = m[3];
    var m12 = m[4], m22 = m[5], m32 = m[6], m42 = m[7];
    var m13 = m[8], m23 = m[9], m33 = m[10], m43 = m[11];
    var m14 = m[12], m24 = m[13], m34 = m[14], m44 = m[15];

    r[0] = m11 * t11 + m12 * t21 + m13 * t31;
    r[1] = m21 * t11 + m22 * t21 + m23 * t31;
    r[2] = m31 * t11 + m32 * t21 + m33 * t31;
    r[3] = m41 * t11 + m42 * t21 + m43 * t31;
    r[4] = m11 * t12 + m12 * t22 + m13 * t32;
    r[5] = m21 * t12 + m22 * t22 + m23 * t32;
    r[6] = m31 * t12 + m32 * t22 + m33 * t32;
    r[7] = m41 * t12 + m42 * t22 + m43 * t32;
    r[8] = m11 * t13 + m12 * t23 + m13 * t33;
    r[9] = m21 * t13 + m22 * t23 + m23 * t33;
    r[10] = m31 * t13 + m32 * t23 + m33 * t33;
    r[11] = m41 * t13 + m42 * t23 + m43 * t33;
    r[12] = m14,
    r[13] = m24;
    r[14] = m34;
    r[15] = m44;

    return r;
});

function _MJS_m4x4makeScale3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = x;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = y;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = z;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeScale3 = F3(_MJS_m4x4makeScale3Local);

var _MJS_m4x4makeScale = function(v) {
    return _MJS_m4x4makeScale3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4scale3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

var _MJS_m4x4scale = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

function _MJS_m4x4makeTranslate3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = 1;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 1;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = 1;
    r[11] = 0;
    r[12] = x;
    r[13] = y;
    r[14] = z;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeTranslate3 = F3(_MJS_m4x4makeTranslate3Local);

var _MJS_m4x4makeTranslate = function(v) {
    return _MJS_m4x4makeTranslate3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4translate3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4translate = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4makeLookAt = F3(function(eye, center, up) {
    var z = _MJS_v3directionLocal(eye, center, _MJS_v3temp1Local);
    var x = _MJS_v3normalizeLocal(_MJS_v3crossLocal(up, z, _MJS_v3temp2Local), _MJS_v3temp2Local);
    var y = _MJS_v3normalizeLocal(_MJS_v3crossLocal(z, x, _MJS_v3temp3Local), _MJS_v3temp3Local);
    var tm1 = _MJS_m4x4temp1Local;
    var tm2 = _MJS_m4x4temp2Local;

    tm1[0] = x[0];
    tm1[1] = y[0];
    tm1[2] = z[0];
    tm1[3] = 0;
    tm1[4] = x[1];
    tm1[5] = y[1];
    tm1[6] = z[1];
    tm1[7] = 0;
    tm1[8] = x[2];
    tm1[9] = y[2];
    tm1[10] = z[2];
    tm1[11] = 0;
    tm1[12] = 0;
    tm1[13] = 0;
    tm1[14] = 0;
    tm1[15] = 1;

    tm2[0] = 1; tm2[1] = 0; tm2[2] = 0; tm2[3] = 0;
    tm2[4] = 0; tm2[5] = 1; tm2[6] = 0; tm2[7] = 0;
    tm2[8] = 0; tm2[9] = 0; tm2[10] = 1; tm2[11] = 0;
    tm2[12] = -eye[0]; tm2[13] = -eye[1]; tm2[14] = -eye[2]; tm2[15] = 1;

    return _MJS_m4x4mulLocal(tm1, tm2);
});


function _MJS_m4x4transposeLocal(m) {
    var r = new Float64Array(16);

    r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
    r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
    r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
    r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

    return r;
}
var _MJS_m4x4transpose = _MJS_m4x4transposeLocal;

var _MJS_m4x4makeBasis = F3(function(vx, vy, vz) {
    var r = new Float64Array(16);

    r[0] = vx[0];
    r[1] = vx[1];
    r[2] = vx[2];
    r[3] = 0;
    r[4] = vy[0];
    r[5] = vy[1];
    r[6] = vy[2];
    r[7] = 0;
    r[8] = vz[0];
    r[9] = vz[1];
    r[10] = vz[2];
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.d0) { flags += 'm'; }
	if (options.dd) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $author$project$Durak$Protocol$Message$Watch = {$: 2};
var $author$project$Durak$Spectator$World$empty = {
	eh: _List_Nil,
	ar: {c3: 2, c7: 6, dm: 6, dt: 6, dD: 16, dI: 6}
};
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.l) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.p),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.p);
		} else {
			var treeLen = builder.l * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.q) : builder.q;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.l);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.p) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.p);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{q: nodeList, l: (len / $elm$core$Array$branchFactor) | 0, p: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Durak$Spectator$init = F2(
	function (flags, initModel) {
		var world = $author$project$Durak$Spectator$World$empty;
		return _Utils_Tuple2(
			initModel(
				_Utils_update(
					world,
					{
						eh: _List_fromArray(
							[$author$project$Durak$Protocol$Message$Watch])
					})),
			$elm$core$Platform$Cmd$none);
	});
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {bW: fragment, b0: host, cD: path, cF: port_, cI: protocol, cJ: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Game$Client$Util$toScreen = F2(
	function (width, height) {
		return {db: (-height) * 0.5, b$: height, dU: (-width) * 0.5, em: width * 0.5, ez: height * 0.5, c1: width};
	});
var $author$project$Game$Client$Model$empty = function (world) {
	return {
		dx: _List_Nil,
		dy: '',
		en: A2($author$project$Game$Client$Util$toScreen, 2, 2),
		cY: {dr: $elm$core$Dict$empty, bj: $elm$core$Set$empty},
		ex: 0,
		bC: world
	};
};
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Game$Client$Port$output = _Platform_outgoingPort('output', $elm$json$Json$Encode$string);
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Game$Client$init = F2(
	function (initFn, flags) {
		var screen = function () {
			var decoder = A3(
				$elm$json$Json$Decode$map2,
				$author$project$Game$Client$Util$toScreen,
				A2(
					$elm$json$Json$Decode$at,
					_List_fromArray(
						['screen', 'width']),
					$elm$json$Json$Decode$float),
				A2(
					$elm$json$Json$Decode$at,
					_List_fromArray(
						['screen', 'height']),
					$elm$json$Json$Decode$float));
			return A2(
				$elm$core$Result$withDefault,
				A2($author$project$Game$Client$Util$toScreen, 100, 100),
				A2($elm$json$Json$Decode$decodeValue, decoder, flags));
		}();
		var _v0 = A2(
			initFn,
			flags,
			function (w) {
				return $author$project$Game$Client$Model$empty(w);
			});
		var model = _v0.a;
		var cmd = _v0.b;
		var _v1 = $author$project$Game$Client$Port$output;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{en: screen}),
			cmd);
	});
var $author$project$Game$Client$Model$Message = function (a) {
	return {$: 2, a: a};
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Game$Client$Port$input = _Platform_incomingPort('input', $elm$json$Json$Decode$value);
var $author$project$Game$Client$Port$subscriptions = function (_v0) {
	return $author$project$Game$Client$Port$input($author$project$Game$Client$Model$Message);
};
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $author$project$Game$Client$Port$InputKeyboard = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $author$project$Game$Client$Port$InputMouse = function (a) {
	return {$: 3, a: a};
};
var $author$project$Game$Client$Port$InputTouch = function (a) {
	return {$: 4, a: a};
};
var $author$project$Game$Client$Port$MouseData = F4(
	function (x, y, key1, key2) {
		return {dR: key1, dS: key2, bE: x, bF: y};
	});
var $author$project$Game$Client$Port$NetworkData = function (a) {
	return {$: 7, a: a};
};
var $author$project$Game$Client$Port$NetworkError = function (a) {
	return {$: 8, a: a};
};
var $author$project$Game$Client$Port$NetworkJoin = {$: 5};
var $author$project$Game$Client$Port$NetworkLeave = {$: 6};
var $author$project$Game$Client$Port$Resize = function (a) {
	return {$: 1, a: a};
};
var $author$project$Game$Client$Port$Tick = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $author$project$Game$Client$Component$Action$ArrowDown = 0;
var $author$project$Game$Client$Component$Action$ArrowLeft = 1;
var $author$project$Game$Client$Component$Action$ArrowRight = 2;
var $author$project$Game$Client$Component$Action$ArrowUp = 3;
var $author$project$Game$Client$Component$Action$Backslash = 4;
var $author$project$Game$Client$Component$Action$Backspace = 5;
var $author$project$Game$Client$Component$Action$BracketLeft = 6;
var $author$project$Game$Client$Component$Action$BracketRight = 7;
var $author$project$Game$Client$Component$Action$Comma = 8;
var $author$project$Game$Client$Component$Action$Digit0 = 9;
var $author$project$Game$Client$Component$Action$Digit1 = 10;
var $author$project$Game$Client$Component$Action$Digit2 = 11;
var $author$project$Game$Client$Component$Action$Digit3 = 12;
var $author$project$Game$Client$Component$Action$Digit4 = 13;
var $author$project$Game$Client$Component$Action$Digit5 = 14;
var $author$project$Game$Client$Component$Action$Digit6 = 15;
var $author$project$Game$Client$Component$Action$Digit7 = 16;
var $author$project$Game$Client$Component$Action$Digit8 = 17;
var $author$project$Game$Client$Component$Action$Digit9 = 18;
var $author$project$Game$Client$Component$Action$Enter = 19;
var $author$project$Game$Client$Component$Action$Equal = 20;
var $author$project$Game$Client$Component$Action$IntlBackslash = 21;
var $author$project$Game$Client$Component$Action$KeyA = 22;
var $author$project$Game$Client$Component$Action$KeyB = 23;
var $author$project$Game$Client$Component$Action$KeyC = 24;
var $author$project$Game$Client$Component$Action$KeyD = 25;
var $author$project$Game$Client$Component$Action$KeyE = 26;
var $author$project$Game$Client$Component$Action$KeyF = 27;
var $author$project$Game$Client$Component$Action$KeyG = 28;
var $author$project$Game$Client$Component$Action$KeyH = 29;
var $author$project$Game$Client$Component$Action$KeyI = 30;
var $author$project$Game$Client$Component$Action$KeyJ = 31;
var $author$project$Game$Client$Component$Action$KeyK = 32;
var $author$project$Game$Client$Component$Action$KeyL = 33;
var $author$project$Game$Client$Component$Action$KeyM = 34;
var $author$project$Game$Client$Component$Action$KeyN = 35;
var $author$project$Game$Client$Component$Action$KeyO = 36;
var $author$project$Game$Client$Component$Action$KeyP = 37;
var $author$project$Game$Client$Component$Action$KeyQ = 38;
var $author$project$Game$Client$Component$Action$KeyR = 39;
var $author$project$Game$Client$Component$Action$KeyS = 40;
var $author$project$Game$Client$Component$Action$KeyT = 41;
var $author$project$Game$Client$Component$Action$KeyU = 42;
var $author$project$Game$Client$Component$Action$KeyV = 43;
var $author$project$Game$Client$Component$Action$KeyW = 44;
var $author$project$Game$Client$Component$Action$KeyX = 45;
var $author$project$Game$Client$Component$Action$KeyY = 46;
var $author$project$Game$Client$Component$Action$KeyZ = 47;
var $author$project$Game$Client$Component$Action$Minus = 48;
var $author$project$Game$Client$Component$Action$Period = 49;
var $author$project$Game$Client$Component$Action$Quote = 50;
var $author$project$Game$Client$Component$Action$Semicolon = 51;
var $author$project$Game$Client$Component$Action$Slash = 52;
var $author$project$Game$Client$Component$Action$Space = 53;
var $author$project$Game$Client$Component$Action$Tab = 54;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Game$Client$Component$Action$decode = A2(
	$elm$json$Json$Decode$andThen,
	function (a) {
		switch (a) {
			case 0:
				return $elm$json$Json$Decode$succeed(0);
			case 1:
				return $elm$json$Json$Decode$succeed(1);
			case 2:
				return $elm$json$Json$Decode$succeed(2);
			case 3:
				return $elm$json$Json$Decode$succeed(3);
			case 4:
				return $elm$json$Json$Decode$succeed(4);
			case 5:
				return $elm$json$Json$Decode$succeed(5);
			case 6:
				return $elm$json$Json$Decode$succeed(6);
			case 7:
				return $elm$json$Json$Decode$succeed(7);
			case 8:
				return $elm$json$Json$Decode$succeed(8);
			case 9:
				return $elm$json$Json$Decode$succeed(9);
			case 10:
				return $elm$json$Json$Decode$succeed(10);
			case 11:
				return $elm$json$Json$Decode$succeed(11);
			case 12:
				return $elm$json$Json$Decode$succeed(12);
			case 13:
				return $elm$json$Json$Decode$succeed(13);
			case 14:
				return $elm$json$Json$Decode$succeed(14);
			case 15:
				return $elm$json$Json$Decode$succeed(15);
			case 16:
				return $elm$json$Json$Decode$succeed(16);
			case 17:
				return $elm$json$Json$Decode$succeed(17);
			case 18:
				return $elm$json$Json$Decode$succeed(18);
			case 19:
				return $elm$json$Json$Decode$succeed(19);
			case 20:
				return $elm$json$Json$Decode$succeed(20);
			case 21:
				return $elm$json$Json$Decode$succeed(21);
			case 22:
				return $elm$json$Json$Decode$succeed(22);
			case 23:
				return $elm$json$Json$Decode$succeed(23);
			case 24:
				return $elm$json$Json$Decode$succeed(24);
			case 25:
				return $elm$json$Json$Decode$succeed(25);
			case 26:
				return $elm$json$Json$Decode$succeed(26);
			case 27:
				return $elm$json$Json$Decode$succeed(27);
			case 28:
				return $elm$json$Json$Decode$succeed(28);
			case 29:
				return $elm$json$Json$Decode$succeed(29);
			case 30:
				return $elm$json$Json$Decode$succeed(30);
			case 31:
				return $elm$json$Json$Decode$succeed(31);
			case 32:
				return $elm$json$Json$Decode$succeed(32);
			case 33:
				return $elm$json$Json$Decode$succeed(33);
			case 34:
				return $elm$json$Json$Decode$succeed(34);
			case 35:
				return $elm$json$Json$Decode$succeed(35);
			case 36:
				return $elm$json$Json$Decode$succeed(36);
			case 37:
				return $elm$json$Json$Decode$succeed(37);
			case 38:
				return $elm$json$Json$Decode$succeed(38);
			case 39:
				return $elm$json$Json$Decode$succeed(39);
			case 40:
				return $elm$json$Json$Decode$succeed(40);
			case 41:
				return $elm$json$Json$Decode$succeed(41);
			case 42:
				return $elm$json$Json$Decode$succeed(42);
			case 43:
				return $elm$json$Json$Decode$succeed(43);
			case 44:
				return $elm$json$Json$Decode$succeed(44);
			case 45:
				return $elm$json$Json$Decode$succeed(45);
			case 46:
				return $elm$json$Json$Decode$succeed(46);
			case 47:
				return $elm$json$Json$Decode$succeed(47);
			case 48:
				return $elm$json$Json$Decode$succeed(48);
			case 49:
				return $elm$json$Json$Decode$succeed(49);
			case 50:
				return $elm$json$Json$Decode$succeed(50);
			case 51:
				return $elm$json$Json$Decode$succeed(51);
			case 52:
				return $elm$json$Json$Decode$succeed(52);
			case 53:
				return $elm$json$Json$Decode$succeed(53);
			case 54:
				return $elm$json$Json$Decode$succeed(54);
			default:
				return $elm$json$Json$Decode$fail('');
		}
	},
	$elm$json$Json$Decode$int);
var $elm$json$Json$Decode$index = _Json_decodeIndex;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$json$Json$Decode$map4 = _Json_map4;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Game$Client$Port$decoder = A2(
	$elm$json$Json$Decode$andThen,
	function (msg) {
		switch (msg) {
			case 100:
				return A2(
					$elm$json$Json$Decode$map,
					$author$project$Game$Client$Port$Tick,
					A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$float));
			case 101:
				return A2(
					$elm$json$Json$Decode$map,
					$author$project$Game$Client$Port$Resize,
					A3(
						$elm$json$Json$Decode$map2,
						$author$project$Game$Client$Util$toScreen,
						A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$float),
						A2($elm$json$Json$Decode$index, 2, $elm$json$Json$Decode$float)));
			case 102:
				return A3(
					$elm$json$Json$Decode$map2,
					$author$project$Game$Client$Port$InputKeyboard,
					A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$bool),
					A2($elm$json$Json$Decode$index, 2, $author$project$Game$Client$Component$Action$decode));
			case 103:
				return A2(
					$elm$json$Json$Decode$map,
					$author$project$Game$Client$Port$InputMouse,
					A5(
						$elm$json$Json$Decode$map4,
						$author$project$Game$Client$Port$MouseData,
						A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$float),
						A2($elm$json$Json$Decode$index, 2, $elm$json$Json$Decode$float),
						A2($elm$json$Json$Decode$index, 3, $elm$json$Json$Decode$bool),
						A2($elm$json$Json$Decode$index, 4, $elm$json$Json$Decode$bool)));
			case 104:
				var touchDecoder = A4(
					$elm$json$Json$Decode$map3,
					F3(
						function (id, x, y) {
							return {b4: id, bE: x, bF: y};
						}),
					A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$int),
					A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$float),
					A2($elm$json$Json$Decode$index, 2, $elm$json$Json$Decode$float));
				return A2(
					$elm$json$Json$Decode$map,
					$author$project$Game$Client$Port$InputTouch,
					A2(
						$elm$json$Json$Decode$index,
						1,
						$elm$json$Json$Decode$list(touchDecoder)));
			case 201:
				return $elm$json$Json$Decode$succeed($author$project$Game$Client$Port$NetworkJoin);
			case 202:
				return $elm$json$Json$Decode$succeed($author$project$Game$Client$Port$NetworkLeave);
			case 203:
				return A2(
					$elm$json$Json$Decode$map,
					$author$project$Game$Client$Port$NetworkData,
					A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
			case 204:
				return A2(
					$elm$json$Json$Decode$map,
					$author$project$Game$Client$Port$NetworkError,
					A2($elm$json$Json$Decode$index, 1, $elm$json$Json$Decode$string));
			default:
				return $elm$json$Json$Decode$fail('unknown message type');
		}
	},
	A2($elm$json$Json$Decode$index, 0, $elm$json$Json$Decode$int));
var $author$project$Game$Client$Port$parse = $elm$json$Json$Decode$decodeValue(
	$elm$json$Json$Decode$list($author$project$Game$Client$Port$decoder));
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$remove, key, dict);
	});
var $author$project$Game$Client$update = F3(
	function (update2, msg, model) {
		var textures = model.cY;
		switch (msg.$) {
			case 2:
				var v = msg.a;
				var _v1 = $author$project$Game$Client$Port$parse(v);
				if (!_v1.$) {
					var messages = _v1.a;
					return A2(
						$elm$core$Tuple$mapSecond,
						$elm$core$Platform$Cmd$batch,
						A3(
							$elm$core$List$foldl,
							F2(
								function (msg2, _v2) {
									var m = _v2.a;
									var cmds = _v2.b;
									return A2(
										$elm$core$Tuple$mapSecond,
										function (a) {
											return A2($elm$core$List$cons, a, cmds);
										},
										A2(update2, msg2, m));
								}),
							_Utils_Tuple2(model, _List_Nil),
							messages));
				} else {
					var err = _v1.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								dy: $elm$json$Json$Decode$errorToString(err)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 0:
				var url = msg.a;
				var t = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cY: _Utils_update(
								textures,
								{
									dr: A3($elm$core$Dict$insert, url, t, textures.dr),
									bj: A2($elm$core$Set$remove, url, textures.bj)
								})
						}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $elm$core$Basics$round = _Basics_round;
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $elm$virtual_dom$VirtualDom$lazy3 = _VirtualDom_lazy3;
var $elm$html$Html$Lazy$lazy3 = $elm$virtual_dom$VirtualDom$lazy3;
var $elm_explorations$webgl$WebGL$Internal$enableOption = F2(
	function (ctx, option) {
		switch (option.$) {
			case 0:
				return A2(_WebGL_enableAlpha, ctx, option);
			case 1:
				return A2(_WebGL_enableDepth, ctx, option);
			case 2:
				return A2(_WebGL_enableStencil, ctx, option);
			case 3:
				return A2(_WebGL_enableAntialias, ctx, option);
			case 4:
				return A2(_WebGL_enableClearColor, ctx, option);
			default:
				return A2(_WebGL_enablePreserveDrawingBuffer, ctx, option);
		}
	});
var $elm_explorations$webgl$WebGL$Internal$enableSetting = F2(
	function (cache, setting) {
		switch (setting.$) {
			case 0:
				return A2(_WebGL_enableBlend, cache, setting);
			case 1:
				return A2(_WebGL_enableDepthTest, cache, setting);
			case 2:
				return A2(_WebGL_enableStencilTest, cache, setting);
			case 3:
				return A2(_WebGL_enableScissor, cache, setting);
			case 4:
				return A2(_WebGL_enableColorMask, cache, setting);
			case 5:
				return A2(_WebGL_enableCullFace, cache, setting);
			case 6:
				return A2(_WebGL_enablePolygonOffset, cache, setting);
			case 7:
				return A2(_WebGL_enableSampleCoverage, cache, setting);
			default:
				return _WebGL_enableSampleAlphaToCoverage(cache);
		}
	});
var $elm_explorations$webgl$WebGL$toHtmlWith = F3(
	function (options, attributes, entities) {
		return A3(_WebGL_toHtml, options, attributes, entities);
	});
var $elm_explorations$webgl$WebGL$Internal$Alpha = function (a) {
	return {$: 0, a: a};
};
var $elm_explorations$webgl$WebGL$alpha = $elm_explorations$webgl$WebGL$Internal$Alpha;
var $elm_explorations$webgl$WebGL$Internal$ClearColor = F4(
	function (a, b, c, d) {
		return {$: 4, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$clearColor = $elm_explorations$webgl$WebGL$Internal$ClearColor;
var $elm_explorations$webgl$WebGL$Internal$Depth = function (a) {
	return {$: 1, a: a};
};
var $elm_explorations$webgl$WebGL$depth = $elm_explorations$webgl$WebGL$Internal$Depth;
var $author$project$Game$Client$webGLOption = _List_fromArray(
	[
		$elm_explorations$webgl$WebGL$alpha(true),
		$elm_explorations$webgl$WebGL$depth(1),
		A4($elm_explorations$webgl$WebGL$clearColor, 1, 1, 1, 1)
	]);
var $author$project$Game$Client$wrap = F2(
	function (attrs, entities) {
		return A4($elm$html$Html$Lazy$lazy3, $elm_explorations$webgl$WebGL$toHtmlWith, $author$project$Game$Client$webGLOption, attrs, entities);
	});
var $author$project$Game$Client$view = function (_v0) {
	var screen = _v0.en;
	var entities = _v0.dx;
	var world = _v0.bC;
	return A2(
		$author$project$Game$Client$wrap,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$width(
				$elm$core$Basics$round(screen.c1)),
				$elm$html$Html$Attributes$height(
				$elm$core$Basics$round(screen.b$))
			]),
		entities);
};
var $author$project$Game$Client$start = function (opt) {
	return $elm$browser$Browser$element(
		{
			dQ: $author$project$Game$Client$init(opt.dQ),
			eu: $author$project$Game$Client$Port$subscriptions,
			eI: $author$project$Game$Client$update(opt.eI),
			eN: $author$project$Game$Client$view
		});
};
var $justgook$webgl_shape$WebGL$Shape2d$Group = function (a) {
	return {$: 2, a: a};
};
var $justgook$webgl_shape$WebGL$Shape2d$Shape2d = $elm$core$Basics$identity;
var $justgook$webgl_playground$Playground$group = function (shapes) {
	return {
		c3: 0,
		k: $justgook$webgl_shape$WebGL$Shape2d$Group(shapes),
		i: 1,
		e: 1,
		f: 1,
		bE: 0,
		bF: 0,
		a3: 0
	};
};
var $author$project$Durak$Common$Util$andThen = F3(
	function (model, fn, _v0) {
		var world = _v0.a;
		var shape = _v0.b;
		return A2(
			$elm$core$Tuple$mapSecond,
			function (a) {
				return $justgook$webgl_playground$Playground$group(
					_List_fromArray(
						[shape, a]));
			},
			fn(
				_Utils_update(
					model,
					{bC: world})));
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2($elm$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});
var $elm$core$Set$diff = F2(
	function (_v0, _v1) {
		var dict1 = _v0;
		var dict2 = _v1;
		return A2($elm$core$Dict$diff, dict1, dict2);
	});
var $elm$core$Set$foldl = F3(
	function (func, initialState, _v0) {
		var dict = _v0;
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (key, _v1, state) {
					return A2(func, key, state);
				}),
			initialState,
			dict);
	});
var $author$project$Game$Client$Model$Texture = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Game$Client$Model$TextureFail = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			A2(
				$elm$core$Task$onError,
				A2(
					$elm$core$Basics$composeL,
					A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
					$elm$core$Result$Err),
				A2(
					$elm$core$Task$andThen,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Ok),
					task)));
	});
var $elm_explorations$webgl$WebGL$Texture$LoadError = {$: 0};
var $elm_explorations$webgl$WebGL$Texture$SizeError = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$Texture$loadWith = F2(
	function (_v0, url) {
		var magnify = _v0.dV;
		var minify = _v0.d_;
		var horizontalWrap = _v0.dN;
		var verticalWrap = _v0.eM;
		var flipY = _v0.dG;
		var expand = F4(
			function (_v1, _v2, _v3, _v4) {
				var mag = _v1;
				var min = _v2;
				var hor = _v3;
				var vert = _v4;
				return A6(_Texture_load, mag, min, hor, vert, flipY, url);
			});
		return A4(expand, magnify, minify, horizontalWrap, verticalWrap);
	});
var $elm_explorations$webgl$WebGL$Texture$Wrap = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Texture$clampToEdge = 33071;
var $elm_explorations$webgl$WebGL$Texture$Resize = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Texture$linear = 9729;
var $author$project$Game$Client$Model$textureOption = {dG: true, dN: $elm_explorations$webgl$WebGL$Texture$clampToEdge, dV: $elm_explorations$webgl$WebGL$Texture$linear, d_: $elm_explorations$webgl$WebGL$Texture$linear, eM: $elm_explorations$webgl$WebGL$Texture$clampToEdge};
var $author$project$Game$Client$Model$getTexture = F2(
	function (name, url) {
		return A2(
			$elm$core$Task$attempt,
			function (r) {
				if (!r.$) {
					var t = r.a;
					return A2($author$project$Game$Client$Model$Texture, name, t);
				} else {
					var e = r.a;
					return $author$project$Game$Client$Model$TextureFail(e);
				}
			},
			A2($elm_explorations$webgl$WebGL$Texture$loadWith, $author$project$Game$Client$Model$textureOption, url));
	});
var $author$project$Durak$Spectator$System$Tick$getTexture = function (url) {
	return A2($author$project$Game$Client$Model$getTexture, url, url);
};
var $elm$bytes$Bytes$Encode$Seq = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var $elm$bytes$Bytes$LE = 0;
var $elm$bytes$Bytes$Encode$write = F3(
	function (builder, mb, offset) {
		switch (builder.$) {
			case 0:
				var n = builder.a;
				return A3(_Bytes_write_i8, mb, offset, n);
			case 1:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_i16, mb, offset, n, !e);
			case 2:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_i32, mb, offset, n, !e);
			case 3:
				var n = builder.a;
				return A3(_Bytes_write_u8, mb, offset, n);
			case 4:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_u16, mb, offset, n, !e);
			case 5:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_u32, mb, offset, n, !e);
			case 6:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_f32, mb, offset, n, !e);
			case 7:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_f64, mb, offset, n, !e);
			case 8:
				var bs = builder.b;
				return A3($elm$bytes$Bytes$Encode$writeSequence, bs, mb, offset);
			case 9:
				var s = builder.b;
				return A3(_Bytes_write_string, mb, offset, s);
			default:
				var bs = builder.a;
				return A3(_Bytes_write_bytes, mb, offset, bs);
		}
	});
var $elm$bytes$Bytes$Encode$writeSequence = F3(
	function (builders, mb, offset) {
		writeSequence:
		while (true) {
			if (!builders.b) {
				return offset;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$builders = bs,
					$temp$mb = mb,
					$temp$offset = A3($elm$bytes$Bytes$Encode$write, b, mb, offset);
				builders = $temp$builders;
				mb = $temp$mb;
				offset = $temp$offset;
				continue writeSequence;
			}
		}
	});
var $elm$bytes$Bytes$Encode$getWidth = function (builder) {
	switch (builder.$) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 4;
		case 3:
			return 1;
		case 4:
			return 2;
		case 5:
			return 4;
		case 6:
			return 4;
		case 7:
			return 8;
		case 8:
			var w = builder.a;
			return w;
		case 9:
			var w = builder.a;
			return w;
		default:
			var bs = builder.a;
			return _Bytes_width(bs);
	}
};
var $elm$bytes$Bytes$Encode$getWidths = F2(
	function (width, builders) {
		getWidths:
		while (true) {
			if (!builders.b) {
				return width;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$width = width + $elm$bytes$Bytes$Encode$getWidth(b),
					$temp$builders = bs;
				width = $temp$width;
				builders = $temp$builders;
				continue getWidths;
			}
		}
	});
var $elm$bytes$Bytes$Encode$sequence = function (builders) {
	return A2(
		$elm$bytes$Bytes$Encode$Seq,
		A2($elm$bytes$Bytes$Encode$getWidths, 0, builders),
		builders);
};
var $author$project$Durak$Common$Table$spotToInt = function (spot_) {
	switch (spot_) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		default:
			return 6;
	}
};
var $author$project$Durak$Common$Card$toInt = function (c) {
	switch (c) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 3;
		case 4:
			return 4;
		case 5:
			return 5;
		case 6:
			return 6;
		case 7:
			return 7;
		case 8:
			return 8;
		case 9:
			return 9;
		case 10:
			return 10;
		case 11:
			return 11;
		case 12:
			return 12;
		case 13:
			return 13;
		case 14:
			return 14;
		case 15:
			return 15;
		case 16:
			return 16;
		case 17:
			return 17;
		case 18:
			return 18;
		case 19:
			return 19;
		case 20:
			return 20;
		case 21:
			return 21;
		case 22:
			return 22;
		case 23:
			return 23;
		case 24:
			return 24;
		case 25:
			return 25;
		case 26:
			return 26;
		case 27:
			return 27;
		case 28:
			return 28;
		case 29:
			return 29;
		case 30:
			return 30;
		case 31:
			return 31;
		case 32:
			return 32;
		case 33:
			return 33;
		case 34:
			return 34;
		case 35:
			return 35;
		case 36:
			return 36;
		case 37:
			return 37;
		case 38:
			return 38;
		case 39:
			return 39;
		case 40:
			return 40;
		case 41:
			return 41;
		case 42:
			return 42;
		case 43:
			return 43;
		case 44:
			return 44;
		case 45:
			return 45;
		case 46:
			return 46;
		case 47:
			return 47;
		case 48:
			return 48;
		case 49:
			return 49;
		case 50:
			return 50;
		default:
			return 51;
	}
};
var $elm$bytes$Bytes$Encode$U8 = function (a) {
	return {$: 3, a: a};
};
var $elm$bytes$Bytes$Encode$unsignedInt8 = $elm$bytes$Bytes$Encode$U8;
var $author$project$Durak$Protocol$Player$encode = function (msg) {
	switch (msg.$) {
		case 0:
			var card = msg.a;
			return $elm$bytes$Bytes$Encode$sequence(
				_List_fromArray(
					[
						$elm$bytes$Bytes$Encode$unsignedInt8(1),
						$elm$bytes$Bytes$Encode$unsignedInt8(
						$author$project$Durak$Common$Card$toInt(card))
					]));
		case 1:
			return $elm$bytes$Bytes$Encode$sequence(
				_List_fromArray(
					[
						$elm$bytes$Bytes$Encode$unsignedInt8(2)
					]));
		case 2:
			return $elm$bytes$Bytes$Encode$sequence(
				_List_fromArray(
					[
						$elm$bytes$Bytes$Encode$unsignedInt8(3)
					]));
		case 3:
			return $elm$bytes$Bytes$Encode$sequence(
				_List_fromArray(
					[
						$elm$bytes$Bytes$Encode$unsignedInt8(4)
					]));
		case 4:
			var cover = msg.a;
			var card = msg.b;
			return $elm$bytes$Bytes$Encode$sequence(
				_List_fromArray(
					[
						$elm$bytes$Bytes$Encode$unsignedInt8(5),
						$elm$bytes$Bytes$Encode$unsignedInt8(
						$author$project$Durak$Common$Table$spotToInt(cover)),
						$elm$bytes$Bytes$Encode$unsignedInt8(
						$author$project$Durak$Common$Card$toInt(card))
					]));
		case 5:
			return $elm$bytes$Bytes$Encode$sequence(
				_List_fromArray(
					[
						$elm$bytes$Bytes$Encode$unsignedInt8(6)
					]));
		default:
			return $elm$bytes$Bytes$Encode$sequence(
				_List_fromArray(
					[
						$elm$bytes$Bytes$Encode$unsignedInt8(7)
					]));
	}
};
var $elm$bytes$Bytes$Encode$encode = _Bytes_encode;
var $elm$bytes$Bytes$Decode$decode = F2(
	function (_v0, bs) {
		var decoder = _v0;
		return A2(_Bytes_decode, decoder, bs);
	});
var $elm$bytes$Bytes$Decode$Decoder = $elm$core$Basics$identity;
var $elm$bytes$Bytes$Decode$loopHelp = F4(
	function (state, callback, bites, offset) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var decoder = _v0;
			var _v1 = A2(decoder, bites, offset);
			var newOffset = _v1.a;
			var step = _v1.b;
			if (!step.$) {
				var newState = step.a;
				var $temp$state = newState,
					$temp$callback = callback,
					$temp$bites = bites,
					$temp$offset = newOffset;
				state = $temp$state;
				callback = $temp$callback;
				bites = $temp$bites;
				offset = $temp$offset;
				continue loopHelp;
			} else {
				var result = step.a;
				return _Utils_Tuple2(newOffset, result);
			}
		}
	});
var $elm$bytes$Bytes$Decode$loop = F2(
	function (state, callback) {
		return A2($elm$bytes$Bytes$Decode$loopHelp, state, callback);
	});
var $elm$bytes$Bytes$Decode$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$bytes$Bytes$Decode$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $danfishgold$base64_bytes$Decode$lowest6BitsMask = 63;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Char$fromCode = _Char_fromCode;
var $danfishgold$base64_bytes$Decode$unsafeToChar = function (n) {
	if (n <= 25) {
		return $elm$core$Char$fromCode(65 + n);
	} else {
		if (n <= 51) {
			return $elm$core$Char$fromCode(97 + (n - 26));
		} else {
			if (n <= 61) {
				return $elm$core$Char$fromCode(48 + (n - 52));
			} else {
				switch (n) {
					case 62:
						return '+';
					case 63:
						return '/';
					default:
						return '\u0000';
				}
			}
		}
	}
};
var $danfishgold$base64_bytes$Decode$bitsToChars = F2(
	function (bits, missing) {
		var s = $danfishgold$base64_bytes$Decode$unsafeToChar(bits & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var r = $danfishgold$base64_bytes$Decode$unsafeToChar((bits >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var q = $danfishgold$base64_bytes$Decode$unsafeToChar((bits >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var p = $danfishgold$base64_bytes$Decode$unsafeToChar(bits >>> 18);
		switch (missing) {
			case 0:
				return A2(
					$elm$core$String$cons,
					p,
					A2(
						$elm$core$String$cons,
						q,
						A2(
							$elm$core$String$cons,
							r,
							$elm$core$String$fromChar(s))));
			case 1:
				return A2(
					$elm$core$String$cons,
					p,
					A2(
						$elm$core$String$cons,
						q,
						A2($elm$core$String$cons, r, '=')));
			case 2:
				return A2(
					$elm$core$String$cons,
					p,
					A2($elm$core$String$cons, q, '=='));
			default:
				return '';
		}
	});
var $danfishgold$base64_bytes$Decode$bitsToCharSpecialized = F4(
	function (bits1, bits2, bits3, accum) {
		var z = $danfishgold$base64_bytes$Decode$unsafeToChar((bits3 >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var y = $danfishgold$base64_bytes$Decode$unsafeToChar((bits3 >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var x = $danfishgold$base64_bytes$Decode$unsafeToChar(bits3 >>> 18);
		var w = $danfishgold$base64_bytes$Decode$unsafeToChar(bits3 & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var s = $danfishgold$base64_bytes$Decode$unsafeToChar(bits1 & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var r = $danfishgold$base64_bytes$Decode$unsafeToChar((bits1 >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var q = $danfishgold$base64_bytes$Decode$unsafeToChar((bits1 >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var p = $danfishgold$base64_bytes$Decode$unsafeToChar(bits1 >>> 18);
		var d = $danfishgold$base64_bytes$Decode$unsafeToChar(bits2 & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var c = $danfishgold$base64_bytes$Decode$unsafeToChar((bits2 >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var b = $danfishgold$base64_bytes$Decode$unsafeToChar((bits2 >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var a = $danfishgold$base64_bytes$Decode$unsafeToChar(bits2 >>> 18);
		return A2(
			$elm$core$String$cons,
			x,
			A2(
				$elm$core$String$cons,
				y,
				A2(
					$elm$core$String$cons,
					z,
					A2(
						$elm$core$String$cons,
						w,
						A2(
							$elm$core$String$cons,
							a,
							A2(
								$elm$core$String$cons,
								b,
								A2(
									$elm$core$String$cons,
									c,
									A2(
										$elm$core$String$cons,
										d,
										A2(
											$elm$core$String$cons,
											p,
											A2(
												$elm$core$String$cons,
												q,
												A2(
													$elm$core$String$cons,
													r,
													A2($elm$core$String$cons, s, accum))))))))))));
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $danfishgold$base64_bytes$Decode$decode18Help = F5(
	function (a, b, c, d, e) {
		var combined6 = ((255 & d) << 16) | e;
		var combined5 = d >>> 8;
		var combined4 = 16777215 & c;
		var combined3 = ((65535 & b) << 8) | (c >>> 24);
		var combined2 = ((255 & a) << 16) | (b >>> 16);
		var combined1 = a >>> 8;
		return A4(
			$danfishgold$base64_bytes$Decode$bitsToCharSpecialized,
			combined3,
			combined2,
			combined1,
			A4($danfishgold$base64_bytes$Decode$bitsToCharSpecialized, combined6, combined5, combined4, ''));
	});
var $elm$bytes$Bytes$Decode$map5 = F6(
	function (func, _v0, _v1, _v2, _v3, _v4) {
		var decodeA = _v0;
		var decodeB = _v1;
		var decodeC = _v2;
		var decodeD = _v3;
		var decodeE = _v4;
		return F2(
			function (bites, offset) {
				var _v5 = A2(decodeA, bites, offset);
				var aOffset = _v5.a;
				var a = _v5.b;
				var _v6 = A2(decodeB, bites, aOffset);
				var bOffset = _v6.a;
				var b = _v6.b;
				var _v7 = A2(decodeC, bites, bOffset);
				var cOffset = _v7.a;
				var c = _v7.b;
				var _v8 = A2(decodeD, bites, cOffset);
				var dOffset = _v8.a;
				var d = _v8.b;
				var _v9 = A2(decodeE, bites, dOffset);
				var eOffset = _v9.a;
				var e = _v9.b;
				return _Utils_Tuple2(
					eOffset,
					A5(func, a, b, c, d, e));
			});
	});
var $elm$bytes$Bytes$BE = 1;
var $elm$bytes$Bytes$Decode$unsignedInt16 = function (endianness) {
	return _Bytes_read_u16(!endianness);
};
var $danfishgold$base64_bytes$Decode$u16BE = $elm$bytes$Bytes$Decode$unsignedInt16(1);
var $elm$bytes$Bytes$Decode$unsignedInt32 = function (endianness) {
	return _Bytes_read_u32(!endianness);
};
var $danfishgold$base64_bytes$Decode$u32BE = $elm$bytes$Bytes$Decode$unsignedInt32(1);
var $danfishgold$base64_bytes$Decode$decode18Bytes = A6($elm$bytes$Bytes$Decode$map5, $danfishgold$base64_bytes$Decode$decode18Help, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u16BE);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$bytes$Bytes$Decode$map = F2(
	function (func, _v0) {
		var decodeA = _v0;
		return F2(
			function (bites, offset) {
				var _v1 = A2(decodeA, bites, offset);
				var aOffset = _v1.a;
				var a = _v1.b;
				return _Utils_Tuple2(
					aOffset,
					func(a));
			});
	});
var $elm$bytes$Bytes$Decode$map2 = F3(
	function (func, _v0, _v1) {
		var decodeA = _v0;
		var decodeB = _v1;
		return F2(
			function (bites, offset) {
				var _v2 = A2(decodeA, bites, offset);
				var aOffset = _v2.a;
				var a = _v2.b;
				var _v3 = A2(decodeB, bites, aOffset);
				var bOffset = _v3.a;
				var b = _v3.b;
				return _Utils_Tuple2(
					bOffset,
					A2(func, a, b));
			});
	});
var $elm$bytes$Bytes$Decode$map3 = F4(
	function (func, _v0, _v1, _v2) {
		var decodeA = _v0;
		var decodeB = _v1;
		var decodeC = _v2;
		return F2(
			function (bites, offset) {
				var _v3 = A2(decodeA, bites, offset);
				var aOffset = _v3.a;
				var a = _v3.b;
				var _v4 = A2(decodeB, bites, aOffset);
				var bOffset = _v4.a;
				var b = _v4.b;
				var _v5 = A2(decodeC, bites, bOffset);
				var cOffset = _v5.a;
				var c = _v5.b;
				return _Utils_Tuple2(
					cOffset,
					A3(func, a, b, c));
			});
	});
var $elm$bytes$Bytes$Decode$succeed = function (a) {
	return F2(
		function (_v0, offset) {
			return _Utils_Tuple2(offset, a);
		});
};
var $elm$bytes$Bytes$Decode$unsignedInt8 = _Bytes_read_u8;
var $danfishgold$base64_bytes$Decode$loopHelp = function (_v0) {
	var remaining = _v0.aZ;
	var string = _v0.a0;
	if (remaining >= 18) {
		return A2(
			$elm$bytes$Bytes$Decode$map,
			function (result) {
				return $elm$bytes$Bytes$Decode$Loop(
					{
						aZ: remaining - 18,
						a0: _Utils_ap(string, result)
					});
			},
			$danfishgold$base64_bytes$Decode$decode18Bytes);
	} else {
		if (remaining >= 3) {
			var helper = F3(
				function (a, b, c) {
					var combined = ((a << 16) | (b << 8)) | c;
					return $elm$bytes$Bytes$Decode$Loop(
						{
							aZ: remaining - 3,
							a0: _Utils_ap(
								string,
								A2($danfishgold$base64_bytes$Decode$bitsToChars, combined, 0))
						});
				});
			return A4($elm$bytes$Bytes$Decode$map3, helper, $elm$bytes$Bytes$Decode$unsignedInt8, $elm$bytes$Bytes$Decode$unsignedInt8, $elm$bytes$Bytes$Decode$unsignedInt8);
		} else {
			if (!remaining) {
				return $elm$bytes$Bytes$Decode$succeed(
					$elm$bytes$Bytes$Decode$Done(string));
			} else {
				if (remaining === 2) {
					var helper = F2(
						function (a, b) {
							var combined = (a << 16) | (b << 8);
							return $elm$bytes$Bytes$Decode$Done(
								_Utils_ap(
									string,
									A2($danfishgold$base64_bytes$Decode$bitsToChars, combined, 1)));
						});
					return A3($elm$bytes$Bytes$Decode$map2, helper, $elm$bytes$Bytes$Decode$unsignedInt8, $elm$bytes$Bytes$Decode$unsignedInt8);
				} else {
					return A2(
						$elm$bytes$Bytes$Decode$map,
						function (a) {
							return $elm$bytes$Bytes$Decode$Done(
								_Utils_ap(
									string,
									A2($danfishgold$base64_bytes$Decode$bitsToChars, a << 16, 2)));
						},
						$elm$bytes$Bytes$Decode$unsignedInt8);
				}
			}
		}
	}
};
var $danfishgold$base64_bytes$Decode$decoder = function (width) {
	return A2(
		$elm$bytes$Bytes$Decode$loop,
		{aZ: width, a0: ''},
		$danfishgold$base64_bytes$Decode$loopHelp);
};
var $elm$bytes$Bytes$width = _Bytes_width;
var $danfishgold$base64_bytes$Decode$fromBytes = function (bytes) {
	return A2(
		$elm$bytes$Bytes$Decode$decode,
		$danfishgold$base64_bytes$Decode$decoder(
			$elm$bytes$Bytes$width(bytes)),
		bytes);
};
var $danfishgold$base64_bytes$Base64$fromBytes = $danfishgold$base64_bytes$Decode$fromBytes;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Game$Protocol$Util$toPacket = F2(
	function (encode, out) {
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			$danfishgold$base64_bytes$Base64$fromBytes(
				$elm$bytes$Bytes$Encode$encode(
					$elm$bytes$Bytes$Encode$sequence(
						A2($elm$core$List$map, encode, out)))));
	});
var $author$project$Durak$Spectator$System$Tick$output = function (out) {
	return _Utils_eq(out, _List_Nil) ? $elm$core$Platform$Cmd$none : $author$project$Game$Client$Port$output(
		A2($author$project$Game$Protocol$Util$toPacket, $author$project$Durak$Protocol$Player$encode, out));
};
var $justgook$webgl_playground$Playground$intFromHexChar = function (s) {
	switch (s) {
		case '0':
			return $elm$core$Maybe$Just(0);
		case '1':
			return $elm$core$Maybe$Just(1);
		case '2':
			return $elm$core$Maybe$Just(2);
		case '3':
			return $elm$core$Maybe$Just(3);
		case '4':
			return $elm$core$Maybe$Just(4);
		case '5':
			return $elm$core$Maybe$Just(5);
		case '6':
			return $elm$core$Maybe$Just(6);
		case '7':
			return $elm$core$Maybe$Just(7);
		case '8':
			return $elm$core$Maybe$Just(8);
		case '9':
			return $elm$core$Maybe$Just(9);
		case 'a':
			return $elm$core$Maybe$Just(10);
		case 'b':
			return $elm$core$Maybe$Just(11);
		case 'c':
			return $elm$core$Maybe$Just(12);
		case 'd':
			return $elm$core$Maybe$Just(13);
		case 'e':
			return $elm$core$Maybe$Just(14);
		case 'f':
			return $elm$core$Maybe$Just(15);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $justgook$webgl_playground$Playground$maybeMap6 = F7(
	function (func, ma, mb, mc, md, me, mf) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				if (mc.$ === 1) {
					return $elm$core$Maybe$Nothing;
				} else {
					var c = mc.a;
					if (md.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var d = md.a;
						if (me.$ === 1) {
							return $elm$core$Maybe$Nothing;
						} else {
							var e = me.a;
							if (mf.$ === 1) {
								return $elm$core$Maybe$Nothing;
							} else {
								var f = mf.a;
								return $elm$core$Maybe$Just(
									A6(func, a, b, c, d, e, f));
							}
						}
					}
				}
			}
		}
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $elm_explorations$linear_algebra$Math$Vector3$vec3 = _MJS_v3;
var $justgook$webgl_playground$Playground$hexColor2Vec3 = function (str) {
	var withoutHash = A2($elm$core$String$startsWith, '#', str) ? A2($elm$core$String$dropLeft, 1, str) : str;
	var _v0 = $elm$core$String$toList(withoutHash);
	if ((((((_v0.b && _v0.b.b) && _v0.b.b.b) && _v0.b.b.b.b) && _v0.b.b.b.b.b) && _v0.b.b.b.b.b.b) && (!_v0.b.b.b.b.b.b.b)) {
		var r1 = _v0.a;
		var _v1 = _v0.b;
		var r2 = _v1.a;
		var _v2 = _v1.b;
		var g1 = _v2.a;
		var _v3 = _v2.b;
		var g2 = _v3.a;
		var _v4 = _v3.b;
		var b1 = _v4.a;
		var _v5 = _v4.b;
		var b2 = _v5.a;
		return A7(
			$justgook$webgl_playground$Playground$maybeMap6,
			F6(
				function (a, b, c, d, e, f) {
					return A3($elm_explorations$linear_algebra$Math$Vector3$vec3, ((a * 16) + b) / 255, ((c * 16) + d) / 255, ((e * 16) + f) / 255);
				}),
			$justgook$webgl_playground$Playground$intFromHexChar(r1),
			$justgook$webgl_playground$Playground$intFromHexChar(r2),
			$justgook$webgl_playground$Playground$intFromHexChar(g1),
			$justgook$webgl_playground$Playground$intFromHexChar(g2),
			$justgook$webgl_playground$Playground$intFromHexChar(b1),
			$justgook$webgl_playground$Playground$intFromHexChar(b2));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $justgook$webgl_playground$Playground$black = A2(
	$elm$core$Maybe$withDefault,
	A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 0, 0),
	$justgook$webgl_playground$Playground$hexColor2Vec3('#000000'));
var $elm$core$String$fromList = _String_fromList;
var $pablohirafuji$elm_qrcode$QRCode$Quartile = 2;
var $pablohirafuji$elm_qrcode$QRCode$QRCode = $elm$core$Basics$identity;
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex = F3(
	function (size, row, col) {
		return (size * row) + col;
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$isOccupy = F4(
	function (row, col, size, matrix) {
		var _v0 = A2(
			$elm$core$Array$get,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			matrix);
		if ((!_v0.$) && (!_v0.a.$)) {
			return true;
		} else {
			return false;
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$nextModule = function (placement) {
	var row = placement.bu;
	var col = placement.L;
	var isRight = placement.Y;
	var isUp = placement.ay;
	return isRight ? _Utils_update(
		placement,
		{L: col - 1, Y: false}) : (isUp ? _Utils_update(
		placement,
		{L: col + 1, Y: true, bu: row - 1}) : _Utils_update(
		placement,
		{L: col + 1, Y: true, bu: row + 1}));
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$bitToColor = F2(
	function (_byte, offset) {
		return (1 & (_byte >> (7 - offset))) === 1;
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_v0.$) {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setDataModule = F3(
	function (_v0, _byte, offset) {
		var size = _v0.a$;
		var row = _v0.bu;
		var col = _v0.L;
		return A2(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			$elm$core$Maybe$Just(
				_Utils_Tuple2(
					false,
					A2($pablohirafuji$elm_qrcode$QRCode$Matrix$bitToColor, _byte, offset))));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$addDataModule = F4(
	function (placement, bytes, offset, matrix) {
		addDataModule:
		while (true) {
			var size = placement.a$;
			var row = placement.bu;
			var col = placement.L;
			if (!bytes.b) {
				return matrix;
			} else {
				var head = bytes.a;
				var tail = bytes.b;
				if (offset >= 8) {
					var $temp$placement = placement,
						$temp$bytes = tail,
						$temp$offset = 0,
						$temp$matrix = matrix;
					placement = $temp$placement;
					bytes = $temp$bytes;
					offset = $temp$offset;
					matrix = $temp$matrix;
					continue addDataModule;
				} else {
					if (col === 6) {
						var $temp$placement = _Utils_update(
							placement,
							{L: col - 1, Y: true}),
							$temp$bytes = bytes,
							$temp$offset = offset,
							$temp$matrix = matrix;
						placement = $temp$placement;
						bytes = $temp$bytes;
						offset = $temp$offset;
						matrix = $temp$matrix;
						continue addDataModule;
					} else {
						if (row < 0) {
							var $temp$placement = _Utils_update(
								placement,
								{L: col - 2, Y: true, ay: false, bu: 0}),
								$temp$bytes = bytes,
								$temp$offset = offset,
								$temp$matrix = matrix;
							placement = $temp$placement;
							bytes = $temp$bytes;
							offset = $temp$offset;
							matrix = $temp$matrix;
							continue addDataModule;
						} else {
							if (_Utils_cmp(row, size) > -1) {
								var $temp$placement = _Utils_update(
									placement,
									{L: col - 2, Y: true, ay: true, bu: size - 1}),
									$temp$bytes = bytes,
									$temp$offset = offset,
									$temp$matrix = matrix;
								placement = $temp$placement;
								bytes = $temp$bytes;
								offset = $temp$offset;
								matrix = $temp$matrix;
								continue addDataModule;
							} else {
								if (A4($pablohirafuji$elm_qrcode$QRCode$Matrix$isOccupy, row, col, size, matrix)) {
									var $temp$placement = $pablohirafuji$elm_qrcode$QRCode$Matrix$nextModule(placement),
										$temp$bytes = bytes,
										$temp$offset = offset,
										$temp$matrix = matrix;
									placement = $temp$placement;
									bytes = $temp$bytes;
									offset = $temp$offset;
									matrix = $temp$matrix;
									continue addDataModule;
								} else {
									var $temp$placement = $pablohirafuji$elm_qrcode$QRCode$Matrix$nextModule(placement),
										$temp$bytes = bytes,
										$temp$offset = offset + 1,
										$temp$matrix = A4($pablohirafuji$elm_qrcode$QRCode$Matrix$setDataModule, placement, head, offset, matrix);
									placement = $temp$placement;
									bytes = $temp$bytes;
									offset = $temp$offset;
									matrix = $temp$matrix;
									continue addDataModule;
								}
							}
						}
					}
				}
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$initPlacement = function (size) {
	return {L: size + 1, Y: true, ay: true, bu: size + 1, a$: size};
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$addData = F3(
	function (size, bytes, matrix) {
		return A4(
			$pablohirafuji$elm_qrcode$QRCode$Matrix$addDataModule,
			$pablohirafuji$elm_qrcode$QRCode$Matrix$initPlacement(size),
			bytes,
			0,
			matrix);
	});
var $pablohirafuji$elm_qrcode$QRCode$Error$AlignmentPatternNotFound = {$: 0};
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{q: nodeList, l: nodeListSize, p: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPatternData = $elm$core$Array$fromList(
	_List_fromArray(
		[
			_List_Nil,
			_List_fromArray(
			[6, 18]),
			_List_fromArray(
			[6, 22]),
			_List_fromArray(
			[6, 26]),
			_List_fromArray(
			[6, 30]),
			_List_fromArray(
			[6, 34]),
			_List_fromArray(
			[6, 22, 38]),
			_List_fromArray(
			[6, 24, 42]),
			_List_fromArray(
			[6, 26, 46]),
			_List_fromArray(
			[6, 28, 50]),
			_List_fromArray(
			[6, 30, 54]),
			_List_fromArray(
			[6, 32, 58]),
			_List_fromArray(
			[6, 34, 62]),
			_List_fromArray(
			[6, 26, 46, 66]),
			_List_fromArray(
			[6, 26, 48, 70]),
			_List_fromArray(
			[6, 26, 50, 74]),
			_List_fromArray(
			[6, 30, 54, 78]),
			_List_fromArray(
			[6, 30, 56, 82]),
			_List_fromArray(
			[6, 30, 58, 86]),
			_List_fromArray(
			[6, 34, 62, 90]),
			_List_fromArray(
			[6, 28, 50, 72, 94]),
			_List_fromArray(
			[6, 26, 50, 74, 98]),
			_List_fromArray(
			[6, 30, 54, 78, 102]),
			_List_fromArray(
			[6, 28, 54, 80, 106]),
			_List_fromArray(
			[6, 32, 58, 84, 110]),
			_List_fromArray(
			[6, 30, 58, 86, 114]),
			_List_fromArray(
			[6, 34, 62, 90, 118]),
			_List_fromArray(
			[6, 26, 50, 74, 98, 122]),
			_List_fromArray(
			[6, 30, 54, 78, 102, 126]),
			_List_fromArray(
			[6, 26, 52, 78, 104, 130]),
			_List_fromArray(
			[6, 30, 56, 82, 108, 134]),
			_List_fromArray(
			[6, 34, 60, 86, 112, 138]),
			_List_fromArray(
			[6, 30, 58, 86, 114, 142]),
			_List_fromArray(
			[6, 34, 62, 90, 118, 146]),
			_List_fromArray(
			[6, 30, 54, 78, 102, 126, 150]),
			_List_fromArray(
			[6, 24, 50, 76, 102, 128, 154]),
			_List_fromArray(
			[6, 28, 54, 80, 106, 132, 158]),
			_List_fromArray(
			[6, 32, 58, 84, 110, 136, 162]),
			_List_fromArray(
			[6, 26, 54, 82, 110, 138, 166]),
			_List_fromArray(
			[6, 30, 58, 86, 114, 142, 170])
		]));
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (!maybe.$) {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord = F2(
	function (rows, cols) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (row, list) {
					return A3(
						$elm$core$List$foldl,
						F2(
							function (col, list_) {
								return A2(
									$elm$core$List$cons,
									_Utils_Tuple2(row, col),
									list_);
							}),
						list,
						cols);
				}),
			_List_Nil,
			rows);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$isValidAlign = F2(
	function (size, _v0) {
		var row = _v0.a;
		var col = _v0.b;
		return ((row > 10) || ((10 < col) && (_Utils_cmp(col, size - 10) < 0))) && ((_Utils_cmp(row, size - 10) < 0) || (col > 10));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentRange = A2($elm$core$List$range, -2, 2);
var $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentColor = F2(
	function (row, col) {
		return (_Utils_eq(row, -2) || ((row === 2) || (_Utils_eq(col, -2) || ((col === 2) || ((!row) && (!col)))))) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(true, true)) : $elm$core$Maybe$Just(
			_Utils_Tuple2(true, false));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignModule = F4(
	function (size, rowPos, colPos, _v0) {
		var row = _v0.a;
		var col = _v0.b;
		return A2(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row + rowPos, col + colPos),
			A2($pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentColor, row, col));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignment = F3(
	function (size, _v0, matrix) {
		var row = _v0.a;
		var col = _v0.b;
		return A3(
			$elm$core$List$foldl,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignModule, size, row, col),
			matrix,
			A2($pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord, $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentRange, $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentRange));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignments = F3(
	function (size, locations, matrix) {
		return A3(
			$elm$core$List$foldl,
			$pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignment(size),
			matrix,
			A2(
				$elm$core$List$filter,
				$pablohirafuji$elm_qrcode$QRCode$Matrix$isValidAlign(size),
				A2($pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord, locations, locations)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPattern = F3(
	function (version, size, matrix) {
		return A2(
			$elm$core$Result$map,
			function (a) {
				return A3($pablohirafuji$elm_qrcode$QRCode$Matrix$setAlignments, size, a, matrix);
			},
			A2(
				$elm$core$Result$fromMaybe,
				$pablohirafuji$elm_qrcode$QRCode$Error$AlignmentPatternNotFound,
				A2($elm$core$Array$get, version - 1, $pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPatternData)));
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$darkModule = F2(
	function (version, size) {
		return A2(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, (4 * version) + 9, 8),
			$elm$core$Maybe$Just(
				_Utils_Tuple2(true, true)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$finderRange = A2($elm$core$List$range, 0, 8);
var $pablohirafuji$elm_qrcode$QRCode$Matrix$finderColor = F2(
	function (row, col) {
		return ((1 <= row) && ((row <= 7) && ((col === 1) || (col === 7)))) || (((1 <= col) && ((col <= 7) && ((row === 1) || (row === 7)))) || ((3 <= row) && ((row <= 5) && ((3 <= col) && (col <= 5)))));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setFinder = F5(
	function (size, rowOffset, colOffset, _v0, matrix) {
		var row = _v0.a;
		var col = _v0.b;
		var finalRow = row + rowOffset;
		var finalCol = col + colOffset;
		return ((finalRow < 0) || ((finalCol < 0) || ((_Utils_cmp(finalRow, size) > -1) || (_Utils_cmp(finalCol, size) > -1)))) ? matrix : A3(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, finalRow, finalCol),
			$elm$core$Maybe$Just(
				_Utils_Tuple2(
					true,
					A2($pablohirafuji$elm_qrcode$QRCode$Matrix$finderColor, row, col))),
			matrix);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern = F4(
	function (size, rowOffset, colOffset, matrix) {
		return A3(
			$elm$core$List$foldl,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$setFinder, size, rowOffset, colOffset),
			matrix,
			A2($pablohirafuji$elm_qrcode$QRCode$Matrix$getAreaCoord, $pablohirafuji$elm_qrcode$QRCode$Matrix$finderRange, $pablohirafuji$elm_qrcode$QRCode$Matrix$finderRange));
	});
var $elm$core$Basics$not = _Basics_not;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskColor = F2(
	function (maybeModule, isChange) {
		if (isChange) {
			if ((!maybeModule.$) && (!maybeModule.a.a)) {
				var _v1 = maybeModule.a;
				var isDark = _v1.b;
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(false, !isDark));
			} else {
				return maybeModule;
			}
		} else {
			return maybeModule;
		}
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getCoord = F2(
	function (size, index) {
		return _Utils_Tuple2(
			(index / size) | 0,
			A2($elm$core$Basics$modBy, size, index));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskFunction = F4(
	function (_function, size, index, maybeModule) {
		return A2(
			$pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskColor,
			maybeModule,
			_function(
				A2($pablohirafuji$elm_qrcode$QRCode$Matrix$getCoord, size, index)));
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var $elm$core$Array$indexedMap = F2(
	function (func, _v0) {
		var len = _v0.a;
		var tree = _v0.c;
		var tail = _v0.d;
		var initialBuilder = {
			q: _List_Nil,
			l: 0,
			p: A3(
				$elm$core$Elm$JsArray$indexedMap,
				func,
				$elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.l * $elm$core$Array$branchFactor;
					var mappedLeaf = $elm$core$Array$Leaf(
						A3($elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						q: A2($elm$core$List$cons, mappedLeaf, builder.q),
						l: builder.l + 1,
						p: builder.p
					};
				}
			});
		return A2(
			$elm$core$Array$builderToArray,
			true,
			A3($elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$maskFunction = function (mask) {
	switch (mask) {
		case 0:
			return function (_v1) {
				var row = _v1.a;
				var col = _v1.b;
				return !A2($elm$core$Basics$modBy, 2, row + col);
			};
		case 1:
			return function (_v2) {
				var row = _v2.a;
				return !A2($elm$core$Basics$modBy, 2, row);
			};
		case 2:
			return function (_v3) {
				var col = _v3.b;
				return !A2($elm$core$Basics$modBy, 3, col);
			};
		case 3:
			return function (_v4) {
				var row = _v4.a;
				var col = _v4.b;
				return !A2($elm$core$Basics$modBy, 3, row + col);
			};
		case 4:
			return function (_v5) {
				var row = _v5.a;
				var col = _v5.b;
				return !A2(
					$elm$core$Basics$modBy,
					2,
					$elm$core$Basics$floor(row / 2) + $elm$core$Basics$floor(col / 3));
			};
		case 5:
			return function (_v6) {
				var row = _v6.a;
				var col = _v6.b;
				return !(A2($elm$core$Basics$modBy, 2, row * col) + A2($elm$core$Basics$modBy, 3, row * col));
			};
		case 6:
			return function (_v7) {
				var row = _v7.a;
				var col = _v7.b;
				return !A2(
					$elm$core$Basics$modBy,
					2,
					A2($elm$core$Basics$modBy, 2, row * col) + A2($elm$core$Basics$modBy, 3, row * col));
			};
		default:
			return function (_v8) {
				var row = _v8.a;
				var col = _v8.b;
				return !A2(
					$elm$core$Basics$modBy,
					2,
					A2($elm$core$Basics$modBy, 3, row * col) + A2($elm$core$Basics$modBy, 2, row + col));
			};
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$applyMask = F3(
	function (size, mask, matrix) {
		return A2(
			$elm$core$Array$indexedMap,
			A2(
				$pablohirafuji$elm_qrcode$QRCode$Matrix$applyMaskFunction,
				$pablohirafuji$elm_qrcode$QRCode$Matrix$maskFunction(mask),
				size),
			matrix);
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$breakList = F3(
	function (width, list, acc) {
		breakList:
		while (true) {
			if (!list.b) {
				return $elm$core$List$reverse(acc);
			} else {
				var $temp$width = width,
					$temp$list = A2($elm$core$List$drop, width, list),
					$temp$acc = A2(
					$elm$core$List$cons,
					A2($elm$core$List$take, width, list),
					acc);
				width = $temp$width;
				list = $temp$list;
				acc = $temp$acc;
				continue breakList;
			}
		}
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$isDarkModule = A2(
	$elm$core$Basics$composeR,
	$elm$core$Maybe$map($elm$core$Tuple$second),
	$elm$core$Maybe$withDefault(false));
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score_ = F2(
	function (simplifiedList, _v0) {
		rule1Score_:
		while (true) {
			var last = _v0.a;
			var partialScore = _v0.b;
			var score = _v0.c;
			if (!simplifiedList.b) {
				return (partialScore >= 5) ? ((score + partialScore) - 2) : score;
			} else {
				var head = simplifiedList.a;
				var tail = simplifiedList.b;
				if (_Utils_eq(last, head)) {
					var $temp$simplifiedList = tail,
						$temp$_v0 = _Utils_Tuple3(last, partialScore + 1, score);
					simplifiedList = $temp$simplifiedList;
					_v0 = $temp$_v0;
					continue rule1Score_;
				} else {
					if (partialScore >= 5) {
						var $temp$simplifiedList = tail,
							$temp$_v0 = _Utils_Tuple3(head, 0, (score + partialScore) - 2);
						simplifiedList = $temp$simplifiedList;
						_v0 = $temp$_v0;
						continue rule1Score_;
					} else {
						var $temp$simplifiedList = tail,
							$temp$_v0 = _Utils_Tuple3(head, 0, score);
						simplifiedList = $temp$simplifiedList;
						_v0 = $temp$_v0;
						continue rule1Score_;
					}
				}
			}
		}
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score = A2(
	$elm$core$Basics$composeR,
	$elm$core$List$map(
		function (a) {
			return A2(
				$pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score_,
				a,
				_Utils_Tuple3(false, 0, 0));
		}),
	$elm$core$List$sum);
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score_ = F4(
	function (row1, row2, maybeLast, score) {
		rule2Score_:
		while (true) {
			if (!row1.b) {
				return score;
			} else {
				var head = row1.a;
				var tail = row1.b;
				if (!row2.b) {
					return score;
				} else {
					var head2 = row2.a;
					var tail2 = row2.b;
					if (_Utils_eq(head, head2)) {
						if (_Utils_eq(
							$elm$core$Maybe$Just(head),
							maybeLast)) {
							var $temp$row1 = tail,
								$temp$row2 = tail2,
								$temp$maybeLast = $elm$core$Maybe$Just(head),
								$temp$score = score + 3;
							row1 = $temp$row1;
							row2 = $temp$row2;
							maybeLast = $temp$maybeLast;
							score = $temp$score;
							continue rule2Score_;
						} else {
							var $temp$row1 = tail,
								$temp$row2 = tail2,
								$temp$maybeLast = $elm$core$Maybe$Just(head),
								$temp$score = score;
							row1 = $temp$row1;
							row2 = $temp$row2;
							maybeLast = $temp$maybeLast;
							score = $temp$score;
							continue rule2Score_;
						}
					} else {
						var $temp$row1 = tail,
							$temp$row2 = tail2,
							$temp$maybeLast = $elm$core$Maybe$Nothing,
							$temp$score = score;
						row1 = $temp$row1;
						row2 = $temp$row2;
						maybeLast = $temp$maybeLast;
						score = $temp$score;
						continue rule2Score_;
					}
				}
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score = F2(
	function (list, score) {
		rule2Score:
		while (true) {
			if (list.b && list.b.b) {
				var head1 = list.a;
				var _v1 = list.b;
				var head2 = _v1.a;
				var tail = _v1.b;
				var $temp$list = tail,
					$temp$score = score + A4($pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score_, head1, head2, $elm$core$Maybe$Nothing, 0);
				list = $temp$list;
				score = $temp$score;
				continue rule2Score;
			} else {
				return score;
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score_ = F2(
	function (simplifiedList, score) {
		rule3Score_:
		while (true) {
			_v0$3:
			while (true) {
				if (!simplifiedList.b) {
					return score;
				} else {
					if (!simplifiedList.a) {
						if (((((((((((((((((((simplifiedList.b.b && (!simplifiedList.b.a)) && simplifiedList.b.b.b) && (!simplifiedList.b.b.a)) && simplifiedList.b.b.b.b) && (!simplifiedList.b.b.b.a)) && simplifiedList.b.b.b.b.b) && simplifiedList.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.b.b.b.b.a) {
							var _v1 = simplifiedList.b;
							var _v2 = _v1.b;
							var _v3 = _v2.b;
							var _v4 = _v3.b;
							var _v5 = _v4.b;
							var _v6 = _v5.b;
							var _v7 = _v6.b;
							var _v8 = _v7.b;
							var _v9 = _v8.b;
							var _v10 = _v9.b;
							var tail = _v10.b;
							var $temp$simplifiedList = tail,
								$temp$score = score + 40;
							simplifiedList = $temp$simplifiedList;
							score = $temp$score;
							continue rule3Score_;
						} else {
							break _v0$3;
						}
					} else {
						if (((((((((((((((((((simplifiedList.b.b && (!simplifiedList.b.a)) && simplifiedList.b.b.b) && simplifiedList.b.b.a) && simplifiedList.b.b.b.b) && simplifiedList.b.b.b.a) && simplifiedList.b.b.b.b.b) && simplifiedList.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b) && simplifiedList.b.b.b.b.b.b.a) && simplifiedList.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.b.a)) && simplifiedList.b.b.b.b.b.b.b.b.b.b.b) && (!simplifiedList.b.b.b.b.b.b.b.b.b.b.a)) {
							var _v11 = simplifiedList.b;
							var _v12 = _v11.b;
							var _v13 = _v12.b;
							var _v14 = _v13.b;
							var _v15 = _v14.b;
							var _v16 = _v15.b;
							var _v17 = _v16.b;
							var _v18 = _v17.b;
							var _v19 = _v18.b;
							var _v20 = _v19.b;
							var tail = _v20.b;
							var $temp$simplifiedList = tail,
								$temp$score = score + 40;
							simplifiedList = $temp$simplifiedList;
							score = $temp$score;
							continue rule3Score_;
						} else {
							break _v0$3;
						}
					}
				}
			}
			var head = simplifiedList.a;
			var tail = simplifiedList.b;
			var $temp$simplifiedList = tail,
				$temp$score = score;
			simplifiedList = $temp$simplifiedList;
			score = $temp$score;
			continue rule3Score_;
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score = A2($elm$core$List$foldl, $pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score_, 0);
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$rule4Score = F2(
	function (size, simplifiedList) {
		var moduleCount = size * size;
		var darkCount = $elm$core$List$length(
			A2($elm$core$List$filter, $elm$core$Basics$identity, simplifiedList));
		var darkPerc = $elm$core$Basics$round((100 * darkCount) / moduleCount);
		var remOf5 = darkPerc % 5;
		var nextMult5 = $elm$core$Basics$round(
			$elm$core$Basics$abs((darkPerc + (5 - remOf5)) - 50) / 5);
		var prevMult5 = $elm$core$Basics$round(
			$elm$core$Basics$abs((darkPerc - remOf5) - 50) / 5);
		return A2($elm$core$Basics$min, prevMult5, nextMult5) * 10;
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Helpers$transpose = function (ll) {
	transpose:
	while (true) {
		if (!ll.b) {
			return _List_Nil;
		} else {
			if (!ll.a.b) {
				var xss = ll.b;
				var $temp$ll = xss;
				ll = $temp$ll;
				continue transpose;
			} else {
				var _v1 = ll.a;
				var x = _v1.a;
				var xs = _v1.b;
				var xss = ll.b;
				var tails = A2($elm$core$List$filterMap, $elm$core$List$tail, xss);
				var heads = A2($elm$core$List$filterMap, $elm$core$List$head, xss);
				return A2(
					$elm$core$List$cons,
					A2($elm$core$List$cons, x, heads),
					$pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(
						A2($elm$core$List$cons, xs, tails)));
			}
		}
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getMaskScore = F2(
	function (size, matrix) {
		var list = A2(
			$elm$core$List$map,
			$pablohirafuji$elm_qrcode$QRCode$Matrix$isDarkModule,
			$elm$core$Array$toList(matrix));
		var rowList = A3($pablohirafuji$elm_qrcode$QRCode$Matrix$breakList, size, list, _List_Nil);
		var transposedRowList = $pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(rowList);
		return function (b) {
			return _Utils_Tuple2(rowList, b);
		}(
			A2($pablohirafuji$elm_qrcode$QRCode$Matrix$rule4Score, size, list) + ($pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score(transposedRowList) + ($pablohirafuji$elm_qrcode$QRCode$Matrix$rule3Score(rowList) + (A2($pablohirafuji$elm_qrcode$QRCode$Matrix$rule2Score, rowList, 0) + ($pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score(transposedRowList) + $pablohirafuji$elm_qrcode$QRCode$Matrix$rule1Score(rowList))))));
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$ecLevelToInt = function (ecLevel) {
	switch (ecLevel) {
		case 0:
			return 1;
		case 1:
			return 0;
		case 2:
			return 3;
		default:
			return 2;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit = function (_int) {
	var helper = F2(
		function (digit, int_) {
			helper:
			while (true) {
				if (!(!int_)) {
					var $temp$digit = digit + 1,
						$temp$int_ = int_ >>> 1;
					digit = $temp$digit;
					int_ = $temp$int_;
					continue helper;
				} else {
					return digit;
				}
			}
		});
	return A2(helper, 0, _int);
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$maskToInt = function (mask) {
	switch (mask) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 3;
		case 4:
			return 4;
		case 5:
			return 5;
		case 6:
			return 6;
		default:
			return 7;
	}
};
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$encodeFormatInfo = F2(
	function (ecLevel, mask) {
		var g15Mask = 21522;
		var g15Int = 1335;
		var g15Digit = $pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(g15Int);
		var formatInfoInt = $pablohirafuji$elm_qrcode$QRCode$Matrix$maskToInt(mask) | ($pablohirafuji$elm_qrcode$QRCode$Matrix$ecLevelToInt(ecLevel) << 3);
		var helper = function (d_) {
			helper:
			while (true) {
				if (($pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g15Digit) >= 0) {
					var $temp$d_ = d_ ^ (g15Int << ($pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g15Digit));
					d_ = $temp$d_;
					continue helper;
				} else {
					return g15Mask ^ (d_ | (formatInfoInt << 10));
				}
			}
		};
		var d = formatInfoInt << 10;
		return helper(d);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoHorizontal = F2(
	function (size, count) {
		return (count < 8) ? _Utils_Tuple2(8, (size - count) - 1) : ((count < 9) ? _Utils_Tuple2(8, 15 - count) : _Utils_Tuple2(8, (15 - count) - 1));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoVertical = F2(
	function (size, count) {
		return (count < 6) ? _Utils_Tuple2(count, 8) : ((count < 8) ? _Utils_Tuple2(count + 1, 8) : _Utils_Tuple2((size - 15) + count, 8));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatModule = F4(
	function (size, isBlack, row, col) {
		return A2(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			$elm$core$Maybe$Just(
				_Utils_Tuple2(true, isBlack)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo_ = F4(
	function (size, isBlackFn, count, matrix) {
		setFormatInfo_:
		while (true) {
			if (count < 15) {
				var isBlack = isBlackFn(count);
				var _v0 = A2($pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoVertical, size, count);
				var x2 = _v0.a;
				var y2 = _v0.b;
				var _v1 = A2($pablohirafuji$elm_qrcode$QRCode$Matrix$formatInfoHorizontal, size, count);
				var x1 = _v1.a;
				var y1 = _v1.b;
				var $temp$size = size,
					$temp$isBlackFn = isBlackFn,
					$temp$count = count + 1,
					$temp$matrix = A5(
					$pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatModule,
					size,
					isBlack,
					x2,
					y2,
					A5($pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatModule, size, isBlack, x1, y1, matrix));
				size = $temp$size;
				isBlackFn = $temp$isBlackFn;
				count = $temp$count;
				matrix = $temp$matrix;
				continue setFormatInfo_;
			} else {
				return matrix;
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo = F4(
	function (ecLevel, size, mask, matrix) {
		var isBlack = F2(
			function (bits_, count) {
				return (1 & (bits_ >> count)) === 1;
			});
		var bits = A2($pablohirafuji$elm_qrcode$QRCode$Matrix$encodeFormatInfo, ecLevel, mask);
		return A4(
			$pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo_,
			size,
			isBlack(bits),
			0,
			matrix);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask_ = F5(
	function (ecLevel, size, matrix, mask, _v0) {
		var minSMatrix = _v0.a;
		var minScore = _v0.b;
		var maskedMatrix = A4(
			$pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo,
			ecLevel,
			size,
			mask,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$applyMask, size, mask, matrix));
		var _v1 = A2($pablohirafuji$elm_qrcode$QRCode$Matrix$getMaskScore, size, maskedMatrix);
		var maskSMatrix = _v1.a;
		var maskScore = _v1.b;
		return ((_Utils_cmp(minScore, maskScore) < 0) && (!_Utils_eq(minScore, -1))) ? _Utils_Tuple2(minSMatrix, minScore) : _Utils_Tuple2(maskSMatrix, maskScore);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern0 = 0;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern1 = 1;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern2 = 2;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern3 = 3;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern4 = 4;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern5 = 5;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern6 = 6;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$Pattern7 = 7;
var $pablohirafuji$elm_qrcode$QRCode$Matrix$patternList = _List_fromArray(
	[0, 1, 2, 3, 4, 5, 6, 7]);
var $pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask = F3(
	function (ecLevel, size, matrix) {
		return A3(
			$elm$core$List$foldl,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask_, ecLevel, size, matrix),
			_Utils_Tuple2(_List_Nil, -1),
			$pablohirafuji$elm_qrcode$QRCode$Matrix$patternList).a;
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$reserveFormatInfo = F2(
	function (size, matrix) {
		return A4(
			$pablohirafuji$elm_qrcode$QRCode$Matrix$setFormatInfo_,
			size,
			$elm$core$Basics$always(true),
			0,
			matrix);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$encodeVersionInfo = function (version) {
	var g18Int = 7973;
	var g18Digit = $pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(g18Int);
	var helper = function (d_) {
		helper:
		while (true) {
			if (($pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g18Digit) >= 0) {
				var $temp$d_ = d_ ^ (g18Int << ($pablohirafuji$elm_qrcode$QRCode$Matrix$getBCHDigit(d_) - g18Digit));
				d_ = $temp$d_;
				continue helper;
			} else {
				return d_ | (version << 12);
			}
		}
	};
	var d = version << 12;
	return helper(d);
};
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionModule = F3(
	function (size, isBlack, _v0) {
		var row = _v0.a;
		var col = _v0.b;
		return A2(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			$elm$core$Maybe$Just(
				_Utils_Tuple2(true, isBlack)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo_ = F4(
	function (size, isBlackFn, count, matrix) {
		setVersionInfo_:
		while (true) {
			if (count < 18) {
				var topRight = _Utils_Tuple2(
					$elm$core$Basics$floor(count / 3),
					((A2($elm$core$Basics$modBy, 3, count) + size) - 8) - 3);
				var isBlack = isBlackFn(count);
				var bottomLeft = _Utils_Tuple2(
					((A2($elm$core$Basics$modBy, 3, count) + size) - 8) - 3,
					$elm$core$Basics$floor(count / 3));
				var $temp$size = size,
					$temp$isBlackFn = isBlackFn,
					$temp$count = count + 1,
					$temp$matrix = A4(
					$pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionModule,
					size,
					isBlack,
					bottomLeft,
					A4($pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionModule, size, isBlack, topRight, matrix));
				size = $temp$size;
				isBlackFn = $temp$isBlackFn;
				count = $temp$count;
				matrix = $temp$matrix;
				continue setVersionInfo_;
			} else {
				return matrix;
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo = F3(
	function (version, size, matrix) {
		if (version >= 7) {
			var isBlack = F2(
				function (bits_, count) {
					return (1 & (bits_ >> count)) === 1;
				});
			var bits = $pablohirafuji$elm_qrcode$QRCode$Matrix$encodeVersionInfo(version);
			return A4(
				$pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo_,
				size,
				isBlack(bits),
				0,
				matrix);
		} else {
			return matrix;
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$timingColor = F2(
	function (row, col) {
		return (!A2($elm$core$Basics$modBy, 2, row + col)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(true, true)) : $elm$core$Maybe$Just(
			_Utils_Tuple2(true, false));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$setTiming = F3(
	function (size, row, col) {
		return A2(
			$elm$core$Array$set,
			A3($pablohirafuji$elm_qrcode$QRCode$Matrix$getIndex, size, row, col),
			A2($pablohirafuji$elm_qrcode$QRCode$Matrix$timingColor, row, col));
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$timingPattern = F2(
	function (size, matrix) {
		var range = A2($elm$core$List$range, 8, size - 9);
		return A3(
			$elm$core$List$foldl,
			function (b) {
				return A3($pablohirafuji$elm_qrcode$QRCode$Matrix$setTiming, size, b, 6);
			},
			A3(
				$elm$core$List$foldl,
				A2($pablohirafuji$elm_qrcode$QRCode$Matrix$setTiming, size, 6),
				matrix,
				range),
			range);
	});
var $pablohirafuji$elm_qrcode$QRCode$Matrix$apply = function (_v0) {
	var ecLevel = _v0.a.bR;
	var groupInfo = _v0.a.dK;
	var bytes = _v0.b;
	var version = groupInfo.bB;
	var size = ((version - 1) * 4) + 21;
	return A2(
		$elm$core$Result$map,
		A2($pablohirafuji$elm_qrcode$QRCode$Matrix$getBestMask, ecLevel, size),
		A2(
			$elm$core$Result$map,
			A2($pablohirafuji$elm_qrcode$QRCode$Matrix$addData, size, bytes),
			A3(
				$pablohirafuji$elm_qrcode$QRCode$Matrix$alignmentPattern,
				version,
				size,
				A2(
					$pablohirafuji$elm_qrcode$QRCode$Matrix$timingPattern,
					size,
					A3(
						$pablohirafuji$elm_qrcode$QRCode$Matrix$darkModule,
						version,
						size,
						A3(
							$pablohirafuji$elm_qrcode$QRCode$Matrix$setVersionInfo,
							version,
							size,
							A2(
								$pablohirafuji$elm_qrcode$QRCode$Matrix$reserveFormatInfo,
								size,
								A4(
									$pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern,
									size,
									-1,
									size - 8,
									A4(
										$pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern,
										size,
										size - 8,
										-1,
										A4(
											$pablohirafuji$elm_qrcode$QRCode$Matrix$finderPattern,
											size,
											-1,
											-1,
											A2(
												$elm$core$Array$initialize,
												size * size,
												$elm$core$Basics$always($elm$core$Maybe$Nothing))))))))))));
};
var $pablohirafuji$elm_qrcode$QRCode$ECLevel$H = 3;
var $pablohirafuji$elm_qrcode$QRCode$ECLevel$L = 0;
var $pablohirafuji$elm_qrcode$QRCode$ECLevel$M = 1;
var $pablohirafuji$elm_qrcode$QRCode$ECLevel$Q = 2;
var $pablohirafuji$elm_qrcode$QRCode$convertEC = function (ec) {
	switch (ec) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$AlignmentPatternNotFound = {$: 0};
var $pablohirafuji$elm_qrcode$QRCode$InputLengthOverflow = {$: 7};
var $pablohirafuji$elm_qrcode$QRCode$InvalidAlphanumericChar = {$: 2};
var $pablohirafuji$elm_qrcode$QRCode$InvalidNumericChar = {$: 1};
var $pablohirafuji$elm_qrcode$QRCode$InvalidUTF8Char = {$: 3};
var $pablohirafuji$elm_qrcode$QRCode$LogTableException = function (a) {
	return {$: 4, a: a};
};
var $pablohirafuji$elm_qrcode$QRCode$PolynomialModException = {$: 6};
var $pablohirafuji$elm_qrcode$QRCode$PolynomialMultiplyException = {$: 5};
var $pablohirafuji$elm_qrcode$QRCode$convertError = function (e) {
	switch (e.$) {
		case 0:
			return $pablohirafuji$elm_qrcode$QRCode$AlignmentPatternNotFound;
		case 1:
			return $pablohirafuji$elm_qrcode$QRCode$InvalidNumericChar;
		case 2:
			return $pablohirafuji$elm_qrcode$QRCode$InvalidAlphanumericChar;
		case 3:
			return $pablohirafuji$elm_qrcode$QRCode$InvalidUTF8Char;
		case 4:
			var n = e.a;
			return $pablohirafuji$elm_qrcode$QRCode$LogTableException(n);
		case 5:
			return $pablohirafuji$elm_qrcode$QRCode$PolynomialMultiplyException;
		case 6:
			return $pablohirafuji$elm_qrcode$QRCode$PolynomialModException;
		default:
			return $pablohirafuji$elm_qrcode$QRCode$InputLengthOverflow;
	}
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$firstFillerByte = 236;
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$secondFillerByte = 17;
var $pablohirafuji$elm_qrcode$QRCode$Encode$addFiller = F2(
	function (capacity, bytes) {
		var fillerLength = ((capacity / 8) | 0) - $elm$core$List$length(bytes);
		var ns = $elm$core$List$concat(
			A2(
				$elm$core$List$repeat,
				(fillerLength / 2) | 0,
				_List_fromArray(
					[$pablohirafuji$elm_qrcode$QRCode$Encode$firstFillerByte, $pablohirafuji$elm_qrcode$QRCode$Encode$secondFillerByte])));
		return (!A2($elm$core$Basics$modBy, 2, fillerLength)) ? _Utils_ap(bytes, ns) : _Utils_ap(
			bytes,
			_Utils_ap(
				ns,
				_List_fromArray(
					[$pablohirafuji$elm_qrcode$QRCode$Encode$firstFillerByte])));
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$addTerminator = F3(
	function (capacity, bitsCount, bits) {
		return _Utils_ap(
			bits,
			_List_fromArray(
				[
					_Utils_Tuple2(
					0,
					A2($elm$core$Basics$min, 4, capacity - bitsCount))
				]));
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes3 = function (_v0) {
	bitsToBytes3:
	while (true) {
		var _v1 = _v0.a;
		var bits = _v1.a;
		var length = _v1.b;
		var bytes = _v0.b;
		if (length >= 8) {
			var remLength = length - 8;
			var remBits = bits & ((1 << remLength) - 1);
			var _byte = bits >> remLength;
			var $temp$_v0 = _Utils_Tuple2(
				_Utils_Tuple2(remBits, remLength),
				A2($elm$core$List$cons, _byte, bytes));
			_v0 = $temp$_v0;
			continue bitsToBytes3;
		} else {
			return _Utils_Tuple2(
				_Utils_Tuple2(bits, length),
				bytes);
		}
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes2 = F2(
	function (_v0, _v1) {
		var curBits = _v0.a;
		var curLength = _v0.b;
		var _v2 = _v1.a;
		var remBits = _v2.a;
		var remLength = _v2.b;
		var bytes = _v1.b;
		var lengthSum = curLength + remLength;
		var bitsSum = curBits | (remBits << curLength);
		return $pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes3(
			_Utils_Tuple2(
				_Utils_Tuple2(bitsSum, lengthSum),
				bytes));
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes1 = F2(
	function (bits, _v0) {
		bitsToBytes1:
		while (true) {
			var _v1 = _v0.a;
			var remBits = _v1.a;
			var remLength = _v1.b;
			var bytes = _v0.b;
			if (bits.b) {
				var head = bits.a;
				var tail = bits.b;
				var $temp$bits = tail,
					$temp$_v0 = A2(
					$pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes2,
					head,
					_Utils_Tuple2(
						_Utils_Tuple2(remBits, remLength),
						bytes));
				bits = $temp$bits;
				_v0 = $temp$_v0;
				continue bitsToBytes1;
			} else {
				return (!remLength) ? $elm$core$List$reverse(bytes) : $elm$core$List$reverse(
					A2($elm$core$List$cons, remBits << (8 - remLength), bytes));
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes = function (bits) {
	return A2(
		$pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes1,
		bits,
		_Utils_Tuple2(
			_Utils_Tuple2(0, 0),
			_List_Nil));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$UTF8 = 3;
var $pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength = F2(
	function (mode, version) {
		if (version <= 9) {
			switch (mode) {
				case 0:
					return 10;
				case 1:
					return 9;
				case 2:
					return 8;
				default:
					return 8;
			}
		} else {
			if (version <= 26) {
				switch (mode) {
					case 0:
						return 12;
					case 1:
						return 11;
					case 2:
						return 16;
					default:
						return 16;
				}
			} else {
				switch (mode) {
					case 0:
						return 14;
					case 1:
						return 13;
					case 2:
						return 16;
					default:
						return 16;
				}
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicator = F2(
	function (_v0, bits) {
		var groupInfo = _v0.dK;
		var inputStr = _v0.bi;
		var mode = _v0.cu;
		var length = A2($pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength, mode, groupInfo.bB);
		var charCount = (mode === 3) ? $elm$core$List$length(bits) : $elm$core$String$length(inputStr);
		return _Utils_Tuple2(charCount, length);
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$modeIndicator = function (mode) {
	switch (mode) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 4;
		default:
			return 4;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$addInfoAndFinalBits = function (_v0) {
	var bits = _v0.a;
	var model = _v0.b;
	return _Utils_Tuple2(
		model,
		A2(
			$pablohirafuji$elm_qrcode$QRCode$Encode$addFiller,
			model.dK.aQ,
			$pablohirafuji$elm_qrcode$QRCode$Encode$bitsToBytes(
				A3(
					$pablohirafuji$elm_qrcode$QRCode$Encode$addTerminator,
					model.dK.aQ,
					model.a6,
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							$pablohirafuji$elm_qrcode$QRCode$Encode$modeIndicator(model.cu),
							4),
						A2(
							$elm$core$List$cons,
							A2($pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicator, model, bits),
							bits))))));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$concatTranspose = function (_v0) {
	var model = _v0.a;
	var dataBlocks = _v0.b;
	var ecBlocks = _v0.c;
	return _Utils_Tuple2(
		model,
		$elm$core$List$concat(
			_Utils_ap(
				$pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(dataBlocks),
				$pablohirafuji$elm_qrcode$QRCode$Helpers$transpose(ecBlocks))));
};
var $elm_community$list_extra$List$Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var xs_ = A2($elm$core$List$drop, step, xs);
		var okayXs = $elm$core$List$length(xs) > 0;
		var okayArgs = (size > 0) && (step > 0);
		return (okayArgs && okayXs) ? A2(
			$elm$core$List$cons,
			A2($elm$core$List$take, size, xs),
			A3($elm_community$list_extra$List$Extra$greedyGroupsOfWithStep, size, step, xs_)) : _List_Nil;
	});
var $elm_community$list_extra$List$Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3($elm_community$list_extra$List$Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var $elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 1) {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return $elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Error$InvalidAlphanumericChar = {$: 2};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$alphanumericCodes = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('0', 0),
			_Utils_Tuple2('1', 1),
			_Utils_Tuple2('2', 2),
			_Utils_Tuple2('3', 3),
			_Utils_Tuple2('4', 4),
			_Utils_Tuple2('5', 5),
			_Utils_Tuple2('6', 6),
			_Utils_Tuple2('7', 7),
			_Utils_Tuple2('8', 8),
			_Utils_Tuple2('9', 9),
			_Utils_Tuple2('A', 10),
			_Utils_Tuple2('B', 11),
			_Utils_Tuple2('C', 12),
			_Utils_Tuple2('D', 13),
			_Utils_Tuple2('E', 14),
			_Utils_Tuple2('F', 15),
			_Utils_Tuple2('G', 16),
			_Utils_Tuple2('H', 17),
			_Utils_Tuple2('I', 18),
			_Utils_Tuple2('J', 19),
			_Utils_Tuple2('K', 20),
			_Utils_Tuple2('L', 21),
			_Utils_Tuple2('M', 22),
			_Utils_Tuple2('N', 23),
			_Utils_Tuple2('O', 24),
			_Utils_Tuple2('P', 25),
			_Utils_Tuple2('Q', 26),
			_Utils_Tuple2('R', 27),
			_Utils_Tuple2('S', 28),
			_Utils_Tuple2('T', 29),
			_Utils_Tuple2('U', 30),
			_Utils_Tuple2('V', 31),
			_Utils_Tuple2('W', 32),
			_Utils_Tuple2('X', 33),
			_Utils_Tuple2('Y', 34),
			_Utils_Tuple2('Z', 35),
			_Utils_Tuple2(' ', 36),
			_Utils_Tuple2('$', 37),
			_Utils_Tuple2('%', 38),
			_Utils_Tuple2('*', 39),
			_Utils_Tuple2('+', 40),
			_Utils_Tuple2('-', 41),
			_Utils_Tuple2('.', 42),
			_Utils_Tuple2('/', 43),
			_Utils_Tuple2(':', 44)
		]));
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode = function (_char) {
	return A2(
		$elm$core$Result$fromMaybe,
		$pablohirafuji$elm_qrcode$QRCode$Error$InvalidAlphanumericChar,
		A2($elm$core$Dict$get, _char, $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$alphanumericCodes));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toBinary = function (chars) {
	_v0$2:
	while (true) {
		if (chars.b) {
			if (chars.b.b) {
				if (!chars.b.b.b) {
					var firstChar = chars.a;
					var _v1 = chars.b;
					var secondChar = _v1.a;
					return A3(
						$elm$core$Result$map2,
						F2(
							function (firstCode, secondCode) {
								return _Utils_Tuple2((firstCode * 45) + secondCode, 11);
							}),
						$pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode(firstChar),
						$pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode(secondChar));
				} else {
					break _v0$2;
				}
			} else {
				var _char = chars.a;
				return A2(
					$elm$core$Result$map,
					function (a) {
						return _Utils_Tuple2(a, 6);
					},
					$pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toAlphanumericCode(_char));
			}
		} else {
			break _v0$2;
		}
	}
	return $elm$core$Result$Err($pablohirafuji$elm_qrcode$QRCode$Error$InvalidAlphanumericChar);
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$encode = function (str) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Result$map2($elm$core$List$cons),
		$elm$core$Result$Ok(_List_Nil),
		A2(
			$elm$core$List$map,
			$pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$toBinary,
			A2(
				$elm_community$list_extra$List$Extra$greedyGroupsOf,
				2,
				$elm$core$String$toList(str))));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Byte$encode = function (str) {
	return $elm$core$Result$Ok(
		A2(
			$elm$core$List$map,
			function (a) {
				return _Utils_Tuple2(
					$elm$core$Char$toCode(a),
					8);
			},
			$elm$core$String$toList(str)));
};
var $pablohirafuji$elm_qrcode$QRCode$Error$InvalidNumericChar = {$: 1};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$numericLength = function (str) {
	var _v0 = $elm$core$String$length(str);
	switch (_v0) {
		case 1:
			return 4;
		case 2:
			return 7;
		default:
			return 10;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encodeHelp = function (chars) {
	var str = $elm$core$String$fromList(chars);
	return A2(
		$elm$core$Result$fromMaybe,
		$pablohirafuji$elm_qrcode$QRCode$Error$InvalidNumericChar,
		A2(
			$elm$core$Maybe$map,
			function (a) {
				return _Utils_Tuple2(
					a,
					$pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$numericLength(str));
			},
			$elm$core$String$toInt(str)));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encode = function (str) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Result$map2($elm$core$List$cons),
		$elm$core$Result$Ok(_List_Nil),
		A2(
			$elm$core$List$map,
			$pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encodeHelp,
			A2(
				$elm_community$list_extra$List$Extra$greedyGroupsOf,
				3,
				$elm$core$String$toList(str))));
};
var $pablohirafuji$elm_qrcode$QRCode$Error$InvalidUTF8Char = {$: 3};
var $elm$bytes$Bytes$Encode$getStringWidth = _Bytes_getStringWidth;
var $pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$step = function (_v0) {
	var n = _v0.a;
	var xs = _v0.b;
	return (n <= 0) ? $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done(
			$elm$core$List$reverse(xs))) : A2(
		$elm$bytes$Bytes$Decode$map,
		function (x) {
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(
					n - 1,
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(x, 8),
						xs)));
		},
		$elm$bytes$Bytes$Decode$unsignedInt8);
};
var $elm$bytes$Bytes$Encode$Utf8 = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$string = function (str) {
	return A2(
		$elm$bytes$Bytes$Encode$Utf8,
		_Bytes_getStringWidth(str),
		str);
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encode = function (str) {
	var utf8BytesWidth = $elm$bytes$Bytes$Encode$getStringWidth(str);
	var decoder = A2(
		$elm$bytes$Bytes$Decode$loop,
		_Utils_Tuple2(utf8BytesWidth, _List_Nil),
		$pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$step);
	return A2(
		$elm$core$Result$fromMaybe,
		$pablohirafuji$elm_qrcode$QRCode$Error$InvalidUTF8Char,
		A2(
			$elm$bytes$Bytes$Decode$decode,
			decoder,
			$elm$bytes$Bytes$Encode$encode(
				$elm$bytes$Bytes$Encode$string(str))));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$encoder = function (mode) {
	switch (mode) {
		case 0:
			return $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$encode;
		case 1:
			return $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$encode;
		case 2:
			return $pablohirafuji$elm_qrcode$QRCode$Encode$Byte$encode;
		default:
			return $pablohirafuji$elm_qrcode$QRCode$Encode$UTF8$encode;
	}
};
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$expTable = $elm$core$Array$fromList(
	_List_fromArray(
		[1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117, 234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181, 119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222, 161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211, 187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34, 68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118, 236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21, 42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209, 191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150, 49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56, 112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172, 69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44, 88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 1]));
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp = function (index) {
	return A2(
		$elm$core$Maybe$withDefault,
		0,
		A2(
			$elm$core$Array$get,
			A2($elm$core$Basics$modBy, 255, index),
			$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$expTable));
};
var $pablohirafuji$elm_qrcode$QRCode$Error$PolynomialMultiplyException = {$: 5};
var $pablohirafuji$elm_qrcode$QRCode$Error$LogTableException = function (a) {
	return {$: 4, a: a};
};
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$logTable = $elm$core$Array$fromList(
	_List_fromArray(
		[0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141, 239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147, 142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228, 114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208, 148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72, 126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212, 229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197, 254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63, 209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20, 42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196, 23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187, 204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79, 174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175]));
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog = function (index) {
	return (index < 1) ? $elm$core$Result$Err(
		$pablohirafuji$elm_qrcode$QRCode$Error$LogTableException(index)) : A2(
		$elm$core$Result$fromMaybe,
		$pablohirafuji$elm_qrcode$QRCode$Error$LogTableException(index),
		A2($elm$core$Array$get, index - 1, $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$logTable));
};
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getOffset = function (_v0) {
	getOffset:
	while (true) {
		var num = _v0.a;
		var offset = _v0.b;
		if (num.b) {
			var head = num.a;
			var tail = num.b;
			if (!head) {
				var $temp$_v0 = _Utils_Tuple2(tail, offset + 1);
				_v0 = $temp$_v0;
				continue getOffset;
			} else {
				return offset;
			}
		} else {
			return offset;
		}
	}
};
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial = F2(
	function (num, shift) {
		var offset = $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getOffset(
			_Utils_Tuple2(num, 0));
		var numArray = $elm$core$Array$fromList(num);
		return A2(
			$elm$core$Array$initialize,
			($elm$core$List$length(num) - offset) + shift,
			function (index) {
				return A2(
					$elm$core$Maybe$withDefault,
					0,
					A2($elm$core$Array$get, index + offset, numArray));
			});
	});
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$multiply = F2(
	function (poly1, poly2) {
		var valuesArray = A2(
			$elm$core$List$indexedMap,
			F2(
				function (index1, value1) {
					return A2(
						$elm$core$List$indexedMap,
						F2(
							function (index2, value2) {
								return _Utils_Tuple3(index1 + index2, value1, value2);
							}),
						$elm$core$Array$toList(poly2));
				}),
			$elm$core$Array$toList(poly1));
		var process__ = F3(
			function (indexSum, num_, exp) {
				return A2(
					$elm$core$Result$fromMaybe,
					$pablohirafuji$elm_qrcode$QRCode$Error$PolynomialMultiplyException,
					A2(
						$elm$core$Maybe$map,
						$elm$core$Bitwise$xor(exp),
						A2($elm$core$Array$get, indexSum, num_)));
			});
		var process_ = F2(
			function (_v0, num_) {
				var indexSum = _v0.a;
				var value1 = _v0.b;
				var value2 = _v0.c;
				return A2(
					$elm$core$Result$map,
					function (r) {
						return A3($elm$core$Array$set, indexSum, r, num_);
					},
					A2(
						$elm$core$Result$andThen,
						A2(process__, indexSum, num_),
						A2(
							$elm$core$Result$map,
							$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp,
							A3(
								$elm$core$Result$map2,
								$elm$core$Basics$add,
								$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog(value1),
								$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog(value2)))));
			});
		var process = F2(
			function (args, numResult) {
				return A2(
					$elm$core$Result$andThen,
					process_(args),
					numResult);
			});
		var num = A2(
			$elm$core$Array$initialize,
			($elm$core$Array$length(poly1) + $elm$core$Array$length(poly2)) - 1,
			$elm$core$Basics$always(0));
		return A2(
			$elm$core$Result$map,
			function (a) {
				return A2($pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial, a, 0);
			},
			A2(
				$elm$core$Result$map,
				$elm$core$Array$toList,
				A3(
					$elm$core$List$foldl,
					process,
					$elm$core$Result$Ok(num),
					$elm$core$List$concat(valuesArray))));
	});
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getECPolynomial = function (ecLength) {
	var generate = F2(
		function (count, polyResult) {
			generate:
			while (true) {
				if (_Utils_cmp(count, ecLength) < 0) {
					var $temp$count = count + 1,
						$temp$polyResult = A2(
						$elm$core$Result$andThen,
						function (a) {
							return A2(
								$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$multiply,
								a,
								A2(
									$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial,
									_List_fromArray(
										[
											1,
											$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp(count)
										]),
									0));
						},
						polyResult);
					count = $temp$count;
					polyResult = $temp$polyResult;
					continue generate;
				} else {
					return polyResult;
				}
			}
		});
	return A2(
		generate,
		0,
		$elm$core$Result$Ok(
			A2(
				$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial,
				_List_fromArray(
					[1]),
				0)));
};
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get___ = F2(
	function (ecLength, modPoly) {
		return $elm$core$Array$toList(
			A2(
				$elm$core$Array$initialize,
				ecLength,
				function (index) {
					var modIndex = (index + $elm$core$Array$length(modPoly)) - ecLength;
					return (modIndex >= 0) ? A2(
						$elm$core$Maybe$withDefault,
						0,
						A2($elm$core$Array$get, modIndex, modPoly)) : 0;
				}));
	});
var $pablohirafuji$elm_qrcode$QRCode$Error$PolynomialModException = {$: 6};
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$mod = F2(
	function (poly1, poly2) {
		if (($elm$core$Array$length(poly1) - $elm$core$Array$length(poly2)) < 0) {
			return $elm$core$Result$Ok(poly1);
		} else {
			var helper_ = F3(
				function (index2, poly1_, exp) {
					return A2(
						$elm$core$Result$fromMaybe,
						$pablohirafuji$elm_qrcode$QRCode$Error$PolynomialModException,
						A2(
							$elm$core$Maybe$map,
							$elm$core$Bitwise$xor(exp),
							A2($elm$core$Array$get, index2, poly1_)));
				});
			var getHead = function (poly) {
				return A2(
					$elm$core$Result$andThen,
					$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog,
					A2(
						$elm$core$Result$fromMaybe,
						$pablohirafuji$elm_qrcode$QRCode$Error$PolynomialModException,
						A2($elm$core$Array$get, 0, poly)));
			};
			var ratio = A3(
				$elm$core$Result$map2,
				$elm$core$Basics$sub,
				getHead(poly1),
				getHead(poly2));
			var helper = F2(
				function (_v0, poly1_) {
					var index2 = _v0.a;
					var value2 = _v0.b;
					return A2(
						$elm$core$Result$map,
						function (r) {
							return A3($elm$core$Array$set, index2, r, poly1_);
						},
						A2(
							$elm$core$Result$andThen,
							A2(helper_, index2, poly1_),
							A2(
								$elm$core$Result$map,
								$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getExp,
								A3(
									$elm$core$Result$map2,
									$elm$core$Basics$add,
									ratio,
									$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getLog(value2)))));
				});
			var numFold = F2(
				function (args, poly1Result) {
					return A2(
						$elm$core$Result$andThen,
						helper(args),
						poly1Result);
				});
			var numResult = A3(
				$elm$core$Array$foldl,
				numFold,
				$elm$core$Result$Ok(poly1),
				A2(
					$elm$core$Array$indexedMap,
					F2(
						function (a, b) {
							return _Utils_Tuple2(a, b);
						}),
					poly2));
			return A2(
				$elm$core$Result$andThen,
				function (a) {
					return A2($pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$mod, a, poly2);
				},
				A2(
					$elm$core$Result$map,
					function (a) {
						return A2($pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial, a, 0);
					},
					A2($elm$core$Result$map, $elm$core$Array$toList, numResult)));
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get__ = F2(
	function (rsPoly, dataCodewords) {
		return A2(
			$elm$core$Result$map,
			$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get___(
				$elm$core$Array$length(rsPoly) - 1),
			A2(
				$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$mod,
				A2(
					$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$newPolynomial,
					dataCodewords,
					$elm$core$Array$length(rsPoly) - 1),
				rsPoly));
	});
var $pablohirafuji$elm_qrcode$QRCode$Helpers$listResult = F3(
	function (fun, listb, lista) {
		if (lista.b) {
			var head = lista.a;
			var tail = lista.b;
			return A2(
				$elm$core$Result$andThen,
				function (a) {
					return A3($pablohirafuji$elm_qrcode$QRCode$Helpers$listResult, fun, a, tail);
				},
				A2(
					$elm$core$Result$map,
					function (r) {
						return A2($elm$core$List$cons, r, listb);
					},
					fun(head)));
		} else {
			return $elm$core$Result$Ok(
				$elm$core$List$reverse(listb));
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get_ = F2(
	function (byteBlocks, rsPoly) {
		return A3(
			$pablohirafuji$elm_qrcode$QRCode$Helpers$listResult,
			$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get__(rsPoly),
			_List_Nil,
			byteBlocks);
	});
var $pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get = F2(
	function (ecPerBlock, byteBlocks) {
		return A2(
			$elm$core$Result$andThen,
			$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get_(byteBlocks),
			$pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$getECPolynomial(ecPerBlock));
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$getErrorCorrection = function (_v0) {
	var model = _v0.a;
	var dataBlocks = _v0.b;
	return A2(
		$elm$core$Result$map,
		function (c) {
			return _Utils_Tuple3(model, dataBlocks, c);
		},
		A2($pablohirafuji$elm_qrcode$QRCode$ErrorCorrection$get, model.dK.du, dataBlocks));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric = 1;
var $pablohirafuji$elm_qrcode$QRCode$Encode$Byte = 2;
var $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric = 0;
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {dP: index, dW: match, ec: number, et: submatches};
	});
var $elm$regex$Regex$contains = _Regex_contains;
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$onlyAlphanumeric = A2(
	$elm$regex$Regex$fromStringWith,
	{dd: false, d0: false},
	'^[0-9A-Z $%*+\\-.\\/:]+$');
var $pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$isValid = function (input) {
	return A2(
		$elm$core$Maybe$withDefault,
		false,
		A2(
			$elm$core$Maybe$map,
			function (r) {
				return A2($elm$regex$Regex$contains, r, input);
			},
			$pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$onlyAlphanumeric));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Byte$only8Bit = A2(
	$elm$regex$Regex$fromStringWith,
	{dd: false, d0: false},
	'^[\\u0000-\\u00ff]+$');
var $pablohirafuji$elm_qrcode$QRCode$Encode$Byte$isValid = function (input) {
	return A2(
		$elm$core$Maybe$withDefault,
		false,
		A2(
			$elm$core$Maybe$map,
			function (r) {
				return A2($elm$regex$Regex$contains, r, input);
			},
			$pablohirafuji$elm_qrcode$QRCode$Encode$Byte$only8Bit));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$onlyNumber = A2(
	$elm$regex$Regex$fromStringWith,
	{dd: false, d0: false},
	'^[0-9]+$');
var $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$isValid = function (input) {
	return A2(
		$elm$core$Maybe$withDefault,
		false,
		A2(
			$elm$core$Maybe$map,
			function (r) {
				return A2($elm$regex$Regex$contains, r, input);
			},
			$pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$onlyNumber));
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$selectMode = function (input) {
	return $pablohirafuji$elm_qrcode$QRCode$Encode$Numeric$isValid(input) ? 0 : ($pablohirafuji$elm_qrcode$QRCode$Encode$Alphanumeric$isValid(input) ? 1 : ($pablohirafuji$elm_qrcode$QRCode$Encode$Byte$isValid(input) ? 2 : 3));
};
var $pablohirafuji$elm_qrcode$QRCode$Error$InputLengthOverflow = {$: 7};
var $pablohirafuji$elm_qrcode$QRCode$Encode$filterCapacity = F3(
	function (mode, dataLength, _v0) {
		var version = _v0.bB;
		var capacity = _v0.aQ;
		return _Utils_cmp(
			A2($pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength, mode, version) + dataLength,
			capacity) < 1;
	});
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity = function (_v0) {
	var blockCount = _v0.a;
	var bytePerBlock = _v0.b;
	return blockCount * bytePerBlock;
};
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$byteCapacity = F2(
	function (group1, maybeGroup2) {
		if (!maybeGroup2.$) {
			var block2 = maybeGroup2.a;
			return $pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity(group1) + $pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity(block2);
		} else {
			return $pablohirafuji$elm_qrcode$QRCode$GroupInfo$blockByteCapacity(group1);
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo = F4(
	function (version, ecPerBlock, group1, maybeGroup2) {
		return {
			aQ: A2($pablohirafuji$elm_qrcode$QRCode$GroupInfo$byteCapacity, group1, maybeGroup2) * 8,
			du: ecPerBlock,
			b_: group1,
			dX: maybeGroup2,
			bB: version
		};
	});
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataH = _List_fromArray(
	[
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		17,
		_Utils_Tuple2(1, 9),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		28,
		_Utils_Tuple2(1, 16),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		22,
		_Utils_Tuple2(2, 13),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		16,
		_Utils_Tuple2(4, 9),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		22,
		_Utils_Tuple2(2, 11),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 12))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		28,
		_Utils_Tuple2(4, 15),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		26,
		_Utils_Tuple2(4, 13),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 14))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		26,
		_Utils_Tuple2(4, 14),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 15))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		24,
		_Utils_Tuple2(4, 12),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 13))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		28,
		_Utils_Tuple2(6, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		24,
		_Utils_Tuple2(3, 12),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(8, 13))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		28,
		_Utils_Tuple2(7, 14),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 15))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		22,
		_Utils_Tuple2(12, 11),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 12))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		24,
		_Utils_Tuple2(11, 12),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 13))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		24,
		_Utils_Tuple2(11, 12),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 13))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		30,
		_Utils_Tuple2(3, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(13, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(2, 14),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(17, 15))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		28,
		_Utils_Tuple2(2, 14),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(19, 15))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		26,
		_Utils_Tuple2(9, 13),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(16, 14))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		28,
		_Utils_Tuple2(15, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(10, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		30,
		_Utils_Tuple2(19, 16),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(6, 17))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		24,
		_Utils_Tuple2(34, 13),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		30,
		_Utils_Tuple2(16, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		30,
		_Utils_Tuple2(30, 16),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 17))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		30,
		_Utils_Tuple2(22, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(13, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		30,
		_Utils_Tuple2(33, 16),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 17))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		30,
		_Utils_Tuple2(12, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(28, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		30,
		_Utils_Tuple2(11, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(31, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		30,
		_Utils_Tuple2(19, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(26, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		30,
		_Utils_Tuple2(23, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(25, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		30,
		_Utils_Tuple2(23, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(28, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		30,
		_Utils_Tuple2(19, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(35, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		30,
		_Utils_Tuple2(11, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(46, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		30,
		_Utils_Tuple2(59, 16),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 17))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		30,
		_Utils_Tuple2(22, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(41, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		30,
		_Utils_Tuple2(2, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(64, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		30,
		_Utils_Tuple2(24, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(46, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		30,
		_Utils_Tuple2(42, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(32, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		30,
		_Utils_Tuple2(10, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(67, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		30,
		_Utils_Tuple2(20, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(61, 16)))
	]);
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataL = _List_fromArray(
	[
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		7,
		_Utils_Tuple2(1, 19),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		10,
		_Utils_Tuple2(1, 34),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		15,
		_Utils_Tuple2(1, 55),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		20,
		_Utils_Tuple2(1, 80),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		26,
		_Utils_Tuple2(1, 108),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		18,
		_Utils_Tuple2(2, 68),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		20,
		_Utils_Tuple2(2, 78),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		24,
		_Utils_Tuple2(2, 97),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		30,
		_Utils_Tuple2(2, 116),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		18,
		_Utils_Tuple2(2, 68),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 69))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		20,
		_Utils_Tuple2(4, 81),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		24,
		_Utils_Tuple2(2, 92),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 93))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		26,
		_Utils_Tuple2(4, 107),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		30,
		_Utils_Tuple2(3, 115),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 116))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		22,
		_Utils_Tuple2(5, 87),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 88))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		24,
		_Utils_Tuple2(5, 98),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 99))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(1, 107),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 108))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		30,
		_Utils_Tuple2(5, 120),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 121))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		28,
		_Utils_Tuple2(3, 113),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 114))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		28,
		_Utils_Tuple2(3, 107),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 108))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		28,
		_Utils_Tuple2(4, 116),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 117))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		28,
		_Utils_Tuple2(2, 111),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 112))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		30,
		_Utils_Tuple2(4, 121),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 122))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		30,
		_Utils_Tuple2(6, 117),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 118))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		26,
		_Utils_Tuple2(8, 106),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 107))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		28,
		_Utils_Tuple2(10, 114),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 115))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		30,
		_Utils_Tuple2(8, 122),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 123))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		30,
		_Utils_Tuple2(3, 117),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(10, 118))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		30,
		_Utils_Tuple2(7, 116),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 117))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		30,
		_Utils_Tuple2(5, 115),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(10, 116))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		30,
		_Utils_Tuple2(13, 115),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(3, 116))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		30,
		_Utils_Tuple2(17, 115),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		30,
		_Utils_Tuple2(17, 115),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 116))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		30,
		_Utils_Tuple2(13, 115),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(6, 116))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		30,
		_Utils_Tuple2(12, 121),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 122))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		30,
		_Utils_Tuple2(6, 121),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 122))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		30,
		_Utils_Tuple2(17, 122),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 123))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		30,
		_Utils_Tuple2(4, 122),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(18, 123))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		30,
		_Utils_Tuple2(20, 117),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 118))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		30,
		_Utils_Tuple2(19, 118),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(6, 119)))
	]);
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataM = _List_fromArray(
	[
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		10,
		_Utils_Tuple2(1, 16),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		16,
		_Utils_Tuple2(1, 28),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		26,
		_Utils_Tuple2(1, 44),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		18,
		_Utils_Tuple2(2, 32),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		24,
		_Utils_Tuple2(2, 43),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		16,
		_Utils_Tuple2(4, 27),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		18,
		_Utils_Tuple2(4, 31),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		22,
		_Utils_Tuple2(2, 38),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 39))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		22,
		_Utils_Tuple2(3, 36),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 37))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		26,
		_Utils_Tuple2(4, 43),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 44))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		30,
		_Utils_Tuple2(1, 50),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 51))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		22,
		_Utils_Tuple2(6, 36),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 37))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		22,
		_Utils_Tuple2(8, 37),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 38))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		24,
		_Utils_Tuple2(4, 40),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 41))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		24,
		_Utils_Tuple2(5, 41),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 42))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		28,
		_Utils_Tuple2(7, 45),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(3, 46))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(10, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		26,
		_Utils_Tuple2(9, 43),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 44))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		26,
		_Utils_Tuple2(3, 44),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(11, 45))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		26,
		_Utils_Tuple2(3, 41),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(13, 42))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		26,
		_Utils_Tuple2(17, 42),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		28,
		_Utils_Tuple2(17, 46),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		28,
		_Utils_Tuple2(4, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 48))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		28,
		_Utils_Tuple2(6, 45),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 46))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		28,
		_Utils_Tuple2(8, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(13, 48))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		28,
		_Utils_Tuple2(19, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		28,
		_Utils_Tuple2(22, 45),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(3, 46))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		28,
		_Utils_Tuple2(3, 45),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(23, 46))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		28,
		_Utils_Tuple2(21, 45),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 46))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		28,
		_Utils_Tuple2(19, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(10, 48))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		28,
		_Utils_Tuple2(2, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(29, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		28,
		_Utils_Tuple2(10, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(23, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		28,
		_Utils_Tuple2(14, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(21, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		28,
		_Utils_Tuple2(14, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(23, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		28,
		_Utils_Tuple2(12, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(26, 48))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		28,
		_Utils_Tuple2(6, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(34, 48))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		28,
		_Utils_Tuple2(29, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		28,
		_Utils_Tuple2(13, 46),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(32, 47))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		28,
		_Utils_Tuple2(40, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 48))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		28,
		_Utils_Tuple2(18, 47),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(31, 48)))
	]);
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataQ = _List_fromArray(
	[
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		1,
		13,
		_Utils_Tuple2(1, 13),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		2,
		22,
		_Utils_Tuple2(1, 22),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		3,
		18,
		_Utils_Tuple2(2, 17),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		4,
		26,
		_Utils_Tuple2(2, 24),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		5,
		18,
		_Utils_Tuple2(2, 15),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 16))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		6,
		24,
		_Utils_Tuple2(4, 19),
		$elm$core$Maybe$Nothing),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		7,
		18,
		_Utils_Tuple2(2, 14),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 15))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		8,
		22,
		_Utils_Tuple2(4, 18),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 19))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		9,
		20,
		_Utils_Tuple2(4, 16),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 17))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		10,
		24,
		_Utils_Tuple2(6, 19),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 20))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		11,
		28,
		_Utils_Tuple2(4, 22),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 23))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		12,
		26,
		_Utils_Tuple2(4, 20),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(6, 21))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		13,
		24,
		_Utils_Tuple2(8, 20),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 21))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		14,
		20,
		_Utils_Tuple2(11, 16),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 17))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		15,
		30,
		_Utils_Tuple2(5, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		16,
		24,
		_Utils_Tuple2(15, 19),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(2, 20))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		17,
		28,
		_Utils_Tuple2(1, 22),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(15, 23))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		18,
		28,
		_Utils_Tuple2(17, 22),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 23))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		19,
		26,
		_Utils_Tuple2(17, 21),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(4, 22))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		20,
		30,
		_Utils_Tuple2(15, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(5, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		21,
		28,
		_Utils_Tuple2(17, 22),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(6, 23))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		22,
		30,
		_Utils_Tuple2(7, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(16, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		23,
		30,
		_Utils_Tuple2(11, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		24,
		30,
		_Utils_Tuple2(11, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(16, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		25,
		30,
		_Utils_Tuple2(7, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(22, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		26,
		28,
		_Utils_Tuple2(28, 22),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(6, 23))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		27,
		30,
		_Utils_Tuple2(8, 23),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(26, 24))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		28,
		30,
		_Utils_Tuple2(4, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(31, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		29,
		30,
		_Utils_Tuple2(1, 23),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(37, 24))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		30,
		30,
		_Utils_Tuple2(15, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(25, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		31,
		30,
		_Utils_Tuple2(42, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(1, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		32,
		30,
		_Utils_Tuple2(10, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(35, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		33,
		30,
		_Utils_Tuple2(29, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(19, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		34,
		30,
		_Utils_Tuple2(44, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(7, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		35,
		30,
		_Utils_Tuple2(39, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		36,
		30,
		_Utils_Tuple2(46, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(10, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		37,
		30,
		_Utils_Tuple2(49, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(10, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		38,
		30,
		_Utils_Tuple2(48, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(14, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		39,
		30,
		_Utils_Tuple2(43, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(22, 25))),
		A4(
		$pablohirafuji$elm_qrcode$QRCode$GroupInfo$newGroupInfo,
		40,
		30,
		_Utils_Tuple2(34, 24),
		$elm$core$Maybe$Just(
			_Utils_Tuple2(34, 25)))
	]);
var $pablohirafuji$elm_qrcode$QRCode$GroupInfo$getGroupData = function (ecLevel) {
	switch (ecLevel) {
		case 0:
			return $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataL;
		case 1:
			return $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataM;
		case 2:
			return $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataQ;
		default:
			return $pablohirafuji$elm_qrcode$QRCode$GroupInfo$dataH;
	}
};
var $elm$core$List$sortBy = _List_sortBy;
var $pablohirafuji$elm_qrcode$QRCode$Encode$getVersion = F3(
	function (ecLevel, mode, dataLength) {
		return A2(
			$elm$core$Result$fromMaybe,
			$pablohirafuji$elm_qrcode$QRCode$Error$InputLengthOverflow,
			$elm$core$List$head(
				A2(
					$elm$core$List$sortBy,
					function ($) {
						return $.aQ;
					},
					A2(
						$elm$core$List$filter,
						A2($pablohirafuji$elm_qrcode$QRCode$Encode$filterCapacity, mode, dataLength),
						$pablohirafuji$elm_qrcode$QRCode$GroupInfo$getGroupData(ecLevel)))));
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$versionToModel = F5(
	function (inputStr, ecLevel, mode, partialBitsCount, groupInfo) {
		return {
			a6: partialBitsCount + A2($pablohirafuji$elm_qrcode$QRCode$Encode$charCountIndicatorLength, mode, groupInfo.bB),
			bR: ecLevel,
			dK: groupInfo,
			bi: inputStr,
			cu: mode
		};
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$selectVersion = F4(
	function (inputStr, ecLevel, mode, encodedStr) {
		var partialBitsCount = 4 + A3(
			$elm$core$List$foldl,
			F2(
				function (a, b) {
					return a.b + b;
				}),
			0,
			encodedStr);
		return A2(
			$elm$core$Result$map,
			function (b) {
				return _Utils_Tuple2(encodedStr, b);
			},
			A2(
				$elm$core$Result$map,
				A4($pablohirafuji$elm_qrcode$QRCode$Encode$versionToModel, inputStr, ecLevel, mode, partialBitsCount),
				A3($pablohirafuji$elm_qrcode$QRCode$Encode$getVersion, ecLevel, mode, partialBitsCount)));
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$breakList = F3(
	function (checkFinish, _v0, _v1) {
		breakList:
		while (true) {
			var times = _v0.a;
			var itemCount = _v0.b;
			var byteList = _v1.a;
			var progress = _v1.b;
			if (times > 0) {
				var remainList = A2($elm$core$List$drop, itemCount, byteList);
				var block = A2($elm$core$List$take, itemCount, byteList);
				var $temp$checkFinish = checkFinish,
					$temp$_v0 = _Utils_Tuple2(times - 1, itemCount),
					$temp$_v1 = _Utils_Tuple2(
					remainList,
					A2($elm$core$List$cons, block, progress));
				checkFinish = $temp$checkFinish;
				_v0 = $temp$_v0;
				_v1 = $temp$_v1;
				continue breakList;
			} else {
				if (checkFinish && ($elm$core$List$length(byteList) > 0)) {
					return $elm$core$Result$Err($pablohirafuji$elm_qrcode$QRCode$Error$InputLengthOverflow);
				} else {
					return $elm$core$Result$Ok(
						_Utils_Tuple2(byteList, progress));
				}
			}
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$Encode$toBlocks = function (_v0) {
	var model = _v0.a;
	var groupInfo = model.dK;
	var byteList = _v0.b;
	var _v1 = groupInfo.dX;
	if (!_v1.$) {
		var group2 = _v1.a;
		return A2(
			$elm$core$Result$map,
			function (b) {
				return _Utils_Tuple2(model, b);
			},
			A2(
				$elm$core$Result$map,
				A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $elm$core$List$reverse),
				A2(
					$elm$core$Result$andThen,
					A2($pablohirafuji$elm_qrcode$QRCode$Encode$breakList, true, group2),
					A3(
						$pablohirafuji$elm_qrcode$QRCode$Encode$breakList,
						false,
						groupInfo.b_,
						_Utils_Tuple2(byteList, _List_Nil)))));
	} else {
		return A2(
			$elm$core$Result$map,
			function (b) {
				return _Utils_Tuple2(model, b);
			},
			A2(
				$elm$core$Result$map,
				A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $elm$core$List$reverse),
				A3(
					$pablohirafuji$elm_qrcode$QRCode$Encode$breakList,
					true,
					groupInfo.b_,
					_Utils_Tuple2(byteList, _List_Nil))));
	}
};
var $pablohirafuji$elm_qrcode$QRCode$Encode$encode = F2(
	function (inputStr, ecLevel) {
		var mode = $pablohirafuji$elm_qrcode$QRCode$Encode$selectMode(inputStr);
		return A2(
			$elm$core$Result$map,
			$pablohirafuji$elm_qrcode$QRCode$Encode$concatTranspose,
			A2(
				$elm$core$Result$andThen,
				$pablohirafuji$elm_qrcode$QRCode$Encode$getErrorCorrection,
				A2(
					$elm$core$Result$andThen,
					$pablohirafuji$elm_qrcode$QRCode$Encode$toBlocks,
					A2(
						$elm$core$Result$map,
						$pablohirafuji$elm_qrcode$QRCode$Encode$addInfoAndFinalBits,
						A2(
							$elm$core$Result$andThen,
							A3($pablohirafuji$elm_qrcode$QRCode$Encode$selectVersion, inputStr, ecLevel, mode),
							A2($pablohirafuji$elm_qrcode$QRCode$Encode$encoder, mode, inputStr))))));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $pablohirafuji$elm_qrcode$QRCode$fromStringWith = F2(
	function (ecLevel, input) {
		return A2(
			$elm$core$Result$mapError,
			$pablohirafuji$elm_qrcode$QRCode$convertError,
			A2(
				$elm$core$Result$andThen,
				function (_v0) {
					var encodeModel = _v0.a;
					var encodedData = _v0.b;
					return A2(
						$elm$core$Result$map,
						function (matrix) {
							return {aA: matrix, bB: encodeModel.dK.bB};
						},
						$pablohirafuji$elm_qrcode$QRCode$Matrix$apply(
							_Utils_Tuple2(encodeModel, encodedData)));
				},
				A2(
					$pablohirafuji$elm_qrcode$QRCode$Encode$encode,
					input,
					$pablohirafuji$elm_qrcode$QRCode$convertEC(ecLevel))));
	});
var $pablohirafuji$elm_qrcode$QRCode$fromString = $pablohirafuji$elm_qrcode$QRCode$fromStringWith(2);
var $justgook$webgl_playground$Playground$scale = F2(
	function (ns, _v0) {
		var shape = _v0;
		var x = shape.bE;
		var y = shape.bF;
		var a = shape.c3;
		var sx = shape.e;
		var sy = shape.f;
		var o = shape.i;
		var form = shape.k;
		return _Utils_update(
			shape,
			{e: sx * ns, f: sy * ns});
	});
var $pablohirafuji$elm_qrcode$QRCode$toMatrix = function (_v0) {
	var matrix = _v0.aA;
	return matrix;
};
var $justgook$webgl_shape$WebGL$Shape2d$Textured = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $justgook$webgl_shape$WebGL$Shape2d$Form = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm_explorations$webgl$WebGL$Internal$Blend = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {$: 0, a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm_explorations$webgl$WebGL$Settings$Blend$custom = function (_v0) {
	var r = _v0.aY;
	var g = _v0.dI;
	var b = _v0.c7;
	var a = _v0.c3;
	var color = _v0.aS;
	var alpha = _v0.an;
	var expand = F2(
		function (_v1, _v2) {
			var eq1 = _v1.a;
			var f11 = _v1.b;
			var f12 = _v1.c;
			var eq2 = _v2.a;
			var f21 = _v2.b;
			var f22 = _v2.c;
			return $elm_explorations$webgl$WebGL$Internal$Blend(eq1)(f11)(f12)(eq2)(f21)(f22)(r)(g)(b)(a);
		});
	return A2(expand, color, alpha);
};
var $elm_explorations$webgl$WebGL$Settings$Blend$Blender = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm_explorations$webgl$WebGL$Settings$Blend$customAdd = F2(
	function (_v0, _v1) {
		var factor1 = _v0;
		var factor2 = _v1;
		return A3($elm_explorations$webgl$WebGL$Settings$Blend$Blender, 32774, factor1, factor2);
	});
var $elm_explorations$webgl$WebGL$Settings$Blend$add = F2(
	function (factor1, factor2) {
		return $elm_explorations$webgl$WebGL$Settings$Blend$custom(
			{
				c3: 0,
				an: A2($elm_explorations$webgl$WebGL$Settings$Blend$customAdd, factor1, factor2),
				c7: 0,
				aS: A2($elm_explorations$webgl$WebGL$Settings$Blend$customAdd, factor1, factor2),
				dI: 0,
				aY: 0
			});
	});
var $elm_explorations$webgl$WebGL$Internal$ColorMask = F4(
	function (a, b, c, d) {
		return {$: 4, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$colorMask = $elm_explorations$webgl$WebGL$Internal$ColorMask;
var $elm_explorations$webgl$WebGL$Internal$DepthTest = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual = function (_v0) {
	var write = _v0.X;
	var near = _v0.T;
	var far = _v0.S;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 515, write, near, far);
};
var $elm_explorations$webgl$WebGL$Settings$Blend$Factor = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Settings$Blend$oneMinusSrcAlpha = 771;
var $elm_explorations$webgl$WebGL$Settings$Blend$srcAlpha = 770;
var $justgook$webgl_playground$Playground$Render$defaultEntitySettings = _List_fromArray(
	[
		A2($elm_explorations$webgl$WebGL$Settings$Blend$add, $elm_explorations$webgl$WebGL$Settings$Blend$srcAlpha, $elm_explorations$webgl$WebGL$Settings$Blend$oneMinusSrcAlpha),
		A4($elm_explorations$webgl$WebGL$Settings$colorMask, true, true, true, false),
		$elm_explorations$webgl$WebGL$Settings$DepthTest$lessOrEqual(
		{S: 1, T: 0, X: true})
	]);
var $elm_explorations$webgl$WebGL$entityWith = _WebGL_entity;
var $justgook$webgl_playground$Playground$Shader$fragImageColor = {
	src: '\n        precision mediump float;\n        varying vec2 uv;\n        uniform vec2 uImgSize;\n        uniform sampler2D uImg;\n        uniform vec4 color;\n        void main () {\n            vec2 pixel = ((floor(uv * uImgSize) + 0.5) * 2.0 ) / uImgSize / 2.0;\n            gl_FragColor = texture2D(uImg, pixel) * color;\n            if(gl_FragColor.a <= 0.025) discard;\n        }\n    ',
	attributes: {},
	uniforms: {color: 'aS', uImg: 'aJ', uImgSize: 'aK'}
};
var $elm_explorations$webgl$WebGL$Mesh1 = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$triangleStrip = $elm_explorations$webgl$WebGL$Mesh1(
	{bS: 1, b5: 0, cu: 5});
var $elm_explorations$linear_algebra$Math$Vector2$vec2 = _MJS_v2;
var $justgook$webgl_playground$Playground$Shader$mesh = $elm_explorations$webgl$WebGL$triangleStrip(
	_List_fromArray(
		[
			{
			aO: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -1, -1)
		},
			{
			aO: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -1, 1)
		},
			{
			aO: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, -1)
		},
			{
			aO: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 1)
		}
		]));
var $elm_explorations$linear_algebra$Math$Vector3$toRecord = _MJS_v3toRecord;
var $elm_explorations$linear_algebra$Math$Vector4$vec4 = _MJS_v4;
var $justgook$webgl_playground$Playground$Render$setAlpha = A2(
	$elm$core$Basics$composeR,
	$elm_explorations$linear_algebra$Math$Vector3$toRecord,
	function (a) {
		return A3($elm_explorations$linear_algebra$Math$Vector4$vec4, a.bE, a.bF, a.a3);
	});
var $justgook$webgl_playground$Playground$Shader$vertTile = {
	src: '\n            precision mediump float;\n            attribute vec2 aP;\n            uniform vec4 uT;\n            uniform vec2 uP;\n            uniform float z;\n            uniform float index;\n            uniform vec2 spriteSize;\n            uniform vec2 uImgSize;\n            varying vec2 uv;\n            vec2 edgeFix = vec2(0.0000001, -0.0000001);\n            void main () {\n                vec2 ratio = spriteSize / uImgSize;\n                float row = (uImgSize.y / spriteSize.y - 1.0) - floor((index + 0.5) * ratio.x);\n                float column = floor(mod((index + 0.5), uImgSize.x / spriteSize.x));\n                vec2 offset = vec2(column, row) * ratio;\n                uv = (aP * 0.5 + 0.5) * ratio + offset + edgeFix;\n                gl_Position = vec4(aP * mat2(uT) + uP, z  * -1.19209304e-7, 1.0);\n            }\n        ',
	attributes: {aP: 'aO'},
	uniforms: {index: 'dP', spriteSize: 'cT', uImgSize: 'aK', uP: 'eF', uT: 'eG', z: 'a3'}
};
var $justgook$webgl_playground$Playground$Render$tileWithColor = F9(
	function (spriteSheet, spriteSize, imageSize, color, index, translate, scaleRotateSkew, z, opacity) {
		return A5(
			$elm_explorations$webgl$WebGL$entityWith,
			$justgook$webgl_playground$Playground$Render$defaultEntitySettings,
			$justgook$webgl_playground$Playground$Shader$vertTile,
			$justgook$webgl_playground$Playground$Shader$fragImageColor,
			$justgook$webgl_playground$Playground$Shader$mesh,
			{
				aS: A2($justgook$webgl_playground$Playground$Render$setAlpha, color, opacity),
				dP: index,
				cT: spriteSize,
				eA: opacity,
				aJ: spriteSheet,
				aK: imageSize,
				eF: translate,
				eG: scaleRotateSkew,
				a3: z
			});
	});
var $justgook$webgl_playground$Playground$Extra$Font$char = F8(
	function (spriteSheet, imageSize, color, w, h, x, y, index) {
		return {
			c3: 0,
			k: A3(
				$justgook$webgl_shape$WebGL$Shape2d$Form,
				w,
				h,
				A5(
					$justgook$webgl_playground$Playground$Render$tileWithColor,
					spriteSheet,
					A2($elm_explorations$linear_algebra$Math$Vector2$vec2, w, h),
					imageSize,
					color,
					index)),
			i: 1,
			e: 1,
			f: 1,
			bE: x,
			bF: y,
			a3: 0
		};
	});
var $elm$core$Tuple$mapBoth = F3(
	function (funcA, funcB, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			funcA(x),
			funcB(y));
	});
var $justgook$webgl_playground$Playground$Extra$Font$outputFold = F6(
	function (toChar, getIndex, w, h, c, _v0) {
		var chars = _v0.av;
		var x = _v0.bE;
		var y = _v0.bF;
		var width = _v0.c1;
		return (c === '\n') ? {
			av: chars,
			c1: A2($elm$core$Basics$max, width, x),
			bE: w,
			bF: y - h
		} : {
			av: A2(
				$elm$core$List$cons,
				A3(
					toChar,
					x,
					y,
					getIndex(c)),
				chars),
			c1: width,
			bE: x + w,
			bF: y
		};
	});
var $elm_explorations$webgl$WebGL$Texture$size = _Texture_size;
var $justgook$webgl_playground$Playground$Extra$Font$tileFont = F3(
	function (_v0, color, string) {
		var charW = _v0.dg;
		var charH = _v0.df;
		var src = _v0.es;
		var getIndex = _v0.dJ;
		return {
			c3: 0,
			k: A2(
				$justgook$webgl_shape$WebGL$Shape2d$Textured,
				src,
				function (t) {
					var _v1 = A3(
						$elm$core$Tuple$mapBoth,
						$elm$core$Basics$toFloat,
						$elm$core$Basics$toFloat,
						$elm_explorations$webgl$WebGL$Texture$size(t));
					var imgW = _v1.a;
					var imgH = _v1.b;
					var imgSize = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, imgW, imgH);
					var toChar = A5($justgook$webgl_playground$Playground$Extra$Font$char, t, imgSize, color, charW, charH);
					var output = A3(
						$elm$core$List$foldl,
						A4($justgook$webgl_playground$Playground$Extra$Font$outputFold, toChar, getIndex, charW, charH),
						{av: _List_Nil, c1: 0, bE: charW, bF: charH},
						$elm$core$String$toList(string));
					return {
						c3: 0,
						k: $justgook$webgl_shape$WebGL$Shape2d$Group(output.av),
						i: 1,
						e: 1,
						f: 1,
						bE: A2($elm$core$Basics$max, output.bE, output.c1) * (-0.5),
						bF: (output.bF * (-0.5)) + (0.5 * (-charH)),
						a3: 0
					};
				}),
			i: 1,
			e: 1,
			f: 1,
			bE: 0,
			bF: 0,
			a3: 0
		};
	});
var $justgook$webgl_playground$Playground$Font$SimpleMood$image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAAXNSR0IArs4c6QAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5TAP9bkSK1AAAPR0lEQVR4nO2aiZKsOg5E7f//6RfxugEpM7UYqK1veaYvyJYl5fFSRMyM8eI2oRUOzy5J2cEkipGN62wqQwnocIq7eHIqxefj/P6hBFNBMbyzAKwl5rouLN/9sw7A9geCK7sQiO/WVwM4/j2Gj67JC/erQFd0RN/+ttR6R/AKSFOPOx2GsDFQFuFYAwAbogZgcozoSACOn+LChMUKlwAwoAbAC5QcmRLANhgdCTCHeUFeHQCH2iOGM34JVwB8PmOHB0DcAQUAaRsABOwGAL9680uQDIPPLlAJwIEEh8D/SQCgZlBxBYB94wmBHAvkyQDYigFsL1p9CwBuOZbnLsEJcS5fgiUAV90AiFy/ACALJwWQkDps/oMHjGPUFgChME6PC0l3ogJgXBSAAbOLgsg/TOfPGM7040V+P+h1/OyYoKYWANiAy0ByACvjuh6KMA69xzFqlGTFJelXgQTZHgNArnTm/9xWCmzp/7aHtxX2nfXCsfwIPbbJYqFTve994s6oCOBYZV9u7lcB3lSx0EcGPgHA7hiW4xNSAQSA/RO1OqF55xdZEH3q+WDHc/9tFZ9oUTm4pyqF0X7U8aGOdAEbBS0DUJsqlKPuDDGZCzgGyNP3c/3uy1B7UJLwDmAAQtF5ABPjYQemofyhKWoI9BcADqbDFpQAgeQ/9j5vG2e9k20EoMZd/ssAqOUAqCAG4AQjkKcA8LYgkALYitAJBABO4IGE9UZHQEYPBVf6Vy9BBHC4hzsA9Zd3gnMRczG6eYhLr9JLPYsATJgAAO2oND154Bi243IO6q30BwQgfQRArAQvqbi5KX3sUBHA2PCidxzNipg3ALBgFT3Ut6iwaLZK0bkcpeNb6K8BrBf4bd/2vIaX3c+G/VubFm9J86gBbAPhrz7M3lxCcxDeWy7JJAT/Bh5FTdfGoEvPOtphzqDzkb3hhQnnVPsk2VgbgORhJG5WmEDV4gHg/7ByBwC1LXV9HQADntPEFwDUinMF4H76SyiWmI8GAOgOoEhefwgAbK4gq4eQoHM8LiuQMbxvCgDzOWseEUxXLBd6UNAdAAr9i78CnFDQmNm2vQFA7B/ku3CEEADVvAs+3OsFyXqYLgqckD0F0NBf0bMZ7MqY+HbF8og3XII5XxUu9q3iSQC2xN8XD+DKDpjlz2BHf3A+GxPkGCk+ZlguOKGZz9s/AH/+jAPO7+pp6K83rHnYEg/Ljm/piy2AAMAhra/S5PyvfkKUAL7t277trRvdyeKSFnfyMS5sN6fhv2QP/bsvVCWClRz+lnef79EEZeOz8l+x9y7U0NSvvsydRuoYinC8CtEzi9WZvwKAJboeMj4NQBVT8iEkh+FjfAKAvMn9IJiwx1HInDGAOSGit+cMbT1dAMjiLeuvnVhOBoDrKRQ2BYXjHQATF+gEAFVIBCAK2bFV/JXxUs7JIxAWkr1nBT4SgFSYyssRSSFvDEDJId/uzyDlmqYpBxxX/ijkZn8FYAwM1jwwQTzqQvdjXOsZ4fgN/jBZiE0IyNQJr3+h/ev6v8216JL6V9qcSCCylr+E/++g8OpD0j6DS3PrmeBPnhivik8AKgHFeAlA2XcDEH7Jz64N3iD46Ce+BytLAj0pAJ7mfRCASMw9AI51bwGYDwBQCaoARPM7AA55XQAz1eNmBAFS4jIgFpQAAJcegGY8Zb8DgLDAOwAMWPFlAJFjF4AaBzssqA0gOQL0fASAVUAVsAiA9jsI9OIXAOzLXQAqINcAxDvojH8GYNo2oEOMaxsAYDwn2g/LfFV91TPSUwFABWU8BWCICRkAle8KgCQ+Xzzf9m3f9jdacrpXL7nqln7Iz6guIBLHN1p2v8lb1NjV+MsBsDgCgDzY/drz+No6LZC/RxBoKFmLs50E5F4A0Xt7frTA/PkkskUEyD0mcEX4LQBohQr9VIEiwPslJDBNiwq1FaF9CsB0/3M86s31sxRB4ByAUIBcoGBN5Hw8436+FBwL1HKZyQIAZcOKJYxzAHimGQDirK45IYXqC+VyawEwGRTRFAAIJAC0IaCmlrgGpBUAtqLfJ9oLAPwWV/EnKMD3ORColJEek0x/RMAFdh1yTbVAKucQPDCuqqnKxzn0eB+A6VcAeMsGpl+QgUZySZ0CMKJ6lN4Ooz7Dj2p9AN/2bf9Oyw5D96h0rp32vKQvuP8vHed0/mUAxZ3zNgBSAt0oWX813m0q3tUL3ROABaMFjO3w298VCVuCN4hcEOefAujXC9Fpvv7yO2OzEgnAVVgAcD74vlLfPgsSEumTT8pVzVPQ2E/H3N9n/n+IiHIQws5ENW7mPwQALN+9AEDAFQBSTBW/DWDy2G0AViZ2xxWBswDQ5SUAVp/dPE0Aof/VutwWnWTmt6q41Q9HXeAEm/e4cez4d4T7BBkB5R/b6pBKAAioBLDgXwGQl8hT23IBry74277t7dvrz8ezC4Arga2inLvLffYK4J0oAKT13F7vKwD0bSrOEYKfZerJxsnfJr/zib+DSwBoP8Ry1ZddOv4iAFISSfRyx37wD11+8uozKqA1f5r/fwAUJPOw/vKM8/IkX4arT78gNYC5P7Izpeez5EUAR4ZtbLiXrnCITiVFANS3OswXRjw+DEyVP3QA3Q6ATajsIVobQHLpqHEGjPpXfwWc7PIOCy+18wCKFf55oTRQYJi7B8CPifyhQErPK0hnTI5DYMqfPXW+SLAgltQfeW/9PM71eC89PtCILj1dIASsAUT6Q6Hd/sc3BbAx5YEVfdu/1fBM+t7BW/S4K9hX+auEV+J1/NWvciRIApDu4c+Yuq9CAqfiLfirXx1XDwZUANR7UgD5VwBW4634q3wEoJp0pVUAHt5gwwRHyPu7/k6AZ9ryMyi25/QB0C4BVAGebZ8BkD1bADK/VfvqczX3LQDcCly0VT4cz+wzANJ4FaFEz+ktHQBo2S8BoILf/eyKOwMgzRut0COfV/LdDsBUFAKJ7HnCvpJP1VvZNk4ElI1egnOXwPl8p+wOAFfPE9qz833bZ7Wf/RFu4Ucm7fvimXMRIFh+A+ifpRsByPkYLA0Od9gEmwFEd1x8B64KDBDLeNGl186GAqoVU8mivjBeIogBNOoDxbQc6AAA9n9qXNdbC7jYUNZv7g/lH29R7NjM339oQsuOhFx5ckJJcLfNQwPQgM1EM0GMl/Yjn/pGM31NAK5Z0c8W1BeOCwJdoYM2VcTPBIAdqwBArzwCdz+vAFZ7GAWZhxwHouT8UABqx60AG3797rgE6Q7Y/3kIgEWwKBD1S4FzUpcYpwVxAKIVuMPGZ+aPAsQ4OyfDBEAQ9hdF4b9qk4BqfrWCoHB7xYDjbZoQeHd4+xzA79tuaPP3Go3sT2i4K1bsn+0LR3CsbLPX78mL+t1vEdr7IY/stVvJ3GWuI7wkx7Elp3s9qZdsjMh2daufAmAvtzlwCVw8J1oTeGQ7CtT2YMBFvG1KEwBIJgK0InKD7l02cTQ+cbwAsNJQrwBAdEkwAJF7lPWvfLmtASAaFA98Yb3MQwHDUdEFRaj3ledWIxIE28tl/fvKIiDqYNEeD883nVjgPQBMvIOIlzekucc6AOAO2eJl+sMTT51c8N0A8hatcGzvPPcFNA8EUB8BFHAHAHdwEYgwf196AH6nbltgM71mL4D42I6HALA1NAFE+dWYXfISgBDsgEzbggL1cArC15A0BaDpb4EkAOjIO/2ZQhyXdgGiJcgnKCe4vOIOUDto+5f1v7wt6v+229t0f/Sf6f9+pvAWSy8t5ROWs3ikOv5Zbi////+6P0DQAjBV8iaA2RG06J+fLyTg/+QGSADwgc4FoPth6Oe0bcm/J788Aw8D4OY3AcwbACzq/4MA7rgDSIAZpwIbACS4BID1h4EawMU7QCZIVhTqJ38fRD2jORqQrsfmpr+1O0ATbgKgY7IAILCr+KreS3fA5wO4eAdIABPHiwIJ4AkAU8QP63Fzr90BZQIAUF1Sx6sGgOMSKJaWLNALvgOEIAJY+V8EAPVfugM+H8DFO+CtALD+ocdcxw13QHInVADIvwDA42eazUd/1+4AthsAlvxvBtATVAYoxleBqLl3jr8EAB4f9YxusWT8zPxJvk8B8Js1BTCds5kluyle1LL5bwdgVcAXwF0AJtZbCEzGaX5YsIUVA8AgEkBCIJ1fzF2IVfnD7tjGzVAHrqS94B4HeTQALDgDsFr7NfUnBf0pAH1Fi+7NI4D3xWrpV+V3cvCltuoPK775ILB9apPqmr8eahHI7I6/AsB1rf6s3fQz+AXwQgADCvq7AGAsiuEK1sPyQ6rrf6rdAQDfOwA641fj1Q4N/xW4nflxvGoLV/1i/l0AVo+TmUI1vxBAlSABYP3b83W+jwfQn/8F8HIA8OwBMPNWAey9Sb4g80MAdAMe48ofpzpbpR1AUORr1f9OAHBWlnoVQKj/CyAU1gRzAsAQ/jjV2lF5Rb60ihsBlIK3eel8CcROhMv2gFQVjkCfD6D1pVgBsPP9sw9A1/cF8B4A8Oh+MADjDcn70/kSzJ6YL4rnhTwWAP2MYd+V+SpeFfvpAL7tn26wj7KN1RlfzbdsX80Xj9svtucBqPJrmz5GG+k80Z+X0bi0IIJ9RuPBfFcUvjef07WxySB9Lr2sx0asElNEwx4LiufDlEUAzt18cOxagnoVgIETENBwbXew9cvVjApnDcdoKVzp8QB2uxvPiVgH4AlsFUWCJADT1VkxM94GEC5IACDaci8BYA81PEsAdnc/CICLfw7ATPwh4PsB8PolAC8RAQw3KPJukk4BwPo1AFMgFlwBmEdi4y8BQAQuShU4j4DREXAZovqj57EBOQCtTghAAmRxEgBMkPEAAI/LAGE8X9c+dgCAxSEA/hFkVGIhhCpYCsAzKqrqxmcAPDmJ/CHtD0j47Kb2c7VrP7uBvALAm4FQy8P3oJgjQhgb3+iHjWZfVBDbrekJACagJNiFdQCc27C7Rf9urtTMhrC7wWIAcsFxvAvAHgj55bRSsgtLBYH3cnjskgbnGwAAFMMukACqcisAYr2SiLQD7gXg+0UMBsD1pvkIgCp+BYBOWB8BZYc6mHcCQMRHi6b374QagBRcFJgAUPvHRcgA0HKHAOL4jXbiZxCHRSBz/ovs8RH4f2RNzZkdsNgyAL7xr2Annih3sboVAKv2kFs0+hkEHCfaxwMYZ1aRCj4590HNA0Bakdcd6d6koUzBAxb97SRca/GSRADepf0HLcFaUmZNR2YAAAAASUVORK5CYII=';
var $justgook$webgl_playground$Playground$Font$SimpleMood$letters_ = $elm$core$Dict$fromList(
	A2(
		$elm$core$List$indexedMap,
		F2(
			function (a, b) {
				return _Utils_Tuple2(b, a);
			}),
		$elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					['\u0000', '☺', '☻', '♥', '♦', '♣', '♠', '•', '◘', '○', '◙', '♂', '♀', '♪', '♫', '☼']),
					_List_fromArray(
					['►', '◄', '↕', '‼', '¶', '§', '▬', '↨', '↑', '↓', '→', '←', '∟', '↔', '▲', '▼']),
					_List_fromArray(
					[' ', '!', '\"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/']),
					_List_fromArray(
					['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?']),
					_List_fromArray(
					['@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']),
					_List_fromArray(
					['P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_']),
					_List_fromArray(
					['`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o']),
					_List_fromArray(
					['p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', '⌂']),
					_List_fromArray(
					['Ç', 'ü', 'é', 'â', 'ä', 'à', 'å', 'ç', 'ê', 'ë', 'è', 'ï', 'î', 'ì', 'Ä', 'Å']),
					_List_fromArray(
					['É', 'æ', 'Æ', 'ô', 'ö', 'ò', 'û', 'ù', 'ÿ', 'Ö', 'Ü', '¢', '£', '¥', '₧', 'ƒ']),
					_List_fromArray(
					['á', 'í', 'ó', 'ú', 'ñ', 'Ñ', 'ª', 'º', '¿', '⌐', '¬', '½', '¼', '¡', '«', '»']),
					_List_fromArray(
					['░', '▒', '▓', '│', '┤', '╡', '╢', '╖', '╕', '╣', '║', '╗', '╝', '╜', '╛', '┐']),
					_List_fromArray(
					['└', '┴', '┬', '├', '─', '┼', '╞', '╟', '╚', '╔', '╩', '╦', '╠', '═', '╬', '╧']),
					_List_fromArray(
					['╨', '╤', '╥', '╙', '╘', '╒', '╓', '╫', '╪', '┘', '┌', '█', '▄', '▌', '▐', '▀']),
					_List_fromArray(
					['α', 'ß', 'Γ', 'π', 'Σ', 'σ', 'µ', 'τ', 'Φ', 'Θ', 'Ω', 'δ', '∞', 'φ', 'ε', '∩']),
					_List_fromArray(
					['≡', '±', '≥', '≤', '⌠', '⌡', '÷', '≈', '°', '∙', '·', '√', 'ⁿ', '²', '■', '\u00A0'])
				]))));
var $justgook$webgl_playground$Playground$Font$SimpleMood$letters = function (c) {
	return A2(
		$elm$core$Maybe$withDefault,
		0,
		A2($elm$core$Dict$get, c, $justgook$webgl_playground$Playground$Font$SimpleMood$letters_));
};
var $justgook$webgl_playground$Playground$wordsConfig = {df: 16, dg: 16, dJ: $justgook$webgl_playground$Playground$Font$SimpleMood$letters, es: $justgook$webgl_playground$Playground$Font$SimpleMood$image};
var $justgook$webgl_playground$Playground$words = $justgook$webgl_playground$Playground$Extra$Font$tileFont($justgook$webgl_playground$Playground$wordsConfig);
var $author$project$Durak$Common$Qr$render = A2(
	$elm$core$Basics$composeR,
	$pablohirafuji$elm_qrcode$QRCode$fromString,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$Result$map(
			A2(
				$elm$core$Basics$composeR,
				$pablohirafuji$elm_qrcode$QRCode$toMatrix,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$List$map(
						A2(
							$elm$core$Basics$composeR,
							$elm$core$List$map(
								function (a) {
									return a ? '█' : ' ';
								}),
							$elm$core$String$fromList)),
					$elm$core$String$join('\n')))),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Result$withDefault(''),
			A2(
				$elm$core$Basics$composeR,
				$justgook$webgl_playground$Playground$words($justgook$webgl_playground$Playground$black),
				$justgook$webgl_playground$Playground$scale(0.125)))));
var $author$project$Durak$Player$Component$Card$size = {b$: 48, dY: 4, dZ: 7, c1: 32};
var $justgook$webgl_playground$Playground$Extra$size = function (t) {
	return function (_v0) {
		var w = _v0.a;
		var h = _v0.b;
		return A2($elm_explorations$linear_algebra$Math$Vector2$vec2, w, h);
	}(
		$elm_explorations$webgl$WebGL$Texture$size(t));
};
var $justgook$webgl_playground$Playground$Shader$fragImage = {
	src: '\n        precision mediump float;\n        varying vec2 uv;\n        uniform vec2 uImgSize;\n        uniform sampler2D uImg;\n        uniform float uA;\n        void main () {\n            vec2 pixel = (floor(uv * uImgSize) + 0.5) / uImgSize;\n            gl_FragColor = texture2D(uImg, pixel);\n            gl_FragColor.a *= uA;\n            if(gl_FragColor.a <= 0.025) discard;\n        }\n    ',
	attributes: {},
	uniforms: {uA: 'eA', uImg: 'aJ', uImgSize: 'aK'}
};
var $justgook$webgl_playground$Playground$Render$tile = F8(
	function (spriteSheet, spriteSize, imageSize, index, translate, scaleRotateSkew, z, opacity) {
		return A5(
			$elm_explorations$webgl$WebGL$entityWith,
			$justgook$webgl_playground$Playground$Render$defaultEntitySettings,
			$justgook$webgl_playground$Playground$Shader$vertTile,
			$justgook$webgl_playground$Playground$Shader$fragImage,
			$justgook$webgl_playground$Playground$Shader$mesh,
			{dP: index, cT: spriteSize, eA: opacity, aJ: spriteSheet, aK: imageSize, eF: translate, eG: scaleRotateSkew, a3: z});
	});
var $justgook$webgl_playground$Playground$Extra$tile = F4(
	function (tileW, tileH, tileset, index) {
		return {
			c3: 0,
			k: A2(
				$justgook$webgl_shape$WebGL$Shape2d$Textured,
				tileset,
				function (t) {
					return {
						c3: 0,
						k: A3(
							$justgook$webgl_shape$WebGL$Shape2d$Form,
							tileW,
							tileH,
							A4(
								$justgook$webgl_playground$Playground$Render$tile,
								t,
								A2($elm_explorations$linear_algebra$Math$Vector2$vec2, tileW, tileH),
								$justgook$webgl_playground$Playground$Extra$size(t),
								index)),
						i: 1,
						e: 1,
						f: 1,
						bE: 0,
						bF: 0,
						a3: 0
					};
				}),
			i: 1,
			e: 1,
			f: 1,
			bE: 0,
			bF: 0,
			a3: 0
		};
	});
var $author$project$Durak$Player$Component$Card$shape = A3($justgook$webgl_playground$Playground$Extra$tile, $author$project$Durak$Player$Component$Card$size.c1, $author$project$Durak$Player$Component$Card$size.b$, '/Durak/asset/cards.png');
var $author$project$Durak$Player$Component$Card$back = $author$project$Durak$Player$Component$Card$shape(53);
var $justgook$webgl_playground$Playground$move = F3(
	function (dx, dy, _v0) {
		var shape = _v0;
		var x = shape.bE;
		var y = shape.bF;
		var a = shape.c3;
		var sx = shape.e;
		var sy = shape.f;
		var o = shape.i;
		var form = shape.k;
		return _Utils_update(
			shape,
			{bE: x + dx, bF: y + dy});
	});
var $justgook$webgl_playground$Playground$moveX = F2(
	function (dx, _v0) {
		var shape = _v0;
		var x = shape.bE;
		var y = shape.bF;
		var a = shape.c3;
		var sx = shape.e;
		var sy = shape.f;
		var o = shape.i;
		var form = shape.k;
		return _Utils_update(
			shape,
			{bE: x + dx});
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $justgook$webgl_playground$Playground$rotate = F2(
	function (da, _v0) {
		var shape = _v0;
		var x = shape.bE;
		var y = shape.bF;
		var a = shape.c3;
		var sx = shape.e;
		var sy = shape.f;
		var o = shape.i;
		var form = shape.k;
		return _Utils_update(
			shape,
			{
				c3: a + $elm$core$Basics$degrees(da)
			});
	});
var $author$project$Durak$Spectator$System$Players$system = function (_v0) {
	var screen = _v0.en;
	var world = _v0.bC;
	var offset = 10;
	return A2(
		$elm$core$Tuple$pair,
		world,
		$justgook$webgl_playground$Playground$group(
			function (l) {
				var pCount = $elm$core$List$length(l);
				return (pCount > 0) ? A2(
					$elm$core$List$indexedMap,
					F2(
						function (i, _v1) {
							var a = _v1.a;
							var count = _v1.b;
							return A2(
								$justgook$webgl_playground$Playground$rotate,
								(360 / pCount) * i,
								$justgook$webgl_playground$Playground$group(
									_List_fromArray(
										[
											A3($justgook$webgl_playground$Playground$move, ((count - 1) * (-offset)) * 0.5, screen.ez - 32, a)
										])));
						}),
					l) : A2($elm$core$List$map, $elm$core$Tuple$first, l);
			}(
				A2(
					$elm$core$List$filterMap,
					function (count) {
						return (count > 0) ? $elm$core$Maybe$Just(
							_Utils_Tuple2(
								$justgook$webgl_playground$Playground$group(
									A2(
										$elm$core$List$indexedMap,
										function (i) {
											return $justgook$webgl_playground$Playground$moveX(i * offset);
										},
										A2($elm$core$List$repeat, count, $author$project$Durak$Player$Component$Card$back))),
								count)) : $elm$core$Maybe$Nothing;
					},
					_List_fromArray(
						[world.ar.c3, world.ar.c7, world.ar.dm, world.ar.dt, world.ar.dD, world.ar.dI])))));
};
var $justgook$webgl_shape$WebGL$Shape2d$Transformation$identity = {z: 1, A: 0, O: 0, B: 0, C: 1, P: 0};
var $justgook$webgl_shape$WebGL$Shape2d$Transformation$apply = F2(
	function (a, b) {
		return {z: (a.z * b.z) + (a.A * b.B), A: (a.z * b.A) + (a.A * b.C), O: ((a.z * b.O) + (a.A * b.P)) + a.O, B: (a.B * b.z) + (a.C * b.B), C: (a.B * b.A) + (a.C * b.C), P: ((a.B * b.O) + (a.C * b.P)) + a.P};
	});
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$sin = _Basics_sin;
var $justgook$webgl_shape$WebGL$Shape2d$Transformation$transform = F5(
	function (tx, ty, sx, sy, angle) {
		return {
			z: $elm$core$Basics$cos(angle) * sx,
			A: $elm$core$Basics$sin(angle) * (-sy),
			O: tx,
			B: $elm$core$Basics$sin(angle) * sx,
			C: $elm$core$Basics$cos(angle) * sy,
			P: ty
		};
	});
var $justgook$webgl_shape$WebGL$Shape2d$createTrans = F6(
	function (tx, ty, sx_, sy_, a_, parent) {
		return A2(
			$justgook$webgl_shape$WebGL$Shape2d$Transformation$apply,
			parent,
			A5($justgook$webgl_shape$WebGL$Shape2d$Transformation$transform, tx, ty, sx_, sy_, a_));
	});
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $justgook$webgl_shape$WebGL$Shape2d$Transformation$scale = F3(
	function (sx, sy, b) {
		return {z: sx * b.z, A: sx * b.A, O: sx * b.O, B: sy * b.B, C: sy * b.C, P: sy * b.P};
	});
var $justgook$webgl_shape$WebGL$Shape2d$setOZ = F3(
	function (o, z, _v0) {
		var shape = _v0;
		return _Utils_update(
			shape,
			{i: o * shape.i, a3: z + shape.a3});
	});
var $elm_explorations$linear_algebra$Math$Vector2$fromRecord = _MJS_v2fromRecord;
var $elm_explorations$linear_algebra$Math$Vector4$fromRecord = _MJS_v4fromRecord;
var $justgook$webgl_shape$WebGL$Shape2d$Transformation$toGL = function (_v0) {
	var a11 = _v0.z;
	var a12 = _v0.A;
	var a13 = _v0.O;
	var a21 = _v0.B;
	var a22 = _v0.C;
	var a23 = _v0.P;
	return _Utils_Tuple2(
		$elm_explorations$linear_algebra$Math$Vector4$fromRecord(
			{c0: a22, bE: a11, bF: a12, a3: a21}),
		$elm_explorations$linear_algebra$Math$Vector2$fromRecord(
			{bE: a13, bF: a23}));
};
var $justgook$webgl_shape$WebGL$Shape2d$renderShape = F5(
	function (screen, textures, parent, _v0, acc) {
		renderShape:
		while (true) {
			var x = _v0.bE;
			var y = _v0.bF;
			var z = _v0.a3;
			var a = _v0.c3;
			var sx = _v0.e;
			var sy = _v0.f;
			var o = _v0.i;
			var form = _v0.k;
			var entities = acc.a;
			var missing = acc.b;
			switch (form.$) {
				case 0:
					var width = form.a;
					var height = form.b;
					var fn = form.c;
					var _v2 = $justgook$webgl_shape$WebGL$Shape2d$Transformation$toGL(
						A3(
							$justgook$webgl_shape$WebGL$Shape2d$Transformation$scale,
							1 / screen.c1,
							1 / screen.b$,
							A6($justgook$webgl_shape$WebGL$Shape2d$createTrans, x * 2, y * 2, width * sx, height * sy, a, parent)));
					var t1 = _v2.a;
					var t2 = _v2.b;
					return _Utils_Tuple2(
						A2(
							$elm$core$List$cons,
							A4(fn, t2, t1, z, o),
							entities),
						missing);
				case 1:
					var src = form.a;
					var fn = form.b;
					var _v3 = A2($elm$core$Dict$get, src, textures);
					if (!_v3.$) {
						var texture = _v3.a;
						var shape = fn(texture);
						var $temp$screen = screen,
							$temp$textures = textures,
							$temp$parent = A6($justgook$webgl_shape$WebGL$Shape2d$createTrans, x * 2, y * 2, sx, sy, a, parent),
							$temp$_v0 = A3($justgook$webgl_shape$WebGL$Shape2d$setOZ, o, z, shape),
							$temp$acc = acc;
						screen = $temp$screen;
						textures = $temp$textures;
						parent = $temp$parent;
						_v0 = $temp$_v0;
						acc = $temp$acc;
						continue renderShape;
					} else {
						return A2($elm$core$Set$member, src, missing) ? acc : _Utils_Tuple2(
							entities,
							A2($elm$core$Set$insert, src, missing));
					}
				default:
					var shapes = form.a;
					var fn = function (shape) {
						return A4(
							$justgook$webgl_shape$WebGL$Shape2d$renderShape,
							screen,
							textures,
							A6($justgook$webgl_shape$WebGL$Shape2d$createTrans, x * 2, y * 2, sx, sy, a, parent),
							A3($justgook$webgl_shape$WebGL$Shape2d$setOZ, o, z, shape));
					};
					return A3($elm$core$List$foldr, fn, acc, shapes);
			}
		}
	});
var $justgook$webgl_shape$WebGL$Shape2d$toEntities = F3(
	function (textures, screen, shapes) {
		return A3(
			$elm$core$List$foldr,
			A3($justgook$webgl_shape$WebGL$Shape2d$renderShape, screen, textures, $justgook$webgl_shape$WebGL$Shape2d$Transformation$identity),
			_Utils_Tuple2(_List_Nil, $elm$core$Set$empty),
			shapes);
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$core$Set$union = F2(
	function (_v0, _v1) {
		var dict1 = _v0;
		var dict2 = _v1;
		return A2($elm$core$Dict$union, dict1, dict2);
	});
var $author$project$Durak$Spectator$System$Tick$system = F2(
	function (time, model) {
		var textures = model.cY;
		var screen = model.en;
		var andThen = $author$project$Durak$Common$Util$andThen(model);
		var _v0 = A2(
			andThen,
			$author$project$Durak$Spectator$System$Players$system,
			_Utils_Tuple2(
				model.bC,
				$justgook$webgl_playground$Playground$group(
					_List_fromArray(
						[
							A2(
							$justgook$webgl_playground$Playground$scale,
							0.5,
							$author$project$Durak$Common$Qr$render('https://pandemic.z0.lv/?asdasdas'))
						]))));
		var world = _v0.a;
		var shape = _v0.b;
		var cmd = $author$project$Durak$Spectator$System$Tick$output(world.eh);
		var _v1 = A3(
			$justgook$webgl_shape$WebGL$Shape2d$toEntities,
			textures.dr,
			screen,
			_List_fromArray(
				[shape]));
		var entities = _v1.a;
		var missing = _v1.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					dx: entities,
					cY: _Utils_update(
						textures,
						{
							bj: A2($elm$core$Set$union, missing, textures.bj)
						}),
					ex: time,
					bC: _Utils_update(
						world,
						{eh: _List_Nil})
				}),
			$elm$core$Platform$Cmd$batch(
				A3(
					$elm$core$Set$foldl,
					A2($elm$core$Basics$composeR, $author$project$Durak$Spectator$System$Tick$getTexture, $elm$core$List$cons),
					_List_fromArray(
						[cmd]),
					A2($elm$core$Set$diff, missing, textures.bj))));
	});
var $author$project$Durak$Spectator$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var time = msg.a;
				return A2($author$project$Durak$Spectator$System$Tick$system, time, model);
			case 1:
				var screen = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{en: screen}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Durak$Spectator$main = $author$project$Game$Client$start(
	{dQ: $author$project$Durak$Spectator$init, eI: $author$project$Durak$Spectator$update});
/*
_Platform_export({'Durak':{'Spectator':{'init':$author$project$Durak$Spectator$main($elm$json$Json$Decode$value)(0)}}});}(this));
*/
export const Elm = {'Durak':{'Spectator':{'init':$author$project$Durak$Spectator$main($elm$json$Json$Decode$value)(0)}}};
export default Elm;
