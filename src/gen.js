import babel from "@babel/core";

function executeBenchmarkPlugin() {
  return {
    visitor: {
      FunctionDeclaration(path) {
        const { node } = path;
        const functionName = node.id.name;

        const isBenchmark = functionName.toLowerCase().startsWith("benchmark");
        if (!isBenchmark) return;

        const code = `(async function () {
          let start = performance.now();
          await ${functionName}();
          const t = performance.now() - start;

          let totalTime = 0;
          let count = 0;
          if (t < 1000) {
            count = Math.floor(1000 / t);
            if(count > 10000){
              count = 10000;
            }else if(count > 1000){
              count = Math.floor(count / 1000) * 1000;
            }else if(count > 100){
              count = Math.floor(count / 100) * 100;
            }else{
              count = Math.floor(count);
            }

            for(let i=0; i<count; i++){
              start = performance.now();
              await ${functionName}();
              totalTime += performance.now() - start;
            }
          }else{
            totalTime = t;
            count = 1;
          }

          const timePerOp = totalTime / count;
          let formattedTime = "";
          if (timePerOp > 1000) {
            formattedTime = (timePerOp / 1000).toFixed(timePerOp > 100000 ? 0 : 1) + "s/op";
          } else if (t < 1) {
            formattedTime = (timePerOp * 1000).toFixed(0) + "us/op";
          } else {
            formattedTime = timePerOp.toFixed(timePerOp > 100 ? 0 : 1) + "ms/op";
          }
        
          console.log(${functionName}.name + " " + count + " " + formattedTime);
        })()`;

        path.insertAfter(babel.parseSync(code).program.body[0]);
      },
    },
  };
}

function gen(source) {
  const { code } = babel.transformSync(source, {
    plugins: [executeBenchmarkPlugin],
  });

  return code;
}

export default gen;
