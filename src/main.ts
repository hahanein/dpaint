import "./style.css";
import "./components";
import type {Spec as ToolSpec} from "./tools";
import tools from "./tools";
import colors from "./colors";
import createBuffer from "./buffer";
import ColorElement from "./components/ColorElement";
import ColorsElement from "./components/ColorsElement";
import createTarget from "./target";

const width = 1024;
const height = 720;

const canvas = document.querySelector("canvas")!;

canvas.style.width = width + "px";
canvas.style.height = height + "px";

canvas.width = width;
canvas.height = height;

const buffer = createBuffer({width, height});
const target = createTarget({canvas, buffer});

const toolSpec: ToolSpec = {buffer, colors, target};

const htmToolbox = document.getElementById("toolbox")!;
const htmModifiers = document.getElementById("toolbox-modifiers")!;
for (const [factoryName, create] of Object.entries(tools)) {
    const name = factoryName.substr("create".length);
    const htm = document.createElement("button");
    htm.innerText = name

    const setupTool = () => {
        const tool = create(toolSpec);
        target.tool = tool;

        while (htmModifiers.firstChild) {
            htmModifiers.removeChild(htmModifiers.firstChild);
        }

        if (tool.modifiers) {
            for (const mod of tool.modifiers) {
                const htm = document.createElement("button");
                htm.innerText = mod.name;
                htm.addEventListener("click", mod.set);
                htmModifiers.appendChild(htm);
            }
        }
    };

    htm.addEventListener("click", setupTool);
    if (name === "Pencil") {
        setupTool();
    }

    htmToolbox.appendChild(htm);
}

const htmColors = new ColorsElement();
htmColors.setAttribute("primary", colors.primaryString);
htmColors.setAttribute("secondary", colors.secondaryString);

for (const color of colors.colorStrings) {
    const htm = new ColorElement();
    htm.setAttribute("value", color);
    htm.addEventListener("click", _ => colors.primary = htm.getAttribute("value")!);
    htm.addEventListener("contextmenu", evt => {
        evt.preventDefault();
        colors.secondary = htm.getAttribute("value")!;
    });

    htmColors.appendChild(htm);
}

colors.subscribe(() => {
    htmColors.setAttribute("primary", colors.primaryString);
    htmColors.setAttribute("secondary", colors.secondaryString);
});

document.querySelector("footer")!.appendChild(htmColors);

document.addEventListener("keydown", function undoRedo(evt) {
    if (evt.ctrlKey && evt.key === "z") {
        buffer.undo();
        buffer.commit();
    }

    if (evt.ctrlKey && evt.key === "r") {
        evt.preventDefault();
        buffer.redo();
        buffer.commit();
    }

    if (evt.ctrlKey && evt.key === "s") {
        evt.preventDefault();
        canvas.toBlob(function saveAsFile(blob) {
            const link = document.createElement("a"); // Or maybe get it from the current document
            link.href = window.URL.createObjectURL(blob);
            link.download = "Untitled.bmp";
            link.click()
        }, "image/bmp");
    }
});
