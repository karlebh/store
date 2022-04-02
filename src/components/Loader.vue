<template>
  <div class="flex justify-center items-center fixed inset-0 h-full w-full bg-gray-200 dark:bg-gray-800 overlay">
    <div class="loader "></div>
  </div>
</template>

<style scope>
  .overlay {
    z-index: 100;
  }
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #ff7d1a;
    border-radius: 50%;
    width: 250px;
    height: 250px;
    animation: spin .5s linear infinite;
  }

  @media screen and (max-width: 500px) {
    .loader {
      width: 100px;
      height: 100px;
      animation: spin .3s linear infinite;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>