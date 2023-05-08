<template>
  <div id="Example1">
    <div class="checkout">
      <v-dialog
        v-model="dialog"
        persistent
        fullscreen
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="orange"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Checkout [
            <span style="color: red">{{ Object.keys(cart.items).length }}</span>
            ] items
          </v-btn>
        </template>
        <v-card style="width: 60%">
          <v-toolbar
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Cart</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list>
            <v-list-item
              v-for="item in cart.items"
              :key="item.id"
            >
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
                <v-list-item-subtitle> Price : {{ item.amount }} {{ currency }} </v-list-item-subtitle>
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
                <v-list-item-subtitle> {{ cart.total }} {{ currency }} </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <div>
                  #Order Id: <strong>{{ order_id }}</strong> <br />
                  #Total amount: <strong>{{ cart.total }}</strong>
                  {{ currency }}
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn
                  @click="checkout"
                  color="primary"
                >
                  Pay with T-Chain SDK</v-btn
                >
              </v-list-item-content>
              <v-list-item-content>
                <v-dialog
                  v-model="dialogQrCode"
                  persistent
                  max-width="400px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      style="margin-left: 20px"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="openDialogQrCode"
                    >
                      Pay With MY-T WALLET
                    </v-btn>
                  </template>
                  <v-card style="min-width: 400px; width: 400px">
                    <v-card-title style="justify-content: center">
                      <span class="text-h5">Use MyT-Wallet to scan QR Code</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            v-if="qrCode !== '' && qrCode !== undefined && qrCode !== null"
                            style="text-align: center"
                          >
                            <img :src="qrCode" />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="dialogQrCode = false"> Close </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </div>
    <div
      class="status"
      v-if="order_status !== ''"
    >
      <p v-if="order_status !== ''">Order Status: {{ order_status }}</p>
      <p v-if="transaction_hash !== ''">
        TransactionHash:
        <a
          :href="`https://${isSandboxed ? 'testnet.' : ''}bscscan.com/tx/${transaction_hash}`"
          target="_blank"
        >
          {{ transaction_hash }}
        </a>
      </p>
    </div>

    <div
      class="errors"
      v-if="errors !== null"
    >
      Error: {{ errors }}
    </div>
    <div class="wrapper">
      <v-row style="padding: 0 50px">
        <v-col cols="3">
          <v-select
            :items="currencies"
            v-model="currency"
            label="Currency"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-switch
            v-model="isSandboxed"
            label="Toggle Sandbox Mode"
          />
        </v-col>
      </v-row>
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
            <v-row
              align="center"
              class="mx-0"
              style="margin-left: 0"
            >
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
              style="margin-top: 15px; font-size: 19px; text-transform: uppercase"
            >
              {{ currency }} {{ item.amount }} •
            </div>

            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2 primary"
              @click="() => addToCart(item)"
            >
              Add to cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Payment from '@tokoinofficial/t-chain-payment'
export default {
  name: 'Example1',
  data() {
    return {
      items: [
        { id: 11, name: 'Item 111', amount: 0.1 },
        { id: 22, name: 'Item 222', amount: 0.15 },
        { id: 33, name: 'Item 333', amount: 0.2 },

        { id: 44, name: 'Item 444', amount: 0.25 },
        { id: 55, name: 'Item 555', amount: 0.3 },
        { id: 66, name: 'Item 666', amount: 0.35 },
      ],
      cart: {
        items: {},
        total: 0,
      },
      order_id: '',
      transaction_hash: '',
      order_status: '',
      errors: null,
      dialog: false,
      dialogQrCode: false,
      qrCode: '',
      currency: 'USD',
      currencies: ['USD', 'IDR'],
      isSandboxed: true,
    }
  },
  watch: {
    isSandboxed(toggleState) {
      Payment.init({
        api_key: toggleState ? '3e093592-3e0e-4a52-9601-ead49f794586' : 'public_api_key-a8a27441-8e20-4154-a0f7-004d6e38e633',
        mode: toggleState ? 'sandbox' : 'production',
      })
    },
  },
  components: {},
  computed: {
    isValidAmount() {
      const amount = parseFloat(this.cart.total)
      return amount > 0
    },
  },
  methods: {
    addToCart: function (item = {}) {
      if (this.cart.items[item.id] !== undefined) {
        return
      }
      this.cart.items[item.id] = item
      this.cart.total += item.amount
      this.order_id = `${Object.keys(this.cart.items).join('-')}-${Date.now()}`
      alert('Add to cart successfully.')
    },
    openDialogQrCode: function () {
      this.dialogQrCode = true
      this.generateQRCode()
    },
    removeItem: function (item = {}) {
      if (this.cart.items[item.id] !== undefined) {
        delete this.cart.items[item.id]
        this.cart.total -= item.amount
      }
    },
    checkout: function () {
      if (this.cart.total <= 0 || Object.keys(this.cart.items).length === 0) {
        alert('Cart is empty.')
        this.dialog = false
        return
      }
      this.qrCode = ''

      const params = {
        amount: parseFloat(this.cart.total),
        notes: this.order_id,
        currency: this.currency,
      }
      Payment.deposit(params, (res) => {
        this.dialog = false
        this.order_status = 'pending'
        this.transaction_hash = res.hash
        this.cart = {
          items: {},
          total: 0,
        }
      })
    },
    generateQRCode: function () {
      const params = {
        amount: parseFloat(this.cart.total),
        notes: this.order_id,
        currency: this.currency,
      }
      Payment.generateQrCode(params).then((res) => {
        this.qrCode = res
      })
    },
  },
  created() {
    // init merchant id
    Payment.init({
      api_key: this.isSandboxed ? '3e093592-3e0e-4a52-9601-ead49f794586' : 'public_api_key-a8a27441-8e20-4154-a0f7-004d6e38e633',
      mode: this.isSandboxed ? 'sandbox' : 'production',
    })
  },
}
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
  padding-top: 0;
  margin-top: -60px;
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
  right: 0;
  float: right;
  text-align: left;
}
</style>
