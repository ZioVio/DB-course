let users = require("./data/users.json");
let courses = require("./data/courses.json");
const fs = require("fs");

const randomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

users = users.map((user) => {
  const coursesCount = randomInteger(2, 12);
  const lowerSliceBound = randomInteger(0, courses.length - coursesCount);
  const userCourses = courses.slice(
    lowerSliceBound,
    lowerSliceBound + coursesCount
  );
  return {
    ...user,
    courses: userCourses.map(({ id }) => id),
  };
});

fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2))