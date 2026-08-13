<template>
  <section class="dashboard-card animate-card">

    <div class="mb-6 flex items-center gap-3">

      <div class="section-icon">
        ✎
      </div>

      <div>

        <h2 class="text-xl font-bold">
          {{ isEditing ? 'Edit Product' : 'Add Product' }}
        </h2>

        <p class="text-sm text-gray-500">
          {{
            isEditing
              ? 'Update product information'
              : 'Enter new product details'
          }}
        </p>

      </div>

    </div>


    <form
      @submit.prevent="handleSubmit"
      class="space-y-5"
    >

      <!-- Product ID -->
      <div>

        <label class="form-label">
          Product ID
        </label>

        <input
          v-model="form.productId"
          type="text"
          placeholder="P001"
          class="dark-input"
        />

      </div>


      <!-- Product Name -->
      <div>

        <label class="form-label">
          Product Name
        </label>

        <input
          v-model="form.productName"
          type="text"
          placeholder="Gaming Mouse"
          class="dark-input"
        />

      </div>


      <!-- Description -->
      <div>

        <label class="form-label">
          Description
        </label>

        <textarea
          v-model="form.description"
          rows="3"
          placeholder="Enter product description"
          class="dark-input resize-none"
        ></textarea>

      </div>


      <!-- Category -->
      <div>

        <label class="form-label">
          Category
        </label>

        <select
          v-model="form.category"
          class="dark-input"
        >

          <option value="">
            Select category
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Beverage">
            Beverage
          </option>

          <option value="Furniture">
            Furniture
          </option>

          <option value="School Supplies">
            School Supplies
          </option>

          <option value="Other">
            Other
          </option>

        </select>

      </div>


      <!-- Quantity / Price -->
      <div class="grid grid-cols-2 gap-4">

        <div>

          <label class="form-label">
            Quantity
          </label>

          <input
            v-model.number="form.quantity"
            type="number"
            min="0"
            class="dark-input"
          />

        </div>


        <div>

          <label class="form-label">
            Price (₱)
          </label>

          <input
            v-model.number="form.price"
            type="number"
            min="0"
            step="0.01"
            class="dark-input"
          />

        </div>

      </div>


      <!-- Status -->
      <div>

        <label class="form-label">
          Stock Status
        </label>

        <select
          v-model="form.stockStatus"
          class="dark-input"
        >

          <option value="">
            Select status
          </option>

          <option value="In Stock">
            In Stock
          </option>

          <option value="Low Stock">
            Low Stock
          </option>

          <option value="Out of Stock">
            Out of Stock
          </option>

        </select>

      </div>


      <!-- Error -->
      <transition name="fade">

        <div
          v-if="errorMessage"
          class="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {{ errorMessage }}
        </div>

      </transition>


      <!-- Buttons -->
      <div class="flex gap-3 pt-2">

        <button
          type="submit"
          class="primary-button flex-1"
        >
          {{ isEditing ? '↻ Update Product' : '＋ Add Product' }}
        </button>

        <button
          v-if="isEditing"
          type="button"
          @click="handleCancel"
          class="secondary-button"
        >
          Cancel
        </button>

      </div>

    </form>

  </section>
</template>


<script setup>

import {
  reactive,
  ref,
  watch
} from 'vue'


const props = defineProps({

  product: {
    type: Object,
    default: null
  }

})


const emit = defineEmits([
  'save',
  'cancel'
])


const isEditing = ref(false)

const errorMessage = ref('')


const form = reactive({

  productId: '',
  productName: '',
  description: '',
  category: '',
  quantity: 0,
  price: 0,
  stockStatus: ''

})


function resetForm() {

  form.productId = ''
  form.productName = ''
  form.description = ''
  form.category = ''
  form.quantity = 0
  form.price = 0
  form.stockStatus = ''

  errorMessage.value = ''

  isEditing.value = false
}


function loadProduct(product) {

  if (!product) {

    resetForm()

    return

  }

  form.productId =
    product.productId ?? ''

  form.productName =
    product.productName ?? ''

  form.description =
    product.description ?? ''

  form.category =
    product.category ?? ''

  form.quantity =
    product.quantity ?? 0

  form.price =
    product.price ?? 0

  form.stockStatus =
    product.stockStatus ?? ''

  errorMessage.value = ''

  isEditing.value = true
}


watch(
  () => props.product,
  newProduct => {
    loadProduct(newProduct)
  },
  {
    immediate: true
  }
)


function handleSubmit() {

  if (
    !form.productId.trim() ||
    !form.productName.trim() ||
    !form.category ||
    form.quantity === '' ||
    form.price === '' ||
    !form.stockStatus
  ) {

    errorMessage.value =
      'Please complete all required fields.'

    return

  }


  emit('save', {

    productId:
      form.productId.trim(),

    productName:
      form.productName.trim(),

    description:
      form.description.trim(),

    category:
      form.category,

    quantity:
      Number(form.quantity),

    price:
      Number(form.price),

    stockStatus:
      form.stockStatus

  })


  resetForm()
}


function handleCancel() {

  resetForm()

  emit('cancel')

}

</script>