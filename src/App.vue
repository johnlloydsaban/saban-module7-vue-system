<template>
  <div class="min-h-screen bg-[#090708] text-white">

    <!-- =========================
         UNAUTHENTICATED VIEW
    ========================== -->
    <div v-if="!isAuthenticated" class="flex min-h-screen flex-col">
      <AppHeader @toggle-menu="toggleMenu" />
      
      <main class="flex-1 flex items-center justify-center">
        <AuthView @login-success="handleLoginSuccess" />
      </main>

      <AppFooter />
    </div>

    <!-- =========================
         AUTHENTICATED VIEW
    ========================== -->
    <div v-else>

      <!-- Mobile Overlay -->
      <transition name="fade">
        <div
          v-if="menuOpen"
          @click="menuOpen = false"
          class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        ></div>
      </transition>

      <!-- Sidebar (Hamburger Drawer) -->
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

          <!-- Logout Button in Navigation List -->
          <button
            type="button"
            @click="logout"
            class="sidebar-item text-red-400 hover:bg-red-500/10 hover:text-red-300 transition duration-200"
          >
            <span>↳</span>
            Logout
          </button>

        </nav>

        <!-- User Profile Card & Logout in Hamburger Menu -->
        <div class="m-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">

          <div class="flex items-center gap-3">

            <div
              class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#991b3a] to-[#6f172d] text-sm font-bold text-white shadow-md"
            >
              {{ userInitials }}
            </div>

            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-semibold">
                {{ currentUser ? currentUser.fullName : 'John Lloyd Saban' }}
              </p>

              <p class="truncate text-xs text-gray-500">
                {{ currentUser ? currentUser.studentId : 'BSCS 3A' }}
              </p>
            </div>

          </div>

          <!-- Secondary Logout Button in Hamburger Drawer -->
          <button
            type="button"
            @click="logout"
            class="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/25 bg-red-500/10 py-2 text-xs font-semibold text-red-400 transition hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300 active:scale-95"
          >
            <span>↳</span> Logout Account
          </button>

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
                  Welcome back, {{ userFirstName }}. Here's your inventory overview.
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
                        </p>

                      </div>

                    </div>

                    <div class="text-right">

                      <p class="text-sm font-bold text-gray-200">
                        ₱{{ Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                      </p>

                      <span
                        class="status-badge mt-1"
                        :class="statusClass(product.stockStatus)"
                      >
                        <span class="status-dot"></span>
                        {{ product.stockStatus }}
                      </span>

                    </div>

                  </div>

                </div>

                <!-- Empty State -->
                <div
                  v-else
                  class="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-10 text-center"
                >

                  <div class="mb-3 text-3xl text-gray-600">
                    📦
                  </div>

                  <p class="text-sm font-medium text-gray-400">
                    No products added yet
                  </p>

                  <p class="mt-1 text-xs text-gray-600">
                    Start by adding your first product to the inventory.
                  </p>

                  <button
                    type="button"
                    @click="navigate('add')"
                    class="primary-button mt-4 !py-2.5 !text-xs"
                  >
                    ＋ Add First Product
                  </button>

                </div>

              </div>

              <!-- Quick Actions & Category Overview -->
              <div class="space-y-6">

                <!-- Quick Actions -->
                <div class="dashboard-card">

                  <h3 class="mb-4 text-base font-bold">
                    Quick Actions
                  </h3>

                  <div class="space-y-3">

                    <button
                      type="button"
                      @click="navigate('add')"
                      class="group flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition duration-300 hover:border-[#7f1d32]/30 hover:bg-[#7f1d32]/10"
                    >

                      <div class="flex items-center gap-3">
                        <div class="quick-icon">＋</div>

                        <div class="text-left">
                          <p class="text-sm font-medium text-gray-200">
                            Add New Product
                          </p>

                          <p class="text-xs text-gray-500">
                            Insert a new inventory record
                          </p>
                        </div>
                      </div>

                      <span class="quick-arrow">→</span>

                    </button>

                    <button
                      type="button"
                      @click="navigate('products')"
                      class="group flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition duration-300 hover:border-[#7f1d32]/30 hover:bg-[#7f1d32]/10"
                    >

                      <div class="flex items-center gap-3">
                        <div class="quick-icon">◇</div>

                        <div class="text-left">
                          <p class="text-sm font-medium text-gray-200">
                            View All Products
                          </p>

                          <p class="text-xs text-gray-500">
                            Manage and edit existing items
                          </p>
                        </div>
                      </div>

                      <span class="quick-arrow">→</span>

                    </button>

                    <button
                      type="button"
                      @click="navigate('reports')"
                      class="group flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition duration-300 hover:border-[#7f1d32]/30 hover:bg-[#7f1d32]/10"
                    >

                      <div class="flex items-center gap-3">
                        <div class="quick-icon">▥</div>

                        <div class="text-left">
                          <p class="text-sm font-medium text-gray-200">
                            Inventory Reports
                          </p>

                          <p class="text-xs text-gray-500">
                            Check stock value & breakdown
                          </p>
                        </div>
                      </div>

                      <span class="quick-arrow">→</span>

                    </button>

                  </div>

                </div>

                <!-- Stock Health Summary -->
                <div class="dashboard-card">

                  <h3 class="mb-4 text-base font-bold">
                    Stock Health
                  </h3>

                  <div class="space-y-3">

                    <div class="summary-card green flex items-center justify-between">
                      <div>
                        <p class="text-xs font-semibold text-green-400">
                          In Stock Items
                        </p>
                        <p class="mt-1 text-xl font-bold text-white">
                          {{ inStockCount }}
                        </p>
                      </div>
                      <span class="text-2xl text-green-400/60">✓</span>
                    </div>

                    <div class="summary-card orange flex items-center justify-between">
                      <div>
                        <p class="text-xs font-semibold text-amber-400">
                          Low Stock Warning
                        </p>
                        <p class="mt-1 text-xl font-bold text-white">
                          {{ lowStockCount }}
                        </p>
                      </div>
                      <span class="text-2xl text-amber-400/60">!</span>
                    </div>

                    <div class="summary-card red flex items-center justify-between">
                      <div>
                        <p class="text-xs font-semibold text-red-400">
                          Out of Stock
                        </p>
                        <p class="mt-1 text-xl font-bold text-white">
                          {{ outOfStockCount }}
                        </p>
                      </div>
                      <span class="text-2xl text-red-400/60">×</span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>


          <!-- =========================
               PRODUCTS LIST
          ========================== -->

          <section
            v-if="activeSection === 'products'"
            class="animate-fade-up"
          >

            <div class="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>
                <p class="page-label">Management</p>

                <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                  Product Inventory
                </h2>

                <p class="mt-2 text-sm text-gray-500">
                  Search, filter, edit, and delete products in your system.
                </p>
              </div>

              <button
                type="button"
                @click="navigate('add')"
                class="primary-button w-full sm:w-auto"
              >
                ＋ Add New Product
              </button>

            </div>

            <ProductList
              :products="products"
              @edit="startEdit"
              @delete="deleteProduct"
              @add-product="navigate('add')"
            />

          </section>


          <!-- =========================
               ADD / EDIT PRODUCT
          ========================== -->

          <section
            v-if="activeSection === 'add'"
            class="animate-fade-up"
          >

            <div class="mb-7">
              <p class="page-label">
                {{ editingProduct ? 'Edit Record' : 'Create Record' }}
              </p>

              <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                {{ editingProduct ? 'Edit Product' : 'Add Product' }}
              </h2>

              <p class="mt-2 text-sm text-gray-500">
                {{ editingProduct ? 'Update existing product information.' : 'Fill in the details below to register a new product.' }}
              </p>
            </div>

            <ProductForm
              :editing-product="editingProduct"
              @save="saveProduct"
              @cancel="cancelEdit"
            />

          </section>


          <!-- =========================
               REPORTS
          ========================== -->

          <section
            v-if="activeSection === 'reports'"
            class="animate-fade-up"
          >

            <div class="mb-7">
              <p class="page-label">Analytics</p>

              <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                Inventory Reports
              </h2>

              <p class="mt-2 text-sm text-gray-500">
                A summary of inventory statistics and stock distributions.
              </p>
            </div>

            <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

              <div class="dashboard-card">
                <div class="mb-4 flex items-center justify-between">
                  <h3 class="font-bold text-gray-300">Total Units</h3>
                  <div class="stat-icon purple !h-10 !w-10 !text-base">▥</div>
                </div>

                <p class="text-3xl font-extrabold text-white">
                  {{ totalQuantity }}
                </p>

                <p class="mt-2 text-xs text-gray-500">
                  Combined items across all product entries
                </p>
              </div>

              <div class="dashboard-card">
                <div class="mb-4 flex items-center justify-between">
                  <h3 class="font-bold text-gray-300">Categories Count</h3>
                  <div class="stat-icon blue !h-10 !w-10 !text-base">◇</div>
                </div>

                <p class="text-3xl font-extrabold text-white">
                  {{ categorySummary.length }}
                </p>

                <p class="mt-2 text-xs text-gray-500">
                  Unique categories currently registered
                </p>
              </div>

              <div class="dashboard-card sm:col-span-2 xl:col-span-1">
                <div class="mb-4 flex items-center justify-between">
                  <h3 class="font-bold text-gray-300">Stock Availability</h3>
                  <div class="stat-icon orange !h-10 !w-10 !text-base">✓</div>
                </div>

                <p class="text-3xl font-extrabold text-white">
                  {{ products.length ? Math.round((inStockCount / products.length) * 100) : 0 }}%
                </p>

                <p class="mt-2 text-xs text-gray-500">
                  Percentage of products currently in stock
                </p>
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

            <div class="mb-7">
              <p class="page-label">Grouping</p>

              <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                Product Categories
              </h2>

              <p class="mt-2 text-sm text-gray-500">
                Breakdown of products by assigned category.
              </p>
            </div>

            <div
              v-if="categorySummary.length"
              class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >

              <div
                v-for="cat in categorySummary"
                :key="cat.name"
                class="dashboard-card flex items-center justify-between"
              >
                <div>
                  <h3 class="text-lg font-bold text-white">
                    {{ cat.name }}
                  </h3>

                  <p class="mt-1 text-xs text-gray-500">
                    {{ cat.count }} product{{ cat.count > 1 ? 's' : '' }}
                  </p>
                </div>

                <div class="category-badge">
                  {{ cat.count }} items
                </div>
              </div>

            </div>

            <div
              v-else
              class="dashboard-card text-center p-12"
            >
              <p class="text-gray-400">No categories found yet.</p>
            </div>

          </section>


          <!-- =========================
               SETTINGS
          ========================== -->

          <section
            v-if="activeSection === 'settings'"
            class="animate-fade-up"
          >

            <div class="mb-7">
              <p class="page-label">Configuration</p>

              <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
                System Settings
              </h2>

              <p class="mt-2 text-sm text-gray-500">
                Manage system data and local storage settings.
              </p>
            </div>

            <div class="grid gap-6 md:grid-cols-2">

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

        </main>

        <AppFooter />

      </div>

    </div>

    <!-- Toast Notification -->
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
import AuthView from './components/AuthView.vue'


const STORAGE_KEY = 'saban-module7-products'
const USERS_STORAGE_KEY = 'saban-module7-users'
const SESSION_STORAGE_KEY = 'saban-module7-current-user'


const products = ref([])
const editingProduct = ref(null)
const menuOpen = ref(false)
const activeSection = ref('dashboard')
const message = ref('')
const messageType = ref('success')

/* Auth State */
const currentUser = ref(null)
const isAuthenticated = ref(false)


const userFirstName = computed(() => {
  if (!currentUser.value || !currentUser.value.fullName) return 'John'
  return currentUser.value.fullName.trim().split(' ')[0]
})

const userInitials = computed(() => {
  if (!currentUser.value || !currentUser.value.fullName) return 'JS'
  const names = currentUser.value.fullName.trim().split(' ')
  if (names.length === 1) return names[0].charAt(0).toUpperCase()
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
})


/* SHA-256 string hashing helper for seed user */
async function hashString(str) {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

async function initSeedUsers() {
  const existingUsers = localStorage.getItem(USERS_STORAGE_KEY)
  if (!existingUsers || JSON.parse(existingUsers).length === 0) {
    const defaultPasswordHash = await hashString('Saban@2026!')
    const seedUser = {
      id: 1,
      fullName: 'John Lloyd Saban',
      studentId: 'BSCS 3A',
      email: 'john@saban.edu.ph',
      passwordHash: defaultPasswordHash,
      createdAt: new Date().toISOString()
    }
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([seedUser]))
  }
}

function checkAuthSession() {
  const savedSession = localStorage.getItem(SESSION_STORAGE_KEY)
  if (savedSession) {
    try {
      currentUser.value = JSON.parse(savedSession)
      isAuthenticated.value = true
    } catch {
      currentUser.value = null
      isAuthenticated.value = false
    }
  } else {
    isAuthenticated.value = false
  }
}

function handleLoginSuccess(user) {
  currentUser.value = user
  isAuthenticated.value = true
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user))
  showMessage(`Welcome back, ${user.fullName}!`, 'success')
}

function logout() {
  localStorage.removeItem(SESSION_STORAGE_KEY)
  currentUser.value = null
  isAuthenticated.value = false
  menuOpen.value = false
  activeSection.value = 'dashboard'
  showMessage('Logged out successfully.', 'success')
}


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
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    products.value = []
    return
  }

  try {
    const parsed = JSON.parse(saved)

    if (Array.isArray(parsed)) {
      products.value = parsed
    } else {
      products.value = []
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    products.value = []
    localStorage.removeItem(STORAGE_KEY)
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

onMounted(async () => {
  await initSeedUsers()
  checkAuthSession()
  loadFromLocalStorage()
})

</script>