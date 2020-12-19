const DiContainer = function () {
  if (!(this instanceof DiContainer)) {
    return new DiContainer();
  }

  this.registrations = [];
};

DiContainer.prototype.messages = {
  registerRequireArgs:
    "이 생성자 함수는 인자가 3개 있어야 합니다: " +
    "문자열, 문자열 배열, 함수.",
};

DiContainer.prototype.register = function (name, dependencies, func) {
  let ix;

  if (
    typeof name !== "string" ||
    !Array.isArray(dependencies) ||
    typeof func !== "function"
  ) {
    throw new Error(this.messages.registerRequireArgs);
  }

  for (ix = 0; ix < dependencies.length; ++ix) {
    if (typeof dependencies[ix] !== "string") {
      throw new Error(this.messages.registerRequireArgs);
    }
  }

  this.registrations[name] = { dependencies, func };
};

DiContainer.prototype.get = function (name) {
  const self = this;
  const registration = this.registrations[name];
  const dependencies = [];

  if (!registration) {
    return;
  }

  registration.dependencies.forEach((dependencyName) => {
    const dependency = self.get(dependencyName);
    dependencies.push(dependency === undefined ? undefined : dependency);
  });

  return registration.func.apply(undefined, dependencies);
};

export default DiContainer;
