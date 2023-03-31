let app = Vue.createApp({
  data: function() {
    return {
      showSidebar: false,
      inventory: [
          { "id": 1,  "name": "Raddishes",   "icon": "raddish",    "price": { "USD": 3.26, "NOK": 17.43 }, "type": "Vegetable" },
          { "id": 2,  "name": "Artichokes",  "icon": "artichoke",  "price": { "USD": 9.44, "NOK": 15.82 }, "type": "Vegetable" },
          { "id": 3,  "name": "Broccoli",    "icon": "broccoli",   "price": { "USD": 5.20, "NOK": 16.66 }, "type": "Vegetable" },
          { "id": 5,  "name": "Cabbages",    "icon": "cabbage",    "price": { "USD": 0.95, "NOK": 62.33 }, "type": "Vegetable" },
          { "id": 6,  "name": "Cherries",    "icon": "cherry",     "price": { "USD": 1.04, "NOK": 62.50 }, "type": "Fruit"     },
          { "id": 7,  "name": "Carrots",     "icon": "carrot",     "price": { "USD": 4.82, "NOK": 72.74 }, "type": "Vegetable" },
          { "id": 8,  "name": "Corn",        "icon": "corn",       "price": { "USD": 7.53, "NOK": 99.43 }, "type": "Vegetable" },
          { "id": 9,  "name": "Grapes",      "icon": "grapes",     "price": { "USD": 4.94, "NOK": 88.29 }, "type": "Fruit"     },
          { "id": 10, "name": "Onions",      "icon": "onion",      "price": { "USD": 6.45, "NOK": 69.53 }, "type": "Vegetable" },
          { "id": 11, "name": "Oranges",     "icon": "orange",     "price": { "USD": 9.95, "NOK": 96.53 }, "type": "Fruit"     },
          { "id": 12, "name": "Peas",        "icon": "peas",       "price": { "USD": 2.61, "NOK": 65.74 }, "type": "Vegetable" },
          { "id": 13, "name": "Pineapples",  "icon": "pineapple",  "price": { "USD": 1.62, "NOK": 35.22 }, "type": "Fruit"     },
          { "id": 14, "name": "Steaks",      "icon": "steak",      "price": { "USD": 8.32, "NOK": 83.08 }, "type": "Meat"      },
          { "id": 15, "name": "Watermelons", "icon": "watermelon", "price": { "USD": 5.08, "NOK": 89.69 }, "type": "Fruit"     },
          { "id": 16, "name": "Sausages",    "icon": "sausage",    "price": { "USD": 3.69, "NOK": 26.68 }, "type": "Meat"      }
        ],
      cart: {

      }
    }
  },
  computed: {
    totalQuantity() {
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr
      }, 0)
    }
  },
  methods: {
    addToCart(name, index) {
      if (!this.cart[name]) this.cart[name] = 0
      this.cart[name] += this.inventory[index].quantity
      this.inventory[index].quantity = 0
    },
    toggleSidebar: function() {
      this.showSidebar = !this.showSidebar
    },
    removeItem(name) {
      delete this.cart[name]
    }
    // async mounted() {
    //   const res = await fetch('./food.json')
    //   const data = await res.json()
    //   this.inventory = data
    // }
    // created() {
    //   fetch('./food.json')
    //     .then(response => response.json())
    //     .then(data => (this.inventory = inventory))
    // }
  }
})

app.component('sidebar', {
  props: ['toggle', 'cart', 'inventory', 'remove'],
  methods: {
    getPrice(name) {
      const product = this.inventory.find((p) => {
        return p.name === name
      })
      return product.price.USD
    },
    calculateTotal() {
      const total = Object.entries(this.cart).reduce((acc, curr, index) => {
        return acc + (curr[1] * this.getPrice(curr[0]))
      }, 0)
      return total.toFixed(2)
    }
  },
  template:
    `
      <aside class="cart-container">
        <div class="cart">
          <h1 class="cart-title spread">
            <span>
              Cart
              <i class="icofont-cart-alt icofont-1x"></i>
            </span>
            <button @click="toggle" class="cart-close">&times;</button>
          </h1>

          <div class="cart-body">
            <table class="cart-table">
              <thead>
                <tr>
                  <th><span class="sr-only">Product Image</span></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th><span class="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(quantity, key, i) in cart" :key="i" >
                  <td><i class="icofont-carrot icofont-3x"></i></td>
                  <td>{{ key }}</td>
                  <td>\$ {{ getPrice(key) }}</td>
                  <td class="center"> {{ quantity }} </td>
                  <td>\$ {{ quantity * getPrice(key) }} </td>
                  <td class="center">
                    <button @click="remove(key)" class="btn btn-light cart-remove">
                      &times;
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <p class="center" v-if="!Object.keys(cart).length" ><em>No items in cart</em></p>
            <div class="spread">
              <span><strong>Total:</strong> \$ {{ calculateTotal() }} </span>
              <button class="btn btn-light">Checkout</button>
            </div>
          </div>
        </div>
      </aside>
    `
})

app.mount('#app')
