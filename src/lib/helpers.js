export function isLocalhost() {
    return window.location.host.split('.')[0] === "localhost:3000";
}

export function getReplayLengthFromInputs(inputs) {
    return inputs[inputs.length - 1].timestamp ? inputs[inputs.length - 1].timestamp : inputs[inputs.length - 1].timestampStop
}