<template>
    <Page>
       <ActionBar  title="Barcode and nfc"/>
        <StackLayout>
                    <home/>
        </StackLayout>
    </Page>
</template>

<script >
import Home from "./Home";
export default {
  components: { Home },
  data() {
    return {
      msg: "Hello World!"
    };
  }
};
</script>

<style scoped>
actionbar {
  background-color: #53ba82;
  color: #ffffff;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
