const express = require('express');
const app = express(); //top-level function of express

const path = require('path');
const apiData = require('./plant.json');
const people = require('./People.json');

const port = 3000;

app.use((req,res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
})

// app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.static('public')); //all files from public folder must be included
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/popper', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));


//set the route for index.html
app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

//set the route for about.html
app.get('/about',(req, res) => {
  res.sendFile(path.join(__dirname + '/public/about.html'));
});

// give access to apiData
app.get('/plant',(req, res) => {
  res.json(apiData);

});


app.get('/plant_family/p=:plant_family',(req,res)=>{
  const plantParam = req.params.plant_family; //retrieves the parameter value requested by the user
  if ((plantParam === 'Campanulaceae') || (plantParam === 'Fissidentaceae')){
    let filteredArray = [];//array to push the matching objects to user's value
    for (let i = 0; i < apiData.length; i++) {
      if (plantParam.toLowerCase() === apiData[i].plant_family.toLowerCase()){
        filteredArray.push(apiData[i]);
      }
    }
    res.send(filteredArray);
  } else {
    res.send('Invalid parameter');
  }
});


// gender example
app.get('/gender/g=:gender',(req,res)=>{
  const genderParam = req.params.gender; //retrieves the parameter value requested by the user
  if ((genderParam === 'male') || (genderParam === 'female')){
    let filteredArray = [];//array to push the matching objects to user's value
    for (let i = 0; i < apiData.length; i++) {
      if (genderParam.toLowerCase() === people[i].gender.toLowerCase()){
        filteredArray.push(people[i]);
      }
    }
    res.send(filteredArray);
  } else {
    res.send('Invalid parameter');
  }
});


app.get('/people/fn=:first_name&car=:car_owned',(req,res)=>{
  const nameParam = req.params.first_name; //retrieves the parameter value requested by the user
  const carParam = req.params.car_owned;

    let filteredArray = [];//array to push the matching objects to user's value
    for (let i = 0; i < people.length; i++) {
      if ((nameParam.toLowerCase() === people[i].first_name.toLowerCase()) && (carParam.toLowerCase() === people[i].car_owned.toLowerCase())){
        filteredArray.push(people[i]);
      }
    }
    res.send(filteredArray);

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
