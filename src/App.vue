<template>
  <div class="min-h-screen bg-[#090708] text-white">

    <!-- Mobile Overlay -->
    <transition name="fade">
      <div
        v-if="menuOpen"
        @click="menuOpen = false"
        class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
      ></div>
    </transition>

    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#10090c] transition-transform duration-300"
      :class="
        menuOpen
          ? 'translate-x-0'
          : '-translate-x-full lg:translate-x-0'
      "
    >

      <!-- Logo -->
      <div class="border-b border-white/10 p-6">
        <div class="flex items-center gap-3">

          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#991b3a] to-[#6f172d] text-xl shadow-lg shadow-red-950/30"
          >
            ◈
          </div>

          <div>
            <h1 class="text-lg font-bold tracking-wide">
              INVENTORY
            </h1>

            <p class="text-[10px] tracking-[0.2em] text-gray-500">
              MANAGEMENT SYSTEM
            </p>
          </div>

        </div>
      </div>

      <!-- Mobile Close -->
      <button
        type="button"
        @click="menuOpen = false"
        class="absolute right-4 top-6 flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/10 hover:text-white lg:hidden"
      >
        ✕
      </button>

      <!-- Navigation -->
      <nav class="flex-1 space-y-2 overflow-y-auto p-4">

        <button
          type="button"
          @click="navigate('dashboard')"
          class="sidebar-item"
          :class="activeSection === 'dashboard' ? 'sidebar-active' : ''"
        >
          <span>▦</span>
          Dashboard
        </button>

        <button
          type="button"
          @click="navigate('products')"
          class="sidebar-item"
          :class="activeSection === 'products' ? 'sidebar-active' : ''"
        >
          <span>◇</span>
          Products
        </button>

        <button
          type="button"
          @click="navigate('add')"
          class="sidebar-item"
          :class="activeSection === 'add' ? 'sidebar-active' : ''"
        >
          <span>＋</span>
          Add Product
        </button>

        <button
          type="button"
          @click="navigate('reports')"
          class="sidebar-item"
          :class="activeSection === 'reports' ? 'sidebar-active' : ''"
        >
          <span>▥</span>
          Reports
        </button>

        <button
          type="button"
          @click="navigate('categories')"
          class="sidebar-item"
          :class="activeSection === 'categories' ? 'sidebar-active' : ''"
        >
          <span>◇</span>
          Categories
        </button>

        <button
          type="button"
          @click="navigate('settings')"
          class="sidebar-item"
          :class="activeSection === 'settings' ? 'sidebar-active' : ''"
        >
          <span>⚙</span>
          Settings
        </button>

      </nav>

      <!-- User -->
      <div class="m-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">

        <div class="flex items-center gap-3">

          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#991b3a] to-[#6f172d] font-bold"
          >
            JS
          </div>

          <div>
            <p class="text-sm font-semibold">
              John Lloyd Saban
            </p>

            <p class="text-xs text-gray-500">
              BSCS 3A
            </p>
          </div>

        </div>

      </div>

    </aside>

    <!-- Main -->
    <div class="lg:ml-64">

      <AppHeader @toggle-menu="toggleMenu" />

      <main class="p-4 sm:p-6 lg:p-8">

        <!-- =========================
             DASHBOARD
        ========================== -->

        <section
          v-if="activeSection === 'dashboard'"
          class="animate-fade-up"
        >

          <div
            class="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
          >

            <div>

              <p class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#c85d78]">
                Overview
              </p>

              <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                Dashboard
              </h2>

              <p class="mt-2 text-sm text-gray-500">
                Welcome back, John. Here's your inventory overview.
              </p>

            </div>

            <button
              type="button"
              @click="navigate('add')"
              class="primary-button w-full sm:w-auto"
            >
              ＋ Add Product
            </button>

          </div>

          <!-- Statistics -->
          <div class="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div class="stat-card">
              <div class="stat-icon purple">◈</div>

              <div class="min-w-0">
                <p class="stat-label">Total Products</p>
                <p class="stat-number">{{ products.length }}</p>
                <p class="stat-description">
                  All inventory records
                </p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon blue">✓</div>

              <div class="min-w-0">
                <p class="stat-label">In Stock</p>
                <p class="stat-number">{{ inStockCount }}</p>
                <p class="stat-description">
                  Available products
                </p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon orange">!</div>

              <div class="min-w-0">
                <p class="stat-label">Low Stock</p>
                <p class="stat-number">{{ lowStockCount }}</p>
                <p class="stat-description">
                  Need attention
                </p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon red">×</div>

              <div class="min-w-0">
                <p class="stat-label">Out of Stock</p>
                <p class="stat-number">{{ outOfStockCount }}</p>
                <p class="stat-description">
                  Currently unavailable
                </p>
              </div>
            </div>

          </div>

          <!-- Recent + Quick Actions -->
          <div class="grid gap-6 xl:grid-cols-[1.5fr_1fr]">

            <!-- Recent Products -->
            <div class="dashboard-card">

              <div class="mb-5 flex items-center justify-between">

                <div>
                  <h3 class="text-lg font-bold">
                    Recent Products
                  </h3>

                  <p class="mt-1 text-xs text-gray-500">
                    Latest items added to your inventory
                  </p>
                </div>

                <button
                  type="button"
                  @click="navigate('products')"
                  class="text-xs font-semibold text-[#c85d78] transition hover:text-[#e88aa0]"
                >
                  View All →
                </button>

              </div>

              <div
                v-if="products.length"
                class="space-y-3"
              >

                <div
                  v-for="product in products.slice(-5).reverse()"
                  :key="product.id"
                  class="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition duration-300 hover:border-[#7f1d32]/30 hover:bg-[#7f1d32]/[0.04]"
                >

                  <div class="flex min-w-0 items-center gap-3">

                    <div
                      class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#7f1d32]/15 text-sm font-bold text-[#c85d78]"
                    >
                      {{ product.productName.charAt(0).toUpperCase() }}
                    </div>

                    <div class="min-w-0">

                      <p class="truncate text-sm font-semibold text-gray-200">
                        {{ product.productName }}
                      </p>

                      <p class="mt-1 text-xs text-gray-600">
                        {{ product.category }}
                        •
                        {{ product.quantity }} pcs
                      </p>

                    </div>

                  </div>

                  <span
                    class="status-badge ml-3 flex-shrink-0"
                    :class="statusClass(product.stockStatus)"
                  >
                    {{ product.stockStatus }}
                  </span>

                </div>

              </div>

              <div
                v-else
                class="rounded-xl border border-dashed border-white/10 py-12 text-center"
              >

                <div class="mb-3 text-3xl text-gray-700">
                  ◇
                </div>

                <p class="text-sm font-medium text-gray-500">
                  No products yet
                </p>

                <button
                  type="button"
                  @click="navigate('add')"
                  class="mt-3 text-xs font-semibold text-[#c85d78] hover:text-[#e88aa0]"
                >
                  Add your first product →
                </button>

              </div>

            </div>

            <!-- Quick Actions -->
            <div class="dashboard-card">

              <div class="mb-5">

                <h3 class="text-lg font-bold">
                  Quick Actions
                </h3>

                <p class="mt-1 text-xs text-gray-500">
                  Frequently used inventory functions
                </p>

              </div>

              <div class="space-y-3">

                <button
                  type="button"
                  @click="navigate('add')"
                  class="group flex w-full items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#7f1d32]/40 hover:bg-[#7f1d32]/[0.06]"
                >

                  <div class="quick-icon">
                    ＋
                  </div>

                  <div class="flex-1">
                    <p class="text-sm font-semibold">
                      Add Product
                    </p>

                    <p class="mt-1 text-xs text-gray-600">
                      Create a new inventory record
                    </p>
                  </div>

                  <span class="quick-arrow">
                    →
                  </span>

                </button>

                <button
                  type="button"
                  @click="navigate('products')"
                  class="group flex w-full items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#7f1d32]/40 hover:bg-[#7f1d32]/[0.06]"
                >

                  <div class="quick-icon">
                    ◇
                  </div>

                  <div class="flex-1">
                    <p class="text-sm font-semibold">
                      View Products
                    </p>

                    <p class="mt-1 text-xs text-gray-600">
                      Search and manage products
                    </p>
                  </div>

                  <span class="quick-arrow">
                    →
                  </span>

                </button>

                <button
                  type="button"
                  @click="navigate('reports')"
                  class="group flex w-full items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#7f1d32]/40 hover:bg-[#7f1d32]/[0.06]"
                >

                  <div class="quick-icon">
                    ▥
                  </div>

                  <div class="flex-1">
                    <p class="text-sm font-semibold">
                      View Reports
                    </p>

                    <p class="mt-1 text-xs text-gray-600">
                      Check inventory statistics
                    </p>
                  </div>

                  <span class="quick-arrow">
                    →
                  </span>

                </button>

                <button
                  type="button"
                  @click="navigate('categories')"
                  class="group flex w-full items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#7f1d32]/40 hover:bg-[#7f1d32]/[0.06]"
                >

                  <div class="quick-icon">
                    ◇
                  </div>

                  <div class="flex-1">
                    <p class="text-sm font-semibold">
                      Categories
                    </p>

                    <p class="mt-1 text-xs text-gray-600">
                      Browse product categories
                    </p>
                  </div>

                  <span class="quick-arrow">
                    →
                  </span>

                </button>

              </div>

            </div>

          </div>

          <!-- Inventory Summary -->
          <div class="dashboard-card mt-6">

            <div class="mb-5 flex items-center justify-between">

              <div>
                <h3 class="text-lg font-bold">
                  Inventory Summary
                </h3>

                <p class="mt-1 text-xs text-gray-500">
                  Current stock distribution
                </p>
              </div>

              <button
                type="button"
                @click="navigate('reports')"
                class="text-xs font-semibold text-[#c85d78] hover:text-[#e88aa0]"
              >
                Full Report →
              </button>

            </div>

            <div class="grid gap-4 sm:grid-cols-3">

              <div class="summary-card green">
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500">
                    In Stock
                  </span>
                  <span class="text-green-400">✓</span>
                </div>

                <p class="mt-3 text-2xl font-bold text-green-400">
                  {{ inStockCount }}
                </p>

                <p class="mt-1 text-xs text-gray-600">
                  Available products
                </p>
              </div>

              <div class="summary-card orange">
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500">
                    Low Stock
                  </span>
                  <span class="text-orange-400">!</span>
                </div>

                <p class="mt-3 text-2xl font-bold text-orange-400">
                  {{ lowStockCount }}
                </p>

                <p class="mt-1 text-xs text-gray-600">
                  Need restocking
                </p>
              </div>

              <div class="summary-card red">
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500">
                    Out of Stock
                  </span>
                  <span class="text-red-400">×</span>
                </div>

                <p class="mt-3 text-2xl font-bold text-red-400">
                  {{ outOfStockCount }}
                </p>

                <p class="mt-1 text-xs text-gray-600">
                  Currently unavailable
                </p>
              </div>

            </div>

          </div>

        </section>


        <!-- =========================
             PRODUCTS
        ========================== -->

        <section
          v-if="activeSection === 'products'"
          class="animate-fade-up"
        >

          <div class="mb-8">

            <p class="page-label">
              Inventory
            </p>

            <h2 class="text-3xl font-bold">
              Product Inventory
            </h2>

            <p class="mt-2 text-gray-500">
              Manage all product records.
            </p>

          </div>

          <ProductList
            :products="products"
            @edit="startEdit"
            @delete="deleteProduct"
          />

        </section>


        <!-- =========================
             ADD PRODUCT
        ========================== -->

        <section
          v-if="activeSection === 'add'"
          class="animate-fade-up"
        >

          <div class="mb-8">

            <p class="page-label">
              Inventory
            </p>

            <h2 class="text-3xl font-bold">
              {{ editingProduct ? 'Edit Product' : 'Add Product' }}
            </h2>

            <p class="mt-2 text-gray-500">
              Enter the product information below.
            </p>

          </div>

          <div class="max-w-xl">

            <ProductForm
              :product="editingProduct"
              @save="saveProduct"
              @cancel="cancelEdit"
            />

          </div>

        </section>


        <!-- =========================
             REPORTS
        ========================== -->

        <section
          v-if="activeSection === 'reports'"
          class="animate-fade-up"
        >

          <div class="mb-8">

            <p class="page-label">
              Analytics
            </p>

            <h2 class="text-3xl font-bold">
              Inventory Reports
            </h2>

            <p class="mt-2 text-gray-500">
              Summary of your current inventory.
            </p>

          </div>

          <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            <div class="dashboard-card">
              <p class="text-sm text-gray-500">
                Total Products
              </p>

              <p class="mt-3 text-4xl font-bold">
                {{ products.length }}
              </p>
            </div>

            <div class="dashboard-card">
              <p class="text-sm text-gray-500">
                Total Quantity
              </p>

              <p class="mt-3 text-4xl font-bold text-blue-400">
                {{ totalQuantity }}
              </p>
            </div>

            <div class="dashboard-card">
              <p class="text-sm text-gray-500">
                Low Stock
              </p>

              <p class="mt-3 text-4xl font-bold text-orange-400">
                {{ lowStockCount }}
              </p>
            </div>

            <div class="dashboard-card">
              <p class="text-sm text-gray-500">
                Out of Stock
              </p>

              <p class="mt-3 text-4xl font-bold text-red-400">
                {{ outOfStockCount }}
              </p>
            </div>

          </div>

          <div class="dashboard-card mt-6">

            <h3 class="mb-5 text-xl font-bold">
              Product Stock Report
            </h3>

            <div class="overflow-x-auto">

              <table class="w-full text-left">

                <thead>

                  <tr class="border-b border-white/10">

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
                      STATUS
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr
                    v-for="product in products"
                    :key="product.id"
                    class="border-b border-white/5"
                  >

                    <td class="px-4 py-4 font-semibold">
                      {{ product.productName }}
                    </td>

                    <td class="px-4 py-4 text-gray-400">
                      {{ product.category }}
                    </td>

                    <td class="px-4 py-4">
                      {{ product.quantity }}
                    </td>

                    <td class="px-4 py-4">

                      <span
                        class="status-badge"
                        :class="statusClass(product.stockStatus)"
                      >
                        {{ product.stockStatus }}
                      </span>

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </section>


        <!-- =========================
             CATEGORIES
        ========================== -->

        <section
          v-if="activeSection === 'categories'"
          class="animate-fade-up"
        >

          <div class="mb-8">

            <p class="page-label">
              Organization
            </p>

            <h2 class="text-3xl font-bold">
              Product Categories
            </h2>

            <p class="mt-2 text-gray-500">
              Products grouped according to their category.
            </p>

          </div>

          <div
            v-if="categorySummary.length"
            class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >

            <div
              v-for="category in categorySummary"
              :key="category.name"
              class="dashboard-card transition duration-300 hover:-translate-y-1"
            >

              <div class="flex items-center justify-between">

                <div class="quick-icon">
                  ◇
                </div>

                <span class="text-2xl font-bold">
                  {{ category.count }}
                </span>

              </div>

              <h3 class="mt-5 font-bold">
                {{ category.name }}
              </h3>

              <p class="mt-1 text-sm text-gray-500">
                {{ category.count }} product(s)
              </p>

            </div>

          </div>

          <div
            v-else
            class="dashboard-card text-center"
          >
            <p class="text-gray-500">
              No categories available yet.
            </p>
          </div>

        </section>


        <!-- =========================
             SETTINGS
        ========================== -->

        <section
          v-if="activeSection === 'settings'"
          class="animate-fade-up"
        >

          <div class="mb-8">

            <p class="page-label">
              System
            </p>

            <h2 class="text-3xl font-bold">
              Settings
            </h2>

            <p class="mt-2 text-gray-500">
              Manage your inventory system data.
            </p>

          </div>

          <div class="max-w-2xl space-y-5">

            <div class="dashboard-card">

              <div class="flex items-center justify-between gap-5">

                <div>

                  <h3 class="font-bold">
                    Local Storage
                  </h3>

                  <p class="mt-1 text-sm text-gray-500">
                    Product records are currently stored in your browser.
                  </p>

                </div>

                <span class="status-badge status-green">
                  Active
                </span>

              </div>

            </div>

            <div class="dashboard-card">

              <h3 class="font-bold">
                Current Records
              </h3>

              <p class="mt-1 text-sm text-gray-500">
                You currently have {{ products.length }} product record(s).
              </p>

            </div>

            <div class="dashboard-card">

              <h3 class="font-bold">
                Clear Inventory
              </h3>

              <p class="mt-1 text-sm text-gray-500">
                Permanently remove all locally stored product records.
              </p>

              <button
                type="button"
                @click="clearInventory"
                class="action-delete mt-5"
              >
                🗑 Clear All Products
              </button>

            </div>

          </div>

        </section>


        <!-- Toast -->
        <transition name="toast">

          <div
            v-if="message"
            class="fixed bottom-6 right-6 z-[60] rounded-xl border border-white/10 bg-[#170b0f] px-5 py-4 shadow-2xl"
          >

            <div class="flex items-center gap-3">

              <div
                class="flex h-8 w-8 items-center justify-center rounded-full"
                :class="
                  messageType === 'success'
                    ? 'bg-green-500/15 text-green-400'
                    : 'bg-red-500/15 text-red-400'
                "
              >
                {{ messageType === 'success' ? '✓' : '!' }}
              </div>

              <p class="text-sm font-medium text-gray-200">
                {{ message }}
              </p>

            </div>

          </div>

        </transition>

      </main>

      <AppFooter />

    </div>

  </div>
