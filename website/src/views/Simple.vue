<template>
  <div class="example-2">
    <v-row justify="center">
      <v-dialog v-model="dialogDeposit" persistent max-width="750px">
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
                    #Order Id: <strong>{{ orderID }}</strong> <br />
                    #Merchant Id:
                    <strong
                      >0xc3f2f0deaf2a9e4d20aae37e8802b1efef589d1a9e45e89ce1a2e179516df071</strong
                    >
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
              :disabled="!isValidAmount"
              @click="onDeposit"
            >
              Deposit
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogQrCode" persistent max-width="750px">
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
                    #Order Id: <strong>{{ orderID }}</strong> <br />
                    #Merchant Id:
                    <strong
                      >0xc3f2f0deaf2a9e4d20aae37e8802b1efef589d1a9e45e89ce1a2e179516df071</strong
                    >
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

                <div v-if="isLoading" class="progress text-center">
                  <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
                </div>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogQrCode = false"> Close </v-btn>

            <v-btn
              style="background: #1976d2; color: #fff; margin-left: 10px"
              :disabled="!isValidAmount"
              @click="generateQRCode"
            >
              Show QR
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
    isLoading: false,
  }),
  computed: {
    isValidAmount() {
      const amount = parseFloat(this.amount);
      return amount > 0;
    },
  },
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
      this.order_status = "";
      this.transaction_hash = "";
    },

    onDeposit: function () {
      Payment.deposit(parseFloat(this.amount), this.orderID, 97, (res) => {
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
.progress {
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>