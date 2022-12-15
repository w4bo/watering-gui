<template>
    <header>
        <h4>PLANTS</h4>
    </header>
    <div class="input">
        <label for="inputLai">LAI:</label>
        <input id="range" name="LAI" type="range" class="slider" min="0" max="10" value="0" scale="linear" mandatory="true">
    </div>
    <div class="input" id="inputRadio">
        <label for="inputRadio">Root Shape:</label>
        <input type="radio" name="radio" id="radio">
        <img src="https://media.istockphoto.com/id/817203414/it/vettoriale/insieme-di-radici-degli-alberi.jpg?s=612x612&w=is&k=20&c=z9osf8fG3NMgrPxu7UVNcPFdoEftG-86gb9X2cbJyxM=" alt="">
        <input type="radio" name="radio" id="radio2">
        <img src="https://media.istockphoto.com/id/817203414/it/vettoriale/insieme-di-radici-degli-alberi.jpg?s=612x612&w=is&k=20&c=z9osf8fG3NMgrPxu7UVNcPFdoEftG-86gb9X2cbJyxM=" alt="">
    </div>
</template>

<script>

    export default{

    }
</script>

<style>

div.input{
    margin-top: 10px;
    background-color: orange;
    width: 90%;
    height: 50px;
    margin-left: 5%;
    border-radius: 10px;
}

div.input:last-child{
    margin-top: 10px;
    background-color: orange;
    width: 90%;
    height: 150px;
    margin-left: 5%;
    border-radius: 10px;
}

label, input {
    margin-top: 15px;
}

img {
    width: 100px;
    height: 100px;
}

</style>