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
    //Controllo sui valori hyperparopt
    if(!("Ks" in dati)){
      dati["Ks"] = 0.0000006;
    }
    if(!("thetaS" in dati)){
      dati["thetaS"] = 0.5
    }
    if(!("thetaR" in dati)){
      dati["thetaR"] = 0.03;
    }
    if(!("VG_alpha" in dati)){
      dati["VG_alpha"] = 2.2
    }
    if(!("VG_n" in dati)){
      dati["VG_n"] =1.33;
    }
    if(!("VG_he" in dati)){
      dati["VG_he"] = 0.23
    }
    if(!("rootWidth" in dati)){
      dati["rootWidth"] = 1;
    }
    if(!("LAI" in dati)){
      dati["LAI"] = 4
    }
    if(!("rootShape" in dati)){
      dati["rootShape"] = 0;
    }
    if(!("kcMax" in dati)){
      dati["kcMax"] = 1.65
    }
    if(!("fRAW" in dati)){
      dati["fRAW"] = 0.0000006;
    }

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
        //Creazione del file Water Potential
        filename = dati["Water Potential"]
        filePath = path.join(__dirname, `public/input/water_potential/${filename}`);
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          
          const newFilePath = `${folderName}/obs_data/waterPotential.csv`;
          fs.writeFile(newFilePath, data, (err) => {
            if(err) throw err;
          })
        });

        //Creazione del file water Content
        filename = dati["Water Content"]
        filePath = path.join(__dirname, `public/input/water_content/${filename}`);
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          
          const newFilePath = `${folderName}/obs_data/waterContent.csv`;
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

      const soilData = [
        {
          upper_depth: 0.0,
          lower_depth: dati["lower_depth"],
          sand: dati["sand"],
          silt: dati["silt"],
          clay: dati["clay"],
          Campbell_he: 0.23,
          Campbell_b: 5.4,
          VG_he: dati["VG_he"],
          VG_alpha: dati["VG_alpha"],
          VG_n: dati["VG_n"],
          thetaR: dati["thetaR"],
          thetaS: dati["thetaS"],
          Ks: dati["Ks"]
        }
      ];

      csvWriter.writeRecords(soilData)
        .then(() => {
          
      });


      // Creazione del file field.ini
      const pos = dati["plant"];
      let index = pos.indexOf("),"); // Trova l'indice della fine della prima coppia
      const xPlant = pos.substring(1, index); // Estrarre la sottostringa della prima coppia
      const yPlant = pos.substring(index + 4, pos.length - 1);
      const posDripper = dati["dripper"];
      index = posDripper.indexOf("),")
      const xDripper = posDripper.substring(1, index); // Estrarre la sottostringa della prima coppia
      const yDripper = posDripper.substring(index + 4, posDripper.length - 1);
      const fieldData = {
        location: {
          lat: dati["lat"],
          lon: dati["lon"],
          z: dati["z"],
          timeZone: 1
        },
        size: {
          width: dati["width"],
          height: dati["height"],
          depth: dati["depth"],
          cellSize: 0.125
        },
        slope: {
          slopeX: dati["slopeX"],
          slopeY: dati["slopeY"],
          plantSlope: dati["plantSlope"],
          plantSlopeWidth: dati["plantSlopeWidth"]
        },
        plant: {
          x: xPlant,
          y: yPlant
        },
        dripper: {
          x: xDripper,
          y: yDripper
        }
      };
      const iniString = require('ini').stringify(fieldData);
      fs.writeFileSync(`${folderName}/settings/field.ini`, iniString);


      //CREAZIONE DEL FILE settings.ini
      const settingsData = {
        model: {
          waterRetentionCurve: 2,
          conductivityMean: 1,
          conductivityHVRatio: dati["conductivity"],
        },
        processes: {
          computeInfiltration: "True",
          computeSurfaceFlow: "False",
          computeEvaporation: "True",
          computeTranspiration: "True",
          assignIrrigation: "True"
        },
        boundary: {
          isFreeDrainage: "True",
          isFreeLateralDrainage: "True",
          isSurfaceRunoff: "True",
          isWaterTable: "False"
        },
        initial_conditions: {
          initialWaterPotential: -4.0,
          waterTableDepth: -6.0
        },
        layers_thickness: {
          minThickness: 0.01,
          maxThickness: 0.04,
          maxThicknessAt: 0.2
        },
        surface_properties: {
          roughness: 0.24,
          pond: 0.005
        },
        numerical_solution: {
          maxIterationsNr: 100,
          maxApproximationsNr: 10,
          residualTolerance: 1E-12,
          MBRThreshold: 1E-5,
          minDeltaT: 1,
          maxDeltaT: 3600.0
        },
        simulation_type: {
          isForecast: "False",
          isFirstAssimilation: "False",
          isPeriodicAssimilation: "False",
          isVisual: "False",
          assimilationInterval: 24,
          forecastPeriod: 168
        },
      };
      const settingsString = require('ini').stringify(settingsData);
      fs.writeFileSync(`${folderName}/settings/settings.ini`, settingsString);


      //CREAZIONE DEL FILE crop.ini
      let x;
      let z;
      switch(dati["rootShape"]){
        case "0":
          x = 0;
          z = 0;
          break;
        case "1":
          x = 1;
          z = 0;
          break;
        case "2":
          x = 0.5;
          z = 0;
          break;
        default:
          x = 0;
          z = 0;
      }
