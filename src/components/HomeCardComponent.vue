<template>
  <v-card shaped width="100%" class="py-2">
    <v-card-title>
      <v-icon class="ma-2">{{ cardIcon }}</v-icon> {{ cardTitle }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div class="font-weight-bold">Feature:</div>
      <div class="pa-2">
        <p class="my-n1 pb-1" v-for="(content, i) in cardBody" :key="i"> - {{ content }}</p>
      </div>
      <div class="font-weight-bold">Log In as:</div>
    </v-card-text>
    <v-card-actions v-resize="checkScrSize" class="flex-md-row flex-column">
      <v-btn outlined 
        rounded 
        color="primary" 
        :width="btnWidth" 
        :class="btnClass" 
        v-for="(btnItem, i) in btnObj" 
        :key="i"
        :to="btnItem.url"
      >{{ btnItem.label }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'HomeCardComponent',
    data: () => ({
      screenwidth: 0,
    }),
    props: {
      btnObj: new Object(),
      cardTitle: String,
      cardIcon: String,
      cardBody: [],
    },
    methods: {
      checkScrSize() {
        this.screenwidth = window.innerWidth
      }
    },
    computed: {
      linkNum() {
        return Object.keys(this.btnObj).length > 1
      },
      btnWidth() {
        return this.screenwidth < 1024 ? '100%' : ''
      },
      btnClass() {
        return Object.keys(this.btnObj).length > 1 ? 'flex-grow-1 mb-md-0 mb-2 mx-1' : 'flex-grow-1 mb-md-0 mb-2 mx-1'
      }
    }
  }
</script>