<template>
    <DefaultLayout>
        <section class="container">
            <div class="new-note-container">
                <Input placeholder="Введіть назву" 
                title="Назва"
                v-model="$v.task.title.$model"
                :class="{'invalid-notext': $v.task.title.$error}" />
                <div class="select-box-container">
                    <SelectBox title="Статус" 
                    :items="statuses" 
                    keyTitle="_id"
                    v-model="$v.task.status.$model"
                    :class="{'invalid-notext': $v.task.status.$error}"
                    textTitle="title"
                    placeholder="Оберіть статус" />
                </div>
                <TextArea maxLength="2000" 
                title="Пояснення" 
                placeholder="Введіть текст замітки"
                :class="{'invalid-notext': $v.task.description.$error}"
                v-model="$v.task.description.$model" />
                <div class="full-w flex align-end button-container">
                    <DefaultButton @click="addTask">
                        Додати
                    </DefaultButton>
                </div>
            </div>
        </section>
        <section class="container notes-container">
            <div class="note-container" v-for="(v, idx) of $v.tasks.$each.$iter" :key="idx" @input="changed(idx)">
                <Input placeholder="Введіть назву" 
                title="Назва"
                v-model="v.title.$model"
                :class="{'invalid-notext': v.title.$error}" />
                <div class="select-box-container">
                    <SelectBox title="Статус" 
                    :items="statuses" 
                    keyTitle="_id"
                    :class="{'invalid-notext': v.status.$error}"
                    @on-select="changeStatus($event, idx)"
                    :selectedItem="v.status.$model"
                    textTitle="title"
                    placeholder="Оберіть статус" />
                </div>
                <TextArea maxLength="2000" 
                title="Пояснення" 
                placeholder="Введіть текст замітки"
                v-model="v.description.$model"
                :class="{'invalid-notext': v.description.$error}" />
                <div class="full-w flex align-end button-container">
                    <DefaultButton :disabled="!tasks[idx].changed" @click="saveTask(idx)">
                        Зберегти
                    </DefaultButton>
                </div>
            </div>
        </section>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/Default.vue';
import axios from 'axios';

import SelectBox from '@/components/SelectBox.vue';
import Input from '@/components/Input.vue';
import TextArea from '@/components/TextArea.vue';
import DefaultButton from '@/components/DefaultButton.vue';
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    data: function() {
        return {
            statuses: [],
            tasks: [],
            task: {
                title: null,
                status: null,
                description: null,
                changed: false
            }
        }
    },
    components: {
        DefaultLayout,
        SelectBox,
        Input,
        TextArea,
        DefaultButton
    },
    created: async function() {
        axios.get('/statuses')
        .then(result => {
            if (result.data.length) {
                this.statuses = result.data;
            }
        });
        
        const tasks = await axios.get('/tasks')
        
        tasks.data.forEach(task => {
            task.changed = false;
        });

        this.tasks = tasks.data;
    },
    methods: {
        addTask() {
            this.$v.task.$touch();
            
            if (this.$v.task.$anyError) {
                return false;
            }

            axios.post('/newtask', this.task)
            .then(result => {
                if (result.data.success) {
                    this.tasks.unshift(JSON.parse(JSON.stringify(this.task)));

                    for (const key in this.task) {
                        this.task[key] = null;
                    }

                    this.$v.task.$reset();
                }
            });
        },
        changed(id) {
            this.tasks[id].changed = true;
        },
        changeStatus(event, idx) {
            this.tasks[idx].status = event;
            this.tasks[idx].changed = true;
        },
        saveTask(id) {
            this.$v.tasks.$touch();

            if (this.$v.tasks.$anyError) {
                return false;
            }

            axios.post('/save', this.tasks[id])
            .then(result => {
                if (result.data.success) {
                    this.tasks[id].changed = false;
                }
            });
        }
    },
    validations() {
        const validations = {
            task: {
                title: {
                    required
                },
                status: {
                    required
                },
                description: {
                    required
                }
            },
            tasks: {
                $each: {
                    title: {
                        required
                    },
                    status: {
                        required
                    },
                    description: {
                        required
                    }
                }
            }
        };

        return validations;
    }
}
</script>

<style scoped src="@/assets/css/index.css"></style>