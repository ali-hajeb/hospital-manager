export function arrayShuffle<T extends any>(arr: Array<T>) {
    const originalArray = [...arr];
    const randomArray: Array<T> = [];
    let i = originalArray.length;
    let j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        randomArray.push(originalArray[j]);
        originalArray.splice(j,1);
    }

    return randomArray;
}
