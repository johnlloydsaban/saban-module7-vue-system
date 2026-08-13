<template>
  <header
    class="sticky top-0 z-30 border-b border-white/10 bg-[#090708]/90 backdrop-blur-xl"
  >

    <div class="flex h-20 items-center justify-between px-5 sm:px-8">

      <div class="flex items-center gap-4">

        <!-- Mobile Hamburger -->
        <button
          type="button"
          @click="$emit('toggle-menu')"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-xl text-gray-300 transition duration-300 hover:border-[#991b3a]/50 hover:bg-[#7f1d32]/10 hover:text-white active:scale-90 lg:hidden"
        >
          ☰
        </button>

        <!-- Desktop Hamburger -->
        <button
          type="button"
          @click="$emit('toggle-menu')"
          class="hidden text-2xl text-gray-400 transition hover:text-white lg:block"
        >
          ☰
        </button>

        <div>

          <h1 class="text-xl font-bold sm:text-2xl">
            Inventory Management System
          </h1>

          <p class="hidden text-sm text-gray-500 sm:block">
            Manage your products and inventory in one place.
          </p>

        </div>

      </div>

      <div class="flex items-center gap-3">

        <div
          class="hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 sm:block"
        >
          {{ currentDate }}
        </div>

        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-300 transition duration-300 hover:rotate-45 hover:border-[#991b3a]/50 hover:text-[#c85d78]"
        >
          ☼
        </button>

      </div>

    </div>

  </header>
</template>


<script setup>

defineEmits(['toggle-menu'])

const currentDate =
  new Date().toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
  )

</script>