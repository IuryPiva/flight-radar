const x = { x: -1, y: -1}

const arr = []

for(let i = 0; i < 10; i++) {
  arr.push(x)
  x.x = i
  x.y = i
}

console.log(arr);
