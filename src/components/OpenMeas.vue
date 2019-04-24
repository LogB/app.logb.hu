<template>
  <v-container fill-height>
    <v-dialog v-model="qrReader" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-flex>
          <v-card-title class="headline lighten-2">
            {{ $t("open.scanQr") }}
            <v-spacer/>
            <v-btn icon @click="qrReader = false">
              <v-icon medium>close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider/>
          <v-progress-circular v-if="qrLoading" indeterminate/>
          <v-responsive>
            <qrcode-stream v-if="qrReader" @init="onInit" @decode="onDecode"/>
          </v-responsive>
        </v-flex>
      </v-card>
    </v-dialog>
    <v-flex>
      <v-alert
        v-model="errorOccured"
        transition="slide-y-transition"
        outline
        dismissible
        type="error"
      >{{ errorText }}</v-alert>
      <v-alert
        v-model="badID"
        transition="slide-y-transition"
        outline
        dismissible
        type="error"
      >Biztos hogy jó a QR kódot olvastál be? ( {{badText}} ?)</v-alert>
      <v-layout column justify-center align-center>
        <v-btn class="mb-5" outline @click="qrReader = true">
          <v-icon>code</v-icon>
          &nbsp;{{ $t("open.scanQr") }}
        </v-btn>
        <v-text-field
          v-model="id"
          mask="AAA-###"
          maxlength="6"
          counter
          class="headline text-capitalize"
          :label="$t('measurement_id')"
          @keydown.enter="go()"
        />
        <v-btn outline color="primary" @click="go()">
          <v-icon>launch</v-icon>
          &nbsp;{{ $t("openMeas") }}
        </v-btn>
        <br>
        <h1 class="text-capitalize my-4">{{$t('or')}}</h1>
        <v-text-field v-model="did" :label="$t('device_id')"/>
        <v-btn outline color="primary" @click="getID()">
          <v-icon>launch</v-icon>
          &nbsp;{{ $t("openMeas") }}
        </v-btn>
      </v-layout>
    </v-flex>
  </v-container>
</template>
<script>
import { QrcodeStream } from "vue-qrcode-reader";
import api from "@/api";

export default {
  components: { QrcodeStream },
  data() {
    return {
      did: null,
      badID: null,
      id: null,
      qrReader: null,
      qrLoading: null,
      errorOccured: null,
      errorText: null,
      wantLive: false,
      badText: null
    };
  },
  mounted() {
    if (this.$route.params.id && this.$route.params.mode) {
      let out = this.$route.params.mode + "/" + this.$route.params.id;
      this.decodeID(out);
    }
  },
  methods: {
    decodeID(text) {
      if (text.includes("live")) this.wantLive = true;
      if (text.includes("M/")) {
        this.id = text.split("M/")[1].split("/")[0];
        this.qrReader = false;
        this.go();
      } else {
        if (text.includes("D/")) {
          this.did = text.split("D/")[1].split("/")[0];
          console.log(text.split("D/")[1].split("/")[0]);
          this.getID();
        } else {
          this.badID = true;
          this.badText = text;
        }
      }
    },
    getID() {
      api.getLastMeas(this.did).then(response => {
        if (response.data.error == 20) {
          this.id = response.data.id;
          this.qrReader = false;
          this.go();
        }
      });
    },
    onDecode(decodedString) {
      if (decodedString.includes("app.logb.hu/view")) {
        this.id = decodedString.split("app.logb.hu/view/").pop();
        this.go();
      } else {
        this.qrReader = false;
        this.decodeID(decodedString);
      }
    },

    go() {
      if (this.id == null) return;
      let out = "/view/" + this.id.toLowerCase();
      if (this.$route.params.live == "live" || this.wantLive) {
        out += "/live";
      }
      this.$router.push(out);
    },
    async onInit(promise) {
      this.qrLoading = true;

      try {
        await promise;

        // successfully initialized
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.errorText = this.$t("open.permDenied");
        } else if (error.name === "NotFoundError") {
          this.errorText = this.$t("open.camNotFound");
        } else if (error.name === "NotSupportedError") {
          this.errorText = this.$t("open.notOverHttps");
        } else if (error.name === "NotReadableError") {
          this.errorText = this.$t("open.isBusy");
        } else if (error.name === "OverconstrainedError") {
          this.errorText = this.$t("open.camNotFound");
        } else if (error.name === "StreamApiNotSupportedError") {
          this.errorText = this.$t("open.browserNotSupported");
        }
        this.errorOccured = true;
        this.qrReader = false;
      } finally {
        this.qrLoading = false;
      }
    }
  }
};
</script>
