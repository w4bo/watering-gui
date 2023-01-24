<template>
  <header>
    <h1>PREPARING THE SIMULATOR</h1>
  </header>  
  <form action="http://10.201.102.159:8080/" method="POST" name="myForm"> 
    <article class="inputMission">
      <!-- div input -->
      <div class="input">
        <label for="nameMission">Mission Name: </label>
        <input type="text" id="nameMission" name="nameMission" required/>
        <br>
        <template v-for="fold in getFolder()" :key="fold">
          <label :for="fold">{{ fold }}</label>
          <select :name="fold" id="fold">
            <option v-for="file in getFiles(fold)" :key="file">{{ file }}</option>
          </select>
          <br>
        </template>
        <br>
      </div>
      
    </article>

    <div v-for="(temp, index) in template" :key="index">
      <article v-for="(type,title,index) in temp" :key="index" :class="title">
        <header>
          <h4> {{ title }}</h4>
        </header>

        <div v-for="(elem, index) in type" :key="index" class="input">
          <li>
            <!-- if url != null -->
            <template v-if="elem.url">
              <a :href="elem.url" target="_blank" class="title">{{elem.name}}</a>
            </template>
            <!-- else if url == null -->
            <template v-else>
              <label for="input" class="title"> {{ elem.name }} </label>
            </template>
            
            <!-- if mandatory -->
            <template v-if="elem.mandatory==='true'">
              <!-- if input type text -->
              <input v-if='elem.type == "text"' :id="elem.name" :name="elem.name" :type="elem.type" :value="elem.default" required/>

              <!-- if input type range -->
              <template v-if='elem.type == "range"'>
                <label for="input" class="min">{{ elem.values[0] }}</label>
                <input :id="elem.name" :name="elem.name" :type="elem.type" :value="elem.default"  :min="elem.values[0]" :max="elem.values[1]" @change="updateValue(elem.name)" :step="(elem.values[1] - elem.values[0])/100" required/>
                <label for="input" class="max">{{ elem.values[1] }}</label>
                
                <label :id="'label' + elem.name" class="current">CURRENT VALUE: {{ elem.default }}</label>
              </template>

              <!-- if input type radio -->
              <div v-if='elem.type == "radiogroup"' class="radiogroup">
                <template v-for="(valore, index) in elem.values" :key="index">
                  <input type="radio" :id="elem.name" :defaultValue="elem.default" name="radiogroup" required/>
                  <img :src="valore">
                </template>
              </div>
            </template>

            <!-- else if mandatory == false -->
            <template v-else>
              <!-- if input type text -->
              <input v-if='elem.type == "text"' :id="elem.name" :name="elem.name" :type="elem.type" :value="elem.default" />

              <!-- if input type range -->
              <template v-if='elem.type == "range"'>  
                <label for="input" class="min">{{ elem.values[0] }}</label>
                <input :id="elem.name" :type="elem.type" :name="elem.name" :value="elem.default" :min="elem.values[0]" :max="elem.values[1]" :step="(elem.values[1] - elem.values[0])/100" @change="updateValue(elem.name)" />
                <label for="input" class="max">{{ elem.values[1] }}</label>

                <label :id="'label' + elem.name" class="current">CURRENT VALUE: {{ elem.default }}</label>
                
              </template>

              <!-- if input type radio -->
              <div v-if='elem.type == "radiogroup"' class="radiogroup">
                <template v-for="(valore, index) in elem.values" :key="index">
                  <input :id="elem.name" :name="elem.name" type="radio" :defaultValue="elem.default"/>
                  <img :src="valore">
                </template>
              </div>
            </template>
            
            <!-- if elem.hyperparopt = true -->
            <template v-if="elem.hyperparopt">    
              <label :for="'checkbox' + elem.name" class="hyper">Enable hyper-parameter opt</label>
              <input type="checkbox" :id="'checkbox' + elem.name" @click="check(elem.name)"/>                           
            </template>

          </li>
        </div>
      </article>
    </div>
    <input type="submit" value="Submit">
  </form>
</template>

<script>

import template from './template.js';

export default {
    data() {
        return {
            template
        };
    }, 
    methods: {
      check:function(elem){
        let checkbox = document.getElementById("checkbox" + elem);
        let input = document.getElementsByName(elem);
        for(let i = 0; i < input.length; i++){
          if(checkbox.checked == true){
            input[i].disabled = true;
          } else {
            input[i].disabled = false;
          }
        }
        
      },

      updateValue:function(elem){
        let label = document.getElementById("label" + elem);
        let input = document.getElementById(elem);
        label.innerHTML = "CURRENT VALUE: " + input.value;
      },

      getFolder:function(){
        let folder = new Array();
        const a1 = require.context('../public/input/', true)
        a1.keys().forEach(element => {
          let array = element.split("/");
          if(!folder.includes(array[1])){
            folder.push(array[1])
          }
        })
        return folder
      },

      getFiles:function(fold){
        let files = new Array();
        const a2 = require.context('../public/input/', true)
        a2.keys().forEach(element => {
          let array = element.split("/")
          if(array[1] == fold){
            files.push(array[2]);
          }
        })
        return files
      }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  margin-top: 60px;
}

h1 {
  text-align: center;
}

article {
  margin-top: 10px;
  min-height: 100px;
  border-style: solid;
  background-color: #969696;
  border-radius: 15px;
  text-align: left;
}

h4 {
  text-align: left;
  margin-left: 10px;
  margin-top: 2px;
}

button {
  margin-top: 20px;
}

div.input{
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: white;
  width: 90%;
  min-height: 5px;
  padding-bottom: 0px;
  margin-left: 2%;
  border-radius: 10px;
}

label, a {
  display: inline-block;
  margin-top: 15px;
  margin-right: 50px;
  min-width: 150px;
}

 .Soil a {
  display: inline-block;
  margin-top: 15px;
  margin-right: 50px;
  min-width: 307px;
}

.min {
  text-align: end;
  margin-top: 15px;
  margin-right: 5px;
  min-width: 30px;
}

.max {
  text-align: left;
  margin-top: 15px;
  margin-right: 5px;
  min-width: 30px;
}

.title {
  margin-left: 10px;
}

a {
  margin-top: 15px;
  margin-right: 50px;
}

input{
  margin-top: 15px;
}

img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
}

li {
  margin-left: 10px;
  min-height: 50px;
}

.min, .max {
  margin-top: 0px;
  margin-right: 0px;
}

.radiogroup {
  display: inline-block;
}

.current{
  margin-left: 15px;
}

.hyper{
  margin-right: 5px;
}

.inputMission > div > label {
  display: inline-block;
  margin-left: 5px;
  min-width: 120px;
}


</style>
