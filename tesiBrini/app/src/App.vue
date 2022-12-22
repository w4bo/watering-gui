<template>
  <form>  
    <div v-for="(temp, index) in template" :key="index">
      <article v-for="(type,title,index) in temp" :key="index">
        <header>
          <h4> {{ title }}</h4>
        </header>
        <div v-for="(elem, index) in type" :key="index" class="input">
          <li>
            <label for="input"> {{ elem.name }} </label>
            
            <input v-if='elem.type == "text"' :type="elem.type" :value="elem.default" required/>

            <template v-if='elem.type == "range"'>
              <form oninput="range1value.value = range1.valueAsNumber">
                <input name="range1" :type="elem.type" :value="elem.default"  :min="elem.values[0]" :max="elem.values[1]" onInput="document.getElementById('rangeVal').innerHTML = this.value" :scale="elem.scale"/>
                <output name="range1value" for="range1">{{elem.default}}</output>
              </form>
              
            </template>
            

          
            <div v-if='elem.type == "radiogroup"' class="radiogroup">
              <template v-for="(valore, index) in elem.values" :key="index">
                <input type="radio" :defaultValue="elem.default" name="radiogroup"/>
                <img :src="valore">
              </template>
            </div>
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
