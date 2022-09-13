<template>
  <div id="Example1">
    <div class="checkout">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Checkout [
            <span style="color: red">{{ Object.keys(cart.items).length }}</span>
            ] items
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Cart</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list>
            <v-list-item v-for="item in cart.items" :key="item.id">
              <v-list-item-content>
                <div>
                  <img
                    height="60"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  />
                </div>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  Price : {{ item.amount }} USD
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-btn @click="removeItem(item)">Remove</v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <div>TOTAL</div>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title></v-list-item-title>
                <v-list-item-subtitle>
                  {{ cart.total }} USD
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn @click="checkout"> Checkout </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </div>
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
              $ {{ item.amount }} •
            </div>

            <div>
              Small plates, salads & sandwiches - an intimate setting with 12
              indoor seats plus patio seating.
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" @click="() => addToCart(item)">
              Add to cart
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
  name: "Example1",
  data() {
    return {
      items: [
        { id: 11, name: "Item 111", amount: 4 },
        { id: 22, name: "Item 222", amount: 5 },
        { id: 33, name: "Item 333", amount: 6 },

        { id: 44, name: "Item 444", amount: 7 },
        { id: 55, name: "Item 555", amount: 8 },
        { id: 66, name: "Item 666", amount: 9 },
      ],
      cart: {
        items: {},
        total: 0,
      },
      transaction_hash: "",
      order_status: "",
      errors: null,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  components: {},
  methods: {
    addToCart: function (item = {}) {
      if (this.cart.items[item.id] !== undefined) {
        return;
      }
      this.cart.items[item.id] = item;
      this.cart.total += item.amount;
      alert("add to cart successfully.");
    },
    removeItem: function (item = {}) {
      if (this.cart.items[item.id] !== undefined) {
        delete this.cart.items[item.id];
        this.cart.total -= item.amount;
      }
    },
    checkout: function () {
      if (this.cart.total <= 0 || Object.keys(this.cart.items).length === 0) {
        alert("Cart is empty.");
        this.dialog = false;
        return;
      }

      let orderID = `${Object.keys(this.cart.items).join("-")}-${Date.now()}`;
      Payment.deposit(this.cart.total, orderID, (res) => {
        this.order_status = "pending";
        this.transaction_hash = res.hash;
      });
    },
  },
  created() {
    // init merchant id
    Payment.init(
      "0xc3f2f0deaf2a9e4d20aae37e8802b1efef589d1a9e45e89ce1a2e179516df071"
    );
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  margin: 0 auto;
}
.list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
.checkout {
  margin-top: 20px;
  text-align: right;
  margin-right: 20px;
}
.v-dialog__container {
  display: block;
}
.v-dialog .v-card {
  min-width: 60%;
  width: 60%;
  right: 0;
  float: right;
  text-align: left;
}
</style>
