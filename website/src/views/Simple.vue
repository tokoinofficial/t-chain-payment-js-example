<template>
  <div class="example-2">
    <v-row justify="center">
      <v-dialog v-model="dialogDeposit" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            @click="openDepositDialog"
          >
            App to App
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Deposit</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <p>
                    #Order Id: <strong>{{ orderID }}</strong>
                  </p>
                  <v-text-field
                    v-model="amount"
                    label="Amount*"
                    v-on:change="onChangeAmount"
                    required
                  ></v-text-field>
                  <div v-if="transaction_hash !== '' && order_status !== ''">
                    <p>
                      Order Status: <strong>{{ order_status }}</strong>
                    </p>
                    <p>
                      TnxHash:
                      <a
                        :href="
                          'https://testnet.bscscan.com/tx/' + transaction_hash
                        "
                        target="_blank"
                      >
                        <strong>{{ transaction_hash }}</strong>
                      </a>
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogDeposit = false"> Close </v-btn>

            <v-btn
              style="background: #1976d2; color: #fff; margin-left: 10px"
              :disabled="isNaN(parseFloat(amount)) || parseFloat(amount) <= 0"
              @click="onDeposit"
            >
              Deposit
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogQrCode" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            style="margin-left: 20px"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            @click="openPosQRCodeDialog"
          >
            POS QR
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">POS QR</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <p>
                    #Order Id: <strong>{{ orderID }}</strong>
                  </p>
                  <v-text-field
                    v-model="amount"
                    label="Amount*"
                    required
                    v-on:change="onChangeAmount"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  v-if="
                    qrCode !== '' && qrCode !== undefined && qrCode !== null
                  "
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

            <v-btn
              style="background: #1976d2; color: #fff; margin-left: 10px"
              @click="generateQRCode"
            >
              Show QR dialog
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import Payment from "t-chain-payment";
export default {
  data: () => ({
    amount: 0,
    orderID: "",
    dialogDeposit: false,
    dialogQrCode: false,
    order_status: "",
    transaction_hash: "",
    qrCode: "",
  }),

  methods: {
    openDepositDialog() {
      this.dialogDeposit = true;
      this.orderID = `Deposit-${Date.now()}`;
    },
    openPosQRCodeDialog() {
      this.dialogQrCode = true;
      this.orderID = `PosQR-${Date.now()}`;
    },
    onChangeAmount: function () {
      this.qrCode = "";
    },

    onDeposit: function () {
      Payment.deposit(parseFloat(this.amount), this.orderID, (res) => {
        this.order_status = "pending";
        this.transaction_hash = res.hash;
      });
    },
    generateQRCode: function () {
      Payment.generateQrCode(this.amount, this.orderID).then((res) => {
        this.qrCode = res;
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

<style scoped lang="scss">
.example-2 {
  display: flex;
  align-content: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
}
.row {
  width: 100%;
  align-content: center;
  justify-content: center;
}
.v-dialog .v-card {
  width: 100%;
}
</style>