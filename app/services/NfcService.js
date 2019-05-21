import { isIOS } from "tns-core-modules/platform";
import { Nfc, NfcTagData, NfcNdefData } from "nativescript-nfc";


export default {
    doCheckAvailable() {
        let nfc = new Nfc();
        nfc.available().then(avail => {
          console.log(avail ? "Yes" : "No");
        });
      },
      doCheckEnabled() {
        let nfc = new Nfc();
        nfc.enabled().then(on => {
          console.log(on ? "Yes" : "No");
        });
      },
      doStartNdefListener() {
        let nfc = new Nfc();
        nfc
          .setOnNdefDiscoveredListener(data => {
            if (data.message) {
              // data.message is an array of records, so:
              for (let m in data.message) {
                let record = data.message[m];
                console.log(
                  "Ndef discovered! Message record: " + record.payloadAsString
                );
              }
              this.$navigateTo(this.$routes["nfcResult"], {
                props: data.message
              });
            }
          })
          .then(function() {
            console.log("OnNdefDiscovered listener added");
          });
      },
      doStopNdefListener() {
        let nfc = new Nfc();
        nfc.setOnNdefDiscoveredListener(null).then(
          () => {
            console.log("listener stopped");
          },
          err => {
            alert(err);
          }
        );
      }
}