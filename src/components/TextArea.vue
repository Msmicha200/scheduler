<template>
    <div class="flex dir-col full-w area-container">
        <span v-if="title" class="area-title bold">
            {{ title }}
        </span>
        <div class="area">
            <textarea required v-bind="$attrs" @input="$emit('input', $event.target.value)" :maxlength="maxLength"></textarea>
            <span class="placeholder light" v-if="placeholder">{{ placeholder }}</span>
        </div>
        <p>
            <span v-if="error" class="error-text flex">{{ error }}</span>
        </p>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    model: {
        event: 'input'
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        maxLength: {
            type: String,
            default: '300'
        },
        error: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
textarea {
    height: 100%;
    resize: none;
    border: 2px solid #CFCFCF;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
}

.area-container {
    height: 100%;
    max-width: 350px;
}

.area-title {
    padding: 3px 20px;
}

.error-text {
    color: #DB3636;
    font-weight: bold;
    /* margin-left: 20px; */
    opacity: 0;
    transition: .3s;
    visibility: hidden;
    padding: 0 25px;
}

.area-labels {
    margin-top: 5px;
}

.length-label {
    color: #5A636B;
}

.invalid .error-text {
    opacity: 1;
    visibility: visible;
}

.invalid-notext textarea {
    border-color: red;
}

.area {
    position: relative;
}

.placeholder {
    position: absolute;
    top: 20px;
    left: 20px;
    color: #5A636B;
}

.placeholder {
    transition: .2s;
}

textarea:valid +.placeholder {
    opacity: 0;
    left: 40px;
}
</style>