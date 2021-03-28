<template>
    <DefaultLayout>
        <section class="container">
            <div class="new-note-container">
                <Input placeholder="Введіть назву" title="Назва" />
                <div class="select-box-container">
                    <SelectBox title="Статус" 
                    :items="statuses" 
                    keyTitle="id" 
                    textTitle="title"
                    placeholder="Оберіть статус" />
                </div>
                <TextArea :maxLength="2000" title="Пояснення" placeholder="Введіть текст замітки" />
            </div>
        </section>
        <section class="container">
            
        </section>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue';
import axios from 'axios';

import SelectBox from '@/components/SelectBox.vue';
import Input from '@/components/Input.vue';
import TextArea from '@/components/TextArea.vue';

export default {
    data: function() {
        return {
            statuses: []
        }
    },
    components: {
        DefaultLayout,
        SelectBox,
        Input,
        TextArea
    },
    created: function() {
        axios.get('/statuses')
        .then(result => {
            if (result.data.length) {
                this.statuses = result.data;
            }
        });
    }
}
</script>

<style scoped src="@/assets/css/index.css"></style>