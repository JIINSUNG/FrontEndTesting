const fn = require('./fn');
// jest.mock을 이용해 모듈을 Mocking 할수 있음
jest.mock('./fn')

// 이렇게 만들면 mock함수가 호출될 뿐 실제 함수는 호출되지 않음
fn.createUser.mockReturnValue({ name : 'Mango' })

// test('테스트에 대한 설명', () => {
//     expect(테스트 대상).toBe(기대값);
// })

describe.skip('Primitive Test', () => {
    // 성공
    test('1 + 2 = 3인가?', () => {
        expect(fn.add(1, 2)).toBe(3);
    })

    // 실패
    test('1 + 2 = 4인가?', () => {
        expect(fn.add(1, 2)).toBe(4);
    })

    // 성공
    test('3 + 3 = 5가 아니다', () => {
        expect(fn.add(3,3)).not.toBe(5)
    })


    // 실패, 객체비교시 toBe 사용하면 안됨
    test('객체 반환 테스트', () => {
        expect(fn.makeUser('Mike', 30)).toBe({
            name: 'Mike',
            age: 30
        })
    })
})



describe('Matchers Test', () => {

    const mockFn = jest.fn();

    // 성공, gender가 없더라도 예측 프로퍼티만 일치하면 통과
    test('객체 반환 테스트', () => {     
        expect(fn.makeUser('Mike',30)).toEqual({
            name: 'Mike',
            age: 30
        })
    })

    // 실패, gender가 없기 때문
    test('객체 반환 테스트', () => {     
        expect(fn.makeUser('Mike',30)).toStrictEqual({
            name: 'Mike',
            age: 30
        })
    })


    //실패, data가 정의 돼 있지 않기 때문
    test('Defined 테스트', () => {
        expect(data).toBeDefined();
    })


    //통과, data가 null이지만 정의되어 있기 때문 
    test('Defined 테스트2', () => {
        const data = null
        expect(data).toBeDefined();
    })

    //통과, data가 null이기 때문
    test('null 테스트', () => {
        const data = null
        expect(data).toBeNull();
    })

    //통과, data가 undefined이기 때문
    test('undefined 테스트', () => {
        const data = undefined
        expect(data).toBeUndefined();
    })

    // 실패, data가 null이기 때문
    test('undefined 테스트2', () => {
        const data = null
        expect(data).toBeUndefined();
    })

    //성공, 0은 false이기 때문
    test('0은 false인가?', () => {
        expect(0).toBeFalsy();
    })

    //성공, '0'은 true이기 때문
    test('"0"은 true인가?', () => {
        expect('0').toBeTruthy();
    })

    //실패, '0'은 true이기 때문 (false가 아님)
    test('"0"은 false인가?', () => {
        expect('0').toBeFalsy();
    })

    // 실패 id가 10글자 이상이기 때문
    test('ID가 10글자 이하인가?', () => {
        const id = `mango's father`
        expect(id.length).toBeLessThanOrEqual(10);
    })

    // 실패, JS는 소수점을 정확하게 표현하지 못함
    test('0.1 + 0.2는 0.3인가?', () => {
        expect(0.1 + 0.2).toBe(0.3);
    })

    // 성공, 근사치로 비교
    test('0.1 + 0.2는 0.3인가?-2', () => {
        expect(0.1 + 0.2).toBeCloseTo(0.3);
    })

    // 실패, Mango's father에는 b라는 문자가 없다
    test(`Mango's father 에 b라는 문자가 있는가?`, () => {
        expect(`Mango's father`).toMatch('/b/');
    })

    // 실패, Mango's father에는 m라는 문자가 없다 (대소문자 구분)
    test(`Mango's father 에 m라는 문자가 있는가? (대소문자 구분 O)`, () => {
        expect(`Mango's father`).toMatch(/m/);
    })

    // 성공, Mango's father에는 M라는 문자가 있다 (대소문자 구분 X) 
    test(`Mango's father 에 m라는 문자가 있는가? (대소문자 구분 X)`, () => {
        expect(`Mango's father`).toMatch(/m/i);
    })

    // 실패, 유저리스트에 Mango가 없다
    test('유저리스트에 Mango가 있는가?', () => {
        const user = 'Mango';
        const users = ['Tom', 'Jane', 'Mike'];
        expect(users).toContain(user);
    });


    // 성공, 유저리스트에 Mango가 있다
    test('유저리스트에 Mango가 있는가?', () => {
        const user = 'Mango';
        const users = ['Tom', 'Jane', 'Mango'];
        expect(users).toContain(user);
    });

    //성공, 예외가 발생했기 때문
    test('예외 테스트', () => {
        expect(()=>fn.throwErr()).toThrow();
    })

    //실패, 예외는 발생했으나 내용까지는 일치하지 않기 때문
    test('예외 테스트', () => {
        expect(()=>fn.throwErr()).toThrow('예외인가?');
    })

    //성공, 예외 내용까지 일치하기 때문
    test('예외 테스트', () => {
        expect(()=>fn.throwErr()).toThrow('Error 발생!');
    })

    mockFn(10,20)
    mockFn()
    mockFn(30,40)

    test.only('mockFn이 한번 이상 호출 됐는가?',()=> {
        expect(mockFn).toBeCalled();
    })

    test.only('mockFn이 3번 호출 됐는가?',()=> {
        expect(mockFn).toBeCalledTimes(3);
    })

    test.only('10,20 인자로 호출 된적이 있는가?',()=> {
        expect(mockFn).toBeCalledWith(10,20);
    })

    test.only('30,40 인자가 마지막에 호출 됐는가?',()=> {
        expect(mockFn).lastCalledWith(30,40);
    })
})


