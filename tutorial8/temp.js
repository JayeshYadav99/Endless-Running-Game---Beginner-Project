const Total_sum = (n) =>{
    let sum;
    for(let i=1; i<=n; i++){  
    sum+=i;
    }
    return sum;
  }
  console.log("Program To Calculate Sum Of n Natural Numbers.")
  let n=7;
  n=parseInt(n);
  console.log("Sum Of First "+n+" Natural Number: "+Total_sum(n))
  