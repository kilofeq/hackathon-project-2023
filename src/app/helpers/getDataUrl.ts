const getDataUrl = async (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    resolve(reader.result as string);
  };
  reader.onerror = (error) => {
    reject(error);
  };
  reader.readAsDataURL(file);
});

export default getDataUrl;
