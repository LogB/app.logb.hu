<i18n>
{
  "en":{
    "step": "Step",
    "addValues": "Add values",
    "inputs" : "Inputs",
    "addValues": "Measured values",
    "continue": "continue",
    "outputs": "Outputs, and other settings",
    "code": "Code",
    "doesNotWait": "Does not wait",
    "perSec": "second|seconds",
    "sec": "second|seconds",
    "based": "based",
    "addTime": "Add time",
    "SSID": "Name (SSID)",
    "password": "Password",
    "device": "Device",
    "toComma": "Change decimal point to comma (for the convenient import into hungarian excel for example)",
    "timeInterval": "Interval between measures",
    "mustAddTime": "You must select a time providing input if you want to use other outputs than Serial.",
    "noSelectedValues": "You have not selected any values in the previous step.",
    "step1_1": "Every good project starts with a good plan.",
    "step1_2": "If you have a plan, great! You can start making your LogB config.",
    "step1_3": "Which board family do you want to build on?",
    "step1_4": "First, what do you want to measure?",
    "step1_5": "Choose the values you want to measure",
    "step2_1": "LogB connects to the world through inputs. All the incoming information, (like a value from a sensor, or the time) is from inputs.",
    "step3_1": "In this step, you have to choose where do you want to output your measurements.",
    "step3_2": "Here, you can reorder the values, this order will be used at output.",
    "step4_1": "Here is the Arduinio code:"
    },
  "hu":{
    "step": "Lépés",
    "addValues": "Értékek megadása",
    "inputs" : "Bememetek",
    "addValues": "Mért értékek",
    "continue": "folytatás",
    "outputs": "Kimenetek, és egyéb beállítások",
    "code": "Kód",
    "doesNotWait": "azaz nem várakozik",
    "perSec": "másodpercenként",
    "sec": "másodperc",
    "based": "alapú",
    "addTime": "Idő hozzáadása",
    "SSID": "Név (SSID)",
    "password": "Jelszó",
    "device": "Eszköz",
    "toComma": "Tizedes pont cseréje vesszőre (a magyar régióra állított Excel-ben való kényelmes feldolgozás érdekében például)",
    "timeInterval": "Mérési időköz",
    "mustAddTime": "Szükséges időt nyújtó bemenetet választani, ha nem csak a Serial kimenetre van szükség.",
    "noSelectedValues": "Egy érték sem lett kiválasztva az előző lépésben.",
    "step1_1": "Minden jó projekt egy jó tervvel kezdődik.",
    "step1_2": "Van már terved? Szuper! Elkezdheted a LogB konfigurálását.",
    "step1_3": "Melyik alaplapcsaládra szeretnél építeni?",
    "step1_4": "1. Mit szeretnél mérni?",
    "step1_5": "Válaszd ki a mérendő értékeket.",
    "step2_1": "A LogB a külvilágból bemeneteken keresztül kapja meg az adatokat. Minden külső információt (például egy szenzor értékét, vagy az időt) bemeneteken keresztül érkezik a rendszerbe.",
    "step3_1": "Ebben a lépésben kell megadni hogy hova legyenek mentve/küldve/megjelenítve az adatok.",
    "step3_2": "Az itt beállítható sorrendet fogják felhasználni a kimenetek.",
    "step4_1": "Arduino kód:"
    }
}
</i18n>
<template>
  <v-layout
    column
    wrap
  >
    <v-expansion-panel
      v-model="openTab"
      expand
    >
      <v-expansion-panel-content>
        <template v-slot:header>
          <h3>{{ $t('addValues') }}</h3>
        </template>
        <v-card class="pa-3">
          <v-divider />
          <p class="mt-2">
            {{ $t('step1_1') }}
            <br>
            {{ $t('step1_2') }}
          </p>
          <h3>{{ $t('step1_3') }}</h3>
          <v-radio-group v-model="boardChoice">
            <v-radio
              color="primary"
              :label="'AVR (Arduino Uno, Mini, Nano, Mega...) ' + $t('based')"
              value="AVR"
            />
            <v-radio
              color="primary"
              :label="'ESP8266 ' + $t('based')"
              value="ESP"
            />
          </v-radio-group>
          <h3>{{ $t('step1_4') }}</h3>
          <p>{{ $t('step1_5') }}</p>
          <v-select
            v-model="selectedValues"
            :items="valueList"
            chips
            :label="$t('addValues')"
            multiple
            outline
          />
          <v-btn
            class="mt-5"
            color="primary"
            @click="openTab = 1"
          >
            {{ $t('continue') }}
          </v-btn>
        </v-card>
        <v-divider />
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <template v-slot:header>
          <h3>2. {{ $t('inputs') }}</h3>
        </template>
        <v-card class="pa-3">
          <v-divider />
          <p class="mt-2">
            {{ $t('step2_1') }}
          </p>
          <v-alert
            v-if="selectedValues.length==0"
            type="warning"
            value="true"
          >
            {{ $t('noSelectedValues') }}
          </v-alert>
          <v-select
            v-model="selectedInputs"
            :items="sensorsAndValues"
            chips
            deletable-chips
            :label="$t('inputs')"
            multiple
            outline
          />
          <v-btn
            class="mt-5"
            color="primary"
            @click="openTab = 2"
          >
            {{ $t('continue') }}
          </v-btn>
        </v-card>
        <v-divider />
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <template v-slot:header>
          <h3>3. {{ $t('outputs') }}</h3>
        </template>
        <v-card class="pa-3">
          <v-divider />
          <p class="mt-2">
            {{ $t('step3_1') }}
          </p>
          <v-alert
            type="warning"
            :value="addTimeAlert"
          >
            {{ $t('mustAddTime') }}
            <v-btn
              outline
              @click="addTime()"
            >
              {{ $t('addTime') }}
            </v-btn>
          </v-alert>
          <v-select
            v-model="selectedOutputs"
            :items="outputs"
            chips
            deletable-chips
            :label="$t('outputs')"
            multiple
            outline
          />
          <v-text-field
            v-model="timeInterval"
            mask="#########"
            outline
            :label="$t('timeInterval') + ' (ms)'"
            persistent-hint
            :hint="timeIntervalHint"
          />
          <template v-if="selectedOutputs.includes('c')">
            <v-text-field
              v-model="cloud.wifiSSID"
              :label="'WIFI ' + $t('SSID')"
              outline
            />
            <v-text-field
              v-model="cloud.wifiPassword"
              :label="'WIFI ' + $t('password')"
              outline
            />
            <v-text-field
              v-model="cloud.deviceID"
              :label="$t('device') + ' ID'"
              outline
            />
            <v-text-field
              v-model="cloud.pin"
              label="PIN"
              outline
            />
          </template>
          <v-switch
            v-model="toComma"
            :label="$t('toComma')"
          />
          <br>
          <h3 class="mt-4">
            {{ $t('step3_2') }}
          </h3>
          <slick-list
            v-model="selectedInputs"
            lock-axis="y"
          >
            <v-card class="pa-2 select_none elevation-3">
              <slick-item
                v-for="(item, index) in selectedInputs"
                :key="index"
                :index="index"
              >
                <v-card
                  class="pa-3 my-2 elevation-2 title"
                >
                  {{ index+1 }}. {{ item.split("_")[0] + " - " + $t("values." + item.split("_")[1]) }}
                </v-card>
              </slick-item>
            </v-card>
          </slick-list>
          <v-btn
            class="mt-5"
            color="primary"
            @click="openTab = 3"
          >
            {{ $t('continue') }}
          </v-btn>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <template v-slot:header>
          <h3>4. {{ $t('code') }}</h3>
        </template>
        <v-card class="pa-3">
          <v-divider />
          <h3 class="mt-2">
            {{ $t('step4_1') }}
          </h3>
          <!-- <v-btn>{{$t('clickToCopy')}}</v-btn> -->
          <v-card>
            <v-card-text>
              <pre class="select_all">#include "logb.h"
