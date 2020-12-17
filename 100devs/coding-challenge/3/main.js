#!/home/sero/.node/bin/node

/*Create a function that takes in 3 numbers. The function should return the first number multiplied by the second and then subtract the third. Console.log() the resulting value*/

const threeNumCalc = (n1,n2,n3) => {
  return ((n1*n2)-n3)
}
console.log(threeNumCalc(5,2,3))
