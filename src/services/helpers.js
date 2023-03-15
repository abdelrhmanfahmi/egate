function buildFormData(formData, data, parentKey = "") {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    let value = data;
    if (
      data &&
      !(data instanceof String) &&
      !(data instanceof Blob) &&
      typeof data !== "boolean"
    ) {
      value = data.toString();
    }
    if (value !== undefined && value !== null) {
      if (typeof value == "boolean") {
        if (value == true || value == "true") {
          value = 1;
        }
        if (value == false || value == "false") {
          value = 0;
        }
      }
      formData.append(parentKey, value);
    }

    // if (value && typeof value == "boolean") {
    //   if (value == true || value == "true") {
    //     formData.append(parentKey, 1);
    //   }
    //   if (value == false || value == "false") {
    //     formData.append(parentKey, 0);
    //   }
    // }
  }
}

export const createdFormData = (payload) => {
  const formdata = new FormData();

  buildFormData(formdata, payload);

  return formdata;
};
