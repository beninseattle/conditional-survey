<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useInterfaceStore } from '@/stores/interface';
import { signIn } from '@/auth/authService';
import { validateSignInForm } from '@/utils/validators';

const interfaceStore = useInterfaceStore();
const router = useRouter();

const username = ref('');
const password = ref('');

function userSignIn() {
  // runs form validation code
  if (!isLoginFormValid()) {
    return;
  }

  let authDetails;
  try {
    authDetails = signIn(username.value, password.value);
    if (!authDetails) {
      throw new Error(authDetails);
    }
  } catch (error) {
    console.log('login failed error: ', error);
  }

  if (authDetails) {
    console.log('login success: ', authDetails);
    interfaceStore.setIsLoggedIn(true);
  }

  router.push('/');
}

function isLoginFormValid() {
  const validationData = validateSignInForm({
    username: username.value,
    password: password.value
  });

  if (!validationData.valid) {
    console.log('form validation failed');
    return false;
  }

  return true;
}
</script>

<template>
  <div>
    <div>
      <div>Sign In</div>
      <div>
        <form @submit.prevent="userSignIn">
          <div class="mb-3 text-start">
            <label for="name" class="form-label">Username</label>
            <input type="text" id="username" v-model="username" />
          </div>
          <div class="mb-3 text-start">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" />
          </div>
          <div>
            <button>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
