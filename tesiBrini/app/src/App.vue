<template>
  <div v-for="(temp, index) in template" :key="index">
    <article v-for="(type,title,index) in temp" :key="index">
      <header>
        <h4> {{ title }}</h4>
      </header>
      <div v-for="(elem, index) in type" :key="index" class="input">
        <li>
          <label for="input"> {{ elem.name }} </label>
          
          <input v-if='elem.type == "range"' :type="elem.type" :defaultValue="elem.default"  :min="elem.values[0]" :max="elem.values[1]" :scale="elem.scale" :required="elem.mandatory"/>
          
          <div v-if='elem.type == "radiogroup"' class="radiogroup">
            <template v-for="(valore, index) in elem.values" :key="index">
              <input type="radio" :defaultValue="elem.default" :required="elem.mandatory" name="radiogroup"/>
              <img :src="valore">
            </template>
          </div>
       
        </li>
      </div>
    </article>
  </div>
  <button type="button">RUN SIMULATION</button>
</template>
<script>

import template from './template.js';

export default {
    data() {
        return {
            template
        };
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
  background-color: #4949f9;
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

label {
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

</style>
