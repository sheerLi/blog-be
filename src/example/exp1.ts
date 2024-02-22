type DecorateFunc = (target: any, key: string, descriptor: PropertyDescriptor) => void;

const logger: DecorateFunc = (target, key, descriptor) => {
    Object.defineProperty(target, key, {
        ...descriptor,
        value: async (...args: any[]) => {
            try {
                descriptor.value.apply(this, args);
            } finally {
                const now = new Date().valueOf();
                console.log(`lasted logged in ${now}`);
            }
        },
    });
};

const createDecorator = (decorator: DecorateFunc) => (Model: any, key: string) => {
    const target = Model.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(target, key);
    decorator(target, key, descriptor);
};

class User {
    async login() {
        console.log('login success');
        await new Promise((resovle) => {
            setTimeout(resovle, 100);
        });
    }
}

export const exp1 = () => {
    console.log();
    console.log(
        '-----------------------示例1:高阶函数柯里化(装饰器内部原理)-----------------------',
    );
    console.log('-----------------------实现登录和日志记录解耦-----------------------');
    console.log();

    const loggerDecorator = createDecorator(logger);
    loggerDecorator(User, 'login');
    const user = new User();
    user.login();
    console.log();
    console.log('-----------------------示例1:执行完毕-----------------------');
};
