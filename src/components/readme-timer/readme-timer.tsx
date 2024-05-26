import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
    return <pre>
        <Slot />
    </pre>
})