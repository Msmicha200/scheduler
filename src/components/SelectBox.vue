<template>
    <div :class="{'opened-select' : opened}" class="select-container" :selected-id="selected[keyTitle]">
        <span v-if="title" class="bold input-title flex">{{ title }}</span>
        <div @click="open" :class="searchable ? '' : 'top-padding-select'" class="select-box flex align-between">
            <span class="selected-item">
                {{ selected[textTitle] || placeholder }}
            </span>
            <div class="arrow flex align-center valign-center">
                <img src="@/assets/img/select-arrow.svg" alt="">
            </div>
        </div>
        <ul class="options-list">
            <!-- <li class="empty"></li> -->
            <li v-if="!items.length">{{ emptyLabel || 'Нема вибору' }}</li>
            <li v-for="item of items"
            :key="item[keyTitle]"
            @click="select(item)"
            v-bind="$attrs">
                {{ item[textTitle].trim() }}
            </li>
        </ul>
        <span class="error-text flex" v-if="error">
            {{ error }}
        </span>
    </div>
</template>

<script>
export default {
    data: function () {
        let selectedText = '';

        if (Object.keys(this.selectedItem || {}).length > 0) {
            selectedText = (this.selectedItem[this.textTitle] || '').trim()
        }

        return {
            opened: false,
            selected: this.selectedItem || [],
            searchValue:  selectedText,
            // user: this.$store.state.cabinet.userType
        }
    },
    model: {
        event: 'click'
    },
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        emptyLabel: {
            type: String,
            default: ''
        },
        isId: {
            type: Boolean,
            default: false
        },
        items: {
            type: Array,
            default: () => ([])
        },
        keyTitle: {
            type: String,
            default: 'id'
        },
        searchable: {
            type: Boolean,
            default: false
        },
        textTitle: {
            type: String,
            default: 'title'
        },
        selectedItem: {
            type: [Object, String, Number],
            default: () => ({}) 
        },
        error: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        open() {
            this.opened = !this.opened ? true: false;
        },
        select(item) {
            if (this.isId) {
                this.$emit('click', item[this.keyTitle]);
            }
            else {
                this.$emit('click', item);
            }

            this.$emit('on-select', item);
            this.selected = item;
            this.opened = false;
            this.searchValue = item[this.textTitle].trim();
        },
        close(event) {
            if (!this.$el.contains(event.target)) {
                this.opened = false
            }
        }
    },
    computed: {
        searched () {
            return this.items.filter(item => {
                if (item[this.textTitle].toLowerCase()
                .indexOf(this.searchValue.toLowerCase()) !== -1) {
                    return item;
                }
            })
        }
    },
    mounted: function () {
        document.addEventListener('click', this.close);
    },
    created: function () {

    }
}
</script>

<style scoped>
.top-padding-select {
    padding-top: 16px;
    padding-bottom: 16px;
}

input {
    width: 100%;
}

.input-title {
    /* margin-left: 20px; */
    padding: 3px 20px;
}

.select-container {
    position: relative;
    /* z-index: 3; */
}

.error-text {
    color: #DB3636;
    font-weight: bold;
    margin-left: 20px;
    opacity: 0;
    transition: .3s;
    margin-top: 5px;
    visibility: hidden;
}

.invalid .error-text {
    opacity: 1;
    visibility: visible;
}

.invalid-notext .select-box {
    border-color: #DB3636;
}

.select-box {
    transition: .3s;
    font-family: Roboto-light;
    position: relative;
    border: 2px solid #f4f4f4;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
    background: #fff;
    width: 100%;
    /* z-index: 999; */
}

.empty {
    padding: 13px 0 !important;    
}

/* .options-list li:not(:first-child):hover {
    background: #FFE300;
} */

.options-list li:hover {
    background: blue;
    color: #fff;
}

.options-list li {
    transition: .2s;
    user-select: none;
    padding: 10px 20px;
}

.options-list {
    max-height: 300px;
    transform-origin: top center;
    transform: scaleY(0);
    position: absolute;
    overflow: auto;
    width: 100%;
    /* top: 35px; */
    cursor: pointer;
    border-radius: 10px;
    transition: .2s;
    z-index: 998;
    background: #fff;
}

.opened-select .options-list {
    transform: scaleY(1);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
}

.arrow {
    transition: .2s;
    user-select: none;
}

.opened-select .arrow {
    transform: rotate(180deg);
}

.selected-item {
    width: 100%;
    height: 100%;
    user-select: none;
}
</style>
