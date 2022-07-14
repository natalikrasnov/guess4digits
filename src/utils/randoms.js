export function getRandom4Digits() {
    
    const dig1 = Math.floor(Math.random() * 10) +'';
    const dig2 = Math.floor(Math.random() * 10) +'';
    const dig3 = Math.floor(Math.random() * 10) +'';
    const dig4 = Math.floor(Math.random() * 10) +'';

    return dig1 + dig2 + dig3 + dig4;
}