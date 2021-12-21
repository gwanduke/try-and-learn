type IsTuple<T extends ReadonlyArray<any>> = number extends T["length"]
  ? false
  : true;

type TupleKey<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;
type ArrayKey = number;

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

type PathImpl<K extends string | number, V> = V extends Primitive
  ? `${K}`
  : `${K}` | `${K}.${Path<V>}`;

export type Path<T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKey<T>]-?: PathImpl<K & string, T[K]>;
      }[TupleKey<T>]
    : PathImpl<ArrayKey, V>
  : {
      [K in keyof T]-?: PathImpl<K & string, T[K]>;
    }[keyof T];

// ----------

interface FormValues {
  title: string;
  todos: {
    id: string;
    name: string;
    dueDateTimestamp: number;
    done: boolean;
    linkedTodos: {
      id: string;
    }[];
  }[];
}

type Name = Path<FormValues>;

const title: Name = "title";
const todos_0_name: Name = "todos.0.name";
const todos_3_done: Name = `todos.${3}.done`;
const todos_nested: Name = `todos.${3}.linkedTodos.0.id`;

const invalid: Name = "description"; // description 이라는 필드는 없기 때문에 에러!
const todos_invalid: Name = "todos.0.haha"; // haha 라는 필드가 없기 때문에 에러!

const readonlyArray: ReadonlyArray<string> = [];
