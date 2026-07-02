import cabinet from "../assets/images/cabinet.avif";
import cpu from "../assets/images/cpu.avif";
import gpu from "../assets/images/gpu.avif";
import mobile from "../assets/images/mobile.avif";
import pcb from "../assets/images/pcb.avif";
import psu from "../assets/images/psu.avif";
import ram from "../assets/images/ram.avif";

const data = [
    {
        id:1,
        image: cabinet,
        color_code:"#c5c4c4",
        name:"cabinet"
    },
    {
        id:2,
        image: cpu,
        color_code:"#d8e8b7",
        name:"Processor"
    },
    {
        id:3,
        image: gpu,
        color_code:"#94be99",
        name:"GPU"
    },
    {
        id:4,
        image: mobile,
        color_code:"#89cacd",
        name:"Mobile"
    },
    {
        id:5,
        image: pcb,
        color_code:"#fdff84",
        name:"Motherboard"
    },
    {
        id:6,
        image: psu,
        color_code:"#ff76a1",
        name:"Power Supply"
    },
    {
        id:7,
        image: ram,
        color_code:"#111",
        name:"RAM"
    },    
];

export default data;
