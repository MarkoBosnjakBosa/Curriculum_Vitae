export const http = (configuration) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: configuration.url,
      method: configuration.method ? configuration.method : "GET",
      headers: configuration.headers ? configuration.headers : "",
      processData: false,
      contentType: false,
      data: configuration.body ? configuration.body : null,
      beforeSend: () => {
        $(":input[type='submit']").prop("disabled", true);
      },
      success: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error.responseJSON.errors);
      },
      complete: () => {
        $(":input[type='submit']").prop("disabled", false);
      }
    });
  });
};
