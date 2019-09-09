export default function generateColor(){
    const COLORS = ['#0074D9', '#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#01FF70', '#FFDC00', '#FF851B', '#FF4136', '#85144b', '#F012BE', '#B10DC9', '#AAAAAA', '#DDDDDD'];
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}