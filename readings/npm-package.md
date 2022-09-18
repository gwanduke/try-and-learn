# NPM Package

- [Best practices for creating a modern npm package 2022](https://snyk.io/blog/best-practices-create-modern-npm-package/)
- https://snyk.io/blog/what-is-package-lock-json/

## Commands

- `npm publish --dry-run`: 실제 배포는 이루어지지 않는다.
- `npm publish --access=public`: scoped 패키지는 기본적으로 private 이므로 public 설정이 필요하다.
- `npm version <major|minor|patch>`: SemVer에 따라서 버저닝하고 커밋&태그된다.

## TypeScript

### Config

- lib: 프로젝트를 개발할 때 도움을 주기 이ㅜ해 타입스크립트가 어떤 타입을 레퍼런스해야하는지 (es6, dom 등...)
- target: 프로젝트를 어떤 JS 버전으로 컴파일할지 결정 (es6, es5 등...)
- module: 타입스크립트 결과물에서 어떤 자바스크립트 모듈 포맷이 프로젝트를 컴파일할 때 사용되는가 (CommonJS)
- moduleResolution: 타입스크립트가 import 구문이 어떻게 처리되는지 알게함 (node)
- outDir: 결과물 위치
- declarationDir: 타입 결과 위치

base

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "checkJs": true,
    "allowJs": true,
    "declaration": true,
    "declarationMap": true,
    "allowSyntheticDefaultImports": true
  },
  "files": ["../src/index.ts"]
}
```

For cjs

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "lib": ["ES6", "DOM"],
    "target": "ES6",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "outDir": "../lib/cjs",
    "declarationDir": "../lib/cjs/types"
  }
}
```

For esm

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM"],
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "outDir": "../lib/esm",
    "declarationDir": "../lib/esm/types"
  }
}
```

## Package.json

```json
{
  "name": "@gwanduke/test",
  "version": "1.1.1",
  "description": "",
  "main": "./lib/cjs/index.js",
  "types": "./lib/cjs/types/index.d.ts",
  "files": ["lib/**/*"],
  "scripts": {
    "clean": "rm -rf ./lib",
    "build": "npm run clean && npm run build:esm && npm run build:cjs",
    "build:esm": "tsc -p ./configs/tsconfig.esm.json && mv lib/esm/index.js lib/esm/index.mjs",
    "build:cjs": "tsc -p ./configs/tsconfig.cjs.json",
    "prepack": "npm run build",
    "test": "mocha"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "exports": {
    ".": {
      "import": {
        "types": "./lib/esm/types/index.d.ts",
        "default": "./lib/esm/index.mjs"
      },
      "require": {
        "types": "./lib/cjs/types/index.d.ts",
        "default": "./lib/cjs/index.js"
      }
    }
  },
  "devDependencies": {
    "@types/chai": "^4.3.3",
    "@types/mocha": "^9.1.1",
    "chai": "^4.3.6",
    "mocha": "^10.0.0",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.3"
  }
}
```
