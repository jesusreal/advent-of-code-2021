// https://adventofcode.com/2021/day/11

import * as fs from "fs";

const getFileLines = () => {
  return fs.readFileSync("./input.txt", "utf8").split("\n");
};

const findMatches = (data, cave) => {
  const getLinkedCave = (entry, matchedCave) =>
    entry.split("-").find((cave) => cave !== matchedCave);

  return data
    .filter((entry) => entry.includes(cave))
    .map((entry) => getLinkedCave(entry, cave));
};

const getTotalFinishedRoutes = (routeList) => {
  const totalFinishedRoutes = routeList.filter(
    (route) => route[0] === "end"
  ).length;

  return totalFinishedRoutes;
};

const removeFinishedRoutes = (routeList) => {
  return routeList.filter((entry) => entry[0] !== "end");
};

const isUpperCase = (match) => {
  return match.toUpperCase() === match;
};

const isLowerCase = (match) => {
  return match.toLowerCase() === match;
};

const isInRoute = (match, route) => {
  return route.includes(match);
};

const isLimitReached = (route) => {
  return route[route.length - 1] === true;
};

const solution1 = () => {
  let routeList = [["start"]];
  let routesCount = 0;
  let data = getFileLines();

  while (routeList.length > 0) {
    let newRouteList = [];

    routeList.forEach((route) => {
      findMatches(data, route[0])
        .filter(
          (match) =>
            isUpperCase(match) ||
            (isLowerCase(match) && !isInRoute(match, route))
        )
        .forEach((match) => newRouteList.push([match, ...route]));
    });

    routesCount = routesCount + getTotalFinishedRoutes(newRouteList);
    routeList = removeFinishedRoutes(newRouteList);
  }

  return routesCount;
};

const solution2 = () => {
  let routeList = [["start", false]];
  let routesCount = 0;
  let data = getFileLines();

  while (routeList.length > 0) {
    let newRouteList = [];

    routeList.forEach((route) => {
      findMatches(data, route[0])
        .filter((match) => match !== "start")
        .filter((match) => {
          return (
            isUpperCase(match) ||
            (isLowerCase(match) && !isInRoute(match, route)) ||
            !isLimitReached(route)
          );
        })
        .forEach((match) => {
          const hasReachedLimit =
            isLimitReached(route) ||
            (isLowerCase(match) && isInRoute(match, route));

          const routeWithoutFlag = route.slice(0, route.length);
          newRouteList.push([match, ...routeWithoutFlag, hasReachedLimit]);
        });
    });

    routesCount = routesCount + getTotalFinishedRoutes(newRouteList);
    routeList = removeFinishedRoutes(newRouteList);
  }

  return routesCount;
};

console.log(
  "Solution 1. How many paths through this cave system are there that visit small caves at most once?",
  solution1()
);

console.log(
  "Solution 2. How many paths through this cave system are there?",
  solution2()
);