/*      
      const cropData = {
        info: {
          name: "kiwifruit"
        },
        LAI: {
          laiMonth: `0.5,0.5,1.0,3.0,${dati["LAI"]},${dati["LAI"]},${dati["LAI"]},${dati["LAI"]},${dati["LAI"]},3.5,0.5,0.5`,
        },
        root:{
          rootDepthZero: 0.1,
          rootDepthMax: 0.75,
          rootWidth: dati["rootWidth"],
          rootXDeformation: x,
          rootZDeformation: z
        },
        transpiration: {
          kcMax: dati["kcMax"],
          fRAW: dati["fRAW"]
        }

      };
      const cropString = require('ini').stringify(cropData);
      fs.writeFileSync(`${folderName}/settings/crop.ini`, cropString);
*/

      const cropIniContent = 
`[info]
name = "kiwifruit"
        
[LAI]
laiMonth = 0.5,0.5,1.0,3.0,${dati["LAI"]},${dati["LAI"]},${dati["LAI"]},${dati["LAI"]},${dati["LAI"]},3.5,0.5,0.5
        
[root]
rootDepthZero = 0.1
rootDepthMax = 0.75
rootWidth = ${dati["rootWidth"]}
rootXDeformation = ${x}
rootZDeformation = ${z}
        
[transpiration]
kcMax = ${dati["kcMax"]}
fRAW = ${dati["fRAW"]}`;
        
      fs.writeFile(`${folderName}/settings/crop.ini`, cropIniContent, (err) => {
        if (err) throw err;
      });

      // CREAZIONE DEL FILE tuning_space.json
      let jsonContent = {}
      if("tuning_Ks" in dati){
        jsonContent.Ks = {
          "loguniform": [
            0.0000001,
            0.001
          ]
        }
      }
      if("tuning_thetaS" in dati){
        jsonContent.thetaS = {
          "uniform": [
            0.0,
            1.0
          ]
        }
      }
      if("tuning_thetaR" in dati){
        jsonContent.thetaR = {
          "uniform": [
            0.0,
            1.0
          ]
        }
      }
      if("tuning_VG_alpha" in dati){
        jsonContent.VG_alpha = {
          "loguniform": [
            0.5,
            5.0
          ]
        }
      }
      if("tuning_VG_n" in dati){
        jsonContent.VG_n = {
          "loguniform": [
            1,
            2
          ]
        }
      }
      if("tuning_VG_he" in dati){
        jsonContent.VG_he = {
          "loguniform": [
            0.001,
            15
          ]
        }
      }
      if("tuning_rootWidth" in dati){
        jsonContent.rootWidth = {
          "uniform": [
            1,
            3
          ]
        }
      }
      if("tuning_LAI" in dati){
        jsonContent.LAI = {
          "uniform": [
            0.5,
            5
          ]
        }
      }
      if("tuning_rootShape" in dati){
        jsonContent.rootXDeformation = {
          "uniform": [
              0.0,
              1.0
          ]
        }
        jsonContent.rootZDeformation = {
          "uniform": [
              0.0,
              1.0
          ]
        }
      }

      if("tuning_kcMax" in dati){
        jsonContent.kcMax = {
          "uniform": [
            0.5,
            3.0
          ]
        }
      }
      if("tuning_fRAW" in dati){
        jsonContent.fRAW = {
          "uniform": [
            0,
            1
          ]
        }
      }
      const jsonContentString = JSON.stringify(jsonContent, null, 2);
      fs.writeFile(`${folderName}/settings/tuning_space.json`, jsonContentString, (err) => {
        if (err) {
          console.error(err);
          res.send('Errore nella scrittura del file');
        }
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