describe.skip('비동기 테스트', () => {
    // 기존 코드로 비동기 처리를 할때의 Problems 예시

    //결과는 성공이지만 실제로는 실패 (3초도 걸리지 않고 성공처리됨)
    test('2초 후에 받는 이름은 Mango인가?', () => {
        function callback(name) {
            expect(name).toBe('Mango');
        }
        fn.getName(callback);
    })

    //역시 성공.. (3초도 걸리지 않고 성공처리됨)
    test('2초 후에 받는 이름은 Tom인가?', () => {
        function callback(name) {
            expect(name).toBe('Tom');
        }
        fn.getName(callback);
    })

    // jest는 실행의 끝에 도달하게 되면 테스트를 바로 종료 하기 때문
    // 이를 해결하기 위해선, test 함수의 두번째 인자로 done을 받아와서 done()을 호출해야함

    // 성공
    test('2초 후에 받는 이름은 Mango인가?-2', (done) => {
        function callback(name) {
            expect(name).toBe('Mango');
            done();
        }
        fn.getName(callback);
    })

    // 실패, done()을 호출하지 않으면 일정시간까지 대기후 실패처리됨
    test('2초 후에 받는 이름은 Mango인가?-2', (done) => {
        function callback(name) {
            expect(name).toBe('Mango');
        }
        fn.getName(callback);
    })

    // 실패, 2초 후에 받는 이름은 Mango
    test('2초 후에 받는 이름은 Tom인가?-2', (done) => {
        function callback(name) {
            expect(name).toBe('Tom');
            done();
        }
        fn.getName(callback);
    })

    // 성공
    test('나이는 30인가?', () => {
        return fn.getAge().then(age => {
            expect(age).toBe(30);
        })
    })
        
    //성공, resolves 를 사용하는 방법
    test('나이는 30인가?-2', () => {
        return expect(fn.getAge()).resolves.toBe(30);
    })
    
    //성공, async await를 사용하는 방법
    test('나이는 30인가?-3', async () => {
        await expect(fn.getAge()).resolves.toBe(30);
    })
})


