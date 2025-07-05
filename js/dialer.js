export default {
  reachableKeys,
  countPaths,
  listAcyclicPaths,
};

countPaths=memoize(countPaths);

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
  var pathCount = 0;
  for (let digit of reachableKeys(startingDigit)) {
    pathCount += countPaths(digit, hopCount - 1);
  }
  return pathCount;
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

function memoize(fn) {
  var cache = {};
  // Create a cache object to store results of previous calls
  // The cache will use a string key based on the function arguments
  // to store the results of the function calls.
  // This allows us to avoid recalculating results for the same arguments.  
  // The key is constructed as a string in the format "start:length"
  // where 'start' is the starting digit and 'length' is the hop count. 
  return function memoized(start, length) {
    if (!cache[`${start}:${length}`]) {
      // If the result is not in the cache, call the original function
      // and store the result in the cache. 
      
      cache[`${start}:${length}`] = fn(start, length);
    }
    return cache[`${start}:${length}`];
  };
}
