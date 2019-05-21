import { isIOS } from "tns-core-modules/platform";
import { BarcodeScanner } from "nativescript-barcodescanner";


export default {
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