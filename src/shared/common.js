import { format } from "url";
import { stringify } from "querystring";

export function getNeighbors(cell,order){
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

export function getFormattedTime(ticks){
  // Format minutes
  let minutes=parseInt(ticks/60);

  if(minutes<10){
    minutes=`0${minutes}`;
  }
  // Format seconds
let seconds=ticks%60
if(seconds<10){
  seconds=`0${seconds}`
}
  // TODO: Format hours if required
  return  `${minutes}:${seconds}`
}


export default {getNeighbors,getFormattedTime};