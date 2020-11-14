// autobind decorator
export function Autobind(
  _target: any,
  _methodName: string,
  propertyDescriptor: PropertyDescriptor
) {
  const originalMethod = propertyDescriptor.value;
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return newDescriptor;
}
