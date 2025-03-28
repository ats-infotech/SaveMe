export const errorHandler = (error) => {
    if (error.data.message) {
        return error.data.message;
      } else if (error.data.error) {
        return error.data.error;
      } else {
        return "Something went wrong";
      }
}