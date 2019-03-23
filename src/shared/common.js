function getNeighbors(cell,order){
    const neighbors = [-8, 8];
        // Check first column
        if (cell % order != 0) {
          neighbors.push(-9, -1, 7);
         // console.log(neighbors);
        }

        // Check last column
        if ((cell + 1) % order != 0) {
          neighbors.push(9, 1, -7);
        //  console.log(neighbors);
        }
        console.log(cell,order,neighbors)
        return neighbors;
}

export default getNeighbors;