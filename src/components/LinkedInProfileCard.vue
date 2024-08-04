<script setup lang="ts">
import img from '@/assets/img/core-img/linkedinimg.webp'
</script>

<template>
  <div class="linkedIn-main">
    <div class="linkedIn-header"><span class="linkedIn-sr-only">LinkedIn</span>
      <div class="linkedIn-header-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 21" preserveAspectRatio="xMinYMin meet" version="1.1"
             focusable="false">
          <g class="inbug" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path
                d="M19.479,0 L1.583,0 C0.727,0 0,0.677 0,1.511 L0,19.488 C0,20.323 0.477,21 1.333,21 L19.229,21 C20.086,21 21,20.323 21,19.488 L21,1.511 C21,0.677 20.336,0 19.479,0"
                class="bug-text-color" transform="translate(63.000000, 0.000000)"></path>
            <path
                d="M82.479,0 L64.583,0 C63.727,0 63,0.677 63,1.511 L63,19.488 C63,20.323 63.477,21 64.333,21 L82.229,21 C83.086,21 84,20.323 84,19.488 L84,1.511 C84,0.677 83.336,0 82.479,0 Z M71,8 L73.827,8 L73.827,9.441 L73.858,9.441 C74.289,8.664 75.562,7.875 77.136,7.875 C80.157,7.875 81,9.479 81,12.45 L81,18 L78,18 L78,12.997 C78,11.667 77.469,10.5 76.227,10.5 C74.719,10.5 74,11.521 74,13.197 L74,18 L71,18 L71,8 Z M66,18 L69,18 L69,8 L66,8 L66,18 Z M69.375,4.5 C69.375,5.536 68.536,6.375 67.5,6.375 C66.464,6.375 65.625,5.536 65.625,4.5 C65.625,3.464 66.464,2.625 67.5,2.625 C68.536,2.625 69.375,3.464 69.375,4.5 Z"
                class="background" fill="#0a66c2"></path>
          </g>
          <g class="linkedIn-header-icon-text">
            <path
                d="M60,18 L57.2,18 L57.2,16.809 L57.17,16.809 C56.547,17.531 55.465,18.125 53.631,18.125 C51.131,18.125 48.978,16.244 48.978,13.011 C48.978,9.931 51.1,7.875 53.725,7.875 C55.35,7.875 56.359,8.453 56.97,9.191 L57,9.191 L57,3 L60,3 L60,18 Z M54.479,10.125 C52.764,10.125 51.8,11.348 51.8,12.974 C51.8,14.601 52.764,15.875 54.479,15.875 C56.196,15.875 57.2,14.634 57.2,12.974 C57.2,11.268 56.196,10.125 54.479,10.125 L54.479,10.125 Z"
                fill="#0a66c2"></path>
            <path
                d="M47.6611,16.3889 C46.9531,17.3059 45.4951,18.1249 43.1411,18.1249 C40.0001,18.1249 38.0001,16.0459 38.0001,12.7779 C38.0001,9.8749 39.8121,7.8749 43.2291,7.8749 C46.1801,7.8749 48.0001,9.8129 48.0001,13.2219 C48.0001,13.5629 47.9451,13.8999 47.9451,13.8999 L40.8311,13.8999 L40.8481,14.2089 C41.0451,15.0709 41.6961,16.1249 43.1901,16.1249 C44.4941,16.1249 45.3881,15.4239 45.7921,14.8749 L47.6611,16.3889 Z M45.1131,11.9999 C45.1331,10.9449 44.3591,9.8749 43.1391,9.8749 C41.6871,9.8749 40.9121,11.0089 40.8311,11.9999 L45.1131,11.9999 Z"
                fill="#0a66c2"></path>
            <polygon fill="#0a66c2"
                     points="38 8 34.5 8 31 12 31 3 28 3 28 18 31 18 31 13 34.699 18 38.241 18 34 12.533"></polygon>
            <path
                d="M16,8 L18.827,8 L18.827,9.441 L18.858,9.441 C19.289,8.664 20.562,7.875 22.136,7.875 C25.157,7.875 26,9.792 26,12.45 L26,18 L23,18 L23,12.997 C23,11.525 22.469,10.5 21.227,10.5 C19.719,10.5 19,11.694 19,13.197 L19,18 L16,18 L16,8 Z"
                fill="#0a66c2"></path>
            <path
                d="M11,18 L14,18 L14,8 L11,8 L11,18 Z M12.501,6.3 C13.495,6.3 14.3,5.494 14.3,4.5 C14.3,3.506 13.495,2.7 12.501,2.7 C11.508,2.7 10.7,3.506 10.7,4.5 C10.7,5.494 11.508,6.3 12.501,6.3 Z"
                fill="#0a66c2"></path>
            <polygon fill="#0a66c2" points="3 3 0 3 0 18 9 18 9 15 3 15"></polygon>
          </g>
        </svg>
      </div>
    </div>
    <div class="linkedIn-content">
      <img class="linkedIn-content-image" :src="img" alt="Karol Tomaszewski">
      <h3 class="linkedIn-profile-name">
        <a href="https://pl.linkedin.com/in/karol-tomaszewski-91671423b?trk=public-profile-badge-profile-badge-profile-name"
           class="linkedIn-profile-name-link">
          Karol Tomaszewski
        </a>
      </h3>
      <p class="linkedIn-profile-about">
        Student in the Zespół Szkół nr 4 im. Mikołaja Kopernika W Dębicy
      </p>
      <p class="linkedIn-profile-company">
        <a href="https://www.linkedin.com/company/kenja?trk=public-profile-badge-profile-badge_company-name"
           class="linkedIn-profile-company-link">
          Kenja K.K.
        </a>
      </p>
      <a class="linkedIn-profile-btn"
         href="https://pl.linkedin.com/in/karol-tomaszewski-91671423b?trk=public-profile-badge-profile-badge-view-profile-cta"
         target="_blank" data-tracking-control-name="public-profile-badge-profile-badge-view-profile-cta"
         data-tracking-will-navigate="">
        Go to profile
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.linkedIn {
  &-main {
    margin-left: 1px;
    width: 280px;
    background-color: #fff;
    color: #000;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 -1px 1px rgba(0,0,0,.08), 1px 0 1px rgba(0,0,0,.08), -1px 0 1px rgba(0,0,0,.08), 0 1px 1px rgba(0,0,0,.08);
    padding: 0;
  }

  &-sr-only {
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0 !important;
    height: 1px !important;
    padding: 0 !important;
    position: absolute !important;
    white-space: nowrap !important;
    width: 1px !important;
  }
  &-header {
    background-color: #e9e5df !important;
    padding: 12px 16px;
    margin: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;

    &-icon, svg, svg > g {
      color: #0a66c2 !important;
      width: 84px;
      height: 21px;
      display: inline-block;
    }
  }

  &-content {
    padding: 0 16px;

    &-image {
      margin: 12px 0 8px;
      width: 56px;
      height: 56px;
      box-sizing: border-box;
      background-clip: content-box;
      border: 2px solid transparent;
      border-radius: 50%;
      display: inline-block;
    }
  }

  &-profile {

    &-name {
      margin: 0;
      font-weight: 400;
      line-height: 1.33333;
      padding: 0 0 4px;
      color: inherit;

      &-link {
        font-size: 1rem;
        line-height: 1.5;
        font-weight: 550;
        color: rgba(0, 0, 0, .9) !important;
      }
    }

    &-about {
      padding: 0 0 4px;
      font-weight: 400;
      color: rgba(0, 0, 0, .9) !important;
    }

    &-company, &-company-link {
      line-height: 1.33333;
      font-weight: 400;
      color: rgba(0, 0, 0, .9) !important;
    }

    &-btn {
      margin: 4px 0 12px;
      background-color: transparent;
      border: 0;
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      font-weight: 600;
      font-family: inherit;
      height: 32px;
      line-height: 32px;
      overflow: hidden;
      outline-width: 2px;
      padding: 0 16px;
      position: relative;
      text-align: center;
      text-decoration: none;
      transition-duration: 167ms;
      transition-property: background-color, box-shadow, color;
      transition-timing-function: cubic-bezier(0,0,.2,1);
      vertical-align: middle;
      z-index: 0;
      box-shadow: inset 0 0 0 1px #0073b1, inset 0 0 0 2px transparent, inset 0 0 0 1px transparent !important;
      border-radius: 24px;
      color: #0a66c2 !important;
    }

    &-btn:hover {
      background-color: rgba(152, 216, 244, .25) !important;
      color: #006097 !important;
      box-shadow: inset 0 0 0 1px #0073b1, inset 0 0 0 2px #006097, inset 0 0 0 1px transparent !important;
    }
  }
}

@media (max-width: 1200px) {
  .linkedIn-main {
    min-width: 280px;
    width: 100%;
  }
}
</style>