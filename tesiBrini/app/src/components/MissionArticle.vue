<template>
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

    

</template>

<script>
export default {

    methods: {
        getFolder:function(){
            let folder = new Array();
            const a1 = require.context('../../public/input/', true)
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
            const a2 = require.context('../../public/input/', true)
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

</style>
