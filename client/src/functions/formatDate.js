export function formatTime(timestamp) {
    const currentTime = new Date();
    const postedTime = new Date(timestamp);
    const timeDifference = currentTime - postedTime;

    // Calculate the time difference in seconds, minutes, and hours
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      // Customize the date format based on your requirements
      const options = { year: "numeric", month: "long", day: "numeric" };
      return postedTime.toLocaleDateString(undefined, options);
    }
  }