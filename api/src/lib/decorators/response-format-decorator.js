const ResponseFormatDecorator = formats => TargetClass =>
  class ResponseFormatWrapper extends TargetClass {
    responseFormats = formats;
  };

export default ResponseFormatDecorator;
