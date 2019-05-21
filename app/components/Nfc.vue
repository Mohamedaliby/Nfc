<template>
    <page>
         <ScrollView>
            <StackLayout>

            <Image margin="0" src="~/assets/images/nfc.png" width="60%" horizontalAlignment="center" />

            <StackLayout orientation="horizontal" width="100%">
                <Button text="NFC available?" @tap="doCheckAvailable" class="button button-a" width="60%" />
                <Button text="NFC enabled?" @tap="doCheckEnabled" class="button button-a" width="60%" />
            </StackLayout>

            <StackLayout orientation="horizontal" width="100%">
                <Button text="set ndef listener" @tap="doStartNdefListener" class="button" width="60%"/>
                <Button text="clear ndef listener" @tap="doStopNdefListener" class="button" width="60%"/>
            </StackLayout>

            <Label :text="lastNdefDiscovered" class="message message-ndef" textWrap="true" />

            </StackLayout>
        </ScrollView>
    </page>
</template>

<script>
import { Nfc, NfcTagData, NfcNdefData } from "nativescript-nfc";

export default {
  data() {
    return {
      lastNdefDiscovered: null,
      result: null
    };
  },
  methods: {
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
        .setOnNdefDiscoveredListener((data) => {
          if (data.message) {
            // data.message is an array of records, so:
            for (let m in data.message) {
              let record = data.message[m];
              console.log(
                "Ndef discovered! Message record: " + record.payloadAsString
              );
              this.result = record.payloadAsString;
            }
            this.doStopNdefListener()
            this.$navigateTo(this.$routes["nfcResult"], {
            props: {
              result: this.result
            }
            });
          }
        })
        .then(() => {
          this.doStopNdefListener()
          console.log("OnNdefDiscovered listener added");
          this.$navigateTo(this.$routes["nfcResult"], {
            props: {
              result: this.result
            }
          });
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
    // doStartTagListener() {},
    // doStopTagListener() {},
    // doWriteText() {},
    // doWriteUri() {},
    // doEraseTag() {}
  }
};
</script>

<style>

</style>
