const SetNameDecorator =
    (firstname: string, lastname: string) =>
    <T extends new (...args: any[]) => any>(constructor: T) => {
        return class extends constructor {
            _name: string = `${firstname}.${lastname}`;

            getMyName() {
                return this._name;
            }
        };
    };

@SetNameDecorator('sheer', 'Li')
class UserService {
    [key: string]: any;

    c() {
        console.log('cc');
    }
}

export const exp3 = () => {
    console.log();
    console.log('-----------------------示例2:简单的类装饰器-----------------------');
    console.log(
        '-----------------------动态添加一个sayHello方法以及覆盖hello的值-----------------------',
    );
    const user = new UserService();
    console.log(user.getMyName());
    console.log('-----------------------示例2:执行完毕-----------------------');
};
