<template>
  <Page>
    <ActionBar title="BarcodeScanner demo"></ActionBar>
    <StackLayout v-show="done">
      <Label :text="result" textWrap="true" />
    </StackLayout>
    <GridLayout v-show="!done"  columns="*" rows="auto, auto, auto, auto">
      <Label  row="0" class="message" text="Check the console log for scanned barcodes" textWrap="true"></Label>

      <BarcodeScanner
          row="1"
          height="300"
          formats="QR_CODE, EAN_13, UPC_A"
          beepOnScan="true"
          reportDuplicates="true"
          preferFrontCamera="false"
          @scanResult="onScanResult"
          v-if="isIOS">
      </BarcodeScanner>

      <Button row="2"  text="back camera, with flip" @tap="doScanWithBackCamera"></Button>
      <Button row="3"  text="front camera, no flip" @tap="doScanWithFrontCamera"></Button>

    </GridLayout>
  </Page>
</template>

<script>
import { isIOS } from "tns-core-modules/platform";
import { BarcodeScanner } from "nativescript-barcodescanner";
export default {
  data() {
    return {
      isIOS,
      result: null,
      done: false
    };
  },
  methods: {
    onScanResult(evt) {
      this.$navigateTo(this.$routes["barcodeScannerResult"], {
        props: evt
      });
      console.log(`onScanResult: ${evt.text} (${evt.format})`);
    },
    doScanWithBackCamera() {
      this.scan(false);
    },
    doScanWithFrontCamera() {
      this.scan(true);
    },
    scan(front) {
      new BarcodeScanner()
        .scan({
          cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
          cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
          message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
          preferFrontCamera: front, // Android only, default false
          showFlipCameraButton: true, // default false
          showTorchButton: true, // iOS only, default false
          torchOn: false, // launch with the flashlight on (default false)
          resultDisplayDuration: 500, // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
          beepOnScan: true, // Play or Suppress beep on scan (default true)
          openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
          closeCallback: () => {
            console.log("Scanner closed @ " + new Date().getTime());
          }
        })
        .then(
          result => {
            this.result = result.text;
            console.log("--- scanned: " + result.text);
            console.log(" this.result " + this.result);
            this.$navigateTo(this.$routes["barcodeScannerResult"], {
              props: {
                result: result.text
              }
            });
            // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
            //   setTimeout(function () {
            //     // if this alert doesn't show up please upgrade to {N} 2.4.0+
            //     alert({
            //       title: "Scan result",
            //       message: "Format: " + result.format + ",\nValue: " + result.text,
            //       okButtonText: "OK"
            //     });
            //   }, 500);
          },
          function(errorMessage) {
            console.log("No scan. " + errorMessage);
          }
        );
    }
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