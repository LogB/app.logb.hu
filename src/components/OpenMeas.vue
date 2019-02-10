<template>
  <v-container fill-height>
    <v-dialog
      v-model="qrReader"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-flex>
          <v-card-title class="headline lighten-2">
            {{ $t("open.scanQr") }}
            <v-spacer></v-spacer>
            <v-btn icon @click="qrReader = false">
              <v-icon medium>close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-container>
            <v-alert
              v-model="errorOccured"
              transition="slide-y-transition"
              outlined
              dismissible
              type="error"
              class="elevation-5"
              >{{ errorText }}</v-alert
            >
          </v-container>
          <v-progress-circular
            v-if="qrLoading"
            indeterminate
          ></v-progress-circular>
          <v-responsive>
            <qrcode-stream
              v-if="qrReader"
              @init="onInit"
              @decode="onDecode"
            ></qrcode-stream>
          </v-responsive>
        </v-flex>
      </v-card>
    </v-dialog>
    <v-flex>
      <v-text-field
        v-model="id"
        mask="AAA-###"
        maxlength="6"
        counter
        class="headline text-capitalize"
        :label="$t('measurement_id')"
        @keydown.enter="$router.push('/view/' + id.toLowerCase())"
      ></v-text-field>
      <v-btn outline color="primary" @click="go()">
        <v-icon>launch</v-icon>
        &nbsp;{{ $t("viewMeas") }}
      </v-btn>
      <v-btn outline @click="qrReader = true">
        <v-icon>code</v-icon>
        &nbsp;{{ $t("open.scanQr") }}
      </v-btn>
    </v-flex>
  </v-container>
</template>
<script>
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  components: { QrcodeStream },
  data() {
    return {
      id: null,
      qrReader: null,
      qrLoading: null,
      errorOccured: null,
      errorText: null
    };
  },
  methods: {
    onDecode(decodedString) {
      this.id = decodedString.slice(-6);
      this.qrReader = false;
      this.go();
    },
    go() {
      this.$router.push("/view/" + this.id.toLowerCase());
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
