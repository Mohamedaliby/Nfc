<template>
          <StackLayout>
            <Button  text="barscanner" @tap="changeRoute('barcodeScannerPage')"/>
            <Button text="nfc" @tap="changeRoute('nfc')"/>
          </StackLayout>
</template>

<script>
export default { 
methods:{
    changeRoute(to) {
      this.$navigateTo(this.$routes[to], {
      });
    },
}
}
</script>

<style>

</style>
