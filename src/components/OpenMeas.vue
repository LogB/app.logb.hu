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
          <v-container>
            <v-alert
              v-model="errorOccured"
              transition="slide-y-transition"
              outline
              dismissible
              type="error"
            >{{ errorText }}</v-alert>
          </v-container>
          <v-progress-circular v-if="qrLoading" indeterminate/>
          <v-responsive>
            <qrcode-stream v-if="qrReader" @init="onInit" @decode="onDecode"/>
          </v-responsive>
        </v-flex>
      </v-card>
    </v-dialog>
    <v-flex>
      <v-alert
        v-model="badID"
        transition="slide-y-transition"
        outline
        dismissible
        type="error"
      >{{ $t('open.badID') }}</v-alert>
      <v-text-field
        v-model="id"
        mask="AAA-###"
        maxlength="6"
        counter
        class="headline text-capitalize"
        :label="$t('measurement_id')"
        @keydown.enter="$router.push('/view/' + id.toLowerCase())"
      />
      <v-btn outline color="primary" @click="go()">
        <v-icon>launch</v-icon>
        &nbsp;{{ $t("viewMeas") }}
      </v-btn>
      <v-btn outline @click="qrReader = true">
        <v-icon>code</v-icon>
        &nbsp;{{ $t("open.scanQr") }}
      </v-btn>
      <v-text-field
        v-model="did"
        class="headline text-capitalize"
        :label="$t('device_id')"
        @keydown.enter="$router.push('/view/' + id.toLowerCase())"
      />
      <v-btn outline color="primary" @click="deviceIDgo()">
        <v-icon>launch</v-icon>
        &nbsp;{{ $t("viewMeas") }}
      </v-btn>
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
      errorText: null
    };
  },
  mounted() {
    if (this.$route.params != null) {
      if (this.$route.params.id != null && this.$route.params.mode != null) {
        let mode = this.$route.params.mode;
        let id = this.$route.params.id;
        if (mode == "M") {
          this.id = id;
          this.go();
        } else {
          this.did = id;
          this.deviceIDgo();
        }
      }
    }
  },
  methods: {
    onDecode(decodedString) {
      if (decodedString.includes("http")) {
        this.id = decodedString.slice(-6);
        this.qrReader = false;
        this.go();
      } else {
        if (decodedString.includes("M/")) {
          this.id = decodedString.slice(-6);
          this.qrReader = false;
          this.go();
        } else {
          if (decodedString.substring(0, 2) == "D/") {
            this.did = decodedString.substring(2);
            this.deviceIDgo();
            this.qrReader = false;
          } else {
            this.badID = true;
          }
        }
      }
    },
    deviceIDgo() {
      api.getLastMeas(this.did).then(response => {
        if (response.data.error == 20) {
          this.id = response.data.id;
          this.go();
        }
      });
    },
    go() {
      let out = "/view/" + this.id.toLowerCase();
      if (this.$route.path.live == "live") out += "/live";
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
      } finally {
        this.qrLoading = false;
      }
    }
  }
};
</script>
