<template>
    <button v-on="$listeners" :class="{'disabled': disabled}">
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
button {
    color: #fff;
    background: blue;
    transition: .2s;
    border-radius: 10px;
    padding: 10px 20px;
}

.disabled {
    pointer-events: none;
    background:  #809fff;
}
</style>