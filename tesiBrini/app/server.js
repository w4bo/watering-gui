const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.post("/submit", (req, res) => {
    const dati = req.body
    console.log(dati)
    let folderName = dati["nameMission"]; // sostituire con il nome desiderato per la cartella

    //Se il nome della simulazione è già stato utilizzato, viene aggiunto un numero
    let folderExist = fs.existsSync(folderName);
    let i = 1;
    while(folderExist){
      const newFolderName = `${folderName}(${i})`
      folderExist = fs.existsSync(newFolderName);
      if(!folderExist){
        folderName = newFolderName;
      }
      i++;
    }
    
    //Creazione della cartella per la simulazione
    fs.mkdir(folderName, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      res.send(`Cartella ${folderName} creata con successo.`);
      
      //CREAZIONE DELLA CARTELLA METEO
      fs.mkdir(`${folderName}/meteo`, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        //Creazione del file Air Humidity
        let filename = dati["Air Humidity"]
        let filePath = path.join(__dirname, `public/input/air_humidity/${filename}`);
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          
          const newFilePath = `${folderName}/meteo/air_humidity.csv`;
          fs.writeFile(newFilePath, data, (err) => {
            if(err) throw err;
          })
        });

        //Creazione del file Air Temperature
        filename = dati["Air Temperature"]
        filePath = path.join(__dirname, `public/input/air_temperature/${filename}`);
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          
          const newFilePath = `${folderName}/meteo/air_temperature.csv`;
          fs.writeFile(newFilePath, data, (err) => {
            if(err) throw err;
          })
        });

        //Creazione del file Solar Radiation
        filename = dati["Solar Radiation"]
        filePath = path.join(__dirname, `public/input/solar_radiation/${filename}`);
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          
          const newFilePath = `${folderName}/meteo/solar_radiation.csv`;
          fs.writeFile(newFilePath, data, (err) => {
            if(err) throw err;
          })
        });

        //Creazione del file Wind Speed
        filename = dati["Wind Speed"]
        filePath = path.join(__dirname, `public/input/wind_speed/${filename}`);
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          
          const newFilePath = `${folderName}/meteo/wind_speed.csv`;
          fs.writeFile(newFilePath, data, (err) => {
            if(err) throw err;
          })
        });

      });

      //CREAZIONE DELLA CARTELLA OBS_DATA
      fs.mkdir(`${folderName}/obs_data`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //Creazione del file Wind Speed
        filename = dati["Water Potential"]
        filePath = path.join(__dirname, `public/input/water_potential/${filename}`);
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          
          const newFilePath = `${folderName}/obs_data/water_potential.csv`;
          fs.writeFile(newFilePath, data, (err) => {
            if(err) throw err;
          })
        });

      });

      //CREAZIONE DELLA CARTELLA WATER
      fs.mkdir(`${folderName}/water`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        
        //Creazione del file Irrigation
        filename = dati["Irrigation"]
        filePath = path.join(__dirname, `public/input/irrigation/${filename}`);
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          
          const newFilePath = `${folderName}/water/irrigation.csv`;
          fs.writeFile(newFilePath, data, (err) => {
            if(err) throw err;
          })
        });

        //Creazione del file Precipitation
        filename = dati["Precipitation"]
        filePath = path.join(__dirname, `public/input/precipitation/${filename}`);
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          
          const newFilePath = `${folderName}/water/precipitation.csv`;
          fs.writeFile(newFilePath, data, (err) => {
            if(err) throw err;
          })
        });
      });

      //CREAZIONE DELLA CARTELLA SETTINGS
      fs.mkdir(`${folderName}/settings`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      //Creazione del file output_points.csv
      filePath = path.join(__dirname, `public/input/settings/output_points.csv`);
      fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        
        const newFilePath = `${folderName}/settings/output_points.csv`;
        fs.writeFile(newFilePath, data, (err) => {
          if(err) throw err;
        })
      });

      //Creazione del file soil.csv
      const createCsvWriter = require('csv-writer').createObjectCsvWriter;
      filePath = path.join(__dirname, `${folderName}/settings/soil.csv`);
      const csvWriter = createCsvWriter({
        path: filePath,
        header: [
          {id: 'upper_depth', title: 'upper_depth'},
          {id: 'lower_depth', title: 'lower_depth'},
          {id: 'sand', title: 'sand'},
          {id: 'silt', title: 'silt'},
          {id: 'clay', title: 'clay'},
          {id: 'Campbell_he', title: 'Campbell_he'},
          {id: 'Campbell_b', title: 'Campbell_b'},
          {id: 'VG_he', title: 'VG_he'},
          {id: 'VG_alpha', title: 'VG_alpha'},
          {id: 'VG_n', title: 'VG_n'},
          {id: 'thetaR', title: 'thetaR'},
          {id: 'thetaS', title: 'thetaS'},
          {id: 'Ks', title: 'Ks'},
        ]
      });

      const data = [
        {
          upper_depth: '0.0',
          lower_depth: '0.9',
          sand: dati["sand"],
          silt: dati["silt"],
          clay: dati["clay"],
          Campbell_he: '0.23',
          Campbell_b: '5.4',
          VG_he: dati["VG_he"],
          VG_alpha: dati["VG_alpha"],
          VG_n: dati["VG_n"],
          thetaR: dati["thetaR"],
          thetaS: dati["thetaS"],
          Ks: dati["Ks"]
        }
      ];

      csvWriter.writeRecords(data)
        .then(() => {
          console.log('Il file CSV è stato creato correttamente.');
      });


    });

});

//funzione che passa in get tutte le serie temporali nella cartella input
app.get('/input', (req, res) => {
    const dirPath = path.join(__dirname, 'public/input');
    const files = getFiles(dirPath);
    const fileNames = files.map(file => path.relative(dirPath, file));
    res.json(fileNames);
});

//funzione che legge tutti i file dentro la cartella input
function getFiles(dirPath, files) {
    files = files || [];
    const dirFiles = fs.readdirSync(dirPath);
    dirFiles.forEach(function(file) {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        getFiles(filePath, files);
      } else {
        files.push(filePath);
      }
    });
    return files;
  }

//avviare il server express
const port = 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`listening on ${port}`);
});
