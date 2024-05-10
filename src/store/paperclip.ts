import { type PaperClipHistory, type PaperclipStore } from '@/lib/types';
import { defineStore } from 'pinia';

export const usePaperclipStore = defineStore('paperclip', {
  state: () => {
    return {
      wire: 10,
      wireCost: 10.0,
      paperclip: 0,
      paperclipPrice: 0.25,
      paperclipHistory: [],
      autoClippers: 0,
      autoClipperCost: 100.0,
    } as PaperclipStore;
  },

  getters: {
    // ! BUG: The clipsPerSecond getter is not returning the correct value
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
  },

  actions: {
    buyPaperclip: function (this: {
      paperclip: number;
      wire: number;
      paperclipHistory: {
        push(arg0: PaperClipHistory): unknown;
      };
    }) {
      if (this.wire > 0) {
        this.paperclip++;
        this.wire -= 1;

        this.paperclipHistory.push({
          paperclip: this.paperclip,
          wire: this.wire,
          timestamp: new Date(),
        });
      }
    },

    buyPaperclips: function (
      this: { paperclip: number; wire: number },
      quantity: number,
    ) {
      // TODO: this should still be able to buy paperclips even if the wire is less than the quantity
      if (this.wire >= quantity) {
        this.paperclip += quantity;
        this.wire -= quantity;
      }
    },

    buyWire: function (this: { wire: number }) {
      this.wire += 1000;
    },

    buyAutoClippers: function (this: { autoClippers: number }) {
      this.autoClippers += 1;
    },
  },
});
