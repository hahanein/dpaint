import createLine from "./line";
import createPencil from "./pencil";
import createRectangle from "./rectangle";
import createBrush from "./brush";
import createPicker from "./picker";
import createBucket from "./bucket";
import createText from "./text";

type Modifier = {
    name: string;
    isActive: boolean;
    set(): void;
};

export type Tool = {
    begin(): void;
    close(): void;
    modifiers?: Modifier[];
};

export type Spec = {
    colors: {
        primary: number;
        secondary: number;
    },
    buffer: {
        plot(color: number, x: number, y: number): void;
        pick(x: number, y: number): number | undefined;
        snapshot(): void;
        commit(): void;
        stash(): void;
        unstash(): void;
        putImageData(imageData: ImageData, x: number, y: number): void;
    },
    target: {
        offsetLeft: number;
        offsetTop: number;
        x: number;
        y: number;
        main: boolean;
        secondary: boolean;
    }
};

export type ToolFactory = (spec: Spec) => Tool;

export default {createLine, createPencil, createBrush, createRectangle, createPicker, createBucket, createText};