Settings set;<span
v-for="i in usedSensors"
:key="i+'1'"
>{{ codePreSetup(i) }}</span>
void setup() {<span v-if="selectedOutputs.includes('a')">Serial.begin(115200);</span><span
  v-if="selectedOutputs.includes('b')"
>Serial.begin(115200);</span><span
  v-if="selectedOutputs.includes('c')"
>
set.device_id="{{ cloud.deviceID }}";
set.pin="{{ cloud.pin }}";
WiFi.begin("{{ cloud.wifiSSID }}", "{{ cloud.wifiPassword }}");
while (WiFi.status() != WL_CONNECTED) {delay(100);}</span><span
  v-for="i in usedSensors"
  :key="i+'2'"
>{{ codeBegin(i) }}</span>
{{ codeOutputs }}
set.timeInterval={{ timeInterval }};<template v-if="toComma"><br>set.toComma=true;</template>
}
void loop() {
set.currentMillis = millis();
if (set.currentMillis - set.previousMillis >= set.timeInterval) {
set.previousMillis = set.currentMillis;
<span
  v-for="i in selectedInputs"
  :key="i+'3'"
>AddData("{{ i }}","{{ $t('values.'+[i.split("_")[1]]) }}", {{ getValue(i.split("_")[0], i.split("_")[1]) }});
</span>Send();
}
}
</pre>
            </v-card-text>
          </v-card>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>
