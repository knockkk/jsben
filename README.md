# JSBEN

A simple command-line tool for **javascript performance testing**, inspired by Golang benchmarking.

## Usage

```shell
# install
$ npm install -g @knockkkjs/jsben

# test loop.js
$ jsben loop.js
```

loop.js:

```js
function BenchmarkLoop() {
  for (let i = 0; i < 100000000; i++) {}
}
```

"jsben" will perform performance testing on every function in the file that starts with "benchmark" (case-insensitive).

output:

```shell
os:  darwin
node version:  v16.16.0
BenchmarkLoop 20 32.6ms/op
```

The `BenchmarkLoop` function was executed a total of **20** times, with an average duration of **32.6** milliseconds per run.
