<template>
  <div id="app">
    <div class="wrapper">
      <div class="list">
        <v-card
          v-for="(item, index) in items"
          :key="item.name + '_' + index"
          class="mx-auto my-12 item"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0" style="margin-left: 0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">4.5 (413)</div>
            </v-row>

            <div
              class="my-4 text-subtitle-1"
              style="
                margin-top: 15px;
                font-size: 19px;
                text-transform: uppercase;
              "
            >
              $ {{ item.amount }} • {{ item.token }}
            </div>

            <div>
              Small plates, salads & sandwiches - an intimate setting with 12
              indoor seats plus patio seating.
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" @click="() => deposit(item)">
              Buy
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <div class="status" v-if="order_status !== ''">
        <p v-if="order_status !== ''">Order Status: {{ order_status }}</p>
        <p v-if="transaction_hash !== ''">
          TransactionHash:
          <a
            :href="'https://testnet.bscscan.com/tx/' + transaction_hash"
            target="_blank"
          >
            {{ transaction_hash }}
          </a>
        </p>
      </div>

      <div class="errors" v-if="errors !== null">Error: {{ errors }}</div>
    </div>
  </div>
</template>

<script>
import Payment from "t-chain-payment";
export default {
  name: "App",
  data() {
    return {
      items: [
        { name: "Item 111", amount: 2, token: "busd" },
        { name: "Item 222", amount: 3, token: "usdt" },
        { name: "Item 333", amount: 5, token: "busd" },
      ],
      transaction_hash: "",
      order_status: "",
      errors: null,
    };
  },
  components: {},
  methods: {
    deposit: function (item = {}) {
      Payment.deposit(item.token, item.amount, false)
        .then((result) => {
          this.order_status = "pending";
          this.transaction_hash = result.hash;
          console.log(result);
        })
        .catch((err) => {
          this.errors = err.message;
        });
    },
  },
  created() {
    Payment.init(
      "0xc3f2f0deaf2a9e4d20aae37e8802b1efef589d1a9e45e89ce1a2e179516df071"
    );
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.wrapper {
  margin: 0 auto;
}
.list {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 30px;
  padding: 50px;
}

.list .item {
  width: 100%;
}
.status {
  padding: 25px;
}
.errors {
  padding: 25px;
  color: red;
}
</style>
