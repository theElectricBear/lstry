export const partial = (fn, ...args) => fn.bind(null, ...args)

export const pipe = (f, g) => (...args) => g(f(...args))

export const compose = (...fns) => fns.reduce(pipe)

export const mkurl = (str) => str.toLowerCase().str.replace(/\s/g, "-")

export const mergeObj = (a, b) => ({ ...a, ...b })

export const mergeAry = (a, b) => ([ ...a, ...b ])

export const push = (a, b) => [ ...a, b ]

export const buildMap = (obj) => {
	let map = new Map();
	Object.keys(obj).forEach(key => {
	    map.set(key, obj[key]);
	});
	return map;
}

export const head = ([x]) => x
export const tail = ([x, ...xs]) => xs
export const def = x => typeof x !== 'undefined'
export const undef = x => !def(x)
export const copy = array => [...array]
export const length = ([x, ...xs], len = 0) => def(x) ? length(xs, len + 1) : len
export const reverse = ([x, ...xs]) => def(x) ? [...reverse(xs), x] : []
export const first = ([x, ...xs], n = 1) => def(x) && n ? [x, ...first(xs, n -1)] : []
export const last = (xs, n = 1) => reverse(first(reverse(xs), n))
export const slice = ([x, ...xs], i, y, curr = 0) => def(x) ? curr === i ? [y, x, ...slice(xs, i, y, curr + 1)] : [x, ...slice(xs, i, y, curr + 1)] : []
export const isArray = x => Array.isArray(x)
export const flatten = ([x, ...xs]) => def(x) ? isArray(x) ? [...flatten(x), ...flatten(xs)] : [x, ...flatten(xs)] : []
export const swap = (a, i, j) => (
  map(a, (x,y) => {
    if(y === i) return a[j]
    if(y === j) return a[i]
    return x
  })
)
export const map = ([x, ...xs], fn) => def(x) ? [fn(x), ...map(xs, fn)] : []
export const filter = ([x, ...xs], fn) => def(x) ? fn(x) ? [x, ...filter(xs, fn)] : [...filter(xs, fn)] : []
export const reduce = ([x, ...xs], fn, memo, i = 0) => def(x) ? reduce(xs, fn, fn(memo, x, i), i + 1) : memo


export const pushUnique = (arr1, arr2) => [...new Set([...arr1, arr2])]


export const even = x => x % 2 === 0
export const odd = x => !even(x)

export const genId = () => Math.random().toString(36).substr(2, 9).toUpperCase()
export const recent = compose(last, reverse)

/***** URL BUILDER *****/
const split = (x) => x.split('/')
const ellipse = (x) => x.length > 3 ? slice(x, 3, '/...') : x
const first4 = (x) => first(x, 4)
const combine = (x) => x.reduce((acc, y) => acc + y )

const truncate = compose( split, ellipse, first4, tail, combine)

export const displayUrl = (link) => truncate(link)