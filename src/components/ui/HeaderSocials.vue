<template>
  <div class="flex space-x-4">
    <a
      v-for="social in socials"
      :key="social.name"
      :href="social.href"
      target="_blank"
      rel="noopener noreferrer"
      class="text-gray-400 hover:text-white"
      :aria-label="social.name"
    >
      <font-awesome-icon :icon="social.icon" class="size-6" />
    </a>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGithub, faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons';

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/JezSonic',
    icon: faGithub,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jezsonic/', // Assuming this is the correct LinkedIn, can be updated
    icon: faLinkedin,
  },
  {
    name: 'Discord',
    href: 'https://discord.com/users/240433354999660544',
    icon: faDiscord,
  },
  // Add other social links here if needed
];
</script>

<style scoped>
/* Add any specific styles for HeaderSocials.vue if needed */
</style>
