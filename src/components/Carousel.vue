<template>
  <div id="mobile-slider" class="splide lg:hidden my-5 z-0">
    <div class="splide__track">
      <ul class="splide__list">
        <li class="splide__slide mr-3">
          <img style="max-width: 100%;height: 300px; width: 400px;" src="@/assets/image-product-1.jpg">
        </li>
        <li class="splide__slide mr-3">
          <img style="max-width: 100%;height: 300px; width: 400px;" src="@/assets/image-product-2.jpg">
        </li>
        <li class="splide__slide mr-3">
          <img style="max-width: 100%;height: 300px; width: 400px;" src="@/assets/image-product-3.jpg">
        </li>
      </ul>
    </div>
  </div>

  <div id="desktop-slider" class="splide hidden lg:block mt-3 z-0">
    <div class="splide__track">
      <ul class="splide__list">
        <li class="splide__slide rounded-md overflow-hidden">
          <img style="max-width: 100%;height: 450px;" src="@/assets/image-product-1.jpg">
        </li>
        <li class="splide__slide rounded-md overflow-hidden">
          <img style="max-width: 100%;height: 450px;" src="@/assets/image-product-2.jpg">
        </li>
        <li class="splide__slide rounded-md overflow-hidden">
          <img style="max-width: 100%;height: 450px;" src="@/assets/image-product-3.jpg">
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

  import gsap from 'gsap'
  import Splide  from '@splidejs/splide';

  export default {
    mounted() {
      new Splide( '#mobile-slider', {
        type: 'loop',
        rewind: true,
        focus    : 'center',
        autoWidth: true,
        autoHeight: '5rem',
        padding: '0rem',
        autoplay: true,
        arrows: false
      } ).mount()

      new Splide( '#desktop-slider', {
        type: 'fade',
        rewind: true,
        focus    : 'center',
        autoWidth: true,
        autoHeight: '5rem',
        autoplay: true,
        padding: '5rem',
      } ).mount()

    },
    methods: {
      enter(el, done) {
        gsap.from(el, {
          x: 120,
          delay: -0.1,
        })
        gsap.from(el, {
          delay: -0.1,
          opacity: 0,
          onComplete: done
        })
      },
      leave(el, done) {
        gsap.to(el, {
          y: -20,
          delay: -0.2,
        })
        gsap.to(el, {
          delay: -0.2,
          opacity: 0,
          onComplete: done
        })
      },
    },
  }
</script>

<style>
  .fade-enter-active {
    transition: all .1s ease-in-out;
  }

  .fade-leave-active {
    transition: all .2s ease-in-out;
  }

  .fade-enter-from {
    opacity: .7;
  }

  .fade-leave-to {
    transform: translateX(-300px);
    opacity: 0;
  }

  .splide__slide img {
    width: 100%;
    height: auto;
  }
</style>
