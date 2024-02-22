const HelloDecorator = <T extends new (...args: any[]) => any>(constructor: T) => {
    return class extends constructor {
        newProperty = 'new property';

        hello = 'override';

        sayHello() {
            return this.hello;
        }
    };
};

@HelloDecorator
class UserService {
    [key: string]: any;

    hello;

    constructor() {
        this.hello = 'hello';
    }
}

export const exp2 = () => {
    console.log();
    console.log('-----------------------示例2:简单的类装饰器-----------------------');
    console.log(
        '-----------------------动态添加一个sayHello方法以及覆盖hello的值-----------------------',
    );
    const user = new UserService();
    console.log(user.sayHello());
    console.log('-----------------------示例2:执行完毕-----------------------');
};