</template>


<script setup>

import {
  computed,
  onMounted,
  ref
} from 'vue'

import AppHeader from './components/AppHeader.vue'
import ProductForm from './components/ProductForm.vue'
import ProductList from './components/ProductList.vue'
import AppFooter from './components/AppFooter.vue'


const STORAGE_KEY = 'saban-module7-products'


const products = ref([])

const editingProduct = ref(null)

const menuOpen = ref(false)

const activeSection = ref('dashboard')

const message = ref('')

const messageType = ref('success')


/* Statistics */

const inStockCount = computed(() =>
  products.value.filter(
    product => product.stockStatus === 'In Stock'
  ).length
)

const lowStockCount = computed(() =>
  products.value.filter(
    product => product.stockStatus === 'Low Stock'
  ).length
)

const outOfStockCount = computed(() =>
  products.value.filter(
    product => product.stockStatus === 'Out of Stock'
  ).length
)

const totalQuantity = computed(() =>
  products.value.reduce(
    (total, product) =>
      total + Number(product.quantity || 0),
    0
  )
)


/* Categories */

const categorySummary = computed(() => {

  const categories = {}

  products.value.forEach(product => {

    const category =
      product.category || 'Uncategorized'

    if (!categories[category]) {
      categories[category] = 0
    }

    categories[category]++

  })

  return Object.entries(categories).map(
    ([name, count]) => ({
      name,
      count
    })
  )
})


