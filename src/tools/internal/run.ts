type Loop = (callback: FrameRequestCallback) => void;
type Cancel = () => void;

export default function createLoop(): [Loop, Cancel] {
    let handle: number;

    const loop: Loop =
        callback => {
            window.cancelAnimationFrame(handle);
            handle = window.requestAnimationFrame(function current(time) {
                callback(time);
                handle = window.requestAnimationFrame(current);
            });
        };

    const cancel: Cancel =
        () => {
            window.cancelAnimationFrame(handle);
        };

    return [loop, cancel];
}