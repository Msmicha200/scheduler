<template>
    <div class="input-container full-w">
        <span v-if="title" class="bold title-container">
            {{ title }}
        </span>
        <div class="input flex valign-center">
            <input v-on="{...$listeners, input: event => $emit('input', event.target.value.trim())}" 
            required class="full-w light" v-bind="$attrs">
            <span class="placeholder light">
                {{ placeholder }}
            </span>
        </div>
        <span v-if="error" class="error-container bold">
            {{ error }}
        </span>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        title: {
            type: [String, Boolean],
            default: false
        },
        error: {
            type: [String, Boolean],
            default: false
        },
        placeholder: {
            type: String,
            default: 'Placeholder'
        }
    }
}
</script>

<style scoped>
.input-container {
    max-width: 350px;
    position: relative;
}

.input-container {
    --padding: 25px
}

.title-container {
    display: block;
    padding: 3px var(--padding);
}

.input input {
    padding: 15px var(--padding);
    transition: .2s;
    border-radius: 10px;
    border: 2px solid #f4f4f4;
}

.invalid-notext input {
    border-color: red;
}

.invalid .error-container {
    opacity: 1;
    visibility: visible;
}

.error-container {
    display: block;
    opacity: 0;
    visibility: hidden;
    padding: 3px var(--padding);
    transition: .2s;
    color: #DB3636;
}

.placeholder {
    position: absolute;
    left: var(--padding);
    color: #5A636B;
    pointer-events: none;
    transition: .2s;
    user-select: none;
}

.input input:valid +.placeholder { 
    left: calc(var(--padding) + 25px);
    opacity: 0;
}
</style>
