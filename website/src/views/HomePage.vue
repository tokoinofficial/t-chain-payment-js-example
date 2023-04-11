<template>
  <v-row style="margin-top: 20px">
    <v-card class="mx-auto" width="400">
      <v-list subheader three-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/simple">Simple Example</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/cart-checkout-example">Cart Checkout Example</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-row>
</template>