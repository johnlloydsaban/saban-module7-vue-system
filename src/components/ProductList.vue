<template>
  <section class="dashboard-card">

    <!-- Header -->
    <div
      class="mb-5 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between"
    >

      <div class="flex items-center gap-3">

        <div class="section-icon">
          ◇
        </div>

        <div>

          <h2 class="text-xl font-bold">
            Product Inventory
          </h2>

          <p class="text-sm text-gray-500">
            {{ filteredProducts.length }} product(s)
          </p>

        </div>

      </div>


      <!-- Search -->
      <div class="relative sm:w-72">

        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search product..."
          class="dark-input pl-10"
        />

        <span
          class="absolute left-3 top-3 text-gray-500"
        >
          ⌕
        </span>

      </div>

    </div>


    <!-- Empty -->
    <div
      v-if="filteredProducts.length === 0"
      class="rounded-xl border border-dashed border-white/10 py-16 text-center"
    >

      <div class="mb-3 text-4xl opacity-50">
        ◇
      </div>

      <h3 class="font-semibold text-gray-300">
        No products found
      </h3>

      <p class="mt-1 text-sm text-gray-500">
        Add a product or change your search.
      </p>

    </div>


    <!-- Desktop Table -->
    <div
      v-else
      class="hidden overflow-hidden rounded-xl border border-white/10 md:block"
    >

      <table class="w-full text-left">

        <thead class="bg-white/[0.03]">

          <tr class="border-b border-white/10">

            <th class="table-heading">
              ID
            </th>

            <th class="table-heading">
              PRODUCT
            </th>

            <th class="table-heading">
              CATEGORY
            </th>

            <th class="table-heading">
              QUANTITY
            </th>

            <th class="table-heading">
              PRICE
            </th>

            <th class="table-heading">
              STATUS
            </th>

            <th class="table-heading text-right">
              ACTIONS
            </th>

          </tr>

        </thead>


        <tbody>

          <tr
            v-for="(product, index) in filteredProducts"
            :key="product.id"
            class="product-row"
            :style="{
              animationDelay: `${index * 60}ms`
            }"
          >

            <td class="px-4 py-5 text-sm font-medium text-gray-400">
              {{ product.productId }}
            </td>

            <td class="px-4 py-5">

              <p class="font-semibold text-white">
                {{ product.productName }}
              </p>

              <p class="mt-1 max-w-xs truncate text-xs text-gray-500">
                {{ product.description || 'No description' }}
              </p>

            </td>

            <td class="px-4 py-5">

              <span class="category-badge">
                {{ product.category }}
              </span>

            </td>

            <td class="px-4 py-5 text-sm text-gray-300">
              {{ product.quantity }}
            </td>

            <td class="px-4 py-5 text-sm font-semibold text-gray-200">
              ₱{{ Number(product.price).toFixed(2) }}
            </td>

            <td class="px-4 py-5">

              <span
                class="status-badge"
                :class="statusClass(product.stockStatus)"
              >

                <span class="status-dot"></span>

                {{ product.stockStatus }}

              </span>

            </td>

            <td class="px-4 py-5">

              <div class="flex justify-end gap-2">

                <button
                  type="button"
                  @click="$emit('edit', product)"
                  class="action-edit"
                >
                  ✎
                </button>

                <button
                  type="button"
                  @click="$emit('delete', product.id)"
                  class="action-delete"
                >
                  🗑
                </button>

              </div>

            </td>

          </tr>

        </tbody>

      </table>

    </div>


    <!-- Mobile Cards -->
    <div class="space-y-4 md:hidden">

      <article
        v-for="(product, index) in filteredProducts"
        :key="product.id"
        class="mobile-product-card"
        :style="{
          animationDelay: `${index * 60}ms`
        }"
      >

        <div class="flex items-start justify-between">

          <div>

            <p class="text-xs text-[#c85d78]">
              {{ product.productId }}
            </p>

            <h3 class="mt-1 font-bold">
              {{ product.productName }}
            </h3>

          </div>

          <span
            class="status-badge"
            :class="statusClass(product.stockStatus)"
          >
            {{ product.stockStatus }}
          </span>

        </div>


        <p class="mt-3 text-sm text-gray-500">
          {{ product.description || 'No description' }}
        </p>


        <div class="mt-4 grid grid-cols-2 gap-3 text-sm">

          <div>

            <p class="text-gray-600">
              Category
            </p>

            <p class="mt-1 text-gray-300">
              {{ product.category }}
            </p>

          </div>

          <div>

            <p class="text-gray-600">
              Quantity
            </p>

            <p class="mt-1 text-gray-300">
              {{ product.quantity }}
            </p>

          </div>

          <div>

            <p class="text-gray-600">
              Price
            </p>

            <p class="mt-1 font-semibold text-[#c85d78]">
              ₱{{ Number(product.price).toFixed(2) }}
            </p>

          </div>

        </div>


        <div class="mt-5 flex gap-2">

          <button
            type="button"
            @click="$emit('edit', product)"
            class="action-edit flex-1"
          >
            ✎ Edit
          </button>

          <button
            type="button"
            @click="$emit('delete', product.id)"
            class="action-delete flex-1"
          >
            🗑 Delete
          </button>

        </div>

      </article>

    </div>

  </section>
</template>


<script setup>

import {
  computed,
  ref
} from 'vue'


const props = defineProps({

  products: {
    type: Array,
    default: () => []
  }

})


defineEmits([
  'edit',
  'delete'
])


const searchTerm = ref('')


const filteredProducts =
  computed(() => {

    const keyword =
      searchTerm.value
        .toLowerCase()
        .trim()

    if (!keyword) {
      return props.products
    }

    return props.products.filter(
      product =>
        product.productName
          .toLowerCase()
          .includes(keyword)
    )

  })


function statusClass(status) {

  if (status === 'In Stock') {
    return 'status-green'
  }

  if (status === 'Low Stock') {
    return 'status-orange'
  }

  if (status === 'Out of Stock') {
    return 'status-red'
  }

  return 'status-gray'
}

</script>