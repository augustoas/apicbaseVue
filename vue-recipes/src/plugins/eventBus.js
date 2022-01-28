import mitt from "mitt";
const eventBus = mitt();

eventBus.$on = eventBus.on;
eventBus.$off = eventBus.off;
eventBus.$emit = eventBus.emit;

export { eventBus };
