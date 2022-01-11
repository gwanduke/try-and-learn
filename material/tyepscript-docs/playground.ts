function foo(a: number, b: string): string {
  return a + b;
}
let a = foo.apply(undefined, [10]); // error: too few argumnts
let b = foo.apply(undefined, [10, 20]); // error: 2nd argument is a number
let c = foo.apply(undefined, [10, "hello", 30]); // error: too many arguments
let d = foo.apply(undefined, [10, "hello"]); // okay! returns a string
