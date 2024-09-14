<script>
import * as up from "yup";
import axios from "axios";
import { APIURL } from @/constants";
const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    imageUrl: yup.string().url().required()
});
export default {
    name: "BookingForm",
    data() {
        return {
            name: "",
            description: "",
            imageUrl: "",
            schema,
        };
    },
    methods: {
        async onSubmit(value) {
            const { name, description, imageUrl } = value;
            await axios.post(`${APIURL}/catalog`, {
                name: name,
                description: description,
                imageUrl: imageUrl,
            });
            this.$emit("catalog-form-close");
        },
    },
};
</script>
<template>
    <Form @submit="onSubmit" :validation-schema="schema">
        <Field v-slot="{ field, errors }" v-model="name" name="name">
            <div class="p-col-12">
                <InputText placeholder="Name" :class="{ 'p-invalid': errors.length > 0 }" v-bind="field" />
            </div>
            <small class="p-error" v-if="errors.length > 0">
                Name is invalid.
            </small>
        </Field>
        <Field v-slot="{ field, errors }" v-model="description" name="description">
            <div class="p-col-12">
                <Textarea placeholder="Description" :class="{ 'p-invalid': errors.length > 0 }" v-bind="field" />
            </div>
            <small class="p-error" v-if="errors.length > 0">
                Description is invalid.
            </small>
        </Field>
        <Field v-slot="{ field, errors }" v-model="imageUrl" name="imageUrl">
            <div class="p-col-12">
                <InputText placeholder="Image URL" :class="{ 'p-invalid': errors.length > 0 }" v-bind="field" />
            </div>
            <small class="p-error" v-if="errors.length > 0">
                Image URL is invalid.
            </small>
        </Field>
        <div class="p-col-12">
            <Button type="submit" label="Add" />
        </div>
    </Form>
</template>