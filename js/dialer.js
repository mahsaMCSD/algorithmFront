export default {
  reachableKeys,
  countPaths,
  listAcyclicPaths,
};

// ****************************

var nearbykeys = [
  [4, 6],
  [6, 8],
  [7, 9],
  [4, 8],
  [3, 9, 0],
  [],
  [1, 7, 0],
  [2, 6],
  [1, 3],
  [2, 4],
];

function reachableKeys(startingDigit) {
  return nearbykeys[startingDigit];
}

function countPaths(startingDigit, hopCount) {
  if (hopCount === 0) {
    return 1;
  }
  //dynamic programming approach
  var priorPathCounts = Array(10).fill(1);
  for (let hops = 0; hops < hopCount; hops++) {
    let pathCounts = Array(10).fill(0);
    for (let digit = 0; digit <= 9; digit++) {
      for (let n of nearbykeys[digit]) {
        pathCounts[digit] += priorPathCounts[n];
      }
    }
    priorPathCounts = pathCounts;
  }
  return priorPathCounts[startingDigit];
}

function listAcyclicPaths(startingDigit) {
  var paths = [];
  var nextHops = nearbykeys[startingDigit];
  for (let nextHop of nextHops) {
    let path = [startingDigit, nextHop];
    followPaths(path, paths);
  }

  return paths;
}

function followPaths(path, paths) {
  var nextHops = nearbykeys[path[path.length - 1]];
  var pathForwardPath = false;

  for (let nextHop of nextHops) {
    // Avoid cycles by checking if the next hop is already in the path
    if (!path.includes(nextHop)) {
      pathForwardPath = true;
      // Create a new path that includes the next hop
      let newPath = [...path, nextHop];
      // Recursively follow paths from the new path
      followPaths(newPath, paths);
    }
  }

  if (!pathForwardPath) {
    paths.push(path);
  }
}
