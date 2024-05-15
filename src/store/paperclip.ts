import { type PaperClipHistory, type PaperclipStore } from '@/lib/types';
import { defineStore } from 'pinia';

export const usePaperclipStore = defineStore('paperclip', {
  state: () => {
    return {
      wire: 1000,
      wireCost: 10.0,
      paperclip: 0,
      paperclipPrice: 0.25,
      paperclipHistory: [],
      autoClippers: 0,
      autoClipperCost: 5.0,
      funds: 0,
      unsoldInventory: 0,
      demand: 0.32,
    } as PaperclipStore;
  },

  getters: {
    clipsPerSecond: (state) => {
      // return 0 if there are less than 2 elements in the paperclipHistory array (since we need at least 2 elements to compute for the clips per second
      if (state.paperclipHistory.length < 2) return 0;

      // check the timestamp of the first and last element in the paperclipHistory array
      const first = state.paperclipHistory[0] as PaperClipHistory;
      const last = state.paperclipHistory[
        state.paperclipHistory.length - 1
      ] as PaperClipHistory;

      // compute for the time interval (in seconds)
      const timeInterval =
        (last.timestamp.getTime() - first.timestamp.getTime()) / 1000;

      if (timeInterval <= 0) {
        state.paperclipHistory = [];
        return 0;
      }

      // compute for the clips per second
      const cps = state.paperclipHistory.length / timeInterval;
      return cps.toFixed(2);
    },

    publicDemand: (state) => {
      return (state.demand * 100).toFixed(0) + '%';
    },
  },

  actions: {
    buyPaperclip: function (this: {
      paperclip: number;
      wire: number;
      unsoldInventory: number;
      paperclipHistory: {
        push(arg0: PaperClipHistory): unknown;
      };
    }) {
      if (this.wire > 0) {
        this.paperclip++;
        this.wire -= 1;
        this.unsoldInventory++;

        this.paperclipHistory.push({
          paperclip: this.paperclip,
          wire: this.wire,
          timestamp: new Date(),
        });
      }
    },

    sellPaperclip: function (this: {
      unsoldInventory: number;
      demand: number;
      funds: number;
      paperclipPrice: number;
    }) {
      // randomly sell paperclips based on the value of demand
      if (this.unsoldInventory <= 0) return;

      const random = Math.random();
      if (random < this.demand) {
        this.unsoldInventory--;
        this.funds += this.paperclipPrice;
      }
    },

    buyPaperclips: function (
      this: {
        paperclip: number;
        wire: number;
        unsoldInventory: number;
      },
      quantity: number,
    ) {
      // TODO: this should still be able to buy paperclips even if the wire is less than the quantity
      if (this.wire >= quantity) {
        this.paperclip += quantity;
        this.wire -= quantity;
        this.unsoldInventory += quantity;
      }
    },

    buyWire: function (this: {
      wire: number;
      funds: number;
      wireCost: number;
    }) {
      this.wire += 1000;
      this.funds -= this.wireCost;
    },

    buyAutoClippers: function (this: {
      autoClippers: number;
      autoClipperCost: number;
      funds: number;
    }) {
      this.autoClippers += 1;
      this.funds -= this.autoClipperCost;
      this.autoClipperCost = parseFloat(
        (this.autoClipperCost * 1.1).toFixed(2),
      );
    },

    increasePaperclipPrice: function (this: {
      paperclipPrice: number;
      demand: number;
    }) {
      const newPrice = parseFloat((this.paperclipPrice + 0.01).toFixed(2));
      this.paperclipPrice = newPrice;

      this.demand -= 0.01;
    },

    decreasePaperclipPrice: function (this: {
      paperclipPrice: number;
      demand: number;
    }) {
      const newPrice = parseFloat((this.paperclipPrice - 0.01).toFixed(2));
      this.paperclipPrice = newPrice;

      this.demand += 0.01;
    },

    flushPaperclipHistory: function (this: {
      paperclipHistory: PaperClipHistory[];
    }) {
      if (this.paperclipHistory.length === 0) return;

      // get the last timestamp in the paperclipHistory array
      const lastTimestamp =
        this.paperclipHistory[this.paperclipHistory.length - 1].timestamp;

      // check if the lastTimestamp is more than 5 seconds ago
      if (new Date().getTime() - lastTimestamp.getTime() > 5000) {
        this.paperclipHistory = [];
      }
    },

    randomizeWireCost: function (this: { wireCost: number }) {
      // wireCost should be within the range of 10.0 to 30.0
      const previous = this.wireCost;
      const random = Math.random() * (30.0 - 10.0) + 10.0;

      if (Math.abs(previous - random) <= 3) {
        this.wireCost = parseFloat(random.toFixed(2));
      }
    },
  },
});
