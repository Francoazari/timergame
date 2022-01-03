export default function className(...classNames) {
    const classes = [];

    for (const className of classNames) {
        if (typeof className === "object") {
            for (const key in className) {
                if (className.hasOwnProperty(key) && className[key]) {
                    classes.push(key);
                }
            }
        } else {
            classes.push(className);
        }
    }

    return { className: classes.join(" ") };
}