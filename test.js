const random = require("random");
const seedrandom = require("seedrandom");

random.use(seedrandom("hVg0hZ2yT*sEDQZSSN&EqY*OkCJZ!VVmW1m#lSiRP"));
for(let i = 0; i < 10; i++) {
    random.next();
}
for(let i = 0; i < 20; i++) {
    console.log(random.int(0, 20))
}