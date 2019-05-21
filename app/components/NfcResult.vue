<template>
<Page @loaded="log">
    <StackLayout>
      <Label class="result" :text="result" textWrap="true" />
    </StackLayout> 
</Page>
</template>

<script>
export default {
props:['result'],
methods:{
    log(){
     console.log(this.$props.result)
    }
}

}
</script>

<style>
.result {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
