<template>
  <header>
    <h1>PREPARING THE SIMULATOR</h1>
  </header>
  <form> 
    <div v-for="(temp, index) in template" :key="index">
      <article v-for="(type,title,index) in temp" :key="index">
        <header>
          <h4> {{ title }}</h4>
        </header>
        <div v-for="(elem, index) in type" :key="index" class="input">
          <li>
            
            <!-- if url != null -->
            <template v-if="elem.url">
              <a :href="elem.url" target="_blank">{{elem.name}}</a>
            </template>
            <!-- else if url == null -->
            <template v-else>
              <label for="input"> {{ elem.name }} </label>
            </template>
            
            <!-- if mandatory -->
            <template v-if="elem.mandatory==='true'">
              <!-- if input type text -->
              <input v-if='elem.type == "text"' :id="elem.name" :type="elem.type" :value="elem.default" required/>

              <!-- if input type range -->
              <template v-if='elem.type == "range"'>
                <label for="input" class="min">{{ elem.values[0] }}</label>
                <input :id="elem.name" :name="elem.name" :type="elem.type" :value="elem.default"  :min="elem.values[0]" :max="elem.values[1]" :scale="elem.scale" @change="updateValue(elem.name)" required/>
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
                <input :id="elem.name" :type="elem.type" :name="elem.name" :value="elem.default" :min="elem.values[0]" :max="elem.values[1]" @change="updateValue(elem.name)" />
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

              <input type="checkbox" :id="'checkbox' + elem.name" @click="check(elem.name)"/>
            </template>

          </li>
        </div>
      </article>
    </div>
    <button>Submit</button>
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
        if(checkbox.checked == true){
          input.forEach(element => {
            element.disabled = true;
          });
        } else {
          input.forEach(element => {
              element.disabled = false;
          });
        }
      },

      updateValue:function(elem){
        let label = document.getElementById("label" + elem);
        let input = document.getElementById(elem);
        label.innerHTML = "CURRENT VALUE: " + input.value;
      }
      

    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

article {
  margin-top: 10px;
  min-height: 200px;
  border-style: solid;
  background-color: #007FFF;
  border-radius: 15px;
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
    margin-top: 15px;
    background-color: orange;
    width: 90%;
    height: auto;
    padding-bottom: 2%;
    margin-left: 5%;
    border-radius: 10px;
}

label, a {
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

.min, .max {
  margin-top: 0px;
  margin-right: 0px;
}

.current{
  margin-left: 15px;
}

</style>