describe.skip('테스트 전후 처리', () => {
    let user = {};

    //전체 테스트 시작 전 한번만 실행
    beforeAll( async () => {
        user = await fn.connectDB();
    })
    
    //전체 테스트 종료 후 한번만 실행
    afterAll( async () => {
        await fn.disconnectDB();
    })  

    // 각 테스트 실행 전 실행
    beforeEach(() => {
    })

    // 각 테스트 실행 후 실행
    afterEach(()=> {
    })

    test.only('불러온 user의 이름이 Mango인가?', () => {
        expect(user.name).toBe('Mango');
    })
})

describe.skip('Mock 함수 테스트', () => {
    // Mock 함수는 jest.fn()으로 생성 가능
    const mockFn = jest.fn(num => num+1);

    // 함수 자체를 호출할수도, 인자를 넣어서 호출할수도 있음
    mockFn();
    mockFn(1);

    // 성공, mockFn은 2번 호출됨.
    test.only('호출 횟수 테스트', () => {
        // mock함수에는 mock.calls라는 프로퍼티가 있음
        // 이 프로퍼티는 함수가 호출된 횟수와 인자를 배열로 가지고 있고
        // 이를 통해 함수가 어떻게 호출됐는지 확인 및 테스트 가능
        expect(mockFn.mock.calls.length).toBe(2);
    })

    // 성공, 2번째로 호출된 함수에 전달된 인자는 1
    test.only('2번째로 호출된 함수에 전달된 인자는 1인가', () => {
        expect(mockFn.mock.calls[1][0]).toBe(1);
    })

    //성공, mockFn(), mockFn(1) 2번 호출
    test.only('함수 호출은 2번 되는가?', () => {
        expect(mockFn.mock.calls.length).toBe(2);
    })

    //성공, 1에 1을 더해 2가 되기 때문
    test.only('인자를 1로 줬을때의 result의 결과 예측', () => {
        expect(mockFn.mock.results[1].value).toBe(2);
    })

})

describe.skip('Mock 함수 테스트2', () => {

    // Mock 함수가 실행할 때마다 리턴할 값을 다르게 만드려면?
    // mockReturnValueOnce()를 사용하면 됨
    // 마지막 리턴값은 mockReturnValue()를 사용하면 됨
    const mockFn = jest.fn();
    
    mockFn
    .mockReturnValueOnce(10)
    .mockReturnValueOnce(20)
    .mockReturnValueOnce(30)
    .mockReturnValueOnce(40)
    .mockReturnValue(50);
})

describe.skip('Mock 함수 테스트3 (응용)', () => {
    const mockFn = jest.fn();

    // 기능을 구현하지 못했을때 구현됐다 가정하고
    // 테스트를 진행하고 싶을때 사용
    mockFn
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false)
    .mockReturnValue(true);

    const results = [1,2,3,4,5].filter(num => mockFn(num));

    // 성공
    test("홀수는 1,3,5", () => {
        expect(results).toStrictEqual([1,3,5]);
    })
})

describe.skip('Mock 함수 테스트4 (비동기)', () => {
    const mockFn = jest.fn();

    // 비동기 함수를 Mocking 할때는 mockResolvedValueOnce()를 사용
    mockFn.mockResolvedValue({ name : "Mango" });

    // 성공
    test('받아온 이름은 Mango인가?', () => {
        mockFn().then(resolves => {
            expect(resolves.name).toBe('Mango')
        })
    })
})

describe.skip('Mocking Module 테스트', () => {

    test('createUser 호출 테스트', () => {

        // 실제 메서드를 호출하게 되면 DB에 유저가 생기게 되므로 
        // 테스트후 DB에서 삭제해줘야 한다는 번거로움
        const user = fn.createUser('Mango');
        expect(user.name).toBe('Mango');
    })


    // 만약 mocking module을 사용하면 이런 문제를 해결할수 있음
    // 실제 매서드인척 흉내를 낼 수 있음 (실제 호출 X)
    test('createUser 호출 테스트', () => {
        const user = fn.createUser('Mango');
        expect(user.name).toBe('Mango');
    })

})






