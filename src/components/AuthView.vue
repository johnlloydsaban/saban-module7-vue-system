<template>
  <div class="flex min-h-[85vh] items-center justify-center p-4 sm:p-6 lg:p-8">
    <div class="w-full max-w-md animate-fade-up">
      
      <!-- Card Container -->
      <div class="dashboard-card overflow-hidden !p-0">
        
        <!-- Header / Logo Banner -->
        <div class="border-b border-white/10 bg-gradient-to-r from-[#170b0f] via-[#100a0d] to-[#1a0e12] p-6 text-center sm:p-8">
          <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#991b3a] to-[#6f172d] text-2xl font-bold shadow-lg shadow-red-950/40">
            ◈
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-white">
            {{ isLogin ? 'Welcome Back' : 'Create an Account' }}
          </h2>
          <p class="mt-1 text-xs text-gray-400">
            {{ isLogin ? 'Sign in to access your inventory system' : 'Fill in your details to get started' }}
          </p>

          <!-- Tab Switcher -->
          <div class="mt-6 grid grid-cols-2 rounded-xl border border-white/10 bg-white/[0.03] p-1">
            <button
              type="button"
              @click="switchTab(true)"
              class="rounded-lg py-2.5 text-xs font-semibold transition duration-200"
              :class="isLogin ? 'bg-[#991b3a] text-white shadow-md' : 'text-gray-400 hover:text-white'"
            >
              Sign In
            </button>
            <button
              type="button"
              @click="switchTab(false)"
              class="rounded-lg py-2.5 text-xs font-semibold transition duration-200"
              :class="!isLogin ? 'bg-[#991b3a] text-white shadow-md' : 'text-gray-400 hover:text-white'"
            >
              Register
            </button>
          </div>
        </div>

        <!-- Form Body -->
        <div class="p-6 sm:p-8 space-y-5">

          <!-- Alert / Error message -->
          <div
            v-if="errorMessage"
            class="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs text-red-400"
          >
            <span class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold">!</span>
            <span>{{ errorMessage }}</span>
          </div>

          <div
            v-if="successMessage"
            class="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-3.5 text-xs text-green-400"
          >
            <span class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs font-bold">✓</span>
            <span>{{ successMessage }}</span>
          </div>

          <!-- LOGIN FORM -->
          <form v-if="isLogin" @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label class="form-label" for="login-email">Email or Student ID</label>
              <input
                id="login-email"
                v-model="loginForm.identifier"
                type="text"
                required
                placeholder="e.g. john@saban.edu.ph or BSCS 3A"
                class="dark-input"
              />
            </div>

            <div>
              <label class="form-label" for="login-password">Password</label>
              <div class="relative">
                <input
                  id="login-password"
                  v-model="loginForm.password"
                  :type="showLoginPassword ? 'text' : 'password'"
                  required
                  placeholder="Enter your password"
                  class="dark-input pr-10"
                />
                <button
                  type="button"
                  @click="showLoginPassword = !showLoginPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-sm"
                >
                  {{ showLoginPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="primary-button w-full flex items-center justify-center gap-2 mt-2"
            >
              <span v-if="loading" class="animate-spin text-sm">↻</span>
              <span>{{ loading ? 'Signing in...' : 'Sign In to Dashboard →' }}</span>
            </button>
          </form>


          <!-- REGISTER FORM -->
          <form v-else @submit.prevent="handleRegister" class="space-y-4">
            <div>
              <label class="form-label" for="reg-fullname">Full Name</label>
              <input
                id="reg-fullname"
                v-model="regForm.fullName"
                type="text"
                required
                placeholder="e.g. John Lloyd Saban"
                class="dark-input"
              />
            </div>

            <div>
              <label class="form-label" for="reg-student-id">Student ID / Course</label>
              <input
                id="reg-student-id"
                v-model="regForm.studentId"
                type="text"
                required
                placeholder="e.g. BSCS 3A"
                class="dark-input"
              />
            </div>

            <div>
              <label class="form-label" for="reg-email">Email Address</label>
              <input
                id="reg-email"
                v-model="regForm.email"
                type="email"
                required
                placeholder="e.g. john@saban.edu.ph"
                class="dark-input"
              />
            </div>

            <div>
              <label class="form-label" for="reg-password">Secured Password</label>
              <div class="relative">
                <input
                  id="reg-password"
                  v-model="regForm.password"
                  :type="showRegPassword ? 'text' : 'password'"
                  required
                  placeholder="Create a strong password"
                  class="dark-input pr-10"
                />
                <button
                  type="button"
                  @click="showRegPassword = !showRegPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-sm"
                >
                  {{ showRegPassword ? '🙈' : '👁️' }}
                </button>
              </div>

              <!-- Password Strength Bar -->
              <div v-if="regForm.password" class="mt-2 space-y-1.5">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-gray-400">Security Strength:</span>
                  <span
                    class="font-semibold"
                    :class="{
                      'text-red-400': strengthScore < 40,
                      'text-yellow-400': strengthScore >= 40 && strengthScore < 80,
                      'text-green-400': strengthScore >= 80
                    }"
                  >
                    {{ strengthLabel }}
                  </span>
                </div>
                <div class="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    class="h-full transition-all duration-300"
                    :style="{ width: strengthScore + '%' }"
                    :class="{
                      'bg-red-500': strengthScore < 40,
                      'bg-yellow-500': strengthScore >= 40 && strengthScore < 80,
                      'bg-green-500': strengthScore >= 80
                    }"
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <label class="form-label" for="reg-confirm-password">Confirm Password</label>
              <div class="relative">
                <input
                  id="reg-confirm-password"
                  v-model="regForm.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  placeholder="Re-enter your password"
                  class="dark-input pr-10"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-sm"
                >
                  {{ showConfirmPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <!-- Password Security Checklist -->
            <div class="rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-1.5">
              <p class="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Password Requirements:
              </p>
              <div class="grid grid-cols-2 gap-1 text-[11px]">
                <div class="flex items-center gap-1.5" :class="hasMinLength ? 'text-green-400' : 'text-gray-500'">
                  <span>{{ hasMinLength ? '✓' : '○' }}</span> At least 8 characters
                </div>
                <div class="flex items-center gap-1.5" :class="hasUppercase ? 'text-green-400' : 'text-gray-500'">
                  <span>{{ hasUppercase ? '✓' : '○' }}</span> Uppercase letter (A-Z)
                </div>
                <div class="flex items-center gap-1.5" :class="hasLowercase ? 'text-green-400' : 'text-gray-500'">
                  <span>{{ hasLowercase ? '✓' : '○' }}</span> Lowercase letter (a-z)
                </div>
                <div class="flex items-center gap-1.5" :class="hasNumber ? 'text-green-400' : 'text-gray-500'">
                  <span>{{ hasNumber ? '✓' : '○' }}</span> Number (0-9)
                </div>
                <div class="flex items-center gap-1.5" :class="hasSpecialChar ? 'text-green-400' : 'text-gray-500'">
                  <span>{{ hasSpecialChar ? '✓' : '○' }}</span> Special character
                </div>
                <div class="flex items-center gap-1.5" :class="passwordsMatch ? 'text-green-400' : 'text-gray-500'">
                  <span>{{ passwordsMatch ? '✓' : '○' }}</span> Passwords match
                </div>
              </div>
            </div>

            <button
              type="submit"
              :disabled="loading || !isPasswordValid"
              class="primary-button w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="animate-spin text-sm">↻</span>
              <span>{{ loading ? 'Creating Account...' : 'Complete Registration →' }}</span>
            </button>
          </form>

        </div>

        <!-- Card Footer -->
        <div class="border-t border-white/10 bg-[#0d080a] p-4 text-center text-xs text-gray-500">
          <span v-if="isLogin">
            Need an account?
            <button type="button" @click="switchTab(false)" class="font-semibold text-[#c85d78] hover:underline">
              Register here
            </button>
          </span>
          <span v-else>
            Already registered?
            <button type="button" @click="switchTab(true)" class="font-semibold text-[#c85d78] hover:underline">
              Sign in now
            </button>
          </span>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['login-success'])

const isLogin = ref(true)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const showLoginPassword = ref(false)
const showRegPassword = ref(false)
const showConfirmPassword = ref(false)

const loginForm = ref({
  identifier: '',
  password: ''
})

const regForm = ref({
  fullName: '',
  studentId: '',
  email: '',
  password: '',
  confirmPassword: ''
})

/* Helper: SHA-256 Password Hash */
async function hashPassword(plainTextPassword) {
  const encoder = new TextEncoder()
  const data = encoder.encode(plainTextPassword)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/* Password Validation Requirements */
const hasMinLength = computed(() => regForm.value.password.length >= 8)
const hasUppercase = computed(() => /[A-Z]/.test(regForm.value.password))
const hasLowercase = computed(() => /[a-z]/.test(regForm.value.password))
const hasNumber = computed(() => /[0-9]/.test(regForm.value.password))
const hasSpecialChar = computed(() => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(regForm.value.password))
const passwordsMatch = computed(() => 
  regForm.value.password !== '' && regForm.value.password === regForm.value.confirmPassword
)

const isPasswordValid = computed(() => 
  hasMinLength.value &&
  hasUppercase.value &&
  hasLowercase.value &&
  hasNumber.value &&
  hasSpecialChar.value &&
  passwordsMatch.value
)

/* Password Strength Calculation */
const strengthScore = computed(() => {
  const pwd = regForm.value.password
  if (!pwd) return 0
  let score = 0
  if (pwd.length >= 8) score += 20
  if (pwd.length >= 12) score += 10
  if (/[A-Z]/.test(pwd)) score += 20
  if (/[a-z]/.test(pwd)) score += 15
  if (/[0-9]/.test(pwd)) score += 15
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) score += 20
  return Math.min(100, score)
})

const strengthLabel = computed(() => {
  if (strengthScore.value < 40) return 'Weak'
  if (strengthScore.value < 80) return 'Moderate'
  return 'Strong & Secure'
})

function switchTab(loginTab) {
  isLogin.value = loginTab
  errorMessage.value = ''
  successMessage.value = ''
}

/* Helper: Load/Save Users */
function getUsersFromStorage() {
  const data = localStorage.getItem('saban-module7-users')
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

function saveUsersToStorage(users) {
  localStorage.setItem('saban-module7-users', JSON.stringify(users))
}

/* HANDLE LOGIN */
async function handleLogin() {
  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true

  try {
    const inputIdentifier = loginForm.value.identifier.trim().toLowerCase()
    const hashedInputPassword = await hashPassword(loginForm.value.password)

    const users = getUsersFromStorage()
    
    const matchedUser = users.find(u => 
      (u.email.toLowerCase() === inputIdentifier || u.studentId.toLowerCase() === inputIdentifier) &&
      u.passwordHash === hashedInputPassword
    )

    if (!matchedUser) {
      errorMessage.value = 'Invalid email/student ID or password. Please try again.'
      loading.value = false
      return
    }

    // Success
    successMessage.value = 'Login successful! Redirecting...'
    setTimeout(() => {
      emit('login-success', matchedUser)
    }, 600)
  } catch (err) {
    errorMessage.value = 'An unexpected error occurred during sign in.'
  } finally {
    loading.value = false
  }
}

/* HANDLE REGISTER */
async function handleRegister() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!isPasswordValid.value) {
    errorMessage.value = 'Please ensure your password satisfies all security requirements.'
    return
  }

  loading.value = true

  try {
    const users = getUsersFromStorage()

    const emailTrimmed = regForm.value.email.trim().toLowerCase()
    const studentIdTrimmed = regForm.value.studentId.trim()

    // Check if email or student ID exists
    const existingUser = users.find(u => 
      u.email.toLowerCase() === emailTrimmed || u.studentId.toLowerCase() === studentIdTrimmed.toLowerCase()
    )

    if (existingUser) {
      errorMessage.value = 'An account with this email or student ID already exists.'
      loading.value = false
      return
    }

    const hashedPassword = await hashPassword(regForm.value.password)

    const newUser = {
      id: Date.now(),
      fullName: regForm.value.fullName.trim(),
      studentId: studentIdTrimmed,
      email: emailTrimmed,
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    saveUsersToStorage(users)

    successMessage.value = 'Account registered successfully! Redirecting to your dashboard...'
    
    setTimeout(() => {
      emit('login-success', newUser)
    }, 800)

  } catch (err) {
    errorMessage.value = 'Failed to register account. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
