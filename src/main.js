// @flow

export class End {}
export type $End = Class<End>

export type $List<A, B: $List<any, any> | $End> = [A, B]

// convienence types for creating lists of various lengths
export type $1List<A> = $List<A, $End>
export type $2List<A, B> = $List<A, $1List<B>>
export type $3List<A, B, C> = $List<A, $2List<B, C>>
export type $4List<A, B, C, D> = $List<A, $3List<B, C, D>>
export type $5List<A, B, C, D, E> = $List<A, $4List<B, C, D, E>>
export type $6List<A, B, C, D, E, F> = $List<A, $5List<B, C, D, E, F>>

export const list1 = <A>(a: A): $1List<A> => [ a, End ];
export const list2 = <A, B>(a: A, b: B): $2List<A, B> => [ a, list1(b) ];
export const list3 = <A, B, C>(a: A, b: B, c: C): $3List<A, B, C> => [ a, list2(b, c) ];
export const list4 = <A, B, C, D>(a: A, b: B, c: C, d: D): $4List<A, B, C, D> => [ a, list3(b, c, d) ];
export const list5 = <A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): $5List<A, B, C, D, E> => [ a, list4(b, c, d, e) ];
export const list6 = <A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): $6List<A, B, C, D, E, F> => [ a, list5(b, c, d, e, f) ];

// extracts the head type of a list
type $_Head<A, T: $List<A, any>> = A
export type $Head<T> = $_Head<*, T>

// extracts the tail list of a list
type $_Tail<B, T: $List<any, B>> = B
export type $Tail<T> = $_Tail<*, T>

// creates a union of the types in the list
type $_Union<A, B, T: $List<A, B>> = A | $Union<B>
export type $Union<T> = $_Union<*, *, T>

export class HigherKind<T: $List<any, any>> {}

export class $Higher<K, T: $List<any, any>> {}

/**
 * wrap :: Class (HigherKind t) -> $Higher (HigherKind t) t
 */
export function wrap<T: $List<any, any>, H: HigherKind<T>>(higherKind: Class<H>, values: T): $Higher<H, T> {
	return ((values: any): $Higher<H, T>);
}

/**
 * unwrap :: Class (HigherKind t) -> $Higher (HigherKind t) t -> t
 */
export function unwrap<T, H: HigherKind<T>>(higherKind: Class<H>, hkt: $Higher<H, T>): T {
	return ((hkt: any): T);
}
