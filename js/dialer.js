export default {
  reachableKeys,
  countPaths,
  listAcyclicPaths,
};

// ****************************

var dialed = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [, 0],
];

function reachableKeys(startingDigit) {
  var reachable = [];
  for (let [rowIdx, row] of dialed.entries()) {
    let colIdx = row.indexOf(startingDigit);
    if (colIdx !== -1) {
      for (let rowMove of [-2, -1, 1, 2]) {
        for (let colMove of [-2, -1, 1, 2]) {
          if (Math.abs(rowMove) !== Math.abs(colMove)) {
            let newRowIdx = rowIdx + rowMove;
            let newColIdx = colIdx + colMove;
            if (
              newRowIdx >= 0 &&
              newRowIdx < dialed.length &&
              newColIdx >= 0 &&
              newColIdx < dialed[newRowIdx].length &&
              dialed[newRowIdx][newColIdx] !== undefined
            ) {
              reachable.push(dialed[newRowIdx][newColIdx]);
            }
          }
        }
      }
    }
  }

  return reachable;
}

function countPaths(startingDigit, hopCount) {
  // TODO: given the digit/key to start from and
  // the number of hops to take, return a count
  // of all the possible paths that could be
  // traversed
  return 0;
}

function listAcyclicPaths(startingDigit) {
  // TODO: given the digit/key to start from,
  // return a list of the distinct acyclic
  // paths that are possible to traverse
  //
  // e.g. [
  //   [4, 3, 8, 1, 6, 7, 2, 9],
  //   [4, 3, 8, 1, 6, 0],
  //   ...
  // ]
  return [];
}
