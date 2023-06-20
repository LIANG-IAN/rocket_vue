import { defineStore  } from 'pinia'

export default defineStore("store", {
    state: () => ({
        isHeaderFooterVisible: true
    }),
    actions: {
        hideHeaderFooter() {
            this.isHeaderFooterVisible = false
        },
        showHeaderFooter() {
            this.isHeaderFooterVisible = true
        }
    }
})
