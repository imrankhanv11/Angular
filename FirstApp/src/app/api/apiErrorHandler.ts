import { HttpErrorResponse } from "@angular/common/http";

export const apiErrorHandler = (error: HttpErrorResponse) => {
  if (error.status === 0) {
    return { message: "Network error: Please check your connection." };
  }

  switch (error.status) {
    case 400:
      return { message: error.error?.message || "Bad request." };

    case 401:
      return { message: "Unauthorized. Please login again." };

    case 403:
      return { message: "You don't have permission to perform this action." };

    case 404:
      return { message: error.error?.message || "Data not found." };

    case 500:
      return { message: "Server error. Please try again later." };

    default:
      return { message: error.error?.message || "Something went wrong." };
  }
};
