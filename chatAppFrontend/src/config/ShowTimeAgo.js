export function timeAgo(timestamp) {  // Create a function that takes a timestamp as an argument. This function will calculate the time difference between the current time and the provided timestamp. It will then return a string that represents the time difference in a human-readable format, such as "just now", "5 minutes ago", "2 hours ago", etc.
    const now = new Date();  //  Get the current time using the Date object.
    const past = new Date(timestamp); //  Convert the provided timestamp to a Date object. This will allow us to perform date and time calculations.
    const seconds = Math.floor((now - past) / 1000);  // Calculate the time difference in seconds. This is done by subtracting the past timestamp from the current timestamp and then dividing the result by 1000 (since the result is in milliseconds). The Math.floor function is used to round down to the nearest whole number.

    if (seconds < 60) return "just now";  // If the time difference is less than 60 seconds, return "just now". This is a special case for very recent timestamps.

    const intervals = {  // Create an object that maps time units to their corresponding number of seconds. This will allow us to easily calculate the time difference in different units, such as minutes, hours, days, etc.
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (let unit in intervals) {  // Loop through each time unit in the intervals object. This will allow us to check the time difference in each unit, starting with the largest unit (years) and working our way down to the smallest unit (minutes).
        const count = Math.floor(seconds / intervals[unit]);  // Math.floor(seconds / intervals[unit]) calculates the number of units that fit into the time difference. For example, if the time difference is 3600 seconds, then Math.floor(3600 / 3600) would return 1, indicating that 1 hour fits into the time difference.
        if (count >= 1) {   // count is grater than 1 then return the count and unit. For example, if count is 1 and unit is "hour", then the function would return "1 hour ago". If count is 2 and unit is "hours", then the function would return "2 hours ago".
            return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
        }
    }
}


