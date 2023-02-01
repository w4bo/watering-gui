<template>
  <header>
    <h1>PREPARING THE SIMULATOR</h1>
  </header>  
  <form method="post" name="myForm"> 
    
    <MissionArticle></MissionArticle>

    <div v-for="(temp, index) in template" :key="index">
      <article v-for="(type,title,index) in temp" :key="index" :class="title">
        <details>
        <summary>
        <header>
          <h4> {{ title }}</h4>
        </header>
        </summary>
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
              <input v-if='elem.type == "text"' :id="[elem.name]" :name="[elem.name]" :type="elem.type" :value="elem.default" required/>

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
      </details>
      </article>
    </div>
    <input type="submit" value="Submit">
  </form>
</template>

<script>

import template from './template.js';
import MissionArticle from './components/MissionArticle.vue';

export default {
  components: {MissionArticle},
  
  data() {
        return {
            template,
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
  min-height: 10px;
  border-style: solid;
  background-color: #969696;
  border-radius: 15px;
  text-align: left;
}

h4 {
  display: inline-block;
  margin-left: 10px;
  margin-top: 20px;
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

summary {
  cursor: pointer;
}

details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none;
}

</style>
