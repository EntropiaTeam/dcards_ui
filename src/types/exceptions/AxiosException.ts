class AxiosException extends Error {
  constructor(error: string) {
    super(error);
    this.name = 'AxiosException';
  }
}

export default AxiosException;
