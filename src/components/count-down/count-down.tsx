import { component$ } from "@builder.io/qwik";

export default component$(({timer} : {timer: string}) => {
    return <div>{timer}</div>
})