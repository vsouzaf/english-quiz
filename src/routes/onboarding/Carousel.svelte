<script lang="ts">
import { onMount, createEventDispatcher } from 'svelte';
import Siema from 'siema';

export let perPage = 1;
export let loop = true;
export let autoplay = 0;
export let duration = 200;
export let easing = 'ease-out';
export let startIndex = 0;
export let draggable = true;
export let multipleDrag = true;
export let dots = true;
export let controls = true;
export let threshold = 20;
export let rtl = false;

let currentIndex = startIndex;
let siema: HTMLElement;
let controller: any;
let timer: any;

$: pips = controller ? controller.innerElements : [];
$: currentPerPage = controller ? controller.perPage : perPage;
$: totalDots = controller ? Math.ceil(controller.innerElements.length / currentPerPage) : [];

onMount(() => {
  controller = new Siema({
    selector: siema,
    perPage: typeof perPage === 'object' ? perPage : Number(perPage),
    loop,
    duration,
    easing,
    startIndex,
    draggable,
    multipleDrag,
    threshold,
    rtl,
    onChange: handleChange
  });

  if (autoplay) {
    timer = setInterval(right, autoplay);
  }

  return () => {
    autoplay && clearInterval(timer);
    controller.destroy();
  };
});

function isDotActive(currentIndex: number, dotIndex: number) {
  if (currentIndex < 0) currentIndex = pips.length + currentIndex;
  return currentIndex >= dotIndex * currentPerPage && currentIndex < (dotIndex * currentPerPage) + currentPerPage;
}

function left() {
  controller.prev();
}

function right() {
  controller.next();
}

function go(index: number) {
  controller.goTo(index);
}

function pause() {
  clearInterval(timer);
}

function resume() {
  if (autoplay) {
    timer = setInterval(right, autoplay);
  }
}

function handleChange() {
  currentIndex = controller.currentSlide;
}

function resetInterval(node: HTMLElement, condition: boolean) {
  function handleReset() {
    pause();
    resume();
  }

  if (condition) {
    node.addEventListener('click', handleReset);
  }

  return {
    destroy() {
      node.removeEventListener('click', handleReset);
    }
  };
}
</script>

<div class="carousel">
  <div class="slides" bind:this={siema}>
    <slot />
  </div>

  {#if controls}
    <button class="left" on:click={left} use:resetInterval={autoplay} aria-label="left">
      <slot name="left-control">←</slot>
    </button>
    <button class="right" on:click={right} use:resetInterval={autoplay} aria-label="right">
      <slot name="right-control">→</slot>
    </button>
  {/if}

  {#if dots}
    <ul>
      {#each { length: totalDots } as _, i}
        <li on:click={() => go(i * currentPerPage)} class={isDotActive(currentIndex, i) ? "active" : ""}></li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  button {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    z-index: 50;
    margin-top: -20px;
    border: none;
    background-color: transparent;
  }

  button:focus {
    outline: none;
  }

  .left {
    left: 2vw;
  }

  .right {
    right: 2vw;
  }

  ul {
    list-style-type: none;
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: -30px;
    padding: 0;
  }

  ul li {
    margin: 6px;
    border-radius: 100%;
    background-color: rgba(255,255,255,0.5);
    height: 8px;
    width: 8px;
  }

  ul li:hover {
    background-color: rgba(255,255,255,0.85);
  }

  ul li.active {
    background-color: rgba(255,255,255,1);
  }
</style>