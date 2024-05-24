const express = require('express');
const cluster = require('cluster')
const os = require('os')

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while(Date.now() - startTime < duration) {
    //event loop is blocked...
  }
}

app.get('/', (req, res) => {
  res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
  delay(4000);
  res.send(`Beep beep beep ${process.pid}`);
});

if(cluster.isMaster){
    console.log('Master started');
    const num_workers = os.cpus().length;
    for(let i = 0; i<num_workers; i++){
        cluster.fork();
    }
}else{
    console.log('Worker started');
    app.listen(3000);
}