/* Navigation */

function navigate(section) {

  activeSection.value = section

  menuOpen.value = false

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}


function toggleMenu() {

  menuOpen.value = !menuOpen.value

}


/* Messages */

function showMessage(
  text,
  type = 'success'
) {

  message.value = text

  messageType.value = type

  setTimeout(() => {
    message.value = ''
  }, 3000)
}


/* Local Storage */

function saveToLocalStorage() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(products.value)
  )

}


function loadFromLocalStorage() {

  const saved =
    localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    return
  }

  try {

    products.value =
      JSON.parse(saved)

  } catch {

    products.value = []

  }

}


/* Save */

function saveProduct(productData) {

  /* Edit existing product */

  if (editingProduct.value) {

    const index =
      products.value.findIndex(
        product =>
          product.id ===
          editingProduct.value.id
      )

    if (index !== -1) {

      products.value[index] = {

        ...products.value[index],

        ...productData,

        updatedAt:
          new Date().toISOString()

      }

      saveToLocalStorage()

      editingProduct.value = null

      showMessage(
        'Product updated successfully.'
      )

      navigate('products')

      return
    }

  }


  /* Add new product */

  const newProduct = {

    id: Date.now(),

    ...productData,

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString()

  }

  products.value.push(newProduct)

  saveToLocalStorage()

  showMessage(
    'Product added successfully.'
  )

  navigate('products')
}


/* Edit */

function startEdit(product) {

  editingProduct.value = {
    ...product
  }

  navigate('add')
}


/* Cancel */

function cancelEdit() {

  editingProduct.value = null

  navigate('products')
}


/* Delete */

function deleteProduct(id) {

  const confirmed =
    window.confirm(
      'Are you sure you want to delete this product?'
    )

  if (!confirmed) {
    return
  }

  products.value =
    products.value.filter(
      product =>
        product.id !== id
    )

  saveToLocalStorage()

  if (
    editingProduct.value &&
    editingProduct.value.id === id
  ) {

    editingProduct.value = null

  }

  showMessage(
    'Product deleted successfully.'
  )
}


/* Clear */

function clearInventory() {

  if (!products.value.length) {

    showMessage(
      'There are no products to clear.',
      'error'
    )

    return
  }

  const confirmed =
    window.confirm(
      'Are you sure you want to remove ALL products? This cannot be undone.'
    )

  if (!confirmed) {
    return
  }

  products.value = []

  editingProduct.value = null

  saveToLocalStorage()

  showMessage(
    'All products have been removed.'
  )

  navigate('dashboard')
}


/* Status */

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


/* Initialize */

onMounted(() => {
  loadFromLocalStorage()
})

</script>