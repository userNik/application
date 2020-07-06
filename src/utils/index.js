export const roundToThousands = (value) => {
    return Number(Math.round(value).toFixed().slice(0, 3));
};