<script>
import { SlickList, SlickItem } from "vue-slicksort";
import stdInputs from "../assets/inputs.json";

export default {
  components: {
    SlickList,
    SlickItem
  },
  standardInputs: null,
  data() {
    return {
      openTab: [0, 0, 1, 0],
      selectedValues: [],
      selectedInputs: [],
      selectedOutputs: [],
      timeInterval: 0,
      boardChoice: "AVR",
      toComma: false,
      cloud: {
        wifiSSID: "",
        wifiPassword: "",
        deviceID: "",
        pin: ""
      }
    };
  },
  computed: {
    outputs() {
      let out = [{ text: "Serial", value: "a" }, { text: "SD", value: "b" }];
      if (this.boardChoice == "ESP")
        out.push({ text: "LogB Cloud", value: "c" });
      return out;
    },
    valueList() {
      let notUnique = [];
      let text = "";
      let out = [];
      for (let sensor in stdInputs) {
        for (let value in stdInputs[sensor].code.values) {
          notUnique.push(value);
        }
      }
      const unique = [...new Set(notUnique)];
      unique.sort();
      unique.forEach(value => {
        text = this.$t("values." + value);
        out.push({ text, value });
      });
      return out;
    },
    sensorsAndValues() {
      let push = [];
      let value = "";
      let text = "";
      for (let sensor in stdInputs) {
        for (let getValue in stdInputs[sensor].code.values) {
          if (!this.selectedValues.includes(getValue)) continue;
          text = sensor + " - " + this.$t("values." + getValue);
          value = sensor + "_" + getValue;
          push.push({ text, value });
        }
      }
      return push;
    },
    addTimeAlert() {
      if (
        this.selectedOutputs.length > 0 &&
        !this.outputtingValues.includes("TIME") &&
        this.selectedOutputs != "a"
      )
        return true;
      return false;
    },
    eligibleSensors() {
      let out = [];
      for (let sensor in stdInputs) {
        for (let getValue in stdInputs[sensor].code.values) {
          if (!this.selectedValues.includes(getValue)) continue;
          out.push(sensor);
        }
      }
      const unique = [...new Set(out)];
      return unique;
    },
    usedSensors() {
      let out = [];
      this.selectedInputs.forEach(e => {
        out.push(e.split("_")[0]);
      });
      const unique = [...new Set(out)];
      return unique;
    },
    codeOutputs() {
      let out = 'set.where="';
      this.selectedOutputs.forEach(e => {
        out += e;
      });
      return (out += '";');
    },
    outputtingValues() {
      let out = [];
      this.selectedInputs.forEach(e => {
        out.push(e.split("_")[1]);
      });
      const unique = [...new Set(out)];
      return unique;
    },
    timeIntervalHint() {
      let text = "";
      text += "= ";
      text += this.timeInterval / 1000;
      text += " ";
      text += this.$tc("sec", this.timeInterval / 1000);
      text += " ";
      if (this.timeInterval == 0) text += this.$t("doesNotWait");
      return text;
    }
  },
  methods: {
    codePreSetup(sensor) {
      let code = "";
      code = "\n#include " + stdInputs[sensor].code.include;
      if (stdInputs[sensor].code.preSetup != "") {
        code += "\n" + stdInputs[sensor].code.preSetup;
      }
      return code;
    },
    codeBegin(sensor) {
      return "\n" + stdInputs[sensor].code.setup.begin + ".begin();";
    },
    getValue(sensor, value) {
      let out = stdInputs[sensor].code.values[value].getValue;
      if (value == "TIME") out = "Time(" + out + ")";
      else out = "String(" + out + ")";
      return out;
    },
    addTime() {
      if (
        !this.outputtingValues.includes("TIME") &&
        !this.selectedValues.includes("TIME")
      ) {
        this.selectedValues.push("TIME");
      }
      this.openTab = 1;
    }
  }
};
</script>

