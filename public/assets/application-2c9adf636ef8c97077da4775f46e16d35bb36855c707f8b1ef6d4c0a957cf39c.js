/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/*
Turbolinks 5.1.0
Copyright © 2018 Basecamp, LLC
 */
(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,e){return Turbolinks.controller.visit(t,e)},clearCache:function(){return Turbolinks.controller.clearCache()},setProgressBarDelay:function(t){return Turbolinks.controller.setProgressBarDelay(t)}}}).call(this),function(){var t,e,r,n=[].slice;Turbolinks.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},Turbolinks.closest=function(e,r){return t.call(e,r)},t=function(){var t,r;return t=document.documentElement,null!=(r=t.closest)?r:function(t){var r;for(r=this;r;){if(r.nodeType===Node.ELEMENT_NODE&&e.call(r,t))return r;r=r.parentNode}}}(),Turbolinks.defer=function(t){return setTimeout(t,1)},Turbolinks.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},Turbolinks.dispatch=function(t,e){var n,o,i,s,a,u;return a=null!=e?e:{},u=a.target,n=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,n===!0),i.data=null!=o?o:{},i.cancelable&&!r&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},r=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),Turbolinks.match=function(t,r){return e.call(t,r)},e=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),Turbolinks.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}.call(this),function(){Turbolinks.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.HttpRequest=function(){function e(e,r,n){this.delegate=e,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=Turbolinks.Location.wrap(r).requestURL,this.referrer=Turbolinks.Location.wrap(n).absoluteURL,this.createXHR()}return e.NETWORK_FAILURE=0,e.TIMEOUT_FAILURE=-1,e.timeout=60,e.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},e.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},e.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},e.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},e.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},e.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},e.prototype.requestCanceled=function(){return this.endRequest()},e.prototype.notifyApplicationBeforeRequestStart=function(){return Turbolinks.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},e.prototype.notifyApplicationAfterRequestEnd=function(){return Turbolinks.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},e.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},e.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},e.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},e.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.BrowserAdapter=function(){function e(e){this.controller=e,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new Turbolinks.ProgressBar}var r,n,o;return o=Turbolinks.HttpRequest,r=o.NETWORK_FAILURE,n=o.TIMEOUT_FAILURE,e.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},e.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},e.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},e.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},e.prototype.visitRequestCompleted=function(t){return t.loadResponse()},e.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case r:case n:return this.reload();default:return t.loadResponse()}},e.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},e.prototype.visitCompleted=function(t){return t.followRedirect()},e.prototype.pageInvalidated=function(){return this.reload()},e.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},e.prototype.showProgressBar=function(){return this.progressBar.show()},e.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},e.prototype.reload=function(){return window.location.reload()},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.History=function(){function e(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},e.prototype.push=function(t,e){return t=Turbolinks.Location.wrap(t),this.update("push",t,e)},e.prototype.replace=function(t,e){return t=Turbolinks.Location.wrap(t),this.update("replace",t,e)},e.prototype.onPopState=function(t){var e,r,n,o;return this.shouldHandlePopState()&&(o=null!=(r=t.state)?r.turbolinks:void 0)?(e=Turbolinks.Location.wrap(window.location),n=o.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(e,n)):void 0},e.prototype.onPageLoad=function(t){return Turbolinks.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},e.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},e.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},e.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},e}()}.call(this),function(){Turbolinks.Snapshot=function(){function t(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return t.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},t.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},t.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},t.prototype.clone=function(){return new t({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},t.prototype.getRootLocation=function(){var t,e;return e=null!=(t=this.getSetting("root"))?t:"/",new Turbolinks.Location(e)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.body.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},t}()}.call(this),function(){var t=[].slice;Turbolinks.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){Turbolinks.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var t=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t},e={}.hasOwnProperty;Turbolinks.SnapshotRenderer=function(e){function r(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=new Turbolinks.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new Turbolinks.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return t(r,e),r.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},r.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},r.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},r.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},r.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},r.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},r.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},r.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},r.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},r.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.assignNewBody=function(){return document.body=this.newBody},r.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},r.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},r.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},r.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},r.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},r.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},r.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},r.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},r.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},r}(Turbolinks.Renderer)}.call(this),function(){var t=function(t,r){function n(){this.constructor=t}for(var o in r)e.call(r,o)&&(t[o]=r[o]);return n.prototype=r.prototype,t.prototype=new n,t.__super__=r.prototype,t},e={}.hasOwnProperty;Turbolinks.ErrorRenderer=function(e){function r(t){this.html=t}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(Turbolinks.Renderer)}.call(this),function(){Turbolinks.View=function(){function t(t){this.delegate=t,this.element=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return Turbolinks.Snapshot.fromElement(this.element)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,e,r){return Turbolinks.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),Turbolinks.Snapshot.wrap(t),e)},t.prototype.renderError=function(t,e){return Turbolinks.ErrorRenderer.render(this.delegate,e,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.ScrollManager=function(){function e(e){this.delegate=e,this.onScroll=t(this.onScroll,this),this.onScroll=Turbolinks.throttle(this.onScroll)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},e.prototype.scrollToElement=function(t){return t.scrollIntoView()},e.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},e.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},e.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},e}()}.call(this),function(){Turbolinks.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var e;return t.prototype.has=function(t){var r;return r=e(t),r in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var r;return r=e(t),this.snapshots[r]},t.prototype.write=function(t,r){var n;return n=e(t),this.snapshots[n]=r},t.prototype.touch=function(t){var r,n;return n=e(t),r=this.keys.indexOf(n),r>-1&&this.keys.splice(r,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},e=function(t){return Turbolinks.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.Visit=function(){function e(e,r,n){this.controller=e,this.action=n,this.performScroll=t(this.performScroll,this),this.identifier=Turbolinks.uuid(),this.location=Turbolinks.Location.wrap(r),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var r;return e.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},e.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},e.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},e.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},e.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=r(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},e.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new Turbolinks.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},e.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},e.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},e.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},e.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},e.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},e.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},e.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},e.prototype.requestCompletedWithResponse=function(t,e){return this.response=t,null!=e&&(this.redirectedToLocation=Turbolinks.Location.wrap(e)),this.adapter.visitRequestCompleted(this)},e.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},e.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},e.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},e.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},e.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},e.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},e.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},e.prototype.getTimingMetrics=function(){return Turbolinks.copyObject(this.timingMetrics)},r=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},e.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},e.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},e.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},e.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.Controller=function(){function e(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new Turbolinks.History(this),this.view=new Turbolinks.View(this),this.scrollManager=new Turbolinks.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return e.prototype.start=function(){return Turbolinks.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},e.prototype.disable=function(){return this.enabled=!1},e.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},e.prototype.clearCache=function(){return this.cache=new Turbolinks.SnapshotCache(10)},e.prototype.visit=function(t,e){var r,n;return null==e&&(e={}),t=Turbolinks.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(r=null!=(n=e.action)?n:"advance",this.adapter.visitProposedToLocationWithAction(t,r)):window.location=t:void 0},e.prototype.startVisitToLocationWithAction=function(t,e,r){var n;return Turbolinks.supported?(n=this.getRestorationDataForIdentifier(r),this.startVisit(t,e,{restorationData:n})):window.location=t},e.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},e.prototype.startHistory=function(){return this.location=Turbolinks.Location.wrap(window.location),this.restorationIdentifier=Turbolinks.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.stopHistory=function(){return this.history.stop()},e.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=Turbolinks.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},e.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=Turbolinks.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,e){var r;return this.restorationIdentifier=e,this.enabled?(r=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:r,historyChanged:!0}),this.location=Turbolinks.Location.wrap(t)):this.adapter.pageInvalidated()},e.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},e.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},e.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},e.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},e.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},e.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},e.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},e.prototype.render=function(t,e){return this.view.render(t,e)},e.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},e.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},e.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},e.prototype.pageLoaded=function(){
return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},e.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},e.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},e.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},e.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},e.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,e){return Turbolinks.dispatch("turbolinks:click",{target:t,data:{url:e.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationBeforeVisitingLocation=function(t){return Turbolinks.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationAfterVisitingLocation=function(t){return Turbolinks.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},e.prototype.notifyApplicationBeforeCachingSnapshot=function(){return Turbolinks.dispatch("turbolinks:before-cache")},e.prototype.notifyApplicationBeforeRender=function(t){return Turbolinks.dispatch("turbolinks:before-render",{data:{newBody:t}})},e.prototype.notifyApplicationAfterRender=function(){return Turbolinks.dispatch("turbolinks:render")},e.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),Turbolinks.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},e.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},e.prototype.createVisit=function(t,e,r){var n,o,i,s,a;return o=null!=r?r:{},s=o.restorationIdentifier,i=o.restorationData,n=o.historyChanged,a=new Turbolinks.Visit(this,t,e),a.restorationIdentifier=null!=s?s:Turbolinks.uuid(),a.restorationData=Turbolinks.copyObject(i),a.historyChanged=n,a.referrer=this.location,a},e.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},e.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},e.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?Turbolinks.closest(t,"a[href]:not([target]):not([download])"):void 0},e.prototype.getVisitableLocationForLink=function(t){var e;return e=new Turbolinks.Location(t.getAttribute("href")),this.locationIsVisitable(e)?e:void 0},e.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},e.prototype.nodeIsVisitable=function(t){var e;return(e=Turbolinks.closest(t,"[data-turbolinks]"))?"false"!==e.getAttribute("data-turbolinks"):!0},e.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},e.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},e.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},e}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,e,r;Turbolinks.start=function(){return e()?(null==Turbolinks.controller&&(Turbolinks.controller=t()),Turbolinks.controller.start()):void 0},e=function(){return null==window.Turbolinks&&(window.Turbolinks=Turbolinks),r()},t=function(){var t;return t=new Turbolinks.Controller,t.adapter=new Turbolinks.BrowserAdapter(t),t},r=function(){return window.Turbolinks===Turbolinks},r()&&Turbolinks.start()}.call(this);
/*
* bootstrap-table - v1.11.1 - 2017-02-22
* https://github.com/wenzhixin/bootstrap-table
* Copyright (c) 2017 zhixin wen
* Licensed MIT License
*/
!function(a){"use strict";var b=null,c=function(a){var b=arguments,c=!0,d=1;return a=a.replace(/%s/g,function(){var a=b[d++];return"undefined"==typeof a?(c=!1,""):a}),c?a:""},d=function(b,c,d,e){var f="";return a.each(b,function(a,b){return b[c]===e?(f=b[d],!1):!0}),f},e=function(b,c){var d=-1;return a.each(b,function(a,b){return b.field===c?(d=a,!1):!0}),d},f=function(b){var c,d,e,f=0,g=[];for(c=0;c<b[0].length;c++)f+=b[0][c].colspan||1;for(c=0;c<b.length;c++)for(g[c]=[],d=0;f>d;d++)g[c][d]=!1;for(c=0;c<b.length;c++)for(d=0;d<b[c].length;d++){var h=b[c][d],i=h.rowspan||1,j=h.colspan||1,k=a.inArray(!1,g[c]);for(1===j&&(h.fieldIndex=k,"undefined"==typeof h.field&&(h.field=k)),e=0;i>e;e++)g[c+e][k]=!0;for(e=0;j>e;e++)g[c][k+e]=!0}},g=function(){if(null===b){var c,d,e=a("<p/>").addClass("fixed-table-scroll-inner"),f=a("<div/>").addClass("fixed-table-scroll-outer");f.append(e),a("body").append(f),c=e[0].offsetWidth,f.css("overflow","scroll"),d=e[0].offsetWidth,c===d&&(d=f[0].clientWidth),f.remove(),b=c-d}return b},h=function(b,d,e,f){var g=d;if("string"==typeof d){var h=d.split(".");h.length>1?(g=window,a.each(h,function(a,b){g=g[b]})):g=window[d]}return"object"==typeof g?g:"function"==typeof g?g.apply(b,e||[]):!g&&"string"==typeof d&&c.apply(this,[d].concat(e))?c.apply(this,[d].concat(e)):f},i=function(b,c,d){var e=Object.getOwnPropertyNames(b),f=Object.getOwnPropertyNames(c),g="";if(d&&e.length!==f.length)return!1;for(var h=0;h<e.length;h++)if(g=e[h],a.inArray(g,f)>-1&&b[g]!==c[g])return!1;return!0},j=function(a){return"string"==typeof a?a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/`/g,"&#x60;"):a},k=function(a){for(var b in a){var c=b.split(/(?=[A-Z])/).join("-").toLowerCase();c!==b&&(a[c]=a[b],delete a[b])}return a},l=function(a,b,c){var d=a;if("string"!=typeof b||a.hasOwnProperty(b))return c?j(a[b]):a[b];var e=b.split(".");for(var f in e)e.hasOwnProperty(f)&&(d=d&&d[e[f]]);return c?j(d):d},m=function(){return!!(navigator.userAgent.indexOf("MSIE ")>0||navigator.userAgent.match(/Trident.*rv\:11\./))},n=function(){Object.keys||(Object.keys=function(){var a=Object.prototype.hasOwnProperty,b=!{toString:null}.propertyIsEnumerable("toString"),c=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],d=c.length;return function(e){if("object"!=typeof e&&("function"!=typeof e||null===e))throw new TypeError("Object.keys called on non-object");var f,g,h=[];for(f in e)a.call(e,f)&&h.push(f);if(b)for(g=0;d>g;g++)a.call(e,c[g])&&h.push(c[g]);return h}}())},o=function(b,c){this.options=c,this.$el=a(b),this.$el_=this.$el.clone(),this.timeoutId_=0,this.timeoutFooter_=0,this.init()};o.DEFAULTS={classes:"table table-hover",sortClass:void 0,locale:void 0,height:void 0,undefinedText:"-",sortName:void 0,sortOrder:"asc",sortStable:!1,striped:!1,columns:[[]],data:[],totalField:"total",dataField:"rows",method:"get",url:void 0,ajax:void 0,cache:!0,contentType:"application/json",dataType:"json",ajaxOptions:{},queryParams:function(a){return a},queryParamsType:"limit",responseHandler:function(a){return a},pagination:!1,onlyInfoPagination:!1,paginationLoop:!0,sidePagination:"client",totalRows:0,pageNumber:1,pageSize:10,pageList:[10,25,50,100],paginationHAlign:"right",paginationVAlign:"bottom",paginationDetailHAlign:"left",paginationPreText:"&lsaquo;",paginationNextText:"&rsaquo;",search:!1,searchOnEnterKey:!1,strictSearch:!1,searchAlign:"right",selectItemName:"btSelectItem",showHeader:!0,showFooter:!1,showColumns:!1,showPaginationSwitch:!1,showRefresh:!1,showToggle:!1,buttonsAlign:"right",smartDisplay:!0,escape:!1,minimumCountColumns:1,idField:void 0,uniqueId:void 0,cardView:!1,detailView:!1,detailFormatter:function(){return""},trimOnSearch:!0,clickToSelect:!1,singleSelect:!1,toolbar:void 0,toolbarAlign:"left",checkboxHeader:!0,sortable:!0,silentSort:!0,maintainSelected:!1,searchTimeOut:500,searchText:"",iconSize:void 0,buttonsClass:"default",iconsPrefix:"glyphicon",icons:{paginationSwitchDown:"glyphicon-collapse-down icon-chevron-down",paginationSwitchUp:"glyphicon-collapse-up icon-chevron-up",refresh:"glyphicon-refresh icon-refresh",toggle:"glyphicon-list-alt icon-list-alt",columns:"glyphicon-th icon-th",detailOpen:"glyphicon-plus icon-plus",detailClose:"glyphicon-minus icon-minus"},customSearch:a.noop,customSort:a.noop,rowStyle:function(){return{}},rowAttributes:function(){return{}},footerStyle:function(){return{}},onAll:function(){return!1},onClickCell:function(){return!1},onDblClickCell:function(){return!1},onClickRow:function(){return!1},onDblClickRow:function(){return!1},onSort:function(){return!1},onCheck:function(){return!1},onUncheck:function(){return!1},onCheckAll:function(){return!1},onUncheckAll:function(){return!1},onCheckSome:function(){return!1},onUncheckSome:function(){return!1},onLoadSuccess:function(){return!1},onLoadError:function(){return!1},onColumnSwitch:function(){return!1},onPageChange:function(){return!1},onSearch:function(){return!1},onToggle:function(){return!1},onPreBody:function(){return!1},onPostBody:function(){return!1},onPostHeader:function(){return!1},onExpandRow:function(){return!1},onCollapseRow:function(){return!1},onRefreshOptions:function(){return!1},onRefresh:function(){return!1},onResetView:function(){return!1}},o.LOCALES={},o.LOCALES["en-US"]=o.LOCALES.en={formatLoadingMessage:function(){return"Loading, please wait..."},formatRecordsPerPage:function(a){return c("%s rows per page",a)},formatShowingRows:function(a,b,d){return c("Showing %s to %s of %s rows",a,b,d)},formatDetailPagination:function(a){return c("Showing %s rows",a)},formatSearch:function(){return"Search"},formatNoMatches:function(){return"No matching records found"},formatPaginationSwitch:function(){return"Hide/Show pagination"},formatRefresh:function(){return"Refresh"},formatToggle:function(){return"Toggle"},formatColumns:function(){return"Columns"},formatAllRows:function(){return"All"}},a.extend(o.DEFAULTS,o.LOCALES["en-US"]),o.COLUMN_DEFAULTS={radio:!1,checkbox:!1,checkboxEnabled:!0,field:void 0,title:void 0,titleTooltip:void 0,"class":void 0,align:void 0,halign:void 0,falign:void 0,valign:void 0,width:void 0,sortable:!1,order:"asc",visible:!0,switchable:!0,clickToSelect:!0,formatter:void 0,footerFormatter:void 0,events:void 0,sorter:void 0,sortName:void 0,cellStyle:void 0,searchable:!0,searchFormatter:!0,cardVisible:!0,escape:!1},o.EVENTS={"all.bs.table":"onAll","click-cell.bs.table":"onClickCell","dbl-click-cell.bs.table":"onDblClickCell","click-row.bs.table":"onClickRow","dbl-click-row.bs.table":"onDblClickRow","sort.bs.table":"onSort","check.bs.table":"onCheck","uncheck.bs.table":"onUncheck","check-all.bs.table":"onCheckAll","uncheck-all.bs.table":"onUncheckAll","check-some.bs.table":"onCheckSome","uncheck-some.bs.table":"onUncheckSome","load-success.bs.table":"onLoadSuccess","load-error.bs.table":"onLoadError","column-switch.bs.table":"onColumnSwitch","page-change.bs.table":"onPageChange","search.bs.table":"onSearch","toggle.bs.table":"onToggle","pre-body.bs.table":"onPreBody","post-body.bs.table":"onPostBody","post-header.bs.table":"onPostHeader","expand-row.bs.table":"onExpandRow","collapse-row.bs.table":"onCollapseRow","refresh-options.bs.table":"onRefreshOptions","reset-view.bs.table":"onResetView","refresh.bs.table":"onRefresh"},o.prototype.init=function(){this.initLocale(),this.initContainer(),this.initTable(),this.initHeader(),this.initData(),this.initHiddenRows(),this.initFooter(),this.initToolbar(),this.initPagination(),this.initBody(),this.initSearchText(),this.initServer()},o.prototype.initLocale=function(){if(this.options.locale){var b=this.options.locale.split(/-|_/);b[0].toLowerCase(),b[1]&&b[1].toUpperCase(),a.fn.bootstrapTable.locales[this.options.locale]?a.extend(this.options,a.fn.bootstrapTable.locales[this.options.locale]):a.fn.bootstrapTable.locales[b.join("-")]?a.extend(this.options,a.fn.bootstrapTable.locales[b.join("-")]):a.fn.bootstrapTable.locales[b[0]]&&a.extend(this.options,a.fn.bootstrapTable.locales[b[0]])}},o.prototype.initContainer=function(){this.$container=a(['<div class="bootstrap-table">','<div class="fixed-table-toolbar"></div>',"top"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?'<div class="fixed-table-pagination" style="clear: both;"></div>':"",'<div class="fixed-table-container">','<div class="fixed-table-header"><table></table></div>','<div class="fixed-table-body">','<div class="fixed-table-loading">',this.options.formatLoadingMessage(),"</div>","</div>",'<div class="fixed-table-footer"><table><tr></tr></table></div>',"bottom"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?'<div class="fixed-table-pagination"></div>':"","</div>","</div>"].join("")),this.$container.insertAfter(this.$el),this.$tableContainer=this.$container.find(".fixed-table-container"),this.$tableHeader=this.$container.find(".fixed-table-header"),this.$tableBody=this.$container.find(".fixed-table-body"),this.$tableLoading=this.$container.find(".fixed-table-loading"),this.$tableFooter=this.$container.find(".fixed-table-footer"),this.$toolbar=this.$container.find(".fixed-table-toolbar"),this.$pagination=this.$container.find(".fixed-table-pagination"),this.$tableBody.append(this.$el),this.$container.after('<div class="clearfix"></div>'),this.$el.addClass(this.options.classes),this.options.striped&&this.$el.addClass("table-striped"),-1!==a.inArray("table-no-bordered",this.options.classes.split(" "))&&this.$tableContainer.addClass("table-no-bordered")},o.prototype.initTable=function(){var b=this,c=[],d=[];if(this.$header=this.$el.find(">thead"),this.$header.length||(this.$header=a("<thead></thead>").appendTo(this.$el)),this.$header.find("tr").each(function(){var b=[];a(this).find("th").each(function(){"undefined"!=typeof a(this).data("field")&&a(this).data("field",a(this).data("field")+""),b.push(a.extend({},{title:a(this).html(),"class":a(this).attr("class"),titleTooltip:a(this).attr("title"),rowspan:a(this).attr("rowspan")?+a(this).attr("rowspan"):void 0,colspan:a(this).attr("colspan")?+a(this).attr("colspan"):void 0},a(this).data()))}),c.push(b)}),a.isArray(this.options.columns[0])||(this.options.columns=[this.options.columns]),this.options.columns=a.extend(!0,[],c,this.options.columns),this.columns=[],f(this.options.columns),a.each(this.options.columns,function(c,d){a.each(d,function(d,e){e=a.extend({},o.COLUMN_DEFAULTS,e),"undefined"!=typeof e.fieldIndex&&(b.columns[e.fieldIndex]=e),b.options.columns[c][d]=e})}),!this.options.data.length){var e=[];this.$el.find(">tbody>tr").each(function(c){var f={};f._id=a(this).attr("id"),f._class=a(this).attr("class"),f._data=k(a(this).data()),a(this).find(">td").each(function(d){for(var g,h,i=a(this),j=+i.attr("colspan")||1,l=+i.attr("rowspan")||1;e[c]&&e[c][d];d++);for(g=d;d+j>g;g++)for(h=c;c+l>h;h++)e[h]||(e[h]=[]),e[h][g]=!0;var m=b.columns[d].field;f[m]=a(this).html(),f["_"+m+"_id"]=a(this).attr("id"),f["_"+m+"_class"]=a(this).attr("class"),f["_"+m+"_rowspan"]=a(this).attr("rowspan"),f["_"+m+"_colspan"]=a(this).attr("colspan"),f["_"+m+"_title"]=a(this).attr("title"),f["_"+m+"_data"]=k(a(this).data())}),d.push(f)}),this.options.data=d,d.length&&(this.fromHtml=!0)}},o.prototype.initHeader=function(){var b=this,d={},e=[];this.header={fields:[],styles:[],classes:[],formatters:[],events:[],sorters:[],sortNames:[],cellStyles:[],searchables:[]},a.each(this.options.columns,function(f,g){e.push("<tr>"),0===f&&!b.options.cardView&&b.options.detailView&&e.push(c('<th class="detail" rowspan="%s"><div class="fht-cell"></div></th>',b.options.columns.length)),a.each(g,function(a,f){var g="",h="",i="",k="",l=c(' class="%s"',f["class"]),m=(b.options.sortOrder||f.order,"px"),n=f.width;if(void 0===f.width||b.options.cardView||"string"==typeof f.width&&-1!==f.width.indexOf("%")&&(m="%"),f.width&&"string"==typeof f.width&&(n=f.width.replace("%","").replace("px","")),h=c("text-align: %s; ",f.halign?f.halign:f.align),i=c("text-align: %s; ",f.align),k=c("vertical-align: %s; ",f.valign),k+=c("width: %s; ",!f.checkbox&&!f.radio||n?n?n+m:void 0:"36px"),"undefined"!=typeof f.fieldIndex){if(b.header.fields[f.fieldIndex]=f.field,b.header.styles[f.fieldIndex]=i+k,b.header.classes[f.fieldIndex]=l,b.header.formatters[f.fieldIndex]=f.formatter,b.header.events[f.fieldIndex]=f.events,b.header.sorters[f.fieldIndex]=f.sorter,b.header.sortNames[f.fieldIndex]=f.sortName,b.header.cellStyles[f.fieldIndex]=f.cellStyle,b.header.searchables[f.fieldIndex]=f.searchable,!f.visible)return;if(b.options.cardView&&!f.cardVisible)return;d[f.field]=f}e.push("<th"+c(' title="%s"',f.titleTooltip),f.checkbox||f.radio?c(' class="bs-checkbox %s"',f["class"]||""):l,c(' style="%s"',h+k),c(' rowspan="%s"',f.rowspan),c(' colspan="%s"',f.colspan),c(' data-field="%s"',f.field),">"),e.push(c('<div class="th-inner %s">',b.options.sortable&&f.sortable?"sortable both":"")),g=b.options.escape?j(f.title):f.title,f.checkbox&&(!b.options.singleSelect&&b.options.checkboxHeader&&(g='<input name="btSelectAll" type="checkbox" />'),b.header.stateField=f.field),f.radio&&(g="",b.header.stateField=f.field,b.options.singleSelect=!0),e.push(g),e.push("</div>"),e.push('<div class="fht-cell"></div>'),e.push("</div>"),e.push("</th>")}),e.push("</tr>")}),this.$header.html(e.join("")),this.$header.find("th[data-field]").each(function(){a(this).data(d[a(this).data("field")])}),this.$container.off("click",".th-inner").on("click",".th-inner",function(c){var d=a(this);return b.options.detailView&&d.closest(".bootstrap-table")[0]!==b.$container[0]?!1:void(b.options.sortable&&d.parent().data().sortable&&b.onSort(c))}),this.$header.children().children().off("keypress").on("keypress",function(c){if(b.options.sortable&&a(this).data().sortable){var d=c.keyCode||c.which;13==d&&b.onSort(c)}}),a(window).off("resize.bootstrap-table"),!this.options.showHeader||this.options.cardView?(this.$header.hide(),this.$tableHeader.hide(),this.$tableLoading.css("top",0)):(this.$header.show(),this.$tableHeader.show(),this.$tableLoading.css("top",this.$header.outerHeight()+1),this.getCaret(),a(window).on("resize.bootstrap-table",a.proxy(this.resetWidth,this))),this.$selectAll=this.$header.find('[name="btSelectAll"]'),this.$selectAll.off("click").on("click",function(){var c=a(this).prop("checked");b[c?"checkAll":"uncheckAll"](),b.updateSelected()})},o.prototype.initFooter=function(){!this.options.showFooter||this.options.cardView?this.$tableFooter.hide():this.$tableFooter.show()},o.prototype.initData=function(a,b){this.data="append"===b?this.data.concat(a):"prepend"===b?[].concat(a).concat(this.data):a||this.options.data,this.options.data="append"===b?this.options.data.concat(a):"prepend"===b?[].concat(a).concat(this.options.data):this.data,"server"!==this.options.sidePagination&&this.initSort()},o.prototype.initSort=function(){var b=this,d=this.options.sortName,e="desc"===this.options.sortOrder?-1:1,f=a.inArray(this.options.sortName,this.header.fields),g=0;return this.options.customSort!==a.noop?void this.options.customSort.apply(this,[this.options.sortName,this.options.sortOrder]):void(-1!==f&&(this.options.sortStable&&a.each(this.data,function(a,b){b.hasOwnProperty("_position")||(b._position=a)}),this.data.sort(function(c,g){b.header.sortNames[f]&&(d=b.header.sortNames[f]);var i=l(c,d,b.options.escape),j=l(g,d,b.options.escape),k=h(b.header,b.header.sorters[f],[i,j]);return void 0!==k?e*k:((void 0===i||null===i)&&(i=""),(void 0===j||null===j)&&(j=""),b.options.sortStable&&i===j&&(i=c._position,j=g._position),a.isNumeric(i)&&a.isNumeric(j)?(i=parseFloat(i),j=parseFloat(j),j>i?-1*e:e):i===j?0:("string"!=typeof i&&(i=i.toString()),-1===i.localeCompare(j)?-1*e:e))}),void 0!==this.options.sortClass&&(clearTimeout(g),g=setTimeout(function(){b.$el.removeClass(b.options.sortClass);var a=b.$header.find(c('[data-field="%s"]',b.options.sortName).index()+1);b.$el.find(c("tr td:nth-child(%s)",a)).addClass(b.options.sortClass)},250))))},o.prototype.onSort=function(b){var c="keypress"===b.type?a(b.currentTarget):a(b.currentTarget).parent(),d=this.$header.find("th").eq(c.index());return this.$header.add(this.$header_).find("span.order").remove(),this.options.sortName===c.data("field")?this.options.sortOrder="asc"===this.options.sortOrder?"desc":"asc":(this.options.sortName=c.data("field"),this.options.sortOrder="asc"===c.data("order")?"desc":"asc"),this.trigger("sort",this.options.sortName,this.options.sortOrder),c.add(d).data("order",this.options.sortOrder),this.getCaret(),"server"===this.options.sidePagination?void this.initServer(this.options.silentSort):(this.initSort(),void this.initBody())},o.prototype.initToolbar=function(){var b,d,e=this,f=[],g=0,i=0;this.$toolbar.find(".bs-bars").children().length&&a("body").append(a(this.options.toolbar)),this.$toolbar.html(""),("string"==typeof this.options.toolbar||"object"==typeof this.options.toolbar)&&a(c('<div class="bs-bars pull-%s"></div>',this.options.toolbarAlign)).appendTo(this.$toolbar).append(a(this.options.toolbar)),f=[c('<div class="columns columns-%s btn-group pull-%s">',this.options.buttonsAlign,this.options.buttonsAlign)],"string"==typeof this.options.icons&&(this.options.icons=h(null,this.options.icons)),this.options.showPaginationSwitch&&f.push(c('<button class="btn'+c(" btn-%s",this.options.buttonsClass)+c(" btn-%s",this.options.iconSize)+'" type="button" name="paginationSwitch" aria-label="pagination Switch" title="%s">',this.options.formatPaginationSwitch()),c('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.paginationSwitchDown),"</button>"),this.options.showRefresh&&f.push(c('<button class="btn'+c(" btn-%s",this.options.buttonsClass)+c(" btn-%s",this.options.iconSize)+'" type="button" name="refresh" aria-label="refresh" title="%s">',this.options.formatRefresh()),c('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.refresh),"</button>"),this.options.showToggle&&f.push(c('<button class="btn'+c(" btn-%s",this.options.buttonsClass)+c(" btn-%s",this.options.iconSize)+'" type="button" name="toggle" aria-label="toggle" title="%s">',this.options.formatToggle()),c('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.toggle),"</button>"),this.options.showColumns&&(f.push(c('<div class="keep-open btn-group" title="%s">',this.options.formatColumns()),'<button type="button" aria-label="columns" class="btn'+c(" btn-%s",this.options.buttonsClass)+c(" btn-%s",this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">',c('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.columns),' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'),a.each(this.columns,function(a,b){if(!(b.radio||b.checkbox||e.options.cardView&&!b.cardVisible)){var d=b.visible?' checked="checked"':"";b.switchable&&(f.push(c('<li role="menuitem"><label><input type="checkbox" data-field="%s" value="%s"%s> %s</label></li>',b.field,a,d,b.title)),i++)}}),f.push("</ul>","</div>")),f.push("</div>"),(this.showToolbar||f.length>2)&&this.$toolbar.append(f.join("")),this.options.showPaginationSwitch&&this.$toolbar.find('button[name="paginationSwitch"]').off("click").on("click",a.proxy(this.togglePagination,this)),this.options.showRefresh&&this.$toolbar.find('button[name="refresh"]').off("click").on("click",a.proxy(this.refresh,this)),this.options.showToggle&&this.$toolbar.find('button[name="toggle"]').off("click").on("click",function(){e.toggleView()}),this.options.showColumns&&(b=this.$toolbar.find(".keep-open"),i<=this.options.minimumCountColumns&&b.find("input").prop("disabled",!0),b.find("li").off("click").on("click",function(a){a.stopImmediatePropagation()}),b.find("input").off("click").on("click",function(){var b=a(this);e.toggleColumn(a(this).val(),b.prop("checked"),!1),e.trigger("column-switch",a(this).data("field"),b.prop("checked"))})),this.options.search&&(f=[],f.push('<div class="pull-'+this.options.searchAlign+' search">',c('<input class="form-control'+c(" input-%s",this.options.iconSize)+'" type="text" placeholder="%s">',this.options.formatSearch()),"</div>"),this.$toolbar.append(f.join("")),d=this.$toolbar.find(".search input"),d.off("keyup drop blur").on("keyup drop blur",function(b){e.options.searchOnEnterKey&&13!==b.keyCode||a.inArray(b.keyCode,[37,38,39,40])>-1||(clearTimeout(g),g=setTimeout(function(){e.onSearch(b)},e.options.searchTimeOut))}),m()&&d.off("mouseup").on("mouseup",function(a){clearTimeout(g),g=setTimeout(function(){e.onSearch(a)},e.options.searchTimeOut)}))},o.prototype.onSearch=function(b){var c=a.trim(a(b.currentTarget).val());this.options.trimOnSearch&&a(b.currentTarget).val()!==c&&a(b.currentTarget).val(c),c!==this.searchText&&(this.searchText=c,this.options.searchText=c,this.options.pageNumber=1,this.initSearch(),this.updatePagination(),this.trigger("search",c))},o.prototype.initSearch=function(){var b=this;if("server"!==this.options.sidePagination){if(this.options.customSearch!==a.noop)return void this.options.customSearch.apply(this,[this.searchText]);var c=this.searchText&&(this.options.escape?j(this.searchText):this.searchText).toLowerCase(),d=a.isEmptyObject(this.filterColumns)?null:this.filterColumns;this.data=d?a.grep(this.options.data,function(b){for(var c in d)if(a.isArray(d[c])&&-1===a.inArray(b[c],d[c])||!a.isArray(d[c])&&b[c]!==d[c])return!1;return!0}):this.options.data,this.data=c?a.grep(this.data,function(d,f){for(var g=0;g<b.header.fields.length;g++)if(b.header.searchables[g]){var i,j=a.isNumeric(b.header.fields[g])?parseInt(b.header.fields[g],10):b.header.fields[g],k=b.columns[e(b.columns,j)];if("string"==typeof j){i=d;for(var l=j.split("."),m=0;m<l.length;m++)i=i[l[m]];k&&k.searchFormatter&&(i=h(k,b.header.formatters[g],[i,d,f],i))}else i=d[j];if("string"==typeof i||"number"==typeof i)if(b.options.strictSearch){if((i+"").toLowerCase()===c)return!0}else if(-1!==(i+"").toLowerCase().indexOf(c))return!0}return!1}):this.data}},o.prototype.initPagination=function(){if(!this.options.pagination)return void this.$pagination.hide();this.$pagination.show();var b,d,e,f,g,h,i,j,k,l=this,m=[],n=!1,o=this.getData(),p=this.options.pageList;if("server"!==this.options.sidePagination&&(this.options.totalRows=o.length),this.totalPages=0,this.options.totalRows){if(this.options.pageSize===this.options.formatAllRows())this.options.pageSize=this.options.totalRows,n=!0;else if(this.options.pageSize===this.options.totalRows){var q="string"==typeof this.options.pageList?this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").toLowerCase().split(","):this.options.pageList;a.inArray(this.options.formatAllRows().toLowerCase(),q)>-1&&(n=!0)}this.totalPages=~~((this.options.totalRows-1)/this.options.pageSize)+1,this.options.totalPages=this.totalPages}if(this.totalPages>0&&this.options.pageNumber>this.totalPages&&(this.options.pageNumber=this.totalPages),this.pageFrom=(this.options.pageNumber-1)*this.options.pageSize+1,this.pageTo=this.options.pageNumber*this.options.pageSize,this.pageTo>this.options.totalRows&&(this.pageTo=this.options.totalRows),m.push('<div class="pull-'+this.options.paginationDetailHAlign+' pagination-detail">','<span class="pagination-info">',this.options.onlyInfoPagination?this.options.formatDetailPagination(this.options.totalRows):this.options.formatShowingRows(this.pageFrom,this.pageTo,this.options.totalRows),"</span>"),!this.options.onlyInfoPagination){m.push('<span class="page-list">');var r=[c('<span class="btn-group %s">',"top"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?"dropdown":"dropup"),'<button type="button" class="btn'+c(" btn-%s",this.options.buttonsClass)+c(" btn-%s",this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">','<span class="page-size">',n?this.options.formatAllRows():this.options.pageSize,"</span>",' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'];if("string"==typeof this.options.pageList){var s=this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").split(",");p=[],a.each(s,function(a,b){p.push(b.toUpperCase()===l.options.formatAllRows().toUpperCase()?l.options.formatAllRows():+b)})}for(a.each(p,function(a,b){if(!l.options.smartDisplay||0===a||p[a-1]<l.options.totalRows){var d;d=n?b===l.options.formatAllRows()?' class="active"':"":b===l.options.pageSize?' class="active"':"",r.push(c('<li role="menuitem"%s><a href="#">%s</a></li>',d,b))}}),r.push("</ul></span>"),m.push(this.options.formatRecordsPerPage(r.join(""))),m.push("</span>"),m.push("</div>",'<div class="pull-'+this.options.paginationHAlign+' pagination">','<ul class="pagination'+c(" pagination-%s",this.options.iconSize)+'">','<li class="page-pre"><a href="#">'+this.options.paginationPreText+"</a></li>"),this.totalPages<5?(d=1,e=this.totalPages):(d=this.options.pageNumber-2,e=d+4,1>d&&(d=1,e=5),e>this.totalPages&&(e=this.totalPages,d=e-4)),this.totalPages>=6&&(this.options.pageNumber>=3&&(m.push('<li class="page-first'+(1===this.options.pageNumber?" active":"")+'">','<a href="#">',1,"</a>","</li>"),d++),this.options.pageNumber>=4&&(4==this.options.pageNumber||6==this.totalPages||7==this.totalPages?d--:m.push('<li class="page-first-separator disabled">','<a href="#">...</a>',"</li>"),e--)),this.totalPages>=7&&this.options.pageNumber>=this.totalPages-2&&d--,6==this.totalPages?this.options.pageNumber>=this.totalPages-2&&e++:this.totalPages>=7&&(7==this.totalPages||this.options.pageNumber>=this.totalPages-3)&&e++,b=d;e>=b;b++)m.push('<li class="page-number'+(b===this.options.pageNumber?" active":"")+'">','<a href="#">',b,"</a>","</li>");this.totalPages>=8&&this.options.pageNumber<=this.totalPages-4&&m.push('<li class="page-last-separator disabled">','<a href="#">...</a>',"</li>"),this.totalPages>=6&&this.options.pageNumber<=this.totalPages-3&&m.push('<li class="page-last'+(this.totalPages===this.options.pageNumber?" active":"")+'">','<a href="#">',this.totalPages,"</a>","</li>"),m.push('<li class="page-next"><a href="#">'+this.options.paginationNextText+"</a></li>","</ul>","</div>")}this.$pagination.html(m.join("")),this.options.onlyInfoPagination||(f=this.$pagination.find(".page-list a"),g=this.$pagination.find(".page-first"),h=this.$pagination.find(".page-pre"),i=this.$pagination.find(".page-next"),j=this.$pagination.find(".page-last"),k=this.$pagination.find(".page-number"),this.options.smartDisplay&&(this.totalPages<=1&&this.$pagination.find("div.pagination").hide(),(p.length<2||this.options.totalRows<=p[0])&&this.$pagination.find("span.page-list").hide(),this.$pagination[this.getData().length?"show":"hide"]()),this.options.paginationLoop||(1===this.options.pageNumber&&h.addClass("disabled"),this.options.pageNumber===this.totalPages&&i.addClass("disabled")),n&&(this.options.pageSize=this.options.formatAllRows()),f.off("click").on("click",a.proxy(this.onPageListChange,this)),g.off("click").on("click",a.proxy(this.onPageFirst,this)),h.off("click").on("click",a.proxy(this.onPagePre,this)),i.off("click").on("click",a.proxy(this.onPageNext,this)),j.off("click").on("click",a.proxy(this.onPageLast,this)),k.off("click").on("click",a.proxy(this.onPageNumber,this)))},o.prototype.updatePagination=function(b){b&&a(b.currentTarget).hasClass("disabled")||(this.options.maintainSelected||this.resetRows(),this.initPagination(),"server"===this.options.sidePagination?this.initServer():this.initBody(),this.trigger("page-change",this.options.pageNumber,this.options.pageSize))},o.prototype.onPageListChange=function(b){var c=a(b.currentTarget);return c.parent().addClass("active").siblings().removeClass("active"),this.options.pageSize=c.text().toUpperCase()===this.options.formatAllRows().toUpperCase()?this.options.formatAllRows():+c.text(),this.$toolbar.find(".page-size").text(this.options.pageSize),this.updatePagination(b),!1},o.prototype.onPageFirst=function(a){return this.options.pageNumber=1,this.updatePagination(a),!1},o.prototype.onPagePre=function(a){return this.options.pageNumber-1===0?this.options.pageNumber=this.options.totalPages:this.options.pageNumber--,this.updatePagination(a),!1},o.prototype.onPageNext=function(a){return this.options.pageNumber+1>this.options.totalPages?this.options.pageNumber=1:this.options.pageNumber++,this.updatePagination(a),!1},o.prototype.onPageLast=function(a){return this.options.pageNumber=this.totalPages,this.updatePagination(a),!1},o.prototype.onPageNumber=function(b){return this.options.pageNumber!==+a(b.currentTarget).text()?(this.options.pageNumber=+a(b.currentTarget).text(),this.updatePagination(b),!1):void 0},o.prototype.initRow=function(b,e){var f,g=this,i=[],k={},m=[],n="",o={},p=[];if(!(a.inArray(b,this.hiddenRows)>-1)){if(k=h(this.options,this.options.rowStyle,[b,e],k),k&&k.css)for(f in k.css)m.push(f+": "+k.css[f]);if(o=h(this.options,this.options.rowAttributes,[b,e],o))for(f in o)p.push(c('%s="%s"',f,j(o[f])));return b._data&&!a.isEmptyObject(b._data)&&a.each(b._data,function(a,b){"index"!==a&&(n+=c(' data-%s="%s"',a,b))}),i.push("<tr",c(" %s",p.join(" ")),c(' id="%s"',a.isArray(b)?void 0:b._id),c(' class="%s"',k.classes||(a.isArray(b)?void 0:b._class)),c(' data-index="%s"',e),c(' data-uniqueid="%s"',b[this.options.uniqueId]),c("%s",n),">"),this.options.cardView&&i.push(c('<td colspan="%s"><div class="card-views">',this.header.fields.length)),!this.options.cardView&&this.options.detailView&&i.push("<td>",'<a class="detail-icon" href="#">',c('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.detailOpen),"</a>","</td>"),a.each(this.header.fields,function(f,n){var o="",p=l(b,n,g.options.escape),q="",r="",s={},t="",u=g.header.classes[f],v="",w="",x="",y="",z=g.columns[f];if(!(g.fromHtml&&"undefined"==typeof p||!z.visible||g.options.cardView&&!z.cardVisible)){if(z.escape&&(p=j(p)),k=c('style="%s"',m.concat(g.header.styles[f]).join("; ")),b["_"+n+"_id"]&&(t=c(' id="%s"',b["_"+n+"_id"])),b["_"+n+"_class"]&&(u=c(' class="%s"',b["_"+n+"_class"])),b["_"+n+"_rowspan"]&&(w=c(' rowspan="%s"',b["_"+n+"_rowspan"])),b["_"+n+"_colspan"]&&(x=c(' colspan="%s"',b["_"+n+"_colspan"])),b["_"+n+"_title"]&&(y=c(' title="%s"',b["_"+n+"_title"])),s=h(g.header,g.header.cellStyles[f],[p,b,e,n],s),s.classes&&(u=c(' class="%s"',s.classes)),s.css){var A=[];for(var B in s.css)A.push(B+": "+s.css[B]);k=c('style="%s"',A.concat(g.header.styles[f]).join("; "))}q=h(z,g.header.formatters[f],[p,b,e],p),b["_"+n+"_data"]&&!a.isEmptyObject(b["_"+n+"_data"])&&a.each(b["_"+n+"_data"],function(a,b){"index"!==a&&(v+=c(' data-%s="%s"',a,b))}),z.checkbox||z.radio?(r=z.checkbox?"checkbox":r,r=z.radio?"radio":r,o=[c(g.options.cardView?'<div class="card-view %s">':'<td class="bs-checkbox %s">',z["class"]||""),"<input"+c(' data-index="%s"',e)+c(' name="%s"',g.options.selectItemName)+c(' type="%s"',r)+c(' value="%s"',b[g.options.idField])+c(' checked="%s"',q===!0||p||q&&q.checked?"checked":void 0)+c(' disabled="%s"',!z.checkboxEnabled||q&&q.disabled?"disabled":void 0)+" />",g.header.formatters[f]&&"string"==typeof q?q:"",g.options.cardView?"</div>":"</td>"].join(""),b[g.header.stateField]=q===!0||q&&q.checked):(q="undefined"==typeof q||null===q?g.options.undefinedText:q,o=g.options.cardView?['<div class="card-view">',g.options.showHeader?c('<span class="title" %s>%s</span>',k,d(g.columns,"field","title",n)):"",c('<span class="value">%s</span>',q),"</div>"].join(""):[c("<td%s %s %s %s %s %s %s>",t,u,k,v,w,x,y),q,"</td>"].join(""),g.options.cardView&&g.options.smartDisplay&&""===q&&(o='<div class="card-view"></div>')),i.push(o)}}),this.options.cardView&&i.push("</div></td>"),i.push("</tr>"),i.join(" ")}},o.prototype.initBody=function(b){var d=this,f=this.getData();this.trigger("pre-body",f),this.$body=this.$el.find(">tbody"),this.$body.length||(this.$body=a("<tbody></tbody>").appendTo(this.$el)),this.options.pagination&&"server"!==this.options.sidePagination||(this.pageFrom=1,this.pageTo=f.length);for(var g,i=a(document.createDocumentFragment()),j=this.pageFrom-1;j<this.pageTo;j++){
var k=f[j],m=this.initRow(k,j,f,i);g=g||!!m,m&&m!==!0&&i.append(m)}g||i.append('<tr class="no-records-found">'+c('<td colspan="%s">%s</td>',this.$header.find("th").length,this.options.formatNoMatches())+"</tr>"),this.$body.html(i),b||this.scrollTo(0),this.$body.find("> tr[data-index] > td").off("click dblclick").on("click dblclick",function(b){var f=a(this),g=f.parent(),h=d.data[g.data("index")],i=f[0].cellIndex,j=d.getVisibleFields(),k=j[d.options.detailView&&!d.options.cardView?i-1:i],m=d.columns[e(d.columns,k)],n=l(h,k,d.options.escape);if(!f.find(".detail-icon").length&&(d.trigger("click"===b.type?"click-cell":"dbl-click-cell",k,n,h,f),d.trigger("click"===b.type?"click-row":"dbl-click-row",h,g,k),"click"===b.type&&d.options.clickToSelect&&m.clickToSelect)){var o=g.find(c('[name="%s"]',d.options.selectItemName));o.length&&o[0].click()}}),this.$body.find("> tr[data-index] > td > .detail-icon").off("click").on("click",function(){var b=a(this),e=b.parent().parent(),g=e.data("index"),i=f[g];if(e.next().is("tr.detail-view"))b.find("i").attr("class",c("%s %s",d.options.iconsPrefix,d.options.icons.detailOpen)),d.trigger("collapse-row",g,i),e.next().remove();else{b.find("i").attr("class",c("%s %s",d.options.iconsPrefix,d.options.icons.detailClose)),e.after(c('<tr class="detail-view"><td colspan="%s"></td></tr>',e.find("td").length));var j=e.next().find("td"),k=h(d.options,d.options.detailFormatter,[g,i,j],"");1===j.length&&j.append(k),d.trigger("expand-row",g,i,j)}return d.resetView(),!1}),this.$selectItem=this.$body.find(c('[name="%s"]',this.options.selectItemName)),this.$selectItem.off("click").on("click",function(b){b.stopImmediatePropagation();var c=a(this),e=c.prop("checked"),f=d.data[c.data("index")];d.options.maintainSelected&&a(this).is(":radio")&&a.each(d.options.data,function(a,b){b[d.header.stateField]=!1}),f[d.header.stateField]=e,d.options.singleSelect&&(d.$selectItem.not(this).each(function(){d.data[a(this).data("index")][d.header.stateField]=!1}),d.$selectItem.filter(":checked").not(this).prop("checked",!1)),d.updateSelected(),d.trigger(e?"check":"uncheck",f,c)}),a.each(this.header.events,function(b,c){if(c){"string"==typeof c&&(c=h(null,c));var e=d.header.fields[b],f=a.inArray(e,d.getVisibleFields());d.options.detailView&&!d.options.cardView&&(f+=1);for(var g in c)d.$body.find(">tr:not(.no-records-found)").each(function(){var b=a(this),h=b.find(d.options.cardView?".card-view":"td").eq(f),i=g.indexOf(" "),j=g.substring(0,i),k=g.substring(i+1),l=c[g];h.find(k).off(j).on(j,function(a){var c=b.data("index"),f=d.data[c],g=f[e];l.apply(this,[a,g,f,c])})})}}),this.updateSelected(),this.resetView(),this.trigger("post-body",f)},o.prototype.initServer=function(b,c,d){var e,f=this,g={},i={searchText:this.searchText,sortName:this.options.sortName,sortOrder:this.options.sortOrder};this.options.pagination&&(i.pageSize=this.options.pageSize===this.options.formatAllRows()?this.options.totalRows:this.options.pageSize,i.pageNumber=this.options.pageNumber),(d||this.options.url||this.options.ajax)&&("limit"===this.options.queryParamsType&&(i={search:i.searchText,sort:i.sortName,order:i.sortOrder},this.options.pagination&&(i.offset=this.options.pageSize===this.options.formatAllRows()?0:this.options.pageSize*(this.options.pageNumber-1),i.limit=this.options.pageSize===this.options.formatAllRows()?this.options.totalRows:this.options.pageSize)),a.isEmptyObject(this.filterColumnsPartial)||(i.filter=JSON.stringify(this.filterColumnsPartial,null)),g=h(this.options,this.options.queryParams,[i],g),a.extend(g,c||{}),g!==!1&&(b||this.$tableLoading.show(),e=a.extend({},h(null,this.options.ajaxOptions),{type:this.options.method,url:d||this.options.url,data:"application/json"===this.options.contentType&&"post"===this.options.method?JSON.stringify(g):g,cache:this.options.cache,contentType:this.options.contentType,dataType:this.options.dataType,success:function(a){a=h(f.options,f.options.responseHandler,[a],a),f.load(a),f.trigger("load-success",a),b||f.$tableLoading.hide()},error:function(a){f.trigger("load-error",a.status,a),b||f.$tableLoading.hide()}}),this.options.ajax?h(this,this.options.ajax,[e],null):(this._xhr&&4!==this._xhr.readyState&&this._xhr.abort(),this._xhr=a.ajax(e))))},o.prototype.initSearchText=function(){if(this.options.search&&""!==this.options.searchText){var a=this.$toolbar.find(".search input");a.val(this.options.searchText),this.onSearch({currentTarget:a})}},o.prototype.getCaret=function(){var b=this;a.each(this.$header.find("th"),function(c,d){a(d).find(".sortable").removeClass("desc asc").addClass(a(d).data("field")===b.options.sortName?b.options.sortOrder:"both")})},o.prototype.updateSelected=function(){var b=this.$selectItem.filter(":enabled").length&&this.$selectItem.filter(":enabled").length===this.$selectItem.filter(":enabled").filter(":checked").length;this.$selectAll.add(this.$selectAll_).prop("checked",b),this.$selectItem.each(function(){a(this).closest("tr")[a(this).prop("checked")?"addClass":"removeClass"]("selected")})},o.prototype.updateRows=function(){var b=this;this.$selectItem.each(function(){b.data[a(this).data("index")][b.header.stateField]=a(this).prop("checked")})},o.prototype.resetRows=function(){var b=this;a.each(this.data,function(a,c){b.$selectAll.prop("checked",!1),b.$selectItem.prop("checked",!1),b.header.stateField&&(c[b.header.stateField]=!1)}),this.initHiddenRows()},o.prototype.trigger=function(b){var c=Array.prototype.slice.call(arguments,1);b+=".bs.table",this.options[o.EVENTS[b]].apply(this.options,c),this.$el.trigger(a.Event(b),c),this.options.onAll(b,c),this.$el.trigger(a.Event("all.bs.table"),[b,c])},o.prototype.resetHeader=function(){clearTimeout(this.timeoutId_),this.timeoutId_=setTimeout(a.proxy(this.fitHeader,this),this.$el.is(":hidden")?100:0)},o.prototype.fitHeader=function(){var b,d,e,f,h=this;if(h.$el.is(":hidden"))return void(h.timeoutId_=setTimeout(a.proxy(h.fitHeader,h),100));if(b=this.$tableBody.get(0),d=b.scrollWidth>b.clientWidth&&b.scrollHeight>b.clientHeight+this.$header.outerHeight()?g():0,this.$el.css("margin-top",-this.$header.outerHeight()),e=a(":focus"),e.length>0){var i=e.parents("th");if(i.length>0){var j=i.attr("data-field");if(void 0!==j){var k=this.$header.find("[data-field='"+j+"']");k.length>0&&k.find(":input").addClass("focus-temp")}}}this.$header_=this.$header.clone(!0,!0),this.$selectAll_=this.$header_.find('[name="btSelectAll"]'),this.$tableHeader.css({"margin-right":d}).find("table").css("width",this.$el.outerWidth()).html("").attr("class",this.$el.attr("class")).append(this.$header_),f=a(".focus-temp:visible:eq(0)"),f.length>0&&(f.focus(),this.$header.find(".focus-temp").removeClass("focus-temp")),this.$header.find("th[data-field]").each(function(){h.$header_.find(c('th[data-field="%s"]',a(this).data("field"))).data(a(this).data())});var l=this.getVisibleFields(),m=this.$header_.find("th");this.$body.find(">tr:first-child:not(.no-records-found) > *").each(function(b){var d=a(this),e=b;h.options.detailView&&!h.options.cardView&&(0===b&&h.$header_.find("th.detail").find(".fht-cell").width(d.innerWidth()),e=b-1);var f=h.$header_.find(c('th[data-field="%s"]',l[e]));f.length>1&&(f=a(m[d[0].cellIndex])),f.find(".fht-cell").width(d.innerWidth())}),this.$tableBody.off("scroll").on("scroll",function(){h.$tableHeader.scrollLeft(a(this).scrollLeft()),h.options.showFooter&&!h.options.cardView&&h.$tableFooter.scrollLeft(a(this).scrollLeft())}),h.trigger("post-header")},o.prototype.resetFooter=function(){var b=this,d=b.getData(),e=[];this.options.showFooter&&!this.options.cardView&&(!this.options.cardView&&this.options.detailView&&e.push('<td><div class="th-inner">&nbsp;</div><div class="fht-cell"></div></td>'),a.each(this.columns,function(a,f){var g,i="",j="",k=[],l={},m=c(' class="%s"',f["class"]);if(f.visible&&(!b.options.cardView||f.cardVisible)){if(i=c("text-align: %s; ",f.falign?f.falign:f.align),j=c("vertical-align: %s; ",f.valign),l=h(null,b.options.footerStyle),l&&l.css)for(g in l.css)k.push(g+": "+l.css[g]);e.push("<td",m,c(' style="%s"',i+j+k.concat().join("; ")),">"),e.push('<div class="th-inner">'),e.push(h(f,f.footerFormatter,[d],"&nbsp;")||"&nbsp;"),e.push("</div>"),e.push('<div class="fht-cell"></div>'),e.push("</div>"),e.push("</td>")}}),this.$tableFooter.find("tr").html(e.join("")),this.$tableFooter.show(),clearTimeout(this.timeoutFooter_),this.timeoutFooter_=setTimeout(a.proxy(this.fitFooter,this),this.$el.is(":hidden")?100:0))},o.prototype.fitFooter=function(){var b,c,d;return clearTimeout(this.timeoutFooter_),this.$el.is(":hidden")?void(this.timeoutFooter_=setTimeout(a.proxy(this.fitFooter,this),100)):(c=this.$el.css("width"),d=c>this.$tableBody.width()?g():0,this.$tableFooter.css({"margin-right":d}).find("table").css("width",c).attr("class",this.$el.attr("class")),b=this.$tableFooter.find("td"),void this.$body.find(">tr:first-child:not(.no-records-found) > *").each(function(c){var d=a(this);b.eq(c).find(".fht-cell").width(d.innerWidth())}))},o.prototype.toggleColumn=function(a,b,d){if(-1!==a&&(this.columns[a].visible=b,this.initHeader(),this.initSearch(),this.initPagination(),this.initBody(),this.options.showColumns)){var e=this.$toolbar.find(".keep-open input").prop("disabled",!1);d&&e.filter(c('[value="%s"]',a)).prop("checked",b),e.filter(":checked").length<=this.options.minimumCountColumns&&e.filter(":checked").prop("disabled",!0)}},o.prototype.getVisibleFields=function(){var b=this,c=[];return a.each(this.header.fields,function(a,d){var f=b.columns[e(b.columns,d)];f.visible&&c.push(d)}),c},o.prototype.resetView=function(a){var b=0;if(a&&a.height&&(this.options.height=a.height),this.$selectAll.prop("checked",this.$selectItem.length>0&&this.$selectItem.length===this.$selectItem.filter(":checked").length),this.options.height){var c=this.$toolbar.outerHeight(!0),d=this.$pagination.outerHeight(!0),e=this.options.height-c-d;this.$tableContainer.css("height",e+"px")}return this.options.cardView?(this.$el.css("margin-top","0"),this.$tableContainer.css("padding-bottom","0"),void this.$tableFooter.hide()):(this.options.showHeader&&this.options.height?(this.$tableHeader.show(),this.resetHeader(),b+=this.$header.outerHeight()):(this.$tableHeader.hide(),this.trigger("post-header")),this.options.showFooter&&(this.resetFooter(),this.options.height&&(b+=this.$tableFooter.outerHeight()+1)),this.getCaret(),this.$tableContainer.css("padding-bottom",b+"px"),void this.trigger("reset-view"))},o.prototype.getData=function(b){return!this.searchText&&a.isEmptyObject(this.filterColumns)&&a.isEmptyObject(this.filterColumnsPartial)?b?this.options.data.slice(this.pageFrom-1,this.pageTo):this.options.data:b?this.data.slice(this.pageFrom-1,this.pageTo):this.data},o.prototype.load=function(b){var c=!1;"server"===this.options.sidePagination?(this.options.totalRows=b[this.options.totalField],c=b.fixedScroll,b=b[this.options.dataField]):a.isArray(b)||(c=b.fixedScroll,b=b.data),this.initData(b),this.initSearch(),this.initPagination(),this.initBody(c)},o.prototype.append=function(a){this.initData(a,"append"),this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0)},o.prototype.prepend=function(a){this.initData(a,"prepend"),this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0)},o.prototype.remove=function(b){var c,d,e=this.options.data.length;if(b.hasOwnProperty("field")&&b.hasOwnProperty("values")){for(c=e-1;c>=0;c--)d=this.options.data[c],d.hasOwnProperty(b.field)&&-1!==a.inArray(d[b.field],b.values)&&(this.options.data.splice(c,1),"server"===this.options.sidePagination&&(this.options.totalRows-=1));e!==this.options.data.length&&(this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0))}},o.prototype.removeAll=function(){this.options.data.length>0&&(this.options.data.splice(0,this.options.data.length),this.initSearch(),this.initPagination(),this.initBody(!0))},o.prototype.getRowByUniqueId=function(a){var b,c,d,e=this.options.uniqueId,f=this.options.data.length,g=null;for(b=f-1;b>=0;b--){if(c=this.options.data[b],c.hasOwnProperty(e))d=c[e];else{if(!c._data.hasOwnProperty(e))continue;d=c._data[e]}if("string"==typeof d?a=a.toString():"number"==typeof d&&(Number(d)===d&&d%1===0?a=parseInt(a):d===Number(d)&&0!==d&&(a=parseFloat(a))),d===a){g=c;break}}return g},o.prototype.removeByUniqueId=function(a){var b=this.options.data.length,c=this.getRowByUniqueId(a);c&&this.options.data.splice(this.options.data.indexOf(c),1),b!==this.options.data.length&&(this.initSearch(),this.initPagination(),this.initBody(!0))},o.prototype.updateByUniqueId=function(b){var c=this,d=a.isArray(b)?b:[b];a.each(d,function(b,d){var e;d.hasOwnProperty("id")&&d.hasOwnProperty("row")&&(e=a.inArray(c.getRowByUniqueId(d.id),c.options.data),-1!==e&&a.extend(c.options.data[e],d.row))}),this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0)},o.prototype.insertRow=function(a){a.hasOwnProperty("index")&&a.hasOwnProperty("row")&&(this.data.splice(a.index,0,a.row),this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0))},o.prototype.updateRow=function(b){var c=this,d=a.isArray(b)?b:[b];a.each(d,function(b,d){d.hasOwnProperty("index")&&d.hasOwnProperty("row")&&a.extend(c.options.data[d.index],d.row)}),this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0)},o.prototype.initHiddenRows=function(){this.hiddenRows=[]},o.prototype.showRow=function(a){this.toggleRow(a,!0)},o.prototype.hideRow=function(a){this.toggleRow(a,!1)},o.prototype.toggleRow=function(b,c){var d,e;b.hasOwnProperty("index")?d=this.getData()[b.index]:b.hasOwnProperty("uniqueId")&&(d=this.getRowByUniqueId(b.uniqueId)),d&&(e=a.inArray(d,this.hiddenRows),c||-1!==e?c&&e>-1&&this.hiddenRows.splice(e,1):this.hiddenRows.push(d),this.initBody(!0))},o.prototype.getHiddenRows=function(){var b=this,c=this.getData(),d=[];return a.each(c,function(c,e){a.inArray(e,b.hiddenRows)>-1&&d.push(e)}),this.hiddenRows=d,d},o.prototype.mergeCells=function(b){var c,d,e,f=b.index,g=a.inArray(b.field,this.getVisibleFields()),h=b.rowspan||1,i=b.colspan||1,j=this.$body.find(">tr");if(this.options.detailView&&!this.options.cardView&&(g+=1),e=j.eq(f).find(">td").eq(g),!(0>f||0>g||f>=this.data.length)){for(c=f;f+h>c;c++)for(d=g;g+i>d;d++)j.eq(c).find(">td").eq(d).hide();e.attr("rowspan",h).attr("colspan",i).show()}},o.prototype.updateCell=function(a){a.hasOwnProperty("index")&&a.hasOwnProperty("field")&&a.hasOwnProperty("value")&&(this.data[a.index][a.field]=a.value,a.reinit!==!1&&(this.initSort(),this.initBody(!0)))},o.prototype.getOptions=function(){return this.options},o.prototype.getSelections=function(){var b=this;return a.grep(this.options.data,function(a){return a[b.header.stateField]===!0})},o.prototype.getAllSelections=function(){var b=this;return a.grep(this.options.data,function(a){return a[b.header.stateField]})},o.prototype.checkAll=function(){this.checkAll_(!0)},o.prototype.uncheckAll=function(){this.checkAll_(!1)},o.prototype.checkInvert=function(){var b=this,c=b.$selectItem.filter(":enabled"),d=c.filter(":checked");c.each(function(){a(this).prop("checked",!a(this).prop("checked"))}),b.updateRows(),b.updateSelected(),b.trigger("uncheck-some",d),d=b.getSelections(),b.trigger("check-some",d)},o.prototype.checkAll_=function(a){var b;a||(b=this.getSelections()),this.$selectAll.add(this.$selectAll_).prop("checked",a),this.$selectItem.filter(":enabled").prop("checked",a),this.updateRows(),a&&(b=this.getSelections()),this.trigger(a?"check-all":"uncheck-all",b)},o.prototype.check=function(a){this.check_(!0,a)},o.prototype.uncheck=function(a){this.check_(!1,a)},o.prototype.check_=function(a,b){var d=this.$selectItem.filter(c('[data-index="%s"]',b)).prop("checked",a);this.data[b][this.header.stateField]=a,this.updateSelected(),this.trigger(a?"check":"uncheck",this.data[b],d)},o.prototype.checkBy=function(a){this.checkBy_(!0,a)},o.prototype.uncheckBy=function(a){this.checkBy_(!1,a)},o.prototype.checkBy_=function(b,d){if(d.hasOwnProperty("field")&&d.hasOwnProperty("values")){var e=this,f=[];a.each(this.options.data,function(g,h){if(!h.hasOwnProperty(d.field))return!1;if(-1!==a.inArray(h[d.field],d.values)){var i=e.$selectItem.filter(":enabled").filter(c('[data-index="%s"]',g)).prop("checked",b);h[e.header.stateField]=b,f.push(h),e.trigger(b?"check":"uncheck",h,i)}}),this.updateSelected(),this.trigger(b?"check-some":"uncheck-some",f)}},o.prototype.destroy=function(){this.$el.insertBefore(this.$container),a(this.options.toolbar).insertBefore(this.$el),this.$container.next().remove(),this.$container.remove(),this.$el.html(this.$el_.html()).css("margin-top","0").attr("class",this.$el_.attr("class")||"")},o.prototype.showLoading=function(){this.$tableLoading.show()},o.prototype.hideLoading=function(){this.$tableLoading.hide()},o.prototype.togglePagination=function(){this.options.pagination=!this.options.pagination;var a=this.$toolbar.find('button[name="paginationSwitch"] i');this.options.pagination?a.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchDown):a.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchUp),this.updatePagination()},o.prototype.refresh=function(a){a&&a.url&&(this.options.url=a.url),a&&a.pageNumber&&(this.options.pageNumber=a.pageNumber),a&&a.pageSize&&(this.options.pageSize=a.pageSize),this.initServer(a&&a.silent,a&&a.query,a&&a.url),this.trigger("refresh",a)},o.prototype.resetWidth=function(){this.options.showHeader&&this.options.height&&this.fitHeader(),this.options.showFooter&&this.fitFooter()},o.prototype.showColumn=function(a){this.toggleColumn(e(this.columns,a),!0,!0)},o.prototype.hideColumn=function(a){this.toggleColumn(e(this.columns,a),!1,!0)},o.prototype.getHiddenColumns=function(){return a.grep(this.columns,function(a){return!a.visible})},o.prototype.getVisibleColumns=function(){return a.grep(this.columns,function(a){return a.visible})},o.prototype.toggleAllColumns=function(b){if(a.each(this.columns,function(a){this.columns[a].visible=b}),this.initHeader(),this.initSearch(),this.initPagination(),this.initBody(),this.options.showColumns){var c=this.$toolbar.find(".keep-open input").prop("disabled",!1);c.filter(":checked").length<=this.options.minimumCountColumns&&c.filter(":checked").prop("disabled",!0)}},o.prototype.showAllColumns=function(){this.toggleAllColumns(!0)},o.prototype.hideAllColumns=function(){this.toggleAllColumns(!1)},o.prototype.filterBy=function(b){this.filterColumns=a.isEmptyObject(b)?{}:b,this.options.pageNumber=1,this.initSearch(),this.updatePagination()},o.prototype.scrollTo=function(a){return"string"==typeof a&&(a="bottom"===a?this.$tableBody[0].scrollHeight:0),"number"==typeof a&&this.$tableBody.scrollTop(a),"undefined"==typeof a?this.$tableBody.scrollTop():void 0},o.prototype.getScrollPosition=function(){return this.scrollTo()},o.prototype.selectPage=function(a){a>0&&a<=this.options.totalPages&&(this.options.pageNumber=a,this.updatePagination())},o.prototype.prevPage=function(){this.options.pageNumber>1&&(this.options.pageNumber--,this.updatePagination())},o.prototype.nextPage=function(){this.options.pageNumber<this.options.totalPages&&(this.options.pageNumber++,this.updatePagination())},o.prototype.toggleView=function(){this.options.cardView=!this.options.cardView,this.initHeader(),this.initBody(),this.trigger("toggle",this.options.cardView)},o.prototype.refreshOptions=function(b){i(this.options,b,!0)||(this.options=a.extend(this.options,b),this.trigger("refresh-options",this.options),this.destroy(),this.init())},o.prototype.resetSearch=function(a){var b=this.$toolbar.find(".search input");b.val(a||""),this.onSearch({currentTarget:b})},o.prototype.expandRow_=function(a,b){var d=this.$body.find(c('> tr[data-index="%s"]',b));d.next().is("tr.detail-view")===(a?!1:!0)&&d.find("> td > .detail-icon").click()},o.prototype.expandRow=function(a){this.expandRow_(!0,a)},o.prototype.collapseRow=function(a){this.expandRow_(!1,a)},o.prototype.expandAllRows=function(b){if(b){var d=this.$body.find(c('> tr[data-index="%s"]',0)),e=this,f=null,g=!1,h=-1;if(d.next().is("tr.detail-view")?d.next().next().is("tr.detail-view")||(d.next().find(".detail-icon").click(),g=!0):(d.find("> td > .detail-icon").click(),g=!0),g)try{h=setInterval(function(){f=e.$body.find("tr.detail-view").last().find(".detail-icon"),f.length>0?f.click():clearInterval(h)},1)}catch(i){clearInterval(h)}}else for(var j=this.$body.children(),k=0;k<j.length;k++)this.expandRow_(!0,a(j[k]).data("index"))},o.prototype.collapseAllRows=function(b){if(b)this.expandRow_(!1,0);else for(var c=this.$body.children(),d=0;d<c.length;d++)this.expandRow_(!1,a(c[d]).data("index"))},o.prototype.updateFormatText=function(a,b){this.options[c("format%s",a)]&&("string"==typeof b?this.options[c("format%s",a)]=function(){return b}:"function"==typeof b&&(this.options[c("format%s",a)]=b)),this.initToolbar(),this.initPagination(),this.initBody()};var p=["getOptions","getSelections","getAllSelections","getData","load","append","prepend","remove","removeAll","insertRow","updateRow","updateCell","updateByUniqueId","removeByUniqueId","getRowByUniqueId","showRow","hideRow","getHiddenRows","mergeCells","checkAll","uncheckAll","checkInvert","check","uncheck","checkBy","uncheckBy","refresh","resetView","resetWidth","destroy","showLoading","hideLoading","showColumn","hideColumn","getHiddenColumns","getVisibleColumns","showAllColumns","hideAllColumns","filterBy","scrollTo","getScrollPosition","selectPage","prevPage","nextPage","togglePagination","toggleView","refreshOptions","resetSearch","expandRow","collapseRow","expandAllRows","collapseAllRows","updateFormatText"];a.fn.bootstrapTable=function(b){var c,d=Array.prototype.slice.call(arguments,1);return this.each(function(){var e=a(this),f=e.data("bootstrap.table"),g=a.extend({},o.DEFAULTS,e.data(),"object"==typeof b&&b);if("string"==typeof b){if(a.inArray(b,p)<0)throw new Error("Unknown method: "+b);if(!f)return;c=f[b].apply(f,d),"destroy"===b&&e.removeData("bootstrap.table")}f||e.data("bootstrap.table",f=new o(this,g))}),"undefined"==typeof c?this:c},a.fn.bootstrapTable.Constructor=o,a.fn.bootstrapTable.defaults=o.DEFAULTS,a.fn.bootstrapTable.columnDefaults=o.COLUMN_DEFAULTS,a.fn.bootstrapTable.locales=o.LOCALES,a.fn.bootstrapTable.methods=p,a.fn.bootstrapTable.utils={sprintf:c,getFieldIndex:e,compareObjects:i,calculateObjectValue:h,getItemField:l,objectKeys:n,isIEBrowser:m},a(function(){a('[data-toggle="table"]').bootstrapTable()})}(jQuery);
(function() {
  var context = this;

  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        WebSocket: window.WebSocket,
        logger: window.console,
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages, ref;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(context);

  var ActionCable = context.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            return false;
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
var calendar_charting = function() {
	var chart

	var init = function() {
		

		load_data()
		


	}

	var resize_chart = function() {
		chart.setSize($(window).width(), $(window).height() - 80)
	}

	var load_data = function() {
		var y = new Date()
		//chart.xAxis[0].setExtremes(Date.UTC(y.getFullYear(), 0, 1))

		$.ajax({
			url: '/calendar/events',
			method: 'GET'
		}).done(function(res){
			chart = new Highcharts.chart('chart', {
				chart: {
					type: 'scatter',
					style: {
						fontFamily: 'Exo'
					},
					scrollablePlotArea: {
						minWidth: 1200,
						scrollPositionX: 0
					},
					panning: true,
					zoomType: 'x'
				},
				legend: false,
				credits: false,
				tooltip: {
					formatter: function() {
						var d = new Date(this.x)
						return this.key + '<br />' + (d.getUTCMonth() + 1) + '/' + d.getUTCDate()
					}
				},
				title: { 
					text: 'Dystopia Rising Events Calendar',
					style: { fontFamily: 'Exo' }
				},
				series: [{ 
					data: res.data,
					zones: [
						{ value: 1, color: 'rgba(73, 41, 112, 0.8)'},
						{ value: 6, color: 'rgba(26, 173, 206, 0.8)'},
						{ value: 11, color: 'rgba(242, 143, 67, 0.8)'},
						{ value: 13, color: 'rgba(73, 41, 112, 0.8)'},
						{ value: 16, color: 'rgba(26, 173, 206, 0.8)'},
						{ value: 19, color: 'rgba(139, 188, 33, 0.8)'},
						{ value: 20, color: 'rgba(145, 0, 0, 0.8)'},
					]
				}],
				xAxis: {
					type: 'datetime',
					scrollbar: { enabled: true },
					minorTicks: true,
					minRange: 24 * 60 * 60 * 7 * 1000,
					min: Date.UTC(y.getFullYear(), 0, 1),
					plotLines: [{
						value: Date.UTC(y.getFullYear(), y.getUTCMonth(), y.getUTCDate()),
						width: 4,
						color: '#c42525'
					}]
					//max: 9
				},
				yAxis: {
					type: 'category',
					scrollbar: { enabled: true },
					categories: res.category,
					title: false,
					labels: {
						style: {
							fontFamily: 'Exo'
						}
					}
					
				},
				plotOptions: {
					scatter: {

					}
				},

			})

			// $(window).on('resize', resize_chart)
			// resize_chart()
			//chart.yAxis[0].setCategories(res.category)
			//console.log(chart.yAxis[0].categories)
			//console.log(res.data)
			//chart.series[0].setData(res.data)
			

		})
	}

	return {
		init: init
	}
}();
/*
 Highcharts JS v6.1.0 (2018-04-13)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(w){"object"===typeof module&&module.exports?module.exports=w:w(Highcharts)})(function(w){(function(b){function r(b,a){this.init(b,a)}var v=b.CenteredSeriesMixin,u=b.each,n=b.extend,q=b.merge,g=b.splat;n(r.prototype,{coll:"pane",init:function(b,a){this.chart=a;this.background=[];a.pane.push(this);this.setOptions(b)},setOptions:function(b){this.options=q(this.defaultOptions,this.chart.angular?{background:{}}:void 0,b)},render:function(){var b=this.options,a=this.options.background,c=this.chart.renderer;
this.group||(this.group=c.g("pane-group").attr({zIndex:b.zIndex||0}).add());this.updateCenter();if(a)for(a=g(a),b=Math.max(a.length,this.background.length||0),c=0;c<b;c++)a[c]&&this.axis?this.renderBackground(q(this.defaultBackgroundOptions,a[c]),c):this.background[c]&&(this.background[c]=this.background[c].destroy(),this.background.splice(c,1))},renderBackground:function(b,a){var c="animate";this.background[a]||(this.background[a]=this.chart.renderer.path().add(this.group),c="attr");this.background[a][c]({d:this.axis.getPlotBandPath(b.from,
b.to,b)}).attr({fill:b.backgroundColor,stroke:b.borderColor,"stroke-width":b.borderWidth,"class":"highcharts-pane "+(b.className||"")})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"#cccccc",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#ffffff"],[1,"#e6e6e6"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"},updateCenter:function(b){this.center=(b||this.axis||{}).center=
v.getCenter.call(this)},update:function(b,a){q(!0,this.options,b);this.setOptions(this.options);this.render();u(this.chart.axes,function(c){c.pane===this&&(c.pane=null,c.update({},a))},this)}});b.Pane=r})(w);(function(b){var r=b.addEvent,v=b.Axis,u=b.each,n=b.extend,q=b.map,g=b.merge,l=b.noop,a=b.pick,c=b.pInt,d=b.Tick,k=b.wrap,f=b.correctFloat,e,p,t=v.prototype,h=d.prototype;b.radialAxisExtended||(b.radialAxisExtended=!0,e={getOffset:l,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=
!1},setScale:l,setCategories:l,setTitle:l},p={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null,style:{textOverflow:"none"}},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",
labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(a){a=this.options=g(this.defaultOptions,this.defaultRadialOptions,a);a.plotBands||(a.plotBands=[])},getOffset:function(){t.getOffset.call(this);this.chart.axisOffset[this.side]=0},getLinePath:function(c,d){c=this.center;var m=this.chart,e=a(d,c[2]/2-this.offset);this.isCircular||void 0!==d?(d=this.chart.renderer.symbols.arc(this.left+c[0],this.top+c[1],e,e,{start:this.startAngleRad,end:this.endAngleRad,
open:!0,innerR:0}),d.xBounds=[this.left+c[0]],d.yBounds=[this.top+c[1]-e]):(d=this.postTranslate(this.angleRad,e),d=["M",c[0]+m.plotLeft,c[1]+m.plotTop,"L",d.x,d.y]);return d},setAxisTranslation:function(){t.setAxisTranslation.call(this);this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){if(this.autoConnect=
this.isCircular&&void 0===a(this.userMax,this.options.max)&&f(this.endAngleRad-this.startAngleRad)===f(2*Math.PI))this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0},setAxisSize:function(){t.setAxisSize.call(this);this.isRadial&&(this.pane.updateCenter(this),this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*a(this.sector,1)/2)},getPosition:function(c,d){return this.postTranslate(this.isCircular?this.translate(c):
this.angleRad,a(this.isCircular?d:this.translate(c),this.center[2]/2)-this.offset)},postTranslate:function(a,c){var d=this.chart,e=this.center;a=this.startAngleRad+a;return{x:d.plotLeft+e[0]+Math.cos(a)*c,y:d.plotTop+e[1]+Math.sin(a)*c}},getPlotBandPath:function(d,e,b){var f=this.center,m=this.startAngleRad,k=f[2]/2,h=[a(b.outerRadius,"100%"),b.innerRadius,a(b.thickness,10)],p=Math.min(this.offset,0),x=/%$/,t,B=this.isCircular;"polygon"===this.options.gridLineInterpolation?f=this.getPlotLinePath(d).concat(this.getPlotLinePath(e,
!0)):(d=Math.max(d,this.min),e=Math.min(e,this.max),B||(h[0]=this.translate(d),h[1]=this.translate(e)),h=q(h,function(a){x.test(a)&&(a=c(a,10)*k/100);return a}),"circle"!==b.shape&&B?(d=m+this.translate(d),e=m+this.translate(e)):(d=-Math.PI/2,e=1.5*Math.PI,t=!0),h[0]-=p,h[2]-=p,f=this.chart.renderer.symbols.arc(this.left+f[0],this.top+f[1],h[0],h[0],{start:Math.min(d,e),end:Math.max(d,e),innerR:a(h[1],h[0]-h[2]),open:t}));return f},getPlotLinePath:function(a,c){var d=this,e=d.center,f=d.chart,b=d.getPosition(a),
h,m,k;d.isCircular?k=["M",e[0]+f.plotLeft,e[1]+f.plotTop,"L",b.x,b.y]:"circle"===d.options.gridLineInterpolation?(a=d.translate(a))&&(k=d.getLinePath(0,a)):(u(f.xAxis,function(a){a.pane===d.pane&&(h=a)}),k=[],a=d.translate(a),e=h.tickPositions,h.autoConnect&&(e=e.concat([e[0]])),c&&(e=[].concat(e).reverse()),u(e,function(c,d){m=h.getPosition(c,a);k.push(d?"L":"M",m.x,m.y)}));return k},getTitlePosition:function(){var a=this.center,c=this.chart,d=this.options.title;return{x:c.plotLeft+a[0]+(d.x||0),
y:c.plotTop+a[1]-{high:.5,middle:.25,low:0}[d.align]*a[2]+(d.y||0)}}},r(v,"init",function(a){var c=this.chart,d=c.angular,f=c.polar,b=this.isXAxis,h=d&&b,k,m=c.options;a=a.userOptions.pane||0;a=this.pane=c.pane&&c.pane[a];if(d){if(n(this,h?e:p),k=!b)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else f&&(n(this,p),this.defaultRadialOptions=(k=b)?this.defaultRadialXOptions:g(this.defaultYAxisOptions,this.defaultRadialYOptions));d||f?(this.isRadial=!0,c.inverted=!1,m.chart.zoomType=null):
this.isRadial=!1;a&&k&&(a.axis=this);this.isCircular=k}),r(v,"afterInit",function(){var c=this.chart,d=this.options,e=this.pane,f=e&&e.options;c.angular&&this.isXAxis||!e||!c.angular&&!c.polar||(this.angleRad=(d.angle||0)*Math.PI/180,this.startAngleRad=(f.startAngle-90)*Math.PI/180,this.endAngleRad=(a(f.endAngle,f.startAngle+360)-90)*Math.PI/180,this.offset=d.offset||0)}),k(t,"autoLabelAlign",function(a){if(!this.isRadial)return a.apply(this,[].slice.call(arguments,1))}),r(d,"afterGetPosition",function(a){this.axis.getPosition&&
n(a.pos,this.axis.getPosition(this.pos))}),r(d,"afterGetLabelPosition",function(c){var d=this.axis,e=this.label,f=d.options.labels,b=f.y,h,k=20,p=f.align,m=(d.translate(this.pos)+d.startAngleRad+Math.PI/2)/Math.PI*180%360;d.isRadial&&(h=d.getPosition(this.pos,d.center[2]/2+a(f.distance,-25)),"auto"===f.rotation?e.attr({rotation:m}):null===b&&(b=d.chart.renderer.fontMetrics(e.styles&&e.styles.fontSize).b-e.getBBox().height/2),null===p&&(d.isCircular?(this.label.getBBox().width>d.len*d.tickInterval/
(d.max-d.min)&&(k=0),p=m>k&&m<180-k?"left":m>180+k&&m<360-k?"right":"center"):p="center",e.attr({align:p})),c.pos.x=h.x+f.x,c.pos.y=h.y+b)}),k(h,"getMarkPath",function(a,c,d,e,f,b,h){var k=this.axis;k.isRadial?(a=k.getPosition(this.pos,k.center[2]/2+e),c=["M",c,d,"L",a.x,a.y]):c=a.call(this,c,d,e,f,b,h);return c}))})(w);(function(b){var r=b.each,v=b.pick,u=b.defined,n=b.seriesType,q=b.seriesTypes,g=b.Series.prototype,l=b.Point.prototype;n("arearange","area",{lineWidth:1,threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},
trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}},{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(a){return[a.low,a.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(a){var c=this.chart,d=this.xAxis.postTranslate(a.rectPlotX,this.yAxis.len-a.plotHigh);a.plotHighX=d.x-c.plotLeft;a.plotHigh=d.y-c.plotTop;a.plotLowX=a.plotX},translate:function(){var a=this,c=a.yAxis,d=!!a.modifyValue;q.area.prototype.translate.apply(a);
r(a.points,function(b){var f=b.low,e=b.high,k=b.plotY;null===e||null===f?(b.isNull=!0,b.plotY=null):(b.plotLow=k,b.plotHigh=c.translate(d?a.modifyValue(e,b):e,0,1,0,1),d&&(b.yBottom=b.plotHigh))});this.chart.polar&&r(this.points,function(c){a.highToXY(c);c.tooltipPos=[(c.plotHighX+c.plotLowX)/2,(c.plotHigh+c.plotLow)/2]})},getGraphPath:function(a){var c=[],d=[],b,f=q.area.prototype.getGraphPath,e,p,t;t=this.options;var h=this.chart.polar&&!1!==t.connectEnds,m=t.connectNulls,x=t.step;a=a||this.points;
for(b=a.length;b--;)e=a[b],e.isNull||h||m||a[b+1]&&!a[b+1].isNull||d.push({plotX:e.plotX,plotY:e.plotY,doCurve:!1}),p={polarPlotY:e.polarPlotY,rectPlotX:e.rectPlotX,yBottom:e.yBottom,plotX:v(e.plotHighX,e.plotX),plotY:e.plotHigh,isNull:e.isNull},d.push(p),c.push(p),e.isNull||h||m||a[b-1]&&!a[b-1].isNull||d.push({plotX:e.plotX,plotY:e.plotY,doCurve:!1});a=f.call(this,a);x&&(!0===x&&(x="left"),t.step={left:"right",center:"center",right:"left"}[x]);c=f.call(this,c);d=f.call(this,d);t.step=x;t=[].concat(a,
c);this.chart.polar||"M"!==d[0]||(d[0]="L");this.graphPath=t;this.areaPath=a.concat(d);t.isArea=!0;t.xMap=a.xMap;this.areaPath.xMap=a.xMap;return t},drawDataLabels:function(){var a=this.data,c=a.length,d,b=[],f=this.options.dataLabels,e=f.align,p=f.verticalAlign,t=f.inside,h,m,x=this.chart.inverted;if(f.enabled||this._hasPointLabels){for(d=c;d--;)if(h=a[d])m=t?h.plotHigh<h.plotLow:h.plotHigh>h.plotLow,h.y=h.high,h._plotY=h.plotY,h.plotY=h.plotHigh,b[d]=h.dataLabel,h.dataLabel=h.dataLabelUpper,h.below=
m,x?e||(f.align=m?"right":"left"):p||(f.verticalAlign=m?"top":"bottom"),f.x=f.xHigh,f.y=f.yHigh;g.drawDataLabels&&g.drawDataLabels.apply(this,arguments);for(d=c;d--;)if(h=a[d])m=t?h.plotHigh<h.plotLow:h.plotHigh>h.plotLow,h.dataLabelUpper=h.dataLabel,h.dataLabel=b[d],h.y=h.low,h.plotY=h._plotY,h.below=!m,x?e||(f.align=m?"left":"right"):p||(f.verticalAlign=m?"bottom":"top"),f.x=f.xLow,f.y=f.yLow;g.drawDataLabels&&g.drawDataLabels.apply(this,arguments)}f.align=e;f.verticalAlign=p},alignDataLabel:function(){q.column.prototype.alignDataLabel.apply(this,
arguments)},drawPoints:function(){var a=this.points.length,c,d;g.drawPoints.apply(this,arguments);for(d=0;d<a;)c=this.points[d],c.origProps={plotY:c.plotY,plotX:c.plotX,isInside:c.isInside,negative:c.negative,zone:c.zone,y:c.y},c.lowerGraphic=c.graphic,c.graphic=c.upperGraphic,c.plotY=c.plotHigh,u(c.plotHighX)&&(c.plotX=c.plotHighX),c.y=c.high,c.negative=c.high<(this.options.threshold||0),c.zone=this.zones.length&&c.getZone(),this.chart.polar||(c.isInside=c.isTopInside=void 0!==c.plotY&&0<=c.plotY&&
c.plotY<=this.yAxis.len&&0<=c.plotX&&c.plotX<=this.xAxis.len),d++;g.drawPoints.apply(this,arguments);for(d=0;d<a;)c=this.points[d],c.upperGraphic=c.graphic,c.graphic=c.lowerGraphic,b.extend(c,c.origProps),delete c.origProps,d++},setStackedPoints:b.noop},{setState:function(){var a=this.state,c=this.series,d=c.chart.polar;u(this.plotHigh)||(this.plotHigh=c.yAxis.toPixels(this.high,!0));u(this.plotLow)||(this.plotLow=this.plotY=c.yAxis.toPixels(this.low,!0));c.stateMarkerGraphic&&(c.lowerStateMarkerGraphic=
c.stateMarkerGraphic,c.stateMarkerGraphic=c.upperStateMarkerGraphic);this.graphic=this.upperGraphic;this.plotY=this.plotHigh;d&&(this.plotX=this.plotHighX);l.setState.apply(this,arguments);this.state=a;this.plotY=this.plotLow;this.graphic=this.lowerGraphic;d&&(this.plotX=this.plotLowX);c.stateMarkerGraphic&&(c.upperStateMarkerGraphic=c.stateMarkerGraphic,c.stateMarkerGraphic=c.lowerStateMarkerGraphic,c.lowerStateMarkerGraphic=void 0);l.setState.apply(this,arguments)},haloPath:function(){var a=this.series.chart.polar,
c=[];this.plotY=this.plotLow;a&&(this.plotX=this.plotLowX);this.isInside&&(c=l.haloPath.apply(this,arguments));this.plotY=this.plotHigh;a&&(this.plotX=this.plotHighX);this.isTopInside&&(c=c.concat(l.haloPath.apply(this,arguments)));return c},destroyElements:function(){r(["lowerGraphic","upperGraphic"],function(a){this[a]&&(this[a]=this[a].destroy())},this);this.graphic=null;return l.destroyElements.apply(this,arguments)}})})(w);(function(b){var r=b.seriesType;r("areasplinerange","arearange",null,
{getPointSpline:b.seriesTypes.spline.prototype.getPointSpline})})(w);(function(b){var r=b.defaultPlotOptions,v=b.each,u=b.merge,n=b.noop,q=b.pick,g=b.seriesType,l=b.seriesTypes.column.prototype;g("columnrange","arearange",u(r.column,r.arearange,{pointRange:null,marker:null,states:{hover:{halo:!1}}}),{translate:function(){var a=this,c=a.yAxis,d=a.xAxis,b=d.startAngleRad,f,e=a.chart,p=a.xAxis.isRadial,t=Math.max(e.chartWidth,e.chartHeight)+999,h;l.translate.apply(a);v(a.points,function(k){var m=k.shapeArgs,
l=a.options.minPointLength,y,g;k.plotHigh=h=Math.min(Math.max(-t,c.translate(k.high,0,1,0,1)),t);k.plotLow=Math.min(Math.max(-t,k.plotY),t);g=h;y=q(k.rectPlotY,k.plotY)-h;Math.abs(y)<l?(l-=y,y+=l,g-=l/2):0>y&&(y*=-1,g-=y);p?(f=k.barX+b,k.shapeType="path",k.shapeArgs={d:a.polarArc(g+y,g,f,f+k.pointWidth)}):(m.height=y,m.y=g,k.tooltipPos=e.inverted?[c.len+c.pos-e.plotLeft-g-y/2,d.len+d.pos-e.plotTop-m.x-m.width/2,y]:[d.left-e.plotLeft+m.x+m.width/2,c.pos-e.plotTop+g+y/2,y])})},directTouch:!0,trackerGroups:["group",
"dataLabelsGroup"],drawGraph:n,getSymbol:n,crispCol:l.crispCol,drawPoints:l.drawPoints,drawTracker:l.drawTracker,getColumnMetrics:l.getColumnMetrics,pointAttribs:l.pointAttribs,animate:function(){return l.animate.apply(this,arguments)},polarArc:function(){return l.polarArc.apply(this,arguments)},translate3dPoints:function(){return l.translate3dPoints.apply(this,arguments)},translate3dShapes:function(){return l.translate3dShapes.apply(this,arguments)}},{setState:l.pointClass.prototype.setState})})(w);
(function(b){var r=b.each,v=b.isNumber,u=b.merge,n=b.pick,q=b.pInt,g=b.Series,l=b.seriesType,a=b.TrackerMixin;l("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2,borderWidth:1,borderColor:"#cccccc"},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:b.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var a=this.yAxis,d=this.options,b=a.center;
this.generatePoints();r(this.points,function(c){var e=u(d.dial,c.dial),f=q(n(e.radius,80))*b[2]/200,k=q(n(e.baseLength,70))*f/100,h=q(n(e.rearLength,10))*f/100,m=e.baseWidth||3,x=e.topWidth||1,g=d.overshoot,l=a.startAngleRad+a.translate(c.y,null,null,null,!0);v(g)?(g=g/180*Math.PI,l=Math.max(a.startAngleRad-g,Math.min(a.endAngleRad+g,l))):!1===d.wrap&&(l=Math.max(a.startAngleRad,Math.min(a.endAngleRad,l)));l=180*l/Math.PI;c.shapeType="path";c.shapeArgs={d:e.path||["M",-h,-m/2,"L",k,-m/2,f,-x/2,f,
x/2,k,m/2,-h,m/2,"z"],translateX:b[0],translateY:b[1],rotation:l};c.plotX=b[0];c.plotY=b[1]})},drawPoints:function(){var a=this,d=a.yAxis.center,b=a.pivot,f=a.options,e=f.pivot,p=a.chart.renderer;r(a.points,function(c){var d=c.graphic,b=c.shapeArgs,e=b.d,k=u(f.dial,c.dial);d?(d.animate(b),b.d=e):(c.graphic=p[c.shapeType](b).attr({rotation:b.rotation,zIndex:1}).addClass("highcharts-dial").add(a.group),c.graphic.attr({stroke:k.borderColor||"none","stroke-width":k.borderWidth||0,fill:k.backgroundColor||
"#000000"}))});b?b.animate({translateX:d[0],translateY:d[1]}):(a.pivot=p.circle(0,0,n(e.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(d[0],d[1]).add(a.group),a.pivot.attr({"stroke-width":e.borderWidth||0,stroke:e.borderColor||"#cccccc",fill:e.backgroundColor||"#000000"}))},animate:function(a){var c=this;a||(r(c.points,function(a){var d=a.graphic;d&&(d.attr({rotation:180*c.yAxis.startAngleRad/Math.PI}),d.animate({rotation:a.shapeArgs.rotation},c.options.animation))}),c.animate=
null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);g.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(a,d){g.prototype.setData.call(this,a,!1);this.processData();this.generatePoints();n(d,!0)&&this.chart.redraw()},drawTracker:a&&a.drawTrackerPoint},{setState:function(a){this.state=a}})})(w);(function(b){var r=b.each,v=b.noop,u=b.pick,n=b.seriesType,q=b.seriesTypes;n("boxplot",
"column",{threshold:null,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'},whiskerLength:"50%",fillColor:"#ffffff",lineWidth:1,medianWidth:2,whiskerWidth:2},{pointArrayMap:["low","q1","median","q3","high"],toYData:function(b){return[b.low,b.q1,b.median,
b.q3,b.high]},pointValKey:"high",pointAttribs:function(){return{}},drawDataLabels:v,translate:function(){var b=this.yAxis,l=this.pointArrayMap;q.column.prototype.translate.apply(this);r(this.points,function(a){r(l,function(c){null!==a[c]&&(a[c+"Plot"]=b.translate(a[c],0,1,0,1))})})},drawPoints:function(){var b=this,l=b.options,a=b.chart.renderer,c,d,k,f,e,p,t=0,h,m,x,q,n=!1!==b.doQuartiles,v,A=b.options.whiskerLength;r(b.points,function(g){var r=g.graphic,y=r?"animate":"attr",B=g.shapeArgs,w={},D=
{},J={},K={},C=g.color||b.color;void 0!==g.plotY&&(h=B.width,m=Math.floor(B.x),x=m+h,q=Math.round(h/2),c=Math.floor(n?g.q1Plot:g.lowPlot),d=Math.floor(n?g.q3Plot:g.lowPlot),k=Math.floor(g.highPlot),f=Math.floor(g.lowPlot),r||(g.graphic=r=a.g("point").add(b.group),g.stem=a.path().addClass("highcharts-boxplot-stem").add(r),A&&(g.whiskers=a.path().addClass("highcharts-boxplot-whisker").add(r)),n&&(g.box=a.path(void 0).addClass("highcharts-boxplot-box").add(r)),g.medianShape=a.path(void 0).addClass("highcharts-boxplot-median").add(r)),
D.stroke=g.stemColor||l.stemColor||C,D["stroke-width"]=u(g.stemWidth,l.stemWidth,l.lineWidth),D.dashstyle=g.stemDashStyle||l.stemDashStyle,g.stem.attr(D),A&&(J.stroke=g.whiskerColor||l.whiskerColor||C,J["stroke-width"]=u(g.whiskerWidth,l.whiskerWidth,l.lineWidth),g.whiskers.attr(J)),n&&(w.fill=g.fillColor||l.fillColor||C,w.stroke=l.lineColor||C,w["stroke-width"]=l.lineWidth||0,g.box.attr(w)),K.stroke=g.medianColor||l.medianColor||C,K["stroke-width"]=u(g.medianWidth,l.medianWidth,l.lineWidth),g.medianShape.attr(K),
p=g.stem.strokeWidth()%2/2,t=m+q+p,g.stem[y]({d:["M",t,d,"L",t,k,"M",t,c,"L",t,f]}),n&&(p=g.box.strokeWidth()%2/2,c=Math.floor(c)+p,d=Math.floor(d)+p,m+=p,x+=p,g.box[y]({d:["M",m,d,"L",m,c,"L",x,c,"L",x,d,"L",m,d,"z"]})),A&&(p=g.whiskers.strokeWidth()%2/2,k+=p,f+=p,v=/%$/.test(A)?q*parseFloat(A)/100:A/2,g.whiskers[y]({d:["M",t-v,k,"L",t+v,k,"M",t-v,f,"L",t+v,f]})),e=Math.round(g.medianPlot),p=g.medianShape.strokeWidth()%2/2,e+=p,g.medianShape[y]({d:["M",m,e,"L",x,e]}))})},setStackedPoints:v})})(w);
(function(b){var r=b.each,v=b.noop,u=b.seriesType,n=b.seriesTypes;u("errorbar","boxplot",{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(b){return[b.low,b.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:n.arearange?function(){var b=
this.pointValKey;n.arearange.prototype.drawDataLabels.call(this);r(this.data,function(g){g.y=g[b]})}:v,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||n.column.prototype.getColumnMetrics.call(this)}})})(w);(function(b){var r=b.correctFloat,v=b.isNumber,u=b.pick,n=b.Point,q=b.Series,g=b.seriesType,l=b.seriesTypes;g("waterfall","column",{dataLabels:{inside:!0},lineWidth:1,lineColor:"#333333",dashStyle:"dot",borderColor:"#333333",states:{hover:{lineWidthPlus:0}}},
{pointValKey:"y",showLine:!0,translate:function(){var a=this.options,c=this.yAxis,b,k,f,e,p,t,h,m,g,n,q=u(a.minPointLength,5),v=q/2,w=a.threshold,F=a.stacking,z;l.column.prototype.translate.apply(this);m=g=w;k=this.points;b=0;for(a=k.length;b<a;b++)f=k[b],h=this.processedYData[b],e=f.shapeArgs,p=F&&c.stacks[(this.negStacks&&h<w?"-":"")+this.stackKey],z=this.getStackIndicator(z,f.x,this.index),n=u(p&&p[f.x].points[z.key],[0,h]),f.isSum?f.y=r(h):f.isIntermediateSum&&(f.y=r(h-g)),t=Math.max(m,m+f.y)+
n[0],e.y=c.translate(t,0,1,0,1),f.isSum?(e.y=c.translate(n[1],0,1,0,1),e.height=Math.min(c.translate(n[0],0,1,0,1),c.len)-e.y):f.isIntermediateSum?(e.y=c.translate(n[1],0,1,0,1),e.height=Math.min(c.translate(g,0,1,0,1),c.len)-e.y,g=n[1]):(e.height=0<h?c.translate(m,0,1,0,1)-e.y:c.translate(m,0,1,0,1)-c.translate(m-h,0,1,0,1),m+=p&&p[f.x]?p[f.x].total:h),0>e.height&&(e.y+=e.height,e.height*=-1),f.plotY=e.y=Math.round(e.y)-this.borderWidth%2/2,e.height=Math.max(Math.round(e.height),.001),f.yBottom=
e.y+e.height,e.height<=q&&!f.isNull?(e.height=q,e.y-=v,f.plotY=e.y,f.minPointLengthOffset=0>f.y?-v:v):f.minPointLengthOffset=0,e=f.plotY+(f.negative?e.height:0),this.chart.inverted?f.tooltipPos[0]=c.len-e:f.tooltipPos[1]=e},processData:function(a){var c=this.yData,b=this.options.data,k,f=c.length,e,p,t,h,m,g;p=e=t=h=this.options.threshold||0;for(g=0;g<f;g++)m=c[g],k=b&&b[g]?b[g]:{},"sum"===m||k.isSum?c[g]=r(p):"intermediateSum"===m||k.isIntermediateSum?c[g]=r(e):(p+=m,e+=m),t=Math.min(p,t),h=Math.max(p,
h);q.prototype.processData.call(this,a);this.options.stacking||(this.dataMin=t,this.dataMax=h)},toYData:function(a){return a.isSum?0===a.x?null:"sum":a.isIntermediateSum?0===a.x?null:"intermediateSum":a.y},pointAttribs:function(a,c){var b=this.options.upColor;b&&!a.options.color&&(a.color=0<a.y?b:null);a=l.column.prototype.pointAttribs.call(this,a,c);delete a.dashstyle;return a},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var a=this.data,c=a.length,b=this.graph.strokeWidth()+
this.borderWidth,b=Math.round(b)%2/2,k=this.xAxis.reversed,f=this.yAxis.reversed,e=[],p,g,h;for(h=1;h<c;h++){g=a[h].shapeArgs;p=a[h-1].shapeArgs;g=["M",p.x+(k?0:p.width),p.y+a[h-1].minPointLengthOffset+b,"L",g.x+(k?p.width:0),p.y+a[h-1].minPointLengthOffset+b];if(0>a[h-1].y&&!f||0<a[h-1].y&&f)g[2]+=p.height,g[5]+=p.height;e=e.concat(g)}return e},drawGraph:function(){q.prototype.drawGraph.call(this);this.graph.attr({d:this.getCrispPath()})},setStackedPoints:function(){var a=this.options,c,b;q.prototype.setStackedPoints.apply(this,
arguments);c=this.stackedYData?this.stackedYData.length:0;for(b=1;b<c;b++)a.data[b].isSum||a.data[b].isIntermediateSum||(this.stackedYData[b]+=this.stackedYData[b-1])},getExtremes:function(){if(this.options.stacking)return q.prototype.getExtremes.apply(this,arguments)}},{getClassName:function(){var a=n.prototype.getClassName.call(this);this.isSum?a+=" highcharts-sum":this.isIntermediateSum&&(a+=" highcharts-intermediate-sum");return a},isValid:function(){return v(this.y,!0)||this.isSum||this.isIntermediateSum}})})(w);
(function(b){var r=b.Series,v=b.seriesType,u=b.seriesTypes;v("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var b=r.prototype.getGraphPath.call(this),q=b.length+1;q--;)(q===b.length||"M"===b[q])&&0<q&&b.splice(q,0,"z");return this.areaPath=b},drawGraph:function(){this.options.fillColor=this.color;u.area.prototype.drawGraph.call(this)},drawLegendSymbol:b.LegendSymbolMixin.drawRectangle,
drawTracker:r.prototype.drawTracker,setStackedPoints:b.noop})})(w);(function(b){var r=b.arrayMax,v=b.arrayMin,u=b.Axis,n=b.color,q=b.each,g=b.isNumber,l=b.noop,a=b.pick,c=b.pInt,d=b.Point,k=b.Series,f=b.seriesType,e=b.seriesTypes;f("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},animationLimit:250,marker:{lineColor:null,lineWidth:1,fillOpacity:.5,radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,
states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,pointAttribs:function(a,c){var b=this.options.marker.fillOpacity;a=k.prototype.pointAttribs.call(this,a,c);1!==b&&(a.fill=n(a.fill).setOpacity(b).get("rgba"));return a},getRadii:function(a,c,b,d){var e,
f,h,k=this.zData,g=[],p=this.options,m="width"!==p.sizeBy,t=p.zThreshold,l=c-a;f=0;for(e=k.length;f<e;f++)h=k[f],p.sizeByAbsoluteValue&&null!==h&&(h=Math.abs(h-t),c=l=Math.max(c-t,Math.abs(a-t)),a=0),null===h?h=null:h<a?h=b/2-1:(h=0<l?(h-a)/l:.5,m&&0<=h&&(h=Math.sqrt(h)),h=Math.ceil(b+h*(d-b))/2),g.push(h);this.radii=g},animate:function(a){!a&&this.points.length<this.options.animationLimit&&(q(this.points,function(a){var c=a.graphic,b;c&&c.width&&(b={x:c.x,y:c.y,width:c.width,height:c.height},c.attr({x:a.plotX,
y:a.plotY,width:1,height:1}),c.animate(b,this.options.animation))},this),this.animate=null)},translate:function(){var a,c=this.data,d,f,k=this.radii;e.scatter.prototype.translate.call(this);for(a=c.length;a--;)d=c[a],f=k?k[a]:0,g(f)&&f>=this.minPxSize/2?(d.marker=b.extend(d.marker,{radius:f,width:2*f,height:2*f}),d.dlBox={x:d.plotX-f,y:d.plotY-f,width:2*f,height:2*f}):d.shapeArgs=d.plotY=d.dlBox=void 0},alignDataLabel:e.column.prototype.alignDataLabel,buildKDTree:l,applyZones:l},{haloPath:function(a){return d.prototype.haloPath.call(this,
0===a?0:(this.marker?this.marker.radius||0:0)+a)},ttBelow:!1});u.prototype.beforePadding=function(){var b=this,d=this.len,e=this.chart,f=0,k=d,l=this.isXAxis,n=l?"xData":"yData",u=this.min,w={},F=Math.min(e.plotWidth,e.plotHeight),z=Number.MAX_VALUE,G=-Number.MAX_VALUE,H=this.max-u,E=d/H,I=[];q(this.series,function(d){var f=d.options;!d.bubblePadding||!d.visible&&e.options.chart.ignoreHiddenSeries||(b.allowZoomOutside=!0,I.push(d),l&&(q(["minSize","maxSize"],function(a){var b=f[a],d=/%$/.test(b),
b=c(b);w[a]=d?F*b/100:b}),d.minPxSize=w.minSize,d.maxPxSize=Math.max(w.maxSize,w.minSize),d=d.zData,d.length&&(z=a(f.zMin,Math.min(z,Math.max(v(d),!1===f.displayNegative?f.zThreshold:-Number.MAX_VALUE))),G=a(f.zMax,Math.max(G,r(d))))))});q(I,function(a){var c=a[n],d=c.length,e;l&&a.getRadii(z,G,a.minPxSize,a.maxPxSize);if(0<H)for(;d--;)g(c[d])&&b.dataMin<=c[d]&&c[d]<=b.dataMax&&(e=a.radii[d],f=Math.min((c[d]-u)*E-e,f),k=Math.max((c[d]-u)*E+e,k))});I.length&&0<H&&!this.isLog&&(k-=d,E*=(d+f-k)/d,q([["min",
"userMin",f],["max","userMax",k]],function(c){void 0===a(b.options[c[0]],b[c[1]])&&(b[c[0]]+=c[2]/E)}))}})(w);(function(b){var r=b.each,v=b.pick,u=b.Series,n=b.seriesTypes,q=b.wrap,g=u.prototype,l=b.Pointer.prototype;b.polarExtended||(b.polarExtended=!0,g.searchPointByAngle=function(a){var c=this.chart,b=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(a.chartX-b[0]-c.plotLeft,a.chartY-b[1]-c.plotTop)})},g.getConnectors=function(a,c,b,k){var d,e,g,l,h,m,n,q;e=k?
1:0;d=0<=c&&c<=a.length-1?c:0>c?a.length-1+c:0;c=0>d-1?a.length-(1+e):d-1;e=d+1>a.length-1?e:d+1;g=a[c];e=a[e];l=g.plotX;g=g.plotY;h=e.plotX;m=e.plotY;e=a[d].plotX;d=a[d].plotY;l=(1.5*e+l)/2.5;g=(1.5*d+g)/2.5;h=(1.5*e+h)/2.5;n=(1.5*d+m)/2.5;m=Math.sqrt(Math.pow(l-e,2)+Math.pow(g-d,2));q=Math.sqrt(Math.pow(h-e,2)+Math.pow(n-d,2));l=Math.atan2(g-d,l-e);n=Math.PI/2+(l+Math.atan2(n-d,h-e))/2;Math.abs(l-n)>Math.PI/2&&(n-=Math.PI);l=e+Math.cos(n)*m;g=d+Math.sin(n)*m;h=e+Math.cos(Math.PI+n)*q;n=d+Math.sin(Math.PI+
n)*q;e={rightContX:h,rightContY:n,leftContX:l,leftContY:g,plotX:e,plotY:d};b&&(e.prevPointCont=this.getConnectors(a,c,!1,k));return e},q(g,"buildKDTree",function(a){this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.options.findNearestPointBy="xy");a.apply(this)}),g.toXY=function(a){var c,b=this.chart,k=a.plotX;c=a.plotY;a.rectPlotX=k;a.rectPlotY=c;c=this.xAxis.postTranslate(a.plotX,this.yAxis.len-c);a.plotX=a.polarPlotX=c.x-b.plotLeft;a.plotY=a.polarPlotY=c.y-b.plotTop;
this.kdByAngle?(b=(k/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>b&&(b+=360),a.clientX=b):a.clientX=a.plotX},n.spline&&(q(n.spline.prototype,"getPointSpline",function(a,c,b,k){this.chart.polar?k?(a=this.getConnectors(c,k,!0,this.connectEnds),a=["C",a.prevPointCont.rightContX,a.prevPointCont.rightContY,a.leftContX,a.leftContY,a.plotX,a.plotY]):a=["M",b.plotX,b.plotY]:a=a.call(this,c,b,k);return a}),n.areasplinerange&&(n.areasplinerange.prototype.getPointSpline=n.spline.prototype.getPointSpline)),
b.addEvent(u,"afterTranslate",function(){var a=this.chart,c,d;if(a.polar){this.kdByAngle=a.tooltip&&a.tooltip.shared;if(!this.preventPostTranslate)for(c=this.points,d=c.length;d--;)this.toXY(c[d]);this.hasClipCircleSetter||(this.hasClipCircleSetter=!!b.addEvent(this,"afterRender",function(){var c;a.polar&&(c=this.yAxis.center,this.group.clip(a.renderer.clipCircle(c[0],c[1],c[2]/2)),this.setClip=b.noop)}))}}),q(g,"getGraphPath",function(a,c){var b=this,g,f,e;if(this.chart.polar){c=c||this.points;for(g=
0;g<c.length;g++)if(!c[g].isNull){f=g;break}!1!==this.options.connectEnds&&void 0!==f&&(this.connectEnds=!0,c.splice(c.length,0,c[f]),e=!0);r(c,function(a){void 0===a.polarPlotY&&b.toXY(a)})}g=a.apply(this,[].slice.call(arguments,1));e&&c.pop();return g}),u=function(a,c){var b=this.chart,g=this.options.animation,f=this.group,e=this.markerGroup,l=this.xAxis.center,n=b.plotLeft,h=b.plotTop;b.polar?b.renderer.isSVG&&(!0===g&&(g={}),c?(a={translateX:l[0]+n,translateY:l[1]+h,scaleX:.001,scaleY:.001},f.attr(a),
e&&e.attr(a)):(a={translateX:n,translateY:h,scaleX:1,scaleY:1},f.animate(a,g),e&&e.animate(a,g),this.animate=null)):a.call(this,c)},q(g,"animate",u),n.column&&(n=n.column.prototype,n.polarArc=function(a,c,b,g){var d=this.xAxis.center,e=this.yAxis.len;return this.chart.renderer.symbols.arc(d[0],d[1],e-c,null,{start:b,end:g,innerR:e-v(a,e)})},q(n,"animate",u),q(n,"translate",function(a){var c=this.xAxis,b=c.startAngleRad,g,f,e;this.preventPostTranslate=!0;a.call(this);if(c.isRadial)for(g=this.points,
e=g.length;e--;)f=g[e],a=f.barX+b,f.shapeType="path",f.shapeArgs={d:this.polarArc(f.yBottom,f.plotY,a,a+f.pointWidth)},this.toXY(f),f.tooltipPos=[f.plotX,f.plotY],f.ttBelow=f.plotY>c.center[1]}),q(n,"alignDataLabel",function(a,b,d,k,f,e){this.chart.polar?(a=b.rectPlotX/Math.PI*180,null===k.align&&(k.align=20<a&&160>a?"left":200<a&&340>a?"right":"center"),null===k.verticalAlign&&(k.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),g.alignDataLabel.call(this,b,d,k,f,e)):a.call(this,b,
d,k,f,e)})),q(l,"getCoordinates",function(a,b){var c=this.chart,g={xAxis:[],yAxis:[]};c.polar?r(c.axes,function(a){var d=a.isXAxis,f=a.center,k=b.chartX-f[0]-c.plotLeft,f=b.chartY-f[1]-c.plotTop;g[d?"xAxis":"yAxis"].push({axis:a,value:a.translate(d?Math.PI-Math.atan2(k,f):Math.sqrt(Math.pow(k,2)+Math.pow(f,2)),!0)})}):g=a.call(this,b);return g}),b.SVGRenderer.prototype.clipCircle=function(a,c,d){var g=b.uniqueKey(),f=this.createElement("clipPath").attr({id:g}).add(this.defs);a=this.circle(a,c,d).add(f);
a.id=g;a.clipPath=f;return a},b.addEvent(b.Chart,"getAxes",function(){this.pane||(this.pane=[]);r(b.splat(this.options.pane),function(a){new b.Pane(a,this)},this)}),b.addEvent(b.Chart,"afterDrawChartBox",function(){r(this.pane,function(a){a.render()})}),q(b.Chart.prototype,"get",function(a,c){return b.find(this.pane,function(a){return a.options.id===c})||a.call(this,c)}))})(w)});
/*
 Highcharts JS v6.1.0 (2018-04-13)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(T,K){"object"===typeof module&&module.exports?module.exports=T.document?K(T):K:T.Highcharts=K(T)})("undefined"!==typeof window?window:this,function(T){var K=function(){var a="undefined"===typeof T?window:T,C=a.document,F=a.navigator&&a.navigator.userAgent||"",D=C&&C.createElementNS&&!!C.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,r=/(edge|msie|trident)/i.test(F)&&!a.opera,g=-1!==F.indexOf("Firefox"),e=-1!==F.indexOf("Chrome"),t=g&&4>parseInt(F.split("Firefox/")[1],
10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",version:"6.1.0",deg2rad:2*Math.PI/360,doc:C,hasBidiBug:t,hasTouch:C&&void 0!==C.documentElement.ontouchstart,isMS:r,isWebKit:-1!==F.indexOf("AppleWebKit"),isFirefox:g,isChrome:e,isSafari:!e&&-1!==F.indexOf("Safari"),isTouchDevice:/(Mobile|Android|Windows Phone)/.test(F),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:D,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},
charts:[]}}();(function(a){a.timers=[];var C=a.charts,F=a.doc,D=a.win;a.error=function(r,g){r=a.isNumber(r)?"Highcharts error #"+r+": www.highcharts.com/errors/"+r:r;if(g)throw Error(r);D.console&&console.log(r)};a.Fx=function(a,g,e){this.options=g;this.elem=a;this.prop=e};a.Fx.prototype={dSetter:function(){var a=this.paths[0],g=this.paths[1],e=[],t=this.now,w=a.length,l;if(1===t)e=this.toD;else if(w===g.length&&1>t)for(;w--;)l=parseFloat(a[w]),e[w]=isNaN(l)?g[w]:t*parseFloat(g[w]-l)+l;else e=g;this.elem.attr("d",
e,null,!0)},update:function(){var a=this.elem,g=this.prop,e=this.now,t=this.options.step;if(this[g+"Setter"])this[g+"Setter"]();else a.attr?a.element&&a.attr(g,e,null,!0):a.style[g]=e+this.unit;t&&t.call(a,e,this)},run:function(r,g,e){var t=this,w=t.options,l=function(a){return l.stopped?!1:t.step(a)},u=D.requestAnimationFrame||function(a){setTimeout(a,13)},c=function(){for(var d=0;d<a.timers.length;d++)a.timers[d]()||a.timers.splice(d--,1);a.timers.length&&u(c)};r!==g||this.elem["forceAnimate:"+
this.prop]?(this.startTime=+new Date,this.start=r,this.end=g,this.unit=e,this.now=this.start,this.pos=0,l.elem=this.elem,l.prop=this.prop,l()&&1===a.timers.push(l)&&u(c)):(delete w.curAnim[this.prop],w.complete&&0===a.keys(w.curAnim).length&&w.complete.call(this.elem))},step:function(r){var g=+new Date,e,t=this.options,w=this.elem,l=t.complete,u=t.duration,c=t.curAnim;w.attr&&!w.element?r=!1:r||g>=u+this.startTime?(this.now=this.end,this.pos=1,this.update(),e=c[this.prop]=!0,a.objectEach(c,function(a){!0!==
a&&(e=!1)}),e&&l&&l.call(w),r=!1):(this.pos=t.easing((g-this.startTime)/u),this.now=this.start+(this.end-this.start)*this.pos,this.update(),r=!0);return r},initPath:function(r,g,e){function t(a){var f,c;for(b=a.length;b--;)f="M"===a[b]||"L"===a[b],c=/[a-zA-Z]/.test(a[b+3]),f&&c&&a.splice(b+1,0,a[b+1],a[b+2],a[b+1],a[b+2])}function w(a,f){for(;a.length<p;){a[0]=f[p-a.length];var c=a.slice(0,x);[].splice.apply(a,[0,0].concat(c));n&&(c=a.slice(a.length-x),[].splice.apply(a,[a.length,0].concat(c)),b--)}a[0]=
"M"}function l(a,b){for(var c=(p-a.length)/x;0<c&&c--;)f=a.slice().splice(a.length/z-x,x*z),f[0]=b[p-x-c*x],k&&(f[x-6]=f[x-2],f[x-5]=f[x-1]),[].splice.apply(a,[a.length/z,0].concat(f)),n&&c--}g=g||"";var u,c=r.startX,d=r.endX,k=-1<g.indexOf("C"),x=k?7:3,p,f,b;g=g.split(" ");e=e.slice();var n=r.isArea,z=n?2:1,J;k&&(t(g),t(e));if(c&&d){for(b=0;b<c.length;b++)if(c[b]===d[0]){u=b;break}else if(c[0]===d[d.length-c.length+b]){u=b;J=!0;break}void 0===u&&(g=[])}g.length&&a.isNumber(u)&&(p=e.length+u*z*x,
J?(w(g,e),l(e,g)):(w(e,g),l(g,e)));return[g,e]}};a.Fx.prototype.fillSetter=a.Fx.prototype.strokeSetter=function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)};a.merge=function(){var r,g=arguments,e,t={},w=function(e,u){"object"!==typeof e&&(e={});a.objectEach(u,function(c,d){!a.isObject(c,!0)||a.isClass(c)||a.isDOMElement(c)?e[d]=u[d]:e[d]=w(e[d]||{},c)});return e};!0===g[0]&&(t=g[1],g=Array.prototype.slice.call(g,2));e=g.length;for(r=0;r<e;r++)t=w(t,
g[r]);return t};a.pInt=function(a,g){return parseInt(a,g||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(r,g){return!!r&&"object"===typeof r&&(!g||!a.isArray(r))};a.isDOMElement=function(r){return a.isObject(r)&&"number"===typeof r.nodeType};a.isClass=function(r){var g=r&&r.constructor;return!(!a.isObject(r,!0)||a.isDOMElement(r)||!g||!g.name||"Object"===
g.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)&&Infinity>a&&-Infinity<a};a.erase=function(a,g){for(var e=a.length;e--;)if(a[e]===g){a.splice(e,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(r,g,e){var t;a.isString(g)?a.defined(e)?r.setAttribute(g,e):r&&r.getAttribute&&((t=r.getAttribute(g))||"class"!==g||(t=r.getAttribute(g+"Name"))):a.defined(g)&&a.isObject(g)&&a.objectEach(g,function(a,e){r.setAttribute(e,a)});return t};a.splat=function(r){return a.isArray(r)?
r:[r]};a.syncTimeout=function(a,g,e){if(g)return setTimeout(a,g,e);a.call(0,e)};a.clearTimeout=function(r){a.defined(r)&&clearTimeout(r)};a.extend=function(a,g){var e;a||(a={});for(e in g)a[e]=g[e];return a};a.pick=function(){var a=arguments,g,e,t=a.length;for(g=0;g<t;g++)if(e=a[g],void 0!==e&&null!==e)return e};a.css=function(r,g){a.isMS&&!a.svg&&g&&void 0!==g.opacity&&(g.filter="alpha(opacity\x3d"+100*g.opacity+")");a.extend(r.style,g)};a.createElement=function(r,g,e,t,w){r=F.createElement(r);var l=
a.css;g&&a.extend(r,g);w&&l(r,{padding:0,border:"none",margin:0});e&&l(r,e);t&&t.appendChild(r);return r};a.extendClass=function(r,g){var e=function(){};e.prototype=new r;a.extend(e.prototype,g);return e};a.pad=function(a,g,e){return Array((g||2)+1-String(a).replace("-","").length).join(e||0)+a};a.relativeLength=function(a,g,e){return/%$/.test(a)?g*parseFloat(a)/100+(e||0):parseFloat(a)};a.wrap=function(a,g,e){var t=a[g];a[g]=function(){var a=Array.prototype.slice.call(arguments),l=arguments,u=this;
u.proceed=function(){t.apply(u,arguments.length?arguments:l)};a.unshift(t);a=e.apply(this,a);u.proceed=null;return a}};a.formatSingle=function(r,g,e){var t=/\.([0-9])/,w=a.defaultOptions.lang;/f$/.test(r)?(e=(e=r.match(t))?e[1]:-1,null!==g&&(g=a.numberFormat(g,e,w.decimalPoint,-1<r.indexOf(",")?w.thousandsSep:""))):g=(e||a.time).dateFormat(r,g);return g};a.format=function(r,g,e){for(var t="{",w=!1,l,u,c,d,k=[],x;r;){t=r.indexOf(t);if(-1===t)break;l=r.slice(0,t);if(w){l=l.split(":");u=l.shift().split(".");
d=u.length;x=g;for(c=0;c<d;c++)x&&(x=x[u[c]]);l.length&&(x=a.formatSingle(l.join(":"),x,e));k.push(x)}else k.push(l);r=r.slice(t+1);t=(w=!w)?"}":"{"}k.push(r);return k.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(r,g,e,t,w){var l,u=r;e=a.pick(e,1);l=r/e;g||(g=w?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===t&&(1===e?g=a.grep(g,function(a){return 0===a%1}):.1>=e&&(g=[1/e])));for(t=0;t<g.length&&!(u=g[t],w&&u*e>=r||
!w&&l<=(g[t]+(g[t+1]||g[t]))/2);t++);return u=a.correctFloat(u*e,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,g){var e=a.length,t,w;for(w=0;w<e;w++)a[w].safeI=w;a.sort(function(a,e){t=g(a,e);return 0===t?a.safeI-e.safeI:t});for(w=0;w<e;w++)delete a[w].safeI};a.arrayMin=function(a){for(var g=a.length,e=a[0];g--;)a[g]<e&&(e=a[g]);return e};a.arrayMax=function(a){for(var g=a.length,e=a[0];g--;)a[g]>e&&(e=a[g]);return e};a.destroyObjectProperties=function(r,g){a.objectEach(r,function(a,
t){a&&a!==g&&a.destroy&&a.destroy();delete r[t]})};a.discardElement=function(r){var g=a.garbageBin;g||(g=a.createElement("div"));r&&g.appendChild(r);g.innerHTML=""};a.correctFloat=function(a,g){return parseFloat(a.toPrecision(g||14))};a.setAnimation=function(r,g){g.renderer.globalAnimation=a.pick(r,g.options.chart.animation,!0)};a.animObject=function(r){return a.isObject(r)?a.merge(r):{duration:r?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,
year:314496E5};a.numberFormat=function(r,g,e,t){r=+r||0;g=+g;var w=a.defaultOptions.lang,l=(r.toString().split(".")[1]||"").split("e")[0].length,u,c,d=r.toString().split("e");-1===g?g=Math.min(l,20):a.isNumber(g)?g&&d[1]&&0>d[1]&&(u=g+ +d[1],0<=u?(d[0]=(+d[0]).toExponential(u).split("e")[0],g=u):(d[0]=d[0].split(".")[0]||0,r=20>g?(d[0]*Math.pow(10,d[1])).toFixed(g):0,d[1]=0)):g=2;c=(Math.abs(d[1]?d[0]:r)+Math.pow(10,-Math.max(g,l)-1)).toFixed(g);l=String(a.pInt(c));u=3<l.length?l.length%3:0;e=a.pick(e,
w.decimalPoint);t=a.pick(t,w.thousandsSep);r=(0>r?"-":"")+(u?l.substr(0,u)+t:"");r+=l.substr(u).replace(/(\d{3})(?=\d)/g,"$1"+t);g&&(r+=e+c.slice(-g));d[1]&&0!==+r&&(r+="e"+d[1]);return r};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(r,g,e){if("width"===g)return Math.min(r.offsetWidth,r.scrollWidth)-a.getStyle(r,"padding-left")-a.getStyle(r,"padding-right");if("height"===g)return Math.min(r.offsetHeight,r.scrollHeight)-a.getStyle(r,"padding-top")-a.getStyle(r,
"padding-bottom");D.getComputedStyle||a.error(27,!0);if(r=D.getComputedStyle(r,void 0))r=r.getPropertyValue(g),a.pick(e,"opacity"!==g)&&(r=a.pInt(r));return r};a.inArray=function(r,g,e){return(a.indexOfPolyfill||Array.prototype.indexOf).call(g,r,e)};a.grep=function(r,g){return(a.filterPolyfill||Array.prototype.filter).call(r,g)};a.find=Array.prototype.find?function(a,g){return a.find(g)}:function(a,g){var e,t=a.length;for(e=0;e<t;e++)if(g(a[e],e))return a[e]};a.some=function(r,g,e){return(a.somePolyfill||
Array.prototype.some).call(r,g,e)};a.map=function(a,g){for(var e=[],t=0,w=a.length;t<w;t++)e[t]=g.call(a[t],a[t],t,a);return e};a.keys=function(r){return(a.keysPolyfill||Object.keys).call(void 0,r)};a.reduce=function(r,g,e){return(a.reducePolyfill||Array.prototype.reduce).call(r,g,e)};a.offset=function(a){var g=F.documentElement;a=a.parentElement?a.getBoundingClientRect():{top:0,left:0};return{top:a.top+(D.pageYOffset||g.scrollTop)-(g.clientTop||0),left:a.left+(D.pageXOffset||g.scrollLeft)-(g.clientLeft||
0)}};a.stop=function(r,g){for(var e=a.timers.length;e--;)a.timers[e].elem!==r||g&&g!==a.timers[e].prop||(a.timers[e].stopped=!0)};a.each=function(r,g,e){return(a.forEachPolyfill||Array.prototype.forEach).call(r,g,e)};a.objectEach=function(a,g,e){for(var t in a)a.hasOwnProperty(t)&&g.call(e||a[t],a[t],t,a)};a.addEvent=function(r,g,e){var t,w=r.addEventListener||a.addEventListenerPolyfill;t="function"===typeof r&&r.prototype?r.prototype.protoEvents=r.prototype.protoEvents||{}:r.hcEvents=r.hcEvents||
{};w&&w.call(r,g,e,!1);t[g]||(t[g]=[]);t[g].push(e);return function(){a.removeEvent(r,g,e)}};a.removeEvent=function(r,g,e){function t(c,d){var k=r.removeEventListener||a.removeEventListenerPolyfill;k&&k.call(r,c,d,!1)}function w(c){var d,k;r.nodeName&&(g?(d={},d[g]=!0):d=c,a.objectEach(d,function(a,d){if(c[d])for(k=c[d].length;k--;)t(d,c[d][k])}))}var l,u;a.each(["protoEvents","hcEvents"],function(c){var d=r[c];d&&(g?(l=d[g]||[],e?(u=a.inArray(e,l),-1<u&&(l.splice(u,1),d[g]=l),t(g,e)):(w(d),d[g]=
[])):(w(d),r[c]={}))})};a.fireEvent=function(r,g,e,t){var w,l,u,c,d;e=e||{};F.createEvent&&(r.dispatchEvent||r.fireEvent)?(w=F.createEvent("Events"),w.initEvent(g,!0,!0),a.extend(w,e),r.dispatchEvent?r.dispatchEvent(w):r.fireEvent(g,w)):a.each(["protoEvents","hcEvents"],function(k){if(r[k])for(l=r[k][g]||[],u=l.length,e.target||a.extend(e,{preventDefault:function(){e.defaultPrevented=!0},target:r,type:g}),c=0;c<u;c++)(d=l[c])&&!1===d.call(r,e)&&e.preventDefault()});t&&!e.defaultPrevented&&t.call(r,
e)};a.animate=function(r,g,e){var t,w="",l,u,c;a.isObject(e)||(c=arguments,e={duration:c[2],easing:c[3],complete:c[4]});a.isNumber(e.duration)||(e.duration=400);e.easing="function"===typeof e.easing?e.easing:Math[e.easing]||Math.easeInOutSine;e.curAnim=a.merge(g);a.objectEach(g,function(c,k){a.stop(r,k);u=new a.Fx(r,e,k);l=null;"d"===k?(u.paths=u.initPath(r,r.d,g.d),u.toD=g.d,t=0,l=1):r.attr?t=r.attr(k):(t=parseFloat(a.getStyle(r,k))||0,"opacity"!==k&&(w="px"));l||(l=c);l&&l.match&&l.match("px")&&
(l=l.replace(/px/g,""));u.run(t,l,w)})};a.seriesType=function(r,g,e,t,w){var l=a.getOptions(),u=a.seriesTypes;l.plotOptions[r]=a.merge(l.plotOptions[g],e);u[r]=a.extendClass(u[g]||function(){},t);u[r].prototype.type=r;w&&(u[r].prototype.pointClass=a.extendClass(a.Point,w));return u[r]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),g=0;return function(){return"highcharts-"+a+"-"+g++}}();D.jQuery&&(D.jQuery.fn.highcharts=function(){var r=[].slice.call(arguments);if(this[0])return r[0]?
(new (a[a.isString(r[0])?r.shift():"Chart"])(this[0],r[0],r[1]),this):C[a.attr(this[0],"data-highcharts-chart")]})})(K);(function(a){var C=a.each,F=a.isNumber,D=a.map,r=a.merge,g=a.pInt;a.Color=function(e){if(!(this instanceof a.Color))return new a.Color(e);this.init(e)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[g(a[1]),g(a[2]),g(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
parse:function(a){return[g(a[1]),g(a[2]),g(a[3]),1]}}],names:{none:"rgba(255,255,255,0)",white:"#ffffff",black:"#000000"},init:function(e){var g,w,l,u;if((this.input=e=this.names[e&&e.toLowerCase?e.toLowerCase():""]||e)&&e.stops)this.stops=D(e.stops,function(c){return new a.Color(c[1])});else if(e&&e.charAt&&"#"===e.charAt()&&(g=e.length,e=parseInt(e.substr(1),16),7===g?w=[(e&16711680)>>16,(e&65280)>>8,e&255,1]:4===g&&(w=[(e&3840)>>4|(e&3840)>>8,(e&240)>>4|e&240,(e&15)<<4|e&15,1])),!w)for(l=this.parsers.length;l--&&
!w;)u=this.parsers[l],(g=u.regex.exec(e))&&(w=u.parse(g));this.rgba=w||[]},get:function(a){var e=this.input,g=this.rgba,l;this.stops?(l=r(e),l.stops=[].concat(l.stops),C(this.stops,function(e,c){l.stops[c]=[l.stops[c][0],e.get(a)]})):l=g&&F(g[0])?"rgb"===a||!a&&1===g[3]?"rgb("+g[0]+","+g[1]+","+g[2]+")":"a"===a?g[3]:"rgba("+g.join(",")+")":e;return l},brighten:function(a){var e,w=this.rgba;if(this.stops)C(this.stops,function(e){e.brighten(a)});else if(F(a)&&0!==a)for(e=0;3>e;e++)w[e]+=g(255*a),0>
w[e]&&(w[e]=0),255<w[e]&&(w[e]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,g){var e=this.rgba,l=a.rgba;l.length&&e&&e.length?(a=1!==l[3]||1!==e[3],g=(a?"rgba(":"rgb(")+Math.round(l[0]+(e[0]-l[0])*(1-g))+","+Math.round(l[1]+(e[1]-l[1])*(1-g))+","+Math.round(l[2]+(e[2]-l[2])*(1-g))+(a?","+(l[3]+(e[3]-l[3])*(1-g)):"")+")"):g=a.input||"none";return g}};a.color=function(e){return new a.Color(e)}})(K);(function(a){var C,F,D=a.addEvent,r=a.animate,g=a.attr,e=a.charts,
t=a.color,w=a.css,l=a.createElement,u=a.defined,c=a.deg2rad,d=a.destroyObjectProperties,k=a.doc,x=a.each,p=a.extend,f=a.erase,b=a.grep,n=a.hasTouch,z=a.inArray,J=a.isArray,q=a.isFirefox,L=a.isMS,B=a.isObject,H=a.isString,m=a.isWebKit,E=a.merge,A=a.noop,M=a.objectEach,G=a.pick,h=a.pInt,v=a.removeEvent,Q=a.stop,P=a.svg,I=a.SVG_NS,O=a.symbolSizes,N=a.win;C=a.SVGElement=function(){return this};p(C.prototype,{opacity:1,SVG_NS:I,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
init:function(a,h){this.element="span"===h?l(h):k.createElementNS(this.SVG_NS,h);this.renderer=a},animate:function(y,h,b){h=a.animObject(G(h,this.renderer.globalAnimation,!0));0!==h.duration?(b&&(h.complete=b),r(this,y,h)):(this.attr(y,null,b),h.step&&h.step.call(this));return this},complexColor:function(y,h,b){var f=this.renderer,v,c,d,m,I,p,A,n,k,R,q,z=[],P;a.fireEvent(this.renderer,"complexColor",{args:arguments},function(){y.radialGradient?c="radialGradient":y.linearGradient&&(c="linearGradient");
c&&(d=y[c],I=f.gradients,A=y.stops,R=b.radialReference,J(d)&&(y[c]=d={x1:d[0],y1:d[1],x2:d[2],y2:d[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===c&&R&&!u(d.gradientUnits)&&(m=d,d=E(d,f.getRadialAttr(R,m),{gradientUnits:"userSpaceOnUse"})),M(d,function(a,y){"id"!==y&&z.push(y,a)}),M(A,function(a){z.push(a)}),z=z.join(","),I[z]?q=I[z].attr("id"):(d.id=q=a.uniqueKey(),I[z]=p=f.createElement(c).attr(d).add(f.defs),p.radAttr=m,p.stops=[],x(A,function(y){0===y[1].indexOf("rgba")?(v=a.color(y[1]),
n=v.get("rgb"),k=v.get("a")):(n=y[1],k=1);y=f.createElement("stop").attr({offset:y[0],"stop-color":n,"stop-opacity":k}).add(p);p.stops.push(y)})),P="url("+f.url+"#"+q+")",b.setAttribute(h,P),b.gradient=z,y.toString=function(){return P})})},applyTextOutline:function(y){var h=this.element,b,v,c,d,m;-1!==y.indexOf("contrast")&&(y=y.replace(/contrast/g,this.renderer.getContrast(h.style.fill)));y=y.split(" ");v=y[y.length-1];if((c=y[0])&&"none"!==c&&a.svg){this.fakeTS=!0;y=[].slice.call(h.getElementsByTagName("tspan"));
this.ySetter=this.xSetter;c=c.replace(/(^[\d\.]+)(.*?)$/g,function(a,y,h){return 2*y+h});for(m=y.length;m--;)b=y[m],"highcharts-text-outline"===b.getAttribute("class")&&f(y,h.removeChild(b));d=h.firstChild;x(y,function(a,y){0===y&&(a.setAttribute("x",h.getAttribute("x")),y=h.getAttribute("y"),a.setAttribute("y",y||0),null===y&&h.setAttribute("y",0));a=a.cloneNode(1);g(a,{"class":"highcharts-text-outline",fill:v,stroke:v,"stroke-width":c,"stroke-linejoin":"round"});h.insertBefore(a,d)})}},attr:function(a,
h,b,c){var y,f=this.element,v,d=this,m,I;"string"===typeof a&&void 0!==h&&(y=a,a={},a[y]=h);"string"===typeof a?d=(this[a+"Getter"]||this._defaultGetter).call(this,a,f):(M(a,function(y,h){m=!1;c||Q(this,h);this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(h)&&(v||(this.symbolAttr(a),v=!0),m=!0);!this.rotation||"x"!==h&&"y"!==h||(this.doTransform=!0);m||(I=this[h+"Setter"]||this._defaultSetter,I.call(this,y,h,f),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(h)&&
this.updateShadows(h,y,I))},this),this.afterSetters());b&&b.call(this);return d},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,h,b){for(var y=this.shadows,c=y.length;c--;)b.call(y[c],"height"===a?Math.max(h-(y[c].cutHeight||0),0):"d"===a?this.d:h,a,y[c])},addClass:function(a,h){var y=this.attr("class")||"";-1===y.indexOf(a)&&(h||(a=(y+(y?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==
z(a,(this.attr("class")||"").split(" "))},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var y=this;x("x y r start end width height innerR anchorX anchorY".split(" "),function(h){y[h]=G(a[h],y[h])});y.attr({d:y.renderer.symbols[y.symbolName](y.x,y.y,y.width,y.height,y)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,h){var y;h=h||a.strokeWidth||0;y=Math.round(h)%2/2;
a.x=Math.floor(a.x||this.x||0)+y;a.y=Math.floor(a.y||this.y||0)+y;a.width=Math.floor((a.width||this.width||0)-2*y);a.height=Math.floor((a.height||this.height||0)-2*y);u(a.strokeWidth)&&(a.strokeWidth=h);return a},css:function(a){var y=this.styles,b={},c=this.element,f,v="",d,m=!y,I=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);y&&M(a,function(a,h){a!==y[h]&&(b[h]=a,m=!0)});m&&(y&&(a=p(y,b)),f=this.textWidth=a&&a.width&&"auto"!==a.width&&"text"===c.nodeName.toLowerCase()&&h(a.width),
this.styles=a,f&&!P&&this.renderer.forExport&&delete a.width,c.namespaceURI===this.SVG_NS?(d=function(a,y){return"-"+y.toLowerCase()},M(a,function(a,y){-1===z(y,I)&&(v+=y.replace(/([A-Z])/g,d)+":"+a+";")}),v&&g(c,"style",v)):w(c,a),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,h){var y=this,b=y.element;n&&"click"===a?(b.ontouchstart=
function(a){y.touchEventFired=Date.now();a.preventDefault();h.call(b,a)},b.onclick=function(a){(-1===N.navigator.userAgent.indexOf("Android")||1100<Date.now()-(y.touchEventFired||0))&&h.call(b,a)}):b["on"+a]=h;return this},setRadialReference:function(a){var y=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;y&&y.radAttr&&y.animate(this.renderer.getRadialAttr(a,y.radAttr));return this},translate:function(a,h){return this.attr({translateX:a,translateY:h})},invert:function(a){this.inverted=
a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,h=this.translateY||0,b=this.scaleX,c=this.scaleY,v=this.inverted,f=this.rotation,d=this.matrix,m=this.element;v&&(a+=this.width,h+=this.height);a=["translate("+a+","+h+")"];u(d)&&a.push("matrix("+d.join(",")+")");v?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+G(this.rotationOriginX,m.getAttribute("x"),0)+" "+G(this.rotationOriginY,m.getAttribute("y")||0)+")");(u(b)||u(c))&&a.push("scale("+G(b,1)+
" "+G(c,1)+")");a.length&&m.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,h,b){var y,c,v,d,m={};c=this.renderer;v=c.alignedObjects;var I,p;if(a){if(this.alignOptions=a,this.alignByTranslate=h,!b||H(b))this.alignTo=y=b||"renderer",f(v,this),v.push(this),b=null}else a=this.alignOptions,h=this.alignByTranslate,y=this.alignTo;b=G(b,c[y],c);y=a.align;c=a.verticalAlign;v=(b.x||0)+(a.x||0);d=(b.y||0)+(a.y||0);"right"===
y?I=1:"center"===y&&(I=2);I&&(v+=(b.width-(a.width||0))/I);m[h?"translateX":"x"]=Math.round(v);"bottom"===c?p=1:"middle"===c&&(p=2);p&&(d+=(b.height-(a.height||0))/p);m[h?"translateY":"y"]=Math.round(d);this[this.placed?"animate":"attr"](m);this.placed=!0;this.alignAttr=m;return this},getBBox:function(a,h){var y,b=this.renderer,v,f=this.element,d=this.styles,m,I=this.textStr,A,n=b.cache,k=b.cacheKeys,q;h=G(h,this.rotation);v=h*c;m=d&&d.fontSize;u(I)&&(q=I.toString(),-1===q.indexOf("\x3c")&&(q=q.replace(/[0-9]/g,
"0")),q+=["",h||0,m,this.textWidth,d&&d.textOverflow].join());q&&!a&&(y=n[q]);if(!y){if(f.namespaceURI===this.SVG_NS||b.forExport){try{(A=this.fakeTS&&function(a){x(f.querySelectorAll(".highcharts-text-outline"),function(y){y.style.display=a})})&&A("none"),y=f.getBBox?p({},f.getBBox()):{width:f.offsetWidth,height:f.offsetHeight},A&&A("")}catch(W){}if(!y||0>y.width)y={width:0,height:0}}else y=this.htmlGetBBox();b.isSVG&&(a=y.width,b=y.height,d&&"11px"===d.fontSize&&17===Math.round(b)&&(y.height=b=
14),h&&(y.width=Math.abs(b*Math.sin(v))+Math.abs(a*Math.cos(v)),y.height=Math.abs(b*Math.cos(v))+Math.abs(a*Math.sin(v))));if(q&&0<y.height){for(;250<k.length;)delete n[k.shift()];n[q]||k.push(q);n[q]=y}}return y},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var y=this;y.animate({opacity:0},{duration:a||150,complete:function(){y.attr({y:-9999})}})},add:function(a){var y=this.renderer,h=this.element,
b;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&y.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)b=this.zIndexSetter();b||(a?a.element:y.box).appendChild(h);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var y=a.parentNode;y&&y.removeChild(a)},destroy:function(){var a=this,h=a.element||{},b=a.renderer.isSVG&&"SPAN"===h.nodeName&&a.parentGroup,c=h.ownerSVGElement,v=a.clipPath;h.onclick=h.onmouseout=h.onmouseover=h.onmousemove=h.point=
null;Q(a);v&&c&&(x(c.querySelectorAll("[clip-path],[CLIP-PATH]"),function(a){var h=a.getAttribute("clip-path"),y=v.element.id;(-1<h.indexOf("(#"+y+")")||-1<h.indexOf('("#'+y+'")'))&&a.removeAttribute("clip-path")}),a.clipPath=v.destroy());if(a.stops){for(c=0;c<a.stops.length;c++)a.stops[c]=a.stops[c].destroy();a.stops=null}a.safeRemoveChild(h);for(a.destroyShadows();b&&b.div&&0===b.div.childNodes.length;)h=b.parentGroup,a.safeRemoveChild(b.div),delete b.div,b=h;a.alignTo&&f(a.renderer.alignedObjects,
a);M(a,function(h,y){delete a[y]});return null},shadow:function(a,h,b){var y=[],c,v,f=this.element,d,m,I,p;if(!a)this.destroyShadows();else if(!this.shadows){m=G(a.width,3);I=(a.opacity||.15)/m;p=this.parentInverted?"(-1,-1)":"("+G(a.offsetX,1)+", "+G(a.offsetY,1)+")";for(c=1;c<=m;c++)v=f.cloneNode(0),d=2*m+1-2*c,g(v,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":I*c,"stroke-width":d,transform:"translate"+p,fill:"none"}),b&&(g(v,"height",Math.max(g(v,"height")-d,0)),v.cutHeight=d),h?
h.element.appendChild(v):f.parentNode&&f.parentNode.insertBefore(v,f),y.push(v);this.shadows=y}return this},destroyShadows:function(){x(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=G(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,
h,b){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[h]!==a&&(b.setAttribute(h,a),this[h]=a)},dashstyleSetter:function(a){var b,y=this["stroke-width"];"inherit"===y&&(y=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=a.length;b--;)a[b]=h(a[b])*y;a=a.join(",").replace(/NaN/g,
"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.alignValue=a;this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,h,b){this[h]=a;b.setAttribute(h,a)},titleSetter:function(a){var h=this.element.getElementsByTagName("title")[0];h||(h=k.createElementNS(this.SVG_NS,"title"),this.element.appendChild(h));h.firstChild&&h.removeChild(h.firstChild);h.appendChild(k.createTextNode(String(G(a),"").replace(/<[^>]*>/g,
"").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,h,b){"string"===typeof a?b.setAttribute(h,a):a&&this.complexColor(a,h,b)},visibilitySetter:function(a,h,b){"inherit"===a?b.removeAttribute(h):this[h]!==a&&b.setAttribute(h,a);this[h]=a},zIndexSetter:function(a,b){var c=this.renderer,v=this.parentGroup,y=(v||c).element||c.box,f,d=this.element,m,I,c=y===c.box;
f=this.added;var p;u(a)&&(d.zIndex=a,a=+a,this[b]===a&&(f=!1),this[b]=a);if(f){(a=this.zIndex)&&v&&(v.handleZ=!0);b=y.childNodes;for(p=b.length-1;0<=p&&!m;p--)if(v=b[p],f=v.zIndex,I=!u(f),v!==d)if(0>a&&I&&!c&&!p)y.insertBefore(d,b[p]),m=!0;else if(h(f)<=a||I&&(!u(a)||0<=a))y.insertBefore(d,b[p+1]||null),m=!0;m||(y.insertBefore(d,b[c?3:0]||null),m=!0)}return m},_defaultSetter:function(a,h,b){b.setAttribute(h,a)}});C.prototype.yGetter=C.prototype.xGetter;C.prototype.translateXSetter=C.prototype.translateYSetter=
C.prototype.rotationSetter=C.prototype.verticalAlignSetter=C.prototype.rotationOriginXSetter=C.prototype.rotationOriginYSetter=C.prototype.scaleXSetter=C.prototype.scaleYSetter=C.prototype.matrixSetter=function(a,h){this[h]=a;this.doTransform=!0};C.prototype["stroke-widthSetter"]=C.prototype.strokeSetter=function(a,h,b){this[h]=a;this.stroke&&this["stroke-width"]?(C.prototype.fillSetter.call(this,this.stroke,"stroke",b),b.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===
h&&0===a&&this.hasStroke&&(b.removeAttribute("stroke"),this.hasStroke=!1)};F=a.SVGRenderer=function(){this.init.apply(this,arguments)};p(F.prototype,{Element:C,SVG_NS:I,init:function(a,h,b,c,v,f){var y;c=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(c));y=c.element;a.appendChild(y);g(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&g(y,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=y;this.boxWrapper=c;this.alignedObjects=[];this.url=(q||m)&&k.getElementsByTagName("base").length?
N.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(k.createTextNode("Created with Highcharts 6.1.0"));this.defs=this.createElement("defs").add();this.allowHTML=f;this.forExport=v;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(h,b,!1);var d;q&&a.getBoundingClientRect&&(h=function(){w(a,{left:0,top:0});d=a.getBoundingClientRect();w(a,{left:Math.ceil(d.left)-
d.left+"px",top:Math.ceil(d.top)-d.top+"px"})},h(),this.unSubPixelFix=D(N,"resize",h))},getStyle:function(a){return this.style=p({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();d(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());
this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var h=new this.Element;h.init(this,a);return h},draw:A,getRadialAttr:function(a,h){return{cx:a[0]-a[2]/2+h.cx*a[2],cy:a[1]-a[2]/2+h.cy*a[2],r:h.r*a[2]}},getSpanWidth:function(a){return a.getBBox(!0).width},applyEllipsis:function(a,h,b,c){var v=a.rotation,f=b,d,y=0,m=b.length,I=function(a){h.removeChild(h.firstChild);a&&h.appendChild(k.createTextNode(a))},p;a.rotation=0;f=this.getSpanWidth(a,h);if(p=
f>c){for(;y<=m;)d=Math.ceil((y+m)/2),f=b.substring(0,d)+"\u2026",I(f),f=this.getSpanWidth(a,h),y===m?y=m+1:f>c?m=d-1:y=d;0===m&&I("")}a.rotation=v;return p},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot;"},buildText:function(a){var c=a.element,v=this,f=v.forExport,d=G(a.textStr,"").toString(),y=-1!==d.indexOf("\x3c"),m=c.childNodes,p,A=g(c,"x"),n=a.styles,q=a.textWidth,E=n&&n.lineHeight,e=n&&n.textOutline,B=n&&"ellipsis"===n.textOverflow,Q=n&&"nowrap"===
n.whiteSpace,u=n&&n.fontSize,l,O,H=m.length,n=q&&!a.added&&this.box,J=function(a){var b;b=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:u||v.style.fontSize||12;return E?h(E):v.fontMetrics(b,a.getAttribute("style")?a:c).h},N=function(a,h){M(v.escapes,function(b,c){h&&-1!==z(b,h)||(a=a.toString().replace(new RegExp(b,"g"),c))});return a},t=function(a,h){var b;b=a.indexOf("\x3c");a=a.substring(b,a.indexOf("\x3e")-b);b=a.indexOf(h+"\x3d");if(-1!==b&&(b=b+h.length+1,h=a.charAt(b),'"'===h||"'"===
h))return a=a.substring(b+1),a.substring(0,a.indexOf(h))};l=[d,B,Q,E,e,u,q].join();if(l!==a.textCache){for(a.textCache=l;H--;)c.removeChild(m[H]);y||e||B||q||-1!==d.indexOf(" ")?(n&&n.appendChild(c),d=y?d.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[d],d=b(d,function(a){return""!==a}),x(d,function(h,b){var d,y=0;h=h.replace(/^\s+|\s+$/g,
"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");d=h.split("|||");x(d,function(h){if(""!==h||1===d.length){var m={},n=k.createElementNS(v.SVG_NS,"tspan"),E,z;(E=t(h,"class"))&&g(n,"class",E);if(E=t(h,"style"))E=E.replace(/(;| |^)color([ :])/,"$1fill$2"),g(n,"style",E);(z=t(h,"href"))&&!f&&(g(n,"onclick",'location.href\x3d"'+z+'"'),g(n,"class","highcharts-anchor"),w(n,{cursor:"pointer"}));h=N(h.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==h){n.appendChild(k.createTextNode(h));
y?m.dx=0:b&&null!==A&&(m.x=A);g(n,m);c.appendChild(n);!y&&O&&(!P&&f&&w(n,{display:"block"}),g(n,"dy",J(n)));if(q){m=h.replace(/([^\^])-/g,"$1- ").split(" ");z=1<d.length||b||1<m.length&&!Q;var e=[],x,G=J(n),u=a.rotation;for(B&&(p=v.applyEllipsis(a,n,h,q));!B&&z&&(m.length||e.length);)a.rotation=0,x=v.getSpanWidth(a,n),h=x>q,void 0===p&&(p=h),h&&1!==m.length?(n.removeChild(n.firstChild),e.unshift(m.pop())):(m=e,e=[],m.length&&!Q&&(n=k.createElementNS(I,"tspan"),g(n,{dy:G,x:A}),E&&g(n,"style",E),c.appendChild(n)),
x>q&&(q=x)),m.length&&n.appendChild(k.createTextNode(m.join(" ").replace(/- /g,"-")));a.rotation=u}y++}}});O=O||c.childNodes.length}),p&&a.attr("title",N(a.textStr,["\x26lt;","\x26gt;"])),n&&n.removeChild(c),e&&a.applyTextOutline&&a.applyTextOutline(e)):c.appendChild(k.createTextNode(N(d)))}},getContrast:function(a){a=t(a).rgba;return 510<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,h,b,c,v,f,d,m,I){var y=this.label(a,h,b,I,null,null,null,null,"button"),n=0;y.attr(E({padding:8,r:2},v));var A,
k,q,z;v=E({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},v);A=v.style;delete v.style;f=E(v,{fill:"#e6e6e6"},f);k=f.style;delete f.style;d=E(v,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},d);q=d.style;delete d.style;m=E(v,{style:{color:"#cccccc"}},m);z=m.style;delete m.style;D(y.element,L?"mouseover":"mouseenter",function(){3!==n&&y.setState(1)});D(y.element,L?"mouseout":"mouseleave",function(){3!==n&&y.setState(n)});y.setState=
function(a){1!==a&&(y.state=n=a);y.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);y.attr([v,f,d,m][a||0]).css([A,k,q,z][a||0])};y.attr(v).css(p({cursor:"default"},A));return y.on("click",function(a){3!==n&&c.call(y,a)})},crispLine:function(a,h){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-h%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+h%2/2);return a},path:function(a){var h={fill:"none"};J(a)?h.d=a:B(a)&&p(h,
a);return this.createElement("path").attr(h)},circle:function(a,h,b){a=B(a)?a:{x:a,y:h,r:b};h=this.createElement("circle");h.xSetter=h.ySetter=function(a,h,b){b.setAttribute("c"+h,a)};return h.attr(a)},arc:function(a,h,b,c,v,f){B(a)?(c=a,h=c.y,b=c.r,a=c.x):c={innerR:c,start:v,end:f};a=this.symbol("arc",a,h,b,b,c);a.r=b;return a},rect:function(a,h,b,c,v,f){v=B(a)?a.r:v;var d=this.createElement("rect");a=B(a)?a:void 0===a?{}:{x:a,y:h,width:Math.max(b,0),height:Math.max(c,0)};void 0!==f&&(a.strokeWidth=
f,a=d.crisp(a));a.fill="none";v&&(a.r=v);d.rSetter=function(a,h,b){g(b,{rx:a,ry:a})};return d.attr(a)},setSize:function(a,h,b){var c=this.alignedObjects,v=c.length;this.width=a;this.height=h;for(this.boxWrapper.animate({width:a,height:h},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:G(b,!0)?void 0:0});v--;)c[v].align()},g:function(a){var h=this.createElement("g");return a?h.attr({"class":"highcharts-"+a}):h},image:function(a,h,b,c,v,f){var d={preserveAspectRatio:"none"},
m,I=function(a,h){a.setAttributeNS?a.setAttributeNS("http://www.w3.org/1999/xlink","href",h):a.setAttribute("hc-svg-href",h)};1<arguments.length&&p(d,{x:h,y:b,width:c,height:v});m=this.createElement("image").attr(d);f?(I(m.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"),d=new N.Image,D(d,"load",function(h){I(m.element,a);f.call(m,h)}),d.src=a):I(m.element,a);return m},symbol:function(a,h,b,c,v,f){var d=this,m,I=/^url\((.*?)\)$/,n=I.test(a),y=!n&&(this.symbols[a]?
a:"circle"),A=y&&this.symbols[y],q=u(h)&&A&&A.call(this.symbols,Math.round(h),Math.round(b),c,v,f),E,z;A?(m=this.path(q),m.attr("fill","none"),p(m,{symbolName:y,x:h,y:b,width:c,height:v}),f&&p(m,f)):n&&(E=a.match(I)[1],m=this.image(E),m.imgwidth=G(O[E]&&O[E].width,f&&f.width),m.imgheight=G(O[E]&&O[E].height,f&&f.height),z=function(){m.attr({width:m.width,height:m.height})},x(["width","height"],function(a){m[a+"Setter"]=function(a,h){var b={},c=this["img"+h],v="width"===h?"translateX":"translateY";
this[h]=a;u(c)&&(this.element&&this.element.setAttribute(h,c),this.alignByTranslate||(b[v]=((this[h]||0)-c)/2,this.attr(b)))}}),u(h)&&m.attr({x:h,y:b}),m.isImg=!0,u(m.imgwidth)&&u(m.imgheight)?z():(m.attr({width:0,height:0}),l("img",{onload:function(){var a=e[d.chartIndex];0===this.width&&(w(this,{position:"absolute",top:"-999em"}),k.body.appendChild(this));O[E]={width:this.width,height:this.height};m.imgwidth=this.width;m.imgheight=this.height;m.element&&z();this.parentNode&&this.parentNode.removeChild(this);
d.imgCount--;if(!d.imgCount&&a&&a.onload)a.onload()},src:E}),this.imgCount++));return m},symbols:{circle:function(a,h,b,c){return this.arc(a+b/2,h+c/2,b/2,c/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,h,b,c){return["M",a,h,"L",a+b,h,a+b,h+c,a,h+c,"Z"]},triangle:function(a,h,b,c){return["M",a+b/2,h,"L",a+b,h+c,a,h+c,"Z"]},"triangle-down":function(a,h,b,c){return["M",a,h,"L",a+b,h,a+b/2,h+c,"Z"]},diamond:function(a,h,b,c){return["M",a+b/2,h,"L",a+b,h+c/2,a+b/2,h+c,a,h+c/2,"Z"]},arc:function(a,
h,b,c,v){var f=v.start,d=v.r||b,m=v.r||c||b,I=v.end-.001;b=v.innerR;c=G(v.open,.001>Math.abs(v.end-v.start-2*Math.PI));var n=Math.cos(f),p=Math.sin(f),y=Math.cos(I),I=Math.sin(I);v=.001>v.end-f-Math.PI?0:1;d=["M",a+d*n,h+m*p,"A",d,m,0,v,1,a+d*y,h+m*I];u(b)&&d.push(c?"M":"L",a+b*y,h+b*I,"A",b,b,0,v,0,a+b*n,h+b*p);d.push(c?"":"Z");return d},callout:function(a,h,b,c,v){var f=Math.min(v&&v.r||0,b,c),d=f+6,m=v&&v.anchorX;v=v&&v.anchorY;var I;I=["M",a+f,h,"L",a+b-f,h,"C",a+b,h,a+b,h,a+b,h+f,"L",a+b,h+c-
f,"C",a+b,h+c,a+b,h+c,a+b-f,h+c,"L",a+f,h+c,"C",a,h+c,a,h+c,a,h+c-f,"L",a,h+f,"C",a,h,a,h,a+f,h];m&&m>b?v>h+d&&v<h+c-d?I.splice(13,3,"L",a+b,v-6,a+b+6,v,a+b,v+6,a+b,h+c-f):I.splice(13,3,"L",a+b,c/2,m,v,a+b,c/2,a+b,h+c-f):m&&0>m?v>h+d&&v<h+c-d?I.splice(33,3,"L",a,v+6,a-6,v,a,v-6,a,h+f):I.splice(33,3,"L",a,c/2,m,v,a,c/2,a,h+f):v&&v>c&&m>a+d&&m<a+b-d?I.splice(23,3,"L",m+6,h+c,m,h+c+6,m-6,h+c,a+f,h+c):v&&0>v&&m>a+d&&m<a+b-d&&I.splice(3,3,"L",m-6,h,m,h-6,m+6,h,b-f,h);return I}},clipRect:function(h,b,c,
v){var f=a.uniqueKey(),d=this.createElement("clipPath").attr({id:f}).add(this.defs);h=this.rect(h,b,c,v,0).add(d);h.id=f;h.clipPath=d;h.count=0;return h},text:function(a,h,b,c){var v={};if(c&&(this.allowHTML||!this.forExport))return this.html(a,h,b);v.x=Math.round(h||0);b&&(v.y=Math.round(b));if(a||0===a)v.text=a;a=this.createElement("text").attr(v);c||(a.xSetter=function(a,h,b){var c=b.getElementsByTagName("tspan"),v,f=b.getAttribute(h),d;for(d=0;d<c.length;d++)v=c[d],v.getAttribute(h)===f&&v.setAttribute(h,
a);b.setAttribute(h,a)});return a},fontMetrics:function(a,b){a=a||b&&b.style&&b.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?h(a):/em/.test(a)?parseFloat(a)*(b?this.fontMetrics(null,b.parentNode).f:16):12;b=24>a?a+3:Math.round(1.2*a);return{h:b,b:Math.round(.8*b),f:a}},rotCorr:function(a,h,b){var v=a;h&&b&&(v=Math.max(v*Math.cos(h*c),4));return{x:-a/3*Math.sin(h*c),y:v}},label:function(h,b,c,f,d,m,I,n,A){var k=this,q=k.g("button"!==A&&"label"),z=q.text=k.text("",0,0,I).attr({zIndex:1}),
y,e,P=0,B=3,Q=0,g,G,l,O,H,J={},M,N,w=/^url\((.*?)\)$/.test(f),t=w,L,r,R,U;A&&q.addClass("highcharts-"+A);t=w;L=function(){return(M||0)%2/2};r=function(){var a=z.element.style,h={};e=(void 0===g||void 0===G||H)&&u(z.textStr)&&z.getBBox();q.width=(g||e.width||0)+2*B+Q;q.height=(G||e.height||0)+2*B;N=B+k.fontMetrics(a&&a.fontSize,z).b;t&&(y||(q.box=y=k.symbols[f]||w?k.symbol(f):k.rect(),y.addClass(("button"===A?"":"highcharts-label-box")+(A?" highcharts-"+A+"-box":"")),y.add(q),a=L(),h.x=a,h.y=(n?-N:
0)+a),h.width=Math.round(q.width),h.height=Math.round(q.height),y.attr(p(h,J)),J={})};R=function(){var a=Q+B,h;h=n?0:N;u(g)&&e&&("center"===H||"right"===H)&&(a+={center:.5,right:1}[H]*(g-e.width));if(a!==z.x||h!==z.y)z.attr("x",a),void 0!==h&&z.attr("y",h);z.x=a;z.y=h};U=function(a,h){y?y.attr(a,h):J[a]=h};q.onAdd=function(){z.add(q);q.attr({text:h||0===h?h:"",x:b,y:c});y&&u(d)&&q.attr({anchorX:d,anchorY:m})};q.widthSetter=function(h){g=a.isNumber(h)?h:null};q.heightSetter=function(a){G=a};q["text-alignSetter"]=
function(a){H=a};q.paddingSetter=function(a){u(a)&&a!==B&&(B=q.padding=a,R())};q.paddingLeftSetter=function(a){u(a)&&a!==Q&&(Q=a,R())};q.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==P&&(P=a,e&&q.attr({x:l}))};q.textSetter=function(a){void 0!==a&&z.textSetter(a);r();R()};q["stroke-widthSetter"]=function(a,h){a&&(t=!0);M=this["stroke-width"]=a;U(h,a)};q.strokeSetter=q.fillSetter=q.rSetter=function(a,h){"r"!==h&&("fill"===h&&a&&(t=!0),q[h]=a);U(h,a)};q.anchorXSetter=function(a,h){d=q.anchorX=
a;U(h,Math.round(a)-L()-l)};q.anchorYSetter=function(a,h){m=q.anchorY=a;U(h,a-O)};q.xSetter=function(a){q.x=a;P&&(a-=P*((g||e.width)+2*B),q["forceAnimate:x"]=!0);l=Math.round(a);q.attr("translateX",l)};q.ySetter=function(a){O=q.y=Math.round(a);q.attr("translateY",O)};var S=q.css;return p(q,{css:function(a){if(a){var h={};a=E(a);x(q.textProps,function(b){void 0!==a[b]&&(h[b]=a[b],delete a[b])});z.css(h);"width"in h&&r()}return S.call(q,a)},getBBox:function(){return{width:e.width+2*B,height:e.height+
2*B,x:e.x-B,y:e.y-B}},shadow:function(a){a&&(r(),y&&y.shadow(a));return q},destroy:function(){v(q.element,"mouseenter");v(q.element,"mouseleave");z&&(z=z.destroy());y&&(y=y.destroy());C.prototype.destroy.call(q);q=k=r=R=U=null}})}});a.Renderer=F})(K);(function(a){var C=a.attr,F=a.createElement,D=a.css,r=a.defined,g=a.each,e=a.extend,t=a.isFirefox,w=a.isMS,l=a.isWebKit,u=a.pick,c=a.pInt,d=a.SVGRenderer,k=a.win,x=a.wrap;e(a.SVGElement.prototype,{htmlCss:function(a){var c=this.element;if(c=a&&"SPAN"===
c.tagName&&a.width)delete a.width,this.textWidth=c,this.htmlUpdateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=e(this.styles,a);D(this.element,a);return this},htmlGetBBox:function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,f=this.element,b=this.translateX||0,d=this.translateY||0,k=this.x||0,e=this.y||0,q=this.textAlign||
"left",x={left:0,center:.5,right:1}[q],B=this.styles,l=B&&B.whiteSpace;D(f,{marginLeft:b,marginTop:d});this.shadows&&g(this.shadows,function(a){D(a,{marginLeft:b+1,marginTop:d+1})});this.inverted&&g(f.childNodes,function(b){a.invertChild(b,f)});if("SPAN"===f.tagName){var B=this.rotation,m=this.textWidth&&c(this.textWidth),E=[B,q,f.innerHTML,this.textWidth,this.textAlign].join(),A;(A=m!==this.oldTextWidth)&&!(A=m>this.oldTextWidth)&&((A=this.textPxLength)||(D(f,{width:"",whiteSpace:l||"nowrap"}),A=
f.offsetWidth),A=A>m);A&&/[ \-]/.test(f.textContent||f.innerText)&&(D(f,{width:m+"px",display:"block",whiteSpace:l||"normal"}),this.oldTextWidth=m);E!==this.cTT&&(l=a.fontMetrics(f.style.fontSize).b,r(B)&&B!==(this.oldRotation||0)&&this.setSpanRotation(B,x,l),this.getSpanCorrection(!r(B)&&this.textPxLength||f.offsetWidth,l,x,B,q));D(f,{left:k+(this.xCorr||0)+"px",top:e+(this.yCorr||0)+"px"});this.cTT=E;this.oldRotation=B}}else this.alignOnAdd=!0},setSpanRotation:function(a,c,b){var f={},d=this.renderer.getTransformKey();
f[d]=f.transform="rotate("+a+"deg)";f[d+(t?"Origin":"-origin")]=f.transformOrigin=100*c+"% "+b+"px";D(this.element,f)},getSpanCorrection:function(a,c,b){this.xCorr=-a*b;this.yCorr=-c}});e(d.prototype,{getTransformKey:function(){return w&&!/Edge/.test(k.navigator.userAgent)?"-ms-transform":l?"-webkit-transform":t?"MozTransform":k.opera?"-o-transform":""},html:function(a,c,b){var f=this.createElement("span"),d=f.element,p=f.renderer,q=p.isSVG,k=function(a,b){g(["opacity","visibility"],function(c){x(a,
c+"Setter",function(a,c,f,d){a.call(this,c,f,d);b[f]=c})});a.addedSetters=!0};f.textSetter=function(a){a!==d.innerHTML&&delete this.bBox;this.textStr=a;d.innerHTML=u(a,"");f.doTransform=!0};q&&k(f,f.element.style);f.xSetter=f.ySetter=f.alignSetter=f.rotationSetter=function(a,b){"align"===b&&(b="textAlign");f[b]=a;f.doTransform=!0};f.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};f.attr({text:a,x:Math.round(c),y:Math.round(b)}).css({fontFamily:this.style.fontFamily,
fontSize:this.style.fontSize,position:"absolute"});d.style.whiteSpace="nowrap";f.css=f.htmlCss;q&&(f.add=function(a){var b,c=p.box.parentNode,q=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)q.push(a),a=a.parentGroup;g(q.reverse(),function(a){function d(h,b){a[b]=h;"translateX"===b?m.left=h+"px":m.top=h+"px";a.doTransform=!0}var m,h=C(a.element,"class");h&&(h={className:h});b=a.div=a.div||F("div",h,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,
pointerEvents:a.styles&&a.styles.pointerEvents},b||c);m=b.style;e(a,{classSetter:function(a){return function(h){this.element.setAttribute("class",h);a.className=h}}(b),on:function(){q[0].div&&f.on.apply({element:q[0].div},arguments);return a},translateXSetter:d,translateYSetter:d});a.addedSetters||k(a,m)})}}else b=c;b.appendChild(d);f.added=!0;f.alignOnAdd&&f.htmlUpdateTransform();return f});return f}})})(K);(function(a){var C=a.defined,F=a.each,D=a.extend,r=a.merge,g=a.pick,e=a.timeUnits,t=a.win;
a.Time=function(a){this.update(a,!1)};a.Time.prototype={defaultOptions:{},update:function(e){var l=g(e&&e.useUTC,!0),u=this;this.options=e=r(!0,this.options||{},e);this.Date=e.Date||t.Date;this.timezoneOffset=(this.useUTC=l)&&e.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();(this.variableTimezone=!(l&&!e.getTimezoneOffset&&!e.timezone))||this.timezoneOffset?(this.get=function(a,d){var c=d.getTime(),e=c-u.getTimezoneOffset(d);d.setTime(e);a=d["getUTC"+a]();d.setTime(c);return a},
this.set=function(c,d,k){var e;if(-1!==a.inArray(c,["Milliseconds","Seconds","Minutes"]))d["set"+c](k);else e=u.getTimezoneOffset(d),e=d.getTime()-e,d.setTime(e),d["setUTC"+c](k),c=u.getTimezoneOffset(d),e=d.getTime()+c,d.setTime(e)}):l?(this.get=function(a,d){return d["getUTC"+a]()},this.set=function(a,d,k){return d["setUTC"+a](k)}):(this.get=function(a,d){return d["get"+a]()},this.set=function(a,d,k){return d["set"+a](k)})},makeTime:function(e,l,u,c,d,k){var x,p,f;this.useUTC?(x=this.Date.UTC.apply(0,
arguments),p=this.getTimezoneOffset(x),x+=p,f=this.getTimezoneOffset(x),p!==f?x+=f-p:p-36E5!==this.getTimezoneOffset(x-36E5)||a.isSafari||(x-=36E5)):x=(new this.Date(e,l,g(u,1),g(c,0),g(d,0),g(k,0))).getTime();return x},timezoneOffsetFunction:function(){var e=this,g=this.options,u=t.moment;if(!this.useUTC)return function(a){return 6E4*(new Date(a)).getTimezoneOffset()};if(g.timezone){if(u)return function(a){return 6E4*-u.tz(a,g.timezone).utcOffset()};a.error(25)}return this.useUTC&&g.getTimezoneOffset?
function(a){return 6E4*g.getTimezoneOffset(a)}:function(){return 6E4*(e.timezoneOffset||0)}},dateFormat:function(e,g,u){if(!a.defined(g)||isNaN(g))return a.defaultOptions.lang.invalidDate||"";e=a.pick(e,"%Y-%m-%d %H:%M:%S");var c=this,d=new this.Date(g),k=this.get("Hours",d),x=this.get("Day",d),p=this.get("Date",d),f=this.get("Month",d),b=this.get("FullYear",d),n=a.defaultOptions.lang,z=n.weekdays,l=n.shortWeekdays,q=a.pad,d=a.extend({a:l?l[x]:z[x].substr(0,3),A:z[x],d:q(p),e:q(p,2," "),w:x,b:n.shortMonths[f],
B:n.months[f],m:q(f+1),y:b.toString().substr(2,2),Y:b,H:q(k),k:k,I:q(k%12||12),l:k%12||12,M:q(c.get("Minutes",d)),p:12>k?"AM":"PM",P:12>k?"am":"pm",S:q(d.getSeconds()),L:q(Math.round(g%1E3),3)},a.dateFormats);a.objectEach(d,function(a,b){for(;-1!==e.indexOf("%"+b);)e=e.replace("%"+b,"function"===typeof a?a.call(c,g):a)});return u?e.substr(0,1).toUpperCase()+e.substr(1):e},getTimeTicks:function(a,l,u,c){var d=this,k=[],x={},p,f=new d.Date(l),b=a.unitRange,n=a.count||1,z;if(C(l)){d.set("Milliseconds",
f,b>=e.second?0:n*Math.floor(d.get("Milliseconds",f)/n));b>=e.second&&d.set("Seconds",f,b>=e.minute?0:n*Math.floor(d.get("Seconds",f)/n));b>=e.minute&&d.set("Minutes",f,b>=e.hour?0:n*Math.floor(d.get("Minutes",f)/n));b>=e.hour&&d.set("Hours",f,b>=e.day?0:n*Math.floor(d.get("Hours",f)/n));b>=e.day&&d.set("Date",f,b>=e.month?1:n*Math.floor(d.get("Date",f)/n));b>=e.month&&(d.set("Month",f,b>=e.year?0:n*Math.floor(d.get("Month",f)/n)),p=d.get("FullYear",f));b>=e.year&&d.set("FullYear",f,p-p%n);b===e.week&&
d.set("Date",f,d.get("Date",f)-d.get("Day",f)+g(c,1));p=d.get("FullYear",f);c=d.get("Month",f);var J=d.get("Date",f),q=d.get("Hours",f);l=f.getTime();d.variableTimezone&&(z=u-l>4*e.month||d.getTimezoneOffset(l)!==d.getTimezoneOffset(u));f=f.getTime();for(l=1;f<u;)k.push(f),f=b===e.year?d.makeTime(p+l*n,0):b===e.month?d.makeTime(p,c+l*n):!z||b!==e.day&&b!==e.week?z&&b===e.hour&&1<n?d.makeTime(p,c,J,q+l*n):f+b*n:d.makeTime(p,c,J+l*n*(b===e.day?1:7)),l++;k.push(f);b<=e.hour&&1E4>k.length&&F(k,function(a){0===
a%18E5&&"000000000"===d.dateFormat("%H%M%S%L",a)&&(x[a]="day")})}k.info=D(a,{higherRanks:x,totalRange:b*n});return k}}})(K);(function(a){var C=a.color,F=a.merge;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:a.Time.prototype.defaultOptions,chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},
title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},
itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",
minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:C("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,style:{color:"#333333",cursor:"default",
fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(C){a.defaultOptions=F(!0,a.defaultOptions,C);a.time.update(F(a.defaultOptions.global,a.defaultOptions.time),!1);return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;
a.time=new a.Time(F(a.defaultOptions.global,a.defaultOptions.time));a.dateFormat=function(C,r,g){return a.time.dateFormat(C,r,g)}})(K);(function(a){var C=a.correctFloat,F=a.defined,D=a.destroyObjectProperties,r=a.fireEvent,g=a.isNumber,e=a.merge,t=a.pick,w=a.deg2rad;a.Tick=function(a,e,c,d){this.axis=a;this.pos=e;this.type=c||"";this.isNewLabel=this.isNew=!0;c||d||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,g=a.options,c=a.chart,d=a.categories,k=a.names,x=this.pos,p=g.labels,
f=a.tickPositions,b=x===f[0],n=x===f[f.length-1],k=d?t(d[x],k[x],x):x,d=this.label,f=f.info,z;a.isDatetimeAxis&&f&&(z=g.dateTimeLabelFormats[f.higherRanks[x]||f.unitName]);this.isFirst=b;this.isLast=n;g=a.labelFormatter.call({axis:a,chart:c,isFirst:b,isLast:n,dateTimeLabelFormat:z,value:a.isLog?C(a.lin2log(k)):k,pos:x});if(F(d))d&&d.attr({text:g});else{if(this.label=d=F(g)&&p.enabled?c.renderer.text(g,0,0,p.useHTML).css(e(p.style)).add(a.labelGroup):null)d.textPxLength=d.getBBox().width;this.rotation=
0}},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var e=this.axis,c=e.options.labels,d=a.x,k=e.chart.chartWidth,g=e.chart.spacing,p=t(e.labelLeft,Math.min(e.pos,g[3])),g=t(e.labelRight,Math.max(e.isRadial?0:e.pos+e.len,k-g[1])),f=this.label,b=this.rotation,n={left:0,center:.5,right:1}[e.labelAlign||f.attr("align")],z=f.getBBox().width,l=e.getSlotWidth(),q=l,L=1,B,H={};if(b||!1===c.overflow)0>b&&d-n*z<p?B=Math.round(d/
Math.cos(b*w)-p):0<b&&d+n*z>g&&(B=Math.round((k-d)/Math.cos(b*w)));else if(k=d+(1-n)*z,d-n*z<p?q=a.x+q*(1-n)-p:k>g&&(q=g-a.x+q*n,L=-1),q=Math.min(l,q),q<l&&"center"===e.labelAlign&&(a.x+=L*(l-q-n*(l-Math.min(z,q)))),z>q||e.autoRotation&&(f.styles||{}).width)B=q;B&&(H.width=B,(c.style||{}).textOverflow||(H.textOverflow="ellipsis"),f.css(H))},getPosition:function(e,g,c,d){var k=this.axis,x=k.chart,p=d&&x.oldChartHeight||x.chartHeight;e={x:e?a.correctFloat(k.translate(g+c,null,null,d)+k.transB):k.left+
k.offset+(k.opposite?(d&&x.oldChartWidth||x.chartWidth)-k.right-k.left:0),y:e?p-k.bottom+k.offset-(k.opposite?k.height:0):a.correctFloat(p-k.translate(g+c,null,null,d)-k.transB)};r(this,"afterGetPosition",{pos:e});return e},getLabelPosition:function(a,e,c,d,k,g,p,f){var b=this.axis,n=b.transA,z=b.reversed,x=b.staggerLines,q=b.tickRotCorr||{x:0,y:0},l=k.y,B=d||b.reserveSpaceDefault?0:-b.labelOffset*("center"===b.labelAlign?.5:1),u={};F(l)||(l=0===b.side?c.rotation?-8:-c.getBBox().height:2===b.side?
q.y+8:Math.cos(c.rotation*w)*(q.y-c.getBBox(!1,0).height/2));a=a+k.x+B+q.x-(g&&d?g*n*(z?-1:1):0);e=e+l-(g&&!d?g*n*(z?1:-1):0);x&&(c=p/(f||1)%x,b.opposite&&(c=x-c-1),e+=b.labelOffset/x*c);u.x=a;u.y=Math.round(e);r(this,"afterGetLabelPosition",{pos:u});return u},getMarkPath:function(a,e,c,d,k,g){return g.crispLine(["M",a,e,"L",a+(k?0:-c),e+(k?c:0)],d)},renderGridLine:function(a,e,c){var d=this.axis,k=d.options,g=this.gridLine,p={},f=this.pos,b=this.type,n=d.tickmarkOffset,z=d.chart.renderer,l=b?b+"Grid":
"grid",q=k[l+"LineWidth"],u=k[l+"LineColor"],k=k[l+"LineDashStyle"];g||(p.stroke=u,p["stroke-width"]=q,k&&(p.dashstyle=k),b||(p.zIndex=1),a&&(p.opacity=0),this.gridLine=g=z.path().attr(p).addClass("highcharts-"+(b?b+"-":"")+"grid-line").add(d.gridGroup));if(!a&&g&&(a=d.getPlotLinePath(f+n,g.strokeWidth()*c,a,!0)))g[this.isNew?"attr":"animate"]({d:a,opacity:e})},renderMark:function(a,e,c){var d=this.axis,k=d.options,g=d.chart.renderer,p=this.type,f=p?p+"Tick":"tick",b=d.tickSize(f),n=this.mark,z=!n,
l=a.x;a=a.y;var q=t(k[f+"Width"],!p&&d.isXAxis?1:0),k=k[f+"Color"];b&&(d.opposite&&(b[0]=-b[0]),z&&(this.mark=n=g.path().addClass("highcharts-"+(p?p+"-":"")+"tick").add(d.axisGroup),n.attr({stroke:k,"stroke-width":q})),n[z?"attr":"animate"]({d:this.getMarkPath(l,a,b[0],n.strokeWidth()*c,d.horiz,g),opacity:e}))},renderLabel:function(a,e,c,d){var k=this.axis,x=k.horiz,p=k.options,f=this.label,b=p.labels,n=b.step,k=k.tickmarkOffset,z=!0,u=a.x;a=a.y;f&&g(u)&&(f.xy=a=this.getLabelPosition(u,a,f,x,b,k,
d,n),this.isFirst&&!this.isLast&&!t(p.showFirstLabel,1)||this.isLast&&!this.isFirst&&!t(p.showLastLabel,1)?z=!1:!x||b.step||b.rotation||e||0===c||this.handleOverflow(a),n&&d%n&&(z=!1),z&&g(a.y)?(a.opacity=c,f[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(f.attr("y",-9999),this.isNewLabel=!0))},render:function(e,g,c){var d=this.axis,k=d.horiz,x=this.getPosition(k,this.pos,d.tickmarkOffset,g),p=x.x,f=x.y,d=k&&p===d.pos+d.len||!k&&f===d.pos?-1:1;c=t(c,1);this.isActive=!0;this.renderGridLine(g,
c,d);this.renderMark(x,c,d);this.renderLabel(x,g,c,e);this.isNew=!1;a.fireEvent(this,"afterRender")},destroy:function(){D(this,this.axis)}}})(K);var V=function(a){var C=a.addEvent,F=a.animObject,D=a.arrayMax,r=a.arrayMin,g=a.color,e=a.correctFloat,t=a.defaultOptions,w=a.defined,l=a.deg2rad,u=a.destroyObjectProperties,c=a.each,d=a.extend,k=a.fireEvent,x=a.format,p=a.getMagnitude,f=a.grep,b=a.inArray,n=a.isArray,z=a.isNumber,J=a.isString,q=a.merge,L=a.normalizeTickInterval,B=a.objectEach,H=a.pick,m=
a.removeEvent,E=a.splat,A=a.syncTimeout,M=a.Tick,G=function(){this.init.apply(this,arguments)};a.extend(G.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},x:0},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",minPadding:.01,startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",
tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,
-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,c){var h=c.isX,v=this;v.chart=a;v.horiz=a.inverted&&!v.isZAxis?!h:h;v.isXAxis=h;v.coll=v.coll||
(h?"xAxis":"yAxis");k(this,"init",{userOptions:c});v.opposite=c.opposite;v.side=c.side||(v.horiz?v.opposite?0:2:v.opposite?1:3);v.setOptions(c);var f=this.options,d=f.type;v.labelFormatter=f.labels.formatter||v.defaultLabelFormatter;v.userOptions=c;v.minPixelPadding=0;v.reversed=f.reversed;v.visible=!1!==f.visible;v.zoomEnabled=!1!==f.zoomEnabled;v.hasNames="category"===d||!0===f.categories;v.categories=f.categories||v.hasNames;v.names||(v.names=[],v.names.keys={});v.plotLinesAndBandsGroups={};v.isLog=
"logarithmic"===d;v.isDatetimeAxis="datetime"===d;v.positiveValuesOnly=v.isLog&&!v.allowNegativeLog;v.isLinked=w(f.linkedTo);v.ticks={};v.labelEdge=[];v.minorTicks={};v.plotLinesAndBands=[];v.alternateBands={};v.len=0;v.minRange=v.userMinRange=f.minRange||f.maxZoom;v.range=f.range;v.offset=f.offset||0;v.stacks={};v.oldStacks={};v.stacksTouched=0;v.max=null;v.min=null;v.crosshair=H(f.crosshair,E(a.options.tooltip.crosshairs)[h?0:1],!1);c=v.options.events;-1===b(v,a.axes)&&(h?a.axes.splice(a.xAxis.length,
0,v):a.axes.push(v),a[v.coll].push(v));v.series=v.series||[];a.inverted&&!v.isZAxis&&h&&void 0===v.reversed&&(v.reversed=!0);B(c,function(a,h){C(v,h,a)});v.lin2log=f.linearToLogConverter||v.lin2log;v.isLog&&(v.val2lin=v.log2lin,v.lin2val=v.lin2log);k(this,"afterInit")},setOptions:function(a){this.options=q(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],
q(t[this.coll],a));k(this,"afterSetOptions",{userOptions:a})},defaultLabelFormatter:function(){var h=this.axis,b=this.value,c=h.chart.time,f=h.categories,d=this.dateTimeLabelFormat,m=t.lang,q=m.numericSymbols,m=m.numericSymbolMagnitude||1E3,p=q&&q.length,n,e=h.options.labels.format,h=h.isLog?Math.abs(b):h.tickInterval;if(e)n=x(e,this,c);else if(f)n=b;else if(d)n=c.dateFormat(d,b);else if(p&&1E3<=h)for(;p--&&void 0===n;)c=Math.pow(m,p+1),h>=c&&0===10*b%c&&null!==q[p]&&0!==b&&(n=a.numberFormat(b/c,
-1)+q[p]);void 0===n&&(n=1E4<=Math.abs(b)?a.numberFormat(b,-1):a.numberFormat(b,-1,void 0,""));return n},getSeriesExtremes:function(){var a=this,b=a.chart;k(this,"getSeriesExtremes",null,function(){a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();c(a.series,function(h){if(h.visible||!b.options.chart.ignoreHiddenSeries){var v=h.options,c=v.threshold,d;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=c&&(c=null);if(a.isXAxis)v=h.xData,
v.length&&(h=r(v),d=D(v),z(h)||h instanceof Date||(v=f(v,z),h=r(v),d=D(v)),v.length&&(a.dataMin=Math.min(H(a.dataMin,v[0],h),h),a.dataMax=Math.max(H(a.dataMax,v[0],d),d)));else if(h.getExtremes(),d=h.dataMax,h=h.dataMin,w(h)&&w(d)&&(a.dataMin=Math.min(H(a.dataMin,h),h),a.dataMax=Math.max(H(a.dataMax,d),d)),w(c)&&(a.threshold=c),!v.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})});k(this,"afterGetSeriesExtremes")},translate:function(a,b,c,f,d,m){var h=this.linkedParent||this,v=1,I=0,q=f?
h.oldTransA:h.transA;f=f?h.oldMin:h.min;var p=h.minPixelPadding;d=(h.isOrdinal||h.isBroken||h.isLog&&d)&&h.lin2val;q||(q=h.transA);c&&(v*=-1,I=h.len);h.reversed&&(v*=-1,I-=v*(h.sector||h.len));b?(a=(a*v+I-p)/q+f,d&&(a=h.lin2val(a))):(d&&(a=h.val2lin(a)),a=z(f)?v*(a-f)*q+I+v*p+(z(m)?q*m:0):void 0);return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,
b,c,f,d){var h=this.chart,v=this.left,m=this.top,I,q,p=c&&h.oldChartHeight||h.chartHeight,n=c&&h.oldChartWidth||h.chartWidth,e;I=this.transB;var A=function(a,h,b){if(a<h||a>b)f?a=Math.min(Math.max(h,a),b):e=!0;return a};d=H(d,this.translate(a,null,null,c));d=Math.min(Math.max(-1E5,d),1E5);a=c=Math.round(d+I);I=q=Math.round(p-d-I);z(d)?this.horiz?(I=m,q=p-this.bottom,a=c=A(a,v,v+this.width)):(a=v,c=n-this.right,I=q=A(I,m,m+this.height)):(e=!0,f=!1);return e&&!f?null:h.renderer.crispLine(["M",a,I,"L",
c,q],b||1)},getLinearTickPositions:function(a,b,c){var h,v=e(Math.floor(b/a)*a);c=e(Math.ceil(c/a)*a);var f=[],d;e(v+a)===v&&(d=20);if(this.single)return[b];for(b=v;b<=c;){f.push(b);b=e(b+a,d);if(b===h)break;h=b}return f},getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?H(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,b=a.options,f=a.tickPositions,d=a.minorTickInterval,m=[],q=a.pointRangePadding||0,p=a.min-
q,q=a.max+q,n=q-p;if(n&&n/d<a.len/3)if(a.isLog)c(this.paddedTicks,function(h,b,c){b&&m.push.apply(m,a.getLogTickPositions(d,c[b-1],c[b],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())m=m.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d),p,q,b.startOfWeek));else for(b=p+(f[0]-p)%d;b<=q&&b!==m[0];b+=d)m.push(b);0!==m.length&&a.trimTicks(m);return m},adjustForMinRange:function(){var a=this.options,b=this.min,f=this.max,d,m,q,p,n,e,A,k;this.isXAxis&&void 0===this.minRange&&!this.isLog&&
(w(a.min)||w(a.max)?this.minRange=null:(c(this.series,function(a){e=a.xData;for(p=A=a.xIncrement?1:e.length-1;0<p;p--)if(n=e[p]-e[p-1],void 0===q||n<q)q=n}),this.minRange=Math.min(5*q,this.dataMax-this.dataMin)));f-b<this.minRange&&(m=this.dataMax-this.dataMin>=this.minRange,k=this.minRange,d=(k-f+b)/2,d=[b-d,H(a.min,b-d)],m&&(d[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=D(d),f=[b+k,H(a.max,b+k)],m&&(f[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),f=r(f),f-b<k&&(d[0]=f-k,d[1]=
H(a.min,f-k),b=D(d)));this.min=b;this.max=f},getClosest:function(){var a;this.categories?a=1:c(this.series,function(h){var b=h.closestPointRange,c=h.visible||!h.chart.options.chart.ignoreHiddenSeries;!h.noSharedTooltip&&w(b)&&c&&(a=w(a)?Math.min(a,b):b)});return a},nameToX:function(a){var h=n(this.categories),c=h?this.categories:this.names,f=a.options.x,d;a.series.requireSorting=!1;w(f)||(f=!1===this.options.uniqueNames?a.series.autoIncrement():h?b(a.name,c):H(c.keys[a.name],-1));-1===f?h||(d=c.length):
d=f;void 0!==d&&(this.names[d]=a.name,this.names.keys[a.name]=d);return d},updateNames:function(){var h=this,b=this.names;0<b.length&&(c(a.keys(b.keys),function(a){delete b.keys[a]}),b.length=0,this.minRange=this.userMinRange,c(this.series||[],function(a){a.xIncrement=null;if(!a.points||a.isDirtyData)a.processData(),a.generatePoints();c(a.points,function(b,c){var f;b.options&&(f=h.nameToX(b),void 0!==f&&f!==b.x&&(b.x=f,a.xData[c]=f))})}))},setAxisTranslation:function(a){var h=this,b=h.max-h.min,f=
h.axisPointRange||0,d,m=0,q=0,p=h.linkedParent,n=!!h.categories,e=h.transA,A=h.isXAxis;if(A||n||f)d=h.getClosest(),p?(m=p.minPointOffset,q=p.pointRangePadding):c(h.series,function(a){var b=n?1:A?H(a.options.pointRange,d,0):h.axisPointRange||0;a=a.options.pointPlacement;f=Math.max(f,b);h.single||(m=Math.max(m,J(a)?0:b/2),q=Math.max(q,"on"===a?0:b))}),p=h.ordinalSlope&&d?h.ordinalSlope/d:1,h.minPointOffset=m*=p,h.pointRangePadding=q*=p,h.pointRange=Math.min(f,b),A&&(h.closestPointRange=d);a&&(h.oldTransA=
e);h.translationSlope=h.transA=e=h.options.staticScale||h.len/(b+q||1);h.transB=h.horiz?h.left:h.bottom;h.minPixelPadding=e*m;k(this,"afterSetAxisTranslation")},minFromRange:function(){return this.max-this.range},setTickInterval:function(h){var b=this,f=b.chart,d=b.options,m=b.isLog,q=b.isDatetimeAxis,n=b.isXAxis,A=b.isLinked,E=d.maxPadding,g=d.minPadding,B=d.tickInterval,x=d.tickPixelInterval,G=b.categories,u=z(b.threshold)?b.threshold:null,l=b.softThreshold,t,J,M,r;q||G||A||this.getTickAmount();
M=H(b.userMin,d.min);r=H(b.userMax,d.max);A?(b.linkedParent=f[b.coll][d.linkedTo],f=b.linkedParent.getExtremes(),b.min=H(f.min,f.dataMin),b.max=H(f.max,f.dataMax),d.type!==b.linkedParent.options.type&&a.error(11,1)):(!l&&w(u)&&(b.dataMin>=u?(t=u,g=0):b.dataMax<=u&&(J=u,E=0)),b.min=H(M,t,b.dataMin),b.max=H(r,J,b.dataMax));m&&(b.positiveValuesOnly&&!h&&0>=Math.min(b.min,H(b.dataMin,b.min))&&a.error(10,1),b.min=e(b.log2lin(b.min),15),b.max=e(b.log2lin(b.max),15));b.range&&w(b.max)&&(b.userMin=b.min=
M=Math.max(b.dataMin,b.minFromRange()),b.userMax=r=b.max,b.range=null);k(b,"foundExtremes");b.beforePadding&&b.beforePadding();b.adjustForMinRange();!(G||b.axisPointRange||b.usePercentage||A)&&w(b.min)&&w(b.max)&&(f=b.max-b.min)&&(!w(M)&&g&&(b.min-=f*g),!w(r)&&E&&(b.max+=f*E));z(d.softMin)&&!z(b.userMin)&&(b.min=Math.min(b.min,d.softMin));z(d.softMax)&&!z(b.userMax)&&(b.max=Math.max(b.max,d.softMax));z(d.floor)&&(b.min=Math.max(b.min,d.floor));z(d.ceiling)&&(b.max=Math.min(b.max,d.ceiling));l&&w(b.dataMin)&&
(u=u||0,!w(M)&&b.min<u&&b.dataMin>=u?b.min=u:!w(r)&&b.max>u&&b.dataMax<=u&&(b.max=u));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:A&&!B&&x===b.linkedParent.options.tickPixelInterval?B=b.linkedParent.tickInterval:H(B,this.tickAmount?(b.max-b.min)/Math.max(this.tickAmount-1,1):void 0,G?1:(b.max-b.min)*x/Math.max(b.len,x));n&&!h&&c(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();
b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&!B&&(b.tickInterval=Math.max(b.pointRange,b.tickInterval));h=H(d.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);!B&&b.tickInterval<h&&(b.tickInterval=h);q||m||B||(b.tickInterval=L(b.tickInterval,null,p(b.tickInterval),H(d.allowDecimals,!(.5<b.tickInterval&&5>b.tickInterval&&1E3<b.max&&9999>b.max)),!!this.tickAmount));this.tickAmount||(b.tickInterval=b.unsquish());this.setTickPositions()},setTickPositions:function(){var a=
this.options,b,c=a.tickPositions;b=this.getMinorTickInterval();var f=a.tickPositioner,d=a.startOnTick,m=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===b&&this.tickInterval?this.tickInterval/5:b;this.single=this.min===this.max&&w(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=b=c&&c.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,
a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()],b[0]===b[1]&&(b.length=1)),this.tickPositions=b,f&&(f=f.apply(this,[this.min,this.max])))&&(this.tickPositions=b=f);this.paddedTicks=b.slice(0);this.trimTicks(b,d,m);this.isLinked||(this.single&&2>b.length&&(this.min-=.5,this.max+=.5),c||
f||this.adjustTickAmount());k(this,"afterSetTickPositions")},trimTicks:function(a,b,c){var h=a[0],f=a[a.length-1],d=this.minPointOffset||0;if(!this.isLinked){if(b&&-Infinity!==h)this.min=h;else for(;this.min-d>a[0];)a.shift();if(c)this.max=f;else for(;this.max+d<a[a.length-1];)a.pop();0===a.length&&w(h)&&!this.options.tickPositions&&a.push((f+h)/2)}},alignToOthers:function(){var a={},b,f=this.options;!1===this.chart.options.chart.alignTicks||!1===f.alignTicks||!1===f.startOnTick||!1===f.endOnTick||
this.isLog||c(this.chart[this.coll],function(h){var c=h.options,c=[h.horiz?c.left:c.top,c.width,c.height,c.pane].join();h.series.length&&(a[c]?b=!0:a[c]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,c=a.tickPixelInterval;!w(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/c)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=
this.tickPositions,c=this.tickAmount,f=this.finalTickAmt,d=b&&b.length,m=H(this.threshold,this.softThreshold?0:null);if(this.hasData()){if(d<c){for(;b.length<c;)b.length%2||this.min===m?b.push(e(b[b.length-1]+a)):b.unshift(e(b[0]-a));this.transA*=(d-1)/(c-1);this.min=b[0];this.max=b[b.length-1]}else d>c&&(this.tickInterval*=2,this.setTickPositions());if(w(f)){for(a=c=b.length;a--;)(3===f&&1===a%2||2>=f&&0<a&&a<c-1)&&b.splice(a,1);this.finalTickAmt=void 0}}},setScale:function(){var a,b;this.oldMin=
this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;c(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=
b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks();k(this,"afterSetScale")},setExtremes:function(a,b,f,m,q){var h=this,p=h.chart;f=H(f,!0);c(h.series,function(a){delete a.kdTree});q=d(q,{min:a,max:b});k(h,"setExtremes",q,function(){h.userMin=a;h.userMax=b;h.eventArgs=q;f&&p.redraw(m)})},zoom:function(a,b){var h=this.dataMin,c=this.dataMax,f=this.options,d=Math.min(h,H(f.min,h)),f=Math.max(c,H(f.max,c));if(a!==this.min||b!==this.max)this.allowZoomOutside||(w(h)&&
(a<d&&(a=d),a>f&&(a=f)),w(c)&&(b<d&&(b=d),b>f&&(b=f))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var b=this.chart,c=this.options,f=c.offsets||[0,0,0,0],d=this.horiz,m=this.width=Math.round(a.relativeLength(H(c.width,b.plotWidth-f[3]+f[1]),b.plotWidth)),q=this.height=Math.round(a.relativeLength(H(c.height,b.plotHeight-f[0]+f[2]),b.plotHeight)),p=this.top=Math.round(a.relativeLength(H(c.top,b.plotTop+f[0]),b.plotHeight,b.plotTop)),
c=this.left=Math.round(a.relativeLength(H(c.left,b.plotLeft+f[3]),b.plotWidth,b.plotLeft));this.bottom=b.chartHeight-q-p;this.right=b.chartWidth-m-c;this.len=Math.max(d?m:q,0);this.pos=d?c:p},getExtremes:function(){var a=this.isLog;return{min:a?e(this.lin2log(this.min)):this.min,max:a?e(this.lin2log(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,h=b?this.lin2log(this.min):this.min,b=b?this.lin2log(this.max):
this.max;null===a||-Infinity===a?a=h:Infinity===a?a=b:h>a?a=h:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(H(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,h=b[a+"Length"],c=H(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(c&&h)return"inside"===b[a+"Position"]&&(h=-h),[h,c]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&
this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,f=this.tickInterval,d=f,m=this.len/(((this.categories?1:0)+this.max-this.min)/f),q,p=a.rotation,n=this.labelMetrics(),A,k=Number.MAX_VALUE,E,z=function(a){a/=m||1;a=1<a?Math.ceil(a):1;return e(a*f)};b?(E=!a.staggerLines&&!a.step&&(w(p)?[p]:m<H(a.autoRotationLimit,80)&&a.autoRotation))&&c(E,function(a){var b;if(a===p||a&&-90<=a&&90>=a)A=z(Math.abs(n.h/Math.sin(l*a))),b=
A+Math.abs(a/360),b<k&&(k=b,q=a,d=A)}):a.step||(d=z(n.h));this.autoRotation=E;this.labelRotation=H(q,p);return d},getSlotWidth:function(){var a=this.chart,b=this.horiz,c=this.options.labels,f=Math.max(this.tickPositions.length-(this.categories?0:1),1),d=a.margin[3];return b&&2>(c.step||0)&&!c.rotation&&(this.staggerLines||1)*this.len/f||!b&&(c.style&&parseInt(c.style.width,10)||d&&d-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,f=this.tickPositions,d=this.ticks,
m=this.options.labels,q=this.horiz,p=this.getSlotWidth(),n=Math.max(1,Math.round(p-2*(m.padding||5))),e={},A=this.labelMetrics(),k=m.style&&m.style.textOverflow,E,z,g=0,B;J(m.rotation)||(e.rotation=m.rotation||0);c(f,function(a){(a=d[a])&&a.label&&a.label.textPxLength>g&&(g=a.label.textPxLength)});this.maxLabelLength=g;if(this.autoRotation)g>n&&g>A.h?e.rotation=this.labelRotation:this.labelRotation=0;else if(p&&(E=n,!k))for(z="clip",n=f.length;!q&&n--;)if(B=f[n],B=d[B].label)B.styles&&"ellipsis"===
B.styles.textOverflow?B.css({textOverflow:"clip"}):B.textPxLength>p&&B.css({width:p+"px"}),B.getBBox().height>this.len/f.length-(A.h-A.f)&&(B.specificTextOverflow="ellipsis");e.rotation&&(E=g>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight,k||(z="ellipsis"));if(this.labelAlign=m.align||this.autoLabelAlign(this.labelRotation))e.align=this.labelAlign;c(f,function(a){var b=(a=d[a])&&a.label,h={};b&&(b.attr(e),!E||m.style&&m.style.width||!(E<b.textPxLength||"SPAN"===b.element.tagName)||(h.width=E,k||
(h.textOverflow=b.specificTextOverflow||z),b.css(h)),delete b.specificTextOverflow,a.rotation=e.rotation)});this.tickRotCorr=b.rotCorr(A.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||w(this.min)&&w(this.max)&&this.tickPositions&&0<this.tickPositions.length},addTitle:function(a){var b=this.chart.renderer,h=this.horiz,c=this.opposite,f=this.options.title,d;this.axisTitle||((d=f.textAlign)||(d=(h?{low:"left",middle:"center",high:"right"}:{low:c?"right":"left",
middle:"center",high:c?"left":"right"})[f.align]),this.axisTitle=b.text(f.text,0,0,f.useHTML).attr({zIndex:7,rotation:f.rotation||0,align:d}).addClass("highcharts-axis-title").css(q(f.style)).add(this.axisGroup),this.axisTitle.isNew=!0);f.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new M(this,a)},getOffset:function(){var a=this,b=a.chart,f=b.renderer,d=a.options,m=a.tickPositions,
q=a.ticks,p=a.horiz,n=a.side,e=b.inverted&&!a.isZAxis?[1,0,3,2][n]:n,A,k,E=0,z,g=0,x=d.title,G=d.labels,u=0,l=b.axisOffset,b=b.clipOffset,t=[-1,1,1,-1][n],J=d.className,M=a.axisParent,r=this.tickSize("tick");A=a.hasData();a.showAxis=k=A||H(d.showEmpty,!0);a.staggerLines=a.horiz&&G.staggerLines;a.axisGroup||(a.gridGroup=f.g("grid").attr({zIndex:d.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(J||"")).add(M),a.axisGroup=f.g("axis").attr({zIndex:d.zIndex||2}).addClass("highcharts-"+
this.coll.toLowerCase()+" "+(J||"")).add(M),a.labelGroup=f.g("axis-labels").attr({zIndex:G.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(J||"")).add(M));A||a.isLinked?(c(m,function(b,f){a.generateTick(b,f)}),a.renderUnsquish(),a.reserveSpaceDefault=0===n||2===n||{1:"left",3:"right"}[n]===a.labelAlign,H(G.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&c(m,function(a){u=Math.max(q[a].getLabelSize(),u)}),a.staggerLines&&(u*=a.staggerLines),a.labelOffset=u*
(a.opposite?-1:1)):B(q,function(a,b){a.destroy();delete q[b]});x&&x.text&&!1!==x.enabled&&(a.addTitle(k),k&&!1!==x.reserveSpace&&(a.titleOffset=E=a.axisTitle.getBBox()[p?"height":"width"],z=x.offset,g=w(z)?0:H(x.margin,p?5:10)));a.renderLine();a.offset=t*H(d.offset,l[n]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};f=0===n?-a.labelMetrics().h:2===n?a.tickRotCorr.y:0;g=Math.abs(u)+g;u&&(g=g-f+t*(p?H(G.y,a.tickRotCorr.y+8*t):G.x));a.axisTitleMargin=H(z,g);l[n]=Math.max(l[n],a.axisTitleMargin+E+t*a.offset,
g,A&&m.length&&r?r[0]+t*a.offset:0);d=d.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[e]=Math.max(b[e],d)},getLinePath:function(a){var b=this.chart,f=this.opposite,c=this.offset,h=this.horiz,d=this.left+(f?this.width:0)+c,c=b.chartHeight-this.bottom-(f?this.height:0)+c;f&&(a*=-1);return b.renderer.crispLine(["M",h?this.left:d,h?c:this.top,"L",h?b.chartWidth-this.right:d,h?c:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,f=this.top,c=this.len,d=this.options.title,m=a?b:f,q=this.opposite,p=this.offset,n=d.x||0,e=d.y||0,A=this.axisTitle,k=this.chart.renderer.fontMetrics(d.style&&d.style.fontSize,A),A=Math.max(A.getBBox(null,0).height-k.h-1,0),c={low:m+(a?0:c),middle:m+c/2,high:m+(a?c:0)}[d.align],b=(a?f+this.height:b)+(a?1:-1)*(q?-1:1)*this.axisTitleMargin+[-A,
A,k.f,-A][this.side];return{x:a?c+n:b+(q?this.width:0)+p+n,y:a?b+e-(q?this.height:0)+p:c+e}},renderMinorTick:function(a){var b=this.chart.hasRendered&&z(this.oldMin),f=this.minorTicks;f[a]||(f[a]=new M(this,a,"minor"));b&&f[a].isNew&&f[a].render(null,!0);f[a].render(null,!1,1)},renderTick:function(a,b){var f=this.isLinked,c=this.ticks,d=this.chart.hasRendered&&z(this.oldMin);if(!f||a>=this.min&&a<=this.max)c[a]||(c[a]=new M(this,a)),d&&c[a].isNew&&c[a].render(b,!0,.1),c[a].render(b)},render:function(){var b=
this,f=b.chart,d=b.options,m=b.isLog,q=b.isLinked,p=b.tickPositions,n=b.axisTitle,e=b.ticks,E=b.minorTicks,g=b.alternateBands,x=d.stackLabels,G=d.alternateGridColor,u=b.tickmarkOffset,l=b.axisLine,H=b.showAxis,t=F(f.renderer.globalAnimation),J,r;b.labelEdge.length=0;b.overlap=!1;c([e,E,g],function(a){B(a,function(a){a.isActive=!1})});if(b.hasData()||q)b.minorTickInterval&&!b.categories&&c(b.getMinorTickPositions(),function(a){b.renderMinorTick(a)}),p.length&&(c(p,function(a,f){b.renderTick(a,f)}),
u&&(0===b.min||b.single)&&(e[-1]||(e[-1]=new M(b,-1,null,!0)),e[-1].render(-1))),G&&c(p,function(c,d){r=void 0!==p[d+1]?p[d+1]+u:b.max-u;0===d%2&&c<b.max&&r<=b.max+(f.polar?-u:u)&&(g[c]||(g[c]=new a.PlotLineOrBand(b)),J=c+u,g[c].options={from:m?b.lin2log(J):J,to:m?b.lin2log(r):r,color:G},g[c].render(),g[c].isActive=!0)}),b._addedPlotLB||(c((d.plotLines||[]).concat(d.plotBands||[]),function(a){b.addPlotBandOrLine(a)}),b._addedPlotLB=!0);c([e,E,g],function(a){var b,c=[],d=t.duration;B(a,function(a,
b){a.isActive||(a.render(b,!1,0),a.isActive=!1,c.push(b))});A(function(){for(b=c.length;b--;)a[c[b]]&&!a[c[b]].isActive&&(a[c[b]].destroy(),delete a[c[b]])},a!==g&&f.hasRendered&&d?d:0)});l&&(l[l.isPlaced?"animate":"attr"]({d:this.getLinePath(l.strokeWidth())}),l.isPlaced=!0,l[H?"show":"hide"](!0));n&&H&&(d=b.getTitlePosition(),z(d.y)?(n[n.isNew?"attr":"animate"](d),n.isNew=!1):(n.attr("y",-9999),n.isNew=!0));x&&x.enabled&&b.renderStackTotals();b.isDirty=!1;k(this,"afterRender")},redraw:function(){this.visible&&
(this.render(),c(this.plotLinesAndBands,function(a){a.render()}));c(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var f=this,d=f.stacks,h=f.plotLinesAndBands,q;k(this,"destroy",{keepEvents:a});a||m(f);B(d,function(a,b){u(a);d[b]=null});c([f.ticks,f.minorTicks,f.alternateBands],function(a){u(a)});if(h)for(a=h.length;a--;)h[a].destroy();c("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
function(a){f[a]&&(f[a]=f[a].destroy())});for(q in f.plotLinesAndBandsGroups)f.plotLinesAndBandsGroups[q]=f.plotLinesAndBandsGroups[q].destroy();B(f,function(a,c){-1===b(c,f.keepProps)&&delete f[c]})},drawCrosshair:function(a,b){var f,c=this.crosshair,d=H(c.snap,!0),h,m=this.cross;k(this,"drawCrosshair",{e:a,point:b});a||(a=this.cross&&this.cross.e);if(this.crosshair&&!1!==(w(b)||!d)){d?w(b)&&(h=H(b.crosshairPos,this.isXAxis?b.plotX:this.len-b.plotY)):h=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+
this.pos);w(h)&&(f=this.getPlotLinePath(b&&(this.isXAxis?b.x:H(b.stackY,b.y)),null,null,null,h)||null);if(!w(f)){this.hideCrosshair();return}d=this.categories&&!this.isRadial;m||(this.cross=m=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(d?"category ":"thin ")+c.className).attr({zIndex:H(c.zIndex,2)}).add(),m.attr({stroke:c.color||(d?g("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":H(c.width,1)}).css({"pointer-events":"none"}),c.dashStyle&&m.attr({dashstyle:c.dashStyle}));
m.show().attr({d:f});d&&!c.width&&m.attr({"stroke-width":this.transA});this.cross.e=a}else this.hideCrosshair();k(this,"afterDrawCrosshair",{e:a,point:b})},hideCrosshair:function(){this.cross&&this.cross.hide()}});return a.Axis=G}(K);(function(a){var C=a.Axis,F=a.getMagnitude,D=a.normalizeTickInterval,r=a.timeUnits;C.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)};C.prototype.normalizeTimeTickInterval=function(a,e){var g=e||[["millisecond",[1,
2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];e=g[g.length-1];var w=r[e[0]],l=e[1],u;for(u=0;u<g.length&&!(e=g[u],w=r[e[0]],l=e[1],g[u+1]&&a<=(w*l[l.length-1]+r[g[u+1][0]])/2);u++);w===r.year&&a<5*w&&(l=[1,2,5]);a=D(a/w,l,"year"===e[0]?Math.max(F(a/w),1):1);return{unitRange:w,count:a,unitName:e[0]}}})(K);(function(a){var C=a.Axis,F=a.getMagnitude,D=a.map,r=a.normalizeTickInterval,
g=a.pick;C.prototype.getLogTickPositions=function(a,t,w,l){var e=this.options,c=this.len,d=[];l||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),d=this.getLinearTickPositions(a,t,w);else if(.08<=a)for(var c=Math.floor(t),k,x,p,f,b,e=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];c<w+1&&!b;c++)for(x=e.length,k=0;k<x&&!b;k++)p=this.log2lin(this.lin2log(c)*e[k]),p>t&&(!l||f<=w)&&void 0!==f&&d.push(f),f>w&&(b=!0),f=p;else t=this.lin2log(t),w=this.lin2log(w),a=l?this.getMinorTickInterval():
e.tickInterval,a=g("auto"===a?null:a,this._minorAutoInterval,e.tickPixelInterval/(l?5:1)*(w-t)/((l?c/this.tickPositions.length:c)||1)),a=r(a,null,F(a)),d=D(this.getLinearTickPositions(a,t,w),this.log2lin),l||(this._minorAutoInterval=a/5);l||(this.tickInterval=a);return d};C.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};C.prototype.lin2log=function(a){return Math.pow(10,a)}})(K);(function(a,C){var F=a.arrayMax,D=a.arrayMin,r=a.defined,g=a.destroyObjectProperties,e=a.each,t=a.erase,w=
a.merge,l=a.pick;a.PlotLineOrBand=function(a,c){this.axis=a;c&&(this.options=c,this.id=c.id)};a.PlotLineOrBand.prototype={render:function(){var e=this,c=e.axis,d=c.horiz,k=e.options,g=k.label,p=e.label,f=k.to,b=k.from,n=k.value,z=r(b)&&r(f),J=r(n),q=e.svgElem,t=!q,B=[],H=k.color,m=l(k.zIndex,0),E=k.events,B={"class":"highcharts-plot-"+(z?"band ":"line ")+(k.className||"")},A={},M=c.chart.renderer,G=z?"bands":"lines";c.isLog&&(b=c.log2lin(b),f=c.log2lin(f),n=c.log2lin(n));J?(B={stroke:H,"stroke-width":k.width},
k.dashStyle&&(B.dashstyle=k.dashStyle)):z&&(H&&(B.fill=H),k.borderWidth&&(B.stroke=k.borderColor,B["stroke-width"]=k.borderWidth));A.zIndex=m;G+="-"+m;(H=c.plotLinesAndBandsGroups[G])||(c.plotLinesAndBandsGroups[G]=H=M.g("plot-"+G).attr(A).add());t&&(e.svgElem=q=M.path().attr(B).add(H));if(J)B=c.getPlotLinePath(n,q.strokeWidth());else if(z)B=c.getPlotBandPath(b,f,k);else return;t&&B&&B.length?(q.attr({d:B}),E&&a.objectEach(E,function(a,b){q.on(b,function(a){E[b].apply(e,[a])})})):q&&(B?(q.show(),
q.animate({d:B})):(q.hide(),p&&(e.label=p=p.destroy())));g&&r(g.text)&&B&&B.length&&0<c.width&&0<c.height&&!B.flat?(g=w({align:d&&z&&"center",x:d?!z&&4:10,verticalAlign:!d&&z&&"middle",y:d?z?16:10:z?6:-4,rotation:d&&!z&&90},g),this.renderLabel(g,B,z,m)):p&&p.hide();return e},renderLabel:function(a,c,d,e){var k=this.label,p=this.axis.chart.renderer;k||(k={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(d?"band":"line")+"-label "+(a.className||"")},k.zIndex=e,this.label=k=
p.text(a.text,0,0,a.useHTML).attr(k).add(),k.css(a.style));e=c.xBounds||[c[1],c[4],d?c[6]:c[1]];c=c.yBounds||[c[2],c[5],d?c[7]:c[2]];d=D(e);p=D(c);k.align(a,!1,{x:d,y:p,width:F(e)-d,height:F(c)-p});k.show()},destroy:function(){t(this.axis.plotLinesAndBands,this);delete this.axis;g(this)}};a.extend(C.prototype,{getPlotBandPath:function(a,c){var d=this.getPlotLinePath(c,null,null,!0),e=this.getPlotLinePath(a,null,null,!0),g=[],p=this.horiz,f=1,b;a=a<this.min&&c<this.min||a>this.max&&c>this.max;if(e&&
d)for(a&&(b=e.toString()===d.toString(),f=0),a=0;a<e.length;a+=6)p&&d[a+1]===e[a+1]?(d[a+1]+=f,d[a+4]+=f):p||d[a+2]!==e[a+2]||(d[a+2]+=f,d[a+5]+=f),g.push("M",e[a+1],e[a+2],"L",e[a+4],e[a+5],d[a+4],d[a+5],d[a+1],d[a+2],"z"),g.flat=b;return g},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(e,c){var d=(new a.PlotLineOrBand(this,e)).render(),k=this.userOptions;d&&(c&&(k[c]=k[c]||[],
k[c].push(e)),this.plotLinesAndBands.push(d));return d},removePlotBandOrLine:function(a){for(var c=this.plotLinesAndBands,d=this.options,k=this.userOptions,g=c.length;g--;)c[g].id===a&&c[g].destroy();e([d.plotLines||[],k.plotLines||[],d.plotBands||[],k.plotBands||[]],function(c){for(g=c.length;g--;)c[g].id===a&&t(c,c[g])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(K,V);(function(a){var C=a.each,F=a.extend,D=a.format,r=a.isNumber,
g=a.map,e=a.merge,t=a.pick,w=a.splat,l=a.syncTimeout,u=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,d){this.chart=a;this.options=d;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=d.split&&!a.inverted;this.shared=d.shared||this.split},cleanSplit:function(a){C(this.chart.series,function(c){var d=c&&c.tt;d&&(!d.isActive||a?c.tt=d.destroy():d.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,d=this.options;this.label||
(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,d.shape||"callout",null,null,d.useHTML,null,"tooltip").attr({padding:d.padding,r:d.borderRadius}),this.label.attr({fill:d.backgroundColor,"stroke-width":d.borderWidth}).css(d.style).shadow(d.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();e(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,e(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());
this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());a.clearTimeout(this.hideTimer);a.clearTimeout(this.tooltipTimeout)},move:function(c,d,e,g){var p=this,f=p.now,b=!1!==p.options.animation&&!p.isHidden&&(1<Math.abs(c-f.x)||1<Math.abs(d-f.y)),n=p.followPointer||1<p.len;F(f,{x:b?(2*f.x+c)/3:c,y:b?(f.y+d)/2:d,anchorX:n?void 0:b?(2*f.anchorX+e)/3:e,anchorY:n?void 0:b?(f.anchorY+g)/2:g});p.getLabel().attr(f);b&&(a.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){p&&
p.move(c,d,e,g)},32))},hide:function(c){var d=this;a.clearTimeout(this.hideTimer);c=t(c,this.options.hideDelay,500);this.isHidden||(this.hideTimer=l(function(){d.getLabel()[c?"fadeOut":"hide"]();d.isHidden=!0},c))},getAnchor:function(a,d){var c,e=this.chart,p=e.inverted,f=e.plotTop,b=e.plotLeft,n=0,z=0,l,q;a=w(a);c=a[0].tooltipPos;this.followPointer&&d&&(void 0===d.chartX&&(d=e.pointer.normalize(d)),c=[d.chartX-e.plotLeft,d.chartY-f]);c||(C(a,function(a){l=a.series.yAxis;q=a.series.xAxis;n+=a.plotX+
(!p&&q?q.left-b:0);z+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!p&&l?l.top-f:0)}),n/=a.length,z/=a.length,c=[p?e.plotWidth-z:n,this.shared&&!p&&1<a.length&&d?d.chartY-f:p?e.plotHeight-n:z]);return g(c,Math.round)},getPosition:function(a,d,e){var c=this.chart,p=this.distance,f={},b=c.inverted&&e.h||0,n,g=["y",c.chartHeight,d,e.plotY+c.plotTop,c.plotTop,c.plotTop+c.plotHeight],k=["x",c.chartWidth,a,e.plotX+c.plotLeft,c.plotLeft,c.plotLeft+c.plotWidth],q=!this.followPointer&&t(e.ttBelow,!c.inverted===
!!e.negative),l=function(a,c,d,m,h,e){var n=d<m-p,A=m+p+d<c,g=m-p-d;m+=p;if(q&&A)f[a]=m;else if(!q&&n)f[a]=g;else if(n)f[a]=Math.min(e-d,0>g-b?g:g-b);else if(A)f[a]=Math.max(h,m+b+d>c?m:m+b);else return!1},B=function(a,b,c,d){var h;d<p||d>b-p?h=!1:f[a]=d<c/2?1:d>b-c/2?b-c-2:d-c/2;return h},H=function(a){var b=g;g=k;k=b;n=a},m=function(){!1!==l.apply(0,g)?!1!==B.apply(0,k)||n||(H(!0),m()):n?f.x=f.y=0:(H(!0),m())};(c.inverted||1<this.len)&&H();m();return f},defaultFormatter:function(a){var c=this.points||
w(this),e;e=[a.tooltipFooterHeaderFormatter(c[0])];e=e.concat(a.bodyFormatter(c));e.push(a.tooltipFooterHeaderFormatter(c[0],!0));return e},refresh:function(c,d){var e,g=this.options,p,f=c,b,n={},z=[];e=g.formatter||this.defaultFormatter;var n=this.shared,l;g.enabled&&(a.clearTimeout(this.hideTimer),this.followPointer=w(f)[0].series.tooltipOptions.followPointer,b=this.getAnchor(f,d),d=b[0],p=b[1],!n||f.series&&f.series.noSharedTooltip?n=f.getLabelConfig():(C(f,function(a){a.setState("hover");z.push(a.getLabelConfig())}),
n={x:f[0].category,y:f[0].y},n.points=z,f=f[0]),this.len=z.length,n=e.call(n,this),l=f.series,this.distance=t(l.tooltipOptions.distance,16),!1===n?this.hide():(e=this.getLabel(),this.isHidden&&e.attr({opacity:1}).show(),this.split?this.renderSplit(n,w(c)):(g.style.width||e.css({width:this.chart.spacingBox.width}),e.attr({text:n&&n.join?n.join(""):n}),e.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+t(f.colorIndex,l.colorIndex)),e.attr({stroke:g.borderColor||f.color||l.color||
"#666666"}),this.updatePosition({plotX:d,plotY:p,negative:f.negative,ttBelow:f.ttBelow,h:b[2]||0})),this.isHidden=!1))},renderSplit:function(c,d){var e=this,g=[],p=this.chart,f=p.renderer,b=!0,n=this.options,z=0,l=this.getLabel();a.isString(c)&&(c=[!1,c]);C(c.slice(0,d.length+1),function(a,c){if(!1!==a){c=d[c-1]||{isHeader:!0,plotX:d[0].plotX};var q=c.series||e,k=q.tt,m=c.series||{},E="highcharts-color-"+t(c.colorIndex,m.colorIndex,"none");k||(q.tt=k=f.label(null,null,null,"callout",null,null,n.useHTML).addClass("highcharts-tooltip-box "+
E).attr({padding:n.padding,r:n.borderRadius,fill:n.backgroundColor,stroke:n.borderColor||c.color||m.color||"#333333","stroke-width":n.borderWidth}).add(l));k.isActive=!0;k.attr({text:a});k.css(n.style).shadow(n.shadow);a=k.getBBox();m=a.width+k.strokeWidth();c.isHeader?(z=a.height,m=Math.max(0,Math.min(c.plotX+p.plotLeft-m/2,p.chartWidth-m))):m=c.plotX+p.plotLeft-t(n.distance,16)-m;0>m&&(b=!1);a=(c.series&&c.series.yAxis&&c.series.yAxis.pos)+(c.plotY||0);a-=p.plotTop;g.push({target:c.isHeader?p.plotHeight+
z:a,rank:c.isHeader?1:0,size:q.tt.getBBox().height+1,point:c,x:m,tt:k})}});this.cleanSplit();a.distribute(g,p.plotHeight+z);C(g,function(a){var c=a.point,f=c.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:b||c.isHeader?a.x:c.plotX+p.plotLeft+t(n.distance,16),y:a.pos+p.plotTop,anchorX:c.isHeader?c.plotX+p.plotLeft:c.plotX+f.xAxis.pos,anchorY:c.isHeader?a.pos+p.plotTop-15:c.plotY+f.yAxis.pos})})},updatePosition:function(a){var c=this.chart,e=this.getLabel(),e=(this.options.positioner||
this.getPosition).call(this,e.width,e.height,a);this.move(Math.round(e.x),Math.round(e.y||0),a.plotX+c.plotLeft,a.plotY+c.plotTop)},getDateFormat:function(a,d,e,g){var c=this.chart.time,f=c.dateFormat("%m-%d %H:%M:%S.%L",d),b,n,k={millisecond:15,second:12,minute:9,hour:6,day:3},l="millisecond";for(n in u){if(a===u.week&&+c.dateFormat("%w",d)===e&&"00:00:00.000"===f.substr(6)){n="week";break}if(u[n]>a){n=l;break}if(k[n]&&f.substr(k[n])!=="01-01 00:00:00.000".substr(k[n]))break;"week"!==n&&(l=n)}n&&
(b=g[n]);return b},getXDateFormat:function(a,d,e){d=d.dateTimeLabelFormats;var c=e&&e.closestPointRange;return(c?this.getDateFormat(c,a.x,e.options.startOfWeek,d):d.day)||d.year},tooltipFooterHeaderFormatter:function(a,d){d=d?"footer":"header";var c=a.series,e=c.tooltipOptions,p=e.xDateFormat,f=c.xAxis,b=f&&"datetime"===f.options.type&&r(a.key),n=e[d+"Format"];b&&!p&&(p=this.getXDateFormat(a,e,f));b&&p&&C(a.point&&a.point.tooltipDateKeys||["key"],function(a){n=n.replace("{point."+a+"}","{point."+
a+":"+p+"}")});return D(n,{point:a,series:c},this.chart.time)},bodyFormatter:function(a){return g(a,function(a){var c=a.series.tooltipOptions;return(c[(a.point.formatPrefix||"point")+"Formatter"]||a.point.tooltipFormatter).call(a.point,c[(a.point.formatPrefix||"point")+"Format"])})}}})(K);(function(a){var C=a.addEvent,F=a.attr,D=a.charts,r=a.color,g=a.css,e=a.defined,t=a.each,w=a.extend,l=a.find,u=a.fireEvent,c=a.isNumber,d=a.isObject,k=a.offset,x=a.pick,p=a.splat,f=a.Tooltip;a.Pointer=function(a,
c){this.init(a,c)};a.Pointer.prototype={init:function(a,c){this.options=c;this.chart=a;this.runChartClick=c.chart.events&&!!c.chart.events.click;this.pinchDown=[];this.lastValidTouch={};f&&(a.tooltip=new f(a,c.tooltip),this.followTouchMove=x(c.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,c=b.options.chart,f=c.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(f=x(c.pinchType,f));this.zoomX=a=/x/.test(f);this.zoomY=f=/y/.test(f);this.zoomHor=a&&!b||f&&b;this.zoomVert=
f&&!b||a&&b;this.hasZoom=a||f},normalize:function(a,c){var b;b=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;c||(this.chartPosition=c=k(this.chart.container));return w(a,{chartX:Math.round(b.pageX-c.left),chartY:Math.round(b.pageY-c.top)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};t(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,c,f){var b;t(a,function(a){var e=
!(a.noSharedTooltip&&c)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(f,e);if((e=d(a,!0))&&!(e=!d(b,!0)))var e=b.distX-a.distX,p=b.dist-a.dist,q=(a.series.group&&a.series.group.zIndex)-(b.series.group&&b.series.group.zIndex),e=0<(0!==e&&c?e:0!==p?p:0!==q?q:b.series.index>a.series.index?-1:1);e&&(b=a)});return b},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,c){var b=a.series,f=b.xAxis,b=b.yAxis,d=
x(a.clientX,a.plotX),e=a.shapeArgs;if(f&&b)return c?{chartX:f.len+f.pos-d,chartY:b.len+b.pos-a.plotY}:{chartX:d+f.pos,chartY:a.plotY+b.pos};if(e&&e.x&&e.y)return{chartX:e.x,chartY:e.y}},getHoverData:function(b,c,f,e,p,g,k){var q,m=[],n=k&&k.isBoosting;e=!(!e||!b);k=c&&!c.stickyTracking?[c]:a.grep(f,function(a){return a.visible&&!(!p&&a.directTouch)&&x(a.options.enableMouseTracking,!0)&&a.stickyTracking});c=(q=e?b:this.findNearestKDPoint(k,p,g))&&q.series;q&&(p&&!c.noSharedTooltip?(k=a.grep(f,function(a){return a.visible&&
!(!p&&a.directTouch)&&x(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),t(k,function(a){var b=l(a.points,function(a){return a.x===q.x&&!a.isNull});d(b)&&(n&&(b=a.getPoint(b)),m.push(b))})):m.push(q));return{hoverPoint:q,hoverSeries:c,hoverPoints:m}},runPointActions:function(b,c){var f=this.chart,d=f.tooltip&&f.tooltip.options.enabled?f.tooltip:void 0,e=d?d.shared:!1,p=c||f.hoverPoint,n=p&&p.series||f.hoverSeries,n=this.getHoverData(p,n,f.series,!!c||n&&n.directTouch&&this.isDirectTouch,e,
b,{isBoosting:f.isBoosting}),g,p=n.hoverPoint;g=n.hoverPoints;c=(n=n.hoverSeries)&&n.tooltipOptions.followPointer;e=e&&n&&!n.noSharedTooltip;if(p&&(p!==f.hoverPoint||d&&d.isHidden)){t(f.hoverPoints||[],function(b){-1===a.inArray(b,g)&&b.setState()});t(g||[],function(a){a.setState("hover")});if(f.hoverSeries!==n)n.onMouseOver();f.hoverPoint&&f.hoverPoint.firePointEvent("mouseOut");if(!p.series)return;p.firePointEvent("mouseOver");f.hoverPoints=g;f.hoverPoint=p;d&&d.refresh(e?g:p,b)}else c&&d&&!d.isHidden&&
(p=d.getAnchor([{}],b),d.updatePosition({plotX:p[0],plotY:p[1]}));this.unDocMouseMove||(this.unDocMouseMove=C(f.container.ownerDocument,"mousemove",function(b){var c=D[a.hoverChartIndex];if(c)c.pointer.onDocumentMouseMove(b)}));t(f.axes,function(c){var f=x(c.crosshair.snap,!0),d=f?a.find(g,function(a){return a.series[c.coll]===c}):void 0;d||!f?c.drawCrosshair(b,d):c.hideCrosshair()})},reset:function(a,c){var b=this.chart,f=b.hoverSeries,d=b.hoverPoint,e=b.hoverPoints,n=b.tooltip,g=n&&n.shared?e:d;
a&&g&&t(p(g),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)n&&g&&(n.refresh(g),d&&(d.setState(d.state,!0),t(b.axes,function(a){a.crosshair&&a.drawCrosshair(null,d)})));else{if(d)d.onMouseOut();e&&t(e,function(a){a.setState()});if(f)f.onMouseOut();n&&n.hide(c);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());t(b.axes,function(a){a.hideCrosshair()});this.hoverX=b.hoverPoints=b.hoverPoint=null}},scaleGroups:function(a,c){var b=this.chart,f;t(b.series,function(d){f=
a||d.getPlotBox();d.xAxis&&d.xAxis.zoomEnabled&&d.group&&(d.group.attr(f),d.markerGroup&&(d.markerGroup.attr(f),d.markerGroup.clip(c?b.clipRect:null)),d.dataLabelsGroup&&d.dataLabelsGroup.attr(f))});b.clipRect.attr(c||b.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,f=a.chartX,d=a.chartY,e=this.zoomHor,p=this.zoomVert,g=b.plotLeft,
m=b.plotTop,k=b.plotWidth,A=b.plotHeight,l,G=this.selectionMarker,h=this.mouseDownX,v=this.mouseDownY,t=c.panKey&&a[c.panKey+"Key"];G&&G.touch||(f<g?f=g:f>g+k&&(f=g+k),d<m?d=m:d>m+A&&(d=m+A),this.hasDragged=Math.sqrt(Math.pow(h-f,2)+Math.pow(v-d,2)),10<this.hasDragged&&(l=b.isInsidePlot(h-g,v-m),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&l&&!t&&!G&&(this.selectionMarker=G=b.renderer.rect(g,m,e?1:k,p?1:A,0).attr({fill:c.selectionMarkerFill||r("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",
zIndex:7}).add()),G&&e&&(f-=h,G.attr({width:Math.abs(f),x:(0<f?0:f)+h})),G&&p&&(f=d-v,G.attr({height:Math.abs(f),y:(0<f?0:f)+v})),l&&!G&&c.panning&&b.pan(a,c.panning)))},drop:function(a){var b=this,f=this.chart,d=this.hasPinched;if(this.selectionMarker){var p={originalEvent:a,xAxis:[],yAxis:[]},k=this.selectionMarker,B=k.attr?k.attr("x"):k.x,l=k.attr?k.attr("y"):k.y,m=k.attr?k.attr("width"):k.width,E=k.attr?k.attr("height"):k.height,A;if(this.hasDragged||d)t(f.axes,function(c){if(c.zoomEnabled&&e(c.min)&&
(d||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var f=c.horiz,h="touchend"===a.type?c.minPixelPadding:0,g=c.toValue((f?B:l)+h),f=c.toValue((f?B+m:l+E)-h);p[c.coll].push({axis:c,min:Math.min(g,f),max:Math.max(g,f)});A=!0}}),A&&u(f,"selection",p,function(a){f.zoom(w(a,d?{animation:!1}:null))});c(f.index)&&(this.selectionMarker=this.selectionMarker.destroy());d&&this.scaleGroups()}f&&c(f.index)&&(g(f.container,{cursor:f._cursor}),f.cancelClick=10<this.hasDragged,f.mouseIsDown=this.hasDragged=this.hasPinched=
!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);2!==a.button&&(this.zoomOption(a),a.preventDefault&&a.preventDefault(),this.dragStart(a))},onDocumentMouseUp:function(b){D[a.hoverChartIndex]&&D[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=
D[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=null)},onContainerMouseMove:function(b){var c=this.chart;e(a.hoverChartIndex)&&D[a.hoverChartIndex]&&D[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=c.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},inClass:function(a,c){for(var b;a;){if(b=
F(a,"class")){if(-1!==b.indexOf(c))return!0;if(-1!==b.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,f=b.plotLeft,d=b.plotTop;a=this.normalize(a);b.cancelClick||
(c&&this.inClass(a.target,"highcharts-tracker")?(u(c.series,"click",w(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(w(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-f,a.chartY-d)&&u(b,"click",a)))},setDOMEvents:function(){var b=this,c=b.chart.container,f=c.ownerDocument;c.onmousedown=function(a){b.onContainerMouseDown(a)};c.onmousemove=function(a){b.onContainerMouseMove(a)};c.onclick=function(a){b.onContainerClick(a)};this.unbindContainerMouseLeave=C(c,"mouseleave",b.onContainerMouseLeave);
a.unbindDocumentMouseUp||(a.unbindDocumentMouseUp=C(f,"mouseup",b.onDocumentMouseUp));a.hasTouch&&(c.ontouchstart=function(a){b.onContainerTouchStart(a)},c.ontouchmove=function(a){b.onContainerTouchMove(a)},a.unbindDocumentTouchEnd||(a.unbindDocumentTouchEnd=C(f,"touchend",b.onDocumentTouchEnd)))},destroy:function(){var b=this;b.unDocMouseMove&&b.unDocMouseMove();this.unbindContainerMouseLeave();a.chartCount||(a.unbindDocumentMouseUp&&(a.unbindDocumentMouseUp=a.unbindDocumentMouseUp()),a.unbindDocumentTouchEnd&&
(a.unbindDocumentTouchEnd=a.unbindDocumentTouchEnd()));clearInterval(b.tooltipTimeout);a.objectEach(b,function(a,c){b[c]=null})}}})(K);(function(a){var C=a.charts,F=a.each,D=a.extend,r=a.map,g=a.noop,e=a.pick;D(a.Pointer.prototype,{pinchTranslate:function(a,e,g,r,c,d){this.zoomHor&&this.pinchTranslateDirection(!0,a,e,g,r,c,d);this.zoomVert&&this.pinchTranslateDirection(!1,a,e,g,r,c,d)},pinchTranslateDirection:function(a,e,g,r,c,d,k,x){var p=this.chart,f=a?"x":"y",b=a?"X":"Y",n="chart"+b,l=a?"width":
"height",t=p["plot"+(a?"Left":"Top")],q,u,B=x||1,H=p.inverted,m=p.bounds[a?"h":"v"],E=1===e.length,A=e[0][n],M=g[0][n],G=!E&&e[1][n],h=!E&&g[1][n],v;g=function(){!E&&20<Math.abs(A-G)&&(B=x||Math.abs(M-h)/Math.abs(A-G));u=(t-M)/B+A;q=p["plot"+(a?"Width":"Height")]/B};g();e=u;e<m.min?(e=m.min,v=!0):e+q>m.max&&(e=m.max-q,v=!0);v?(M-=.8*(M-k[f][0]),E||(h-=.8*(h-k[f][1])),g()):k[f]=[M,h];H||(d[f]=u-t,d[l]=q);d=H?1/B:B;c[l]=q;c[f]=e;r[H?a?"scaleY":"scaleX":"scale"+b]=B;r["translate"+b]=d*t+(M-d*A)},pinch:function(a){var t=
this,l=t.chart,u=t.pinchDown,c=a.touches,d=c.length,k=t.lastValidTouch,x=t.hasZoom,p=t.selectionMarker,f={},b=1===d&&(t.inClass(a.target,"highcharts-tracker")&&l.runTrackerClick||t.runChartClick),n={};1<d&&(t.initiated=!0);x&&t.initiated&&!b&&a.preventDefault();r(c,function(a){return t.normalize(a)});"touchstart"===a.type?(F(c,function(a,b){u[b]={chartX:a.chartX,chartY:a.chartY}}),k.x=[u[0].chartX,u[1]&&u[1].chartX],k.y=[u[0].chartY,u[1]&&u[1].chartY],F(l.axes,function(a){if(a.zoomEnabled){var b=
l.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,f=a.toPixels(e(a.options.min,a.dataMin)),d=a.toPixels(e(a.options.max,a.dataMax)),p=Math.max(f,d);b.min=Math.min(a.pos,Math.min(f,d)-c);b.max=Math.max(a.pos+a.len,p+c)}}),t.res=!0):t.followTouchMove&&1===d?this.runPointActions(t.normalize(a)):u.length&&(p||(t.selectionMarker=p=D({destroy:g,touch:!0},l.plotBox)),t.pinchTranslate(u,c,f,p,n,k),t.hasPinched=x,t.scaleGroups(f,n),t.res&&(t.res=!1,this.reset(!1,0)))},touch:function(g,r){var l=this.chart,t,c;
if(l.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=l.index;1===g.touches.length?(g=this.normalize(g),(c=l.isInsidePlot(g.chartX-l.plotLeft,g.chartY-l.plotTop))&&!l.openMenu?(r&&this.runPointActions(g),"touchmove"===g.type&&(r=this.pinchDown,t=r[0]?4<=Math.sqrt(Math.pow(r[0].chartX-g.chartX,2)+Math.pow(r[0].chartY-g.chartY,2)):!1),e(t,!0)&&this.pinch(g)):r&&this.reset()):2===g.touches.length&&this.pinch(g)},onContainerTouchStart:function(a){this.zoomOption(a);
this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(e){C[a.hoverChartIndex]&&C[a.hoverChartIndex].pointer.drop(e)}})})(K);(function(a){var C=a.addEvent,F=a.charts,D=a.css,r=a.doc,g=a.extend,e=a.noop,t=a.Pointer,w=a.removeEvent,l=a.win,u=a.wrap;if(!a.hasTouch&&(l.PointerEvent||l.MSPointerEvent)){var c={},d=!!l.PointerEvent,k=function(){var d=[];d.item=function(a){return this[a]};a.objectEach(c,function(a){d.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});
return d},x=function(c,f,b,d){"touch"!==c.pointerType&&c.pointerType!==c.MSPOINTER_TYPE_TOUCH||!F[a.hoverChartIndex]||(d(c),d=F[a.hoverChartIndex].pointer,d[f]({type:b,target:c.currentTarget,preventDefault:e,touches:k()}))};g(t.prototype,{onContainerPointerDown:function(a){x(a,"onContainerTouchStart","touchstart",function(a){c[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){x(a,"onContainerTouchMove","touchmove",function(a){c[a.pointerId]={pageX:a.pageX,
pageY:a.pageY};c[a.pointerId].target||(c[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){x(a,"onDocumentTouchEnd","touchend",function(a){delete c[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,d?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,d?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(r,d?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});u(t.prototype,"init",function(a,c,b){a.call(this,c,b);this.hasZoom&&
D(c.container,{"-ms-touch-action":"none","touch-action":"none"})});u(t.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(C)});u(t.prototype,"destroy",function(a){this.batchMSEvents(w);a.call(this)})}})(K);(function(a){var C=a.addEvent,F=a.css,D=a.discardElement,r=a.defined,g=a.each,e=a.fireEvent,t=a.isFirefox,w=a.marginNames,l=a.merge,u=a.pick,c=a.setAnimation,d=a.stableSort,k=a.win,x=a.wrap;a.Legend=function(a,c){this.init(a,c)};a.Legend.prototype=
{init:function(a,c){this.chart=a;this.setOptions(c);c.enabled&&(this.render(),C(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var c=u(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=l(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.padding=c;this.initialItemY=c-5;this.symbolWidth=u(a.symbolWidth,16);this.pages=[]},update:function(a,c){var b=this.chart;this.setOptions(l(!0,this.options,a));this.destroy();
b.isDirtyLegend=b.isDirtyBox=!0;u(c,!0)&&b.redraw();e(this,"afterUpdate")},colorizeItem:function(a,c){a.legendGroup[c?"removeClass":"addClass"]("highcharts-legend-item-hidden");var b=this.options,f=a.legendItem,d=a.legendLine,g=a.legendSymbol,p=this.itemHiddenStyle.color,b=c?b.itemStyle.color:p,k=c?a.color||p:p,B=a.options&&a.options.marker,l={fill:k};f&&f.css({fill:b,color:b});d&&d.attr({stroke:k});g&&(B&&g.isMarker&&(l=a.pointAttribs(),c||(l.stroke=l.fill=p)),g.attr(l));e(this,"afterColorizeItem",
{item:a,visible:c})},positionItem:function(a){var c=this.options,b=c.symbolPadding,c=!c.rtl,d=a._legendItemPos,e=d[0],d=d[1],g=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(c?e:this.legendWidth-e-2*b-4,d);g&&(g.x=e,g.y=d)},destroyItem:function(a){var c=a.checkbox;g(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});c&&D(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}g(this.getAllItems(),function(c){g(["legendItem",
"legendGroup"],a,c)});g("clipRect up down pager nav box title group".split(" "),a,this);this.display=null},positionCheckboxes:function(){var a=this.group&&this.group.alignAttr,c,b=this.clipHeight||this.legendHeight,d=this.titleHeight;a&&(c=a.translateY,g(this.allItems,function(f){var e=f.checkbox,g;e&&(g=c+d+e.y+(this.scrollOffset||0)+3,F(e,{left:a.translateX+f.checkboxOffset+e.x-20+"px",top:g+"px",display:g>c-6&&g<c+b-6?"":"none"}))},this))},renderTitle:function(){var a=this.options,c=this.padding,
b=a.title,d=0;b.text&&(this.title||(this.title=this.chart.renderer.label(b.text,c-3,c-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group)),a=this.title.getBBox(),d=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:d}));this.titleHeight=d},setText:function(c){var d=this.options;c.legendItem.attr({text:d.labelFormat?a.format(d.labelFormat,c,this.chart.time):d.labelFormatter.call(c)})},renderItem:function(a){var c=this.chart,b=c.renderer,d=
this.options,e=this.symbolWidth,g=d.symbolPadding,q=this.itemStyle,k=this.itemHiddenStyle,p="horizontal"===d.layout?u(d.itemDistance,20):0,t=!d.rtl,m=a.legendItem,E=!a.series,A=!E&&a.series.drawLegendSymbol?a.series:a,x=A.options,x=this.createCheckboxForItem&&x&&x.showCheckbox,p=e+g+p+(x?20:0),G=d.useHTML,h=a.options.className;m||(a.legendGroup=b.g("legend-item").addClass("highcharts-"+A.type+"-series highcharts-color-"+a.colorIndex+(h?" "+h:"")+(E?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),
a.legendItem=m=b.text("",t?e+g:-g,this.baseline||0,G).css(l(a.visible?q:k)).attr({align:t?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(e=q.fontSize,this.fontMetrics=b.fontMetrics(e,m),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,m.attr("y",this.baseline)),this.symbolHeight=d.symbolHeight||this.fontMetrics.f,A.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,m,G),x&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);q.width||m.css({width:(d.itemWidth||
d.width||c.spacingBox.width)-p});this.setText(a);c=m.getBBox();a.itemWidth=a.checkboxOffset=d.itemWidth||a.legendItemWidth||c.width+p;this.maxItemWidth=Math.max(this.maxItemWidth,a.itemWidth);this.totalItemWidth+=a.itemWidth;this.itemHeight=a.itemHeight=Math.round(a.legendItemHeight||c.height||this.symbolHeight)},layoutItem:function(a){var c=this.options,b=this.padding,d="horizontal"===c.layout,e=a.itemHeight,g=c.itemMarginBottom||0,q=this.itemMarginTop,k=d?u(c.itemDistance,20):0,p=c.width,l=p||this.chart.spacingBox.width-
2*b-c.x,c=c.alignColumns&&this.totalItemWidth>l?this.maxItemWidth:a.itemWidth;d&&this.itemX-b+c>l&&(this.itemX=b,this.itemY+=q+this.lastLineHeight+g,this.lastLineHeight=0);this.lastItemY=q+this.itemY+g;this.lastLineHeight=Math.max(e,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];d?this.itemX+=c:(this.itemY+=q+e+g,this.lastLineHeight=e);this.offsetWidth=p||Math.max((d?this.itemX-b-(a.checkbox?0:k):c)+b,this.offsetWidth)},getAllItems:function(){var a=[];g(this.chart.series,function(c){var b=
c&&c.options;c&&u(b.showInLegend,r(b.linkedTo)?!1:void 0,!0)&&(a=a.concat(c.legendItems||("point"===b.legendType?c.data:c)))});e(this,"afterGetAllItems",{allItems:a});return a},getAlignment:function(){var a=this.options;return a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)},adjustMargins:function(a,c){var b=this.chart,d=this.options,f=this.getAlignment();f&&g([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/],function(e,g){e.test(f)&&!r(a[g])&&(b[w[g]]=Math.max(b[w[g]],
b.legend[(g+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][g]*d[g%2?"x":"y"]+u(d.margin,12)+c[g]+(0===g&&void 0!==b.options.title.margin?b.titleOffset+b.options.title.margin:0)))})},render:function(){var a=this.chart,c=a.renderer,b=this.group,e,k,x,q,t=this.box,B=this.options,r=this.padding;this.itemX=r;this.itemY=this.initialItemY;this.lastItemY=this.offsetWidth=0;b||(this.group=b=c.g("legend").attr({zIndex:7}).add(),this.contentGroup=c.g().attr({zIndex:1}).add(b),this.scrollGroup=c.g().add(this.contentGroup));
this.renderTitle();e=this.getAllItems();d(e,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});B.reversed&&e.reverse();this.allItems=e;this.display=k=!!e.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;g(e,this.renderItem,this);g(e,this.layoutItem,this);x=(B.width||this.offsetWidth)+r;q=this.lastItemY+this.lastLineHeight+this.titleHeight;q=this.handleOverflow(q);q+=r;t||(this.box=t=c.rect().addClass("highcharts-legend-box").attr({r:B.borderRadius}).add(b),
t.isNew=!0);t.attr({stroke:B.borderColor,"stroke-width":B.borderWidth||0,fill:B.backgroundColor||"none"}).shadow(B.shadow);0<x&&0<q&&(t[t.isNew?"attr":"animate"](t.crisp.call({},{x:0,y:0,width:x,height:q},t.strokeWidth())),t.isNew=!1);t[k?"show":"hide"]();this.legendWidth=x;this.legendHeight=q;g(e,this.positionItem,this);k&&(c=a.spacingBox,/(lth|ct|rth)/.test(this.getAlignment())&&(c=l(c,{y:c.y+a.titleOffset+a.options.title.margin})),b.align(l(B,{width:x,height:q}),!0,c));a.isResizing||this.positionCheckboxes()},
handleOverflow:function(a){var c=this,b=this.chart,d=b.renderer,e=this.options,k=e.y,q=this.padding,b=b.spacingBox.height+("top"===e.verticalAlign?-k:k)-q,k=e.maxHeight,p,l=this.clipRect,t=e.navigation,m=u(t.animation,!0),E=t.arrowSize||12,A=this.nav,x=this.pages,G,h=this.allItems,v=function(a){"number"===typeof a?l.attr({height:a}):l&&(c.clipRect=l.destroy(),c.contentGroup.clip());c.contentGroup.div&&(c.contentGroup.div.style.clip=a?"rect("+q+"px,9999px,"+(q+a)+"px,0)":"auto")};"horizontal"!==e.layout||
"middle"===e.verticalAlign||e.floating||(b/=2);k&&(b=Math.min(b,k));x.length=0;a>b&&!1!==t.enabled?(this.clipHeight=p=Math.max(b-20-this.titleHeight-q,0),this.currentPage=u(this.currentPage,1),this.fullHeight=a,g(h,function(a,b){var c=a._legendItemPos[1],d=Math.round(a.legendItem.getBBox().height),f=x.length;if(!f||c-x[f-1]>p&&(G||c)!==x[f-1])x.push(G||c),f++;a.pageIx=f-1;G&&(h[b-1].pageIx=f-1);b===h.length-1&&c+d-x[f-1]>p&&(x.push(c),a.pageIx=f);c!==G&&(G=c)}),l||(l=c.clipRect=d.clipRect(0,q,9999,
0),c.contentGroup.clip(l)),v(p),A||(this.nav=A=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,E,E).on("click",function(){c.scroll(-1,m)}).add(A),this.pager=d.text("",15,10).addClass("highcharts-legend-navigation").css(t.style).add(A),this.down=d.symbol("triangle-down",0,0,E,E).on("click",function(){c.scroll(1,m)}).add(A)),c.scroll(0),a=b):A&&(v(),this.nav=A.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,d){var b=this.pages,f=
b.length;a=this.currentPage+a;var e=this.clipHeight,g=this.options.navigation,k=this.pager,p=this.padding;a>f&&(a=f);0<a&&(void 0!==d&&c(d,this.chart),this.nav.attr({translateX:p,translateY:e+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),k.attr({text:a+"/"+f}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===f?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===
a?g.inactiveColor:g.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===f?g.inactiveColor:g.activeColor}).css({cursor:a===f?"default":"pointer"}),this.scrollOffset=-b[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=a,this.positionCheckboxes())}};a.LegendSymbolMixin={drawRectangle:function(a,c){var b=a.symbolHeight,d=a.options.squareSymbol;c.legendSymbol=this.chart.renderer.rect(d?(a.symbolWidth-b)/2:0,a.baseline-b+1,d?b:a.symbolWidth,
b,u(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(c.legendGroup)},drawLineMarker:function(a){var c=this.options,b=c.marker,d=a.symbolWidth,e=a.symbolHeight,g=e/2,k=this.chart.renderer,p=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var B;B={"stroke-width":c.lineWidth||0};c.dashStyle&&(B.dashstyle=c.dashStyle);this.legendLine=k.path(["M",0,a,"L",d,a]).addClass("highcharts-graph").attr(B).add(p);b&&!1!==b.enabled&&(c=Math.min(u(b.radius,g),g),0===this.symbol.indexOf("url")&&
(b=l(b,{width:e,height:e}),c=0),this.legendSymbol=b=k.symbol(this.symbol,d/2-c,a-c,2*c,2*c,b).addClass("highcharts-point").add(p),b.isMarker=!0)}};(/Trident\/7\.0/.test(k.navigator.userAgent)||t)&&x(a.Legend.prototype,"positionItem",function(a,c){var b=this,d=function(){c._legendItemPos&&a.call(b,c)};d();setTimeout(d)})})(K);(function(a){var C=a.addEvent,F=a.animate,D=a.animObject,r=a.attr,g=a.doc,e=a.Axis,t=a.createElement,w=a.defaultOptions,l=a.discardElement,u=a.charts,c=a.css,d=a.defined,k=a.each,
x=a.extend,p=a.find,f=a.fireEvent,b=a.grep,n=a.isNumber,z=a.isObject,J=a.isString,q=a.Legend,L=a.marginNames,B=a.merge,H=a.objectEach,m=a.Pointer,E=a.pick,A=a.pInt,M=a.removeEvent,G=a.seriesTypes,h=a.splat,v=a.syncTimeout,Q=a.win,P=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new P(a,b,c)};x(P.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(J(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var d,
h,m=b.series,e=b.plotOptions||{};f(this,"init",{args:arguments},function(){b.series=null;d=B(w,b);for(h in d.plotOptions)d.plotOptions[h].tooltip=e[h]&&B(e[h].tooltip)||void 0;d.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;d.series=b.series=m;this.userOptions=b;var g=d.chart,k=g.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=c;this.isResizing=0;this.options=d;this.axes=[];this.series=[];this.time=b.time&&a.keys(b.time).length?
new a.Time(b.time):a.time;this.hasCartesianSeries=g.showAxes;var A=this;A.index=u.length;u.push(A);a.chartCount++;k&&H(k,function(a,b){C(A,b,a)});A.xAxis=[];A.yAxis=[];A.pointCount=A.colorCounter=A.symbolCounter=0;f(A,"afterInit");A.firstRender()})},initSeries:function(b){var c=this.options.chart;(c=G[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].getName())},
isInsidePlot:function(a,b,c){var d=c?b:a;a=c?a:b;return 0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){f(this,"beforeRedraw");var c=this.axes,d=this.series,h=this.pointer,m=this.legend,e=this.isDirtyLegend,g,A,q=this.hasCartesianSeries,p=this.isDirtyBox,E,v=this.renderer,n=v.isHidden(),l=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);n&&this.temporaryDisplay();this.layOutTitles();for(b=d.length;b--;)if(E=d[b],E.options.stacking&&(g=!0,E.isDirty)){A=!0;
break}if(A)for(b=d.length;b--;)E=d[b],E.options.stacking&&(E.isDirty=!0);k(d,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),e=!0);a.isDirtyData&&f(a,"updatedData")});e&&m.options.enabled&&(m.render(),this.isDirtyLegend=!1);g&&this.getStacks();q&&k(c,function(a){a.updateNames();a.setScale()});this.getMargins();q&&(k(c,function(a){a.isDirty&&(p=!0)}),k(c,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,l.push(function(){f(a,"afterSetExtremes",x(a.eventArgs,
a.getExtremes()));delete a.eventArgs}));(p||g)&&a.redraw()}));p&&this.drawChartBox();f(this,"predraw");k(d,function(a){(p||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});h&&h.reset(!0);v.draw();f(this,"redraw");f(this,"render");n&&this.temporaryDisplay(!0);k(l,function(a){a.call()})},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var c,d=this.series,f;c=p(this.axes,b)||p(this.series,b);for(f=0;!c&&f<d.length;f++)c=p(d[f].points||[],b);return c},getAxes:function(){var a=
this,b=this.options,c=b.xAxis=h(b.xAxis||{}),b=b.yAxis=h(b.yAxis||{});f(this,"getAxes");k(c,function(a,b){a.index=b;a.isX=!0});k(b,function(a,b){a.index=b});c=c.concat(b);k(c,function(b){new e(a,b)});f(this,"afterGetAxes")},getSelectedPoints:function(){var a=[];k(this.series,function(c){a=a.concat(b(c.data||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return b(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var d=this,f=d.options,h;h=f.title=B({style:{color:"#333333",
fontSize:f.isStock?"16px":"18px"}},f.title,a);f=f.subtitle=B({style:{color:"#666666"}},f.subtitle,b);k([["title",a,h],["subtitle",b,f]],function(a,b){var c=a[0],f=d[c],h=a[1];a=a[2];f&&h&&(d[c]=f=f.destroy());a&&!f&&(d[c]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),d[c].update=function(a){d.setTitle(!b&&a,b&&a)},d[c].css(a.style))});d.layOutTitles(c)},layOutTitles:function(a){var b=0,c,d=this.renderer,f=this.spacingBox;k(["title","subtitle"],
function(a){var c=this[a],h=this.options[a];a="title"===a?-3:h.verticalAlign?0:b+2;var m;c&&(m=h.style.fontSize,m=d.fontMetrics(m,c).b,c.css({width:(h.width||f.width+h.widthAdjust)+"px"}).align(x({y:a+m},h),!1,"spacingBox"),h.floating||h.verticalAlign||(b=Math.ceil(b+c.getBBox(h.useHTML).height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&c&&(this.isDirtyBox=this.isDirtyLegend=c,this.hasRendered&&E(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=this.options.chart,
c=b.width,b=b.height,f=this.renderTo;d(c)||(this.containerWidth=a.getStyle(f,"width"));d(b)||(this.containerHeight=a.getStyle(f,"height"));this.chartWidth=Math.max(0,c||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(b){var c=this.renderTo;if(b)for(;c&&c.style;)c.hcOrigStyle&&(a.css(c,c.hcOrigStyle),delete c.hcOrigStyle),c.hcOrigDetached&&(g.body.removeChild(c),c.hcOrigDetached=
!1),c=c.parentNode;else for(;c&&c.style;){g.body.contains(c)||c.parentNode||(c.hcOrigDetached=!0,g.body.appendChild(c));if("none"===a.getStyle(c,"display",!1)||c.hcOricDetached)c.hcOrigStyle={display:c.style.display,height:c.style.height,overflow:c.style.overflow},b={display:"block",overflow:"hidden"},c!==this.renderTo&&(b.height=0),a.css(c,b),c.offsetWidth||c.style.setProperty("display","block","important");c=c.parentNode;if(c===g.body)break}},setClassName:function(a){this.container.className="highcharts-container "+
(a||"")},getContainer:function(){var b,c=this.options,d=c.chart,h,m;b=this.renderTo;var e=a.uniqueKey(),k;b||(this.renderTo=b=d.renderTo);J(b)&&(this.renderTo=b=g.getElementById(b));b||a.error(13,!0);h=A(r(b,"data-highcharts-chart"));n(h)&&u[h]&&u[h].hasRendered&&u[h].destroy();r(b,"data-highcharts-chart",this.index);b.innerHTML="";d.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();h=this.chartWidth;m=this.chartHeight;k=x({position:"relative",overflow:"hidden",width:h+"px",height:m+
"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},d.style);this.container=b=t("div",{id:e},k,b);this._cursor=b.style.cursor;this.renderer=new (a[d.renderer]||a.Renderer)(b,h,m,null,d.forExport,c.exporting&&c.exporting.allowHTML);this.setClassName(d.className);this.renderer.setStyle(d.style);this.renderer.chartIndex=this.index;f(this,"afterGetContainer")},getMargins:function(a){var b=this.spacing,c=this.margin,f=this.titleOffset;this.resetMargins();f&&
!d(c[0])&&(this.plotTop=Math.max(this.plotTop,f+this.options.title.margin+b[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(c,b);this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.adjustPlotArea&&this.adjustPlotArea();a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&k(a.axes,function(a){a.visible&&a.getOffset()});k(L,function(f,h){d(c[h])||(a[f]+=b[h])});
a.setChartSize()},reflow:function(b){var c=this,f=c.options.chart,h=c.renderTo,m=d(f.width)&&d(f.height),e=f.width||a.getStyle(h,"width"),f=f.height||a.getStyle(h,"height"),h=b?b.target:Q;if(!m&&!c.isPrinting&&e&&f&&(h===Q||h===g)){if(e!==c.containerWidth||f!==c.containerHeight)a.clearTimeout(c.reflowTimeout),c.reflowTimeout=v(function(){c.container&&c.setSize(void 0,void 0,!1)},b?100:0);c.containerWidth=e;c.containerHeight=f}},setReflow:function(a){var b=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&
(this.unbindReflow=this.unbindReflow()):(this.unbindReflow=C(Q,"resize",function(a){b.reflow(a)}),C(this,"destroy",this.unbindReflow))},setSize:function(b,d,h){var m=this,e=m.renderer;m.isResizing+=1;a.setAnimation(h,m);m.oldChartHeight=m.chartHeight;m.oldChartWidth=m.chartWidth;void 0!==b&&(m.options.chart.width=b);void 0!==d&&(m.options.chart.height=d);m.getChartSize();b=e.globalAnimation;(b?F:c)(m.container,{width:m.chartWidth+"px",height:m.chartHeight+"px"},b);m.setChartSize(!0);e.setSize(m.chartWidth,
m.chartHeight,h);k(m.axes,function(a){a.isDirty=!0;a.setScale()});m.isDirtyLegend=!0;m.isDirtyBox=!0;m.layOutTitles();m.getMargins();m.redraw(h);m.oldChartHeight=null;f(m,"resize");v(function(){m&&f(m,"endResize",null,function(){--m.isResizing})},D(b).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,h=this.chartHeight,m=this.options.chart,e=this.spacing,g=this.clipOffset,A,q,p,E;this.plotLeft=A=Math.round(this.plotLeft);this.plotTop=q=Math.round(this.plotTop);
this.plotWidth=p=Math.max(0,Math.round(d-A-this.marginRight));this.plotHeight=E=Math.max(0,Math.round(h-q-this.marginBottom));this.plotSizeX=b?E:p;this.plotSizeY=b?p:E;this.plotBorderWidth=m.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:e[3],y:e[0],width:d-e[3]-e[1],height:h-e[0]-e[2]};this.plotBox=c.plotBox={x:A,y:q,width:p,height:E};d=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(d,g[3])/2);c=Math.ceil(Math.max(d,g[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(d,
g[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(d,g[2])/2-c))};a||k(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()});f(this,"afterSetChartSize",{skipAxes:a})},resetMargins:function(){var a=this,b=a.options.chart;k(["margin","spacing"],function(c){var d=b[c],f=z(d)?d:[d,d,d,d];k(["Top","Right","Bottom","Left"],function(d,h){a[c][h]=E(b[c+d],f[h])})});k(L,function(b,c){a[b]=E(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=
this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,h=this.chartBackground,m=this.plotBackground,e=this.plotBorder,g,A=this.plotBGImage,k=a.backgroundColor,q=a.plotBackgroundColor,p=a.plotBackgroundImage,E,v=this.plotLeft,n=this.plotTop,l=this.plotWidth,G=this.plotHeight,B=this.plotBox,x=this.clipRect,t=this.clipBox,r="animate";h||(this.chartBackground=h=b.rect().addClass("highcharts-background").add(),r="attr");g=a.borderWidth||0;E=g+(a.shadow?8:0);k={fill:k||"none"};if(g||h["stroke-width"])k.stroke=
a.borderColor,k["stroke-width"]=g;h.attr(k).shadow(a.shadow);h[r]({x:E/2,y:E/2,width:c-E-g%2,height:d-E-g%2,r:a.borderRadius});r="animate";m||(r="attr",this.plotBackground=m=b.rect().addClass("highcharts-plot-background").add());m[r](B);m.attr({fill:q||"none"}).shadow(a.plotShadow);p&&(A?A.animate(B):this.plotBGImage=b.image(p,v,n,l,G).add());x?x.animate({width:t.width,height:t.height}):this.clipRect=b.clipRect(t);r="animate";e||(r="attr",this.plotBorder=e=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());
e.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});e[r](e.crisp({x:v,y:n,width:l,height:G},-e.strokeWidth()));this.isDirtyBox=!1;f(this,"afterDrawChartBox")},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,f,h;k(["inverted","angular","polar"],function(m){c=G[b.type||b.defaultSeriesType];h=b[m]||c&&c.prototype[m];for(f=d&&d.length;!h&&f--;)(c=G[d[f].type])&&c.prototype[m]&&(h=!0);a[m]=h})},linkSeries:function(){var a=this,b=a.series;k(b,function(a){a.linkedSeries.length=
0});k(b,function(b){var c=b.options.linkedTo;J(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=E(b.options.visible,c.options.visible,b.visible))});f(this,"afterLinkSeries")},renderSeries:function(){k(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&k(b.items,function(c){var d=x(b.style,c.style),f=A(d.left)+a.plotLeft,h=A(d.top)+a.plotTop+12;delete d.left;delete d.top;
a.renderer.text(c.html,f,h).attr({zIndex:2}).css(d).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,d,f,h;this.setTitle();this.legend=new q(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;d=this.plotHeight=Math.max(this.plotHeight-21,0);k(a,function(a){a.setScale()});this.getAxisMargins();f=1.1<c/this.plotWidth;h=1.05<d/this.plotHeight;if(f||h)k(a,function(a){(a.horiz&&f||!a.horiz&&h)&&a.setTickInterval(!0)}),this.getMargins();
this.drawChartBox();this.hasCartesianSeries&&k(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=B(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&
(Q.location.href=a.href)}).attr({align:a.position.align,zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,d=b.series,h=b.container,m,e=h&&h.parentNode;f(b,"destroy");b.renderer.forExport?a.erase(u,b):u[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");M(b);for(m=c.length;m--;)c[m]=c[m].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();
for(m=d.length;m--;)d[m]=d[m].destroy();k("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});h&&(h.innerHTML="",M(h),e&&l(h));H(b,function(a,c){delete b[c]})},firstRender:function(){var a=this,b=a.options;if(!a.isReadyToRender||a.isReadyToRender()){a.getContainer();a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();
k(b.series||[],function(b){a.initSeries(b)});a.linkSeries();f(a,"beforeRender");m&&(a.pointer=new m(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){k([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);f(this,"load");f(this,"render");d(this.index)&&this.setReflow(this.options.chart.reflow);this.onload=null}})})(K);(function(a){var C=a.addEvent,F=a.Chart,D=a.each;C(F,"afterSetChartSize",function(r){var g=
this.options.chart.scrollablePlotArea;if(g=g&&g.minWidth)if(this.scrollablePixels=g=Math.max(0,g-this.chartWidth))this.plotWidth+=g,this.clipBox.width+=g,r.skipAxes||D(this.axes,function(e){1===e.side?e.getPlotLinePath=function(){var g=this.right,r;this.right=g-e.chart.scrollablePixels;r=a.Axis.prototype.getPlotLinePath.apply(this,arguments);this.right=g;return r}:(e.setAxisSize(),e.setAxisTranslation())})});C(F,"render",function(){this.scrollablePixels?(this.setUpScrolling&&this.setUpScrolling(),
this.applyFixed()):this.fixedDiv&&this.applyFixed()});F.prototype.setUpScrolling=function(){this.scrollingContainer=a.createElement("div",{className:"highcharts-scrolling"},{overflowX:"auto",WebkitOverflowScrolling:"touch"},this.renderTo);this.innerContainer=a.createElement("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null};F.prototype.applyFixed=function(){var r=this.container,g,e;this.fixedDiv||(this.fixedDiv=
a.createElement("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2},null,!0),this.renderTo.insertBefore(this.fixedDiv,this.renderTo.firstChild),this.fixedRenderer=g=new a.Renderer(this.fixedDiv,0,0),this.scrollableMask=g.path().attr({fill:a.color(this.options.chart.backgroundColor||"#fff").setOpacity(.85).get(),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),a.each([this.inverted?".highcharts-xaxis":".highcharts-yaxis",this.inverted?
".highcharts-xaxis-labels":".highcharts-yaxis-labels",".highcharts-contextbutton",".highcharts-credits",".highcharts-legend",".highcharts-subtitle",".highcharts-title"],function(e){a.each(r.querySelectorAll(e),function(a){g.box.appendChild(a);a.style.pointerEvents="auto"})}));this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);e=this.chartWidth+this.scrollablePixels;this.container.style.width=e+"px";this.renderer.boxWrapper.attr({width:e,height:this.chartHeight,viewBox:[0,0,e,this.chartHeight].join(" ")});
e=this.options.chart.scrollablePlotArea;e.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixels*e.scrollPositionX);var t=this.axisOffset;e=this.plotTop-t[0]-1;var t=this.plotTop+this.plotHeight+t[2],w=this.plotLeft+this.plotWidth-this.scrollablePixels;this.scrollableMask.attr({d:this.scrollablePixels?["M",0,e,"L",this.plotLeft-1,e,"L",this.plotLeft-1,t,"L",0,t,"Z","M",w,e,"L",this.chartWidth,e,"L",this.chartWidth,t,"L",w,t,"Z"]:["M",0,0]})}})(K);(function(a){var C,F=a.each,D=
a.extend,r=a.erase,g=a.fireEvent,e=a.format,t=a.isArray,w=a.isNumber,l=a.pick,u=a.removeEvent;a.Point=C=function(){};a.Point.prototype={init:function(a,d,e){this.series=a;this.color=a.color;this.applyOptions(d,e);a.options.colorByPoint?(d=a.options.colors||a.chart.options.colors,this.color=this.color||d[a.colorCounter],d=d.length,e=a.colorCounter,a.colorCounter++,a.colorCounter===d&&(a.colorCounter=0)):e=a.colorIndex;this.colorIndex=l(this.colorIndex,e);a.chart.pointCount++;g(this,"afterInit");return this},
applyOptions:function(a,d){var c=this.series,e=c.options.pointValKey||c.pointValKey;a=C.prototype.optionsToObject.call(this,a);D(this,a);this.options=this.options?D(this.options,a):a;a.group&&delete this.group;e&&(this.y=this[e]);this.isNull=l(this.isValid&&!this.isValid(),null===this.x||!w(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===d&&c.xAxis&&c.xAxis.hasNames&&(this.x=c.xAxis.nameToX(this));void 0===this.x&&c&&(this.x=void 0===d?c.autoIncrement(this):d);return this},
setNestedProperty:function(c,d,e){e=e.split(".");a.reduce(e,function(c,e,f,b){c[e]=b.length-1===f?d:a.isObject(c[e],!0)?c[e]:{};return c[e]},c);return c},optionsToObject:function(c){var d={},e=this.series,g=e.options.keys,p=g||e.pointArrayMap||["y"],f=p.length,b=0,n=0;if(w(c)||null===c)d[p[0]]=c;else if(t(c))for(!g&&c.length>f&&(e=typeof c[0],"string"===e?d.name=c[0]:"number"===e&&(d.x=c[0]),b++);n<f;)g&&void 0===c[b]||(0<p[n].indexOf(".")?a.Point.prototype.setNestedProperty(d,c[b],p[n]):d[p[n]]=
c[b]),b++,n++;else"object"===typeof c&&(d=c,c.dataLabels&&(e._hasPointLabels=!0),c.marker&&(e._hasPointMarkers=!0));return d},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",
""):"")},getZone:function(){var a=this.series,d=a.zones,a=a.zoneAxis||"y",e=0,g;for(g=d[e];this[a]>=g.value;)g=d[++e];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=g&&g.color&&!this.options.color?g.color:this.nonZonedColor;return g},destroy:function(){var a=this.series.chart,d=a.hoverPoints,e;a.pointCount--;d&&(this.setState(),r(d,this),d.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)u(this),this.destroyElements();this.legendItem&&
a.legend.destroyItem(this);for(e in this)this[e]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],d,e=6;e--;)d=a[e],this[d]&&(this[d]=this[d].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var c=this.series,g=c.tooltipOptions,
t=l(g.valueDecimals,""),p=g.valuePrefix||"",f=g.valueSuffix||"";F(c.pointArrayMap||["y"],function(b){b="{point."+b;if(p||f)a=a.replace(RegExp(b+"}","g"),p+b+"}"+f);a=a.replace(RegExp(b+"}","g"),b+":,."+t+"f}")});return e(a,{point:this,series:this.series},c.chart.time)},firePointEvent:function(a,d,e){var c=this,k=this.series.options;(k.point.events[a]||c.options&&c.options.events&&c.options.events[a])&&this.importEvents();"click"===a&&k.allowPointSelect&&(e=function(a){c.select&&c.select(null,a.ctrlKey||
a.metaKey||a.shiftKey)});g(this,a,d,e)},visible:!0}})(K);(function(a){var C=a.addEvent,F=a.animObject,D=a.arrayMax,r=a.arrayMin,g=a.correctFloat,e=a.defaultOptions,t=a.defaultPlotOptions,w=a.defined,l=a.each,u=a.erase,c=a.extend,d=a.fireEvent,k=a.grep,x=a.isArray,p=a.isNumber,f=a.isString,b=a.merge,n=a.objectEach,z=a.pick,J=a.removeEvent,q=a.splat,L=a.SVGElement,B=a.syncTimeout,H=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},
marker:{lineWidth:0,lineColor:"#ffffff",enabledThreshold:2,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,
softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var f=this,e,m=a.series,h;f.chart=a;f.options=b=f.setOptions(b);f.linkedSeries=[];f.bindAxes();c(f,{name:b.name,
state:"",visible:!1!==b.visible,selected:!0===b.selected});e=b.events;n(e,function(a,b){C(f,b,a)});if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;f.getColor();f.getSymbol();l(f.parallelArrays,function(a){f[a+"Data"]=[]});f.setData(b.data,!1);f.isCartesian&&(a.hasCartesianSeries=!0);m.length&&(h=m[m.length-1]);f._i=z(h&&h._i,-1)+1;a.orderSeries(this.insert(m));d(this,"afterInit")},insert:function(a){var b=this.options.index,c;if(p(b)){for(c=a.length;c--;)if(b>=
z(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return z(c,a.length-1)},bindAxes:function(){var b=this,c=b.options,d=b.chart,f;l(b.axisTypes||[],function(e){l(d[e],function(a){f=a.options;if(c[e]===f.index||void 0!==c[e]&&c[e]===f.id||void 0===c[e]&&0===f.index)b.insert(a.series),b[e]=a,a.isDirty=!0});b[e]||b.optionalAxis===e||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments,f=p(b)?function(d){var f="y"===d&&c.toYData?
c.toYData(a):a[d];c[d+"Data"][b]=f}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))};l(c.parallelArrays,f)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,f=this.chart.time,b=z(b,a.pointStart,0);this.pointInterval=c=z(this.pointInterval,a.pointInterval,1);d&&(a=new f.Date(b),"day"===d?f.set("Date",a,f.get("Date",a)+c):"month"===d?f.set("Month",a,f.get("Month",a)+c):"year"===d&&f.set("FullYear",a,f.get("FullYear",a)+c),c=a.getTime()-
b);this.xIncrement=b+c;return b},setOptions:function(a){var c=this.chart,f=c.options,m=f.plotOptions,g=(c.userOptions||{}).plotOptions||{},h=m[this.type];this.userOptions=a;c=b(h,m.series,a);this.tooltipOptions=b(e.tooltip,e.plotOptions.series&&e.plotOptions.series.tooltip,e.plotOptions[this.type].tooltip,f.tooltip.userOptions,m.series&&m.series.tooltip,m[this.type].tooltip,a.tooltip);this.stickyTracking=z(a.stickyTracking,g[this.type]&&g[this.type].stickyTracking,g.series&&g.series.stickyTracking,
this.tooltipOptions.shared&&!this.noSharedTooltip?!0:c.stickyTracking);null===h.marker&&delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();!c.negativeColor&&!c.negativeFillColor||c.zones||a.push({value:c[this.zoneAxis+"Threshold"]||c.threshold||0,className:"highcharts-negative",color:c.negativeColor,fillColor:c.negativeFillColor});a.length&&w(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});d(this,"afterSetOptions",{options:c});return c},getName:function(){return this.name||
"Series "+(this.index+1)},getCyclic:function(a,b,c){var d,f=this.chart,h=this.userOptions,e=a+"Index",m=a+"Counter",g=c?c.length:z(f.options.chart[a+"Count"],f[a+"Count"]);b||(d=z(h[e],h["_"+e]),w(d)||(f.series.length||(f[m]=0),h["_"+e]=d=f[m]%g,f[m]+=1),c&&(b=c[d]));void 0!==d&&(this[e]=d);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||t[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",
this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,updateData:function(b){var c=this.options,d=this.points,f=[],e,h,m,g=this.requireSorting;l(b,function(b){var h;h=a.defined(b)&&this.pointClass.prototype.optionsToObject.call({series:this},b).x;p(h)&&(h=a.inArray(h,this.xData,m),-1===h?f.push(b):b!==c.data[h]?(d[h].update(b,!1,null,!1),d[h].touched=!0,g&&(m=h)):d[h]&&(d[h].touched=!0),e=!0)},this);if(e)for(b=d.length;b--;)h=d[b],h.touched||h.remove(!1),
h.touched=!1;else if(b.length===d.length)l(b,function(a,b){d[b].update&&a!==c.data[b]&&d[b].update(a,!1,null,!1)});else return!1;l(f,function(a){this.addPoint(a,!1)},this);return!0},setData:function(b,c,d,e){var m=this,h=m.points,g=h&&h.length||0,q,k=m.options,A=m.chart,n=null,E=m.xAxis,B=k.turboThreshold,t=this.xData,r=this.yData,u=(q=m.pointArrayMap)&&q.length,H;b=b||[];q=b.length;c=z(c,!0);!1!==e&&q&&g&&!m.cropped&&!m.hasGroupedData&&m.visible&&(H=this.updateData(b));if(!H){m.xIncrement=null;m.colorCounter=
0;l(this.parallelArrays,function(a){m[a+"Data"].length=0});if(B&&q>B){for(d=0;null===n&&d<q;)n=b[d],d++;if(p(n))for(d=0;d<q;d++)t[d]=this.autoIncrement(),r[d]=b[d];else if(x(n))if(u)for(d=0;d<q;d++)n=b[d],t[d]=n[0],r[d]=n.slice(1,u+1);else for(d=0;d<q;d++)n=b[d],t[d]=n[0],r[d]=n[1];else a.error(12)}else for(d=0;d<q;d++)void 0!==b[d]&&(n={series:m},m.pointClass.prototype.applyOptions.apply(n,[b[d]]),m.updateParallelArrays(n,d));r&&f(r[0])&&a.error(14,!0);m.data=[];m.options.data=m.userOptions.data=
b;for(d=g;d--;)h[d]&&h[d].destroy&&h[d].destroy();E&&(E.minRange=E.userMinRange);m.isDirty=A.isDirtyBox=!0;m.isDirtyData=!!h;d=!1}"point"===k.legendType&&(this.processData(),this.generatePoints());c&&A.redraw(d)},processData:function(b){var c=this.xData,d=this.yData,f=c.length,e;e=0;var h,m,g=this.xAxis,q,k=this.options;q=k.cropThreshold;var p=this.getExtremesFromAll||k.getExtremesFromAll,n=this.isCartesian,k=g&&g.val2lin,l=g&&g.isLog,B=this.requireSorting,t,r;if(n&&!this.isDirty&&!g.isDirty&&!this.yAxis.isDirty&&
!b)return!1;g&&(b=g.getExtremes(),t=b.min,r=b.max);if(n&&this.sorted&&!p&&(!q||f>q||this.forceCrop))if(c[f-1]<t||c[0]>r)c=[],d=[];else if(c[0]<t||c[f-1]>r)e=this.cropData(this.xData,this.yData,t,r),c=e.xData,d=e.yData,e=e.start,h=!0;for(q=c.length||1;--q;)f=l?k(c[q])-k(c[q-1]):c[q]-c[q-1],0<f&&(void 0===m||f<m)?m=f:0>f&&B&&(a.error(15),B=!1);this.cropped=h;this.cropStart=e;this.processedXData=c;this.processedYData=d;this.closestPointRange=m},cropData:function(a,b,c,d,f){var h=a.length,e=0,m=h,g;f=
z(f,this.cropShoulder,1);for(g=0;g<h;g++)if(a[g]>=c){e=Math.max(0,g-f);break}for(c=g;c<h;c++)if(a[c]>d){m=c+f;break}return{xData:a.slice(e,m),yData:b.slice(e,m),start:e,end:m}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,d,f=this.processedXData,h=this.processedYData,e=this.pointClass,g=f.length,k=this.cropStart||0,p,n=this.hasGroupedData,a=a.keys,l,B=[],t;c||n||(c=[],c.length=b.length,c=this.data=c);a&&n&&(this.options.keys=!1);for(t=0;t<g;t++)p=k+t,n?(l=(new e).init(this,[f[t]].concat(q(h[t]))),
l.dataGroup=this.groupMap[t]):(l=c[p])||void 0===b[p]||(c[p]=l=(new e).init(this,b[p],f[t])),l&&(l.index=p,B[t]=l);this.options.keys=a;if(c&&(g!==(d=c.length)||n))for(t=0;t<d;t++)t!==k||n||(t+=g),c[t]&&(c[t].destroyElements(),c[t].plotX=void 0);this.data=c;this.points=B},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,d,f=[],h=0;d=this.xAxis.getExtremes();var e=d.min,m=d.max,g,q,k=this.requireSorting?1:0,n,l;a=a||this.stackedYData||this.processedYData||[];d=a.length;for(l=0;l<d;l++)if(q=
c[l],n=a[l],g=(p(n,!0)||x(n))&&(!b.positiveValuesOnly||n.length||0<n),q=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[l+k]||q)>=e&&(c[l-k]||q)<=m,g&&q)if(g=n.length)for(;g--;)"number"===typeof n[g]&&(f[h++]=n[g]);else f[h++]=n;this.dataMin=r(f);this.dataMax=D(f)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,c=this.xAxis,f=c.categories,e=this.yAxis,h=this.points,q=h.length,k=!!this.modifyValue,n=a.pointPlacement,
l="between"===n||p(n),t=a.threshold,B=a.startFromThreshold?t:0,r,x,u,H,J=Number.MAX_VALUE;"between"===n&&(n=.5);p(n)&&(n*=z(a.pointRange||c.pointRange));for(a=0;a<q;a++){var L=h[a],C=L.x,D=L.y;x=L.low;var F=b&&e.stacks[(this.negStacks&&D<(B?0:t)?"-":"")+this.stackKey],K;e.positiveValuesOnly&&null!==D&&0>=D&&(L.isNull=!0);L.plotX=r=g(Math.min(Math.max(-1E5,c.translate(C,0,0,0,1,n,"flags"===this.type)),1E5));b&&this.visible&&!L.isNull&&F&&F[C]&&(H=this.getStackIndicator(H,C,this.index),K=F[C],D=K.points[H.key],
x=D[0],D=D[1],x===B&&H.key===F[C].base&&(x=z(p(t)&&t,e.min)),e.positiveValuesOnly&&0>=x&&(x=null),L.total=L.stackTotal=K.total,L.percentage=K.total&&L.y/K.total*100,L.stackY=D,K.setOffset(this.pointXOffset||0,this.barW||0));L.yBottom=w(x)?Math.min(Math.max(-1E5,e.translate(x,0,1,0,1)),1E5):null;k&&(D=this.modifyValue(D,L));L.plotY=x="number"===typeof D&&Infinity!==D?Math.min(Math.max(-1E5,e.translate(D,0,1,0,1)),1E5):void 0;L.isInside=void 0!==x&&0<=x&&x<=e.len&&0<=r&&r<=c.len;L.clientX=l?g(c.translate(C,
0,0,0,1,n)):r;L.negative=L.y<(t||0);L.category=f&&void 0!==f[L.x]?f[L.x]:L.x;L.isNull||(void 0!==u&&(J=Math.min(J,Math.abs(r-u))),u=r);L.zone=this.zones.length&&L.getZone()}this.closestPointRangePx=J;d(this,"afterTranslate")},getValidPoints:function(a,b){var c=this.chart;return k(a||this.points||[],function(a){return b&&!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,f=b.inverted,h=this.clipBox,e=h||b.clipBox,m=this.sharedClipKey||
["_sharedClip",a&&a.duration,a&&a.easing,e.height,c.xAxis,c.yAxis].join(),g=b[m],q=b[m+"m"];g||(a&&(e.width=0,f&&(e.x=b.plotSizeX),b[m+"m"]=q=d.clipRect(f?b.plotSizeX+99:-99,f?-b.plotLeft:-b.plotTop,99,f?b.chartWidth:b.chartHeight)),b[m]=g=d.clipRect(e),g.count={length:0});a&&!g.count[this.index]&&(g.count[this.index]=!0,g.count.length+=1);!1!==c.clip&&(this.group.clip(a||h?g:b.clipRect),this.markerGroup.clip(q),this.sharedClipKey=m);a||(g.count[this.index]&&(delete g.count[this.index],--g.count.length),
0===g.count.length&&m&&b[m]&&(h||(b[m]=b[m].destroy()),b[m+"m"]&&(b[m+"m"]=b[m+"m"].destroy())))},animate:function(a){var b=this.chart,c=F(this.options.animation),d;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX,x:0},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99,x:0},c),this.animate=null)},afterAnimate:function(){this.setClip();d(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,c,d,f,h,e=this.options.marker,
g,q,k,p=this[this.specialGroup]||this.markerGroup,n,l=z(e.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>=e.enabledThreshold*e.radius);if(!1!==e.enabled||this._hasPointMarkers)for(c=0;c<a.length;c++)d=a[c],h=d.graphic,g=d.marker||{},q=!!d.marker,f=l&&void 0===g.enabled||g.enabled,k=d.isInside,f&&!d.isNull?(f=z(g.symbol,this.symbol),n=this.markerAttribs(d,d.selected&&"select"),h?h[k?"show":"hide"](!0).animate(n):k&&(0<n.width||d.hasImage)&&(d.graphic=h=b.renderer.symbol(f,n.x,n.y,n.width,
n.height,q?g:e).add(p)),h&&h.attr(this.pointAttribs(d,d.selected&&"select")),h&&h.addClass(d.getClassName(),!0)):h&&(d.graphic=h.destroy())},markerAttribs:function(a,b){var c=this.options.marker,d=a.marker||{},f=d.symbol||c.symbol,h=z(d.radius,c.radius);b&&(c=c.states[b],b=d.states&&d.states[b],h=z(b&&b.radius,c&&c.radius,h+(c&&c.radiusPlus||0)));a.hasImage=f&&0===f.indexOf("url");a.hasImage&&(h=0);a={x:Math.floor(a.plotX)-h,y:a.plotY-h};h&&(a.width=a.height=2*h);return a},pointAttribs:function(a,
b){var c=this.options.marker,d=a&&a.options,f=d&&d.marker||{},h=this.color,e=d&&d.color,g=a&&a.color,d=z(f.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;h=e||a||g||h;a=f.fillColor||c.fillColor||h;h=f.lineColor||c.lineColor||h;b&&(c=c.states[b],b=f.states&&f.states[b]||{},d=z(b.lineWidth,c.lineWidth,d+z(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,h=b.lineColor||c.lineColor||h);return{stroke:h,"stroke-width":d,fill:a}},destroy:function(){var b=this,c=b.chart,f=/AppleWebKit\/533/.test(H.navigator.userAgent),
e,g,h=b.data||[],q,k;d(b,"destroy");J(b);l(b.axisTypes||[],function(a){(k=b[a])&&k.series&&(u(k.series,b),k.isDirty=k.forceRedraw=!0)});b.legendItem&&b.chart.legend.destroyItem(b);for(g=h.length;g--;)(q=h[g])&&q.destroy&&q.destroy();b.points=null;a.clearTimeout(b.animationTimeout);n(b,function(a,b){a instanceof L&&!a.survive&&(e=f&&"group"===b?"hide":"destroy",a[e]())});c.hoverSeries===b&&(c.hoverSeries=null);u(c.series,b);c.orderSeries();n(b,function(a,c){delete b[c]})},getGraphPath:function(a,b,
c){var d=this,f=d.options,h=f.step,e,g=[],m=[],q;a=a||d.points;(e=a.reversed)&&a.reverse();(h={right:1,center:2}[h]||h&&3)&&e&&(h=4-h);!f.connectNulls||b||c||(a=this.getValidPoints(a));l(a,function(e,k){var n=e.plotX,p=e.plotY,l=a[k-1];(e.leftCliff||l&&l.rightCliff)&&!c&&(q=!0);e.isNull&&!w(b)&&0<k?q=!f.connectNulls:e.isNull&&!b?q=!0:(0===k||q?k=["M",e.plotX,e.plotY]:d.getPointSpline?k=d.getPointSpline(a,e,k):h?(k=1===h?["L",l.plotX,p]:2===h?["L",(l.plotX+n)/2,l.plotY,"L",(l.plotX+n)/2,p]:["L",n,
l.plotY],k.push("L",n,p)):k=["L",n,p],m.push(e.x),h&&(m.push(e.x),2===h&&m.push(e.x)),g.push.apply(g,k),q=!1)});g.xMap=m;return d.graphPath=g},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),d=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]],d=a.getZonesGraphs(d);l(d,function(d,f){var e=d[0],h=a[e];h?(h.endX=a.preventGraphAnimation?null:c.xMap,h.animate({d:c})):c.length&&(a[e]=a.chart.renderer.path(c).addClass(d[1]).attr({zIndex:1}).add(a.group),
h={stroke:d[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},d[3]?h.dashstyle=d[3]:"square"!==b.linecap&&(h["stroke-linecap"]=h["stroke-linejoin"]="round"),h=a[e].attr(h).shadow(2>f&&b.shadow));h&&(h.startX=c.xMap,h.isArea=c.isArea)})},getZonesGraphs:function(a){l(this.zones,function(b,c){a.push(["zone-graph-"+c,"highcharts-graph highcharts-zone-graph-"+c+" "+(b.className||""),b.color||this.color,b.dashStyle||this.options.dashStyle])},this);return a},applyZones:function(){var a=this,
b=this.chart,c=b.renderer,d=this.zones,f,e,g=this.clips||[],q,k=this.graph,n=this.area,p=Math.max(b.chartWidth,b.chartHeight),t=this[(this.zoneAxis||"y")+"Axis"],B,r,x=b.inverted,u,H,w,L,J=!1;d.length&&(k||n)&&t&&void 0!==t.min&&(r=t.reversed,u=t.horiz,k&&!this.showLine&&k.hide(),n&&n.hide(),B=t.getExtremes(),l(d,function(d,h){f=r?u?b.plotWidth:0:u?0:t.toPixels(B.min);f=Math.min(Math.max(z(e,f),0),p);e=Math.min(Math.max(Math.round(t.toPixels(z(d.value,B.max),!0)),0),p);J&&(f=e=t.toPixels(B.max));
H=Math.abs(f-e);w=Math.min(f,e);L=Math.max(f,e);t.isXAxis?(q={x:x?L:w,y:0,width:H,height:p},u||(q.x=b.plotHeight-q.x)):(q={x:0,y:x?L:w,width:p,height:H},u&&(q.y=b.plotWidth-q.y));x&&c.isVML&&(q=t.isXAxis?{x:0,y:r?w:L,height:q.width,width:b.chartWidth}:{x:q.y-b.plotLeft-b.spacingBox.x,y:0,width:q.height,height:b.chartHeight});g[h]?g[h].animate(q):(g[h]=c.clipRect(q),k&&a["zone-graph-"+h].clip(g[h]),n&&a["zone-area-"+h].clip(g[h]));J=d.value>B.max;a.resetZones&&0===e&&(e=void 0)}),this.clips=g)},invertGroups:function(a){function b(){l(["group",
"markerGroup"],function(b){c[b]&&(d.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,d=c.chart,f;c.xAxis&&(f=C(d,"resize",b),C(c,"destroy",f),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,d,f){var e=this[a],g=!e;g&&(this[a]=e=this.chart.renderer.g().attr({zIndex:d||.1}).add(f));e.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(w(this.colorIndex)?"highcharts-color-"+
this.colorIndex+" ":"")+(this.options.className||"")+(e.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);e.attr({visibility:c})[g?"attr":"animate"](this.getPlotBox());return e},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,f=a.options,e=!!a.animate&&b.renderer.isSVG&&F(f.animation).duration,h=a.visible?"inherit":
"hidden",g=f.zIndex,q=a.hasRendered,k=b.seriesGroup,n=b.inverted;c=a.plotGroup("group","series",h,g,k);a.markerGroup=a.plotGroup("markerGroup","markers",h,g,k);e&&a.animate(!0);c.inverted=a.isCartesian?n:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(n);!1===f.clip||a.sharedClipKey||q||c.clip(b.clipRect);e&&a.animate();q||(a.animationTimeout=B(function(){a.afterAnimate()},
e));a.isDirty=!1;a.hasRendered=!0;d(a,"afterRender")},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,d=this.xAxis,f=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:z(d&&d.left,a.plotLeft),translateY:z(f&&f.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,f=this.chart.inverted;return this.searchKDTree({clientX:f?
c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:f?d.len-a.chartX+d.pos:a.chartY-d.pos},b)},buildKDTree:function(){function a(c,d,f){var e,h;if(h=c&&c.length)return e=b.kdAxisArray[d%f],c.sort(function(a,b){return a[e]-b[e]}),h=Math.floor(h/2),{point:c[h],left:a(c.slice(0,h),d+1,f),right:a(c.slice(h+1),d+1,f)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;B(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?
0:1)},searchKDTree:function(a,b){function c(a,b,h,m){var q=b.point,k=d.kdAxisArray[h%m],n,p,l=q;p=w(a[f])&&w(q[f])?Math.pow(a[f]-q[f],2):null;n=w(a[e])&&w(q[e])?Math.pow(a[e]-q[e],2):null;n=(p||0)+(n||0);q.dist=w(n)?Math.sqrt(n):Number.MAX_VALUE;q.distX=w(p)?Math.sqrt(p):Number.MAX_VALUE;k=a[k]-q[k];n=0>k?"left":"right";p=0>k?"right":"left";b[n]&&(n=c(a,b[n],h+1,m),l=n[g]<l[g]?n:q);b[p]&&Math.sqrt(k*k)<l[g]&&(a=c(a,b[p],h+1,m),l=a[g]<l[g]?a:l);return l}var d=this,f=this.kdAxisArray[0],e=this.kdAxisArray[1],
g=b?"distX":"dist";b=-1<d.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(K);(function(a){var C=a.Axis,F=a.Chart,D=a.correctFloat,r=a.defined,g=a.destroyObjectProperties,e=a.each,t=a.format,w=a.objectEach,l=a.pick,u=a.Series;a.StackItem=function(a,d,e,g,p){var c=a.chart.inverted;this.axis=a;this.isNegative=e;this.options=d;this.x=g;this.total=null;this.points={};this.stack=p;this.rightCliff=this.leftCliff=
0;this.alignOptions={align:d.align||(c?e?"left":"right":"center"),verticalAlign:d.verticalAlign||(c?"middle":e?"bottom":"top"),y:l(d.y,c?4:e?14:-6),x:l(d.x,c?e?-6:6:0)};this.textAlign=d.textAlign||(c?e?"right":"left":"center")};a.StackItem.prototype={destroy:function(){g(this,this.axis)},render:function(a){var c=this.axis.chart,e=this.options,g=e.format,g=g?t(g,this,c.time):e.formatter.call(this);this.label?this.label.attr({text:g,visibility:"hidden"}):this.label=c.renderer.text(g,null,null,e.useHTML).css(e.style).attr({align:this.textAlign,
rotation:e.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,d){var c=this.axis,e=c.chart,g=c.translate(c.usePercentage?100:this.total,0,0,0,1),f=c.translate(0),f=Math.abs(g-f);a=e.xAxis[0].translate(this.x)+a;c=this.getStackBox(e,this,a,g,d,f,c);if(d=this.label)d.align(this.alignOptions,null,c),c=d.alignAttr,d[!1===this.options.crop||e.isInsidePlot(c.x,c.y)?"show":"hide"](!0)},getStackBox:function(a,d,e,g,p,f,b){var c=d.axis.reversed,k=a.inverted;a=b.height+b.pos-a.plotTop;d=d.isNegative&&
!c||!d.isNegative&&c;return{x:k?d?g:g-f:e,y:k?a-e-p:d?a-g-f:a-g,width:k?f:p,height:k?p:f}}};F.prototype.getStacks=function(){var a=this;e(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});e(a.series,function(c){!c.options.stacking||!0!==c.visible&&!1!==a.options.chart.ignoreHiddenSeries||(c.stackKey=c.type+l(c.options.stack,""))})};C.prototype.buildStacks=function(){var a=this.series,d=l(this.options.reversedStacks,!0),e=a.length,g;if(!this.isXAxis){this.usePercentage=!1;
for(g=e;g--;)a[d?g:e-g-1].setStackedPoints();for(g=0;g<e;g++)a[g].modifyStacks()}};C.prototype.renderStackTotals=function(){var a=this.chart,d=a.renderer,e=this.stacks,g=this.stackTotalGroup;g||(this.stackTotalGroup=g=d.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());g.translate(a.plotLeft,a.plotTop);w(e,function(a){w(a,function(a){a.render(g)})})};C.prototype.resetStacks=function(){var a=this,d=a.stacks;a.isXAxis||w(d,function(c){w(c,function(d,e){d.touched<a.stacksTouched?(d.destroy(),
delete c[e]):(d.total=null,d.cumulative=null)})})};C.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),w(a,function(a){w(a,function(a){a.cumulative=a.total})}))};u.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var c=this.processedXData,d=this.processedYData,e=[],g=d.length,p=this.options,f=p.threshold,b=l(p.startFromThreshold&&f,0),n=p.stack,p=p.stacking,t=this.stackKey,
u="-"+t,q=this.negStacks,w=this.yAxis,B=w.stacks,H=w.oldStacks,m,E,A,M,G,h,v;w.stacksTouched+=1;for(G=0;G<g;G++)h=c[G],v=d[G],m=this.getStackIndicator(m,h,this.index),M=m.key,A=(E=q&&v<(b?0:f))?u:t,B[A]||(B[A]={}),B[A][h]||(H[A]&&H[A][h]?(B[A][h]=H[A][h],B[A][h].total=null):B[A][h]=new a.StackItem(w,w.options.stackLabels,E,h,n)),A=B[A][h],null!==v?(A.points[M]=A.points[this.index]=[l(A.cumulative,b)],r(A.cumulative)||(A.base=M),A.touched=w.stacksTouched,0<m.index&&!1===this.singleStacks&&(A.points[M][0]=
A.points[this.index+","+h+",0"][0])):A.points[M]=A.points[this.index]=null,"percent"===p?(E=E?t:u,q&&B[E]&&B[E][h]?(E=B[E][h],A.total=E.total=Math.max(E.total,A.total)+Math.abs(v)||0):A.total=D(A.total+(Math.abs(v)||0))):A.total=D(A.total+(v||0)),A.cumulative=l(A.cumulative,b)+(v||0),null!==v&&(A.points[M].push(A.cumulative),e[G]=A.cumulative);"percent"===p&&(w.usePercentage=!0);this.stackedYData=e;w.oldStacks={}}};u.prototype.modifyStacks=function(){var a=this,d=a.stackKey,g=a.yAxis.stacks,l=a.processedXData,
p,f=a.options.stacking;a[f+"Stacker"]&&e([d,"-"+d],function(b){for(var c=l.length,d,e;c--;)if(d=l[c],p=a.getStackIndicator(p,d,a.index,b),e=(d=g[b]&&g[b][d])&&d.points[p.key])a[f+"Stacker"](e,d,c)})};u.prototype.percentStacker=function(a,d,e){d=d.total?100/d.total:0;a[0]=D(a[0]*d);a[1]=D(a[1]*d);this.stackedYData[e]=a[1]};u.prototype.getStackIndicator=function(a,d,e,g){!r(a)||a.x!==d||g&&a.key!==g?a={x:d,index:0,key:g}:a.index++;a.key=[e,d,a.index].join();return a}})(K);(function(a){var C=a.addEvent,
F=a.animate,D=a.Axis,r=a.createElement,g=a.css,e=a.defined,t=a.each,w=a.erase,l=a.extend,u=a.fireEvent,c=a.inArray,d=a.isNumber,k=a.isObject,x=a.isArray,p=a.merge,f=a.objectEach,b=a.pick,n=a.Point,z=a.Series,J=a.seriesTypes,q=a.setAnimation,L=a.splat;l(a.Chart.prototype,{addSeries:function(a,c,d){var f,e=this;a&&(c=b(c,!0),u(e,"addSeries",{options:a},function(){f=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();u(e,"afterAddSeries");c&&e.redraw(d)}));return f},addAxis:function(a,c,d,f){var e=c?"xAxis":
"yAxis",g=this.options;a=p(a,{index:this[e].length,isX:c});c=new D(this,a);g[e]=L(g[e]||{});g[e].push(a);b(d,!0)&&this.redraw(f);return c},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,f=c.loading,e=function(){d&&g(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};d||(b.loadingDiv=d=r("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=r("span",{className:"highcharts-loading-inner"},null,d),C(b,
"redraw",e));d.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;g(d,l(f.style,{zIndex:10}));g(b.loadingSpan,f.labelStyle);b.loadingShown||(g(d,{opacity:0,display:""}),F(d,{opacity:f.style.opacity||.5},{duration:f.showDuration||0}));b.loadingShown=!0;e()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",F(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){g(b,{display:"none"})}}));
this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),update:function(a,g,m,q){var k=this,n={credits:"addCredits",
title:"setTitle",subtitle:"setSubtitle"},l=a.chart,h,v,r=[];u(k,"update",{options:a});if(l){p(!0,k.options.chart,l);"className"in l&&k.setClassName(l.className);"reflow"in l&&k.setReflow(l.reflow);if("inverted"in l||"polar"in l)k.propFromSeries(),h=!0;"alignTicks"in l&&(h=!0);f(l,function(a,b){-1!==c("chart."+b,k.propsRequireUpdateSeries)&&(v=!0);-1!==c(b,k.propsRequireDirtyBox)&&(k.isDirtyBox=!0)});"style"in l&&k.renderer.setStyle(l.style)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&
p(!0,this.options.plotOptions,a.plotOptions);f(a,function(a,b){if(k[b]&&"function"===typeof k[b].update)k[b].update(a,!1);else if("function"===typeof k[n[b]])k[n[b]](a);"chart"!==b&&-1!==c(b,k.propsRequireUpdateSeries)&&(v=!0)});t("xAxis yAxis zAxis series colorAxis pane".split(" "),function(b){a[b]&&(t(L(a[b]),function(a,c){(c=e(a.id)&&k.get(a.id)||k[b][c])&&c.coll===b&&(c.update(a,!1),m&&(c.touched=!0));if(!c&&m)if("series"===b)k.addSeries(a,!1).touched=!0;else if("xAxis"===b||"yAxis"===b)k.addAxis(a,
"xAxis"===b,!1).touched=!0}),m&&t(k[b],function(a){a.touched?delete a.touched:r.push(a)}))});t(r,function(a){a.remove(!1)});h&&t(k.axes,function(a){a.update({},!1)});v&&t(k.series,function(a){a.update({},!1)});a.loading&&p(!0,k.options.loading,a.loading);h=l&&l.width;l=l&&l.height;d(h)&&h!==k.chartWidth||d(l)&&l!==k.chartHeight?k.setSize(h,l,q):b(g,!0)&&k.redraw(q)},setSubtitle:function(a){this.setTitle(void 0,a)}});l(n.prototype,{update:function(a,c,d,f){function e(){g.applyOptions(a);null===g.y&&
h&&(g.graphic=h.destroy());k(a,!0)&&(h&&h.element&&a&&a.marker&&void 0!==a.marker.symbol&&(g.graphic=h.destroy()),a&&a.dataLabels&&g.dataLabel&&(g.dataLabel=g.dataLabel.destroy()),g.connector&&(g.connector=g.connector.destroy()));m=g.index;q.updateParallelArrays(g,m);p.data[m]=k(p.data[m],!0)||k(a,!0)?g.options:b(a,p.data[m]);q.isDirty=q.isDirtyData=!0;!q.fixedBox&&q.hasCartesianSeries&&(n.isDirtyBox=!0);"point"===p.legendType&&(n.isDirtyLegend=!0);c&&n.redraw(d)}var g=this,q=g.series,h=g.graphic,
m,n=q.chart,p=q.options;c=b(c,!0);!1===f?e():g.firePointEvent("update",{options:a},e)},remove:function(a,b){this.series.removePoint(c(this,this.series.data),a,b)}});l(z.prototype,{addPoint:function(a,c,d,f){var e=this.options,g=this.data,q=this.chart,h=this.xAxis,h=h&&h.hasNames&&h.names,m=e.data,k,n,p=this.xData,l,t;c=b(c,!0);k={series:this};this.pointClass.prototype.applyOptions.apply(k,[a]);t=k.x;l=p.length;if(this.requireSorting&&t<p[l-1])for(n=!0;l&&p[l-1]>t;)l--;this.updateParallelArrays(k,
"splice",l,0,0);this.updateParallelArrays(k,l);h&&k.name&&(h[t]=k.name);m.splice(l,0,a);n&&(this.data.splice(l,0,null),this.processData());"point"===e.legendType&&this.generatePoints();d&&(g[0]&&g[0].remove?g[0].remove(!1):(g.shift(),this.updateParallelArrays(k,"shift"),m.shift()));this.isDirtyData=this.isDirty=!0;c&&q.redraw(f)},removePoint:function(a,c,d){var f=this,e=f.data,g=e[a],m=f.points,h=f.chart,k=function(){m&&m.length===e.length&&m.splice(a,1);e.splice(a,1);f.options.data.splice(a,1);f.updateParallelArrays(g||
{series:f},"splice",a,1);g&&g.destroy();f.isDirty=!0;f.isDirtyData=!0;c&&h.redraw()};q(d,h);c=b(c,!0);g?g.firePointEvent("remove",null,k):k()},remove:function(a,c,d){function f(){e.destroy();g.isDirtyLegend=g.isDirtyBox=!0;g.linkSeries();b(a,!0)&&g.redraw(c)}var e=this,g=e.chart;!1!==d?u(e,"remove",null,f):f()},update:function(d,f){var e=this,g=e.chart,q=e.userOptions,k=e.oldType||e.type,n=d.type||q.type||g.options.chart.type,h=J[k].prototype,r,B=["group","markerGroup","dataLabelsGroup"],x=["navigatorSeries",
"baseSeries"],z=e.finishedAnimating&&{animation:!1},w=["data","name","turboThreshold"],H=a.keys(d),y=0<H.length;t(H,function(a){-1===c(a,w)&&(y=!1)});if(y)d.data&&this.setData(d.data,!1),d.name&&this.setName(d.name,!1);else{x=B.concat(x);t(x,function(a){x[a]=e[a];delete e[a]});d=p(q,z,{index:e.index,pointStart:b(q.pointStart,e.xData[0])},{data:e.options.data},d);e.remove(!1,null,!1);for(r in h)e[r]=void 0;J[n||k]?l(e,J[n||k].prototype):a.error(17,!0);t(x,function(a){e[a]=x[a]});e.init(g,d);d.zIndex!==
q.zIndex&&t(B,function(a){e[a]&&e[a].attr({zIndex:d.zIndex})});e.oldType=k;g.linkSeries()}u(this,"afterUpdate");b(f,!0)&&g.redraw(!1)},setName:function(a){this.name=this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0}});l(D.prototype,{update:function(a,c){var d=this.chart;a=p(this.userOptions,a);d.options[this.coll].indexOf&&(d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)]=a);this.destroy(!0);this.init(d,l(a,{events:void 0}));d.isDirtyBox=!0;b(c,!0)&&d.redraw()},
remove:function(a){for(var c=this.chart,d=this.coll,f=this.series,e=f.length;e--;)f[e]&&f[e].remove(!1);w(c.axes,this);w(c[d],this);x(c.options[d])?c.options[d].splice(this.options.index,1):delete c.options[d];t(c[d],function(a,b){a.options.index=a.userOptions.index=b});this.destroy();c.isDirtyBox=!0;b(a,!0)&&c.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(K);(function(a){var C=a.color,F=a.each,D=a.map,r=a.pick,g=a.Series,
e=a.seriesType;e("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(e){var g=[],l=[],t=this.xAxis,c=this.yAxis,d=c.stacks[this.stackKey],k={},x=this.index,p=c.series,f=p.length,b,n=r(c.options.reversedStacks,!0)?1:-1,z;e=e||this.points;if(this.options.stacking){for(z=0;z<e.length;z++)e[z].leftNull=e[z].rightNull=null,k[e[z].x]=e[z];a.objectEach(d,function(a,b){null!==a.total&&l.push(b)});l.sort(function(a,b){return a-b});b=D(p,function(){return this.visible});F(l,
function(a,e){var q=0,p,r;if(k[a]&&!k[a].isNull)g.push(k[a]),F([-1,1],function(c){var g=1===c?"rightNull":"leftNull",q=0,m=d[l[e+c]];if(m)for(z=x;0<=z&&z<f;)p=m.points[z],p||(z===x?k[a][g]=!0:b[z]&&(r=d[a].points[z])&&(q-=r[1]-r[0])),z+=n;k[a][1===c?"rightCliff":"leftCliff"]=q});else{for(z=x;0<=z&&z<f;){if(p=d[a].points[z]){q=p[1];break}z+=n}q=c.translate(q,0,1,0,1);g.push({isNull:!0,plotX:t.translate(a,0,0,0,1),x:a,plotY:q,yBottom:q})}})}return g},getGraphPath:function(a){var e=g.prototype.getGraphPath,
l=this.options,t=l.stacking,c=this.yAxis,d,k,x=[],p=[],f=this.index,b,n=c.stacks[this.stackKey],z=l.threshold,J=c.getThreshold(l.threshold),q,l=l.connectNulls||"percent"===t,L=function(d,e,g){var q=a[d];d=t&&n[q.x].points[f];var k=q[g+"Null"]||0;g=q[g+"Cliff"]||0;var m,l,q=!0;g||k?(m=(k?d[0]:d[1])+g,l=d[0]+g,q=!!k):!t&&a[e]&&a[e].isNull&&(m=l=z);void 0!==m&&(p.push({plotX:b,plotY:null===m?J:c.getThreshold(m),isNull:q,isCliff:!0}),x.push({plotX:b,plotY:null===l?J:c.getThreshold(l),doCurve:!1}))};a=
a||this.points;t&&(a=this.getStackPoints(a));for(d=0;d<a.length;d++)if(k=a[d].isNull,b=r(a[d].rectPlotX,a[d].plotX),q=r(a[d].yBottom,J),!k||l)l||L(d,d-1,"left"),k&&!t&&l||(p.push(a[d]),x.push({x:d,plotX:b,plotY:q})),l||L(d,d+1,"right");d=e.call(this,p,!0,!0);x.reversed=!0;k=e.call(this,x,!0,!0);k.length&&(k[0]="L");k=d.concat(k);e=e.call(this,p,!1,l);k.xMap=d.xMap;this.areaPath=k;return e},drawGraph:function(){this.areaPath=[];g.prototype.drawGraph.apply(this);var a=this,e=this.areaPath,l=this.options,
u=[["area","highcharts-area",this.color,l.fillColor]];F(this.zones,function(c,d){u.push(["zone-area-"+d,"highcharts-area highcharts-zone-area-"+d+" "+c.className,c.color||a.color,c.fillColor||l.fillColor])});F(u,function(c){var d=c[0],g=a[d];g?(g.endX=a.preventGraphAnimation?null:e.xMap,g.animate({d:e})):(g=a[d]=a.chart.renderer.path(e).addClass(c[1]).attr({fill:r(c[3],C(c[2]).setOpacity(r(l.fillOpacity,.75)).get()),zIndex:0}).add(a.group),g.isArea=!0);g.startX=e.xMap;g.shiftUnit=l.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);
(function(a){var C=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,D,r){var g=D.plotX,e=D.plotY,t=a[r-1];r=a[r+1];var w,l,u,c;if(t&&!t.isNull&&!1!==t.doCurve&&!D.isCliff&&r&&!r.isNull&&!1!==r.doCurve&&!D.isCliff){a=t.plotY;u=r.plotX;r=r.plotY;var d=0;w=(1.5*g+t.plotX)/2.5;l=(1.5*e+a)/2.5;u=(1.5*g+u)/2.5;c=(1.5*e+r)/2.5;u!==w&&(d=(c-l)*(u-g)/(u-w)+e-c);l+=d;c+=d;l>a&&l>e?(l=Math.max(a,e),c=2*e-l):l<a&&l<e&&(l=Math.min(a,e),c=2*e-l);c>r&&c>e?(c=Math.max(r,e),l=2*e-c):c<r&&c<e&&
(c=Math.min(r,e),l=2*e-c);D.rightContX=u;D.rightContY=c}D=["C",C(t.rightContX,t.plotX),C(t.rightContY,t.plotY),C(w,g),C(l,e),g,e];t.rightContX=t.rightContY=null;return D}})})(K);(function(a){var C=a.seriesTypes.area.prototype,F=a.seriesType;F("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:C.getStackPoints,getGraphPath:C.getGraphPath,drawGraph:C.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);(function(a){var C=a.animObject,F=a.color,D=a.each,r=a.extend,g=a.isNumber,
e=a.merge,t=a.pick,w=a.Series,l=a.seriesType,u=a.svg;l("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],
negStacks:!0,init:function(){w.prototype.init.apply(this,arguments);var a=this,d=a.chart;d.hasRendered&&D(d.series,function(c){c.type===a.type&&(c.isDirty=!0)})},getColumnMetrics:function(){var a=this,d=a.options,e=a.xAxis,g=a.yAxis,p=e.reversed,f,b={},n=0;!1===d.grouping?n=1:D(a.chart.series,function(c){var d=c.options,e=c.yAxis,q;c.type!==a.type||!c.visible&&a.chart.options.chart.ignoreHiddenSeries||g.len!==e.len||g.pos!==e.pos||(d.stacking?(f=c.stackKey,void 0===b[f]&&(b[f]=n++),q=b[f]):!1!==d.grouping&&
(q=n++),c.columnIndex=q)});var l=Math.min(Math.abs(e.transA)*(e.ordinalSlope||d.pointRange||e.closestPointRange||e.tickInterval||1),e.len),r=l*d.groupPadding,q=(l-2*r)/(n||1),d=Math.min(d.maxPointWidth||e.len,t(d.pointWidth,q*(1-2*d.pointPadding)));a.columnMetrics={width:d,offset:(q-d)/2+(r+((a.columnIndex||0)+(p?1:0))*q-l/2)*(p?-1:1)};return a.columnMetrics},crispCol:function(a,d,e,g){var c=this.chart,f=this.borderWidth,b=-(f%2?.5:0),f=f%2?.5:1;c.inverted&&c.renderer.isVML&&(f+=1);this.options.crisp&&
(e=Math.round(a+e)+b,a=Math.round(a)+b,e-=a);g=Math.round(d+g)+f;b=.5>=Math.abs(d)&&.5<g;d=Math.round(d)+f;g-=d;b&&g&&(--d,g+=1);return{x:a,y:d,width:e,height:g}},translate:function(){var a=this,d=a.chart,e=a.options,g=a.dense=2>a.closestPointRange*a.xAxis.transA,g=a.borderWidth=t(e.borderWidth,g?0:1),p=a.yAxis,f=e.threshold,b=a.translatedThreshold=p.getThreshold(f),n=t(e.minPointLength,5),l=a.getColumnMetrics(),r=l.width,q=a.barW=Math.max(r,1+2*g),u=a.pointXOffset=l.offset;d.inverted&&(b-=.5);e.pointPadding&&
(q=Math.ceil(q));w.prototype.translate.apply(a);D(a.points,function(c){var e=t(c.yBottom,b),g=999+Math.abs(e),g=Math.min(Math.max(-g,c.plotY),p.len+g),k=c.plotX+u,l=q,x=Math.min(g,e),B,h=Math.max(g,e)-x;n&&Math.abs(h)<n&&(h=n,B=!p.reversed&&!c.negative||p.reversed&&c.negative,c.y===f&&a.dataMax<=f&&p.min<f&&(B=!B),x=Math.abs(x-b)>n?e-n:b-(B?n:0));c.barX=k;c.pointWidth=r;c.tooltipPos=d.inverted?[p.len+p.pos-d.plotLeft-g,a.xAxis.len-k-l/2,h]:[k+l/2,g+p.pos-d.plotTop,h];c.shapeType="rect";c.shapeArgs=
a.crispCol.apply(a,c.isNull?[k,b,l,0]:[k,x,l,h])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,d){var c=this.options,g,p=this.pointAttrToOptions||{};g=p.stroke||"borderColor";var f=p["stroke-width"]||"borderWidth",b=a&&a.color||this.color,n=a&&a[g]||c[g]||this.color||b,l=a&&a[f]||c[f]||this[f]||0,p=c.dashStyle;a&&this.zones.length&&(b=a.getZone(),b=a.options.color||
b&&b.color||this.color);d&&(a=e(c.states[d],a.options.states&&a.options.states[d]||{}),d=a.brightness,b=a.color||void 0!==d&&F(b).brighten(a.brightness).get()||b,n=a[g]||n,l=a[f]||l,p=a.dashStyle||p);g={fill:b,stroke:n,"stroke-width":l};p&&(g.dashstyle=p);return g},drawPoints:function(){var a=this,d=this.chart,k=a.options,l=d.renderer,p=k.animationLimit||250,f;D(a.points,function(b){var c=b.graphic,t=c&&d.pointCount<p?"animate":"attr";if(g(b.plotY)&&null!==b.y){f=b.shapeArgs;if(c)c[t](e(f));else b.graphic=
c=l[b.shapeType](f).add(b.group||a.group);k.borderRadius&&c.attr({r:k.borderRadius});c[t](a.pointAttribs(b,b.selected&&"select")).shadow(k.shadow,null,k.stacking&&!k.borderRadius);c.addClass(b.getClassName(),!0)}else c&&(b.graphic=c.destroy())})},animate:function(a){var c=this,e=this.yAxis,g=c.options,p=this.chart.inverted,f={},b=p?"translateX":"translateY",n;u&&(a?(f.scaleY=.001,a=Math.min(e.pos+e.len,Math.max(e.pos,e.toPixels(g.threshold))),p?f.translateX=a-e.len:f.translateY=a,c.group.attr(f)):
(n=c.group.attr(b),c.group.animate({scaleY:1},r(C(c.options.animation),{step:function(a,d){f[b]=n+d.pos*(e.pos-n);c.group.attr(f)}})),c.animate=null))},remove:function(){var a=this,d=a.chart;d.hasRendered&&D(d.series,function(c){c.type===a.type&&(c.isDirty=!0)});w.prototype.remove.apply(a,arguments)}})})(K);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(K);(function(a){var C=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&C.prototype.drawGraph.call(this)}})})(K);(function(a){var C=a.deg2rad,F=a.isNumber,D=a.pick,r=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,e=this.chart,t=2*(a.slicedOffset||0),w=e.plotWidth-2*t,
e=e.plotHeight-2*t,l=a.center,l=[D(l[0],"50%"),D(l[1],"50%"),a.size||"100%",a.innerSize||0],u=Math.min(w,e),c,d;for(c=0;4>c;++c)d=l[c],a=2>c||2===c&&/%$/.test(d),l[c]=r(d,[w,e,u,l[2]][c])+(a?t:0);l[3]>l[2]&&(l[3]=l[2]);return l},getStartAndEndRadians:function(a,e){a=F(a)?a:0;e=F(e)&&e>a&&360>e-a?e:a+360;return{start:C*(a+-90),end:C*(e+-90)}}}})(K);(function(a){var C=a.addEvent,F=a.CenteredSeriesMixin,D=a.defined,r=a.each,g=a.extend,e=F.getStartAndEndRadians,t=a.inArray,w=a.noop,l=a.pick,u=a.Point,
c=a.Series,d=a.seriesType,k=a.setAnimation;d("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group",
"dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var c=this,d=c.points,b=c.startAngleRad;a||(r(d,function(a){var d=a.graphic,f=a.shapeArgs;d&&(d.attr({r:a.startR||c.center[3]/2,start:b,end:b}),d.animate({r:f.r,start:f.start,end:f.end},c.options.animation))}),c.animate=null)},updateTotals:function(){var a,c=0,d=this.points,b=d.length,e,g=this.options.ignoreHiddenPoint;for(a=0;a<b;a++)e=d[a],c+=g&&!e.visible?0:e.isNull?0:e.y;this.total=c;for(a=
0;a<b;a++)e=d[a],e.percentage=0<c&&(e.visible||!g)?e.y/c*100:0,e.total=c},generatePoints:function(){c.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();var c=0,d=this.options,b=d.slicedOffset,g=b+(d.borderWidth||0),k,t,q,r=e(d.startAngle,d.endAngle),u=this.startAngleRad=r.start,r=(this.endAngleRad=r.end)-u,w=this.points,m,x=d.dataLabels.distance,d=d.ignoreHiddenPoint,A,C=w.length,G;a||(this.center=a=this.getCenter());this.getX=function(b,c,d){q=Math.asin(Math.min((b-
a[1])/(a[2]/2+d.labelDistance),1));return a[0]+(c?-1:1)*Math.cos(q)*(a[2]/2+d.labelDistance)};for(A=0;A<C;A++){G=w[A];G.labelDistance=l(G.options.dataLabels&&G.options.dataLabels.distance,x);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,G.labelDistance);k=u+c*r;if(!d||G.visible)c+=G.percentage/100;t=u+c*r;G.shapeType="arc";G.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*k)/1E3,end:Math.round(1E3*t)/1E3};q=(t+k)/2;q>1.5*Math.PI?q-=2*Math.PI:q<-Math.PI/2&&(q+=2*Math.PI);
G.slicedTranslation={translateX:Math.round(Math.cos(q)*b),translateY:Math.round(Math.sin(q)*b)};t=Math.cos(q)*a[2]/2;m=Math.sin(q)*a[2]/2;G.tooltipPos=[a[0]+.7*t,a[1]+.7*m];G.half=q<-Math.PI/2||q>Math.PI/2?1:0;G.angle=q;k=Math.min(g,G.labelDistance/5);G.labelPos=[a[0]+t+Math.cos(q)*G.labelDistance,a[1]+m+Math.sin(q)*G.labelDistance,a[0]+t+Math.cos(q)*k,a[1]+m+Math.sin(q)*k,a[0]+t,a[1]+m,0>G.labelDistance?"center":G.half?"right":"left",q]}},drawGraph:null,drawPoints:function(){var a=this,c=a.chart.renderer,
d,b,e,k,l=a.options.shadow;l&&!a.shadowGroup&&(a.shadowGroup=c.g("shadow").add(a.group));r(a.points,function(f){b=f.graphic;if(f.isNull)b&&(f.graphic=b.destroy());else{k=f.shapeArgs;d=f.getTranslate();var q=f.shadowGroup;l&&!q&&(q=f.shadowGroup=c.g("shadow").add(a.shadowGroup));q&&q.attr(d);e=a.pointAttribs(f,f.selected&&"select");b?b.setRadialReference(a.center).attr(e).animate(g(k,d)):(f.graphic=b=c[f.shapeType](k).setRadialReference(a.center).attr(d).add(a.group),f.visible||b.attr({visibility:"hidden"}),
b.attr(e).attr({"stroke-linejoin":"round"}).shadow(l,q));b.addClass(f.getClassName())}})},searchPoint:w,sortByAngle:function(a,c){a.sort(function(a,b){return void 0!==a.angle&&(b.angle-a.angle)*c})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:F.getCenter,getSymbol:w},{init:function(){u.prototype.init.apply(this,arguments);var a=this,c;a.name=l(a.name,"Slice");c=function(c){a.slice("select"===c.type)};C(a,"select",c);C(a,"unselect",c);return a},isValid:function(){return a.isNumber(this.y,
!0)&&0<=this.y},setVisible:function(a,c){var d=this,b=d.series,e=b.chart,g=b.options.ignoreHiddenPoint;c=l(c,g);a!==d.visible&&(d.visible=d.options.visible=a=void 0===a?!d.visible:a,b.options.data[t(d,b.data)]=d.options,r(["graphic","dataLabel","connector","shadowGroup"],function(b){if(d[b])d[b][a?"show":"hide"](!0)}),d.legendItem&&e.legend.colorizeItem(d,a),a||"hover"!==d.state||d.setState(""),g&&(b.isDirty=!0),c&&e.redraw())},slice:function(a,c,d){var b=this.series;k(d,b.chart);l(c,!0);this.sliced=
this.options.sliced=D(a)?a:!this.sliced;b.options.data[t(this,b.data)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var c=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.x,c.y,c.r+a,c.r+a,{innerR:this.shapeArgs.r-1,start:c.start,end:c.end})}})})(K);(function(a){var C=
a.addEvent,F=a.arrayMax,D=a.defined,r=a.each,g=a.extend,e=a.format,t=a.map,w=a.merge,l=a.noop,u=a.pick,c=a.relativeLength,d=a.Series,k=a.seriesTypes,x=a.some,p=a.stableSort;a.distribute=function(c,b,d){function e(a,b){return a.target-b.target}var f,g=!0,k=c,l=[],n;n=0;var m=k.reducedLen||b;for(f=c.length;f--;)n+=c[f].size;if(n>m){p(c,function(a,b){return(b.rank||0)-(a.rank||0)});for(n=f=0;n<=m;)n+=c[f].size,f++;l=c.splice(f-1,c.length)}p(c,e);for(c=t(c,function(a){return{size:a.size,targets:[a.target],
align:u(a.align,.5)}});g;){for(f=c.length;f--;)g=c[f],n=(Math.min.apply(0,g.targets)+Math.max.apply(0,g.targets))/2,g.pos=Math.min(Math.max(0,n-g.size*g.align),b-g.size);f=c.length;for(g=!1;f--;)0<f&&c[f-1].pos+c[f-1].size>c[f].pos&&(c[f-1].size+=c[f].size,c[f-1].targets=c[f-1].targets.concat(c[f].targets),c[f-1].align=.5,c[f-1].pos+c[f-1].size>b&&(c[f-1].pos=b-c[f-1].size),c.splice(f,1),g=!0)}k.push.apply(k,l);f=0;x(c,function(c){var e=0;if(x(c.targets,function(){k[f].pos=c.pos+e;if(Math.abs(k[f].pos-
k[f].target)>d)return r(k.slice(0,f+1),function(a){delete a.pos}),k.reducedLen=(k.reducedLen||b)-.1*b,k.reducedLen>.1*b&&a.distribute(k,b,d),!0;e+=k[f].size;f++}))return!0});p(k,e)};d.prototype.drawDataLabels=function(){function c(a,b){var c=b.filter;return c?(b=c.operator,a=a[c.property],c=c.value,"\x3e"===b&&a>c||"\x3c"===b&&a<c||"\x3e\x3d"===b&&a>=c||"\x3c\x3d"===b&&a<=c||"\x3d\x3d"===b&&a==c||"\x3d\x3d\x3d"===b&&a===c?!0:!1):!0}var b=this,d=b.chart,g=b.options,k=g.dataLabels,q=b.points,l,p,t=
b.hasRendered||0,m,x,A=u(k.defer,!!g.animation),F=d.renderer;if(k.enabled||b._hasPointLabels)b.dlProcessOptions&&b.dlProcessOptions(k),x=b.plotGroup("dataLabelsGroup","data-labels",A&&!t?"hidden":"visible",k.zIndex||6),A&&(x.attr({opacity:+t}),t||C(b,"afterAnimate",function(){b.visible&&x.show(!0);x[g.animation?"animate":"attr"]({opacity:1},{duration:200})})),p=k,r(q,function(f){var h,q=f.dataLabel,n,t,r=f.connector,B=!q,z;l=f.dlOptions||f.options&&f.options.dataLabels;(h=u(l&&l.enabled,p.enabled)&&
!f.isNull)&&(h=!0===c(f,l||k));h&&(k=w(p,l),n=f.getLabelConfig(),z=k[f.formatPrefix+"Format"]||k.format,m=D(z)?e(z,n,d.time):(k[f.formatPrefix+"Formatter"]||k.formatter).call(n,k),z=k.style,n=k.rotation,z.color=u(k.color,z.color,b.color,"#000000"),"contrast"===z.color&&(f.contrastColor=F.getContrast(f.color||b.color),z.color=k.inside||0>u(f.labelDistance,k.distance)||g.stacking?f.contrastColor:"#000000"),g.cursor&&(z.cursor=g.cursor),t={fill:k.backgroundColor,stroke:k.borderColor,"stroke-width":k.borderWidth,
r:k.borderRadius||0,rotation:n,padding:k.padding,zIndex:1},a.objectEach(t,function(a,b){void 0===a&&delete t[b]}));!q||h&&D(m)?h&&D(m)&&(q?t.text=m:(q=f.dataLabel=n?F.text(m,0,-9999).addClass("highcharts-data-label"):F.label(m,0,-9999,k.shape,null,null,k.useHTML,null,"data-label"),q.addClass(" highcharts-data-label-color-"+f.colorIndex+" "+(k.className||"")+(k.useHTML?"highcharts-tracker":""))),q.attr(t),q.css(z).shadow(k.shadow),q.added||q.add(x),b.alignDataLabel(f,q,k,null,B)):(f.dataLabel=q=q.destroy(),
r&&(f.connector=r.destroy()))});a.fireEvent(this,"afterDrawDataLabels")};d.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart,k=f.inverted,l=u(a.dlBox&&a.dlBox.centerX,a.plotX,-9999),n=u(a.plotY,-9999),m=b.getBBox(),p,t=c.rotation,r=c.align,w=this.visible&&(a.series.forceDL||f.isInsidePlot(l,Math.round(n),k)||d&&f.isInsidePlot(l,k?d.x+1:d.y+d.height-1,k)),h="justify"===u(c.overflow,"justify");if(w&&(p=c.style.fontSize,p=f.renderer.fontMetrics(p,b).b,d=g({x:k?this.yAxis.len-n:l,y:Math.round(k?
this.xAxis.len-l:n),width:0,height:0},d),g(c,{width:m.width,height:m.height}),t?(h=!1,l=f.renderer.rotCorr(p,t),l={x:d.x+c.x+d.width/2+l.x,y:d.y+c.y+{top:0,middle:.5,bottom:1}[c.verticalAlign]*d.height},b[e?"attr":"animate"](l).attr({align:r}),n=(t+720)%360,n=180<n&&360>n,"left"===r?l.y-=n?m.height:0:"center"===r?(l.x-=m.width/2,l.y-=m.height/2):"right"===r&&(l.x-=m.width,l.y-=n?0:m.height),b.placed=!0,b.alignAttr=l):(b.align(c,null,d),l=b.alignAttr),h?a.isLabelJustified=this.justifyDataLabel(b,c,
l,m,d,e):u(c.crop,!0)&&(w=f.isInsidePlot(l.x,l.y)&&f.isInsidePlot(l.x+m.width,l.y+m.height)),c.shape&&!t))b[e?"attr":"animate"]({anchorX:k?f.plotWidth-a.plotY:a.plotX,anchorY:k?f.plotHeight-a.plotX:a.plotY});w||(b.attr({y:-9999}),b.placed=!1)};d.prototype.justifyDataLabel=function(a,b,c,d,e,g){var f=this.chart,q=b.align,k=b.verticalAlign,m,l,n=a.box?0:a.padding||0;m=c.x+n;0>m&&("right"===q?b.align="left":b.x=-m,l=!0);m=c.x+d.width-n;m>f.plotWidth&&("left"===q?b.align="right":b.x=f.plotWidth-m,l=!0);
m=c.y+n;0>m&&("bottom"===k?b.verticalAlign="top":b.y=-m,l=!0);m=c.y+d.height-n;m>f.plotHeight&&("top"===k?b.verticalAlign="bottom":b.y=f.plotHeight-m,l=!0);l&&(a.placed=!g,a.align(b,null,e));return l};k.pie&&(k.pie.prototype.drawDataLabels=function(){var c=this,b=c.data,e,g=c.chart,k=c.options.dataLabels,q=u(k.connectorPadding,10),l=u(k.connectorWidth,1),p=g.plotWidth,t=g.plotHeight,m=Math.round(g.chartWidth/3),w,x=c.center,C=x[2]/2,G=x[1],h,v,K,P,I=[[],[]],O,N,y,R,S=[0,0,0,0];c.visible&&(k.enabled||
c._hasPointLabels)&&(r(b,function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),d.prototype.drawDataLabels.apply(c),r(b,function(a){a.dataLabel&&a.visible&&(I[a.half].push(a),a.dataLabel._pos=null,!D(k.style.width)&&!D(a.options.dataLabels&&a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>m&&(a.dataLabel.css({width:.7*m}),a.dataLabel.shortened=!0))}),
r(I,function(b,d){var f,m,l=b.length,n=[],w;if(l)for(c.sortByAngle(b,d-.5),0<c.maxLabelDistance&&(f=Math.max(0,G-C-c.maxLabelDistance),m=Math.min(G+C+c.maxLabelDistance,g.plotHeight),r(b,function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,G-C-a.labelDistance),a.bottom=Math.min(G+C+a.labelDistance,g.plotHeight),w=a.dataLabel.getBBox().height||21,a.positionsIndex=n.push({target:a.labelPos[1]-a.top+w/2,size:w,rank:a.y})-1)}),f=m+w-f,a.distribute(n,f,f/5)),R=0;R<l;R++)e=b[R],m=e.positionsIndex,
K=e.labelPos,h=e.dataLabel,y=!1===e.visible?"hidden":"inherit",N=f=K[1],n&&D(n[m])&&(void 0===n[m].pos?y="hidden":(P=n[m].size,N=e.top+n[m].pos)),delete e.positionIndex,O=k.justify?x[0]+(d?-1:1)*(C+e.labelDistance):c.getX(N<e.top+2||N>e.bottom-2?f:N,d,e),h._attr={visibility:y,align:K[6]},h._pos={x:O+k.x+({left:q,right:-q}[K[6]]||0),y:N+k.y-10},K.x=O,K.y=N,u(k.crop,!0)&&(v=h.getBBox().width,f=null,O-v<q&&1===d?(f=Math.round(v-O+q),S[3]=Math.max(f,S[3])):O+v>p-q&&0===d&&(f=Math.round(O+v-p+q),S[1]=
Math.max(f,S[1])),0>N-P/2?S[0]=Math.max(Math.round(-N+P/2),S[0]):N+P/2>t&&(S[2]=Math.max(Math.round(N+P/2-t),S[2])),h.sideOverflow=f)}),0===F(S)||this.verifyDataLabelOverflow(S))&&(this.placeDataLabels(),l&&r(this.points,function(a){var b;w=a.connector;if((h=a.dataLabel)&&h._pos&&a.visible&&0<a.labelDistance){y=h._attr.visibility;if(b=!w)a.connector=w=g.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex+(a.className?" "+a.className:"")).add(c.dataLabelsGroup),
w.attr({"stroke-width":l,stroke:k.connectorColor||a.color||"#666666"});w[b?"attr":"animate"]({d:c.connectorPath(a.labelPos)});w.attr("visibility",y)}else w&&(a.connector=w.destroy())}))},k.pie.prototype.connectorPath=function(a){var b=a.x,c=a.y;return u(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),c,"C",b,c,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),c,"L",a[2],a[3],"L",a[4],a[5]]},k.pie.prototype.placeDataLabels=function(){r(this.points,function(a){var b=
a.dataLabel;b&&a.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:this.options.dataLabels.style.textOverflow||"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},k.pie.prototype.alignDataLabel=l,k.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,d=this.options,e=d.center,f=d.minSize||80,g,k=null!==d.size;k||(null!==e[0]?g=Math.max(b[2]-
Math.max(a[1],a[3]),f):(g=Math.max(b[2]-a[1]-a[3],f),b[0]+=(a[3]-a[1])/2),null!==e[1]?g=Math.max(Math.min(g,b[2]-Math.max(a[0],a[2])),f):(g=Math.max(Math.min(g,b[2]-a[0]-a[2]),f),b[1]+=(a[0]-a[2])/2),g<b[2]?(b[2]=g,b[3]=Math.min(c(d.innerSize||0,g),g),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):k=!0);return k});k.column&&(k.column.prototype.alignDataLabel=function(a,b,c,e,g){var f=this.chart.inverted,k=a.series,l=a.dlBox||a.shapeArgs,p=u(a.below,a.plotY>u(this.translatedThreshold,
k.yAxis.len)),m=u(c.inside,!!this.options.stacking);l&&(e=w(l),0>e.y&&(e.height+=e.y,e.y=0),l=e.y+e.height-k.yAxis.len,0<l&&(e.height-=l),f&&(e={x:k.yAxis.len-e.y-e.height,y:k.xAxis.len-e.x-e.width,width:e.height,height:e.width}),m||(f?(e.x+=p?0:e.width,e.width=0):(e.y+=p?e.height:0,e.height=0)));c.align=u(c.align,!f||m?"center":p?"right":"left");c.verticalAlign=u(c.verticalAlign,f||m?"middle":p?"top":"bottom");d.prototype.alignDataLabel.call(this,a,b,c,e,g);a.isLabelJustified&&a.contrastColor&&a.dataLabel.css({color:a.contrastColor})})})(K);
(function(a){var C=a.Chart,F=a.each,D=a.objectEach,r=a.pick;a=a.addEvent;a(C,"render",function(){var a=[];F(this.labelCollectors||[],function(e){a=a.concat(e())});F(this.yAxis||[],function(e){e.options.stackLabels&&!e.options.stackLabels.allowOverlap&&D(e.stacks,function(e){D(e,function(e){a.push(e.label)})})});F(this.series||[],function(e){var g=e.options.dataLabels,w=e.dataLabelCollections||["dataLabel"];(g.enabled||e._hasPointLabels)&&!g.allowOverlap&&e.visible&&F(w,function(g){F(e.points,function(e){e[g]&&
(e[g].labelrank=r(e.labelrank,e.shapeArgs&&e.shapeArgs.height),a.push(e[g]))})})});this.hideOverlappingLabels(a)});C.prototype.hideOverlappingLabels=function(a){var e=a.length,g,r,l,u,c,d,k,x,p,f=function(a,c,d,e,f,g,k,l){return!(f>a+d||f+k<a||g>c+e||g+l<c)};for(r=0;r<e;r++)if(g=a[r])g.oldOpacity=g.opacity,g.newOpacity=1,g.width||(l=g.getBBox(),g.width=l.width,g.height=l.height);a.sort(function(a,c){return(c.labelrank||0)-(a.labelrank||0)});for(r=0;r<e;r++)for(l=a[r],g=r+1;g<e;++g)if(u=a[g],l&&u&&
l!==u&&l.placed&&u.placed&&0!==l.newOpacity&&0!==u.newOpacity&&(c=l.alignAttr,d=u.alignAttr,k=l.parentGroup,x=u.parentGroup,p=2*(l.box?0:l.padding||0),c=f(c.x+k.translateX,c.y+k.translateY,l.width-p,l.height-p,d.x+x.translateX,d.y+x.translateY,u.width-p,u.height-p)))(l.labelrank<u.labelrank?l:u).newOpacity=0;F(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(K);
(function(a){var C=a.addEvent,F=a.Chart,D=a.createElement,r=a.css,g=a.defaultOptions,e=a.defaultPlotOptions,t=a.each,w=a.extend,l=a.fireEvent,u=a.hasTouch,c=a.inArray,d=a.isObject,k=a.Legend,x=a.merge,p=a.pick,f=a.Point,b=a.Series,n=a.seriesTypes,z=a.svg,J;J=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart.pointer,c=function(a){var c=b.getPointFromEvent(a);void 0!==c&&(b.isDirectTouch=!0,c.onMouseOver(a))};t(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&
(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(t(a.trackerGroups,function(d){if(a[d]){a[d].addClass("highcharts-tracker").on("mouseover",c).on("mouseout",function(a){b.onTrackerMouseOut(a)});if(u)a[d].on("touchstart",c);a.options.cursor&&a[d].css(r).css({cursor:a.options.cursor})}}),a._hasTracking=!0);l(this,"afterDrawTracker")},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,g=
f.pointer,k=f.renderer,p=f.options.tooltip.snap,h=a.tracker,n,r=function(){if(f.hoverSeries!==a)a.onMouseOver()},w="rgba(192,192,192,"+(z?.0001:.002)+")";if(e&&!c)for(n=e+1;n--;)"M"===d[n]&&d.splice(n+1,0,d[n+1]-p,d[n+2],"L"),(n&&"M"===d[n]||n===e)&&d.splice(n,0,"L",d[n-2]+p,d[n-1]);h?h.attr({d:d}):a.graph&&(a.tracker=k.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:w,fill:c?w:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*p),zIndex:2}).add(a.group),t([a.tracker,
a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",r).on("mouseout",function(a){g.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(u)a.on("touchstart",r)}));l(this,"afterDrawTracker")}};n.column&&(n.column.prototype.drawTracker=J.drawTrackerPoint);n.pie&&(n.pie.prototype.drawTracker=J.drawTrackerPoint);n.scatter&&(n.scatter.prototype.drawTracker=J.drawTrackerPoint);w(k.prototype,{setItemEvents:function(a,b,c){var d=this,e=d.chart.renderer.boxWrapper,g="highcharts-legend-"+
(a instanceof f?"point":"series")+"-active";(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");e.addClass(g);b.css(d.options.itemHoverStyle)}).on("mouseout",function(){b.css(x(a.visible?d.itemStyle:d.itemHiddenStyle));e.removeClass(g);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};e.removeClass(g);b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):l(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=
D("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);C(a.checkbox,"click",function(b){l(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});g.legend.itemStyle.cursor="pointer";w(F.prototype,{showResetZoom:function(){function a(){b.zoomOut()}var b=this,c=g.lang,d=b.options.chart.resetZoomButton,e=d.theme,f=e.states,k="chart"===d.relativeTo?null:"plotBox";l(this,"beforeShowResetZoom",null,
function(){b.resetZoomButton=b.renderer.button(c.resetZoom,null,null,a,e,f&&f.hover).attr({align:d.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(d.position,!1,k)})},zoomOut:function(){l(this,"selection",{resetSelection:!0},this.zoom)},zoom:function(a){var b,c=this.pointer,e=!1,f;!a||a.resetSelection?(t(this.axes,function(a){b=a.zoom()}),c.initiated=!1):t(a.xAxis.concat(a.yAxis),function(a){var d=a.axis;c[d.isXAxis?"zoomX":"zoomY"]&&(b=d.zoom(a.min,a.max),d.displayBtn&&
(e=!0))});f=this.resetZoomButton;e&&!f?this.showResetZoom():!e&&d(f)&&(this.resetZoomButton=f.destroy());b&&this.redraw(p(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&t(d,function(a){a.setState()});t("xy"===b?[1,0]:[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,f=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",g=c[d],h=(b.pointRange||0)/2,k=b.reversed&&!c.inverted||!b.reversed&&c.inverted?-1:1,l=b.getExtremes(),
m=b.toValue(g-f,!0)+h*k,k=b.toValue(g+b.len-f,!0)-h*k,q=k<m,g=q?k:m,m=q?m:k,k=Math.min(l.dataMin,h?l.min:b.toValue(b.toPixels(l.min)-b.minPixelPadding)),h=Math.max(l.dataMax,h?l.max:b.toValue(b.toPixels(l.max)+b.minPixelPadding)),q=k-g;0<q&&(m+=q,g=k);q=m-h;0<q&&(m=h,g-=q);b.series.length&&g!==l.min&&m!==l.max&&(b.setExtremes(g,m,!1,!1,{trigger:"pan"}),e=!0);c[d]=f});e&&c.redraw(!1);r(c.container,{cursor:"move"})}});w(f.prototype,{select:function(a,b){var d=this,e=d.series,f=e.chart;a=p(a,!d.selected);
d.firePointEvent(a?"select":"unselect",{accumulate:b},function(){d.selected=d.options.selected=a;e.options.data[c(d,e.data)]=d.options;d.setState(a&&"select");b||t(f.getSelectedPoints(),function(a){a.selected&&a!==d&&(a.selected=a.options.selected=!1,e.options.data[c(a,e.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=
this.series.chart;this.firePointEvent("mouseOut");t(a.hoverPoints||[],function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,c=x(b.series.options.point,b.options).events;b.events=c;a.objectEach(c,function(a,c){C(b,c,a)});this.hasImportedEvents=!0}},setState:function(a,b){var c=Math.floor(this.plotX),d=this.plotY,f=this.series,g=f.options.states[a||"normal"]||{},k=e[f.type].marker&&f.options.marker,q=k&&!1===k.enabled,n=k&&k.states&&
k.states[a||"normal"]||{},h=!1===n.enabled,r=f.stateMarkerGraphic,t=this.marker||{},u=f.chart,x=f.halo,z,C=k&&f.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===g.enabled||a&&(h||q&&!1===n.enabled)||a&&t.states&&t.states[a]&&!1===t.states[a].enabled)){C&&(z=f.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.animate(f.pointAttribs(this,a),p(u.options.chart.animation,
g.animation)),z&&this.graphic.animate(z,p(u.options.chart.animation,n.animation,k.animation)),r&&r.hide();else{if(a&&n){k=t.symbol||f.symbol;r&&r.currentSymbol!==k&&(r=r.destroy());if(r)r[b?"animate":"attr"]({x:z.x,y:z.y});else k&&(f.stateMarkerGraphic=r=u.renderer.symbol(k,z.x,z.y,z.width,z.height).add(f.markerGroup),r.currentSymbol=k);r&&r.attr(f.pointAttribs(this,a))}r&&(r[a&&u.isInsidePlot(c,d,u.inverted)?"show":"hide"](),r.element.point=this)}(c=g.halo)&&c.size?(x||(f.halo=x=u.renderer.path().add((this.graphic||
r).parentGroup)),x.show()[b?"animate":"attr"]({d:this.haloPath(c.size)}),x.attr({"class":"highcharts-halo highcharts-color-"+p(this.colorIndex,f.colorIndex)+(this.className?" "+this.className:"")}),x.point=this,x.attr(w({fill:this.color||f.color,"fill-opacity":c.opacity,zIndex:-1},c.attributes))):x&&x.point&&x.point.haloPath&&x.animate({d:x.point.haloPath(0)},null,x.hide);this.state=a;l(this,"afterSetState")}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-
a,this.plotY-a,2*a,2*a)}});w(b.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&l(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&l(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,
c=b.options,d=b.graph,e=c.states,f=c.lineWidth,c=0;a=a||"";if(b.state!==a&&(t([b.group,b.markerGroup,b.dataLabelsGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!e[a]||!1!==e[a].enabled)&&(a&&(f=e[a].lineWidth||f+(e[a].lineWidthPlus||0)),d&&!d.dashstyle))for(f={"stroke-width":f},d.animate(f,p(e[a||"normal"]&&e[a||"normal"].animation,b.chart.options.chart.animation));b["zone-graph-"+c];)b["zone-graph-"+c].attr(f),c+=1},
setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,k=c.visible;f=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!k:a)?"show":"hide";t(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&t(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});t(c.linkedSeries,
function(b){b.setVisible(a,!1)});g&&(d.isDirtyBox=!0);!1!==b&&d.redraw();l(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);l(this,a?"select":"unselect")},drawTracker:J.drawTrackerGraph})})(K);(function(a){var C=a.Chart,F=a.each,D=a.inArray,r=a.isArray,g=a.isObject,e=a.pick,t=a.splat;C.prototype.setResponsive=function(e){var g=this.options.responsive,r=[],c=this.currentResponsive;
g&&g.rules&&F(g.rules,function(c){void 0===c._id&&(c._id=a.uniqueKey());this.matchResponsiveRule(c,r,e)},this);var d=a.merge.apply(0,a.map(r,function(c){return a.find(g.rules,function(a){return a._id===c}).chartOptions})),r=r.toString()||void 0;r!==(c&&c.ruleIds)&&(c&&this.update(c.undoOptions,e),r?(this.currentResponsive={ruleIds:r,mergedOptions:d,undoOptions:this.currentOptions(d)},this.update(d,e)):this.currentResponsive=void 0)};C.prototype.matchResponsiveRule=function(a,g){var l=a.condition;
(l.callback||function(){return this.chartWidth<=e(l.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=e(l.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=e(l.minWidth,0)&&this.chartHeight>=e(l.minHeight,0)}).call(this)&&g.push(a._id)};C.prototype.currentOptions=function(e){function l(c,d,e,u){var k;a.objectEach(c,function(a,b){if(!u&&-1<D(b,["series","xAxis","yAxis"]))for(a=t(a),e[b]=[],k=0;k<a.length;k++)d[b][k]&&(e[b][k]={},l(a[k],d[b][k],e[b][k],u+1));else g(a)?(e[b]=r(a)?[]:{},l(a,d[b]||{},e[b],u+1)):
e[b]=d[b]||null})}var u={};l(e,this.options,u,0);return u}})(K);return K});
var configbar = (function() {
  var state = 'closed';

  var attach = function() {
    $('#config-button').on('click', function(event) {
      toggle();
      initialize_arrow();
      event.preventDefault();
    });

    $('#what-link').on('click', function() {
      $('#modal-fblink').modal('show');
      return false;
    })

    $('#modal-fblink').modal({
      show: false
    })

    $('#link-to-fb').on('click', function() {
      remote._simulate_login();
      // var $this = $(this);
      // $this.text('Synchronizing...');
      // $this.prop('disabled', true);
      // FB.login(function(response) {
      //   if (response.status == 'connected') {
      //     remote.show_login_button(false);
      //     remote.show_connection_status(true);
      //     remote.do_handshake('facebook', response.authResponse);
      //   } else {
      //     remote.show_login_error_button();
      //     remote.show_connection_status(false);
      //   }
      // }, {scope: 'email'});

      $(this).prop('disabled', true);
      $('#link-to-fb-text').text('Connecting...');
    })

    $('#disconnect-fb').on('click', function(event) {
      remote._simulate_logout()
      // FB.logout(function(response) {
      //   remote.show_login_button(true);
      //   remote.show_connection_status(false);
      // })
      $(this).prop('disabled', true).text('Disconnecting...');
      event.preventDefault();
    })

    $('#modal-remote-config').modal({
      show: false
    }).on('shown.bs.modal', function() {
      $('body').css('padding-right', 0);
    }).on('hidden.bs.modal', function() {
      $('body').css('padding-right', 0);
    })


    $('#configure-remote').on('click', function() {
      $('#modal-remote-config').modal('show');
      remote.check_signed_in();
      remote.build_shared_profiles();
    })

    if ($('#remote-friendly-name').length > 0) {
      $('#remote-friendly-name').editable({
        placement: 'bottom',
        container: '#modal-remote-config',
        viewport: '#modal-remote-config',
        mode: 'inline',
        validate: function(value) {
          if (value.trim() == '') {
            return 'Cannot be empty'
          }
        },
        url: '/survivor/name/edit',
        pk: -1,
        name: 'whatever',
        ajaxOptions: {
          type: 'post'
        }
      }).on('save', function(e, params) {
        remote_interface.update_example_name(params.newValue);
      })
    }

    $('#modal-sync-conflict').modal({
      show: false
    }).on('shown.bs.modal', function() {
      $('body').css('padding-right', 0);
    }).on('hidden.bs.modal', function() {
      $('body').css('padding-right', 0);
    }).on('show.bs.modal', function() {
      var height = $(window).height() - 96;
      $('#modal-sync-conflict-body').css('max-height', height + 'px');
    })

    $('#sync-upstream').on('click', function() {
      //remote._simulate_upload();
      remote.force_upload();
      $('#modal-sync-conflict').modal('hide');
      notifier.notify_synced('Server data has been synchronized');
    })

    $('#sync-downstream').on('click', function() {
      remote._simulate_download();
      $('#modal-sync-conflict').modal('hide');
      notifier.notify_synced('Your local data has been synchronized');
    })

    $('#profiles-dropdown').on('click', function() {
      if (remote.is_connected()) {
        fetch_guest_profiles();
      } else {
        profile_interface.remove_guest_profiles();
      }
    })
  }

  var fetch_guest_profiles = function() {
    profile_interface.preappend_guest_profiles();
    $.ajax({
      method: 'GET',
      url: '/profile/list_guests'
    }).done(function(response) {
      profile_interface.append_guest_profiles(response);
    })
  }

  var toggle = function() {
    if (state == 'closed') { open(); } 
    else { close(); }
  }

  var open = function() {
    dragdrop.deselect_all();
    $('#config-bar').show().css('width', '50%');
    state = 'opened';
  }

  var close = function() {
    $('#config-bar').css('width', '0px');
    state = 'closed';
  }

  var initialize_arrow = function() {
    var target = $('#config-button').find('.profile-arrow');
    if (state == 'opened') {
      target.html('&raquo; ');
    } else {
      target.html('&laquo; ');
    }
  }

  return {
    attach: attach,
    fetch_guest_profiles: fetch_guest_profiles,
    initialize_arrow: initialize_arrow
  }
})()

$(function() {
  configbar.attach();
});
var dynaloader = (function() {
  var raw_data = {};
  var proc_data = {};
  var delegate = {};
  var global_interlock = {
    ok_to_save: false,
    ok_to_update_gui: false,
    ok_to_animate: false,
    ok_to_sort: false,
    ok_to_delayed_save: false
  }
  var const_raw_data_version = '1.14'

  var set_gil = function(key, value, func) {
    var keys;

    if (!Array.isArray(key)) {
      keys = [key];
    } else {
      keys = key;
    }
    
    $.each(keys, function(i, x) {
      global_interlock[x] = value;
    })
    

    if (func != undefined) {
      var negated = !value;
      func();

      $.each(keys, function(i, x) {
        global_interlock[x] = negated;
      })
    }
  }

  var get_gil = function(key) {
    return global_interlock[key];
  }

  var load_message = function(x) {
    return new Promise(function(resolve, reject) {
      var anchor = $('#modal-loader').find('.last-message');

      var t = '<li><span class="glyphicon glyphicon-ok"></span>&nbsp;  &nbsp;' + x + '</li>';
      anchor.before(t);

      setTimeout(function() {
        resolve()
      }, 16);
    })
    
  }

  var clear_message = function() {
    $('#modal-loader').find('.last-message').remove();
    $('#modal-loader').modal('hide');
  }

  var master_build = function() {
    return new Promise(function(resolve, reject) {
      dynaloader.set_gil('ok_to_save', false);
      dynaloader.set_gil('ok_to_update_gui', false);

      character_sheet.attach();
      strains.build();
      load_message('Irradiating wastelands').then(function() {
        profession_basic.build();
        profession_conc.build();
        profession_adv.build();
        load_message('Mutating survivors').then(function() {
          skills.build();
          load_message('Raising zombies').then(function() {
            filterview.attach();
            load_message('Splattering bloods').then(function() {
              stats_interface.attach();
              load_message('Attaching chainsaws').then(function() {
                tooling.attach();
                load_message('Drying up ocean').then(function() {
                  profile.port_old_cookies();
                  profile.load();
                  load_message('Setting up siege').then(function() {
                    profile_interface.build();
                    dynaloader.set_gil('ok_to_save', true);
                    dynaloader.set_gil('ok_to_update_gui', true);
                    dynaloader.set_gil('ok_to_animate', true);
                    dynaloader.set_gil('ok_to_sort', true);

                    remote.get_status();
                    //skills.update_availability();
                    load_message('Finalizing...').then(function() {
                      notifier.set_timeout(250);
                      skill_interface.set_timeout(250);
                      clear_message();
                      remote._simulate_upload(true);
                      resolve(true);
                    });
                  });
                });
              }); 
            });
          });
        });
      });
    });
  }

  var load_remote = function() {
    $('#modal-loader').modal({

    })

    var current_raw_data_version = $.jStorage.get('raw_data_version', '0.0')

    if (current_raw_data_version != const_raw_data_version) {
      $.jStorage.deleteKey('raw_data');
    } else {
      raw_data = $.jStorage.get('raw_data', {});
    }

    var promise = new Promise(function(lrm_resolve, lrm_reject) {
      if (Object.keys(raw_data).length == 0) {
        $.when(get_json('advanced_cat'),
               get_json('concentration_cat'),
               get_json('profession_advanced'),
               get_json('profession_concentration_group'),
               get_json('profession_concentration_hierarchy'),
               get_json('profession_concentrations'),
               get_json('profession_extension'),
               get_json('professions'),
               get_json('skill_cat'),
               get_json('skill_countered'),
               get_json('skill_counters'),
               get_json('skill_group'),
               get_json('skill_list'),
               get_json('skill_mp_cost'),
               get_json('strain_restriction'),
               get_json('strain_specs'),
               get_json('strain_stats'),
               get_json('strains')).done(function() {

          manager.log('retrieved server data');
          master_build().then(function(resolve, reject) {         
            if (resolve) {
              $.jStorage.set('raw_data', raw_data);
              $.jStorage.set('raw_data_version', const_raw_data_version);
              lrm_resolve(true);
            }
          })
        })
      } else {
        manager.log('cached data loaded');
        master_build().then(function(resolve, reject) {
          lrm_resolve(true);
        });
      }
    })
    

    $.ajax({
      cache: false,
      url: '/skill_desc.json',
      dataType: 'json'
    }).done(function(d) {
      raw_data.skill_desc = d;
    })
    //get_json('skill_desc');
    
    return promise;
  }

  var get_json = function(path) {
    return $.getJSON('/' + path + '.json', function(d) {
      raw_data[path] = d;
    })
  }

  var get_raw_data = function() {
    return raw_data;
  }

  var precheck_profile = function() {
    return profile.precheck();
  }

  return {
    load_remote: load_remote,
    raw: get_raw_data,
    set_gil: set_gil,
    get_gil: get_gil,
    get_all_gil: function() { return global_interlock; },
    precheck_profile: precheck_profile
  }
})();
var manager = (function() {
  var enabled = false;

  var log = function(x) {
    if (enabled) console.log(x);
  }

  return {
    log: log
  }
})();
var filterview = (function() {
  var cache = {};
  var open_state = {};
  var apply_timeout = setTimeout(null, 0);

  var filters = {
    filter_accessible: true, //show accessible only
    filter_discounted: false, //show discounted only
    filter_lore: true, //hide lores
    filter_psionics: true, //hide psionics
    filter_adv: true, //hide advanced
    filter_npc: true, //hide NPC skills
  }

  var attach = function() {
    $('#filter-accessible').on('click', function() {
      update('filter_accessible', $(this).prop('checked'));
    })
    $('#filter-discounted').on('click', function() {
      update('filter_discounted', $(this).prop('checked'));
    })
    $('#filter-lore').on('click', function() {
      update('filter_lore', $(this).prop('checked'));
    })
    $('#filter-psionics').on('click', function() {
      update('filter_psionics', $(this).prop('checked'));
    })
    $('#filter-adv').on('click', function() {
      update('filter_adv', $(this).prop('checked'));
    })
    $('#filter-npc').on('click', function() {
      update('filter_npc', $(this).prop('checked'));
    })
  }

  var cascade_two_lore_cache = function(code, val) {
    cache[code].lore = val;
  }

  var build_cache = function() {
    $.each(skills.get_all_code(), function(code, _junk) {
      cache[code] = {
        accessible: false,
        discounted: false,
        lore: false,
        psionics: false,
        adv: false,
        npc: false
      }

      //open_state[code] = false;
    });
  }

  var get_state_is_open = function(id) {
    var c = cache[id];
    var f = filters;

    var show_only_accessible = f.filter_accessible ? c.accessible : true;
    var show_only_discounted = f.filter_discounted ? c.discounted : true;
    var show_lores = f.filter_lore ? !c.lore : true;
    var show_psionics = f.filter_psionics ? !c.psionics : true;
    var show_adv = f.filter_adv ? !c.adv : true;
    var show_npc = f.filter_npc ? !c.npc : true;

    return show_only_accessible
        && show_only_discounted
        && show_lores
        && show_psionics
        && show_adv
        && show_npc;
  }

  var update = function(target, value) {
    filters[target] = value;
    apply();
  }

  var t = function(id) {
    return skills.get_name(id);
  }

  var apply = function() {
    var has_result = false;
    var update_count = 0;
    //var ignore_cache = _ignore_cache == undefined ? false : _ignore_cache;

    //console.log('GIL: ' + dynaloader.get_gil('ok_to_update_gui'));

    var ignore_cache = true; // WUT???
    $.each(cache, function(id, _junk) {
      var new_state = get_state_is_open(id);
      var last_state = open_state[id];

      if (ignore_cache 
       || (last_state == undefined || new_state != last_state)) {
        open_state[id] = new_state;
        if (new_state) { $('#skill-pool').find('#' + id).show(); }
        else { $('#skill-pool').find('#' + id).hide(); }
        update_count++;
      }
    })

    manager.log('filterview:apply ' + update_count + ' updated');

    $.each(open_state, function(_junk, val) {
      if (val) {
        has_result = true;
        return false;
      }
    })

    if (has_result) {
      $('#skill-pool-no-result').hide();
    } else {
      $('#skill-pool-no-result').show();
    }
  }

  var apply_all = function() {
    filters.filter_accessible = $('#filter-accessible').prop('checked');
    filters.filter_discounted = $('#filter-discounted').prop('checked');
    filters.filter_lore = $('#filter-lore').prop('checked');
    filters.filter_psionics = $('#filter-psionics').prop('checked');
    filters.filter_adv = $('#filter-adv').prop('checked');
    filters.filter_npc = $('#filter-npc').prop('checked');

    //$('div[data-accessible]').show();

    clearTimeout(apply_timeout);
    apply_timeout = setTimeout(function() {
      apply();
    }, 250);
  }


  var set = function(id, x, val) {
    cache[id][x] = val;
  }

  var set_once = function(id, x) {
    switch(x) {
      case 'lore': cache[id][x] = true; break;
      case 'psionics': cache[id][x] = true; break;
      case 'adv': cache[id][x] = true; break;
      case 'npc': cache[id][x] = true; break;
    }
  }

  return {
    apply_all: apply_all,
    attach: attach,
    build_cache: build_cache,
    cascade_two_lore_cache: cascade_two_lore_cache,
    cache: function() { return cache; },
    set: set,
    set_once: set_once
  }
})();
var generic = function() {
  var traverse_to_parent = function(id) {
    var obj = $('#' + id).parent();
    var id = obj.attr('id');

    while(id != 'skill-pool' && id != 'skills-acquired' && id != 'skills-planned') {
      obj = obj.parent();
      id = obj.attr('id');
    }

    return '#' + id;
  }

  return {
    traverse_to_parent: traverse_to_parent
  }
}();
var layout = (function() {
  var state = 'half';
  var animation_ms_duration = 500;
  var animation_serial_delay = animation_ms_duration / 10;

  var attach = function() {
    $(window).resize(function() {
      set();
    })

    set();
    $('#minmax').on('click', function() {
      minmax();
      return false;
    })
  }

  var minmax = function() {
    if (state == 'half') {
      var slide_out_amount = $('#main-left').width();
      state = 'right-full';
      //$('#main-left').hide();

      //$('#main-left').addClass('animated slideOutLeft');
      $('#main-left').velocity({
        opacity: 0,
        'margin-left': (-1 * slide_out_amount - 8) + 'px'
      }, animation_ms_duration)

      $('#main-right').velocity({
        width: 2 * slide_out_amount
      }, animation_ms_duration, function() {
        $('#main-right')
          .removeClass('col-xs-6').addClass('col-xs-12')
          .css('width', '');
      });
      
      
      $('#minmax').html('&rsaquo; Half &lsaquo;');
    } else if (state == 'right-full') {
      state = 'half';
      var half_width = $(window).width() / 2;

      $('#main-right').velocity({
        'margin-right': (-1 * half_width) + 'px'
      }, animation_ms_duration / 2)

      $('#main-right').velocity({
        width: half_width + 'px'
      }, animation_ms_duration / 2, function() {
        $('#main-right')
          .removeClass('col-xs-12').addClass('col-xs-6')
          .css('width', '')
      })

      setTimeout(function() {
        $('#main-left').velocity({
          opacity: 1,
          'margin-left': 0
        }, animation_ms_duration)
      }, animation_serial_delay)

      $('#minmax').html('&laquo; Max');
    }
  }

  var set = function() {
    var height = $(window).height();
    var width = $(window).width();
    var cut = $('nav.navbar').outerHeight();
    var max_height = height - cut - 1;
    $('#main-left').css('height', max_height + 'px');
    $('#main-right').css('height', max_height + 'px');
    $('#config-button').css('max-width', (width * 0.4) + 'px');

    if (state == 'right-full') {
      var margin_hidden = ($(window).width() / 2 * -1) + 'px';
      $('#main-left').css('margin-left', margin_hidden);
    }
  }

  return {
    attach: attach,
    set: set
  }
})()
;
var notifier = function() {
  var data = {};
  var timeout_select = setTimeout(null, 0);
  var timeout_conc = setTimeout(null, 0);
  var timeout_skill = setTimeout(null, 0);
  var timeout_psis = setTimeout(null, 0);
  var timeout_adv = setTimeout(null, 0);
  var timeout_overlimit_basic = setTimeout(null, 0);
  var timeout_overlimit_conc = setTimeout(null, 0);
  var timeout = 250; //ms

  var notify_read_only = function() {
    $.notify({
      message: 'You are modifying read-only profile. Your changes will not be saved'  
    }, {
      type: 'warning',
      animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
      },
      template: '<div data-notify="container" id="skill-notify" class="col-xs-6 col-sm-3 alert alert-{0}" role="alert">' +
                  '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                  '<img data-notify="icon" class="img-circle pull-left">' +
                  '<span data-notify="message">{2}</span>' +
                '</div>',
    })
  }

  var notify_synced = function(x) {
    $.notify({
      message: x 
    }, {
      type: 'success',
      animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
      },
      template: '<div data-notify="container" id="skill-notify" class="col-xs-6 col-sm-3 alert alert-{0}" role="alert">' +
                  '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                  '<img data-notify="icon" class="img-circle pull-left">' +
                  '<span data-notify="message">{2}</span>' +
                '</div>',
    })
  }

  var select = function(i) {
    // if (dynaloader.has_delegations('initial_load')) { return; }
    if (!dynaloader.get_gil('ok_to_update_gui')) return;

    /*if (i == null) {
      return;
    }*/
    clearTimeout(timeout_select);
    timeout_select = setTimeout(function() {
      if (data['select'] == undefined) {
        data['select'] = $.notify({
          message: ''
        }, {
          type: 'warning',
          animate: {
            enter: 'animated fadeInRight',
            exit: 'animated fadeOutRight'
          },
          delay: 0,
          newest_on_top: true,
          allow_dismiss: false,
          template: '<div data-notify="container" class="col-xs-8 col-sm-6 col-md-4 alert alert-{0} text-right" role="alert">' +
                      '<img data-notify="icon" class="img-circle pull-left">' +
                      '<span data-notify="message">{2}</span>' +
                      '<span data-notify="deselect-all"><a href="#">Deselect all</a></span>' +
                    '</div>',
          onShow: attach,
          onClose: function() { delete data['select']; }
        });
      }

      var n = data['select'];
      
      if (i == null || i == 0) {
        n.close();
        return;
      }
      n.update('message', i + ' skills selected. ');  
    }, timeout);
  }

  var basic_overlimit = function(n) {
    clearTimeout(timeout_overlimit_basic);
    timeout_overlimit_basic = setTimeout(function() {
      var p = build_basic_overlimit();

      if (n <= 0) {
        p.close();
      } else {
        p.update('message', 'Please remove or forget ' + n + ' basic professions');
      }
    }, timeout)
  }

  var conc_overlimit = function(n) {
    clearTimeout(timeout_overlimit_conc);
    timeout_overlimit_conc = setTimeout(function() {
      var p = build_conc_overlimit();

      if (n <= 0) {
        p.close();
      } else {
        p.update('message', 'Please remove ' + n + ' profession concentrations');
      }
    }, timeout)
  }

  var conc_preq_missing = function(h) {
    clearTimeout(timeout_conc);
    timeout_conc = setTimeout(function() {
      var p = build_missing_conc();
      var message = generate_conc_preq_message(h);

      if (message.length == 0) {
        //p.update('message', '');
        p.close();
      } else {
        p.update('message', message);
      }
    }, timeout);
    
  }

  var adv_preq_missing = function(h) {
    clearTimeout(timeout_adv);
    timeout_adv = setTimeout(function() {
      var p = build_missing_adv();

      if (h.length == 0) {
        //p.update('message', '');
        p.close();
      } else {
        p.update('message', 'Constraints violated for Advanced Profession ' + h);
      }
    }, timeout)
  }

  var skill_preq_missing = function(all_valid, h) {
    //if (all_valid) { return; }
    clearTimeout(timeout_skill);
    timeout_skill = setTimeout(function() {
      var p = build_missing_preq();
      var message = generate_skill_preq_message(h);
      
      if (message.length == 0) {
        //p.update('message', '');
        p.close();
      } else {
        p.update('message', message);
        attach_skills();
      }
    }, timeout);
  }

  var psis_preq_missing = function() {
    clearTimeout(timeout_psis);
    timeout_psis = setTimeout(function() {
      var p = build_missing_psis();
      var message = generate_psis_preq_message();

      if (message.length == 0) {
        //p.update('message', '');
        p.close();
      } else {
        p.update('message', message);
      }
    }, timeout);
  }

  var generate_conc_preq_message = function(h) {
    var s = '';
    $.each(h, function(conc, messages) {
      if (Object.keys(messages).length == 0) return true;
      s += 'Profession Concentration ' + conc + ' requires:<br />';
      $.each(messages, function(i, x) {
        s += x + '<br />';
      })
    })

    return s;
  }

  var generate_psis_preq_message = function() {
    var psis = skill_interface.get_psis();
    var messages = new Array();

    if (psis[3] * 2 > psis[2]) {
      var diff = 2 * psis[3] - psis[2];
      messages.push('Add ' + diff + ' more Intermediate Psionic skills');
    }

    if (psis[2] * 2 > psis[1]) {
      var diff = 2 * psis[2] - psis[1];
      messages.push('Add ' + diff + ' more Basic Psionic skills');
    }

    return messages.join('<br />');
  }

  var generate_skill_preq_message = function(h) {
    var s = '';
    var invalids = 0;

    $.each(h, function(k, v) {
      if (v.length == 0) return true;
      var t = k + ' requires the following:<br />';
      
      $.each(v, function(i, p) {
        if (Object.keys(p).length > 0) {
          invalids++;
          $.each(p, function(key, _junk) {
            t += key;
            t += ' <a class="skill-add" data-name="' + key + '">Add?</a><br />';
          })
          s += t;
        }
      })
    })

    return s;
  }

  var attach_skills = function() {
    $('#skill-notify').find('a.skill-add').each(function() {
      $(this).off('click').on('click', function() {
        var skill_name = $(this).attr('data-name');
        var skill_id = skills.get_code(skill_name);
        manager.log('clicked ' + skill_name + ' ' + skill_id);
        dragdrop.drop_selective(skill_id, $('#skills-acquired'));
        return false;
      })
    })
  }

  var build_missing_preq = function() {
    if (data['skill_missing_preq'] == undefined) {
      data['skill_missing_preq'] = $.notify({
        message: ''
      }, {
        type: 'danger',
        animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
        },
        delay: 0,
        newest_on_top: true,
        onShown: attach_skills,
        allow_dismiss: true,
        onClose: function() { delete data['skill_missing_preq']; },
        template: '<div data-notify="container" id="skill-notify" class="col-xs-6 col-sm-3 alert alert-{0}" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                  '</div>',
      })
    }

    return data['skill_missing_preq'];
  }

  var build_missing_psis = function() {
    if (data['skill_missing_psis'] == undefined) {
      data['skill_missing_psis'] = $.notify({
        message: ''
      }, {
        type: 'danger',
        animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
        },
        delay: 0,
        newest_on_top: true,
        onShown: attach_skills,
        allow_dismiss: true,
        onClose: function() { delete data['skill_missing_psis']; },
        template: '<div data-notify="container" id="skill-notify" class="col-xs-6 col-sm-3 alert alert-{0}" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                  '</div>',
      })
    }

    return data['skill_missing_psis'];
  }

  var build_missing_conc = function() {
    if (data['conc_missing_preq'] == undefined) {
      data['conc_missing_preq'] = $.notify({
        message: ''
      }, {
        type: 'danger',
        animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
        },
        delay: 0,
        newest_on_top: true,
        allow_dismiss: true,
        onClose: function() { delete data['conc_missing_preq']; },
        template: '<div data-notify="container" id="skill-notify" class="col-xs-8 alert alert-{0}" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                  '</div>',
      })
    }

    return data['conc_missing_preq'];
  }

  var build_missing_adv = function() {
    if (data['adv_missing_preq'] == undefined) {
      data['adv_missing_preq'] = $.notify({
        message: ''
      }, {
        type: 'danger',
        animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
        },
        delay: 0,
        newest_on_top: true,
        allow_dismiss: true,
        onClose: function() { delete data['adv_missing_preq']; },
        template: '<div data-notify="container" id="skill-notify" class="col-xs-8 alert alert-{0}" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                  '</div>',
      })
    }

    return data['adv_missing_preq'];
  }

  var build_basic_overlimit = function() {
    if (data['basic_overlimit'] == undefined) {
      data['basic_overlimit'] = $.notify({
        message: ''
      }, {
        type: 'danger',
        animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
        },
        delay: 0,
        newest_on_top: true,
        allow_dismiss: true,
        onClose: function() { delete data['basic_overlimit']; },
        template: '<div data-notify="container" id="skill-notify" class="col-xs-8 alert alert-{0}" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                  '</div>',
      })
    }

    return data['basic_overlimit'];
  }

  var build_conc_overlimit = function() {
    if (data['conc_overlimit'] == undefined) {
      data['conc_overlimit'] = $.notify({
        message: ''
      }, {
        type: 'danger',
        animate: {
          enter: 'animated fadeInRight',
          exit: 'animated fadeOutRight'
        },
        delay: 0,
        newest_on_top: true,
        allow_dismiss: true,
        onClose: function() { delete data['conc_overlimit']; },
        template: '<div data-notify="container" id="skill-notify" class="col-xs-8 alert alert-{0}" role="alert">' +
                    '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                    '<img data-notify="icon" class="img-circle pull-left">' +
                    '<span data-notify="message">{2}</span>' +
                  '</div>',
      })
    }

    return data['conc_overlimit'];
  }

  var attach = function() {
    var a = $('[data-notify="deselect-all"]').find('a');
    a.on('click', function() {
      dragdrop.deselect_all();
      return false;
    })
  }

  return {
    basic_overlimit: basic_overlimit,
    conc_overlimit: conc_overlimit,
    adv_preq_missing: adv_preq_missing,
    conc_preq_missing: conc_preq_missing,
    notify_read_only: notify_read_only,
    notify_synced: notify_synced,
    select: select,
    skill_preq_missing: skill_preq_missing,
    psis_preq_missing: psis_preq_missing,
    set_timeout: function(x) { timeout = x; }
  }
}();
var profession_adv = (function() {
  var data;
  var update_timeout = setTimeout(null, 0);
  var available = {};
  var selected = {};
  var limit = 3;

  var build = function() {
    profession_adv_interface.build_modal();

    data = {};
    $.each(dynaloader.raw()['profession_advanced'], function(key, raw) {
      data[key] = new SParser(raw);
    })

    profession_adv_interface.render(data);
    profession_adv_interface.build_selector(data);
  }

  var update = function() {
    if (!dynaloader.get_gil('ok_to_update_gui')) return;
    var p = profile.get_current();

    if (p == undefined) return;
    if (!p['prefs'].advanced_acknowledged) return;

    clearTimeout(update_timeout);
    update_timeout = setTimeout(function() {
      var profile = get_profile_data();
      if (profile == null) return;

      var ag = new AgentGirl(get_profile_data());
      compute_advanced_profession_constraints(ag);
    }, 250);
  }

  var get_profile_data = function() {
    var h = {};
    var p = profile.get_current();
    var lookup = skills.get_all_code();

    if (p.stats == undefined) return null;

    h.hp = p.stats.hp;
    h.mp = p.stats.mp;
    h.professions = Object.keys(p.professions.selected);
    h.strain = p.strain;
    h.xp_sum = parseInt($('#xp-total-acquired').text()) + parseInt($('#xp-total-planned').text());
    h.lore_count = 0;
    h.psionic_basic = 0;
    h.psionic_intermediate = 0;
    h.psionic_advanced = 0;
    h.skills = new Array();

    $.each(p.acq.concat(p.plan), function(_junk, x) {
      if (x.skill != undefined) {
        var skill_code = x.skill;
        var skill_name = lookup[skill_code];

        h.skills.push(skill_name);
        if (skill_name.match(/^Lore/)) {
          h.lore_count++;
        } else if (skill_name.match(/^Psi I -/)) {
          h.psionic_basic++;
        } else if (skill_name.match(/^Psi II -/)) {
          h.psionic_intermediate++;
        } else if (skill_name.match(/^Psi III -/)) {
          h.psionic_advanced++;
        }
      }
    })

    return h;
  }

  var compute_advanced_profession_constraints = function(ag) {
    $.each(data, function(name, obj) {
      var s = obj.test(ag);
      var target = $('#advanced-list').find('div[data-adv="' + name + '"]');

      if (s.result) {
        target.removeClass('faded');

        profession_adv_interface.enable_select_button(name, true);
        available[name] = true;
      } else {
        target.addClass('faded');

        profession_adv_interface.enable_select_button(name, false);
        available[name] = false;
      }
      
      profession_adv_interface.display_readable(s, target.find('div.adv-requirement'), name);
    });

    profession_adv_interface.update_selector(available);
    validate_existing();
  }

  var validate_existing = function() {
    missing = new Array();

    $.each(selected, function(key, _junk) {
      if (!available[key]) {
        //console.log('notify: ' + key);
        missing.push(key);
        //notifier.adv_preq_missing(key);
      } else {
        //notifier.adv_preq_missing('');
      }
    })

    notifier.adv_preq_missing(missing.join(', '));
  }

  var is_profession = function(x) {
    return data[x] != undefined;
  }

  var reset = function() {
    selected = {};
    profile.save_all();
  }

  var set = function(x) {
    if (selected[x]) {
      delete selected[x];
    } else {
      selected[x] = true;
    }

    validate_count();
    profile.save_all();
    return selected[x] == undefined ? false : true;
  }

  var validate_count = function() {
    var count = Object.keys(selected).length;
    var overlimit = count - limit;

    profession_adv_interface.update_overlimit(overlimit);
  }

  return {
    build: build,
    data: function() { return data; },
    get_available: function() { return available; },
    is_profession: is_profession,
    is_selected: function(x) { return selected[x]; },
    reset: reset,
    set: set,
    selected: function() { return selected; },
    update: update,
    validate_existing: validate_existing
  }
})();
var profession_basic = (function() {
  var all = {};
  var restricted = {};
  var selected = {};
  var forgotten = {};
  var planned = {};
  var limit = 3;

  var add = function(x, _is_planned) {
    var is_planned = _is_planned == undefined ? false : _is_planned;

    if (is_planned) {
      planned[x] = true;
    } else {
      selected[x] = true;
    }
    profession_basic_interface.update_profession_added(x);

    if (!is_planned) {
      verify_count();
    }

    skills.update_availability(false);
  }

  var forget = function(x) {
    delete selected[x];
    forgotten[x] = true;
    verify_count();
    skills.update_availability(true);
  }

  var apply_plan = function(x) {
    if (planned[x] != undefined) {
      delete planned[x];
      selected[x] = true;
    }
  }

  var remove = function(x) {
    remove_delegate_update(x);
    verify_count();
    skills.update_availability(true);
  }

  var remove_delegate_update = function(x) {
    delete selected[x];
    delete forgotten[x];
    delete planned[x];
    profession_basic_interface.update_profession_removed(x);
  }

  var unforget = function(x) {
    selected[x] = true;
    delete forgotten[x];
    verify_count();
    skills.update_availability(false);
  }

  var reset = function() {
    restricted = {};
    selected = {};
    forgotten = {};
    limit = 3;
  }

  var adjust_limit = function(x) {
    limit = x;
  }

  var build = function() {
    var r = dynaloader.raw();
    $.each(r.professions, function(i, x) {
      all[x] = {};
    })

    profession_basic_interface.build('basic');
  }

  var get_all = function() {
    return all;
  }

  var get_restricted = function() {
    return restricted;
  }

  var get_selected = function() {
    return selected;
  }

  var is_profession = function(x) {
    return all[x] != undefined;
  }

  var reset_limit = function() {
    limit = 3;
  }

  var update_strain_change = function() {
    var new_strain = strain_interface.selected();
    //if (new_strain == 'No Selection') {
    if (strains.data()[new_strain] == undefined) {
      restricted = {};
    } else {
      restricted = strains.data()[strain_interface.selected()].restriction; //strain_interface.selected().restriction;
    }

    $.each(restricted, function(k, v) {
      remove_delegate_update(k);  
    })
    verify_count();
    skills.update_availability(true);

    profession_basic_interface.update_strain_change();
    tooling.update_planned_prof_list();
  }

  var verify_count = function() {
    var extra = special_case();
    var within_limit = Object.keys(selected).length <= limit + extra;
    var overlimit = Object.keys(selected).length - limit - extra;

    profession_basic_interface.disable_limit_warning(within_limit, overlimit);
    notifier.basic_overlimit(overlimit);
    profession_adv.update();
    calc.recalculate_purchased_profession();
    tooling.update_planned_prof_list();
    profile.save_all();
  }

  var special_case = function() {
    var has_special_2 = profile.has_skill(['Duality', 'Memories of Many']);
    var has_special_1 = profile.has_skill('Gun-Fu');

    if (has_special_2) return 2;
    if (has_special_1) return 1;
    return 0;
  }

  var get_purchaseable = function() {
    var s = {};

    $.each(all, function(k, v) {
      s[k] = true;
    })

    $.each(Object.assign({}, selected, forgotten, restricted), function(k, v) {
      delete s[k];
    })

    return s;
  }

  var get_forgettable = function() {
    return selected;
  }

  var get_valid_conc = function() {
    var h = {};
    var d = dynaloader.raw()['profession_concentration_hierarchy'];

    $.each(selected, function(basic, _junk) {
      h[d[basic]] = true;
    })

    return h;
  }

  var plan_clear = function() {
    planned = {};
  }

  return {
    add: add,
    apply_plan: apply_plan,
    forget: forget,
    remove: remove,
    unforget: unforget,
    all: get_all,
    build: build,
    reset: reset,
    is_profession: is_profession,
    restricted: get_restricted,
    selected: get_selected,
    planned: function() { return planned; },
    forgotten: function() { return forgotten; },
    update_strain_change: update_strain_change,
    get_purchaseable: get_purchaseable,
    get_forgettable: get_forgettable,
    get_valid_conc: get_valid_conc,
    verify_count: verify_count
  }
})();
var profession_conc = (function() {
  var all = {};
  var selected = {};
  var planned = {};
  var limit = 2;

  var add = function(x, _is_planned) {
    var is_planned = _is_planned == undefined ? false : _is_planned;

    if (is_planned) {
      planned[x] = true;
    } else {
      selected[x] = true;
    }

    profession_conc_interface.update_profession_added(x);

    if (!is_planned) {
      verify_count();
    }

    skills.update_availability(false);
  }

  var apply_plan = function(x) {
    if (planned[x] != undefined) {
      delete planned[x];
      selected[x] = true;
    }
  }

  var remove = function(x) {
    delete selected[x];
    delete planned[x];

    profession_conc_interface.update_profession_removed(x);
    verify_count();
    skills.update_availability(true);
  }

  var reset = function() {
    selected = {};
    limit = 2;
  }

  var verify_count = function() {
    var within_limit = Object.keys(selected).length <= limit;
    var overlimit = Object.keys(selected).length - limit;

    profession_conc_interface.disable_limit_warning(within_limit, overlimit);
    notifier.conc_overlimit(overlimit);
    calc.recalculate_purchased_profession();
    tooling.update_planned_prof_list();
    profile.save_all();
  }

  var build = function() {
    var r = dynaloader.raw()['profession_concentration_group']
    $.each(r, function(g, sg) {
      $.each(sg, function(_junk, x) {
        all[x] = {};
      })
    })

    profession_conc_interface.build(r);
  }

  var is_profession = function(x) {
    return all[x] != undefined;
  }

  var get_purchaseable = function() {
    var config = stats_interface.get_config();
    var valids = profession_basic.get_valid_conc();
    var result = {};

    if (Object.keys(selected).length >= 2) {
      return {'Limit reached': true}
    }

    $.each(all, function(conc, _junk) {
      if (selected[conc] != undefined) return true;
      var invalid = profession_conc_interface.validate_conc(conc, config, valids);

      if (Object.keys(invalid).length == 0) {
        result[conc] = true;
      }
    })

    return result;
  }

  return {
    add: add,
    apply_plan: apply_plan,
    build: build,
    get_purchaseable: get_purchaseable,
    is_profession: is_profession,
    remove: remove,
    reset: reset,
    selected: function() { return selected; },
    planned: function() { return planned; }
  }
})();
var profession_adv_interface = (function() {
  var build_modal = function() {
    $('#modal-unlock-advanced').modal({
      show: false
    }).on('hidden.bs.modal', function() {
      // why bootstrap add padding-right upon close???
      $('body').css('padding-right', 0);
    }).on('shown.bs.modal', function() {
      $('body').css('padding-right', 0);
    })

    $('#adv-unlock').on('click', function() {
      $('#modal-unlock-advanced').modal('show');
    })

    $('#btn-dismiss-advanced-warning').on('click', function() {
      $('#modal-unlock-advanced').modal('hide');
      hide_unlock(true);
    })

    $('#adv-prof-adv').on('click', function() {
      update_dropdown_list();
    })
  }

  var attach_selector = function() {
    /*$('#adv-selector').selectpicker({

    }).on('changed.bs.select', function() {
      update_gui($('#adv-selector').val());
    });*/

    $('#adv-profession-list').find('.list-adv').on('click', function(event) {
      var $this = $(this);
      var anchor = $this.find('a');

      if ($this.hasClass('disabled') || anchor.hasClass('selected-profession')) {
        return false;
      } else {
        update_gui($(this).attr('data-prof'));
      }

      event.preventDefault();
    })
  }

  var attach_list_toggle = function() {
    $('#adv-list-toggle').change(function() {
      var val = $(this).prop('checked');

      set_list_toggle_state(val);
    })

    set_list_toggle_state($('#adv-list-toggle').prop('checked'));
  }

  var set_list_toggle_state = function(val) {
    if (val) {
      $('#advanced-list').fadeIn();
      $('#skill-pool').hide();
    } else {
      $('#advanced-list').hide();
      $('#skill-pool').fadeIn();
    }
  }

  var update_gui = function(val) {
    var resp = set(val);
    enable_select_button(val, true);
    //reinitialize_all_select_buttons();
    //enable_select_button(val, true);

    add_to_config_gui(val, resp);
  }

  var update_dropdown_list = function() {
    var s = profession_adv.selected();

    $('#adv-profession-list').find('li[data-prof]').each(function() {
      var prof = $(this).attr('data-prof');
      var anchor = $(this).find('a');

      if (s[prof] != undefined) {
        anchor.addClass('selected-profession');
      } else {
        anchor.removeClass('selected-profession');
      }
    })
  }

  var add_to_config_gui = function(name, show) {
    if (show) {
      var s = '<div class="purchased-adv-profession col-xs-12">'
            +   '<span class="adv-prof-name">' + name + '</span>'
            +   '<span class="pull-right glyphicon glyphicon-remove remove-adv" data-prof="' + name + '"></span>'
            + '</div>';
      $('#profession-adv-config').prepend(s);
    } else {
      $('#profession-adv-config').find('[data-prof="' + name + '"]').parent().remove();
    }

    update_dropdown_list();

    $('#profession-adv-config').find('span.glyphicon-remove').on('click', function() {
      var $this = $(this);
      var prof = $this.attr('data-prof');
      profession_adv.set(prof);
      enable_select_button(prof, true);
      $this.parent().remove();
      skills.update_availability(true);
      update_dropdown_list();
    })
  }

  var set_list_gui = function(val) {
    $('#adv-list-toggle').bootstrapToggle(val ? 'on' : 'off');
  }

  var build_selector = function(data) {
    //var raw = '<option class="default-no-selection">No Selection</option>';
    var raw = '';

    $.each(data, function(k, _junk) {
      //raw += '<option value="' + k + '">' + k + '</option>';
      raw += '<li class="list-adv" data-prof="' + k + '">'
           +   '<a href="#">'
           +     k
           +   '</a>'
           + '</li>';
    })

    $('#adv-profession-list').append(raw);
    //$('#adv-selector').selectpicker('refresh');
    attach_selector();
    attach_list_toggle();
  }

  var reinitialize_all_select_buttons = function() {
    $('#advanced-list')
      .find('button[data-adv]')
        .text('Select')
        .prop('disabled', false);
  }

  var enable_select_button = function(name, value) {
    var selected = profession_adv.selected();
    var o = $('#advanced-list').find('button[data-adv="' + name + '"]');

    if (value) {
      if (selected[name] == undefined) {
        o.text('Select').removeClass('btn-danger').show();
      } else {
        o.text('Deselect').addClass('btn-danger').show();
      }
    } else {
      o.hide();
    }
  }

  var update_selector = function(data) {
    var s = $('#adv-profession-list');
    $.each(data, function(k, val) {
      var o = s.find('[data-prof="' + k + '"]');

      if (val) {
        o.removeClass('disabled');
      } else {
        o.addClass('disabled');
      }
      //o.prop('disabled', !val);
    })

    //s.selectpicker('refresh');
  }

  var hide_unlock = function(val) {
    if (val) {
      profile.set_acknowledge(true);
      profession_adv.update();
      $('#profession-adv-unlock').hide();
      $('#filter-adv-list').show();
      $('#filter-adv').prop('checked', false);
      $('#profession-adv-select-container').show();
      filterview.apply_all();
    } else {
      $('#profession-adv-unlock').show();
      $('#filter-adv-list').hide();
      $('#filter-adv').prop('checked', true);
      $('#profession-adv-select-container').hide();
      filterview.apply_all();
    }
  }

  var display_readable = function(s, target, name) {
    var display = new Array();
    var highlight_in_list = function(list, _highlight) {
      if (_highlight == undefined) {
        return list.join(', ');
      } else {
        var highlight = _highlight;
        if (!Array.isArray(_highlight)) {
          highlight = new Array(_highlight);
        }

        var s = '';
        list.forEach(function(x) {
          if (highlight.indexOf(x) != -1) {
            s += '<span class="bg-success-alt">' + x + '</span>' + ', ';
          } else {
            s += x + ', ';
          }
        })

        return s.slice(0, -2);
      }
    }

    var unroll = function(composite, depth, context, _invert) {
      var invert = _invert == undefined ? false : _invert;

      if (composite.operator != undefined) {
        //console.log('Depth ' + depth + ' << ' + composite.operator.toUpperCase() + ' >>');

        var h = '';
        var s = '';
        switch(composite.operator) {
          case 'and': h = 'All:'; break;
          case 'or':  h = 'Any:'; break;
          case 'not': h = 'None:'; break;
        }

        s = Array((depth) * 4).join('&nbsp;') + (composite.result ? '✓ ' : '✗ ') + h;
        if (composite.result) {
          display.push('<span class="text-success">' + s + '</span>');
          //console.log(s);
        } else {
          display.push('<span class="text-danger">' + s + '</span>');
          //console.log(s);
        }

        composite.data.forEach(function(x) {
          unroll(x, depth + 1, context, composite.operator == 'not' ? true : false);
        })
        
      } else {
        var s = '';
        var p = composite.result ? '✓ ' : '✗ ';
        var h = '';
        switch(composite.condition[0]) {
          case 'p': 
            s += 'Profession: '; 
            s += highlight_in_list(composite.condition.slice(1), context.conditions.professions);
            break;
          case 'k': 
            s += 'Skill: '; 
            s += highlight_in_list(composite.condition.slice(1), context.conditions.skills);
            break;
          case 's': 
            s += 'Strain: '; 
            s += highlight_in_list(composite.condition.slice(1), context.conditions.strain);
            break;
          case 'xp_sum': 
            // buffer minimum XP to check when XP drops below minimum requirement
            // advanced_profession_min_xp[name] = parseInt(composite.condition[1])
            s += 'XP >= '; 
            s += composite.condition[1];
            break;
          case 'stat_sum':
            switch(composite.condition[1]) {
              case 'hp_or_mp': s += 'HP/MP >= '; break;
              case 'hp': s += 'HP >= '; break;
              case 'mp': s += 'MP >= '; break;
            }

            s += composite.condition[2];
            break;
          case 'lore_type':
            s += 'Lore skills count >= ';
            s += composite.condition[1];
            break;
          case 'psionic_type':
            switch(composite.condition[1]) {
              case 'basic': s += 'Basic Psionic skills >= '; break;
              case 'intermediate': s += 'Intermediate Psionic skills >= '; break;
              case 'advanced': s += 'Advanced Psionic skills >= '; break;
            }
            s += composite.condition[2];
            break;
        }

        s = Array(depth * 4).join('&nbsp') + p + s;// + composite.condition.slice(1).join(', ');

        if (invert) {
          composite.result = !composite.result;
        }

        if (composite.result) {
          display.push('<span class="text-success">' + s + '</span>');
          //console.log(s);  
        } else {
          display.push('<span class="text-danger">' + s + '</span>');
          //console.log(s);
        }
        
      }
    }

    //console.log(util.inspect(this.logical_trees, { showHidden: false, depth: null }));

    //var that = s;
    s.logical_trees.forEach(function(x) {
      unroll(x, 0, s);
    });

    target.html(display.join('<br />'))
  }

  var render = function(data) {
    var s = '';
    var t = '<div class="adv-requirement">'
          +   'Requirement here'
          + '</div>';
    var button = function(adv) {
      return '<button type="button" class="btn btn-primary btn-xs pull-right btn-adv" '
           +   'data-adv="' + adv + '" '
           +   '>'
           +   'Select'
           + '</button>';
    }

    $.each(data, function(name, _junk) {
      // var t = $('<div></div>')
      //           .addClass('adv-requirement')
      //           .hide()
      //           .append('Requirement here');

      // var s = $('<li></li>')
      //           .addClass('list-group-item')
      //           .addClass('faded')
      //           .addClass('clickable-advanced')
      //           //.addClass('col-xs-12 col-md-6 col-lg-4')
      //           .addClass('col-xs-12')
      //           .attr('p-adv', name)
      //           .append(name)
      //           .append(t)
      //           .append($('<button></button>')
      //                     .append('Select')
      //                     .attr('ap-name', name)
      //                     .addClass('btn btn-primary btn-xs pull-right btn-advanced-profession')
      //                     .on('click', function() {
      //                       $('.btn-advanced-profession').prop('disabled', false).text('Select');
      //                       $(this)
      //                         .prop('disabled', true)
      //                         .text('Selected')

      //                       $('#profession-selector').multiselect('select', name, true);

      //                       return false;
      //                     }))
      //           .on('click', function() {
      //             var target = $(this).find('.adv-requirement');

      //             if (target.is(':hidden')) {
      //               target.show();
      //             } else {
      //               target.hide();
      //             }
      //           });

      s += '<div class="adv faded" '
        +    'data-adv="' + name + '" '
        +    '>'
        +    name
        +    t
        +    button(name)
        +  '</div>'
    })

    $('#advanced-list').append(s);

    $('#advanced-list').find('div.adv').on('click', function() {
      var target = $(this).find('.adv-requirement');
      if (target.is(':hidden')) {
        target.show();
      } else {
        target.hide();
      }
    })

    $('#advanced-list').find('button.btn-adv').on('click', function() {
      var val = $(this).attr('data-adv');
      set_gui(val);
      return false;
    })
  }

  var reset = function() {
    profession_adv.reset();
    $('#profession-adv-config').empty();
    update_dropdown_list();
    hide_unlock(false);
  }

  var set = function(x) {
    var state = profession_adv.set(x);
    skills.update_availability(true);
    return state;
  }

  var set_gui = function(val) {
    //$('#adv-selector').selectpicker('val', val);
    update_gui(val);
  }

  var update_overlimit = function(n) {
    if (n > 0) {
      $('#adv-limit-warning').show();
      $('#adv-overlimit').text(n);
    } else {
      $('#adv-limit-warning').hide();
    }
  }

  return {
    build_modal: build_modal,
    build_selector: build_selector,
    display_readable: display_readable,
    enable_select_button: enable_select_button,
    hide_unlock: hide_unlock,
    update_selector: update_selector,
    update_gui: update_gui,
    render: render,
    reset: reset,
    set_gui: set_gui,
    set_list_gui: set_list_gui,
    update_overlimit: update_overlimit,
    update_dropdown_list: update_dropdown_list
  }
})();
var profession_basic_interface = (function() {
  var add = function(prof) {
    profession_basic.add(prof);
    trigger_filterview(prof, true);

    var s = '<div class="purchased-profession">'
          +   '<span class="basic-prof-name">' + prof + '</span>'
          +   '<span class="simulate-forget pull-right" data-prof="' + prof + '">F</span>'
          //+   '<span class="pull-right">&nbsp|&nbsp</span>'
          +   '<span class="forget-profession pull-right" data-prof="' + prof + '" style="display: none">F</span>'
          +   '<span class="pull-right">&nbsp|&nbsp</span>'
          +   '<span class="glyphicon glyphicon-remove pull-right remove-profession" data-prof="' + prof + '"></span>'
          + '</div>';

    $('#profession-basic-config').prepend(s);
    $('#profession-basic-config')
      .find('.remove-profession').off('click').on('click', function() {
      var target_prof = $(this).attr('data-prof');
      $(this).parent().remove();
      profession_basic.remove(target_prof);
      trigger_filterview(target_prof, false);
    })

    $('#profession-basic-config')
      .find('.forget-profession').off('click').on('click', function() {
      var that = $(this);
      var target_prof = $(this).attr('data-prof');
      var anchor = $(this).parent().find('.basic-prof-name');

      if (anchor.hasClass('forgotten-basic-prof')) {
        //console.log('branch 1 called');
        anchor.removeClass('forgotten-basic-prof');
        profession_basic.unforget(target_prof);
        that.text('F');
        trigger_filterview(target_prof, true);
        that.hide();
        $('#profession-basic-config').find('.simulate-forget[data-prof="' + target_prof + '"]').show();
      } else {
        //console.log('branch 2 called: ' + target_prof);
        anchor.addClass('forgotten-basic-prof');
        profession_basic.forget(target_prof);
        that.text('U');
        trigger_filterview(target_prof, false);
        $(this).parent().find('.config-signet').remove();
        that.show();
        $('#profession-basic-config').find('.forget-profession[data-prof="' + target_prof + '"]').show();
        $('#profession-basic-config').find('.simulate-forget[data-prof="' + target_prof + '"]').hide();
        
      }

      profession_conc_interface.validate_existing();
    })

    $('#profession-basic-config')
      .find('.simulate-forget').off('click').on('click', function() {
        profile.simulate_profession_drop($(this).attr('data-prof'));
      })
  }

  var forget = function(prof) {
    $('#profession-basic-config')
      .find('.forget-profession[data-prof="' + prof + '"]').trigger('click');
  }

  var trigger_filterview = function(type, val) {
    if (type == 'Psionist' || type == 'Unborn of Teixiptla') {
      $('#filter-psionics').prop('checked', !val);
      filterview.apply_all();
    }
  }

  var build = function(type) {
    switch(type) {
      case 'basic': build_add_basic_profession(); break;
    }

  }

  var build_add_basic_profession = function() {
    var raw = '';
    var group = dynaloader.raw()['profession_concentration_hierarchy'];

    $.each(profession_basic.all(), function(k, v) {
      raw += '<li class="list-basic" data-prof="' + k + '">'
           +   '<a href="#">' 
           +     k 
           //+     '<span class="badge pc-badge ' + pc_class + ' pull-right">' 
           //+       label 
           //+     '</span>'
           +     profession_conc_interface.label_conc(group[k])
           +   '</a>'
           + '</li>';
    })

    $('#basic-profession-list').append(raw);
    $('#basic-profession-list').find('li.list-basic').each(function() {
      $(this).on('click', function(event) {
        var that = $(this);
        var prof = that.attr('data-prof');

        add(prof);
        event.preventDefault();
      })
    })

    
  }

  var disable_limit_warning = function(x, overlimit) {
    if (x) {
      $('#basic-limit-warning').hide();
    } else {
      $('#basic-overlimit').text(overlimit);
      $('#basic-limit-warning').show();
    }
  }

  var update_profession_added = function(x) {
    $('#basic-profession-list').find('li[data-prof="' + x + '"]').find('a')
      .addClass('selected-profession')
      .on('click', function(event) {
        return false;
      })
    profession_conc_interface.validate_existing();
  }

  var update_profession_removed = function(x) {
    $('#basic-profession-list').find('li[data-prof="' + x + '"]').find('a')
      .removeClass('selected-profession')
      .off('click')

    $('#profession-basic-config').find('span[data-prof="' + x + '"]').parent().remove();
    profession_conc_interface.validate_existing();
  }

  var update_strain_change = function() {
    clear_restrictions();
    apply_restrictions();
  }

  var clear_restrictions = function() {
    $('#basic-profession-list').find('li[data-prof]').find('a')
      .removeClass('restricted-profession')
      .off('click')
  }

  var apply_restrictions = function() {
    $.each(profession_basic.restricted(), function(k, v) {
      $('#basic-profession-list').find('li[data-prof="' + k + '"]').find('a')
        .addClass('restricted-profession')
        .on('click', function(event) {
          return false;
        })
    })
  }

  var reset = function() {
    profession_basic.reset();
    manager.log('prof reset triggered');
    $('#profession-basic-config').find('.purchased-profession').remove();
    $('#basic-profession-list').find('a').removeClass('selected-profession');
  }

  return {
    add: add,
    build: build,
    disable_limit_warning: disable_limit_warning,
    forget: forget,
    reset: reset,
    trigger_filterview: trigger_filterview,
    update_profession_added: update_profession_added,
    update_profession_removed: update_profession_removed,
    update_strain_change: update_strain_change
  }
})();
var profession_conc_interface = (function() {
  var groups = {};

  var add = function(prof) {
    profession_conc.add(prof);

    var s = '<div class="purchased-conc">'
          +   '<span class="conc-prof-name">'
          +     prof 
          +   '</span>'
          +   '<span class="glyphicon glyphicon-remove pull-right remove-conc" data-conc="' + prof + '"></span>'
          + '</div>';

    $('#profession-conc-config').prepend(s);
    $('#profession-conc-config')
      .find('.remove-conc').off('click').on('click', function() {
        var target_prof = $(this).attr('data-conc');
        $(this).parent().remove();
        profession_conc.remove(target_prof);
      })
  }

  var attach_preq_check = function() {
    $('#add-prof-conc').on('click', function() {
      var config = stats_interface.get_config();
      var valids = profession_basic.get_valid_conc();

      $('#conc-profession-list').find('[data-conc]').each(function() {
        var invalid = validate($(this).attr('data-conc-class'), config, valids);

        if (Object.keys(invalid).length == 0) {
          $(this)
            .removeClass('conc-disabled')
            .find('a') 
              .css('color', '#333')
              .css('text-decoration', 'none')
              .attr('href', '#');
        } else {
          $(this)
            .addClass('conc-disabled')
            .find('a')
              .css('color', '#aaa')
              .css('text-decoration', 'line-through')
              .removeAttr('href');
        }
      })
    })
  }

  var validate = function(x, config, valids) {
    var invalids = {};
    // if (config.hp < 50 || config.mp < 50 || config.xp < 200) return false;
    // if (valids[x] == undefined) return false;
    // return true;
    if (config.hp < 50) invalids.hp = 'Must have HP >= 50';
    if (config.mp < 50) invalids.mp = 'Must have MP >= 50';
    if (config.xp < 200) invalids.xp = 'Must have acquired XP >= 200';
    if (valids[x] == undefined) invalids.prof = 'Must have basic profession that satisfies ' + x + ' role';

    return invalids;
  }

  var validate_conc = function(x, config, valids) {
    var g = groups[x];
    return validate(g, config, valids);
  }

  var validate_existing = function() {
    if (!dynaloader.get_gil('ok_to_update_gui')) return;

    var config = stats_interface.get_config();
    var valids = profession_basic.get_valid_conc();
    var h = {};

    $.each(profession_conc.selected(), function(conc, _junk) {
      var group = groups[conc];
      var invalid = validate(group, config, valids);

      //notifier.conc_preq_missing(conc, invalid);
      h[conc] = invalid;
    });

    notifier.conc_preq_missing(h);
  }

  var build = function(d) {
    var raw = '';
    $.each(d, function(type, sd) {
      raw += '<li class="list-conc list-conc-header">' 
           +   type 
           +   label_conc(type)
           + '</li>';

      $.each(sd, function(_junk, pc) {
        raw += '<li class="list-conc" data-conc="' + pc + '" '
             +   'data-conc-class="' + conc_class(type) + '" '
             +   '>'
             +   '<a href="#">' + pc + '</a>'
             + '</li>';

        groups[pc] = conc_class(type);
      })
    })

    $('#conc-profession-list').append(raw);
    $('#conc-profession-list').find('li.list-conc').each(function() {
      $(this).on('click', function(event) {
        if ($(this).hasClass('conc-disabled')) return false;

        var that = $(this);
        var prof = that.text();

        add(prof);
        event.preventDefault();
      })
    })

    attach_preq_check();
  }

  var disable_limit_warning = function(x, overlimit) {
    if (x) {
      $('#conc-limit-warning').hide();
    } else {
      $('#conc-overlimit').text(overlimit);
      $('#conc-limit-warning').show();
    }
  }

  var conc_class = function(x) {
    switch(x) {
      case 'Combatant': return 'Combat';
      case 'Civilized Society': return 'Society';
      case 'Craft & Production': return 'Production'
    }
  }

  var label_conc = function(label) {

    var f;
    var badge_class;

    switch(label) {
      case 'Combatant':
      case 'Combat': f = 'C'; break;
      case 'Society':
      case 'Civilized Society': f = 'S'; break;
      case 'Production':
      case 'Craft & Production': f = 'P'; break;
      default: f = '';
    }

    switch(f) {
      case 'S': badge_class = 'progress-bar-warning'; break;
      case 'C': badge_class = 'progress-bar-danger'; break;
      case 'P': badge_class = 'progress-bar-info'; break;
      default: badge_class = '';
    }

    return '<span class="badge pc-badge ' + badge_class + ' pull-right">' + f + '</span>';
  }

  var reset = function() {
    profession_conc.reset();
    $('#profession-conc-config').find('.purchased-conc').remove();
    $('#conc-profession-list').find('a').removeClass('selected-profession');
  }

  var update_profession_added = function(x) {
    $('#conc-profession-list').find('li[data-conc="' + x + '"]').find('a')
      .addClass('selected-profession')
      .on('click', function(event) {
        return false;
      })
    validate_existing();
  }

  var update_profession_removed = function(x) {
    $('#conc-profession-list').find('li[data-conc="' + x + '"]').find('a')
      .removeClass('selected-profession')
      .off('click');
    validate_existing();
  }

  return {
    add: add,
    build: build,
    reset: reset,
    label_conc: label_conc,
    disable_limit_warning: disable_limit_warning,
    update_profession_added: update_profession_added,
    update_profession_removed: update_profession_removed,
    validate_existing: validate_existing,
    validate_conc: validate_conc
  }
})();
var character_sheet = (function() {
  var _data;
  var _config;

  var attach = function() {
    $('#character-sheet').modal({
      show: false,
    }).on('hidden.bs.modal', function() {
      $('body').css('padding-right', 0);
    }).on('shown.bs.modal', function() {
      $('body').css('padding-right', 0);
    })

    $('#generate-character-sheet').on('click', function() {
      generate();
      return false;
    })

    $('#cs-print').on('click', function() {
      $('#character-sheet').printThis({
        printContainer: false
      });
    })

    $('#cs-check-planned').on('click', evaluate_filter);
    $('#cs-check-pool').on('click', evaluate_filter);
    $('#cs-check-lore').on('click', evaluate_filter);
  }

  var evaluate_filter = function() {
    var show_planned = $('#cs-check-planned').prop('checked');
    var show_pool = $('#cs-check-pool').prop('checked');
    var show_lore = $('#cs-check-lore').prop('checked');

    show_planned ? $('#cs-planned').show() : $('#cs-planned').hide();
    show_pool ? $('#cs-graphical').show() : $('#cs-graphical').hide();
    show_lore ? $('#cs-lores').show() : $('#cs-lores').hide();
  }

  var generate_stats = function() {
    _data.hp_base = parseInt($('#stat-base-hp').text());
    _data.hp_addition = parseInt($('#stat-purchased-hp').val());
    _data.hp_total = parseInt($('#stat-sum-hp').text());
    _data.mp_base = parseInt($('#stat-base-mp').text());
    _data.mp_addition = parseInt($('#stat-purchased-mp').val());
    _data.mp_total = parseInt($('#stat-sum-mp').text());
    _data.infection = parseInt($('#stat-base-inf').text());
    _data.infection_reduction = parseInt($('#stat-purchased-inf').val());
    _data.infection_total = parseInt($('#stat-sum-inf').text());
    _data.xp_profession = parseInt($('#xp-prof-acquired').text());
    _data.xp_skills = parseInt($('#xp-skills-acquired').text());
    _data.xp_total = parseInt($('#xp-total-acquired').text());
    _data.profile_name = profile.get_current_name();
  }

  var generate_skills = function(type) {
    if (type == 'pool') {

      $('#skill-pool').find('div').each(function() {
        var $this = $(this);
        if ($this.hasClass('skill-infancy')) return true;
        //var skill_name = $this.find('span.skill-name').text();
        var xp_cost = parseInt($this.find('span.skill-cost').text());
        var skill_id = $this.attr('id');
        var skill_name = skills.get_name(skill_id);

        if (skill_name == undefined) return true;

        _data.skills[type][skill_name] = {
          xp: xp_cost,
          mp: skills.get_mp(skill_name)
        }
      })
    } else {
      _data.skills[type] = profile.get_skill_list(type);
    }
    // $('#' + type + '-list').find('li[skill-name]').not('.faded').each(function() {
    //   var that = $(this);
    //   var skill_name = that.attr('skill-name');
    //   _data.skills[type][skill_name] = {
    //     xp: parseInt(that.find('.skill-cost-badge').text().trim()),
    //     mp: skill_mp_cost.get(skill_name)
    //   }
    // })
  }

  var generate_strain_skills = function() {
    var strain = profile.get_current()['strain'];
    $.each(strains.get_innate(strain), function(i, x) {
      _data.skills.innate[x] = { xp: 'ns', mp: 0 }
    })
    // $('#strain-specs').find('span').each(function() {
    //   _data.skills.innate[$(this).text().trim()] = { xp: 'ns', mp: 0 };
    // })
  }

  var generate = function(config) {
    _data = {
      skills: {
        innate: {},
        acquired: {},
        planned: {},
        pool: {}
      }
    }

    _config = {
      strain: profile.get_strain(),
      professions: profile.get_current_professions()
    }

    generate_stats();
    generate_skills('acquired');
    generate_skills('planned');
    generate_skills('pool');
    generate_strain_skills();

    write();
    evaluate_filter();

    $('#character-sheet').modal('show');
  }

  var skill_row_maker = function(name, mp, xp) {
    return '<tr>'
         +   '<td>' + name + '</td>'
         +   '<td class="align-right">' + mp + '</td>'
         +   '<td class="align-right">' + xp + '</td>'
         + '</tr>';
  }

  var two_col_row = function(a, b) {
    return '<tr>'
         +   '<td>' + a + '</td>'
         +   '<td>' + b + '</td>'
         + '</tr>';
  }

  var write_xp_usage = function() {
    s = two_col_row('XP - stats', _data.hp_addition + _data.mp_addition)
      + two_col_row('XP - skills', _data.xp_skills)
      + two_col_row('XP - professions', _data.xp_profession)
      + two_col_row('XP - total', _data.xp_total);

    $('#cs-profs').append(s);
  }

  var write_skill_pool = function() {
    var n, l;

    $.each(_data.skills['pool'], function(name, d) {
      if (name.match(/^Lore - /)) {
        l += skill_row_maker(name, d.mp, d.xp);
      } else {
        n += skill_row_maker(name, d.mp, d.xp);
      }
    })

    $('#cs-graphical').append(n);
    $('#cs-lores').append(l);
  }

  var write_skills = function(source, target) {
    var s;

    var keys = Object.keys(_data.skills[source]).sort();

    //$.each(_data.skills[source], function(name, d) {
    $.each(keys, function(i, name) {
      d = _data.skills[source][name];
      s += skill_row_maker(name, d.mp, d.xp);
    })

    $('#' + target).append(s);
  }

  var write_strain = function() {
    $('#cs-profs').append('<tr><td>Strain</td><td>' + _config.strain + '</td></tr>');
  }

  var write_professions = function() {
    var count = 0;
    $.each(_config.professions, function(x, _junk) {
      $('#cs-profs').append('<tr><td>Profession ' + ++count + '</td><td>' + x + '</td></tr>');
    })
  }

  var write_character_name = function() {
    $('#cs-profs').append(two_col_row('Name', _data.profile_name));
  }

  var write_timestamp = function() {
    $('#cs-profs').append(two_col_row('Date', new Date().toLocaleDateString()));
  }

  var write = function() {
    $('#cs-stat-hp-base').text(_data.hp_base);
    $('#cs-stat-hp-addition').text(_data.hp_addition);
    $('#cs-stat-hp-total').text(_data.hp_total);
    $('#cs-stat-mp-base').text(_data.mp_base);
    $('#cs-stat-mp-addition').text(_data.mp_addition);
    $('#cs-stat-mp-total').text(_data.mp_total);
    $('#cs-stat-ip-base').text(_data.infection);
    $('#cs-stat-ip-reduction').text(_data.infection_reduction * -1);
    $('#cs-stat-ip-total').text(_data.infection_total);

    $('#cs-acquired').find('tbody').empty();
    $('#cs-planned').find('tbody').empty();
    $('#cs-graphical').find('tbody').empty();
    $('#cs-profs').find('tbody').empty();
    $('#cs-lores').find('tbody').empty();
    
    write_skills('innate', 'cs-acquired');
    write_skills('acquired', 'cs-acquired');
    write_skills('planned', 'cs-planned');
    write_skill_pool();
    write_timestamp();
    write_character_name();
    write_strain();
    write_professions();
    write_xp_usage();
  }

  return {
    attach: attach,
    generate: generate
  }
})();
var drop_simulator = function() {
  var resize = function() {
    var parent = $('#modal-drop-simulator');
    var header = parent.find('.modal-header');
    var footer = parent.find('.modal-footer');

    //console.log(header.outerHeight());
    //console.log(footer.outerHeight());

    $('#modal-drop-simulator-body').parent()
      .css('max-height', ($(window).height() - header.outerHeight() - footer.outerHeight() - 80))
      .css('overflow-y', 'auto');
    
  }

  var attach = function() {
    $('#modal-drop-simulator').modal({
      show: false
    }).on('shown.bs.modal', function() {
      $('body').css('padding-right', 0);
      resize();
    }).on('hidden.bs.modal', function() {
      $('body').css('padding-right', 0);
    });

    $('#modal-drop-execute').off('click').on('click', function() {
      profession_basic_interface.forget($('#modal-drop-profession').text());
      /*$('div.purchased-profession')
        .find('.forget-profession[data-prof="' + $('#modal-drop-profession').text() + '"]')
          .trigger('click');*/

      $('#modal-drop-simulator').modal('hide');
    })

    $(window).resize(resize);
  }

  return {
    attach: attach
  }
}();
var profile = function() {
  var old_profile = '';
  var debug = true;
  var selected = 'default';
  var profiles = {};
  var config = {};
  var deleted = {};
  var previous_primary = null;

  var postprocess_cost = {};

  var remote_timeout = setTimeout(null, 0);

  var is_read_only = false;
  var injected_profile = null;
  var read_only_warned = false;

  var sanitized = false;

  var empty_default = {
    profiles: {
      default: {
        prefs: { advanced_acknowledged: false }
      }
    },
    config: { primary: 'default',
              normally_synced: false }
  }

  var default_prefs = {
    prefs: { advanced_acknowledged: false }
  }

  var set_normally_synced = function(val) {
    config.normally_synced = val;
    save_all();
  }

  var sync = function(data) {
    deleted = {};
    config = data.config;
    selected = config.primary;
    profiles = data.profiles;

    $.jStorage.set('all', { profiles: profiles, config: config });
    switch_to(selected);
    profile_interface.update_list();
    profile_interface.update_selected(selected);
  }

  var copy_current_to = function(new_value) {
    profiles[new_value] = profiles[selected];
    //$.jStorage.set('all', { profiles: profiles, config: config });
    //if (debug) manager.log($.jStorage.get('all'));
    save_all();
  }

  var create_empty = function(new_value) {
    profiles[new_value] = default_prefs;
    if (config.primary == undefined) config.primary = new_value;

    $('#skill-pool').velocity({
      opacity: 0.5
    }, 50, function() {
      switch_to(new_value);
      profile_interface.update_list();
      profile_interface.update_selected(new_value);
      save_all();
    })
  }

  var get_old_cookies = function() {
    return Cookies.getJSON();
  }

  var port_old_cookies = function() {
    var test_cookie = '26|26|Diesel Jocks|Cook,Fishmonger,Sniper,Marksman|AJ,AQ,AU,BH,BO,BP,BU,BX,BZ,CB,CK,CO,CQ,CR,CT,CZ,PA,PB,PC,DH,GC,GG,GH,GJ,GK,GN,GV,HC,HG|GD|1|AU9,GD6|1';
    var test_c2 = '51|52|Mericans|Publican,Ring Leader,Scavenger,Civil Servant|AP,BF,BH,BK,BL,BP,BS,BY,CC,CE,CJ,CZ,PA,PB,PC,PD,DH,FW,GC,GD|XK|0|GC6|0';
    var cookies = get_old_cookies();
    var transform = function(data) {
      var splits = data.split('|')
      var hp = parseInt(splits[0] || 0);
      var mp = parseInt(splits[1] || 0);
      var strain = (splits[2] || '').trim();
      var professions = {
        advanced: {},
        concentration: {},
        forgotten: {},
        selected: {}
      }
      var acqs = {};
      var plans = {};
      
      $.each((splits[3] || '').trim().split(','), function(_junk, _x) {
        var x = (_x || '').trim();
        if (profession_basic.is_profession(x)) {
          professions.selected[x] = true;
        } else if (profession_conc.is_profession(x)) {
          professions.concentration[x] = true;
        } else if (profession_adv.is_profession(x)) {
          professions.advanced[x] = true;
        }
      })

      $.each((splits[4] || '').trim().split(','), function(_junk, x) {
        if (x.length < 2) return true;
        acqs[x] = {
          alt: false,
          skill: x
        }
      });

      $.each((splits[5] || '').trim().split(','), function(_junk, x) {
        if (x.length < 2) return true;
        plans[x] = {
          alt: false,
          skill: x
        }
      });

      var adv_ack = (parseInt(splits[6] || 0) == 1) ? true : false;
      var inf = parseInt(splits[8] || 0);

      $.each((splits[7] || '').trim().split(','), function(_junk, x) {
        var skill_id = x.slice(0, 2);
        var skill_cost = parseInt(x.slice(2));

        if (skill_id.length < 2) return true;

        if (acqs[skill_id] != undefined) {
          acqs[skill_id].alt = true;
          acqs[skill_id].cost = skill_cost;
        } else if (plans[skill_id] != undefined) {
          plans[skill_id].alt = true;
          plans[skill_id].cost = skill_cost;
        }
      })

      if (strain.length == 0) strain = 'No Selection';
      var converted = {
        stats: { hp: hp, mp: mp, inf: inf },
        strain: strain,
        prefs: { advanced_acknowledged: adv_ack },
        acq: new Array(),
        plan: new Array(),
        professions: professions
      }

      $.each(acqs, function(x, data) {
        converted.acq.push(data);
      })

      $.each(plans, function(x, data) {
        converted.plan.push(data);
      })

      converted.acq = converted.acq.reverse();
      converted.plan = converted.plan.reverse();

      return converted;
    }
    // profiles['new3'] = transform(test_cookie);
    // profiles['new4'] = transform(test_c2);
    // set_primary('new3');
    // $.jStorage.set('all', { profiles: profiles, config: config });

    // //switch_to('new4');
    // switch_to('new3');
    // profile_interface.update_list();
    // profile_interface.update_selected('new3');

    //profile_interface.update_selected();
    if (cookies.drpedia != undefined) {
      var existing_profiles = cookies.drpedia.split(',');
      var latch_header = null;

      $.each(existing_profiles, function(_junk, header) {
        profiles[header] = transform(cookies[header.trim()]);
        latch_header = header;
      });

      if (latch_header != null) {
        set_primary(latch_header);
      }

      $.jStorage.set('all', { profiles: profiles, config: config });
      switch_to(latch_header);
      profile_interface.update_list();
      profile_interface.update_selected(latch_header);

      Cookies.remove('drpedia');
    }
  }

  var get_first_available = function() {
    var f = Object.keys(profiles)[0];
    return f;
  }

  var get_primary = function() {
    return config.primary;
  }

  var get_current_professions = function() {
    var s = profiles[selected].professions;
    return Object.assign({}, s.selected, s.concentration, s.advanced);
  }

  var set_primary = function(x) {
    config.primary = x;
    save_all();
  }
  
  var soft_delete = function(name) {
    deleted[name] = profiles[name];
    delete profiles[name];

    if (Object.keys(profiles).length == 0) {
      create_empty('default');
    }

    if (name == config.primary) {
      config.primary = get_first_available() || 'default';
      previous_primary = name;
    }

    if (name == selected) {
      $('#skill-pool').velocity({
        opacity: 0.5
      }, 50, function() {
        switch_to(config.primary);
        save_all();
      })
    } else {
      save_all();
    }
  }

  var undelete = function(name) {
    profiles[name] = deleted[name];
    delete deleted[name];
    if (previous_primary != null) {
      config.primary = previous_primary;
    }

    save_all();
  }

  var store = function() {
    data = {
      strain: pack_strain(),
      professions: pack_professions(),
      stats: pack_stats(),
      acq: pack_acq(),
      plan: pack_plan(),
      prefs: profiles[selected] == undefined ? default_prefs : profiles[selected].prefs
    }

    profiles[selected] = data;
  }

  var save_all = function() {
    if (dynaloader.get_gil('ok_to_save') && dynaloader.get_gil('ok_to_delayed_save')) {
      if (is_read_only) {
        if (!read_only_warned) {
          notifier.notify_read_only();
        }
        
        read_only_warned = true;
        return;
      }

      var caller = arguments.callee.caller.toString();
      store();
      config.timestamp = Date.now();

      if (!sanitized) {
        $.each(profiles, function(profile, data) {
          if (data.prefs.normally_synced != undefined) {
            delete data.prefs.normally_synced;
          }

          sanitized = true;
        })
      }
      

      $.jStorage.set('all', { profiles: profiles, config: config });
      if (debug) {
        manager.log('Saving all...');
        manager.log($.jStorage.get('all'));
      }

      clearTimeout(remote_timeout);
      remote_timeout = setTimeout(function() {
        manager.log('sending request to server');
        remote._simulate_upload(remote.get_fresh_login());
      }, 1000);
    }
  }

  var force_save_all = function() {
    $.jStorage.set('all', { profiles: profiles, config: config });
  }

  var save_all_delayed = function(expected) {
    // console.log(expected + ' <> ' + selected);
    if (expected == selected) {
      save_all();
    }
  }

  var rename = function(new_value) {
    profiles[new_value] = profiles[selected];
    delete profiles[selected];
    if (config.primary == selected) {
      config.primary = new_value;
    }

    selected = new_value;
    //$.jStorage.set('all', { profiles: profiles, config: config });
    //if (debug) manager.log($.jStorage.get('all'));
    save_all();
    profile_interface.update_selected(new_value);
    old_profile = new_value;
  }

  var load = function() {
    var v = $.jStorage.get('all');// || empty_default;
    var first_save = false;
    if (v == null) {
      v = empty_default;
      first_save = true;
      tour.start();
    }
    profiles = v.profiles;
    config = v.config;
    selected = v.config.primary;

    if (first_save) {
      force_save_all();
    }

    if (debug) {
      manager.log('Loaded:');
      manager.log(v);
    }

    if (config.normally_synced && remote.is_connected() == false) {
      //$('#link-to-fb').trigger('click');
    }
    
    switch_to(selected);
    //dynaloader.set_gil('ok_to_save', false, reset);
    //dynaloader.set_gil(['ok_to_save', 'ok_to_update_gui'], false, apply);

    return { profiles: profiles, config: config }
  }

  var precheck = function() {
    var v = $.jStorage.get('all');
    if (v == null) return true;

    var normally_synced = v.config.normally_synced;

    if (normally_synced) {
      var is_logged_in = $('#is-logged-in').attr('data-value');
      manager.log('sync status: ' + is_logged_in);

      if (is_logged_in == 'false') {
        window.location.replace('/survivors/auth/facebook');
        return false;
      }
    }

    return true;
  }

  var reset = function() {
    strain_interface.set_gui(null);
    profession_basic_interface.reset();
    profession_conc_interface.reset();
    profession_adv_interface.reset();
    skill_interface.reset_to_pool();
    $('#skills-acquired').empty();
    $('#skills-planned').empty();
    calc.recalculate_all();
  }

  var inject = function(data) {
    injected_profile = data;
  }

  var switch_to = function(new_value, _read_only) {
    if (_read_only == undefined || _read_only == false) {
      is_read_only = false;
      //profile_interface.enable_editable_name(true);
    } else {
      is_read_only = true;
      read_only_warned = false;
      //profile_interface.enable_editable_name(false);
    }

    old_profile = selected;
    selected = new_value;

    dynaloader.set_gil('ok_to_delayed_save', false);
    dynaloader.set_gil('ok_to_sort', false);
    dynaloader.set_gil(['ok_to_save', 'ok_to_update_gui'], false, reset);
    dynaloader.set_gil(['ok_to_save', 'ok_to_update_gui'], false, apply);
    dynaloader.set_gil('ok_to_sort', true);
    dynaloader.set_gil('ok_to_save', false, function() {
      skills.update_availability();
      skill_interface.sort_pool();
    })
    
    old_profile = selected;
    profile_interface.update_selected(selected, is_read_only);

    setTimeout(function() {
      dynaloader.set_gil('ok_to_delayed_save', true);
    }, 500);
  }

  var precompute_planned_professions = function(d) {
    var h = {};

    $.each(d, function(i, x) {
      if (x.prof != undefined) {
        h[x.selected] = {};
      }
    })

    skills.evaluate_planned(h)
  ;}

  var apply = function() {
    //dynaloader.set_delegate('profile_apply', calc.recalculate_all, function() {
    var d = is_read_only ? injected_profile : profiles[selected];
    postprocess_cost = {};

    if (d == undefined) return;
    strain_interface.set_gui(d.strain);

    if (d.professions != undefined) {
      $.each(d.professions.selected, function(x, _junk) {
        profession_basic_interface.add(x);
      })

      $.each(d.professions.forgotten, function(x, _junk) {
        profession_basic_interface.add(x);
        profession_basic_interface.forget(x);
      })

      $.each(d.professions.concentration, function(x, _junk) {
        profession_conc_interface.add(x);
      })

      $.each(d.professions.advanced, function(x, _junk) {
        profession_adv_interface.set_gui(x);
      })
    }
    
    stats_interface.set(d.stats);
    skills.get_config();
    $.each(d.acq, function(i, x) {
      var post = apply_rightside(x, 'skills-acquired');
      if (post) postprocess_cost[x.skill] = x.cost;
    })

    precompute_planned_professions(d.plan);

    $.each(d.plan, function(i, x) {
      var post = apply_rightside(x, 'skills-planned');
      if (post) postprocess_cost[x.skill] = x.cost;
    })

    apply_advanced_lock();

    tooling.compute_group($('#skills-acquired'));
    tooling.compute_group($('#skills-planned'));

    filterview.apply_all();
    skills.update_availability(true);
    skills.validate();

    profession_conc_interface.validate_existing();
    profession_basic.verify_count();
    calc.recalculate_all();
  }

  var apply_advanced_lock = function() {
    var ack = (is_read_only ? injected_profile : profiles[selected]).prefs.advanced_acknowledged;
    profession_adv_interface.hide_unlock(ack);

    if (ack == false) {
      profession_adv_interface.set_list_gui(ack);
    }
  }

  var apply_rightside = function(entry, target) {
    var postprocess = null;

    if (entry.group != undefined) {
      if (target == 'skills-acquired') {
        tooling.copy_programmatically('tool-acq-group', target, { title: entry.group, is_collapsed: entry.is_collapsed })
      } else if (target == 'skills-planned') {
        tooling.copy_programmatically('tool-separator', target, { title: entry.group, is_collapsed: entry.is_collapsed })
      }
    } else if (entry.skill != undefined) {
      dragdrop.drop_selective(entry.skill, $('#' + target), 'append');
      //var alt = entry.alt ? '<sup>+</sup>' : '';
      //$('#' + entry.skill + '-cost').html(entry.cost + alt);
      if (entry.alt) {
        var gap_cost = skills.get_all_possible_costs(skills.get_name(entry.skill));
        if (Object.keys(gap_cost).length >= 1) {
          postprocess = entry.cost
          //console.log(postprocess);
        }
      }
    } else if (entry.stat != undefined) {
      tooling.copy_programmatically('tool-stat-planner', target, { option: entry.stat, nominal: entry.nominal })
    } else if (entry.checkin != undefined) {
      tooling.copy_programmatically('tool-checkin-planner', target, { title: entry.checkin, nominal: entry.nominal })
    } else if (entry.prof != undefined) {
      tooling.copy_programmatically('tool-profession-planner', target, { option: entry.prof, nominal: entry.nominal, selected: entry.selected })
    }

    return postprocess;
  }

  var wipe = function() {
    $.jStorage.set('all', null);
    //load();
    //save_all();
  }

  var pack_strain = function() {
    return strain_interface.selected();
  }

  var pack_professions = function() {
    return {
      selected: profession_basic.selected(),
      forgotten: profession_basic.forgotten(),
      concentration: profession_conc.selected(),
      advanced: profession_adv.selected()
    }
  }

  var pack_stats = function() {
    return {
      hp: parseInt($('#stat-purchased-hp').val()),
      mp: parseInt($('#stat-purchased-mp').val()),
      inf: parseInt($('#stat-purchased-inf').val()),
    }
  }

  var pack_acq = function() {
    return pack_rightside($('#skills-acquired'));
  }

  var pack_plan = function() {
    return pack_rightside($('#skills-planned'));
  }

  var pack_rightside = function(obj) {
    var a = new Array();

    obj.children().each(function() {
      if ($(this).hasClass('tool-separator')) {
        //console.log($(this));
        var attr = $(this).attr('data-group-is-collapsed') || 'false';
        var is_collapsed = attr == 'false' ? false : true;
        a.push({group: $(this).find('.tool-text').text(),
                is_collapsed: is_collapsed});
      } else if ($(this).hasClass('tool-stat-planner')) {
        a.push({stat: $(this).find('.tool-stat').text(), 
                nominal: parseInt($(this).find('.stat-cost').text())});
      } else if ($(this).hasClass('tool-checkin-planner')) {
        a.push({checkin: $(this).find('.tool-text').text(),
                nominal: parseInt($(this).find('.tool-value').text())});
      } else if ($(this).hasClass('tool-prof-planner')) {
        a.push({prof: $(this).find('.tool-option').text(),
                selected: $(this).find('.tool-prof-select').find(':selected').text(),
                nominal: parseInt($(this).find('.tool-prof-xp').text())});
      } else if ($(this).hasClass('skill')) {
        a.push({skill: $(this).attr('id'),
                cost: parseInt($(this).find('.skill-cost').text()),
                alt: $(this).find('.skill-cost').find('sup').length > 0});
      }
    })

    return a;
  }

  var set_pref = function(key, value) {
    prefs[key] = value
  }

  var set_acknowledge = function(val) {
    profiles[selected].prefs.advanced_acknowledged = val;
    save_all();
  }

  var get_all_skills = function() {
    var h = {};
    $.each(pack_acq().concat(pack_plan()), function(junk, x) {
      if (x.skill != undefined) {
        h[skills.get_name(x.skill)] = true;
      }
    })

    return h;
  }

  var get_acquired_skills_with_cost = function() {
    var h = {};
    $.each(pack_acq(), function(junk, x) {
      if (x.skill != undefined) {
        h[skills.get_name(x.skill)] = x;
      }
    })

    return h;
  }

  var simulate_profession_drop = function(x) {
    drop_simulator.attach();
    $('#modal-drop-profession').text(x);

    // if (Object.keys(profession_conc.selected()).length > 0 || Object.keys(profession_adv.selected()).length > 0) {
    //   $('#modal-drop-simulator-body').text('Profession Drop Simulator does not support simulation when you already have Profession Concentration or Advanced Profession. You can still drop it however.');
    //   $('#modal-drop-simulator').modal('show');
    //   return;
    // } 

    var enumerate_delta = function(s, oc, c) {
      var _s = {
        name: s,
        original_cost: oc
      }

      if (c.length == 0) {
        _s.status = 'refunded';
        _s.amount = oc;
      } else {
        // var min_dropped = Math.min.apply(null, Object.keys(c));
        // if (oc < min_dropped) {
        //   _s.status = 'taxed';
        //   _s.amount = min_dropped - oc;
        // }
        _s.sub = new Array();
        _s.global_satisfied = false;
        _s.min_cost = null;

        $.each(c, function(_junk, condition) {
          var sub = {};
          //console.log(condition);
          sub.origin = condition[2];
          if (sub.origin == 'Strain') {
            sub.origin += ': ' + get_strain();
          }

          if (condition[2] == 'Strain') {
            sub.predicate = 'strain';
            _s.global_satisfied = true;
            _s.min_cost = condition[0];
            _s.local_cost = condition[0];
          } else if (condition[1] == 'open') {
            sub.predicate = 'open';
            _s.global_satisfied = true;
            _s.min_cost = condition[0];
            _s.local_cost = condition[0];
          } else if (condition[1] != null) {
            //sub.predicate = condition[1].predicate;
            //sub.list = Object.keys(condition[1].list);

            var predicate = condition[1].predicate;
            var list = Object.keys(condition[1].list);
            var logic = null;

            _s.local_cost = condition[0];
            sub.predicate = predicate;
            sub.list = {};

            if (predicate == 'and') {
              logic = true;
            } else if (predicate == 'or') {
              logic = false;
            }

            $.each(list, function(_junk, l) {
              sub.list[l] = has_skill(l);

              if (predicate == 'and') {
                logic = logic && sub.list[l];
              } else if (predicate == 'or') {
                logic = logic || sub.list[l];
              }
            })

            sub.satisfied = logic;

            if (sub.satisfied) {
              sub.cost = condition[0];

              if (_s.min_cost == null) {
                _s.min_cost = sub.cost;
              } else {
                if (sub.cost < _s.min_cost) {
                  _s.min_cost = sub_cost;
                }
              }
            }

            _s.global_satisfied = _s.global_satisfied || sub.satisfied;
          } else {
            _s.global_satisfied = true;
            _s.min_cost = condition[0];
            _s.local_cost = condition[0];
          }

          _s.sub.push(sub);
        })

        if (_s.global_satisfied && _s.min_cost > oc) {
          _s.status = 'taxed';
          _s.amount = _s.min_cost - oc;
        }
      }

      //console.log(_s);

      var report = _s.name + "\n";
      $.each(_s.sub, function(_junk, d) {
        if (d.predicate == 'open') {
          report += 'Open ' + _s.local_cost;
        } else if (d.predicate == undefined) {
          report += '<< Unchanged >> ' + _s.local_cost;
        } else {
          var px = d.predicate == 'or' ? ' | ' : ' & ';
          var element = new Array();
          $.each(d.list, function(name, has_it) {
            element.push(name + ' (' + (has_it ? 'OK' : 'NO') + ')');
          })
          report += d.origin + ': ' + element.join(px) + ': ' + _s.local_cost + '\n';


        }

        
      })

      if (!_s.global_satisfied) {
        report += 'Refunded ' + oc;
      } else {
        if (_s.status == 'taxed') {
          report += 'Taxed ' + _s.amount;
        }
      }
      
      //console.log(report);

      return _s;
    };

    var write_report = function(r) {
      var anchor = $('#modal-drop-simulator-body');
      var t = '';
      var w = '';
      var summary = '';
      var tally = 0;

      anchor.empty();

      //console.log(r);

      $.each(r, function(_junk, entry) {
        w += '<tr>'
          +    '<td class="skillsim-highlight">' + entry.name + '</td>'
          +    '<td class="skillsim-original-cost">' + entry.original_cost + '</td>'
          +    '<td></td>'
          + '</tr>';

        $.each(entry.sub, function(_junk, d) {
          if (d.predicate == 'open') {
            w += '<tr class="sub-list">'
              +    '<td>Open</td>' 
              +    '<td>' + entry.local_cost + '</td>'
              +    '<td></td>'
              +  '</tr>';
          } else if (d.predicate == undefined) {
            if (entry.status != undefined) {
              w += '<tr class="sub-list">'
                +    '<td>' + d.origin + '</td>'
                +    '<td>' + entry.local_cost + '</td>'
                +    '<td></td>'
                +  '</tr>';
            }
          } else {
            var px = d.predicate == 'or' ? ' OR ' : ' AND ';
            var element = new Array();
            $.each(d.list, function(name, has_it) {
              element.push(name + ' (' + (has_it ? '<span class="glyphicon glyphicon-ok" style="color: green"/>' 
                                                 : '<span class="glyphicon glyphicon-remove" style="color: red"/>') + ')');
            })
            w += '<tr class="sub-list">'
              +    '<td>' + d.origin
              +      ((element.length > 0) ? ': ' : '')
              +      element.join(px)
              +    '</td>'
              +    '<td>' + entry.local_cost + '</td>'
              +    '<td></td>'
              +  '</tr>';
          }
          
        })

        if (!entry.global_satisfied) {
          w += '<tr class="outcome-refunded">'
            +    '<td>Refunded</td>'
            +    '<td></td>'
            +    '<td>' + entry.original_cost + '</td>'
            +  '</tr>';

          tally += entry.original_cost;
        } else {
          if (entry.status == 'taxed') {
            w += '<tr class="outcome-taxed">'
              +    '<td>Taxed</td>'
              +    '<td></td>'
              +    '<td>' + entry.amount + '</td>'
              +  '</tr>';

            tally -= entry.amount;
          }
        }

        
      })


      if (tally < 0) {
        summary += '<tr class="tally-negative">'
          +    '<td>Requires additional XP</td>'
          +    '<td></td>'
          +    '<td class="tally-numeric">' + Math.abs(tally) + '</td>'
          +  '</tr>';
      } else {
        summary += '<tr class="tally-positive">'
          +    '<td>XP refunded</td>'
          +    '<td></td>'
          +    '<td class="tally-numeric">' + tally + '</td>'
          +  '</tr>';
      }
      $('#modal-drop-summary').empty().append(
        '<table class="table">'
        + summary
        + '</table>'
      );

      t += '<table class="table table-condensed">'
        +    '<thead>'
        +      '<tr>'
        +        '<th>Skill</th>'
        +        '<th>Cost</th>'
        +        '<th>&Delta;</th>'
        +      '</tr>'
        +    '</thead>'
        +    '<tbody>'
        +      w
        +    '</tbody>'
        +  '</table>';

      anchor.append(t);
      $('#modal-drop-simulator').modal('show');

    }

    var rems = Object.assign({}, get_current_professions());
    var deleted = x;
    var acquired_skills = get_acquired_skills_with_cost();
    var reports = new Array();
    delete rems[x];

    $.each(acquired_skills, function(skill, data) {
      var original_cost = data.cost;
      var costs = new Array();

      $.each(rems, function(profession, _junk) {
        var accessible = skills.is_accessible_by_profession(skill, profession);

        if (accessible) {
          //costs[accessible.cost] = accessible.preq;
          costs.push([accessible.cost, accessible.preq, profession]);
        }
      })

      if (Object.keys(costs).length == 0) {
        var by_strain = skills.is_accessible_by_strain(skill, get_strain());

        if (by_strain) {
          costs.push([3, by_strain == 'strain_accessible' ? null : by_strain, 'Strain']);
        } else {
          var open = skills.is_accessible_by_profession(skill, 'open')
          if (open) {
            //costs[open] = null;
            costs.push([open, 'open', 'Open'])
          }
        }
        
      }

      //console.log(skill);
      // console.log(costs);
      //console.log('---');

      reports.push(enumerate_delta(skill, original_cost, costs));
    })

    write_report(reports);
  }

  var get_skill_list = function(x) {
    var h = {};
    var pack = (x == 'planned' ? pack_plan() : pack_acq());

    $.each(pack, function(junk, x) {
      if (x.skill != undefined) {
        var skill_name = skills.get_name(x.skill);
        h[skill_name] = {
          xp: x.cost,
          mp: skills.get_mp(skill_name)
        }
      }
    });

    return h;
  }

  var has_skill = function(name) {
    var all_skills = get_all_skills()
    var names = Array.isArray(name) ? name : [name];
    var result = false;

    $.each(names, function(_junk, n) {
      result = result || (all_skills[n] != undefined);
    })

    return result;
  }

  var get_root = function() {
    var h_root = $.jStorage.get('all');

    return {
      transmit: h_root,
      metadata: compute_metadata(h_root)
    }
  }

  var compute_metadata = function(h) {
    var metadata = {};

    var compute_acq = function(v) {
      var acq = v.acq;
      var stats = v.stats;
      var professions = v.professions;
      var strain = v.strain;
      var is_remnant = strain == 'Remnants';
      var basic_prof = Object.keys(professions.selected).length - 1;

      if (is_remnant) {
        basic_prof -= 1;
      }

      if (basic_prof < 0) basic_prof = 0;

      var xp = 0;

      $.each(acq, function(i, x) {
        if (x.cost != undefined) xp += x.cost;
      })

      xp += stats.hp;
      xp += stats.mp;
      xp += Object.keys(professions.advanced).length * 10;
      xp += Object.keys(professions.concentration).length * 30;
      xp += Object.keys(professions.forgotten).length * 10;
      xp += basic_prof * 10;

      return xp;
    }

    $.each(h.profiles, function(key, val) {
      if (val.acq == undefined) {
        metadata[key] = {
          acq: 0,
          plan: 0,
          professions: {},
          hp: 0,
          mp: 0,
          inf: 0,
          strain: 'No Selection',
          xp: 0
        }
      } else {
        metadata[key] = {
          acq: val.acq.length,
          plan: val.plan.length,
          professions: Object.assign({}, val.professions.advanced,
                                         val.professions.concentration,
                                         val.professions.selected),
          hp: val.stats.hp,
          mp: val.stats.mp,
          inf: val.stats.inf,
          strain: val.strain,
          xp: compute_acq(val)
        }
      }
    })

    return metadata;
  }

  var get_strain = function() {
    return pack_strain();
  }

  return {
    apply: apply,
    copy_current_to: copy_current_to,
    create_empty: create_empty,
    load: load,
    store: store,
    get_root: get_root,
    compute_metadata: compute_metadata,
    get_all: function() { return profiles; },
    get_deleted: function() { return deleted; },
    get_current: function() { return profiles[selected]; },
    get_current_professions: get_current_professions,
    get_all_skills: get_all_skills,
    get_acquired_skills_with_cost: get_acquired_skills_with_cost,
    get_skill_list: get_skill_list,
    has_skill: has_skill,
    get_postprocess_cost: function() { return postprocess_cost; },
    get_current_name: function() { return selected; },
    get_old_name: function() { return old_profile; },
    get_master: function() { return $.jStorage.get('all'); },
    get_deleted: function() { return deleted; },
    get_strain: get_strain,
    get_primary: get_primary,
    inject: inject,
    set_primary: set_primary,
    rename: rename,
    port_old_cookies: port_old_cookies,
    save_all: save_all,
    save_all_delayed: save_all_delayed,
    set_pref: set_pref,
    set_normally_synced: set_normally_synced,
    simulate_profession_drop: simulate_profession_drop,
    soft_delete: soft_delete,
    sync: sync,
    undelete: undelete,
    set_acknowledge: set_acknowledge,
    switch_to: switch_to,
    wipe: wipe,
    precheck: precheck
  }
}();
var profile_interface = function() {
  var editable_has_been_setup = false;

  var build = function() {
    attach();
    update_list();
  }

  var attach = function() {
    $('#profile-rename').editable({
      placement: 'bottom',
      unsavedclass: null,
      validate: validate_profile_name,
      container: 'body',
      
    }).on('save', function(e, params) {
      var new_value = params.newValue.trim();
      profile.rename(new_value);
      update_list();
      setTimeout(function() {
        update_selected(new_value);
      }, 50);
    }).on('shown', function(e, params) {
      var that = $(this);
      var input = $('.editable-popup').find('input');
      input.val(that.text());
    })

    attach_copy_button();
    attach_copy_validation();
    attach_copy_close();
    attach_copy_execute();
    attach_scratch_button();

    $('#modal-copy').modal({
      show: false
    }).on('shown.bs.modal', function(e) {
      //$('#modal-copy-input').focus();
    });

    editable_has_been_setup = true;
  }

  var attach_copy_button = function() {
    $('#profile-copy').on('click', function(event) {
      $('#modal-copy').modal('show');
      event.preventDefault();
    })
  }

  var attach_scratch_button = function() {
    $('#profile-new').on('click', function(event) {
      var profiles = Object.assign({}, profile.get_all(), profile.get_deleted());

      var new_name = 'new';
      var counter = 0;
      var exist = profiles[new_name + counter.toString()] != undefined;

      //console.log(profiles);
      while (exist) {
        counter++;
        exist = profiles[new_name + counter.toString()] != undefined;
      }

      var final_profile_name = new_name + counter.toString();

      profile.create_empty(final_profile_name);
      event.preventDefault();
    })
  }

  var update_list = function() {
    var anchor = $('#existing-profile');
    var master_data = profile.get_all();
    var deleted_profiles = profile.get_deleted();
    var current_selected = profile.get_current_name();
    var primary = profile.get_primary();
    var s = '';
    var active_class;
    var more_than_one_profile = Object.keys(master_data).length > 1;

    var set_primary_option = function(x, primary) {
      var is_primary = x == primary;

      return '<span class="glyphicon set-primary glyphicon-' 
           + (is_primary ? 'star' : 'star-empty') 
           + '" data-set-primary="' + x + '"></span>';
    }

    var can_delete = function(x) {
      if (more_than_one_profile) return true;
      if (x == 'default') return false;
    }

    anchor.nextAll().remove();

    $.each(master_data, function(x, _junk) {
      if (deleted_profiles[x] != undefined) return true;

      if (x == current_selected) {
        active_class = 'anchor-active';
      } else {
        active_class = '';
      }

      s += '<li class="profile-block">'
         +   set_primary_option(x, primary)
         +   '<span><a href="#" data-name="' + x + '" class="' + active_class + '">'
         +     x
         +   '</a></span>'
         +   (can_delete
               ? '<span class="glyphicon glyphicon-remove pull-right text-danger profile-delete" data-deleted=false></span>'
               : '')
         + '</li>';
    })

    $.each(deleted_profiles, function(x, _junk) {
      s += '<li class="profile-block">'
         +   '<span><a href="#" data-name="' + x + '" class="profile-deleted">'
         +     x
         +   '</a></span>'
         +   '<span class="glyphicon glyphicon-repeat pull-right profile-delete" data-deleted=true></span>'
         + '</li>';
    })

    $(s).insertAfter(anchor);
    attach_profile_load();
    attach_profile_set_primary();
    configbar.fetch_guest_profiles();
  }

  var attach_profile_set_primary = function() {
    $('#profile-dropdown').find('[data-set-primary]').each(function() {
      $(this).on('click', function(event) {
        profile.set_primary($(this).attr('data-set-primary'));
        update_list();
        return false;
      })
    })
  }

  var attach_profile_load = function() {
    $('#profile-dropdown').find('[data-name]').each(function() {
      $(this).on('mouseover', function(event) {
        if ($(this).hasClass('profile-deleted')) {
          return false;
        }
      });

      $(this).on('click', function(event) {
        if ($(this).hasClass('anchor-active') || $(this).hasClass('profile-deleted')) {
          return false;
        }

        var profile_name = $(this).attr('data-name');

        $('#skill-pool').velocity({
          opacity: 0.5
        }, 50, function() {
          profile.switch_to(profile_name);
          update_list();
          update_selected(profile_name);
        })
        
        return false;
      })

      $(this).parent().parent().find('.profile-delete').on('click', function(event) {
        var is_deleted = !($(this).attr('data-deleted') == 'true' ? true : false);
        var text = $(this).parent().find('[data-name]');
        var profile_name = text.attr('data-name');

        if (is_deleted) {
          text.addClass('profile-deleted');
          $(this)
            .removeClass('glyphicon-remove')
            .addClass('glyphicon-repeat')
            .removeClass('text-danger');

          profile.soft_delete(profile_name);
          update_list();
          text.removeAttr('href');
        } else {
          text.removeClass('profile-deleted');
          $(this)
            .addClass('glyphicon-remove')
            .removeClass('glyphicon-repeat')
            .addClass('text-danger');

          profile.undelete(profile_name);
          text.attr('href', '#');
          update_list();
        }

        $(this).attr('data-deleted', is_deleted);
        text.removeClass('anchor-active');
        return false;
      })
    })
  }

  var attach_copy_validation = function() {
    var enable_copy = function(allowed, message) {
      $('#modal-copy-execute').prop('disabled', !allowed)
      $('#modal-copy-error').text(message == null ? '' : message);
    }

    $('#modal-copy-input').on('keyup', function() {
      var new_value = $(this).val().trim();
      var validation = validate_profile_name(new_value);

      if (validation != null) {
        enable_copy(false, validation);
      } else {
        enable_copy(true, validation);
      }

    })
  }

  var attach_copy_close = function() {
    $('#modal-copy-cancel').on('click', function() {
      $('#modal-copy').modal('hide');
    })
  }

  var attach_copy_execute = function() {
    $('#modal-copy-execute').on('click', function() {
      var new_value = $('#modal-copy-input').val().trim();
      profile.copy_current_to(new_value);
      profile.switch_to(new_value);
      update_list();
      update_selected(new_value);
      $('#modal-copy').modal('hide');
    })
  }

  var unanchor_profiles = function() {
    $('#profile-dropdown').find('.anchor-active').each(function() {
      $(this).removeClass('anchor-active');
    })
  }

  var remove_guest_profiles = function() {
    $('#guest-profile-separator').remove();
    $('#profile-dropdown').find('.guest-profile').remove();
  }

  var preappend_guest_profiles = function() {
    $('#guest-profile-separator').remove();
    $('#profile-dropdown').append('<li role="separator" class="divider" id="guest-profile-separator"></li>');
    $('#profile-dropdown').find('.guest-profile').remove();
    $('#profile-dropdown')
      .append('<li class="guest-profile">'
            +   '<span><a>Fetching data...</a></span>'
            + '</li>');
  }

  var append_guest_profiles = function(data) {
    var activate = function() {
      $('#profile-dropdown').find('.guest-profile-clickable').off('click').on('click', function() {
        var id = $(this).attr('data-id');
        var name = $(this).text();

        $('#skill-pool').velocity({
          opacity: 0.5
        }, 50);

        $.ajax({
          method: 'GET',
          url: '/profile/fetch',
          data: {
            id: id
          }
        }).done(function(response) {
          profile.inject(response.data);
          profile.switch_to(name, true);
          unanchor_profiles();
        })

        return false;
      })
    }

    $('#guest-profile-separator').remove();
    if (Object.keys(data).length > 0) {
      $('#profile-dropdown').append('<li role="separator" class="divider" id="guest-profile-separator"></li>');
    }

    $('#profile-dropdown').find('.guest-profile').remove();

    var raw = '';
    $.each(data, function(id, name) {
      raw += '<li class="guest-profile">'
          +    '<span>'
          +      '<a href="#" class="guest-profile-clickable" data-id="' + id + '">'
          +        name
          +      '</a>'
          +    '</span>'
          +  '</li>';
    })

    $('#profile-dropdown').append(raw);
    activate();
  }

  var update_selected = function(new_value, _is_read_only) {
    var is_read_only = _is_read_only == undefined ? false : _is_read_only;

    if (is_read_only) {
      $('#profile-rename').html(new_value);
      if (editable_has_been_setup) {
        $('#profile-rename').editable('disable');
      }
    } else {
      $('#profile-rename').html('<span class="glyphicon glyphicon-pencil"></span>&nbsp; ' + new_value);
      if (editable_has_been_setup) {
        $('#profile-rename').editable('enable');
      }
    }
    $('#config-button').find('.profile-name').text(new_value);
    configbar.initialize_arrow();
  }

  var validate_profile_name = function(_new_value) {
    var current = profile.get_current_name();
    var new_value = _new_value.trim();

    if (new_value == '') {
      return 'Profile name can\'t be empty';
    } else if (profile.get_all()[new_value] != undefined) {
      if (new_value == current) return null;
      return 'Duplicate profile name';
    }

    return null;
  }

  return {
    build: build,
    preappend_guest_profiles: preappend_guest_profiles,
    append_guest_profiles: append_guest_profiles,
    remove_guest_profiles: remove_guest_profiles,
    update_list: update_list,
    update_selected: update_selected,
  }
}();
var remote = function() {
  var is_connected = false;
  var is_fresh_login = false;

  var _simulate_login = function() {
    // FB.login(function(response) {
    //   if (response.status == 'connected') {
    //     //window.open('/auth/facebook/callback', 'login_aux', 'scrollbars=0, resizable=0, height=256, width=384');
    //   }
    //   //do_handshake('facebook', response.authResponse);
    // }, {scope: 'email'})
    window.open('/survivors/auth/facebook', 'login_aux', 'scrollbars=0, resizable=0, height=512, width=512');
  }

  var force_upload = function() {
    var downstream_profile = profile.get_root();

    $.ajax({
      method: 'POST',
      url: '/sync/force_upstream',
      csrf: get_csrf(),
      data: {
        profile_data: JSON.stringify(downstream_profile.transmit)
      }
    }).done(function(response) {
      if (response.response == 'synchronized') {
        manager.log('Upstream synchronized');
      }
    })
  }

  var _simulate_upload = function(_fresh_login) {
    var downstream_profile = profile.get_root();
    var fresh_login = _fresh_login == undefined ? false : _fresh_login;

    $.ajax({
      method: 'POST',
      url: '/sync/upstream',
      csrf: get_csrf(),
      data: {
        profile_data: JSON.stringify(downstream_profile.transmit),
        fresh_login: fresh_login
      }
    }).done(function(response) {
      if (response.response == 'synchronized') {
        manager.log('Upstream synchronized');
      } else if (response.response == 'disconnected') {
      } else if (response.response == 'check') {
        manager.log('Check compare');
        var m = profile.compute_metadata(response.comparison);
        remote_interface.update_sync_conflict(downstream_profile.metadata, 
                                              m,
                                              downstream_profile.transmit.config.timestamp,
                                              response.comparison.config.timestamp);
      } else {

        profile.sync(response.response);
        //console.log('Need to syncrhonize downstream');
      }
    })
  }

  var _simulate_download = function() {
    $.ajax({
      method: 'GET',
      url: '/sync/downstream'
    }).done(function(response) {
      profile.sync(response.response);
    })
  }

  var _simulate_logout = function() {
    window.open('/session/destroy', 'logout_aux', 'scrollbars=0, resizable=0, height=512, width=512');
  }

  var check_signed_in = function() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        method: 'GET',
        url: 'session/current'
      }).done(function(response) {
        //console.log(response);
        is_connected = response.signed_in;
        remote_interface.update_friendly_name(response.friendly_name);
        resolve(true);
      })
    })
    
  }

  var build_shared_profiles = function() {
    return new Promise(function(resolve, reject) {
      remote_interface.prebuild_shared_profiles();
      $.ajax({
        method: 'GET',
        url: '/profile/shared'
      }).done(function(response) {
        remote_interface.build_shared_profiles(response);
        resolve(true);
      })
    })
    
  }

  // var do_handshake = function(provider, auth) {
  //   $.ajax({
  //     method: 'POST',
  //     url: '/handshake',
  //     csrf: get_csrf(),
  //     data: {
  //       provider: provider,
  //       expires_in: auth.expiresIn,
  //       uid: auth.userID
  //     }
  //   }).done(function(response) {
  //     console.log(response);
  //   })
  // }

  var get_csrf = function() {
    return $('meta[name="csrf-token"]').attr('content');
  }
  
  var get_status = function() {
    // FB.getLoginStatus(function(response) {
    //   console.log(response);

    //   switch (response.status) {
    //     case 'not_authorized':
    //     case 'unknown':
    //       show_login_button(true);
    //       show_connection_status(false);
    //       break;
    //     case 'connected':
    //       show_login_button(false);
    //       show_connection_status(true);
    //       break;
    //   }
    // });
    check_signed_in().then(function() {
      if (is_connected) {
        show_login_button(false);
        show_connection_status(true);
      } else {
        show_login_button(true);
        show_connection_status(false);
      }
    })
  }

  var show_login_error_button = function() {
    $('#fblink-container').show();
    $('#link-to-fb-text').text('Retry?');
  }

  var show_login_button = function(val) {
    if (val) {
      $('#fblink-container').show();
      $('#link-to-fb').prop('disabled', false);
      $('#link-to-fb-text').text('Sync?');
      $('#disconnect-fb-group').hide();
    } else {
      $('#fblink-container').hide();
      $('#disconnect-fb-group').show();
      $('#disconnect-fb').prop('disabled', false).text('Disconnect')
    }
  }

  var show_connection_status = function(val) {
    if (val) {
      $('#connection-status').text('Connected');
      is_connected = true;
    } else {
      $('#connection-status').text('Offline');
      profile_interface.remove_guest_profiles();
      is_connected = false;
    }
  }

  var set_fresh_login = function() {
    is_fresh_login = true;
  }

  var get_fresh_login = function() {
    if (is_fresh_login) {
      is_fresh_login = false;
      return true;
    }

    return false;
  }



  return {
    _simulate_download: _simulate_download,
    _simulate_login: _simulate_login,
    _simulate_logout: _simulate_logout,
    _simulate_upload: _simulate_upload,
    is_connected: function() { return is_connected; },
    build_shared_profiles: build_shared_profiles,
    check_signed_in: check_signed_in,
    get_csrf: get_csrf,
    get_status: get_status,
    force_upload: force_upload,
    show_login_button: show_login_button,
    show_connection_status: show_connection_status,
    set_fresh_login: set_fresh_login,
    get_fresh_login: get_fresh_login
  }
}();
var remote_interface = function() {
  var update_friendly_name = function(x) {
    $('#remote-friendly-name').editable('setValue', x);
    update_example_name(x);
  }

  var update_example_name = function(x) {
    $('#example-friendly-name').text(x + '/<my_profile>');
  }

  var attach_typeahead = function() {
    var bloodhoundSuggestions = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      identify: function(obj) { return obj.id },
      sufficient: 5,
      local: [],
      remote: {
        url: '/survivor/search?q=%QUERY',
        wildcard: '%QUERY'
      }
    })

    $('#sharing-settings').find('.survivor-typeahead').each(function() {
      var $this = $(this);
      $this.typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      }, {
        name: 'suggestions',
        display: 'name',
        source: bloodhoundSuggestions
      }).on('typeahead:select', function(e, suggestion) {
        var $this = $(this);
        var profile_name = get_profile_name($this);
        var guest_id = suggestion.id;

        $.ajax({
          method: 'POST',
          url: '/profile/share',
          data: {
            profile_name: profile_name,
            guest_id: guest_id
          }
        }).done(function(response) {
          if (response.success == 'created') {
            $this.typeahead('val', '');
            mark_duplicate(null);
            mark_successfully_shared($this, response.id, suggestion.name);
          } else if (response.success == 'exist') {
            $this.typeahead('val', 'Already shared');
            $this.select();
            mark_duplicate(response.id);
          }
        })
      })
    });
  }

  var mark_duplicate = function(id) {
    $('#sharing-settings').find('.shared-duplicate').each(function() {
      $(this).removeClass('shared-duplicate');
    })

    if (id != null) {
      $('#sharing-settings').find('[data-id="' + id + '"]').parent().addClass('shared-duplicate');
    }
  }

  var prebuild_shared_profiles = function() {
    $('#sharing-settings').empty()
      .append('<div class="col-xs-12"><h5>Fetching data...</h5></div>');
  }

  var build_shared_profiles = function(data) {
    var master_record = ''
    $.each(data, function(profile, d) {
      var left_side = '<div class="col-xs-4">' + profile + '</div>';
      var right_side = '<div class="col-xs-8 row" data-profile-name="' + profile + '">';

      $.each(d, function(_junk, mcast) {
        right_side +=    '<div class="col-xs-12">'
                   +        mcast.guest_name
                   +        '<span class="pull-right glyphicon glyphicon-remove profile-unshare" '
                                + 'data-id="' + mcast.multicast_id + '">'
                   +        '</span>'
                   +     '</div>'
      })

      right_side +=      '<div class="col-xs-12">'
                 +          '<div class="col-xs-12 input-group input-group-sm share-cell">'
                 +            '<input tyle="text" class="form-control survivor-typeahead" placeholder="Type some name" />'
                 +          '</div>'
                 +       '</div>';

      right_side +=    '</div>'

      master_record += left_side + right_side;
    })

    $('#sharing-settings').empty().append(master_record);
    attach_unshare();
    attach_typeahead();
  }

  var attach_unshare = function() {
    // $('#sharing-settings').find('.profile-unshare').each(function() {
    //   var $this = $(this);

    //   $this.show();
    //   $this.off('click').on('click', function() {
    //     unshare($this);
    //   })
    // })
    $('#sharing-settings').find('.profile-unshare').show().off('click').on('click', function() {
      unshare($(this));
    })
  }

  var get_profile_name = function(obj) {
    return obj.parent().parent().parent().parent().attr('data-profile-name');
  }

  var mark_successfully_shared = function(obj, id, guest_name) {
    var cached = obj.parent().parent().parent();

    var replacement = '<div class="col-xs-12">' 
                    +   guest_name
                    +   '<span class="pull-right glyphicon glyphicon-remove profile-unshare" '
                    +         'data-id="' + id + '">'
                    +   '</span>'
                    + '</div>';

    cached.before(replacement);

    cached.parent().find('.profile-unshare').show().off('click').on('click', function() {
      unshare($(this));
    });
  }

  var unshare = function(obj) {
    var id = obj.attr('data-id');

    $.ajax({
      method: 'POST',
      url: '/profile/unshare',
      data: {
        id: id
      }
    }).done(function() {
      obj.parent().remove();
    })
  }

  var update_sync_conflict = function(local, server, local_utime, server_utime) {
    var prepare = function(data, utime, most_recent) {
      var p_time = new Date(utime);
      var sorted_keys = Object.keys(data).sort();
      var t = 'Last update: ' + p_time + '<br />';
      
      if (most_recent) {
        t += '<span class="text-success"><strong>(most recent)</strong></span><br />';
      }

      $.each(sorted_keys, function(_junk, k) {
        d = data[k];
        t += '<hr><div class="row"><div class="col-xs-4">'
          +    k + '<br />'
          +    'XP: ' + d.xp
          +  '</div>'
          +  '<div class="col-xs-8">'
          +    d.strain + ' '
          +    Object.keys(d.professions).join(', ') + '<br />'
          +    'HP: +' + d.hp + ' MP: +' + d.mp + ' Inf: -' + d.inf + '<br />'
          +    'Acquired: ' + d.acq + ' | Planned: ' + d.plan
          +  '</div></div>';
      })

      return t;
    }

    var compare_equal = function(a, b) {
      var is_equal = true;

      if (Object.keys(a).length != Object.keys(b).length) return false;
      $.each(a, function(name, _junk) {
        if (b[name] == undefined) {
          is_equal = false;
          return false;
        }
      })

      if (is_equal == false) return false;


      $.each(b, function(name, _junk) {
        if (a[name] == undefined) {
          is_equal = false;
          return false;
        }
      })

      if (is_equal == false) return false;
      // At this point, we know each stream contains identical profiles

      var granular_compare = function(xa, xb, prop) {
        return xa[prop] == xb[prop];
      }

      $.each(a, function(name, _data) {
        var cmp_a = a[name];
        var cmp_b = b[name];

        $.each(['xp', 'hp', 'mp', 'inf', 'acq', 'plan'], function(_junk, prop) {
          is_equal &= granular_compare(cmp_a, cmp_b, prop);
          //manager.log('CEQ: profile check: ' + prop + ' is equal: ' + is_equal);
        })

        if (is_equal == false) return false;
      })

      if (is_equal == false) return false;

      return true;
    }

    if (local_utime != server_utime) {
      if (compare_equal(local, server) == false) {
        $('#conflict-sync-local-data').empty().append(prepare(local, local_utime, local_utime > server_utime));
        $('#conflict-sync-server-data').empty().append(prepare(server, server_utime, server_utime > local_utime));
        $('#modal-sync-conflict').modal('show');
      }
    }
  }

  return {
    prebuild_shared_profiles: prebuild_shared_profiles,
    build_shared_profiles: build_shared_profiles,
    update_friendly_name: update_friendly_name,
    update_example_name: update_example_name,
    update_sync_conflict: update_sync_conflict
  }
}();
(function() {


}).call(this);
(function() {


}).call(this);
var calc = function() {
  var calc_all_timeout = setTimeout(null, 250);
  var data = {
    'skills-acquired': 0,
    'skills-planned': 0,
    'stats-acquired': 0,
    'stats-planned': 0,
    'profs-acquired': 0,
    'profs-planned': 0
  }

  var recalculate_all = function() {
    //if (dynaloader.has_delegations('initial_load')) { return; }
    if (!dynaloader.get_gil('ok_to_update_gui')) return;
    
    clearTimeout(calc_all_timeout);
    calc_all_timeout = setTimeout(function() {
      recalculate('skills-planned');
      recalculate('skills-acquired');
      recalculate_purchased_stats();
      recalculate_planned_stats();
      recalculate_purchased_profession();
      recalculate_planned_profession();
      recalculate_top_level('skills');
      recalculate_top_level('stats');
      recalculate_top_level('prof');

      recalculate_tally();
    }, 250);
  }

  var recalculate_skills = function() {
    recalculate('skills-planned');
    recalculate('skills-acquired');
    recalculate_top_level('skills');
    recalculate_tally();
  }

  var recalculate_purchased_stats = function() {
    data['stats-acquired'] = parseInt($('#stat-purchased-hp').val())
                           + parseInt($('#stat-purchased-mp').val());

    //$('#xp-stats-acquired').text(data['stats-acquired']);
    recalculate_top_level('stats');
    recalculate_tally();
  }

  var recalculate_purchased_profession = function() {
    var norm = Object.keys(profession_basic.selected()).length - 1;
    var forgotten = Object.keys(profession_basic.forgotten()).length;
    var conc = Object.keys(profession_conc.selected()).length;
    var adv = Object.keys(profession_adv.selected()).length;

    if (profile.get_current() != undefined) {
      if (profile.get_current()['strain'] == 'Remnants') norm--;
    }
    norm = norm < 0 ? 0 : norm;
    
    data['profs-acquired'] = 10 * (norm + forgotten * 2) + 30 * conc + 10 * adv;
    $('#xp-prof-acquired').text(data['profs-acquired']);
    recalculate_top_level('prof');
    recalculate_tally();
  }

  var recalculate_planned_profession = function() {
    var sum = 0;
    $('#skills-planned').find('.tool-prof-xp').each(function() {
      sum += parseInt($(this).text());
    })

    data['profs-planned'] = sum;
    $('#xp-prof-planned').text(data['profs-planned'])
    recalculate_top_level('prof');
    recalculate_tally();
  }

  var recalculate_planned_stats = function() {
    var sum = 0;

    $('#skills-planned').find('.stat-cost').each(function() {
      sum += parseInt($(this).text());
    })
    $('#skills-planned-stats').text(sum);

    data['stats-planned'] = sum;

    recalculate_top_level('stats');
    recalculate_tally();
  }

  var recalculate_tally = function() {
    $('#xp-total-acquired').text(data['skills-acquired'] + data['stats-acquired'] + data['profs-acquired']);
    $('#xp-total-planned').text(data['skills-planned'] + data['stats-planned'] + data['profs-planned']);
  }

  var recalculate_top_level = function(id) {
    $('#xp-' + id + '-acquired').text(data[id + '-acquired']);
    $('#xp-' + id + '-planned').text(data[id + '-planned']);
  }

  var recalculate = function(id) {
    var sum = 0;

    $('#' + id).find('.skill-cost').each(function() {
      sum += parseInt($(this).text());
    })

    $('#' + id + '-xp').text(sum);

    data[id] = sum;
  }

  return {
    recalculate_all: recalculate_all,
    recalculate_skills: recalculate_skills,
    recalculate_planned_stats: recalculate_planned_stats,
    recalculate_purchased_stats: recalculate_purchased_stats,
    recalculate_purchased_profession: recalculate_purchased_profession,
    recalculate_planned_profession: recalculate_planned_profession
  }
}();
var dragdrop = (function() {
  var selected = {};
  var last_trigger = null;
  var right_side_selected = false;
  var debug = false;
  var non_skill_trigger = null;

  var attach = function() {
    $('div[data-accessible]').on('click', function() {
      handle_drag($(this).attr('id'));
      return false;
    })

    $('#skills-acquired').on('click', function() { drop($(this)); });
    $('#skills-planned').on('click', function() { drop($(this)); });

    $('div.tool-checkin-planner').on('click', function() { select_non_skill($(this)); });
    $('div.tool-stat-planner').on('click', function() { select_non_skill($(this)); });
    $('div.tool-prof-planner').on('click', function() { select_non_skill($(this)); });


    $('div.tool-separator').on('click', function() {
      select_non_skill($(this), true);
    })

    //$('#skill-pool').find('[data-accessible]').on('click', function() { drop_alphabetically($(this)); })
  }

  var enable_debug = function(x) {
    debug = x;
  }

  var handle_drag = function(id) {
    select(id, selected[id] != undefined);
  }

  var highlight_drop_handle = function(mask) {
    var enable = Object.keys(selected).length > 0;
    disable_rightside_interactivity(enable, false);
    if (enable) {
      $('#skill-pool').addClass('drop-highlight');
      $('#skills-acquired').addClass('drop-highlight');
      $('#skills-planned').addClass('drop-highlight');
      $('.tool-separator').addClass('drop-highlight-group');

      mask.removeClass('drop-highlight drop-highlight-group');

      //$('#' + last_trigger).parent().removeClass('drop-highlight');
    } else {
      $('#skill-pool').removeClass('drop-highlight');
      $('#skills-acquired').removeClass('drop-highlight');
      $('#skills-planned').removeClass('drop-highlight');
      $('.tool-separator').removeClass('drop-highlight-group');
    }
  }

  var disable_rightside_interactivity = function(val, plan_only) {
    var target = ['#skills-planned'];

    if (plan_only == false) {
      target.push('#skills-acquired');
    }

    if (val) {
      $.each(target, function(_junk, _x) {
        var x = $(_x);
        x.find('.glyphicon-arrow-up').hide();
        x.find('.glyphicon-arrow-down').hide();
        //x.find('.badge.pull-right').hide();
        x.find('.glyphicon-option-horizontal').hide();
        x.find('.glyphicon-menu-up').hide()
        x.find('.glyphicon-menu-down').hide()
        x.find('.glyphicon-minus').hide();
        x.find('.glyphicon-plus').hide();
        x.find('.glyphicon-refresh').hide();
        //x.find('span.pull-right').hide();
        x.find('.tool-editable').editable('disable').attr('style', '');
      });
    } else {
      $.each(target, function(_junk, _x) {
        var x = $(_x);
        x.find('.glyphicon-arrow-up').show();
        x.find('.glyphicon-arrow-down').show();
        //x.find('.badge.pull-right').show();
        x.find('.glyphicon-option-horizontal').show();
        x.find('.glyphicon-menu-up').show()
        x.find('.glyphicon-menu-down').show()
        x.find('.glyphicon-minus').show();
        x.find('.glyphicon-plus').show();
        x.find('.glyphicon-refresh').show();
        //x.find('span.pull-right').show();
        x.find('.tool-editable').editable('enable');
      });
    }
  }

  var rectify_drop_parent = function(obj) {
    if (!tooling.is_group(obj) && !obj.hasClass('drop-container')) {
      return obj.parent();
    }

    return obj;
  }

  var drop = function(_obj, prepend) {
    //console.log('dropping to ' + obj.attr('id'));

    //console.log(last_trigger + ' <> ' + obj.attr('id'));
    /*if (Object.keys(selected).length == 0) return;
    if (last_trigger == obj.attr('id')) return;
    if ($('#' + last_trigger).parent().attr('id') == obj.attr('id')) return;
*/

    var obj = _obj == undefined ? $('<div/>') : _obj;
    var drop_to_pool = obj.attr('id') == 'skill-pool';
    var parent_container = obj;
    $.each(selected, function(id, v) {
      var to_append = $('#' + id);

      if (obj.hasClass('tool-separator')) {
        parent_container = obj.parent();
        animate_translocate(to_append, function() {
          to_append.insertAfter(obj);
        });
        tooling.attach_handles(to_append, true);
      } else if (drop_to_pool) {
        drop_alphabetically();
        tooling.attach_handles(to_append, false);
        // console.log(' !!! Normal drop : sort() ');
        skill_interface.sort_pool();
      } else {
        rectified_obj = rectify_drop_parent(obj);
        if (prepend != undefined) {
          to_append.show().prependTo(rectified_obj);
        } else {
          to_append.show().appendTo(rectified_obj);
        }
        tooling.attach_handles(to_append, true);
      }
    })

    skill_popup.destroy();
    deselect_all();
    highlight_drop_handle(false);
    tooling.auto_indent(parent_container);
    tooling.compute_group($('#skills-planned'));
    tooling.compute_group($('#skills-acquired'));
    tooling.auto_indent_all();
    calc.recalculate_skills();
    skills.validate();
    profession_basic.verify_count();
    profession_conc_interface.validate_existing();
    profession_adv.update();
    profile.save_all();
  }

  var animate_translocate = function(obj, func) {
    obj.hide();

    func();

    obj.show().css('opacity', 0).velocity({
      opacity: 1
    }, 1000)
  }

  var drop_selective = function(id, obj, append) {
    deselect_all();
    selected[id] = true;
    drop(obj, (append == 'append' ? undefined : 'prepend'));
  }

  var drop_to_pool = function(id, _with_force_filterview) {
    var with_force_filterview = _with_force_filterview == undefined ? false : _with_force_filterview;
    deselect_all();

    if (Array.isArray(id)) {
      $.each(id, function(_junk, x) {
        selected[x] = true;
      })
    } else {
      selected[id] = true;
    }

    drop_alphabetically();
    skill_interface.sort_pool();
  }

  var drop_alphabetically = function() {
    $.each(selected, function(id, v) {
      var obj = $('#' + id);
      var skill_name = skills.hash(id);
      var anchor;

      tooling.attach_handles(obj, false);
      /*$.each($('#skill-pool').find('[data-accessible]'), function() {
        var current_search = $(this).text();
        if (debug) console.log('current search = ' + current_search);

        if (current_search > skill_name) {
          anchor = $(this).attr('id');
          console.log('insert ' + skill_name + ' before ' + current_search);
          return false;
        }
      })

      if (anchor != null) {
        obj.insertBefore($('#' + anchor));
      } else {
        $('#skill-pool').append(obj);
      }*/
      $('#skill-pool').append(obj);
      reset_animation_state(obj);
      // skill_interface.sort_pool();
    })

    deselect_all();
    highlight_drop_handle(false);
    tooling.compute_group($('#skills-planned'));
    tooling.compute_group($('#skills-acquired'));
    tooling.auto_indent_all();
    skill_popup.destroy();
    calc.recalculate_skills();
    skills.validate();
    profession_basic.verify_count();
    profession_conc_interface.validate_existing();
    profession_adv.update();
    return false;
  }

  var reset_animation_state = function(obj) {
    var is_altered = obj.attr('data-group-altered') == undefined ? false : true;

    if (is_altered) {
      obj.removeAttr('style');
    }
    
  }

  var get_parent_container = function(obj) {
    var current_id = null;
    var current_obj = obj

    while (current_id != 'skill-pool' && current_id != 'skills-acquired' && current_id != 'skills-planned') {
      current_obj = current_obj.parent();

      if (current_obj.length == 0) {
        //alert('Can\'t find parent countainer');
        return null;
      }

      current_id = current_obj.attr('id');
    }

    return current_obj;
  }

  var get_parent_group_or_container = function(obj) {
    var current_id = null;
    var current_obj = obj;

    while (current_id != 'skills-acquired' && current_id != 'skills-planned' && !current_obj.hasClass('tool-separator')) {
      current_obj = current_obj.prev();

      if (current_obj.length == 0) {
        return obj.parent();
        //return null;
      }

      current_id = current_obj.attr('id');
    }

    return current_obj;
  }

  var select_tool = function(obj) {
    if (has_selected()) {
      drop(get_parent_group_or_container(obj));
    }
  }

  var _select = function(obj, id, value) {
    var mask = get_parent_container(obj);
    if (value) {
      delete selected[id];
      obj.removeClass('bg-warning');
    } else {
      selected[id] = true;
      obj.addClass('bg-warning');
    }

    highlight_drop_handle(mask);
  }

  var has_selected = function() {
    return Object.keys(selected).length > 0;
  }

  var highlight_droppable_plan = function(val) {
    if (val) {
      $('#skills-planned').find('.tool-separator').addClass('drop-highlight-group');
    } else {
      $('#skills-planned').find('.tool-separator').removeClass('drop-highlight-group');
    }
  }

  var select_non_skill = function(obj, _masked) {
    var masked = _masked != undefined && _masked;

    var highlight = function(target, val) {
      if (val) {
        target.addClass('bg-warning')
      } else {
        target.removeClass('bg-warning');
      }

      highlight_droppable_plan(val);
      disable_rightside_interactivity(val, true);
    }

    

    if (non_skill_trigger == null) {
      if (!masked) {
        highlight(obj, true);
        non_skill_trigger = obj;
      }
    } else {
      highlight(non_skill_trigger, false);
      var pc = get_parent_container(obj);
      if (pc.attr('id') == 'skills-planned') {
        obj.after(non_skill_trigger);
        tooling.auto_indent($('#skills-planned'));
        profile.save_all();
        non_skill_trigger = null;
      }
    }
  }

  var select = function(id, is_selected) {
    var obj = $('#' + id);
    var current_trigger = get_parent_container(obj).attr('id');

    manager.log('Select triggered on skill ID ' + id + ' [' + is_selected + ']');
    manager.log('Last <> Curr: ' + last_trigger + ' <> ' + current_trigger);
    manager.log('Has selected: ' + has_selected());
    // if (is_selected) {
    //   _select(obj, id, false);
    // } else {
    //   _select(obj, )
    // }

    if (last_trigger == null
        || (!has_selected())
        || ( has_selected() && current_trigger == last_trigger)) {
      if (obj.attr('data-accessible') == 'true') {
        last_trigger = get_parent_container(obj).attr('id');
        _select(obj, id, is_selected);
        notifier.select(Object.keys(selected).length);
      }
    } else {
      drop(get_parent_container(obj));
    }
    
    /*var is_skill_pool = $('#' + id).parent().attr('id') == 'skill-pool';
    tooling.hide_popover();

    if (right_side_selected && is_skill_pool) {
      drop_alphabetically();
      return false;
    }

    var last_trigger_parent = get_parent_container(last_trigger);
    var current_trigger_parent = get_parent_container(id);

    console.log(last_trigger_parent + ' <> ' + current_trigger_parent + ' [' + is_selected + ']');
    if (last_trigger_parent != null && (last_trigger_parent != current_trigger_parent)) {
      drop(last_trigger_parent);
      last_trigger = null;
      return;
    }

    var clicked = $('#' + id);
    if (clicked.attr('data-accessible') == 'false') return;

    if (is_selected) {
      delete selected[id];
      clicked.removeClass('bg-warning');
      highlight_drop_handle(false);

      var parent_id = clicked.parent().attr('id');
      if (Object.keys(selected).length == 0 &&
          (parent_id == 'skills-planned' || parent_id == 'skills-acquired')) {
        right_side_selected = false;
      } 
      //last_trigger = null;
    } else {
      selected[id] = true;
      clicked.addClass('bg-warning');

      var parent_id = clicked.parent().attr('id');
      if (parent_id == 'skills-planned' || parent_id == 'skills-acquired') {
        right_side_selected = true;
      } 
      last_trigger = id;
      highlight_drop_handle(Object.keys(selected).length > 0);
    }*/
  }

  var deselect_all = function() {
    $.each(selected, function(k, v) {
      $('#' + k).removeClass('bg-warning');
    })

    highlight_droppable_plan(false);

    selected = {};
    last_trigger = null;
    non_skill_trigger = null;
    //right_side_selected = false;
    notifier.select(null);
    skill_popup.hide();
    highlight_drop_handle();
  }

  return {
    attach: attach,
    deselect_all: deselect_all,
    //drop: drop,
    drop_selective: drop_selective,
    drop_to_pool: drop_to_pool,
    selected: function() { return selected; },
    select_tool: select_tool,
    deselect_all: deselect_all,
    enable_debug: enable_debug
  }
})();
var skill_popup = function() {
  var data = {};
  var current_click;
  var state;
  var timeout = setTimeout(null, 0);

  var attach = function() {
    $('div[data-accessible]').on('click', function() {
      handle($(this).attr('id'));
    })
  }

  var build = function(id) {

  }

  var traverse_to_parent = function(id) {
    return generic.traverse_to_parent(id);
    /*var obj = $('#' + id).parent();
    var id = obj.attr('id');

    while(id != 'skill-pool' && id != 'skills-acquired' && id != 'skills-planned') {
      obj = obj.parent();
      id = obj.attr('id');
    }

    return '#' + id;*/
  }

  var handle = function(id) {
    var smart_trigger = function() {
      if (current_click == id) {
        if (state == 'shown') {
          $('#' + id).popover('hide');
          state = 'hidden';
        } else {
          $('#' + id).popover('show');
          state = 'shown';
        }
      } else {
        $('#' + current_click).popover('hide');
        $('#' + id).popover('show');
        state = 'shown';
      }

      current_click = id;
    }

    clearTimeout(timeout);
    if (data[id] == undefined) {
      timeout = setTimeout(function() {
        var skill_name = skills.get_name(id);
        $('#' + id).popover({
          content: get_details(id),
          trigger: 'manual',
          html: true,
          placement: 'auto bottom',
          viewport: traverse_to_parent(id),
          container: traverse_to_parent(id),
          title: '<div>'
               +   '<span class="glyphicon glyphicon-question-sign skill-info-query pull-left" data-skill-name="' + skill_name + '"></span>'
               +   '&nbsp; '
               +   '<span class="text-info"><strong>' 
               +     skill_name
               +     ' (MP: ' + skill_interface.get_mp_cost(skill_name) + ')'
               +     '<span class="pull-right popover-skill-close"><button type="button" class="close">&times;</button></span>'
               +   '</strong></span>'
               + '</div>'
               + '<div class="row"></div>',
          template: '<div class="popover popover-skill" role="tooltip">'
                  +   '<div class="arrow"></div>'
                  +   '<div class="popover-title"></div>'
                  +   '<div class="popover-content"></div>'
                  + '</div>'
          //viewport: '#skill-pool'
        }).on('shown.bs.popover', function() {
          var that = $(this);
          $('.popover').find('button.close').on('click', function() {
            that.popover('hide');
            return false;
          })
          $('.popover').off('click').on('click', function() {
            return false;
          })

          $('.popover').find('.glyphicon-question-sign').off('click').on('click', function() {
            skill_interface.show_description($(this).attr('data-skill-name'));
            $('#skill-desc').modal('show');

            return false;
          })
        })

        data[id] = true;
        smart_trigger();
      }, 25);
    } else {
      smart_trigger();
    }

    //var op = $('#' + id).data('bs.popover').options;
    //op.content = get_details(id);
    //op.viewport = traverse_to_parent(id);
    //op.container = traverse_to_parent(id);

    //console.log(op);


  }

  var append_preqs = function(skill, key) {
    if (skills.has_tier(skill)) return '';
    var o = skill_preq.get_specific(skill, key);

    var join_list = function(list, needle) {
      var s = [];
      $.each(list, function(k, v) {
        s.push(k + ' (' + skills.get_cost(k) + ')');
      })
      return s.join(needle);
    }
    
    if (o != undefined && o.list != undefined) {
      var needle = o.predicate == 'and' ? ' & ' : ' | ';
      return '&raquo; ' + join_list(o.list, needle);
    }

    return '';
  }

  var get_details = function(id) {
    var s = '';
    var skill_name = skills.hash(id);
    
    var skill = skills.data()[skill_name]
    var cond = skill.conditions;
    var constraint = skills.constraint_satisfied(skill);
    var base_cost = constraint.base_cost;
    var min_cost = constraint.is_satisfied ? Object.keys(constraint.possible_costs).sort()[0] : -1;
    var is_open = constraint.is_open;
    var has_strain = (cond.innate != undefined && cond.innate.length > 0)
                  || (cond.innate_disadvantage != undefined && cond.innate_disadvantage > 0)
                  || (cond.innate_disabled != undefined && cond.innate_disabled > 0)
    var preqs = skill_preq.get(skill_name);
    var preq_class = 'cond-preq';


    if (is_open) {
      s += '<div>Open: ' + cond.open + '</div><hr/>';
    }

    var innate_class = 'cond-disabled';
    var profession_class = 'cond-disabled';

    var config = skills.get_config();
    var strain = config.strain;
    var professions = config.professions;

    $.each(cond.innate, function(i, x) {
      if (strain == x) { 
        innate_class = 'cond-cheapest'; 
      } else {
        innate_class = 'cond-disabled';
      }
      
      s += '<div class="' + innate_class + '">' + x + ': ' + 3 + '</div>';
      if (innate_class == 'cond-disabled') {
        s += '<div class="' + innate_class + '">' + append_preqs(skill_name, x) + '</div>';
      } else {
        s += '<div class="' + preq_class + '">' + append_preqs(skill_name, x) + '</div>';
      }
    })

    innate_class = 'cond-disabled';
    $.each(cond.innate_disadvantage, function(i, x) {
      if (strain == x) { innate_class = 'cond-error'; }
      s += '<div class="' + innate_class + '">' + x + ': [x2]</div>';
      if (innate_class == 'cond-disabled') {
        s += '<div class="' + innate_class + '">' + append_preqs(skill_name, x) + '</div>';
      } else {
        s += '<div class="' + preq_class + '">' + append_preqs(skill_name, x) + '</div>';
      }
    })

    innate_class = 'cond-disabled';
    $.each(cond.innate_disabled, function(i, x) {
      if (strain == x) { innate_class = 'cond-error'; }
      s += '<div class="' + innate_class + '">' + x + ': [Disabled]</div>';
    })

    if (has_strain) {
      s += '<hr>';
    }

    var is_purchased_profession = function(query) {
      var is_found = false;

      $.each(professions, function(k, v) {
        if (k == query) {
          is_found = true;
          return false;
        }
      })

      return is_found;
    }

    $.each(cond, function(k, v) {
      profession_class = 'cond-disabled';
      if (profession_basic.is_profession(k) 
       || profession_conc.is_profession(k)
       || profession_adv.is_profession(k)) {
        if (is_purchased_profession(k)) {
          profession_class = 'cond-discounted';

          if (min_cost == v.cost) {
            profession_class = 'cond-cheapest'
          }
        }
        

        s += '<div class="' + profession_class + '">' + k + ': ' + v.cost + '</div>';
        if (profession_class == 'cond-disabled') {
          s += '<div class="' + profession_class + '">' + append_preqs(skill_name, k) + '</div>';
        } else {
          s += '<div class="' + preq_class + '">' + append_preqs(skill_name, k) + '</div>';
        }
      }
      // } else if (profession_conc.is_profession(k)) {
      //   s += '<div>' + k + '</div>';
      // }
    })

    var interaction = skills.get_interaction(skill_name);
    var ias = new Array();
    var c = '';
    if (interaction.counters != undefined) {
      ias.push('<span class="label label-success">Counters</span> ' 
               +  interaction.counters.join(', '));
    }

    if (interaction.countered != undefined) {
      ias.push('<span class="label label-warning">Countered by</span> ' 
               +  interaction.countered.join(', '));
    }

    c = ias.join('<br />');

    return '<div class="popover-costs">'
         +   s
         + '</div>'
         + (c.length > 0 
           ? ('<div class="popover-interactions">'
             +   c
             +'</div>')
           : '');
  }


  var hide = function() {
    $('#' + current_click).popover('hide');
    state = 'hidden';
  }

  var destroy = function() {
    if (current_click == null) return;

    // var obj = $('#' + current_click);
    // obj.popover('destroy');
    // data = {};
    $.each(data, function(id, _junk) {
      $('#' + id).popover('destroy');
    })
    data = {}
    
    state = 'hidden';
    //delete data[current_click];
    clearTimeout(timeout);   
    //console.log(' >>> destroyed ' + current_click); 
  }

  return {
    attach: attach,
    hide: hide,
    destroy: destroy
  }
}();
var skill_preq = function() {

  var get = function(skill) {
    //if (data[skill] != undefined) return data[skill];
    //return build(skill);
    return skills.data()[skill].conditions;
  }

  var get_specific = function(skill, key) {
    var g = get(skill);
    var anchor = g[key];

    if (anchor == undefined) {
      if (g.innate_preq == undefined) return null;
      
      anchor = g.innate_preq[key];
      return anchor;
    }

    return anchor.preq;
  }

  return {
    get: get,
    get_specific: get_specific,
    invalidate_all: function() { data = {}; }
  }
}();
var skill_beautifier = function() {
  var new_window = null;

  var beautify = function(ds) {
    var t = '';
    $.each(ds, function(title, text) {
      t += format(title, text);
    })

    return t;
  }

  var dump_to_new_window = function(x, strain_skill_descs) {
    if (new_window == null) {
      new_window = window.open('', 'skill-descs');
    } else {
      new_window.close();
      new_window = window.open('', 'skill-descs');
    }
    var footer_code = new Array();

    $('body').find('link[rel="stylesheet"]').each(function() {
      footer_code.push($(this).prop('outerHTML'));
    })

    var content = '<html>'
                +   '<head>'
                +     $('head').html()
                +   '</head>'
                +   '<body>'
                +     '<div class="container-fluid">'
                +       strain_skill_descs
                +       '<hr />'
                +       x
                +     '</div>'
                +     footer_code.join('')
                +   '</body>'
                + '</html>'

    new_window.document.write(content);
  }

  var load_all = function() {
    $('#skill-panel').empty();

    $.ajax({
      method: 'GET',
      url: '/skills/fetch',
      data: { skill_codes: 'all' },
      cache: false
    }).done(function(res) {
      $('#skill-panel').empty().append(beautify(res));
    })
  }

  var format = function(title, text) {
    var cost = dynaloader.raw()['skill_mp_cost'][title];
    var t = '<div class="skill-title">' 
          +   title 
          +   '(MP: ' + cost + ')'
          + '</div>';

    console.log(cost);
    t += process(text);
    return t;
  }

  var process = function(text) {
    if (text == undefined) {
      return '<div class="skill-body">Skill info not available</div>';
    }

    var p_splits = text.split('{p}');
    var li_splits = new Array();
    var table_splits = new Array();

    $.each(p_splits, function(_junk, p_split) {
      var splits = p_split.split('{li}');
      var split_count = splits.length;

      if (split_count == 1) {
        li_splits.push(p_split)
      } else {
        splits[0] += '<ul>';
        splits[split_count - 1] += '</ul>';
        var split_join = splits.join('</li><li>');
        li_splits.push(split_join);
      }
    })

    $.each(li_splits, function(_junk, li_split) {
      var ls_match = li_split.match(/\{table\:(\d+)}/);
      if (ls_match) {
        var column_per_row = parseInt(ls_match[1]);
        var lr_split = li_split.split(/\{table\:\d+\}/);
        var leftside = lr_split[0];
        var rightside = lr_split[1];
        var cells = rightside.split('|||')

        var cell_counter = 0;
        var t = leftside + '<table class="table table-striped table-condensed"><thead>';
        var equal_width = 100.0 / column_per_row;

        $.each(cells, function(i, text) {
          if (cell_counter % column_per_row == 0 && cell_counter != 0) {
            if (cell_counter <= column_per_row) {
              t += '</tr></thead><tbody>';
            } else {
              t += '</tr><tr>';
            }
          }

          if (cell_counter < column_per_row) {
            t += '<th style="width:' + equal_width + '%">' + text + '</th>';
          } else {
            t += '<td>' + text + '</td>';
          }

          cell_counter++;
        })
        t += '</tbody></table>';

        table_splits.push(t.replace('{/table}', ''));

      } else {
        table_splits.push(li_split);
      }
    })

    var p_join = '<p>' + table_splits.join('</p><p>') + '</p>';

    return '<div class="skill-body">' + p_join + '</div>';
  }

  return {
    load_all: load_all,
    process: process,
    dump_to_new_window: dump_to_new_window
  }
}();
var skill_interface = (function() {
  var timeout = 0;
  var timeout_sort = setTimeout(null, 0);

  var apply_filters = function() {
    filterview.apply_all();
  }

  var attach_alternator = function() {
    $('span.skill-cost').on('click', function() {
      alternate($(this));
      return false;
    })
  }

  var alternate = function(obj) {
    var parent = obj.parent();
    var is_open = parent.find('.btn-alternator').length > 0;

    if (is_open) {
      parent.find('.btn-alternator').remove();
      return;
    }

    var skill_name = parent.find('.skill-name').text();
    var possible_costs = skills.get_all_possible_costs(skill_name);
    var current_cost = parseInt(obj.text());
    var anchor = obj;
    var skill_id = parent.attr('id');

    var min_cost = Object.keys(possible_costs).sort()[0];

    $.each(Object.keys(possible_costs).sort().reverse(), function(_junk, val) {
      if (val != current_cost) {
        var button = '<button type="button" class="pull-right btn btn-sm btn-primary btn-alternator">' + val + '</button>';
        anchor.before(button);
      }
    })

    parent.find('.btn-alternator').each(function() {
      var val = parseInt($(this).text());
      $(this).on('click', function() {
        parent.find('.btn-alternator').remove();
        var marker = (val == min_cost) ? '' : '<sup>+</sup>'; 
        obj.html(val + marker);

        calc.recalculate_skills();
        var leader = $(traverse_to_parent(skill_id));
        tooling.compute_group(leader);
        profile.save_all();
        return false;
      })
    })

  }

  var mark_planned = function(planned) {
    $.each(planned, function(k, v) {
      $.each(v, function(skcode, _junk) {
        var target = $('#' + skcode);
          //.find('.plan-marker').remove()
        if (target.find('.plan-marker').length == 0) {
          target.find('.skill-name')
            .after('<span class="plan-marker">*</span>')
        }
      })
    })
  }

  var unmark_planned = function(data) {
    $.each(data, function(k, v) {
      $.each(v, function(skcode, _junk) {
        $('#' + skcode).find('.plan-marker').remove();
      })
    })
  }

  var unmark_profession = function(data) {
    $.each(data, function(skcode, _junk) {
      $('#' + skcode).find('.plan-marker').remove();
    })
  }

  var traverse_to_parent = function(id) {
    return generic.traverse_to_parent(id);
  }

  var build = function(data) {
    var r = '';
    var p_adv = '<span><sup>ADV</sup></span>';
    var p_conc = '<span><sup>CONC</sup></span>';
    var p_uniq = '<span><sup>UNIQ</sup></span>';
    var p_npc = '<span><sup>NPC</sup></span>';

    Object.keys(data).sort().forEach(function(k, i) {
      var shorthand = data[k].shorthand;
      filterview.set_once(shorthand, data[k].type);

      r += '<div class="skill skill-infancy" id="' + shorthand + '" '
         +   'data-type="' + data[k].type + '" ' 
         +   ((data[k].psi_level != undefined && data[k].psi_level > 0) ? 'data-psi-level=' + data[k].psi_level + ' ': '')
         +   'data-accessible=false '
         +   'data-discounted=false '
         + '>'
         +   (data[k].type == 'conc' ? p_conc : '')
         +   (data[k].type == 'adv' ? p_adv : '')
         +   (data[k].type == 'npc' ? p_npc : '')
         +   ((data[k].unique || false) == true ? p_uniq : '')
         +   '<span class="skill-name">' + k + '</span>'
         +   '<span class="badge badge-default skill-cost pull-right" id="' + shorthand + '-cost" data-badge="skill-cost"></span>'
         + '</div>';
    })
    
    $('#skill-pool').append(r);
    $('#skill-desc').modal({
      show: false
    }).on('show.bs.modal', function() {
      skill_popup.destroy();
      var height = $(window).height() - 128;
      $('#skill-desc-body').css('max-height', height + 'px');
    }).on('shown.bs.modal', function() {
      $('body').css('padding-right', 0);
    })

    $('#skill-info-config').modal({
      show: false
    }).on('shown.bs.modal', function() {
      $('body').css('padding-right', 0);
    })

    $('#generate-skill-info').on('click', function(event) {
      $('#skill-info-config').modal('show');
      event.preventDefault();
    })

    $('#exec-info-generate').on('click', function() {
      $('#skill-info-config').modal('hide');
      skill_beautifier.dump_to_new_window(build_formatted_skill_descs(),
                                          build_strain_skill_descs());
      return false;
    })
    attach_alternator();
  }

  var get_all_accessible_skills = function() {
    var h = {};
    $('div.skill[data-accessible="true"]').each(function() {
      var t = $(this).find('.skill-name').text();
      h[t] = true;
    })

    return h;
  }

  var build_strain_skill_descs = function() {
    var t = '';
    var sd = dynaloader.raw()['skill_desc'];
    var stats = dynaloader.raw()['strain_stats'][profile.get_strain()];

    t += '<div class="strain-info">'
      +    profile.get_strain()
      +  '</div>'
      +  '<div class="row">'
      +    '<div class="col-xs-4">Health: ' + stats.hp + '</div>'
      +    '<div class="col-xs-4">Mind: ' + stats.mp + '</div>'
      +    '<div class="col-xs-4">Infection: ' + stats.infection + '</div>'
      +  '</div>'
      +  '<hr />';

    $.each(strains.get_innate(profile.get_strain()), function(i, x) {
      t += '<div class="skill-title">Strain: '
        +    x
        +  '</div>'
        +  skill_beautifier.process(sd[x]);
    });

    // DEBUG ONLY
    // Print all strains' innate skills
    // $.each(strains.data(), function(strain, _junk) {
    //   t += strain;

    //   $.each(strains.get_innate(strain), function(i, x) {
    //     t += '<div class="skill-title">Strain: '
    //     +    x
    //     +  '</div>'
    //     +  skill_beautifier.process(sd[x]);
    //   })
    // })

    return t;
  }

  var build_formatted_skill_descs = function() {
    var sd = dynaloader.raw()['skill_desc'];
    var processed = {};
    var h_t = {};
    var t = '';

    var filter_config = $('#skill-info-config').find('input[name="infofilter"]:checked').attr('value');
    var include_lore = $('#skill-info-config').find('input[name="with-lore"]').prop('checked');
    var include_psi = $('#skill-info-config').find('input[name="with-psi"]').prop('checked');
    var include_npc = $('#skill-info-config').find('input[name="with-npc"]').prop('checked');
    var get_non_strain_skills = function() {
      return Object.keys(dynaloader.raw()['skill_desc'])
                   .filter( key => !strains.is_strain_skill(key))
                   .reduce( (res, key) => (res[key] = dynaloader.raw()['skill_desc'][key], res), {} );
    }

    var data;

    switch (filter_config) {
      case 'acqplan': data = profile.get_all_skills(); break;
      case 'accessible': data = get_all_accessible_skills(); break;
      case 'all': data = get_non_strain_skills(); break;//dynaloader.raw()['skill_desc']; break;
    }

    $.each(data, function(_name, _junk) {
      var name = sanitize(_name);

      if (!include_lore && name.match(/^Lore/) != null) return true;
      if (!include_psi && name.match(/^Psi/) != null) return true;
      if (!include_npc 
        && skills.data()[name] != undefined 
        && skills.data()[name].type == 'npc') return true;

      if (processed[name] != undefined) {

      } else {
        var h = sd[name];
        h_t[name] = skill_beautifier.process(h);

        processed[name] = true;
      }
    });

    $.each(Object.keys(h_t).sort(), function(_junk, key) {
      t += '<div class="skill-title">' 
        +    key 
        +    ' (MP: ' + get_mp_cost(key) + ')'
        + '</div>';
      t += h_t[key];
    })

    return t;
  }

  var clear_alternator = function() {
    $('.btn-alternator').remove();
  }

  var generate_signet = function(obj, satisfied_professions, professions) {
    var s = '<div class="row signet">';
    var length = Object.keys(professions).length + 1;
    var cell_length = 100.00 / length;
    var bs_col_factor = 'width: ' + cell_length + '%';


    var open_style = 'style="' + bs_col_factor + '; float: left"';
    if (satisfied_professions['open'] != undefined) {
      s    += '<div class="signet-cell signet-open" ' + open_style + '></div>';
    } else {
      s    += '<div class="signet-cell signet-empty" ' + open_style + '></div>';
    }

    $.each(professions, function(prof, order) {
      var offset = 'left: ' + cell_length * (order + 1) + '%';
      var style = 'style="' + bs_col_factor + '; ' + offset + '; float: left"';
      if (satisfied_professions[prof] != undefined) {
        s  += '<div class="signet-cell signet-' + order + '" ' + style + '></div>';
      } else {
        s  += '<div class="signet-cell signet-empty" ' + style + '></div>';
      }
    })



    s    += '</div>';
    obj.find('.signet').remove();
    obj.append(s);
  }

  var display = function(id, costs, is_open, satisfied_professions, professions) {
    var obj = $('#' + id);
    var cost = $('#' + id + '-cost');

    generate_signet(obj, satisfied_professions, professions);


    obj.attr('data-accessible', true);
    filterview.set(id, 'accessible', true);

    if (!is_open) {
      obj.attr('data-discounted', true);
      filterview.set(id, 'discounted', true);

      cost.addClass('badge-success');
    } else {
      if (Object.keys(costs).length > 1) {
        obj.attr('data-discounted', true);
        filterview.set(id, 'discounted', true);

        cost.addClass('badge-success');
      } else {
        obj.attr('data-discounted', false);
        filterview.set(id, 'discounted', false);

        cost.removeClass('badge-success');
      }
    }

    /*
    if (Object.keys(costs).length > 1) {
      obj.attr('data-discounted', true);
      filterview.set(id, 'discounted', true);

      cost.addClass('badge-success');
    } else {

      if (!is_open) {
        obj.attr('data-discounted', true);
        filterview.set(id, 'discounted', true);

        cost.addClass('badge-success');
      } else {
        obj.attr('data-discounted', false);
        filterview.set(id, 'discounted', false);

        cost.removeClass('badge-success');
      }
    }*/

    obj.removeClass('skill-infancy');

    cost.text(Object.keys(costs).sort(numeric_sort)[0]);
  }

  var numeric_sort = function(a, b) {
    return parseInt(a) - parseInt(b);
  }

  var remove = function(id) {
    var obj = $('#' + id);
    var cost = $('#' + id + '-cost');
    obj
      .attr('data-accessible', false)
      .attr('data-discounted', false)
      .find('.signet').remove();

    filterview.set(id, 'accessible', false);
    filterview.set(id, 'discounted', false);

    cost.removeClass('badge-success');
    cost.text('');
    //dragdrop.drop_to_pool(id);
  }

  var reset_all = function() {
    $('div[data-accessible]')
      .addClass('skill-infancy')
      .attr('data-accessible', false)
      .attr('data-discounted', false)
      .find('span.badge')
        .removeClass('badge-success')


    $('span[data-badge]').text('');
  }

  var reset_to_pool = function() {
    reset_all();

    var ids = new Array();
    $('#skills-acquired').find('.skill').each(function() {
      ids.push($(this).attr('id'));
    })

    $('#skills-planned').find('.skill').each(function() {
      ids.push($(this).attr('id'));
    })

    dragdrop.drop_to_pool(ids, true);
  }

  var sort_pool = function() {
    if (!dynaloader.get_gil('ok_to_sort') || !dynaloader.get_gil('ok_to_update_gui')) return;
    clearTimeout(timeout_sort);
    timeout_sort = setTimeout(function() {
      manager.log('sort pool called');

      var items = $('#skill-pool').children();
      items.sort(function(a, b) {
        var va = $(a).find('.skill-name').text();
        var vb = $(b).find('.skill-name').text();
        //console.log('comparing ' + va + ' with ' + vb);
        return (va < vb) ? -1 : 1;
      })

      $('#skill-pool').append(items);
    }, timeout);
    
  }

  var get_all_unselected = function() {
    var a = get_skills_in('skills-planned');
    var b = get_skills_in('skills-acquired');

    return Object.assign({}, a, b);
  }

  var get_skills_in = function(id) {
    var s = {};

    $('#' + id).find('.skill-name').each(function() {
      s[$(this).text()] = true;
    })

    return s;
  }

  var get_psis = function() {
    var a = get_psis_in('skills-acquired');
    var b = get_psis_in('skills-planned');

    $.each([1, 2, 3], function(_junk, i) {
      a[i] = a[i] + b[i];
    })

    return a;
  }

  var get_psis_in = function(id) {
    var o = {
      1: 0,
      2: 0,
      3: 0
    }

    $('#' + id).find('[data-psi-level]').each(function() {
      var level = parseInt($(this).attr('data-psi-level'));
      o[level] = o[level] + 1;
    })

    return o;
  }

  var show_description = function(_name) {
    var name = sanitize(_name);
    var h = dynaloader.raw()['skill_desc'][name];
    var cost = get_mp_cost(_name);
    $('#skill-desc-title').text(name + ' (MP: ' + cost + ')');
    $('#skill-desc-body').html(skill_beautifier.process(h));
  }

  var sanitize = function(x) {
    if (x.match(/[IV]+$/)) {
      return x.replace(/[IV]+$/, '').trim();
    }

    return x;
  }

  var unpsi = function(x) {
    if (x.match(/^Psi [IV]+ \- /)) {
      return x.replace(/^Psi [IV]+ \- /, '').trim();
    }
  }

  var tierify = function(x) {
    return x + ' I';
  }

  var get_mp_cost = function(_name) {
    var d = dynaloader.raw()['skill_mp_cost']
    return d[_name] || d[sanitize(_name)] || d[unpsi(_name)] || d[tierify(_name)];
  }

  return {
    apply_filters: apply_filters,
    build: build,
    get_all_unselected: get_all_unselected,
    mark_planned: mark_planned,
    unmark_planned: unmark_planned,
    unmark_profession: unmark_profession,
    display: display,
    remove: remove,
    reset_all: reset_all,
    reset_to_pool: reset_to_pool,
    clear_alternator: clear_alternator,
    sort_pool: sort_pool,
    set_timeout: function(x) { timeout = x; },
    get_psis: get_psis,
    show_description: show_description,
    get_mp_cost: get_mp_cost
  }
})();
var skills = (function() {
  var data = {};
  var strain = null;
  var professions = {};
  var skill_hash = {};
  var counters = {};
  var countered = {};
  var planned = {};
  var by_profession = {};

  var cache_available = {};
  var cache_update = {};

  var add_to_cache = function(x) {
    if (cache_available[x] == undefined) {
      cache_update[x] = true;
      //console.log('adding ' + x);
    }
  }

  var overwrite_cache = function() {
    Object.assign(cache_available, cache_update);
  }

  var get_by_profession = function(x) {
    if (by_profession[x] == undefined) {
      build_by_profession(x);
    }

    return by_profession[x];
  }

  var build_by_profession = function(x) {
    by_profession[x] = {};

    $.each(data, function(k, d) {
      if (d.conditions[x] != undefined) {
        by_profession[x][get_code(k)] = true;
      }
    })
  }

  var build = function() {
    data = {};
    var r = dynaloader.raw();
    var mp = r.skill_mp_cost;

    $.each(r.skill_cat, function(k, v) {
      if (r.skill_group[k] != undefined) {
        var type;
        var prepend = '';
        var psi_level = -1;

        if (k.match(/lore/i)) {
          type = 'lore';
        } else if (k.match(/psionic/i)) {
          type = 'psionics';
          if (k.match(/basic/i)) {
            prepend = 'Psi I - ';  
            psi_level = 1;
          } else if (k.match(/interm/i)) {
            prepend = 'Psi II - ';
            psi_level = 2;
          } else if (k.match(/adv/i)) {
            prepend = 'Psi III - ';
            psi_level = 3;
          }
          
        }


        $.each(r.skill_group[k], function(sub_k, sub_v) {
          var w = data[prepend + sub_k];

          if (w == undefined) {
            data[prepend + sub_k] = {
              shorthand: r.skill_list[sub_k],
              type: type,
              conditions: v,
              psi_level: psi_level,
              mp_cost: mp[sub_k]
            }
          } else {
            var mod = data[prepend + sub_k].conditions;

            $.each(v, function(mk, mv) {
              if (!mk.match(/^innate/)) {
                mod[mk] = mv;
              }
            })
          }

          skill_hash[r.skill_list[sub_k]] = prepend + sub_k;
        })
      } else {
        data[k] = {
          shorthand: r.skill_list[k],
          type: 'normal',
          conditions: v,
          mp_cost: mp[k],
          unique: Object.keys(v).filter(x => !x.match(/innate/)).length == 1
        }

        skill_hash[r.skill_list[k]] = k;
      }
    })

    $.each(r.skill_group['NPC'], function(k, _junk) {
      data[k] = {
        shorthand: r.skill_list[k],
        type: 'npc',
        conditions: { open: 0 },
        mp_cost: 0
      }

      skill_hash[r.skill_list[k]] = k;
    })

    $.each(r.concentration_cat, function(k, v) {
      data[k] = {
        shorthand: r.skill_list[k],
        type: 'conc',
        conditions: v,
        mp_cost: mp[k]
      }

      skill_hash[r.skill_list[k]] = k;
    })

    $.each(r.advanced_cat, function(k, v) {
      data[k] = {
        shorthand: r.skill_list[k],
        type: 'adv',
        conditions: v,
        mp_cost: mp[k]
      }

      skill_hash[r.skill_list[k]] = k;
    })

    data['Lore - Animals - Aquatic'].type = 'lore';
    data['Lore - Mon Histories'].type = 'lore';
    
    counters = r.skill_counters;
    countered = r.skill_countered;
    

    filterview.build_cache();
    skill_interface.build(data);
    update_availability(false);
    skill_popup.attach();
    dragdrop.attach();
  }

  var constraint_satisfied = function(d) {
    var is_satisfied = false;
    var possible_costs = {};
    var is_open = false;
    var is_disadvantaged = false;
    var satisfied_profession = {};

    if (d.conditions.open != undefined) { 
      is_satisfied = true; 
      possible_costs[d.conditions.open] = true;
      is_open = true;
    }

    if (strain_match(d.conditions.innate_disabled)) {
      return {
        is_satisfied: false
      }
    }

    if (strain_match(d.conditions.innate)) {
      satisfied_profession['open'] = true;
      is_satisfied = true;
      possible_costs[3] = true;
    }

    if (strain_match(d.conditions.innate_disadvantage)) {
      is_disadvantaged = true;
    }

    $.each(professions, function(profession, _junk) {
      if (d.conditions[profession] != undefined) {
        satisfied_profession[profession] = true;
        is_satisfied = true;
        possible_costs[d.conditions[profession].cost] = true;
      }
    })

    if (is_disadvantaged) {
      var cached = Object.keys(possible_costs);
      possible_costs = {};
      $.each(cached, function(i, x) {
        possible_costs[x * 2] = true;
      })
    }

    return {
      is_satisfied: is_satisfied,
      possible_costs: possible_costs,
      is_open: is_open,
      is_disadvantaged: is_disadvantaged,
      satisfied_profession: satisfied_profession
    }
  }

  var evaluate_planned = function(init) {
    var get_planned_professions = function() {
      var metaplan = {};
      //planned = {};

      $('#skills-planned').find('.tool-prof-select').each(function() {
        var p = $(this).val();
        //planned[p] = {};
        metaplan[p] = {};
      })

      return metaplan;
    }

    var clear_current_plan = function() {
      var metaplan = init == undefined ? get_planned_professions() : init;

      $.each(planned, function(k, v) {
        if (metaplan[k] == undefined) {
          if (profession_basic.is_profession(k)) {
            profession_basic.remove(k);
          } else if (profession_conc.is_profession(k)) {
            profession_conc.remove(k)
          }
        }
      })

      skill_interface.unmark_planned(planned);
      planned = metaplan;
    }

    clear_current_plan();
    //get_planned_professions();

    $.each(planned, function(k, v) {
      if (profession_basic.is_profession(k)) {
        profession_basic.add(k, true);
      } else if (profession_conc.is_profession(k)) {
        profession_conc.add(k, true);
      }

      planned[k] = get_by_profession(k);
    })

    skill_interface.mark_planned(planned);
  }

  var apply_plan = function(x) {
    skill_interface.unmark_profession(planned[x]);
    delete planned[x];
  }

  var strain_match = function(a) {
    var is_found = false;
    $.each(a, function(i, x) {
      if (x == strain) {
        is_found = true;
        return false;
      }
    })

    return is_found;
  }

  var get_config = function() {
    strain = strain_interface.selected();
    professions = Object.assign({}, 
                                profession_basic.selected(), 
                                profession_conc.selected(),
                                profession_adv.selected(),
                                profession_basic.planned(),
                                profession_conc.planned())
    
    return {
      strain: strain,
      professions: professions
    }
  }

  var get_data = function() { return data; }
  var get_hash = function(id) { return skill_hash[id]; }
  var get_cost = function(skill) {
    var g = data[skill].conditions;
    var min = 99999;
    $.each(g, function(key, val) {
      if (typeof(val) == 'object') {
        var current_min = val.cost;
        if (current_min < min) min = current_min;
      }
    })

    return min;
  }

  var get_mp = function(skill) {
    return data[skill].mp_cost;
  }

  var get_all_possible_costs = function(skill) {
    return constraint_satisfied(data[skill]).possible_costs;
  }

  var get_interaction = function(x) {
    return {
      counters: counters[x],
      countered: countered[x]
    }
  }

  var animate_pool_loading = function(func) {
    func();
    var do_postprocess = function() {
      $.each(profile.get_postprocess_cost(), function(id, val) {
        $('#' + id + '-cost')
          .html(val + '<sup>+</sup>');
      })
    }

    if (!dynaloader.get_gil('ok_to_animate')) {
      func();
      do_postprocess();
      calc.recalculate_all();
    } else {

      $('#skill-pool').velocity({
        opacity: 0.5
      }, 250, function() { 
        func();
        do_postprocess();
        calc.recalculate_all();
        $('#skill-pool').css('opacity', 1);
      });
    }
    
  }

  var is_accessible_by_profession = function(skill, profession) {
    return data[skill].conditions[profession];
  }

  var is_accessible_by_strain = function(skill, strain) {
    if (data[skill].conditions.innate.indexOf(strain) != -1) {
      var innate_preq = data[skill].conditions.innate_preq;

      if (innate_preq) {
        return innate_preq[strain];
      } else {
        return 'strain_accessible';
      }
    }
  }

  var update_strain_specific_lore = function(strain) {
    var aquatic = data['Lore - Animals - Aquatic'].shorthand;
    var monhist = data['Lore - Mon Histories'].shorthand;
    filterview.cascade_two_lore_cache(aquatic, strain == 'Saltwise' ? false : true);
    filterview.cascade_two_lore_cache(monhist, strain == 'Genjian' ? false : true);
  }

  var update_availability = function(reset_all, _only_materialized) {
    if (dynaloader.get_gil('ok_to_update_gui') == false) return;
    var only_materialized = _only_materialized == undefined ? false : _only_materialized;

    var make_inverted_professions = function() {
      var inv = {};
      var pos = 0;
      $.each(professions, function(k, _junk) {
        if (profession_basic.is_profession(k)) {
          inv[k] = pos;
          pos++;
        }
      })

      return inv;
    }

    var apply_profession_signets = function(basic_profs) {
      var length = Object.keys(basic_profs).length + 1;
      var cell_length = 100.00 / length;
      var bs_col_factor = 'width: ' + cell_length + '%';

      $.each(basic_profs, function(k, v) {
        var offset = 'left: ' + cell_length * (v + 1) + '%';
        var style = 'style="' + bs_col_factor + '; ' + offset + '; float: left; position: relative"';

        var anchor = $('#config-bar').find('span.basic-prof-name:contains("' + k + '")').parent();
        var signet = '<div class="row signet-clear"></div>'
                   + '<div class="config-signet signet-' + v + '" '
                   +   style
                   + '/>'
                   + '<div class="row signet-clear"></div>';

        anchor.find('div.config-signet').remove();
        anchor.find('div.signer-clear').remove();
        anchor.append(signet);
      })
      
    }

    var batch_render = function(queue) {
      var qkeys = Object.keys(queue);
      var key_length = qkeys.length;
      var inv = make_inverted_professions();

      apply_profession_signets(inv);

      for (var i = 0; i < key_length; i++) {
        var shorthand = qkeys[i];
        var val = queue[shorthand];

        switch (val.mode) {
          case 'display': 
            skill_interface.display(shorthand, 
                                    val.costs, 
                                    val.is_open, 
                                    val.satisfied_profession, 
                                    inv);
            break;
          case 'remove':
            skill_interface.remove(shorthand);
            break
        }
      }
    }

    //dynaloader.set_delegate('initial_load', calc.recalculate_all, function() {
    return new Promise(function(resolve, reject) {
      animate_pool_loading(function() {
        dynaloader.set_gil('ok_to_update_gui', false, function() {
          manager.log(' -- UA begin');
          var h = get_config();
          var to_pool = new Array();
          var render_queue = {};

          skill_popup.hide();
          
          if (reset_all) skill_interface.reset_all(); 

          $.each(data, function(k, v) {
            var constraint = constraint_satisfied(v);

            if (constraint.is_satisfied) {
              //skill_interface.display(v.shorthand, constraint.possible_costs, constraint.is_open);

              //add_to_cache(skills.get_code(k));
              render_queue[v.shorthand] = {
                mode: 'display',
                costs: constraint.possible_costs,
                is_open: constraint.is_open,
                satisfied_profession: constraint.satisfied_profession
              }
            } else {
              //console.log(k + ' is no longer satisfied');
              //skill_interface.remove(v.shorthand);

              render_queue[v.shorthand] = { mode: 'remove' }
              to_pool.push(v.shorthand);
            }
          })

          // console.log(to_pool);
          // $.each(to_pool, function(i, x) {
          //   console.log('dropping to pool');
          //   dragdrop.drop_to_pool(x);
          // })

          batch_render(render_queue);
          dragdrop.drop_to_pool(to_pool);
          

          skill_interface.apply_filters();
          //overwrite_cache();

          resolve(true);
          //console.log(' -- UA completed');
        })

        //console.log(' !!! UA.sort() ');
        skill_interface.sort_pool();
        //console.log(' !!! update completed');
        //tooling.auto_indent($('#skills-acquired'));
        //tooling.auto_indent($('#skills-planned'));
        tooling.auto_indent_all();
        resolve(false);
        validate();
      })
    })
  }

  var has_tier = function(skill) {
    return skill.match(/\s(I|II|III|IV|V)$/);
  }

  var is_open = function(skill) {
    return data[skill].conditions.open != undefined;
  }

  var validate = function() {

    //if (dynaloader.has_delegations('initial_load')) { return; }
    if (!dynaloader.get_gil('ok_to_update_gui')) return;
    var all = skill_interface.get_all_unselected();
    var all_valid = true
    var messages = {};

    get_config();
    $.each(all, function(k, _junk) {
      var valid_prof_t = validate_by_profession(data[k].conditions, all);
      var valid_strain_t = validate_by_strain(data[k].conditions, all);

      messages[k] = new Array();
      if (!valid_prof_t.cond) {
        if (!is_open(k)) {
          messages[k].push(valid_prof_t.message);
        }
      }

      if (!valid_strain_t.cond) {
        //messages[k] = Object.assign(messages[k] || '', valid_strain_t.message);
        if (valid_strain_t.message.length > 0) {
          messages[k].push(valid_strain_t.message);
        }
      }

      //console.log(k + ' -> ' + valid_strain_t.cond + ' || ' + valid_prof_t.cond);

      all_valid = all_valid && (valid_strain_t.cond || valid_prof_t.cond);  

      if (valid_strain_t.cond || valid_prof_t.cond) {
        delete messages[k];
      }
    })

    notifier.skill_preq_missing(all_valid, messages);
    notifier.psis_preq_missing();
  }

  var validate_by_profession = function(obj, all) {
    var cond = false;
    var message = {};
    $.each(professions, function(p, _junk) {
      if (obj[p] != undefined) {
        var eval = validate_condition(obj[p].preq, all);

        cond = cond || eval.cond;
        message = eval.missing;
      }
    });

    $.each(Object.keys(message), function(_junk, skill_name) {
      var constraint = constraint_satisfied(data[skill_name]);

      if (constraint.is_satisfied == false) {
        delete message[skill_name];
      }
    })

    return {
      cond: cond,
      message: message
    }
  }

  var validate_by_strain = function(obj, all) {
    var cond = false;
    var strain_found = false;

    $.each(obj.innate, function(i, x) {
      if (x == strain) {
        strain_found = true;
        return false;
      }
    })

    if (!strain_found) { return { cond: false, message: '' }}
    if (obj.innate_preq == undefined) { return { cond: true, message: '' }};
    $.each(obj.innate_preq, function(s, v) {
      var eval = validate_condition(v, all);
      cond = cond || eval.cond;
      message = eval.missing;
    })

    return {
      cond: cond,
      message: message
    }
  }

  var validate_condition = function(preq, all) {
    if (preq == null) { return {cond: true, missing: {} }; }
    var cond = preq.predicate == 'and' ? true : false;
    var missing = {};

    $.each(preq.list, function(k, _junk) {
      if (all[k] == undefined) {
        if (preq.predicate == 'and') { cond = cond && false; }
        else if (preq.predicate == 'or') { cond = cond || false; }

        missing[k] = true;
      } else {
        if (preq.predicate == 'and') { cond = cond && true; }
        else if (preq.predicate == 'or') { cond = cond || true; }
      }
    })

    return {
      cond: cond,
      missing: missing
    }
  }

  var get_code = function(x) {
    return data[x].shorthand;
  }

  return {
    build: build,
    constraint_satisfied: constraint_satisfied,
    data: get_data,
    evaluate_planned: evaluate_planned,
    get_config: get_config,
    get_cost: get_cost,
    get_mp: get_mp,
    get_all_possible_costs: get_all_possible_costs,
    get_code: get_code,
    get_all_code: function() { return skill_hash; },
    get_name: function(x) { return skill_hash[x]; },
    get_delta: function() { return cache_update; },
    apply_plan: apply_plan,
    get_by_profession: get_by_profession,
    get_interaction: get_interaction,
    has_tier: has_tier,
    hash: get_hash,
    is_accessible_by_profession: is_accessible_by_profession,
    is_accessible_by_strain: is_accessible_by_strain,
    update_strain_specific_lore: update_strain_specific_lore,
    update_availability: update_availability,
    validate: validate
  }
})();
var stats_interface = function() {
  var delay_interval = setTimeout(null, 0);
  var base = { hp: 0, mp: 0, inf: 0 };

  var attach = function() {
    _attach('hp'); _attach('mp'); _attach('inf');
  }

  var _attach = function(x) {
    $('#btn-' + x + '-sub').on('click', function() {
      adjust(x, -1);
    })

    $('#btn-' + x + '-add').on('click', function() {
      adjust(x, 1);
    })

    $('#stat-purchased-' + x).on('keyup', function() {
      if ($(this).attr('id') == 'stat-purchased-inf') {
        var current_val = parseInt($(this).val());
        if (current_val > base.inf) {
          $(this).val(base.inf);
          $('#btn-inf-add').prop('disabled', true);
        }
      }

      evaluate_sum(x);
    }).on('keydown', function(e) {
      if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39) { return true; }
      if (e.keyCode >= 48 && e.keyCode <= 57) { return true; }
      if (e.keyCode >= 96 && e.keyCode <= 105) { return true; }
      
      return false;
    })
 
    evaluate_sum(x);
  }

  var adjust = function(x, val) {
    var current_value = parseInt($('#stat-purchased-' + x).val());
    var new_value = current_value + val;

    if (x == 'inf') {
      var button = $('#btn-inf-add');
      button.prop('disabled', new_value == base.inf);
    }

    $('#stat-purchased-' + x).val(new_value);
    evaluate_sum(x);
  }

  var set = function(d) {
    if (d == undefined) {
      d = { hp: 0, mp: 0, inf: 0 };
    }

    $.each(d, function(key, value) {
      $('#stat-purchased-' + key).val(value);
      evaluate_sum(key);
    })
  }

  var update = function(hp, mp, inf) {
    update_base('hp', hp);
    update_base('mp', mp);
    update_base('inf', inf);

    profile.save_all();
  }

  var update_base = function(type, value) {
    var obj = $('#stat-base-' + type);
    obj.text(value);
    base[type] = value;

    evaluate_sum(type);
  }

  var update_state = function(type) {
    var value = parseInt($('#stat-purchased-' + type).val());
    var button = $('#btn-' + type + '-sub');

    button.prop('disabled', value == 0);
  }

  var evaluate_sum = function(type) {
    var base = $('#stat-base-' + type);
    var purchased = $('#stat-purchased-' + type);
    var target = $('#stat-sum-' + type);

    if (type == 'inf') {
      var sum = parseInt(base.text()) - parseInt(purchased.val());
    } else {
      var sum = parseInt(base.text()) + parseInt(purchased.val());
    }
    target.text(sum);
    update_state(type);
    calc.recalculate_purchased_stats();

    clearTimeout(delay_interval);
    var current_profile = profile.get_old_name();

    // console.log('stat evaluated');
    delay_interval = setTimeout(function() {
      profession_conc_interface.validate_existing();
      profession_adv.update();
      profile.save_all_delayed(current_profile);
    }, 500);

  }

  var get_config = function() {
    return {
      hp: parseInt($('#stat-sum-hp').text()),
      mp: parseInt($('#stat-sum-mp').text()),
      xp: parseInt($('#xp-total-acquired').text())
    }
  }

  return {
    adjust: adjust,
    attach: attach,
    get_config: get_config,
    set: set,
    update: update
  }
}();
var strain_interface = (function() {
  var selected_strain = null;

  var attach = function() {
    $('#strain-dd').on('changed.bs.select', function() {
      var new_value = $('#strain-dd').val();
      set(new_value);
    })
  }

  var build = function() {
    var raw = '<option class="default-no-selection">No Selection</option>';

    $.each(strains.data(), function(k, v) {
      raw += '<option>' + k + '</option>';
    })


    $('#strain-dd').append(raw);
    $('#strain-dd').selectpicker('refresh');
    attach();
  }

  var get_selected_strain = function() {
    return selected_strain;
  }

  var reset = function() {
    selected_strain = null;
  }

  var set = function(x) {
    selected_strain = x;

    profession_basic_interface.trigger_filterview(x, true);
    profession_basic.update_strain_change();
    profession_adv.update();
    skills.update_strain_specific_lore(x);
    skills.update_availability(true);

    if (strains.data()[x]) {
      var stats = strains.data()[x].stats;
      stats_interface.update(stats.hp, stats.mp, stats.infection);
    } else {
      stats_interface.update(0, 0, 0);
    }
  }

  var set_gui = function(_x) {
    var x = _x == null ? 'No Selection' : _x;
    $('#strain-dd').selectpicker('val', x);
    set(x);
  }

  return {
    attach: attach,
    build: build,
    reset: reset,
    selected: get_selected_strain,
    set: set,
    set_gui: set_gui
  }
})();
var strains = (function() {
  var data = {};
  var lut = {};

  var build = function() {
    var r = dynaloader.raw();
    $.each(r.strains, function(i, x) {
      data[x] = {};
    })

    $.each(r.strain_specs, function(k, v) { 
      data[k].specs = v; 
      $.each(v, function(_junk, strain_skills) {
        $.each(strain_skills, function(_junk, strain_skill) {
          lut[strain_skill] = true;
        })
      });
    })
    $.each(r.strain_restriction, function(k, v) { data[k].restriction = v; })
    $.each(r.strain_stats, function(k, v) { data[k].stats = v; })

    strain_interface.build();
  }

  var get_data = function() {
    return data;
  }

  var get_innate = function(strain) {
    return data[strain].specs.advantages.concat(data[strain].specs.disadvantages);
  }

  var is_strain_skill = function(k) {
    return lut[k] != undefined;
  }

  return {
    build: build,
    data: get_data,
    get_innate: get_innate,
    is_strain_skill: is_strain_skill
  }
})();
(function() {


}).call(this);
var tooling = function() {
  var delay_interval = setTimeout(null, 0);
  var group_interval = setTimeout(null, 0);
  var indent_interval = setTimeout(null, 0);
  var popover_caller;
  var state;
  var move_up_disabled = false;
  var move_down_disabled = false;

  var attach = function() {
    // attach_to('skills-acquired');
    // attach_to('skills-planned');
    attach_object('tool-acq-group', 'skills-acquired');
    attach_object('tool-separator', 'skills-planned');
    attach_object('tool-stat-planner', 'skills-planned');
    attach_object('tool-checkin-planner', 'skills-planned');
    attach_object('tool-profession-planner', 'skills-planned');
    attach_visual_tool('tool-acq-expand-all', 'skills-acquired', 'expand');
    attach_visual_tool('tool-acq-collapse-all', 'skills-acquired', 'collapse');
    attach_visual_tool('tool-plan-expand-all', 'skills-planned', 'expand');
    attach_visual_tool('tool-plan-collapse-all', 'skills-planned', 'collapse');
    attach_dropdown_event();
  }

  var attach_dropdown_event = function() {
    $('button.dropdown-tool').on('click', function() {
      hide_popover();
      skill_popup.hide();
    })
  }

  var attach_visual_tool = function(type, target_id, action) {
    $('#' + type).on('click', function(event) {
      var button_class = action == 'expand' ? '.glyphicon-menu-down' : '.glyphicon-menu-up';
      $('#' + target_id).find(button_class).trigger('click');
      event.preventDefault();
    })
  }

  var attach_object = function(type, target_id) {
    $('#' + type).on('click', function(event) {
      var target = $('#' + target_id);
      var cloned = $('#' + type + '-base').clone(true, true);
      cloned.hide().show().css('opacity', 0);

      cloned.removeAttr('id').prependTo(target);
      cloned.velocity({
        opacity: 1
      }, 250);
      activate(cloned);
      auto_indent(target);
      profile.save_all();
      event.preventDefault();
    })
  }

  var copy_programmatically = function(type, target_id, args) {
    var target = $('#' + target_id);
    var cloned = $('#' + type + '-base').clone(true, true);
    cloned.removeAttr('id').appendTo(target);
    activate(cloned);
    auto_indent(target);

    if (args.title != undefined) { 
      cloned.find('.tool-editable').text(args.title);
    }

    if (args.option != undefined) {
      cloned.find('.tool-option').text(args.option);
    }

    if (args.nominal != undefined) {
      cloned.find('.tool-value').text(args.nominal);
    }

    if (args.selected != undefined) {
      rebuild_prof_list(cloned);
      cloned
        .find('.tool-prof-select')
          .find('option:contains("' + args.selected + '")')
            .attr('selected', true);
    }

    if (args.is_collapsed != undefined) {
      cloned.attr('data-group-is-collapsed', args.is_collapsed);
    }

    profile.save_all();
  }

  var attach_handles = function(obj, enable) {
    if (enable) {
      if (obj.find('.glyphicon-arrow-up').length > 0) return;

      var down = ' <span class="glyphicon glyphicon-arrow-down pull-right"></span> ';
      var up = '<span class="glyphicon glyphicon-arrow-up pull-right"></span>';

      //obj.prepend(down);
      //obj.children().last().before(up).after(down);
      //obj.children().last().prev().before(up)
      //obj.children().last().after(down)
      var anchor = obj.find('.skill-cost');
      anchor.after(down);
      anchor.before(up);
      activate(obj);
    } else {
      obj.find('.glyphicon-arrow-up').remove();
      obj.find('.glyphicon-arrow-down').remove();
      obj.find('.glyphicon-option-vertical').remove();
    }
  }

  var activate = function(obj) {
    obj.find('.glyphicon-arrow-down').on('click', function() {
      if (!move_down_disabled) {
        enable_translocator(false);
        move($(this).parent(), 'down');
      }
      return false;
    })

    obj.find('.glyphicon-arrow-up').on('click', function() {
      if (!move_up_disabled) {
        enable_translocator(false);
        move($(this).parent(), 'up');
      }
      
      return false;
    })

    obj.find('.glyphicon-refresh').on('click', function() {
      alternate($(this).parent());
      return false;
    })

    obj.find('.glyphicon-minus').on('click', function() {
      adjust($(this).parent(), -1);
      return false;
    })

    obj.find('.glyphicon-plus').on('click', function() {
      adjust($(this).parent(), 1);
      return false;
    })

    obj.find('.group-collapsible').on('click', function() {
      toggle_group_visibility($(this).parent(), true);
      return false;
    })

    // $('.tool').find('.glyphicon-option-horizontal').on('click', function() {
    //   more_options($(this));
    // })

    obj.find('.tool-editable').editable({
      type: 'text',
      unsavedclass: null,
      placeholder: 'Enter new name...',
      value: '',
      container: 'body'
    }).on('shown', function() {
      //hide_popover();
      var that = $(this);
      var input = $('.editable-popup').find('input');

      if (that.text() == '<Unnamed>') {
        input.val('');
      } else {
        input.val(that.text());
      }

      $('.editable-popup').find('.editable-submit').off('click').on('click', function() {
        var caller = that;
        var new_value = $(this).parent().parent().find('input').val();
        if (new_value.trim().length == 0) {
          new_value = '<Unnamed>';
        }

        caller.editable('hide');
        caller.text(new_value);
        profile.save_all();
      })
    }).on('click', function() {
      return false;
    })

    rebuild_prof_list(obj);

    $.each(obj.find('.glyphicon-option-horizontal'), function() {
      more_options($(this));
      $(this).on('click', function() {
        if (popover_caller != null) {
          popover_caller.popover('hide');
        }
        popover_caller = $(this);
        popover_caller.popover('toggle');

        return false;
      })

      return false;
    })

    if (!obj.hasClass('skill')) {
      obj.on('click', function() {
        dragdrop.select_tool($(this));
        return false;
      })
    }

    calc.recalculate_all();
  }

  var enable_translocator = function(val) {
    move_up_disabled = !val;
    move_down_disabled = !val;

    var color = val ? '#333' : '#aaa';

    $('.drop-box').find('span.glyphicon.glyphicon-arrow-up').css('color', color);
    $('.drop-box').find('span.glyphicon.glyphicon-arrow-down').css('color', color);
  }

  var toggle_group_visibility = function(obj, exec) {
    var attr = obj.attr('data-group-is-collapsed') || 'false';
    var is_collapsed = attr == 'false' ? false : true;
    var target = new Array();
    var arrow = obj.find('.group-collapsible');
    var member_count = obj.find('.tool-compute-children');

    clearTimeout(group_interval);

    var get_children = function() {
      var el = obj.next();

      while(el.length > 0) {
        if (el.hasClass('tool-separator')) break;
        target.push(el);
        el = el.next();
      }
    }

    var adjust_orientation = function(exec) {
      //console.log('orientation adjusted ' + is_collapsed + ' exec ' + exec + ' (' + target.length + ')');
      if (target.length == 0) {
        arrow.removeClass('glyphicon-menu-up glyphicon-menu-down');
        member_count.text('');
        obj.attr('data-group-is-collapsed', false);

        return;
      }

      if ((is_collapsed && exec) || (!is_collapsed && !exec)) {
        arrow
          .removeClass('glyphicon-menu-down')
          .addClass('glyphicon-menu-up')
        member_count.text('');
        
      } else {
        arrow
          .removeClass('glyphicon-menu-up')
          .addClass('glyphicon-menu-down')
        member_count.text(' +' + target.length);
      }
    }

    get_children();
    adjust_orientation(exec);

    if ((is_collapsed && exec) || (!is_collapsed && !exec)) {
      // console.log('expanding');
      obj.attr('data-group-is-collapsed', false);
      $.each(target, function(i, x) { 
        //x.show(); 
        //x.css('margin-top', 0);
        x.show()
          .css('opacity', exec ? 0 : 1)
          .velocity({
            'margin-top': 0,
            opacity: 1
          }, 200, function() {
            //enable_translocator(true);
          })
        x.attr('data-group-altered', 'true');
      })
    } else {
      // console.log('collapsing');
      obj.attr('data-group-is-collapsed', true);
      //var height_amount = 0;
      $.each(target, function(i, x) { 
        //x.hide(); 
        var height_amount = $(this).outerHeight();

        x.velocity({
          opacity: exec ? 0 : 1,
          'margin-top': (-1 * height_amount) + 'px'
        }, 200, function() {
          x.hide();
          //enable_translocator(true);
        })
        x.attr('data-group-altered', 'true');
      })
    }

    if (exec != undefined && exec) {
      var current_profile = profile.get_current_name();
      group_interval = setTimeout(function() {
        profile.save_all_delayed(current_profile);
      }, 250)
    }
    
  }

  var rebuild_prof_list = function(_obj) {
    var is_prof_sel = _obj.hasClass('tool-prof-planner');

    if (!is_prof_sel) return;
    _obj.find('.tool-prof-select').remove();
    var anchor = _obj.find('.tool-option');
    var pclass = anchor.text();

    //obj.empty();
    
    var s = ' <select class="tool-prof-select"><option>No selection</option>';
    var p;

    switch(pclass) {
      case 'Conc': p = profession_conc.get_purchaseable(); break;
      case 'Basic': p = profession_basic.get_purchaseable(); break;
      case 'Forget': p = profession_basic.get_forgettable(); break;
    }
    $.each(p, function(k, _junk) {
      s += '<option>' + k + '</option>';
    })
    s += '</select>';

    $(s).insertAfter(anchor);

    _obj.find('.tool-prof-select').on('change', function() {
      skills.evaluate_planned();
      profile.save_all();
    })
    //anchor.next().selectpicker();
  }

  var update_planned_prof_list = function() {
    $('#skills-planned').find('.tool-option').each(function() {
      var obj = $(this).next();
      var parent = $(this).parent();

      var current_selection = obj.find('option:selected').text();

      rebuild_prof_list(parent);
      var sel = parent.find('.tool-prof-select');
      var sel2 = sel.find('option:contains("' + current_selection + '")');
      sel2.prop('selected', true);
      //.prop('selected', true);
      // $('.tool-prof-select option:contains("Distiller")').prop('selected', true)
    })
  }

  var adjust = function(obj, value) {
    hide_popover();
    var target = obj.find('.tool-value');
    var current_value = parseInt(target.text());

    if (value == -1) {
      if (current_value == 0) return;
    } 

    if (isNaN(current_value)) current_value = 0;

    target.text(current_value + value);
    calc.recalculate_planned_stats();

    clearTimeout(delay_interval);

    var current_profile = profile.get_old_name();
    delay_interval = setTimeout(function() {
      profile.save_all_delayed(current_profile);
    }, 500);

    update_compute_group(obj);
  }

  var update_compute_group = function(obj) {
    compute_group(obj.parent());
    //if (obj.find('.glyphicon-option-vertical').length == 0) return;
    //var anchor
  }

  var alternate = function(obj) {
    hide_popover();
    var target = obj.find('.tool-option');

    if (target.text() == 'HP') {
      target.text('MP');
    } else if (target.text() == 'MP') {
      target.text('HP');
    } else if (target.text() == 'Basic') {
      target.text('Conc');
      obj.find('.tool-prof-xp').text('30');
      rebuild_prof_list(obj);
      skills.evaluate_planned();
      compute_group($('#skills-planned'));
      calc.recalculate_planned_profession();
    } else if (target.text() == 'Conc') {
      target.text('Forget');
      obj.find('.tool-prof-xp').text('10');
      rebuild_prof_list(obj);
      skills.evaluate_planned();
      compute_group($('#skills-planned'));
      calc.recalculate_planned_profession();
    } else if (target.text() == 'Forget') {
      target.text('Basic');
      obj.find('.tool-prof-xp').text('10');
      rebuild_prof_list(obj);
      skills.evaluate_planned();
      compute_group($('#skills-planned'));
      calc.recalculate_planned_profession();
    }

    profile.save_all();
  }

  var find_end_of_group_from = function(obj) {
    var current_obj = obj.next();
    var prev_obj = obj;

    while (current_obj.length > 0) {
      if (is_group(current_obj)) {
        return prev_obj;
      }

      prev_obj = current_obj;
      current_obj = current_obj.next();
    }

    return prev_obj;
  }

  var move = function(obj, direction) {
    var objs = new Array();
    hide_popover();
    var anchor;
    var relocate_pixel_amount = 0;
    var anchor_members = new Array();
    var animation_duration_ms = 200;


    var animate_displacement = function(dir, objs, target, displacement) {

      var f = null;
      var a_px = 0;
      var b_px = 0;

      var reset_animation_state = function() {
        $.each(objs, function(i, obj) {
          obj.css('top', 0)
        })

        $.each(target, function(i, t) {
          t.css('top', 0)
        })

        enable_translocator(true);
      }

      $.each(objs, function(i, d_obj) {
        if (d_obj.hasClass('tool-separator') || d_obj.is(':visible')) {
          a_px += d_obj.outerHeight();
        }
      })

      $.each(target, function(i, t) {
        if (t.hasClass('tool-separator') || t.is(':visible')) {
          b_px += t.outerHeight();
        }
      });

      if (dir == 'up') {
        f = function() {
          $.each(objs, function(i, obj) {
            var cached_visible = obj.is(':visible');
            obj.hide().insertBefore(anchor);

            if (obj.hasClass('tool-separator') || cached_visible) {
              obj.show();
            }
          })
          
        }
      } else {
        f = function() {
          $.each(objs, function(i, obj) {
            var cached_visible = obj.is(':visible');
            obj.hide().insertAfter(anchor);

            if (obj.hasClass('tool-separator') || cached_visible) {
              obj.show();
            }
          })
          
        }
      }

      $.each(objs, function(i, x) { x.css('position', 'relative')})
      $.each(target, function(i, x) { x.css('position', 'relative')})

      if (dir == 'up') {
        b_px *= -1;
      } else {
        a_px *= -1;
      }

      return new Promise(function(resolve, reject) {
        $.each(objs, function(i, obj) {
          obj.velocity({
            'top': b_px + 'px'
          }, animation_duration_ms)
        })
        

        $.each(target, function(i, t) {
          t.velocity({
            'top': a_px + 'px'
          }, animation_duration_ms, function() {
            f();
            reset_animation_state();
            resolve(true);
          })
        })
      })


    }

    if (is_group(obj)) {
      var maybe_anchor;
      if (direction == 'up') {
        maybe_anchor = obj.prev();
      } else if (direction == 'down') {
        maybe_anchor = obj.next();
      }

      while (maybe_anchor.length > 0) {
        if (is_group(maybe_anchor)) {
          if (direction == 'down') {
            anchor = find_end_of_group_from(maybe_anchor);
          } else if (direction == 'up') {
            anchor = maybe_anchor;
          }
          break;
        }

        if (direction == 'up') {
          anchor = maybe_anchor;
          maybe_anchor = maybe_anchor.prev();
          if (maybe_anchor.find('.glyphicon-option-vertical').length == 0) {
            anchor = null;
            //break;
          }
          
        } else if (direction == 'down') {
          anchor = maybe_anchor;
          maybe_anchor = maybe_anchor.next();

          if (maybe_anchor.length == 0) {
            anchor = null;
          }
        }
      }
    } else {
      if (direction == 'up') {
        anchor = obj.prev();
      } else if (direction == 'down') {
        anchor = obj.next();
      }
    }

    if (anchor == null) {
      enable_translocator(true);
      return;
    }

    objs.push(obj);

    if (is_group(obj)) {
      var current_obj = obj.next();
     
      while (current_obj.length > 0) {
        if (is_group(current_obj)) break;
        objs.push(current_obj);
        current_obj = current_obj.next();
      } 
    }

    var ordered = objs;

    if (direction == 'down') {
      ordered = ordered.reverse();
    }

    var determine_displacement_amount = function(dir, objs, anchor) {
      var amount = 0;
      //console.log(anchor);
      var obj = dir == 'up' ? objs[0] : objs[objs.length - 1];
      var members = new Array();
      if (obj.hasClass('tool-separator')) {
        
        var member = null;
        if (dir == 'up') {
          member = obj.prev();
        
          while (member.length > 0) {
            if (member.hasClass('tool-separator')) {
              amount += member.outerHeight();
              members.push(member);
              break;
            }

            amount += member.outerHeight();
            members.push(member);
            member = member.prev();
          }
        } else if (dir == 'down') {
          members.push(anchor);
          amount += anchor.outerHeight();
                
          if (!anchor.hasClass('tool-separator')) {
            member = anchor.prev();
            while (member.length > 0) {
              if (member.hasClass('tool-separator')) {
                amount += member.outerHeight();
                members.push(member);
                break;
              }
              amount += member.outerHeight();
              members.push(member);
              member = member.prev()
            }
          }
        }

        /*var members = new Array();
        var member = dir == 'up' ? obj.prev() : obj.next();

        if (dir == 'down') {
          amount += member.outerHeight();
          members.push(member);
          member = member.next();
        }

        while (member.length > 0) {
          if (member.hasClass('tool-separator')) {
            amount += member.outerHeight();
            break;
          }
          amount += member.outerHeight();
          members.push(member);
          member = dir == 'up' ? member.prev() : member.next();
        }*/

      } else {
        amount = anchor.outerHeight();
        members.push(anchor);
      }

      return {
        amount: dir == 'up' ? amount : -amount,
        target: members
      }
      return dir == 'up' ? amount : -amount;
    }

    var displacement = determine_displacement_amount(direction, objs, anchor);
    //console.log('Target object displace up by ' + displacement.amount + ' px');
    animate_displacement(direction, objs, displacement.target).then(function() {
      auto_indent(obj.parent());
      profile.save_all();      
    })


  }

  var auto_collapse = function(obj) {
    if (dynaloader.get_gil('ok_to_sort') == false) return;
    manager.log('-- auto collapse');
    $.each(obj.children(), function() {
      var that = $(this);
      if (is_group(that)) {
        // console.log('Auto Collapse -> toggle_group_visibility');
        toggle_group_visibility(that);
      }
    })
    
  }

  var exec_indent = function(obj) {
    if (dynaloader.get_gil('ok_to_sort') == false) return;
    manager.log('-- exec indent');
    if (obj.attr('id') != 'skills-acquired' && obj.attr('id') != 'skills-planned') {
      obj = obj.parent();
    }

    // console.log('Auto Indent -> auto_collapse');
    auto_collapse(obj);

    // console.log('Auto Indent -> compute_group');
    compute_group(obj);
    var state = 'init';
    obj.children().each(function() {
      var curr = $(this);

      indent(curr, false);
      if (is_group(curr)) {
        state = 'indent';
      } else {
        if (is_group(curr)) {
          // do not indent leading group
        } else if (state == 'indent') {
          indent(curr, true);
        }
      }
    })
  }

  var auto_indent = function(_obj) {
    clearTimeout(indent_interval);
    indent_interval = setTimeout(function() {
      exec_indent(_obj);
    }, 500);
  }

  var auto_indent_all = function() {
    // console.log('Auto indent ALL');
    exec_indent($('#skills-acquired'));
    exec_indent($('#skills-planned'));
  }

  var compute_group = function(obj) {
    if (dynaloader.get_gil('ok_to_sort') == false) return;
    manager.log('-- compute group')
    var state = 'out';
    var anchor = null;
    var checkin = 0;
    var expense = 0;

    var update_and_reset_anchor = function(anchor) {
      anchor.find('.tool-compute-expend').text(expense);
      anchor.find('.tool-compute-checkin').text(checkin);
      checkin = 0;
      expense = 0;
    }

    $.each(obj.children(), function() {
      var that = $(this);
      if (state == 'out') {
        if (that.hasClass('tool-separator')) {
          anchor = that;
          state = 'in';
        }
      } else if (state == 'in') {
        if (that.hasClass('tool-separator')) {
          update_and_reset_anchor(anchor);
          anchor = that;
          state = 'in';
        } else if (that.hasClass('tool-stat-planner')) {
          expense += parseInt(that.find('.tool-value').text());
        } else if (that.hasClass('tool-prof-planner')) {
          expense += parseInt(that.find('.tool-prof-xp').text());
        } else if (that.hasClass('skill')) {
          expense += parseInt(that.find('.skill-cost').text());
        } else if (that.hasClass('tool-checkin-planner')) {
          checkin += parseInt(that.find('.tool-value').text());
        }
      }
    })

    if (anchor != null) {
      update_and_reset_anchor(anchor);
    }

    // console.log(' >>> compute group completed');
  }

  var indent = function(obj, apply) {
    var marker_class = 'glyphicon-option-vertical';
    if (apply) {
      var s = '<span class="glyphicon ' + marker_class + '"></span>';
      obj.prepend(s);
    } else {
      obj.find('.' + marker_class).remove();
    }
  }

  var more_options = function(obj) {
    obj.popover({
      trigger: 'manual',
      html: true,
      content: generate_more_options(obj.parent()),
      placement: 'top',
      container: '#main-right'
    }).on('shown.bs.popover', function() {
      apply_popover_interactivity();
      highlight_children(obj.parent(), true);
    }).on('hide.bs.popover', function() {
      highlight_children(obj.parent(), false);
    })
  }

  var highlight_children = function(obj, val) {
    //if (val) { obj.addClass('bg-primary'); }
    //else { obj.removeClass('bg-primary'); }
    
    var apply = function(cobj) {
      if (val) { 
        cobj.addClass('tool-highlight'); 
      }
      else { 
        cobj.removeClass('tool-highlight'); 
      }
    }

    if (!is_group(obj)) {
      apply(obj);
    } else {
      var current_obj = obj.next();
      while (current_obj.length > 0) {
        if (is_group(current_obj)) break;
        apply(current_obj);
        
        current_obj = current_obj.next();
      }
    }

    

  }

  var apply_popover_interactivity = function() {
    var popover = $('.popover');
    popover.find('.glyphicon').parent().css('cursor', 'pointer');

    attach_more_options_apply(popover.find('.glyphicon-ok').parent());
    attach_more_options_remove(popover.find('.glyphicon-remove').parent());
    attach_more_options_remove_group(popover.find('.glyphicon-remove-circle').parent());
    attach_close_popover(popover.find('.glyphicon-menu-down').parent());
  }

  var attach_more_options_remove = function(obj) {
    obj.on('click', function() {
      var cached = popover_caller.parent();
      var next = cached.next();
      var is_planned_profession = false;

      if (cached.hasClass('tool-prof-planner')) {
        is_planned_profession = true;
      }

      popover_caller.popover('hide');
      popover_caller.parent().velocity({
        opacity: 0
      }, 250, function() {
        popover_caller.parent().remove();
      })

      while (next.length > 0) {
        if (!next.hasClass('tool-highlight')) break;
        next.removeClass('tool-highlight');
        next = next.next();
      }

      if (is_planned_profession) {
        skills.evaluate_planned();
      }

      auto_indent_all();
      dragdrop.deselect_all();
      calc.recalculate_all();
      profile.save_all();
    })
  }

  var attach_more_options_remove_group = function(obj) {
    obj.on('click', function() {
      var objs = new Array();
      var current_obj = popover_caller.parent();
      var to_pool = new Array();
      objs.push(current_obj);
      current_obj = current_obj.next();

      popover_caller.popover('hide');

      while (current_obj.length > 0) {
        if (is_group(current_obj)) break;
        objs.push(current_obj);
        current_obj = current_obj.next();
      }

      $.each(objs, function(i, x) {
        if (x.hasClass('skill')) {
          to_pool.push(x.attr('id'))
          //dragdrop.drop_to_pool(x.attr('id'));
          x.removeClass('tool-highlight');
        } else {
          //x.remove();

          x.velocity({
            opacity: 0
          }, 250, function() {
            x.remove();
          })
        }
      })


      dragdrop.drop_to_pool(to_pool);
      calc.recalculate_all();
      profile.save_all();
    })
  }

  var attach_more_options_apply = function(obj) {
    obj.on('click', function() {
      var target = popover_caller.parent();

      popover_caller.popover('hide');
      //dynaloader.set_delegate('initial_load', calc.recalculate_all, function() {
      dynaloader.set_gil(['ok_to_update_gui', 'ok_to_save'], false, function() {
        if (target.hasClass('tool-separator')) {
          var stacks = new Array();
          var current_obj = target.next();

          while (current_obj.length > 0) {
            if (is_group(current_obj)) break;

            var cached_next = current_obj.next();
            if (apply_plan(current_obj)) {
              stacks.push(current_obj);
            }

            current_obj = cached_next;
          }

          $.each(stacks, function(i, x) {
            x.remove();
          })
        } 

        if (apply_plan(target)) {
          target.remove();
        }
      })

      profile.save_all();

      return false;
    })
  }

  var apply_plan = function(obj) {
    if (obj.hasClass('tool-stat-planner')) {
      var option = obj.find('.tool-stat');
      if (option.length > 0) {
        stats_interface.adjust(option.text().toLowerCase(), 
                               parseInt(obj.find('.tool-value').text()));
      }

      return true;
    } else if (obj.hasClass('skill')) {
      dragdrop.drop_selective(obj.attr('id'), $('#skills-acquired'));
      //obj.css('background-color', '#fff');
      return false;
    } else if (obj.hasClass('tool-prof-planner')) {
      var sel = obj.find('select option:selected').text();
      var is_forget = obj.find('.tool-option').text() == 'Forget';

      if (is_forget) {
        $('.purchased-profession')
          .find('.forget-profession[data-prof="' + sel + '"]')
          .trigger('click');
      } else {
        $('[data-prof="' + sel + '"').trigger('click');
        $('[data-conc="' + sel + '"').trigger('click');

        profession_basic.apply_plan(sel);
        profession_conc.apply_plan(sel);
        skills.apply_plan(sel);

        //skills.evaluate_planned();

      }

      return true;
    }

    return true;
  }

  var attach_close_popover = function(obj) {
    obj.on('click', function() {
      popover_caller.popover('hide');
    });
  }

  var is_group = function(obj) {
    return obj.hasClass('tool-separator');
  }

  var hide_popover = function() {
    if (popover_caller == null) return;
    popover_caller.popover('hide');
  }

  var generate_more_options = function(obj) {
    var s = '';
    if (obj.hasClass('tool-applicable')) {
      s += '<div><span class="glyphicon glyphicon-ok"></span> Apply</div>';
    }


    s += '<div><span class="glyphicon glyphicon-remove"></span> Remove</div>';

    if (obj.hasClass('tool-separator')) {
      s += '<div><span class="glyphicon glyphicon-remove-circle"></span> Remove all in this group</div>';
    }


    s += '<div><hr/></div>';
    s += '<div><span class="glyphicon glyphicon-menu-down"></span> Close</div>';

    return s;
  }

  return {
    attach: attach,
    attach_handles: attach_handles,
    auto_collapse: auto_collapse,
    auto_indent: auto_indent,
    auto_indent_all: auto_indent_all,
    hide_popover: hide_popover,
    is_group: is_group,
    update_planned_prof_list: update_planned_prof_list,
    copy_programmatically: copy_programmatically,
    compute_group: compute_group,
  }
}();
var tour = function() {
  var resize_tour_window = function() {
    var width = $('#modal-tour').find('.modal-header').width() - 30;
    var height = $(window).height();

    $('#modal-tour').find('.modal-body')
      .css('max-height', (height * 0.7) + 'px')
      .css('overflow-y', 'auto')
    $('#modal-tour').find('.img')
      .css('max-width', width + 'px')
  }

  var start = function() {
    $('#modal-tour').modal({

    }).on('shown.bs.modal', function() {
      resize_tour_window();
      $('body').css('padding-right', 0);
    }).on('hidden.bs.modal', function() {
      $('body').css('padding-right', 0);
    });

    $(window).resize(resize_tour_window);
  }

  return {
    start: start
  }
}();
(function() {


}).call(this);
/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @version: v1.0.1
 */

(function ($) {
    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        fixedColumns: false,
        fixedNumber: 1
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initHeader = BootstrapTable.prototype.initHeader,
        _initBody = BootstrapTable.prototype.initBody,
        _resetView = BootstrapTable.prototype.resetView;

    BootstrapTable.prototype.initFixedColumns = function () {
        this.$fixedHeader = $([
            '<div class="fixed-table-header-columns">',
            '<table>',
            '<thead></thead>',
            '</table>',
            '</div>'].join(''));

        this.timeoutHeaderColumns_ = 0;
        this.$fixedHeader.find('table').attr('class', this.$el.attr('class'));
        this.$fixedHeaderColumns = this.$fixedHeader.find('thead');
        this.$tableHeader.before(this.$fixedHeader);

        this.$fixedBody = $([
            '<div class="fixed-table-body-columns">',
            '<table>',
            '<tbody></tbody>',
            '</table>',
            '</div>'].join(''));

        this.timeoutBodyColumns_ = 0;
        this.$fixedBody.find('table').attr('class', this.$el.attr('class'));
        this.$fixedBodyColumns = this.$fixedBody.find('tbody');
        this.$tableBody.before(this.$fixedBody);
    };

    BootstrapTable.prototype.initHeader = function () {
        _initHeader.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.fixedColumns) {
            return;
        }

        this.initFixedColumns();

        var that = this, $trs = this.$header.find('tr').clone();
        $trs.each(function () {
            $(this).find('th:gt(' + that.options.fixedNumber + ')').remove();
        });
        this.$fixedHeaderColumns.html('').append($trs); 
    };

    BootstrapTable.prototype.initBody = function () {
        _initBody.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.fixedColumns) {
            return;
        }

        var that = this,
            rowspan = 0;

        this.$fixedBodyColumns.html('');
        this.$body.find('> tr[data-index]').each(function () {
            var $tr = $(this).clone(),
                $tds = $tr.find('td');

            $tr.html('');
            var end = that.options.fixedNumber;
            if (rowspan > 0) {
                --end;
                --rowspan;
            }
            for (var i = 0; i < end; i++) {
                $tr.append($tds.eq(i).clone());
            }
            that.$fixedBodyColumns.append($tr);
            
            if ($tds.eq(0).attr('rowspan')){
            	rowspan = $tds.eq(0).attr('rowspan') - 1;
            }
        });
    };

    BootstrapTable.prototype.resetView = function () {
        _resetView.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.fixedColumns) {
            return;
        }

        clearTimeout(this.timeoutHeaderColumns_);
        this.timeoutHeaderColumns_ = setTimeout($.proxy(this.fitHeaderColumns, this), this.$el.is(':hidden') ? 100 : 0);

        clearTimeout(this.timeoutBodyColumns_);
        this.timeoutBodyColumns_ = setTimeout($.proxy(this.fitBodyColumns, this), this.$el.is(':hidden') ? 100 : 0);
    };

    BootstrapTable.prototype.fitHeaderColumns = function () {
        var that = this,
            visibleFields = this.getVisibleFields(),
            headerWidth = 0;

        this.$body.find('tr:first-child:not(.no-records-found) > *').each(function (i) {
            var $this = $(this),
                index = i;

            if (i >= that.options.fixedNumber) {
                return false;
            }

            if (that.options.detailView && !that.options.cardView) {
                index = i - 1;
            }

            that.$fixedHeader.find('th[data-field="' + visibleFields[index] + '"]')
                .find('.fht-cell').width($this.innerWidth());
            headerWidth += $this.outerWidth();
        });
        this.$fixedHeader.width(headerWidth + 1).show();
    };

    BootstrapTable.prototype.fitBodyColumns = function () {
        var that = this,
            top = -(parseInt(this.$el.css('margin-top')) - 2),
            // the fixed height should reduce the scorll-x height
            height = this.$tableBody.height() - 14;

        if (!this.$body.find('> tr[data-index]').length) {
            this.$fixedBody.hide();
            return;
        }

        if (!this.options.height) {
            top = this.$fixedHeader.height();
            height = height - top;
        }

        this.$fixedBody.css({
            width: this.$fixedHeader.width(),
            height: height,
            top: top
        }).show();

        this.$body.find('> tr').each(function (i) {
            that.$fixedBody.find('tr:eq(' + i + ')').height($(this).height() - 1);
        });

        // events
        this.$tableBody.on('scroll', function () {
            that.$fixedBody.find('table').css('top', -$(this).scrollTop());
        });
        this.$body.find('> tr[data-index]').off('hover').hover(function () {
            var index = $(this).data('index');
            that.$fixedBody.find('tr[data-index="' + index + '"]').addClass('hover');
        }, function () {
            var index = $(this).data('index');
            that.$fixedBody.find('tr[data-index="' + index + '"]').removeClass('hover');
        });
        this.$fixedBody.find('tr[data-index]').off('hover').hover(function () {
            var index = $(this).data('index');
            that.$body.find('tr[data-index="' + index + '"]').addClass('hover');
        }, function () {
            var index = $(this).data('index');
            that.$body.find('> tr[data-index="' + index + '"]').removeClass('hover');
        });
    };

})(jQuery);
var visual = function() {
  var cols;
  var rows;
  var cells;
  var table;
  var col_indexes;
  var prof_only_indexes;
  var strain_only_indexes;
  var innate_cost;
  var col_separator;
  var strains_data = strains.data();
  var hidden_professions = {};
  var hidden_skills = {};
  var hidden_strains = {};
  var unhide_strain;
  var unhide_profession;
  var unhide_skill;
  var unhide_all;
  var flash_state;

  var attach = function() {
    innate_cost = 3;
    table = $('#vis-table');
    unhide_strain = $('#unhide-strain');
    unhide_profession = $('#unhide-profession');
    unhide_skill = $('#unhide-skill');
    unhide_all = $('#unhide-all');

    dynaloader.load_remote().then(function() {
      cols = build_columns();
      rows = build_rows();

      render();
    });
  }

  var get_table_space_size = function() {
    return $(window).height() - $('#controls').height();
  }

  var apply_macro_filter = function() {
    apply('lore', $('#hide-lore').prop('checked'));
    apply('psionics', $('#hide-psionics').prop('checked'));
  }

  var apply = function(x, val) {
    var w = table.find('tr[data-type=' + x + ']');

    if (val) {
      w.hide();
    } else {
      w.show();
    }
  }

  var attach_controls = function() {
    var attach_control = function(x) {
      $('#hide-' + x).off('change').on('change', function() {
        apply(x, $(this).prop('checked'));
      })

      apply(x, $('#hide-' + x).prop('checked'));
    }

    

    var attach_remove_column = function() {
      $('span[data-column-remove]').on('click', function() {
        var val = $(this).attr('data-column-remove');

        hide_column(val);
        // $('.psc-class-' + dom_idify(val)).hide();
        // $('[data-field="' + val + '"]').hide();

        // monitor_hidden_column(val);
      })
    }

    var attach_remove_row = function() {
      $('span[data-row-remove]').on('click', function() {
        var data_index = $(this).parent().parent().attr('data-index');

        $(this).parent().parent().hide();
        $('div.fixed-table-body-columns').find('[data-index=' + data_index + ']').hide();
        monitor_hidden_row($(this).attr('data-row-remove'));
      })
    }

    var attach_flash_strain = function() {
      $('span[data-column-flash]').on('click', function() {
        var val = $(this).attr('data-column-flash');

        if (flash_state) {
          $.each(strain_only_indexes, function(k, _junk) {
            unhide_column(k);
          })

          flash_state = false;
        } else {
          $.each(strain_only_indexes, function(k, _junk) {
            if (k != val) {
              hide_column(k);
            }
          })

          flash_state = true;
        }

        //remove_source_duplication();
      })
    }

    attach_control('lore');
    attach_control('psionics');
    attach_remove_column();
    attach_remove_row();
    attach_flash_strain();
    attach_unhide_all();
  }

  var hide_column = function(x) {
    $('.psc-class-' + dom_idify(x)).hide();
    $('[data-field="' + x + '"]').hide();

    recalculate_header_width();
    monitor_hidden_column(x);
  }

  var recalculate_header_width = function() {
    var visibles = $('.fixed-table-header').find('.head-rotate:visible');
    var vx_width = 200 + 23 * visibles.length;
    var vt_width = 22 * visibles.length;
    visibles.width(20);
    $('.table-hover').find('.head-rotate').width(20);
    $('.table-hover').css('width', '');

    console.log(vx_width);
    $('#vis-table').css('width', vt_width);
    $('.fixed-table-header').css('width', vx_width);
    console.log($('.fixed-table-header'));
  }

  var attach_unhide_all = function(x) {
    unhide_all.on('click', function() {
      clear_hiddens();
    })
  }

  var unhide_column = function(x) {
    $('.psc-class-' + dom_idify(x)).show();
    $('[data-field="' + x + '"]').show();
    recalculate_header_width();
  }

  var unhide_row = function(x) {
    $('span[data-row-remove="' + x + '"]').parent().parent().show();
  }

  var monitor_hidden_row = function(x) {
    hidden_skills[x] = true;
    repopulate_hidden_skills();
  }

  var monitor_hidden_column = function(x) {
    if (prof_only_indexes[x]) {
      hidden_professions[x] = true;
      repopulate_hidden_professions();
    } else {
      hidden_strains[x] = true;
      repopulate_hidden_strains();
    }
  }

  var repopulate_hidden_strains = function() {
    repopulate(unhide_strain, Object.keys(hidden_strains).sort(), 'strain');
  }

  var repopulate_hidden_professions = function() {
    repopulate(unhide_profession, Object.keys(hidden_professions).sort(), 'profession');
  }

  var repopulate_hidden_skills = function() {
    repopulate(unhide_skill, Object.keys(hidden_skills).sort(), 'skill');
  }

  var unhide = function(type, target) {
    switch(type) {
      case 'strain': 
        delete hidden_strains[target]; 
        unhide_strain.find('[data-unhide-name="' + target + '"]').remove();
        unhide_column(target);
        break;
      case 'profession': 
        delete hidden_professions[target]; 
        unhide_profession.find('[data-unhide-name="' + target + '"]').remove();
        unhide_column(target);
        break;
      case 'skill': 
        delete hidden_skills[target]; 
        unhide_skill.find('[data-unhide-name="' + target + '"]').remove();
        unhide_row(target);
        break;
    }
  }

  var repopulate = function(anchor, sorted, type) {
    var t = '';

    anchor.empty();
    if (sorted.length == 0) {
      t += '<li>Nothing is hidden</li>';
    } else {
      $.each(sorted, function(_junk, x) {
        t += '<li '
          +       'data-unhide-name="' + x + '" '
          +       'data-unhide-type="' + type + '" '
          +  '><a href="#">' + x + '</a></li>';
      })

      t += '<li role="separator" class="divider"></li>';
      t += '<li data-omni="' + type + '"><a href="#">Unhide All</li>';
    }

    anchor.append(t);
    reactivate(anchor);
    
  }

  var reactivate = function(anchor) {
    anchor.find('li[data-unhide-type]').on('click', function(event) {
      var target = $(this).attr('data-unhide-name');
      var type = $(this).attr('data-unhide-type');

      unhide(type, target);
      event.preventDefault();
    })

    anchor.find('li[data-omni]').on('click', function(event) {
      var type = $(this).attr('data-omni');
      var datalist;

      switch(type) {
        case 'skill': datalist = hidden_skills; break;
        case 'profession': datalist = hidden_professions; break;
        case 'strain': datalist = hidden_strains; break;
      }

      $.each(datalist, function(k, _junk) {
        if (type == 'skill') {
          unhide_row(k);
        } else {
          unhide_column(k);
        }
      })

      switch(type) {
        case 'skill': hidden_skills = {}; repopulate_hidden_skills(); break;
        case 'profession': hidden_professions = {}; repopulate_hidden_professions(); break;
        case 'strain': hidden_strains = {}; flash_state = false; repopulate_hidden_strains(); break;
      }
      event.preventDefault();
    })
  }

  var dom_idify = function(x) {
    return x.replace(/\s+/g, '');
  }

  var clear_hiddens = function() {
    hidden_professions = {};
    hidden_strains = {};
    hidden_skills = {};
    $('.table-hover').find('tr').show();
    $('.fixed-table-body').find('td').show();
    $('.table-hover').find('[data-field]').show();
    repopulate(unhide_skill, [], 'skill');
    repopulate(unhide_strain, [], 'strain');
    repopulate(unhide_profession, [], 'profession');
    apply_macro_filter();
    flash_state = false;
  }

  var render = function() {
    clear_hiddens();
    table.bootstrapTable({
      columns: cols,
      data: rows,
      undefinedText: '',
      rowAttributes: function(row, index) {
        return {
          'data-type': row.type
        }
      },
      height: get_table_space_size(),
      onPostBody: function() {
        attach_controls();
      },
      fixedColumns: true
    })
  }

  var remove_source_duplication = function() {
    $('.fixed-table-body').find('td:first-child').empty();
  }

  var cell_formatter = function(value, row, index, field) {
    var a_class = ['cell'];

    if (field == 'separator') { a_class.push('separatorcell'); }

    if (row.opens && row.opens[field]) { a_class.push('opencell'); }
    if (row.accesses && row.accesses[field]) { a_class.push('accesscell'); }
    if (row.uniques && row.uniques[field]) { a_class.push('uniquecell'); }
    if (row.disadvs && row.disadvs[field]) { a_class.push('disadvcell'); }

    a_class.push('psc-class-' + dom_idify(field));

    return {
      classes: a_class.join(' ')
    }
  }


  var build_rows = function() {
    var a = [];
    var data = skills.data();
    var sorted = Object.keys(data).sort();
    var make_interactable_header_remove = function(k) {
      return '<span class="glyphicon glyphicon-remove clickable" data-column-remove="' + k + '" /> ';
    }
    var make_interactable_row_remove = function(k) {
      return k + '<span class="pull-right glyphicon glyphicon-remove clickable" data-row-remove="' + k + '" />';
    }
    var make_interactable_header_flash = function(k) {
      return '<span class="glyphicon glyphicon-flash clickable" data-column-flash="' + k + '" /> ';
    }

    var control_remove = {};
    $.each(col_indexes, function(k, _junk) {
      control_remove[k] = make_interactable_header_remove(k);
    });
    a.push(control_remove);

    var control_flash = {};
    $.each(strain_only_indexes, function(k, _junk) {
      control_flash[k] = make_interactable_header_flash(k);
    });
    a.push(control_flash);

    $.each(sorted, function(idx, k) {
      var sdata = data[k];

      if (k.match(/ (II|III|IV|V)$/)) {
        return true;
      }

      if (!['conc', 'adv', 'npc'].includes(sdata.type)) {
        var h = {
          id: idx,
          skill_name: make_interactable_row_remove(k), //k,
          uniques: {},
          disadvs: {},
          accesses: {},
          opens: {},
          type: sdata.type
        }

        if (sdata.conditions.open) {
          $.each(prof_only_indexes, function(n, _junk) {
            h[n] = sdata.conditions.open;
            h.opens[n] = true;
            //h.is_open = true;
          })
        }

        $.each(sdata.conditions, function(condition, d) {
          if (condition == 'innate') {
            $.each(d, function(_junk, strain) {
              h[strain] = innate_cost;
            })
          } else if (condition == 'innate_disadvantage') {
            $.each(d, function(_junk, strain) {
              h[strain] = 'X';
              h.disadvs[strain] = true;
            })
          } else if (d.cost != undefined) {
            h[condition] = d.cost;
            h.accesses[condition] = true;
            if (sdata.unique) {
              h.uniques[condition] = true;
            }
          }
        })

        a.push(h);
      }
    })

    return a;
  }

  var build_columns = function() {
    var d = new Array();
    var strain_data = strains.data();
    var prof_data = profession_basic.all();

    var strain_keys = Object.keys(strain_data).sort();
    var prof_keys = Object.keys(prof_data).sort();

    col_indexes = {};
    prof_only_indexes = {};
    strain_only_indexes = {};
    var idx = 0;

    d.push({
      title: '',
      field: 'skill_name',
      class: 'row-head',
      width: '200px'
    })

    $.each(strain_keys, function(i, k) {
      d.push({
        title: k,
        field: k,
        class: 'head-rotate',
        cellStyle: cell_formatter
        //is_strain: true,
        //props: strain_data[k] || {}
      })
      col_indexes[k] = true;
      strain_only_indexes[k] = true;
    })

    d.push({
      title: '',
      field: 'separator',
      class: 'separatorcell'
      //is_splitter: true
    })
    //col_separator = idx++;

    $.each(prof_keys, function(i, k) {
      d.push({
        title: k,
        field: k,
        class: 'head-rotate',
        cellStyle: cell_formatter
        //is_profession: true,
        //props: strain_data[k] || {}
      })
      col_indexes[k] = true;
      prof_only_indexes[k] = true;
    })

    return d;
  }

  return {
    attach: attach,
    clear_hiddens: clear_hiddens
  }
}();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//





;
