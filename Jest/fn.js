const fn = {
    add : (num1, num2) => {
        return num1+num2;
    },
    makeUser : (name, age, gender) => {
        return {name, age, gender}
    },
    throwErr : () => {
        throw new Error('Error 발생!');
    },
    getName : (callback) => {
        const name = 'Mango';
        setTimeout(() => {
            callback(name);
        }, 2000);
    },
    getAge : () => {
        return new Promise((resolve, reject) => {
            const age = 30;
            setTimeout(() => {
                resolve(age);
            }, 2000);
        })
    },
    createUser : (name) => {
        // DB 작업이 처리되는 메서드라고 가정
        console.log('user가 생성되었습니다 (DB 반영 완료)')
        return {
            name
        }
    },
    connectDB : () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    name : 'Mango',
                    age : 3,
                    gender : 'female'
                });
            }, 1000);
        })
    },
    disconnectDB : () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 500);
        })
    }
}

module.exports = fn;